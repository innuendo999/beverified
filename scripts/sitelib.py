"""Shared helpers for the migration scripts (inventory, extraction, gap report).

Parses the current static HTML pages under src/. Run scripts from the repo root.
"""
import csv
import pathlib
import re
from collections import defaultdict

from bs4 import BeautifulSoup

SRC = pathlib.Path("src")
SITE = "https://beverified.org"
SKIP_DIRS = {"_includes", "_layouts", "_data", "backup-files", "assets"}


def pages():
    """Yield (url, path) for every HTML page in src/."""
    for path in sorted(SRC.rglob("index.html")):
        rel = path.relative_to(SRC)
        if rel.parts[0] in SKIP_DIRS:
            continue
        url = "/" + "/".join(rel.parts[:-1])
        url = url if url == "/" else url + "/"
        yield url, path


def soup(path):
    text = path.read_text(encoding="utf-8")
    if text.startswith("---\n"):  # strip 11ty front matter
        text = text.split("---\n", 2)[2]
    return BeautifulSoup(text, "html.parser")


def clean(node):
    """Visible text of a node with collapsed whitespace."""
    if node is None:
        return None
    return re.sub(r"\s+", " ", node.get_text(" ", strip=True)).strip() or None


def page_type(s, url):
    if url == "/":
        return "home"
    if s.select_one(".review-hero"):
        return "provider"
    if s.select_one("article.provider-article"):
        return "category"
    if url == "/providers/":
        return "directory"
    return "page"


def slug_from_href(href):
    m = re.match(r"^/providers/([a-z0-9-]+(?:/[a-z0-9-]+)?)/?$", href or "")
    return m.group(1) if m else None


def parse_rating(text):
    m = re.search(r"(\d(?:\.\d)?)\s*/\s*5", text or "")
    return float(m.group(1)) if m else None


def gsc_pages(path="data/gsc/Pages.csv"):
    """GSC page metrics aggregated by URL path, fragments (#...) folded in."""
    agg = defaultdict(lambda: {"clicks": 0, "impressions": 0, "pos_weighted": 0.0})
    p = pathlib.Path(path)
    if not p.exists():
        return {}
    for row in csv.DictReader(p.open(encoding="utf-8")):
        url = row["Top pages"].replace(SITE, "").split("#")[0] or "/"
        a = agg[url]
        impr = int(row["Impressions"])
        a["clicks"] += int(row["Clicks"])
        a["impressions"] += impr
        a["pos_weighted"] += float(row["Position"]) * impr
    out = {}
    for url, a in agg.items():
        pos = round(a["pos_weighted"] / a["impressions"], 1) if a["impressions"] else None
        out[url] = {"clicks": a["clicks"], "impressions": a["impressions"], "position": pos}
    return out


ISSUE_PATTERNS = {
    "editorial_note": re.compile(r"Editorial note \(pre-publish\)", re.I),
    "screenshot_placeholder": re.compile(r"product screenshot\s*[—-]\s*dashboard view", re.I),
    "top10_label": re.compile(r"See Top 10", re.I),
}


def issues(s):
    text = s.get_text(" ")
    return [name for name, rx in ISSUE_PATTERNS.items() if rx.search(text)]


def write_csv(path, rows, fields):
    path = pathlib.Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
