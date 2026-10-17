#!/usr/bin/env python3
"""Humanizer helper.
  worklist: python3 scripts/humanize_worklist.py extract OUT.json  -> strings with AI-writing tells
  apply:    python3 scripts/humanize_worklist.py apply EDITS.json  -> writes rewrites back into src/_data
Only rendered prose fields are touched; legacy_* fields, names, URLs and labels are skipped.
"""
import json, re, sys, glob, yaml

SKIP_KEYS = {"slug", "name", "url", "src", "background", "wordmark", "title", "h1", "description",
             "type", "author", "application_category", "platform", "primary_category", "label",
             "q", "award", "short", "reg", "side", "h1_muted", "best_for", "alternatives"}
TELLS = re.compile(r"[—–]|\b(delve|tapestry|testament|pivotal|crucial|seamless(ly)?|robust|leverag(e|es|ed|ing)|"
                   r"landscape|showcas(e|es|ing)|underscor(e|es|ing)|foster(s|ing)?|enhanc(e|es|ed|ing)|vibrant|"
                   r"intricate|garner|additionally|cutting-edge|streamlin(e|ed|es|ing)|empower(s|ing)?|"
                   r"ever-evolving|game-chang|best-in-class|world-class|serves as|stands as|boasts|"
                   r"not only|not just)\b|, (ensuring|making it|highlighting|reflecting|enabling|allowing)\b", re.I)
FILES = sorted(glob.glob("src/_data/providers/*.yml") + glob.glob("src/_data/categories/*.yml") +
               ["src/_data/rankings.yml", "src/_data/home.yml", "src/_data/tracked.yml"])

def walk(node, path, out):
    if isinstance(node, dict):
        for k, v in node.items():
            if k in SKIP_KEYS or str(k).startswith("legacy_"):
                continue
            walk(v, path + [k], out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, path + [i], out)
    elif isinstance(node, str) and len(node.split()) >= 3 and TELLS.search(node):
        out.append((path, node))

def get_set(node, path, value=None):
    for p in path[:-1]:
        node = node[p]
    if value is None:
        return node[path[-1]]
    node[path[-1]] = value

def main():
    mode, arg = sys.argv[1], sys.argv[2]
    if mode == "extract":
        items = {}
        for f in FILES:
            data = yaml.safe_load(open(f, encoding="utf-8"))
            out = []
            walk(data, [], out)
            for path, text in out:
                items[f"{f}::{json.dumps(path)}"] = text
        json.dump(items, open(arg, "w"), indent=1, ensure_ascii=False)
        print(len(items), "strings with tells")
    elif mode == "apply":
        edits = json.load(open(arg, encoding="utf-8"))
        by_file = {}
        for key, new in edits.items():
            f, path = key.split("::", 1)
            by_file.setdefault(f, []).append((json.loads(path), new))
        for f, changes in by_file.items():
            data = yaml.safe_load(open(f, encoding="utf-8"))
            for path, new in changes:
                get_set(data, path, new)
            open(f, "w", encoding="utf-8").write(
                yaml.safe_dump(data, sort_keys=False, allow_unicode=True, width=100000))
        print("applied", len(edits), "edits in", len(by_file), "files")

if __name__ == "__main__":
    main()
