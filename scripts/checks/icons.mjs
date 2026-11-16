// Icon library check (src/_lib/icons.js). Fails when a ranking, article section or evidence level has
// no icon mapped, when a map points to a missing icon, or when an icon breaks the drawing rules.
// node scripts/checks/icons.mjs
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { ICONS, MAP } from "../../src/_lib/icons.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const issues = [];
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
for (const k of Object.keys(rankings)) if (!MAP.category[k]) issues.push(`rankings.yml "${k}": no icon in MAP.category`);
const sections = new Set();
for (const dir of ["guide", "news", "publications", "compare"]) {
  const d = path.join(root, "src", dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter((f) => f.endsWith(".md"))) {
    const m = /^section:\s*(\S+)/m.exec(fs.readFileSync(path.join(d, f), "utf8"));
    if (m) sections.add(m[1].replace(/['"]/g, ""));
  }
}
for (const s of sections) if (!MAP.section[s]) issues.push(`article section "${s}": no icon in MAP.section`);
for (const [kind, map] of Object.entries(MAP)) for (const [k, n] of Object.entries(map)) if (!ICONS[n]) issues.push(`MAP.${kind}.${k} → "${n}" is not an icon`);
for (const [n, ic] of Object.entries(ICONS)) {
  if (!/^[a-z0-9-]+$/.test(n)) issues.push(`icon "${n}": name must be kebab-case`);
  if (/fill=|stroke=|style=|<text/.test(ic.svg)) issues.push(`icon "${n}": no fill/stroke/style/text inside; colour and width come from CSS`);
  if (!ic.label || !ic.group) issues.push(`icon "${n}": needs label and group`);
}
issues.forEach((m) => console.log(m));
console.log(`icons: ${Object.keys(ICONS).length} icon(s), ${issues.length} issue(s)`);
process.exit(issues.length ? 1 : 0);
