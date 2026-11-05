// Scores providers on rubric v3.1 (docs/scoring-v3.1.md) from fields in their records.
// node scripts/rescore.mjs            -> reports/rescore-v3.1.csv + summary (records unchanged)
// node scripts/rescore.mjs --write    -> also writes score_breakdown[] (not score) into records
// node scripts/rescore.mjs sumsub ... -> only these slugs, prints the breakdown
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const only = args.filter((a) => !a.startsWith("--"));
const TODAY = new Date("2026-11-05");
// Incidents come from the tracker file (one record feeds /incidents/, reviews and the score).
const INCIDENTS = (yaml.load(fs.readFileSync(path.join(root, "src/_data/incidents.yml"), "utf8")).items || []);

export const RUBRICS = {
  identity: [
    ["fraud_defense", "Fraud defense", 25], ["pricing", "Pricing and total cost", 20], ["coverage", "Coverage", 15],
    ["breadth", "Platform breadth", 15], ["integration", "Integration and time to launch", 15], ["trust", "Trust and track record", 10],
  ],
  aml: [
    ["screening", "Screening data and match quality", 25], ["pricing", "Pricing and total cost", 20], ["workflow", "Investigation and audit workflow", 15],
    ["breadth", "Platform breadth", 15], ["integration", "Integration and time to launch", 15], ["trust", "Trust and track record", 10],
  ],
};
const familyOf = (d) => (/^aml/.test(d.primary_category) ? "aml" : d.primary_category === "travel-rule" ? null : "identity");

// Reader-facing labels for breakdown notes (shown on review pages).
const LABEL = { idv: "identity verification", kyb: "KYB", screening: "sanctions screening", monitoring: "monitoring", case_management: "case management",
  video_ident: "video ident", reusable_id: "reusable ID", age: "age checks", adverse_media: "adverse media", kyc: "identity verification",
  docs_public: "public API docs", sandbox: "self-serve sandbox or trial", no_code: "no-code or hosted flow", support_hours: "published support hours",
  identity_verification: "identity verification", liveness: "liveness", nfc: "NFC", age_facial_estimation: "facial age estimation",
  kyb_registry: "registry checks", kyb_ubo: "UBO discovery", kyb_entity_screening: "entity screening", kyb_monitoring: "ongoing monitoring", kyb_documents: "company documents",
  age_document: "ID document", age_email_estimation: "email estimation", age_mobile_operator: "mobile operator", age_credit_card: "credit card",
  age_open_banking: "open banking", age_digital_id: "digital ID", age_reusable: "reusable age result",
  list_updates: "stated list update frequency", pep_tiers: "PEP tiers", fuzzy_matching: "configurable fuzzy matching", ongoing_monitoring: "ongoing re-screening",
  alert_explanation: "match reasons shown", audit_trail: "audit trail", risk_scoring: "risk scoring", batch_screening: "batch screening" };
const lab = (ks) => ks.map((k) => LABEL[k] || k).join(", ");
const fmt = (n) => Number(n).toLocaleString("en-US");
const has = (c) => c && ["yes", "add_on", "partial"].includes(c.status);
const yes = (c) => c && c.status === "yes";
const cap = (d, k) => (d.capabilities || {})[k];
const certs = (d) => d.certifications || [];
const half = (x) => Math.round(x * 2) / 2;
const clamp = (x, lo = 1, hi = 5) => Math.max(lo, Math.min(hi, x));
const known = (c) => c && c.status && c.status !== "not_disclosed";

function fraudDefense(d) {
  if (d.primary_category === "kyb") {
    const keys = ["kyb_registry", "kyb_ubo", "kyb_documents", "kyb_monitoring"];
    if (!keys.some((k) => known(cap(d, k)))) return [null, "no KYB data"];
    let s = 4 - 0.5 * keys.filter((k) => !has(cap(d, k))).length;
    if (keys.some((k) => cap(d, k)?.independent)) s += 0.5;
    return [s, "KYB guide", "vendor"];
  }
  const pad = certs(d).filter((c) => /30107/.test(c.name));
  // Level from name or "what"; a confirmed PAD certificate without a stated level counts as Level 1.
  const lvl = Math.max(0, ...pad.filter((c) => c.status === "confirmed").map((c) => +(((c.name + " " + (c.what || "")).match(/Level\s*(\d)/i) || [])[1] || 1)));
  let s, why, ev = "independent";
  if (lvl >= 3) [s, why] = [4.5, "PAD Level 3 lab result"];
  else if (lvl === 2) [s, why] = [4, "PAD Level 2 lab result"];
  else if (lvl === 1) [s, why] = [3, "PAD Level 1 lab result"];
  else if (pad.length || yes(cap(d, "liveness"))) [s, why, ev] = [2, "liveness, no lab letter", "vendor"];
  else if (cap(d, "liveness")?.status === "no" || cap(d, "identity_verification")?.status === "no") [s, why, ev] = [1.5, "no liveness product", "vendor"];
  else return [null, "no liveness data"];
  const inj = cap(d, "injection_detection");
  if (yes(inj) && inj.independent) { s += 0.5; why += ", tested injection detection"; }
  if (certs(d).some((c) => /NIST (FRTE|FATE)/i.test(c.name) && c.status === "confirmed")) { s += 0.5; why += ", NIST listing"; }
  if (has(cap(d, "nfc"))) { s += 0.5; why += ", NFC"; }
  return [clamp(s), why, ev];
}

function pricing(d) {
  const m = d.pricing?.model;
  if (!m || !m.published) return [null, "pricing.model missing"];
  if (m.published === "core") {
    let s = 4 + (m.minimum === false ? 0.5 : 0) + (m.trial ? 0.5 : 0);
    return [s, `published${m.minimum ? ", monthly minimum" : ""}${m.trial ? ", trial or free tier" : ""}`, "vendor"];
  }
  if (m.published === "partial") return [3, "some modules priced", "vendor"];
  // Quote only: the absence of a published price is itself a known fact, so it scores 2 whether or not
  // third-party data exists (otherwise a vendor with Vendr data would score below one with none).
  return [2, "no published price, quoted by sales", "vendor"];
}

function coverage(d) {
  const c = d.coverage;
  const n = c?.countries?.value, docs = c?.document_types?.value;
  if (!n) return [null, "country count not disclosed"];
  let s;
  // 180+ countries counts as global coverage (owner, 2026-11-05).
  const global = n >= 180;
  if (global && docs >= 10000) s = has(c.non_doc) ? 5 : 4.5;
  else if (global && docs >= 5000) s = 4;
  else if (global) s = 3.5;
  else if (n >= 100) s = 3;
  else s = 2;
  return [s, `${fmt(n)} countries and territories${docs ? `, ${fmt(docs)} document types` : ""}${has(c.non_doc) ? ", checks without a document" : ""}`, "vendor"];
}

// Specialists are scored on the modules of their own category (owner, 2026-11-05).
const SCOPE_BY_CATEGORY = { kyb: "kyb", "liveness-detection": "liveness", "age-verification": "age" };
const SCOPE_BY_SLUG = { regula: "document" };
function scopedBreadth(d, scope) {
  const c = (k) => has(cap(d, k));
  const sets = {
    kyb: ["kyb_registry", "kyb_ubo", "kyb_entity_screening", "kyb_monitoring", "kyb_documents"],
    liveness: ["identity_verification", "liveness", "video_ident", "reusable_id", "age_facial_estimation"],
    document: ["identity_verification", "nfc", "liveness", "video_ident", "reusable_id"],
    age: ["age_document", "age_facial_estimation", "age_email_estimation", "age_mobile_operator", "age_credit_card", "age_open_banking", "age_digital_id", "age_reusable"],
  };
  const keys = sets[scope];
  const n = keys.filter(c).length;
  const table = scope === "age" ? { 8: 5, 7: 5, 6: 5, 5: 4, 4: 4, 3: 3, 2: 2, 1: 1.5, 0: 1 } : { 5: 5, 4: 4, 3: 3, 2: 2, 1: 1.5, 0: 1 };
  return [table[n], `${n} of ${keys.length} ${scope} modules: ${lab(keys.filter(c))}`, "vendor"];
}
function breadth(d, fam) {
  const scope = SCOPE_BY_SLUG[d.slug] || (fam === "identity" && SCOPE_BY_CATEGORY[d.primary_category]);
  if (scope) return scopedBreadth(d, scope);
  const kyb = ["kyb_registry", "kyb_entity_screening"].some((k) => has(cap(d, k)));
  const age = Object.keys(d.capabilities || {}).some((k) => k.startsWith("age_") && k !== "age_certification" && has(cap(d, k)));
  const mon = has(cap(d, "transaction_monitoring")) || has(cap(d, "ongoing_monitoring"));
  const mods = fam === "aml"
    ? { screening: has(cap(d, "sanctions_pep")), adverse_media: has(cap(d, "adverse_media")), monitoring: mon, case_management: has(cap(d, "case_management")), kyb, kyc: has(cap(d, "identity_verification")) }
    : { idv: has(cap(d, "identity_verification")), kyb, screening: has(cap(d, "sanctions_pep")), monitoring: mon, case_management: has(cap(d, "case_management")), video_ident: has(cap(d, "video_ident")), reusable_id: has(cap(d, "reusable_id")), age };
  const n = Object.values(mods).filter(Boolean).length;
  if (!d.capabilities || Object.keys(d.capabilities).length < 2) return [null, "capabilities missing"];
  const table = fam === "aml" ? { 6: 5, 5: 4, 4: 3.5, 3: 3, 2: 2, 1: 1.5, 0: 1 } : { 8: 5, 7: 5, 6: 4, 5: 4, 4: 3, 3: 3, 2: 2, 1: 1.5, 0: 1 };
  return [table[n], `${n} of ${Object.keys(mods).length} modules: ${lab(Object.entries(mods).filter(([, v]) => v).map(([k]) => k))}`, "vendor"];
}

function integration(d) {
  const i = d.integration;
  if (!i) return [null, "integration missing"];
  const sdks = ["sdk_web", "sdk_ios", "sdk_android"].filter((k) => yes(i[k])).length;
  const pts = (yes(i.docs_public) ? 1 : 0) + (sdks === 3 ? 1 : sdks ? 0.5 : 0) + (yes(i.sandbox) ? 1 : 0) + (yes(i.no_code) ? 1 : 0) + (yes(i.support_hours) ? 1 : 0);
  const got = ["docs_public", "sandbox", "no_code", "support_hours"].filter((k) => yes(i[k])).map((k) => LABEL[k]);
  if (sdks) got.push(sdks === 3 ? "web, iOS and Android SDKs" : `${sdks} of 3 SDKs`);
  return [clamp(pts + 1), got.join(", ") || "none found", "vendor"];
}

function trust(d) {
  let pts = 0; const why = [];
  const sec = certs(d).filter((c) => /27001|SOC 2/i.test(c.name));
  if (sec.some((c) => c.status === "confirmed")) { pts += 2; why.push("ISO 27001 or SOC 2 confirmed"); }
  else if (sec.some((c) => c.status === "vendor_stated")) { pts += 1; why.push("ISO 27001 or SOC 2 vendor-stated"); }
  if (certs(d).some((c) => c.status === "confirmed" && /DIATF|Digital Verification Serv|29003|eIDAS|ETSI|Kantara|PVID/i.test(c.name + " " + (c.what || "")))) { pts += 1.5; why.push("trust framework confirmed"); }
  const dep = cap(d, "deployment")?.status;
  if (yes(cap(d, "data_residency")) || ["on_prem", "cloud_and_on_prem"].includes(dep)) { pts += 0.5; why.push("data residency or on-premises"); }
  const founded = +(String((d.facts || []).find((f) => /^(Founded|Incorporated|Established)$/i.test(f.label))?.value || "").match(/\b(19|20)\d{2}\b/)?.[0] || NaN);
  const own = d.track_record?.ownership?.status;
  if (founded && TODAY.getFullYear() - founded >= 5 && ["stable", "changed_disclosed"].includes(own)) { pts += 1; why.push(`operating since ${founded}`); }
  const recent = INCIDENTS.filter((x) => x.slug === d.slug && x.counted !== false && (TODAY - new Date(x.date)) / 864e5 <= 730);
  pts -= recent.length; recent.forEach((x) => why.push(`incident ${x.date}`));
  return [clamp(half(pts + 1)), why.join(", ") || "no public evidence", sec.some((c) => c.status === "confirmed") ? "independent" : "vendor"];
}

function screening(d) {
  const keys = ["list_updates", "pep_tiers", "adverse_media", "fuzzy_matching", "ongoing_monitoring"];
  if (!keys.some((k) => known(cap(d, k)))) return [null, "no screening data"];
  let pts = keys.filter((k) => has(cap(d, k))).length;
  if (keys.some((k) => cap(d, k)?.independent)) pts += 0.5;
  return [clamp(pts + 1), lab(keys.filter((k) => has(cap(d, k)))), "vendor"];
}

function workflow(d) {
  const keys = ["case_management", "alert_explanation", "audit_trail", "risk_scoring", "batch_screening"];
  if (!keys.some((k) => known(cap(d, k)))) return [null, "no workflow data"];
  return [clamp(keys.filter((k) => has(cap(d, k))).length + 1), lab(keys.filter((k) => has(cap(d, k)))), "vendor"];
}

const FN = { fraud_defense: fraudDefense, pricing, coverage, breadth, integration, trust, screening, workflow };

// Kept on their v3.0 score until per-category methodologies exist (owner, 2026-11-05).
export const HOLD = { quantexa: "entity resolution layer", verified: "Nordic eID and AML", verifymy: "age assurance", paravision: "face biometrics engine" };
// Grade bands for v3.1 (owner asked to reset them, 2026-11-05).
export const grade = (s) => (s >= 4.5 ? "Excellent" : s >= 4.0 ? "Great" : s >= 3.5 ? "Very Good" : s >= 3.0 ? "Good" : "Fair");
export function score(d) {
  const fam = familyOf(d);
  if (!fam || HOLD[d.slug]) return null;
  const rows = RUBRICS[fam].map(([key, name, weight]) => {
    const [s, note, evidence] = FN[key](d, fam);
    return { key, criterion: name, weight, score: s == null ? null : half(s), note, evidence: s == null ? null : evidence };
  });
  const scored = rows.filter((r) => r.score != null);
  const w = scored.reduce((a, r) => a + r.weight, 0);
  const total = w ? Math.round((scored.reduce((a, r) => a + r.weight * r.score, 0) / w) * 10) / 10 : null;
  const alt = rows.filter((r) => r.score != null && !(r.key === "pricing" && d.pricing?.model?.published === "none"));
  const wa = alt.reduce((a, r) => a + r.weight, 0);
  const totalAlt = wa ? Math.round((alt.reduce((a, r) => a + r.weight * r.score, 0) / wa) * 10) / 10 : null;
  return { family: fam, rows, total, coverage: w, totalAlt };
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yml")).map((f) => f.replace(/\.yml$/, "")).filter((s) => !only.length || only.includes(s));
const held = [];
const out = [["slug", "family", "old_score", "new_score", "new_grade", "change", "alt_quote_not_scored", "weight_scored", ...RUBRICS.identity.map((r) => r[0]), "screening", "workflow", "missing"]];
for (const slug of files) {
  const file = path.join(dir, `${slug}.yml`);
  const text = fs.readFileSync(file, "utf8");
  const d = yaml.load(text);
  if (d.status && d.status !== "published") continue;
  if (HOLD[slug]) { held.push(`${slug} (${HOLD[slug]}): kept at ${d.score}`); continue; }
  const r = score(d);
  if (!r) continue;
  const by = Object.fromEntries(r.rows.map((x) => [x.key, x.score ?? ""]));
  const missing = r.rows.filter((x) => x.score == null).map((x) => `${x.key}: ${x.note}`).join("; ");
  out.push([slug, r.family, d.score, r.total ?? "", r.total != null ? grade(r.total) : "", r.total != null ? (r.total - d.score).toFixed(1) : "", r.totalAlt ?? "", r.coverage,
    ...RUBRICS.identity.map((x) => by[x[0]] ?? ""), by.screening ?? "", by.workflow ?? "", missing]);
  if (only.length) {
    console.log(`\n${d.name} (${r.family}): ${d.score} -> ${r.total} (scored weight ${r.coverage}%)`);
    for (const x of r.rows) console.log(`  ${x.criterion.padEnd(34)} ${String(x.weight).padStart(3)}%  ${x.score ?? "n/d"}  ${x.note}`);
  }
  if (WRITE && r.total != null) {
    const block = "score_breakdown:\n" + r.rows.map((x) => `- criterion: ${JSON.stringify(x.criterion)}\n  weight: ${x.weight}\n  score: ${x.score ?? "null"}\n  note: ${JSON.stringify(x.note)}\n  evidence: ${x.evidence ?? "null"}`).join("\n") + "\n";
    const next = text.replace(/^score_breakdown:(?:\s*\[\])?\n(?:(?:-|  ).*\n)*/m, block)
      .replace(/^score: .*$/m, `score: ${r.total.toFixed(1)}`)
      .replace(/^grade: .*$/m, `grade: ${grade(r.total)}`)
      .replace(/^methodology: .*\n/m, "")
      .replace(/^(grade: .*)$/m, "$1\nmethodology: v3.1");
    fs.writeFileSync(file, next);
  }
}
if (!only.length) {
  const csv = out.map((r) => r.map((c) => (/[",;]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(root, "reports/rescore-v3.1.csv"), csv);
  const full = out.slice(1).filter((r) => r[7] === 100).length;
  if (held.length) console.log("held on v3.0: " + held.join("; "));
  console.log(`scored ${out.length - 1} providers; ${full} with all criteria; report: reports/rescore-v3.1.csv`);
}
