// Scores the Identity Verification ranking on IDV 1.0 (docs/scoring-idv.md) from fields in the provider records.
// node scripts/rescore-idv.mjs            -> reports/rescore-idv-1.0.csv + summary (records unchanged)
// node scripts/rescore-idv.mjs sumsub ... -> only these slugs, prints the breakdown
// Writing category_scores into records is left for the owner's approval of the report (add --write then).
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { fraudDefense, pricing, HOLD, grade } from "./rescore.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const KEY = "identity-verification";
const TODAY = new Date(process.env.IDV_TODAY || new Date().toISOString().slice(0, 10));
const INCIDENTS = yaml.load(fs.readFileSync(path.join(root, "src/_data/incidents.yml"), "utf8")).items || [];
const half = (x) => Math.round(x * 2) / 2;
const clamp = (x) => Math.max(1, Math.min(5, x));
const has = (c) => c && ["yes", "add_on", "partial"].includes(c.status);
const yes = (c) => c && c.status === "yes";
const cap = (d, k) => (d.capabilities || {})[k];
const certs = (d) => d.certifications || [];
const NEW_KEYS = ["doc_forensics", "manual_review", "proof_of_address", "reverification"];

export const RUBRIC = [
  ["fraud", "Fraud defense", 30],
  ["coverage", "Coverage", 20],
  ["pricing", "Pricing and total cost", 15],
  ["integration", "Integration and user flow", 15],
  ["compliance", "Compliance fit", 15],
  ["breadth", "Platform breadth", 5],
];

// v3.1 Fraud defense without the NFC adjustment (NFC counts under Coverage), plus the RIVR bonus.
function fraud(d) {
  const caps = { ...(d.capabilities || {}) };
  delete caps.nfc;
  let [s, why, ev] = fraudDefense({ ...d, primary_category: "identity-verification", capabilities: caps });
  if (s == null) return [null, why];
  const rivr = (d.independent_tests?.rivr || []).filter((r) => r.goals_met === "all" && r.alias && r.source);
  if (rivr.length) { s += 0.5; why += `, DHS RIVR goals met (${rivr.map((r) => r.track).join(", ")})`; }
  return [clamp(s), why, ev];
}

function coverage(d) {
  const n = d.coverage?.countries?.value;
  const parts = [
    [n >= 180, n ? `${n} countries and territories` : null],
    [has(cap(d, "nfc")), "NFC"],
    [has(cap(d, "doc_forensics")), "document fraud checks"],
    [has(d.coverage?.non_doc), "a route without a document"],
  ];
  const known = n || ["nfc", "doc_forensics"].some((k) => cap(d, k) && cap(d, k).status !== "not_disclosed") || d.coverage?.non_doc;
  if (!known) return [null, "no coverage data"];
  const got = parts.filter(([ok]) => ok).map(([, l]) => l);
  return [clamp(got.length + 1), got.join(", ") || "none found", "vendor"];
}

function integration(d) {
  const i = d.integration;
  if (!i) return [null, "integration missing"];
  const sdks = ["sdk_web", "sdk_ios", "sdk_android"].filter((k) => yes(i[k])).length;
  const mr = cap(d, "manual_review");
  const human = has(mr) && mr.hours;
  const pts = (yes(i.docs_public) ? 1 : 0) + (sdks === 3 ? 1 : sdks ? 0.5 : 0) + (yes(i.sandbox) ? 1 : 0) + (yes(i.no_code) ? 1 : 0) + (human ? 1 : 0);
  const got = [yes(i.docs_public) && "public API docs", sdks === 3 ? "web, iOS and Android SDKs" : sdks ? `${sdks} of 3 SDKs` : null,
    yes(i.sandbox) && "self-serve sandbox or trial", yes(i.no_code) && "no-code or hosted flow", human && `human review (${mr.hours})`].filter(Boolean);
  if (has(mr) && !mr.hours) got.push("human review offered, hours not published");
  return [clamp(pts + 1), got.join(", ") || "none found", "vendor"];
}

// Matched on the certificate name only, one framework per certificate, so "UK DIATF, certified by Kantara"
// counts once as UK DIATF and never as a Kantara IAL2 listing.
const FRAMEWORKS = [["UK DIATF", /DIATF|DVSTF|Digital Verification Serv|UK DVS/i], ["ISO/IEC TS 29003", /29003/], ["ETSI TS 119 461", /119 ?461/], ["Kantara IAL2", /800-63|IAL ?2/i]];
const frameworkOf = (c) => FRAMEWORKS.find(([, re]) => re.test(c.name))?.[0];
function compliance(d) {
  let pts = 0; const why = [];
  const sec = certs(d).filter((c) => /27001|SOC 2/i.test(c.name));
  if (sec.some((c) => c.status === "confirmed")) { pts += 2; why.push("ISO 27001 or SOC 2 confirmed"); }
  else if (sec.some((c) => c.status === "vendor_stated")) { pts += 1; why.push("ISO 27001 or SOC 2 vendor-stated"); }
  const fw = [...new Set(certs(d).filter((c) => c.status === "confirmed").map(frameworkOf).filter(Boolean))];
  if (fw.length) { pts += 1.5; if (fw.length > 1) pts += 0.5; why.push(`confirmed on a register: ${fw.join(", ")}`); }
  const dep = cap(d, "deployment")?.status;
  if (yes(cap(d, "data_residency")) || ["on_prem", "cloud_and_on_prem"].includes(dep)) { pts += 0.5; why.push("data residency or on-premises"); }
  const recent = INCIDENTS.filter((x) => x.slug === d.slug && x.counted !== false && (TODAY - new Date(x.date)) / 864e5 <= 730);
  pts -= recent.length; recent.forEach((x) => why.push(`incident ${x.date}`));
  return [clamp(half(pts + 1)), why.join(", ") || "no public evidence", sec.some((c) => c.status === "confirmed") || fw.length ? "independent" : "vendor"];
}

function breadth(d) {
  const keys = [["sanctions_pep", "sanctions and PEP screening"], ["proof_of_address", "proof of address"], ["age_facial_estimation", "facial age estimation"], ["reverification", "re-verification"]];
  if (!keys.some(([k]) => cap(d, k))) return [null, "no module data"];
  const got = keys.filter(([k]) => has(cap(d, k))).map(([, l]) => l);
  return [clamp(got.length + 1), got.length ? got.join(", ") : "none of the four", "vendor"];
}

const FN = { fraud, coverage, pricing: (d) => pricing(d), integration, compliance, breadth };

export function eligibility(d) {
  const why = [];
  if (d.status && d.status !== "published") why.push("no published review");
  if (d.methodology !== "v3.1" || HOLD[d.slug]) why.push("not scored on v3.1");
  if (!has(cap(d, "identity_verification"))) why.push("no document verification");
  if (!has(cap(d, "liveness"))) why.push("no liveness product");
  return { ok: !why.length, why };
}

export function scoreIdv(d) {
  const rows = RUBRIC.map(([key, name, weight]) => {
    const [s, note, evidence] = FN[key](d);
    return { key, criterion: name, weight, score: s == null ? null : half(s), note, evidence: s == null ? null : evidence };
  });
  const scored = rows.filter((r) => r.score != null);
  const w = scored.reduce((a, r) => a + r.weight, 0);
  const total = w ? Math.round((scored.reduce((a, r) => a + r.weight * r.score, 0) / w) * 10) / 10 : null;
  return { rows, total, coverage: w };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const rank = (yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"))[KEY]?.providers || []).map((p) => p.slug);
  const rows = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".yml"))) {
    const d = yaml.load(fs.readFileSync(path.join(dir, f), "utf8"));
    if (only.length && !only.includes(d.slug)) continue;
    const el = eligibility(d);
    if (!el.ok && !rank.includes(d.slug)) continue;
    const r = scoreIdv(d);
    const complete = NEW_KEYS.every((k) => cap(d, k));
    rows.push({ d, el, r, complete, oldRank: rank.indexOf(d.slug) + 1 || "" });
    if (only.length) {
      console.log(`\n${d.name}: overall ${d.score}, IDV ${r.total} (scored weight ${r.coverage}%)${el.ok ? "" : ` NOT ELIGIBLE: ${el.why.join("; ")}`}`);
      for (const x of r.rows) console.log(`  ${x.criterion.padEnd(28)} ${String(x.weight).padStart(3)}%  ${x.score ?? "n/d"}  ${x.note}`);
    }
  }
  // Rank only providers with the IDV 1.0 data collected; the rest are listed as pending.
  const ranked = rows.filter((x) => x.el.ok && x.complete && x.r.total != null)
    .sort((a, b) => b.r.total - a.r.total || (a.oldRank || 99) - (b.oldRank || 99));
  ranked.forEach((x, i) => (x.newRank = i + 1));
  const head = ["slug", "name", "eligible", "data_complete", "old_rank", "new_rank", "overall_score", "idv_score", "idv_grade", "weight_scored", ...RUBRIC.map((r) => r[0]), "not_eligible_because", "notes"];
  const out = [head];
  for (const x of [...ranked, ...rows.filter((x) => !ranked.includes(x))]) {
    const by = Object.fromEntries(x.r.rows.map((r) => [r.key, r]));
    out.push([x.d.slug, x.d.name, x.el.ok ? "yes" : "no", x.complete ? "yes" : "no", x.oldRank, x.newRank || "", x.d.score, x.r.total ?? "", x.r.total != null ? grade(x.r.total) : "", x.r.coverage,
      ...RUBRIC.map(([k]) => by[k].score ?? ""), x.el.why.join("; "), x.r.rows.map((r) => `${r.key}: ${r.note}`).join(" | ")]);
  }
  if (!only.length) {
    const csv = out.map((r) => r.map((c) => (/[",;\n|]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
    fs.writeFileSync(path.join(root, "reports/rescore-idv-1.0.csv"), csv);
    console.log("rank  provider            overall  IDV   was");
    for (const x of ranked) console.log(`${String(x.newRank).padStart(4)}  ${x.d.name.padEnd(18)} ${String(x.d.score).padStart(7)}  ${x.r.total.toFixed(1)}  #${x.oldRank || "-"}`);
    const pending = rows.filter((x) => x.el.ok && !x.complete).map((x) => x.d.slug);
    console.log(`\npending IDV 1.0 data (${pending.length}): ${pending.join(", ")}`);
    console.log(`report: reports/rescore-idv-1.0.csv`);
  }
}
