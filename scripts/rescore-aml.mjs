// Scores the AML ranking on AML 1.0 (docs/scoring-aml.md) from fields in the provider records.
// node scripts/rescore-aml.mjs            -> reports/rescore-aml-1.0.csv + summary (records unchanged)
// node scripts/rescore-aml.mjs sumsub ... -> only these slugs, prints the breakdown
// --write adds a generated category_scores.aml block to each eligible record (owner's call after the report).
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { pricing, HOLD, grade } from "./rescore.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const KEY = "aml";
const TODAY = new Date(process.env.AML_TODAY || new Date().toISOString().slice(0, 10));
const INCIDENTS = yaml.load(fs.readFileSync(path.join(root, "src/_data/incidents.yml"), "utf8")).items || [];
const half = (x) => Math.round(x * 2) / 2;
const clamp = (x) => Math.max(1, Math.min(5, x));
const cap = (d, k) => (d.capabilities || {})[k];
const int = (d, k) => (d.integration || {})[k];
const has = (c) => c && ["yes", "add_on", "partial"].includes(c.status);
// yes and add_on earn the full point, partial half (docs/scoring-aml.md, "Rules for every criterion").
const part = (c) => (!c ? 0 : ["yes", "add_on"].includes(c.status) ? 1 : c.status === "partial" ? 0.5 : 0);
const NEW_KEYS = ["list_coverage", "data_provenance", "transliteration", "secondary_identifiers", "whitelisting",
  "calibration_docs", "alert_reporting", "model_validation", "transfer_screening"];

export const RUBRIC = [
  ["data", "Sanctions, PEP and media data", 25],
  ["matching", "Match quality controls", 20],
  ["audit", "Calibration, testing and audit", 15],
  ["monitoring", "Ongoing and transfer monitoring", 15],
  ["pricing", "Pricing and total cost", 15],
  ["integration", "Integration", 10],
];

// Each criterion returns [points, reasons]; points are added to 1 and capped at 5.
function points(items) {
  let pts = 0; const why = [];
  for (const [w, label, max = 1] of items) if (w > 0) { pts += w; why.push(w < max ? `${label} (half)` : label); }
  return [pts, why];
}

function dataPts(d) {
  const lists = cap(d, "list_coverage")?.lists || [];
  const core = ["ofac", "eu", "uk", "un"].filter((l) => lists.includes(l)).length;
  const h = cap(d, "list_updates")?.hours;
  const am = cap(d, "adverse_media");
  return points([
    [core === 4 ? 1 : core === 3 ? 0.5 : 0, core === 4 ? "all four core lists named" : `${core} of 4 core lists named`],
    [h ? (h <= 24 ? 1 : 0.5) : 0, h ? `stated update time ${h <= 1 ? "1 hour or less" : `${h} hours`}` : ""],
    [part(cap(d, "pep_tiers")), "PEP tiers or relatives and close associates"],
    [am && has(am) && am.evidence ? 1 : 0, `adverse media sources ${am?.evidence}`],
    [0.5 * part(cap(d, "data_provenance")), "data source stated", 0.5],
  ]);
}

function matchPts(d) {
  return points([
    [part(cap(d, "fuzzy_matching")), "configurable matching threshold"],
    [part(cap(d, "transliteration")), "transliteration"],
    [part(cap(d, "secondary_identifiers")), "secondary identifiers"],
    [part(cap(d, "whitelisting")), "cleared matches suppressed"],
    [0.5 * part(cap(d, "alert_explanation")), "match explanation", 0.5],
    [cap(d, "match_test")?.independent && cap(d, "match_test")?.source ? 0.5 : 0, "independent match test", 0.5],
  ]);
}

const crit = (fn) => (d) => { const [p, why] = fn(d); return [clamp(half(p + 1)), why.join(", ") || "none found", "vendor"]; };

function audit(d) {
  const cm = cap(d, "case_management");
  const fe = cm?.four_eyes === "yes" ? 1 : has(cm) ? 0.5 : 0;
  const [p, why] = points([
    [part(cap(d, "audit_trail")), "audit trail"],
    [fe, cm?.four_eyes === "yes" ? "case management with approval step" : "case management"],
    [part(cap(d, "calibration_docs")), "public calibration documentation"],
    [part(cap(d, "alert_reporting")), "alert reporting"],
    [0.5 * part(cap(d, "model_validation")), "validation support", 0.5],
  ]);
  const recent = INCIDENTS.filter((x) => x.slug === d.slug && x.counted !== false && (TODAY - new Date(x.date)) / 864e5 <= 730);
  recent.forEach((x) => why.push(`incident ${x.date} (-1)`));
  return [clamp(half(p - recent.length + 1)), why.join(", ") || "none found", "vendor"];
}

function monitoring(d) {
  const om = cap(d, "ongoing_monitoring");
  const trig = om?.trigger;
  return crit(() => points([
    [has(om) ? (["list_change", "daily"].includes(trig) ? 1 : 0.5) : 0, trig ? `re-screening (${trig.replace("_", " ")})` : "re-screening, trigger not stated"],
    [part(cap(d, "transaction_monitoring")), "transaction monitoring"],
    [part(cap(d, "transfer_screening")), "payment or transfer screening"],
    [part(cap(d, "risk_scoring")), "customer risk scoring"],
  ]))(d);
}

function integration(d) {
  return crit(() => points([
    [part(int(d, "docs_public")), "public API docs"],
    [part(int(d, "sandbox")), "sandbox or trial"],
    [part(cap(d, "batch_screening")), "batch screening"],
    [part(int(d, "webhooks")), "webhooks"],
    [0.5 * part(int(d, "no_code")), "no-code dashboard", 0.5],
  ]))(d);
}

const FN = { data: crit(dataPts), matching: crit(matchPts), audit, monitoring, pricing: (d) => pricing(d), integration };

export function eligibility(d) {
  const why = [];
  if (d.status && d.status !== "published") why.push("no published review");
  if (d.methodology !== "v3.1" || HOLD[d.slug]) why.push("not scored on v3.1");
  if (!has(cap(d, "sanctions_pep"))) why.push("no sanctions and PEP screening");
  if (!has(cap(d, "ongoing_monitoring"))) why.push("no ongoing monitoring");
  if (!/^aml/.test(d.primary_category || "")) {
    const [dp] = dataPts(d), [mp] = matchPts(d);
    if (dp < 2 || mp < 2) why.push(`main product is not AML and screening docs earn ${dp} data and ${mp} matching points (2 + 2 needed)`);
  }
  return { ok: !why.length, why };
}

export function scoreAml(d) {
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
  const rank = (yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"))[KEY]?.providers || []).map((p) => p.slug).filter(Boolean);
  const rows = [];
  for (const slug of only.length ? only : rank) {
    const d = yaml.load(fs.readFileSync(path.join(dir, `${slug}.yml`), "utf8"));
    const el = eligibility(d);
    const r = scoreAml(d);
    const complete = NEW_KEYS.every((k) => cap(d, k)) && int(d, "webhooks");
    rows.push({ d, el, r, complete, oldRank: rank.indexOf(d.slug) + 1 || "" });
    if (only.length) {
      console.log(`\n${d.name}: overall ${d.score}, AML ${r.total} (scored weight ${r.coverage}%)${el.ok ? "" : ` NOT ELIGIBLE: ${el.why.join("; ")}`}`);
      for (const x of r.rows) console.log(`  ${x.criterion.padEnd(32)} ${String(x.weight).padStart(3)}%  ${x.score ?? "n/d"}  ${x.note}`);
    }
  }
  // Ties keep the current order.
  const ranked = rows.filter((x) => x.el.ok && x.complete && x.r.total != null)
    .sort((a, b) => b.r.total - a.r.total || (a.oldRank || 99) - (b.oldRank || 99));
  ranked.forEach((x, i) => (x.newRank = i + 1));
  const head = ["slug", "name", "eligible", "data_complete", "old_rank", "new_rank", "overall_score", "aml_score", "aml_grade", "weight_scored", ...RUBRIC.map((r) => r[0]), "not_eligible_because", "notes"];
  const out = [head];
  for (const x of [...ranked, ...rows.filter((x) => !ranked.includes(x))]) {
    const by = Object.fromEntries(x.r.rows.map((r) => [r.key, r]));
    out.push([x.d.slug, x.d.name, x.el.ok ? "yes" : "no", x.complete ? "yes" : "no", x.oldRank, x.newRank || "", x.d.score, x.r.total ?? "", x.r.total != null ? grade(x.r.total) : "", x.r.coverage,
      ...RUBRIC.map(([k]) => by[k].score ?? ""), x.el.why.join("; "), x.r.rows.map((r) => `${r.key}: ${r.note}`).join(" | ")]);
  }
  if (process.argv.includes("--write")) {
    for (const x of rows) {
      const file = path.join(dir, `${x.d.slug}.yml`);
      const text = fs.readFileSync(file, "utf8");
      let next = text.replace(/\n# AML score: generated by scripts\/rescore-aml\.mjs[\s\S]*?# end AML score\n/, "\n");
      if (x.el.ok && x.complete && x.r.total != null) {
        const head = /^category_scores:/m.test(next) ? [] : ["category_scores:"];
        if (!head.length && next.slice(next.search(/^category_scores:/m)).split("\n").slice(1).some((l) => /^[^\s#]/.test(l)))
          throw new Error(`${x.d.slug}: category_scores is not the last key; move it to the end first`);
        const block = [`# AML score: generated by scripts/rescore-aml.mjs, do not edit`, ...head, `  ${KEY}:`,
          `    score: ${x.r.total.toFixed(1)}`, `    grade: ${grade(x.r.total)}`, `    methodology: aml-1.0`, `    scored: '${TODAY.toISOString().slice(0, 10)}'`, `    breakdown:`,
          ...x.r.rows.flatMap((r) => [`    - criterion: ${JSON.stringify(r.criterion)}`, `      weight: ${r.weight}`, `      score: ${r.score ?? "null"}`,
            `      note: ${JSON.stringify(r.note)}`, `      evidence: ${r.evidence ?? "null"}`]), `# end AML score`].join("\n");
        next = next.replace(/\n*$/, "\n") + block + "\n";
      }
      const check = yaml.load(next);
      if (x.el.ok && x.complete && check.category_scores?.[KEY]?.score !== +x.r.total.toFixed(1)) throw new Error(`${x.d.slug}: block not readable`);
      if (next !== text) fs.writeFileSync(file, next);
    }
    console.log("wrote category_scores." + KEY);
  }
  if (!only.length) {
    const csv = out.map((r) => r.map((c) => (/[",;\n|]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
    fs.writeFileSync(path.join(root, "reports/rescore-aml-1.0.csv"), csv);
    console.log("rank  provider           overall  AML   data match audit monit price integ  was");
    for (const x of ranked) {
      const s = Object.fromEntries(x.r.rows.map((r) => [r.key, r.score ?? "-"]));
      console.log(`${String(x.newRank).padStart(4)}  ${x.d.name.padEnd(17)} ${String(x.d.score).padStart(7)}  ${x.r.total.toFixed(1)}   ${[s.data, s.matching, s.audit, s.monitoring, s.pricing, s.integration].map((v) => String(v).padEnd(5)).join(" ")} #${x.oldRank || "-"}`);
    }
    const out2 = rows.filter((x) => !ranked.includes(x));
    if (out2.length) console.log("\nnot ranked:\n" + out2.map((x) => `  ${x.d.slug}: ${x.el.why.join("; ") || "data incomplete"}`).join("\n"));
    console.log(`report: reports/rescore-aml-1.0.csv`);
  }
}
