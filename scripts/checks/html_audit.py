"""HTML audit of the built site (_site): authoring footprints, semantics and ARIA.
python3 scripts/checks/html_audit.py [--strict]
"""
import re, sys, pathlib, collections
from bs4 import BeautifulSoup, Comment

ROOT = pathlib.Path(__file__).resolve().parents[2] / "_site"
FOOTPRINT = re.compile(r"claude|anthropic|chatgpt|openai|generated (by|with)|ai[- ]generated|lorem ipsum|\.dc\.html|design export|\{\{|\{%|\{#|\{post\.|\{author\.|\bTODO\b|FIXME", re.I)
issues = collections.Counter(); examples = collections.defaultdict(list)

def flag(kind, page, detail=""):
    issues[kind] += 1
    if len(examples[kind]) < 4: examples[kind].append(f"{page} {detail}".strip())

pages = [p for p in ROOT.rglob("*.html") if "assets" not in p.parts and p.name != "googlecb6dc6a16be14e4c.html"]
for f in pages:
    rel = "/" + str(f.relative_to(ROOT)).replace("index.html", "")
    raw = f.read_text(encoding="utf-8")
    soup = BeautifulSoup(raw, "html.parser")
    legacy = soup.find("meta", attrs={"http-equiv": "refresh"}) is not None
    # --- footprints
    for c in soup.find_all(string=lambda t: isinstance(t, Comment)): flag("html comment", rel, c.strip()[:60])
    for t in soup.find_all(string=True):
        if t.parent.name in ("script", "style") and t.parent.get("type") != "application/ld+json": continue
        m = FOOTPRINT.search(str(t))
        if m: flag("footprint in text", rel, repr(str(t).strip()[:80]))
    for el in soup.find_all(True):
        for k, v in el.attrs.items():
            v = " ".join(v) if isinstance(v, list) else str(v)
            if k.startswith("data-") and k not in ("data-filter", "data-cats"): flag("unexpected data- attribute", rel, k)
            if FOOTPRINT.search(v) and k not in ("href", "src") : flag("footprint in attribute", rel, f"{k}={v[:60]}")
    if soup.find("meta", attrs={"name": "generator"}): flag("meta generator", rel)
    if legacy: continue
    # --- document
    html = soup.find("html")
    if not html or not html.get("lang"): flag("missing lang", rel)
    if not (soup.title and soup.title.string and soup.title.string.strip()): flag("missing title", rel)
    if not soup.find("meta", attrs={"name": "description"}) and "404" not in rel: flag("missing meta description", rel)
    # --- landmarks
    for tag in ("main", "header", "footer"):
        n = len(soup.find_all(tag)) if tag == "main" else len(soup.select(f"body > {tag}, body > * > {tag}")) or len(soup.find_all(tag))
        if tag == "main" and n != 1: flag("main count != 1", rel, str(n))
        if tag != "main" and n == 0: flag(f"no {tag}", rel)
    navs = soup.find_all("nav")
    if len(navs) > 1:
        for n in navs:
            if not (n.get("aria-label") or n.get("aria-labelledby")): flag("nav without label", rel)
    labels = collections.Counter(n.get("aria-label") for n in navs if n.get("aria-label"))
    for k, v in labels.items():
        if v > 1: flag("duplicate nav label", rel, k)
    # --- headings
    hs = soup.find_all(re.compile(r"^h[1-6]$"))
    h1 = [h for h in hs if h.name == "h1"]
    if len(h1) != 1: flag("h1 count != 1", rel, str(len(h1)))
    prev = 0
    for h in hs:
        lvl = int(h.name[1])
        if h.find_parent("summary") or h.find_parent("footer"): prev = max(prev, lvl); continue
        if prev and lvl > prev + 1: flag("heading level skipped", rel, f"h{prev}->h{lvl} '{h.get_text(strip=True)[:40]}'")
        prev = lvl
        if not h.get_text(strip=True): flag("empty heading", rel)
    # --- ids and references
    ids = collections.Counter(el["id"] for el in soup.find_all(id=True))
    for k, v in ids.items():
        if v > 1: flag("duplicate id", rel, k)
    for attr in ("aria-labelledby", "aria-describedby", "aria-controls"):
        for el in soup.find_all(attrs={attr: True}):
            for ref in el[attr].split():
                if ref not in ids: flag(f"{attr} target missing", rel, ref)
    for a in soup.find_all("a", href=True):
        h = a["href"]
        if h.startswith("#") and len(h) > 1 and h[1:] not in ids: flag("in-page anchor target missing", rel, h)
        name = a.get_text(strip=True) or a.get("aria-label") or (a.find("img") and a.find("img").get("alt"))
        if not name: flag("link without accessible name", rel, h)
        if a.get("target") == "_blank" and "noopener" not in (a.get("rel") or []): flag("_blank without noopener", rel, h)
    # --- images, buttons, tables, forms
    for img in soup.find_all("img"):
        if not img.has_attr("alt"): flag("img without alt", rel, img.get("src", ""))
    for b in soup.find_all("button"):
        if not b.get("type"): flag("button without type", rel)
        if not (b.get_text(strip=True) or b.get("aria-label")): flag("button without name", rel)
    for t in soup.find_all("table"):
        if not (t.find("caption") or t.get("aria-label") or t.get("aria-labelledby")): flag("table without caption", rel)
        if not t.find("th"): flag("table without th", rel)
    for el in soup.find_all(attrs={"aria-hidden": "true"}):
        if el.find(["a", "button", "input"]) or el.name in ("a", "button"): flag("focusable inside aria-hidden", rel)
    for el in soup.find_all(attrs={"role": "img"}):
        if not el.get("aria-label"): flag("role=img without label", rel)
    for s in soup.find_all("section"):
        if s.get("aria-label") == "" : flag("empty aria-label", rel)
    for el in soup.find_all(attrs={"style": True}):
        issues["inline style (info)"] += 1

print(f"html audit: {len(pages)} pages")
for k, v in sorted(issues.items(), key=lambda x: -x[1]):
    print(f"  {v:5d}  {k}")
    for e in examples[k]: print(f"         e.g. {e}")
bad = sum(v for k, v in issues.items() if "(info)" not in k)
print(f"issues: {bad}")
sys.exit(1 if bad and "--strict" in sys.argv else 0)
