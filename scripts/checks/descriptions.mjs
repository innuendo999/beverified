// Checks the meta description (seo.description) on every ranking page against its ranking.
// Rule (owner, 2026-11-27): the description names the ranking's #1 first, names ranked
// providers in rank order, and never names a reviewed provider that is not on the page.
// Length over 160 characters is reported as a note only (Google may cut it).
// node scripts/checks/descriptions.mjs   (exits 1 on any issue)
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dir = path.join(root, "src/_data/categories");
const provDir = path.join(root, "src/_data/providers");
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
const reviewed = fs.readdirSync(provDir).filter((f) => f.endsWith(".yml"))
  .map((f) => yaml.load(fs.readFileSync(path.join(provDir, f), "utf8")).name).filter(Boolean);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Case-sensitive, whole-word position of a name in the text, or -1.
const pos = (text, name) => {
  const m = new RegExp(`(?<![\\w-])${esc(name)}(?![\\w-])`).exec(text);
  return m ? m.index : -1;
};
// A ranked entry can be listed as "Onfido (Entrust)"; match on the part before the bracket too.
const names = (p) => [p.name, p.name.replace(/\s*\(.*\)\s*$/, "")].filter((v, i, a) => v && a.indexOf(v) === i);

let issues = 0, notes = 0;
const fail = (s, m) => { issues++; console.log(`${s}: ${m}`); };

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))) {
  const c = yaml.load(fs.readFileSync(path.join(dir, file), "utf8"));
  const slug = c.slug || file.replace(/\.yml$/, "");
  const d = (c.seo?.description || "").trim();
  if (!d) { fail(slug, "no seo.description"); continue; }
  if (d.length > 160) { notes++; console.log(`${slug}: note, ${d.length} characters (Google may cut over ~160)`); }
  const key = (c.url || "").replace(/^\/providers\//, "").replace(/\/$/, "");
  const list = rankings[key]?.providers;
  if (!list?.length) continue;

  const found = list.map((p, rank) => ({ name: p.name, rank, at: Math.min(...names(p).map((n) => pos(d, n)).map((x) => (x < 0 ? Infinity : x))) }))
    .filter((x) => x.at !== Infinity).sort((a, b) => a.at - b.at);
  if (!found.length) fail(slug, `names no ranked provider (the #1 is ${list[0].name})`);
  else if (found[0].rank !== 0) fail(slug, `names ${found[0].name} (#${found[0].rank + 1}) first; the #1 is ${list[0].name}`);
  for (let i = 1; i < found.length; i++)
    if (found[i].rank < found[i - 1].rank) { fail(slug, `${found[i].name} (#${found[i].rank + 1}) is named after ${found[i - 1].name} (#${found[i - 1].rank + 1}); keep rank order`); break; }

  const ranked = new Set(list.flatMap(names));
  for (const n of reviewed) if (!ranked.has(n) && pos(d, n) >= 0) fail(slug, `names ${n}, which is not in this ranking`);
}
console.log(`descriptions: ${issues} issue(s), ${notes} length note(s)`);
process.exit(issues ? 1 : 0);
