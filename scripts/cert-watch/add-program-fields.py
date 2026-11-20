#!/usr/bin/env python3
"""Add `program` and `level` to every certifications[] entry in provider records.

One-off migration for the KYC Certification Tracker (docs/cert-tracker.md).
Text-based on purpose: it inserts two lines under each `- name:` line and leaves
everything else (comments, quoting, order) untouched. Re-running is safe: entries
that already have `program:` are skipped. Names, statuses and sources are not changed.

Usage: python3 scripts/cert-watch/add-program-fields.py [--dry-run]
"""
import glob
import re
import sys

import yaml

FILES = sorted(glob.glob("src/_data/providers/*.yml"))
TOP_KEY = re.compile(r"^[A-Za-z_][\w-]*:")


def program_of(name: str) -> str:
    n = name.lower()
    if "30107" in n and "ibeta" in n:
        return "ibeta_pad"
    if "30107" in n or "pad evaluation" in n:
        return "pad_other"  # PAD claim without an iBeta letter named (LSTI, Ingenium, unnamed lab)
    if "diatf" in n or "dvstf" in n or "uk dvs" in n:
        return "uk_dvs"
    if "fido face" in n:
        return "fido_face"
    if "fido document" in n or "docauth" in n:
        return "fido_docauth"
    if "rivr" in n:
        return "rivr"
    if "29003" in n or "29115" in n or "accs" in n or "age check certification" in n or "27566" in n:
        return "accs"
    if "27001" in n:
        return "iso27001"
    if "soc 2" in n:
        return "soc2"
    return "other"


def level_of(name: str, program: str):
    if program not in ("ibeta_pad", "pad_other", "fido_face"):
        return None
    m = re.search(r"levels?\s+(\d)(?:\s+and\s+(\d))?", name, re.I)
    if not m:
        return None
    if m.group(2):
        return [int(m.group(1)), int(m.group(2))]
    return int(m.group(1))


def migrate(path: str):
    lines = open(path, encoding="utf-8").read().split("\n")
    out, changes, in_block = [], [], False
    i = 0
    while i < len(lines):
        line = lines[i]
        if TOP_KEY.match(line):
            in_block = line.startswith("certifications:")
        out.append(line)
        if in_block and line.startswith("- name:"):
            name = yaml.safe_load(line[len("- "):])["name"]
            # look ahead within this entry for an existing program field
            j, has = i + 1, False
            while j < len(lines) and lines[j].startswith("  "):
                if lines[j].startswith("  program:"):
                    has = True
                j += 1
            if not has:
                prog = program_of(name)
                out.append(f"  program: {prog}")
                lvl = level_of(name, prog)
                if lvl is not None:
                    out.append(f"  level: {lvl}" if isinstance(lvl, int) else f"  level: [{lvl[0]}, {lvl[1]}]")
                changes.append((name, prog, lvl))
        i += 1
    return "\n".join(out), changes


def main():
    dry = "--dry-run" in sys.argv
    total = 0
    for f in FILES:
        text, changes = migrate(f)
        if not changes:
            continue
        total += len(changes)
        for name, prog, lvl in changes:
            print(f"{f.split('/')[-1]}: {name!r} -> {prog}" + (f" level {lvl}" if lvl is not None else ""))
        if not dry:
            open(f, "w", encoding="utf-8").write(text)
    print(f"{total} entries {'would be ' if dry else ''}updated")


if __name__ == "__main__":
    main()
