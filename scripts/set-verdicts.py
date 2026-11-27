#!/usr/bin/env python3
"""Replace the top-level `verdict:` of provider records without touching the rest of the YAML.
Usage: python3 scripts/set-verdicts.py scripts/seo-data/<batch>.json   ({slug: text})"""
import json, re, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
for slug, text in json.loads(Path(sys.argv[1]).read_text()).items():
    p = root / "src/_data/providers" / f"{slug}.yml"
    src = p.read_text()
    new, n = re.subn(r"(?m)^verdict:.*\n(?:[ \t]+.*\n)*", lambda m: "verdict: '" + text.replace("'", "''") + "'\n", src, count=1)
    if n != 1:
        sys.exit(f"{slug}: top-level verdict not found")
    p.write_text(new)
print("done")
