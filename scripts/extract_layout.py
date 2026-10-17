#!/usr/bin/env python3
"""One-off migration: replace the duplicated site header/footer in every page
with Nunjucks includes and record the per-page differences as front matter.

Pages whose header or footer does not follow the shared pattern keep their own
markup untouched. Run from the repo root: python3 scripts/extract_layout.py
"""
import pathlib, re, sys

SRC = pathlib.Path("src")
SKIP = {"googlecb6dc6a16be14e4c.html"}
HEADER_RE = re.compile(r'<header class="site-header">.*?</header>', re.S)
FOOTER_RE = re.compile(r'<footer class="site-footer">.*?</footer>', re.S)
FOOTER_META_RE = re.compile(
    r'<p class="footer-meta"><span>Updated ([^<]+)</span><span aria-hidden="true">·</span><span>([^<]+)</span></p>')

def header_kind(h):
    if "header-cta\" href=\"mailto:support@beverified.org\">List Your Product" not in h:
        return None
    if 'href="/methodology/" aria-current="page"' in h:
        return "methodology"
    if 'href="./" aria-current="page">Reviews' in h:
        return "reviews"
    return "default"

def main():
    changed, kept = [], []
    for path in sorted(SRC.rglob("*.html")):
        rel = path.relative_to(SRC)
        if rel.parts[0] in ("_includes", "_layouts", "backup-files") or rel.name in SKIP:
            continue
        s = path.read_text(encoding="utf-8")
        if s.startswith("---\n"):
            continue  # already migrated
        fm = []
        h = HEADER_RE.search(s)
        kind = header_kind(h.group(0)) if h else None
        if kind:
            s = s[:h.start()] + '{% include "header.njk" %}' + s[h.end():]
            if kind != "default":
                fm.append(f"navCurrent: {kind}")
        else:
            kept.append(f"{rel}: header kept inline")
        f = FOOTER_RE.search(s)
        m = FOOTER_META_RE.search(f.group(0)) if f else None
        if f and m and 'class="footer-grid"' in f.group(0):
            fm.append(f'updated: "{m.group(1)}"')
            if m.group(2) != "Reviewed by 3 compliance analysts":
                fm.append(f'footerMeta: "{m.group(2)}"')
            if 'class="footer-disclosure" id="how-we-make-money"' in f.group(0):
                fm.append("disclosureId: how-we-make-money")
            s = s[:f.start()] + '{% include "footer.njk" %}' + s[f.end():]
        else:
            kept.append(f"{rel}: footer kept inline")
        front = "---\n" + "\n".join(fm) + ("\n" if fm else "") + "---\n"
        path.write_text(front + s, encoding="utf-8")
        changed.append(str(rel))
    print(f"migrated {len(changed)} pages")
    for k in kept:
        print("  ", k)

if __name__ == "__main__":
    sys.exit(main())
