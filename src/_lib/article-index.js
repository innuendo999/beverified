// Front matter of every article by URL (/<section>/<slug>/), read straight from src/<section>/*.md.
// Used where collections are not available: src/_data/megaMenu.js and scripts/checks/placements.mjs.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export const ARTICLE_SECTIONS = ["guide", "news", "publications", "compare"];

export function articleIndex(srcDir) {
  const out = {};
  for (const sec of ARTICLE_SECTIONS) {
    const dir = path.join(srcDir, sec);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const m = fs.readFileSync(path.join(dir, f), "utf8").match(/^---\n([\s\S]*?)\n---/);
      if (!m) continue;
      const fm = yaml.load(m[1]) || {};
      if (fm.draft) continue;
      out[`/${sec}/${f.replace(/\.md$/, "")}/`] = fm;
    }
  }
  return out;
}
