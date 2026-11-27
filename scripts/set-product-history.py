#!/usr/bin/env python3
"""Write product_history on provider records without touching the rest of the YAML.
Usage: python3 scripts/set-product-history.py scripts/history-data/<batch>.json
Each entry: {date: YYYY-MM or YYYY-MM-DD, text, source: number in the record's sources}.
The block is placed right before the top-level `sources:` key and replaces an existing
product_history block. Entries are sorted newest first."""
import json, re, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
q = lambda s: "'" + s.replace("'", "''") + "'"
for slug, items in json.loads(Path(sys.argv[1]).read_text()).items():
    p = root / "src/_data/providers" / f"{slug}.yml"
    text = re.sub(r"(?m)^product_history:\n(?:[- ].*\n)*", "", p.read_text())
    items = sorted(items, key=lambda e: e["date"], reverse=True)
    block = "product_history:   # dated company and product events, newest first; each from sources[]\n" + "".join(
        f"- date: '{e['date']}'\n  text: {q(e['text'])}\n  source: {e['source']}\n" for e in items)
    if text.count("\nsources:\n") != 1:
        sys.exit(f"{slug}: top-level sources: not found once")
    p.write_text(text.replace("\nsources:\n", "\n" + block + "sources:\n", 1))
    print(f"{slug}: {len(items)} entries")
