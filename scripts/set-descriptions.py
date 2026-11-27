#!/usr/bin/env python3
"""Set seo.description on category records without touching the rest of the YAML.
Usage: python3 scripts/set-descriptions.py scripts/seo-data/<batch>.json
The JSON maps a category slug to the new description. Only the `  description:` line
inside the `seo:` block is replaced, so comments and layout stay as they are."""
import json, re, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
batch = json.loads(Path(sys.argv[1]).read_text())
for slug, desc in batch.items():
    p = root / "src/_data/categories" / f"{slug}.yml"
    text = p.read_text()
    quoted = "'" + desc.replace("'", "''") + "'"
    new, n = re.subn(r"(?m)^(seo:\n(?:  .*\n)*?  description: ).*$", lambda m: m.group(1) + quoted, text, count=1)
    if n != 1:
        sys.exit(f"{slug}: seo.description line not found")
    p.write_text(new)
    print(f"{slug}: {len(desc)} characters")
