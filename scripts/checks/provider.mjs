// Validates provider records after a fact re-check (docs/verification-spec.md).
// node scripts/checks/provider.mjs [slug ...]   (no args = all)
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dir = path.join(root, "src/_data/providers");
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).map((f) => f.replace(/\.yml$/, ""));
let errors = 0;
const err = (s, m) => { errors++; console.log(`${s}: ${m}`); };
const walk = (v, p, out) => {
  if (typeof v === "string") out.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`, out));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, p ? `${p}.${k}` : k, out);
  return out;
};
for (const s of slugs) {
  const file = path.join(dir, `${s}.yml`);
  let d;
  try { d = yaml.load(fs.readFileSync(file, "utf8")); } catch (e) { err(s, "YAML does not parse: " + e.message.split("\n")[0]); continue; }
  let old = null;
  try { old = yaml.load(execSync(`git -C "${root}" show HEAD:src/_data/providers/${s}.yml`, { stdio: ["ignore", "pipe", "ignore"] }).toString()); } catch {}
  if (old) for (const k of ["slug", "name", "score", "grade", "author"]) if (JSON.stringify(old[k]) !== JSON.stringify(d[k])) err(s, `${k} must not change (${old[k]} → ${d[k]})`);
  const n = (d.sources || []).length;
  (d.sources || []).forEach((x, i) => { if (!x.url || !/^https?:\/\//.test(x.url) || !x.title || !x.accessed) err(s, `sources[${i}] incomplete`); });
  const ref = (where, v) => { if (v != null && (!Number.isInteger(v) || v < 1 || v > n)) err(s, `${where}.source ${v} is not a valid source number (1..${n})`); };
  (d.facts || []).forEach((f, i) => { ref(`facts[${i}]`, f.source); if (f.evidence && !["vendor", "independent", "user", "hands_on"].includes(f.evidence)) err(s, `facts[${i}].evidence invalid`); });
  (d.certifications || []).forEach((c, i) => { ref(`certifications[${i}]`, c.source); if (!["confirmed", "vendor_stated", "not_found"].includes(c.status)) err(s, `certifications[${i}].status invalid`); if (c.status === "confirmed" && !c.source) err(s, `certifications[${i}] confirmed without source`); });
  (d.pricing?.items || []).forEach((x, i) => { ref(`pricing.items[${i}]`, x.source); if (!["official", "third_party"].includes(x.kind)) err(s, `pricing.items[${i}].kind invalid`); });
  if ((d.pros || []).length !== 3 || (d.cons || []).length !== 3) err(s, `pros/cons must be 3 and 3 (${(d.pros || []).length}/${(d.cons || []).length})`);
  for (const [p, v] of walk(d, "", [])) {
    if (p.startsWith("legacy_") || p.startsWith("verification_notes")) continue;
    if (/[–—]/.test(v)) err(s, `dash in ${p}`);
    if (/\bTODO\b|verify before|before this page goes live|pending verification/i.test(v)) err(s, `editorial note in ${p}`);
  }
  if (d.last_verified === "2026-10-18") {
    if (d.legacy_editorial_note) err(s, "legacy_editorial_note should be null after the re-check");
    if (!n) err(s, "re-checked record has no sources");
    if (!fs.existsSync(path.join(root, "reports/verification", `${s}.md`))) err(s, "missing reports/verification/<slug>.md");
  }
}
console.log(`providers: ${slugs.length} checked, ${errors} issue(s)`);
process.exit(errors ? 1 : 0);
