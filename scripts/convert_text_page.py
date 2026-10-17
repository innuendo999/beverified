#!/usr/bin/env python3
"""One-off: convert an old static page (methodology, placement options) into a
V3 text page. Keeps the copy unchanged; drops inline styles and old classes.
Usage: python3 scripts/convert_text_page.py src/methodology/index.html
"""
import re, sys, pathlib
from bs4 import BeautifulSoup

KEEP = {"id", "href", "rel", "target", "type", "name", "for", "method", "action", "value",
        "placeholder", "required", "rows", "colspan", "scope", "open", "aria-label", "aria-labelledby",
        "aria-hidden", "datetime", "src", "alt", "role"}

path = pathlib.Path(sys.argv[1])
raw = path.read_text(encoding="utf-8")
if raw.startswith("---\n"):
    raw = raw.split("---\n", 2)[2]
s = BeautifulSoup(raw, "html.parser")
title = s.title.get_text(strip=True)
desc = (s.find("meta", attrs={"name": "description"}) or {}).get("content", "")
main = s.find("main")
h1 = main.find("h1")
h1_text = h1.get_text(" ", strip=True)
# lede = first paragraph after h1 within the same section
lede_el = h1.find_next("p")
lede = lede_el.get_text(" ", strip=True) if lede_el else ""
h1.decompose()
if lede_el:
    lede_el.decompose()
for bc in main.select("nav.breadcrumb"):
    bc.decompose()
for el in main.find_all(True):
    for a in list(el.attrs):
        if a not in KEEP and not a.startswith("aria-"):
            del el[a]
body = main.decode_contents()
body = re.sub(r"\n\s*\n+", "\n", body).strip()
upd = re.search(r"Updated ([A-Z][a-z]{2} \d{1,2}, \d{4})", raw)
fm = ["---", "layout: text.njk", f'seoTitle: "{title}"', f'seoDescription: "{desc}"',
      f'h1: "{h1_text}"', f'lede: "{lede}"']
out = path.with_suffix(".njk")
out.write_text("\n".join(fm) + "\n---\n" + body + "\n", encoding="utf-8")
path.unlink()
print("wrote", out)
