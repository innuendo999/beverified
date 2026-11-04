// Checks the quick answer on every category page (src/_data/categories/<slug>.yml).
// Rules (owner, 2026-11-04): written to be lifted whole by AI Overviews and answer engines.
// node scripts/checks/quick-answers.mjs   (exits 1 on any issue)
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const MAX_WORDS = 60;
const MAX_SENTENCES = 4;
const dir = path.join(root, "src/_data/categories");
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
let issues = 0;
const fail = (s, m) => { issues++; console.log(`${s}: ${m}`); };

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))) {
  const c = yaml.load(fs.readFileSync(path.join(dir, file), "utf8"));
  const q = (c.quick_answer || "").trim();
  const slug = c.slug || file.replace(/\.yml$/, "");
  if (!q) { fail(slug, "no quick_answer"); continue; }
  const words = q.split(/\s+/).length;
  if (words > MAX_WORDS) fail(slug, `${words} words (max ${MAX_WORDS})`);
  const sentences = q.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).length;
  if (sentences > MAX_SENTENCES) fail(slug, `${sentences} sentences (max ${MAX_SENTENCES})`);
  if (/\b[0-5]\.\d\b(?!\s*(?:per|a|an)\b)/.test(q.replace(/€\d+\.\d+|\$\d+\.\d+|ISO\/IEC \S+|Level \d/g, "")))
    fail(slug, "looks like it contains a score; scores belong in the table");
  if (/[–—]/.test(q)) fail(slug, "en or em dash");
  const key = (c.url || "").replace(/^\/providers\//, "").replace(/\/$/, "");
  const list = rankings[key]?.providers;
  if (list?.length) {
    const first = q.split(/(?<=[.!?])\s+/)[0];
    if (!first.includes(list[0].name)) fail(slug, `first sentence does not name the #1 provider (${list[0].name})`);
    const m = q.match(/compared (\d+)\b/);
    if (!m) fail(slug, 'no closing "We compared N providers on ..." sentence');
    else if (Number(m[1]) !== list.length) fail(slug, `says ${m[1]} providers, ranking has ${list.length}`);
  }
}
console.log(`quick answers: ${issues} issue(s)`);
process.exit(issues ? 1 : 0);
