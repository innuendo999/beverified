#!/usr/bin/env python3
"""Upsert capabilities{} / integration{} keys and append sources in provider records,
without reformatting the rest of the YAML file.

Usage: python3 scripts/set-capabilities.py <batch.json> [--dry]

batch.json:
{
  "<slug>": {
    "sources": [{"title": ..., "publisher": ..., "url": ..., "accessed": "2026-11"}],
    "capabilities": {"<key>": {"status": "yes", "note": "...", "source": "@1"}, ...},
    "integration": {"<key>": {...}}
  }
}

A key given in full replaces the existing key. A key given with "merge": true keeps the
existing fields and adds or overwrites only the fields given. "@n" in any *source field
means the n-th new source of this batch (1-based); plain numbers are existing sources.
A source whose url is already in the record is not added again; "@n" then points to it.
"""
import json, re, sys
import yaml

ORDER = ["status", "lists", "hours", "evidence", "evidence_source", "trigger", "trigger_source",
         "four_eyes", "four_eyes_source", "note", "source", "checked"]


def scalar(v):
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    s = str(v)
    if s in ("yes", "no", "partial", "add_on", "not_disclosed") or re.fullmatch(r"[\d-]+", s):
        return f"'{s}'"
    return yaml.safe_dump(s, default_flow_style=True, width=10_000, allow_unicode=True).strip().removesuffix("\n...").strip()


def emit_key(key, val, indent="  "):
    lines = [f"{indent}{key}:"]
    for k in sorted(val, key=lambda k: ORDER.index(k) if k in ORDER else 99):
        v = val[k]
        if isinstance(v, list):
            lines.append(f"{indent}  {k}: [{', '.join(scalar(x) for x in v)}]")
        else:
            lines.append(f"{indent}  {k}: {scalar(v)}")
    return lines


def block_range(lines, top):
    start = next(i for i, l in enumerate(lines) if l.rstrip() == f"{top}:")
    end = start + 1
    while end < len(lines) and (lines[end].startswith(" ") or lines[end].startswith("-") or not lines[end].strip()):
        end += 1
    return start, end


def key_range(lines, start, end, key):
    for i in range(start + 1, end):
        if re.match(rf"^  {re.escape(key)}:", lines[i]):
            j = i + 1
            while j < end and lines[j].startswith("    "):
                j += 1
            return i, j
    return None


def main():
    batch = json.load(open(sys.argv[1]))
    dry = "--dry" in sys.argv
    for slug, spec in batch.items():
        path = f"src/_data/providers/{slug}.yml"
        text = open(path).read()
        rec = yaml.safe_load(text)
        lines = text.split("\n")
        existing = rec.get("sources") or []
        urls = [s.get("url") for s in existing]
        ref = {}
        new_src = []
        for n, s in enumerate(spec.get("sources", []), 1):
            if s["url"] in urls:
                ref[n] = urls.index(s["url"]) + 1
            else:
                new_src.append(s)
                ref[n] = len(existing) + len(new_src)

        def resolve(v):
            return {k: (ref[int(x[1:])] if isinstance(x, str) and x.startswith("@") else x) for k, x in v.items()}

        for top in ("capabilities", "integration"):
            for key, val in spec.get(top, {}).items():
                val = resolve(val)
                s, e = block_range(lines, top)
                kr = key_range(lines, s, e, key)
                if val.pop("merge", False):
                    old = dict((rec.get(top) or {}).get(key) or {})
                    old.update(val)
                    val = old
                    rec.setdefault(top, {})[key] = val
                new = emit_key(key, val)
                if kr:
                    lines[kr[0]:kr[1]] = new
                else:
                    ins = e
                    while not lines[ins - 1].strip():
                        ins -= 1
                    lines[ins:ins] = new
        if new_src:
            s, e = block_range(lines, "sources")
            ins = e
            while not lines[ins - 1].strip():
                ins -= 1
            add = []
            for src in new_src:
                add.append(f"- title: {scalar(src['title'])}")
                for k in ("publisher", "url", "accessed"):
                    if src.get(k):
                        add.append(f"  {k}: {scalar(src[k])}")
            lines[ins:ins] = add
        out = "\n".join(lines)
        yaml.safe_load(out)
        if dry:
            print(f"{slug}: ok ({len(new_src)} new sources)")
        else:
            open(path, "w").write(out)
            print(f"{slug}: written ({len(new_src)} new sources)")


if __name__ == "__main__":
    main()
