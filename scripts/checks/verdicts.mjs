// Checks every review verdict (provider `verdict`) against the V6 hero pattern (owner, 2026-11-27):
// 1) who it is for and why, naming the provider; 2) entry price or that prices are not published;
// 3) the main limit or risk. At most 4 sentences and 70 words.
// "top pick" is allowed only for the #1 provider of the record's primary_category ranking,
// so a ranking change cannot leave a stale claim in the hero.
// node scripts/checks/verdicts.mjs   (exits 1 on any issue)
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dir = path.join(root, "src/_data/providers");
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
const BANNED = [/stands? out/i, /one simple reason/i, /worth (raising|noting|knowing)/i, /\bseamless/i, /\brobust\b/i, /cutting-edge/i, /game.?changer/i, /\bdelve/i];

let issues = 0;
const fail = (s, m) => { issues++; console.log(`${s}: ${m}`); };
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".yml"))) {
  const p = yaml.load(fs.readFileSync(path.join(dir, f), "utf8"));
  const s = p.slug, v = (p.verdict || "").trim();
  if (!v) { fail(s, "no verdict"); continue; }
  const words = v.split(/\s+/).length;
  const sentences = v.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).length;
  if (words > 70) fail(s, `verdict has ${words} words (max 70)`);
  if (sentences > 4) fail(s, `verdict has ${sentences} sentences (max 4)`);
  const first = v.split(/(?<=[.!?])\s+(?=[A-Z0-9])/)[0];
  const names = [p.name, p.name.replace(/\s*\(.*\)\s*$/, ""), ...(p.alternate_names || [])].filter(Boolean);
  if (!names.some((n) => first.includes(n))) fail(s, "first sentence does not name the provider");
  for (const re of BANNED) if (re.test(v)) fail(s, `verdict uses "${v.match(re)[0]}"`);
  if (/top pick/i.test(v)) {
    const list = rankings[p.primary_category]?.providers || [];
    if (list[0]?.slug !== s) fail(s, `says "top pick" but is not #1 in ${p.primary_category}`);
  }
}
console.log(`verdicts: ${issues} issue(s)`);
process.exit(issues ? 1 : 0);
