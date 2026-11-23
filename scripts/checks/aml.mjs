// AML 1.0 data check (docs/scoring-aml.md). For every provider in the `aml` ranking:
// - errors (exit 1): unknown status or attribute values, source refs that point nowhere,
//   a scored claim (yes / partial / add_on) without a source;
// - pending (report only): AML 1.0 fields not collected yet, or checked more than 90 days ago.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
const slugs = (rankings.aml?.providers || []).map((p) => p.slug).filter(Boolean);

const CAP = ["sanctions_pep", "adverse_media", "list_coverage", "list_updates", "pep_tiers", "data_provenance",
  "fuzzy_matching", "transliteration", "secondary_identifiers", "whitelisting", "alert_explanation",
  "audit_trail", "case_management", "calibration_docs", "alert_reporting", "model_validation",
  "ongoing_monitoring", "transaction_monitoring", "transfer_screening", "risk_scoring", "batch_screening"];
const INT = ["docs_public", "sandbox", "no_code", "webhooks"];
const STATUS = new Set(["yes", "partial", "add_on", "no", "not_disclosed", "beta", "planned"]);
const ATTR = {
  lists: (v) => Array.isArray(v) && v.every((x) => ["ofac", "eu", "uk", "un"].includes(x)),
  hours: (v) => Number.isFinite(v) && v > 0,
  evidence: (v) => ["named", "counted", "taxonomy"].includes(v),
  trigger: (v) => ["list_change", "daily", "periodic"].includes(v),
  four_eyes: (v) => ["yes", "partial"].includes(v),
};
const today = new Date(process.env.CHECK_DATE || Date.now());
const age = (d) => {
  if (!d) return Infinity;
  const s = String(d).length === 7 ? `${d}-01` : String(d);
  return (today - new Date(s)) / 864e5;
};

let errors = 0, pending = 0;
const out = [];
for (const slug of slugs) {
  const file = path.join(root, "src/_data/providers", `${slug}.yml`);
  if (!fs.existsSync(file)) { out.push(`${slug}: record missing`); errors++; continue; }
  const d = yaml.load(fs.readFileSync(file, "utf8"));
  const nSrc = (d.sources || []).length;
  const groups = [["capabilities", CAP], ["integration", INT]];
  const miss = [], stale = [];
  for (const [top, keys] of groups) {
    const block = d[top] || {};
    for (const k of keys) {
      const v = block[k];
      if (!v || typeof v !== "object") { miss.push(`${top}.${k}`); continue; }
      const where = `${slug}: ${top}.${k}`;
      if (!STATUS.has(String(v.status))) { out.push(`${where}: unknown status "${v.status}"`); errors++; }
      if (["yes", "partial", "add_on"].includes(String(v.status)) && v.source == null) { out.push(`${where}: claim without a source`); errors++; }
      for (const [a, ok] of Object.entries(ATTR)) if (v[a] != null && !ok(v[a])) { out.push(`${where}: bad ${a} "${v[a]}"`); errors++; }
      for (const [a, x] of Object.entries(v)) {
        if ((a === "source" || a.endsWith("_source")) && x != null && !(Number.isInteger(x) && x >= 1 && x <= nSrc)) { out.push(`${where}: ${a} ${x} not in sources[1..${nSrc}]`); errors++; }
      }
      if (age(v.checked || block.checked) > 90) stale.push(`${top}.${k}`);
    }
  }
  if (miss.length) { pending++; out.push(`${slug}: pending, ${miss.length} field(s) not collected: ${miss.join(", ")}`); }
  if (stale.length) { pending++; out.push(`${slug}: pending, checked over 90 days ago: ${stale.join(", ")}`); }
}
for (const l of out) console.log(l);
console.log(`aml: ${slugs.length} provider(s), ${errors} error(s), ${pending} pending`);
process.exit(errors ? 1 : 0);
