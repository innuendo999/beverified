// Scores the Fraud Prevention ranking on Fraud 1.0 (docs/scoring-fraud.md) from fields in the provider records.
// node scripts/rescore-fraud.mjs            -> reports/rescore-fraud-1.0.csv + summary (records unchanged)
// node scripts/rescore-fraud.mjs seon ...   -> only these slugs, prints the breakdown
// --write adds a generated category_scores.fraud-prevention block to each eligible record (owner's call after the report).
// Points: only `yes` and `add_on` count; `partial`, `not_disclosed` and `no` earn nothing (spec, "Rules for every criterion").
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const KEY = "fraud-prevention";
const TODAY = new Date(process.env.FRAUD_TODAY || new Date().toISOString().slice(0, 10));
const INCIDENTS = yaml.load(fs.readFileSync(path.join(root, "src/_data/incidents.yml"), "utf8")).items || [];
export const CANDIDATES = ["seon", "sardine", "feedzai", "unit21", "hawkai", "socure", "nice-actimize", "quantexa", "complyadvantage", "sumsub"];

const half = (x) => Math.round(x * 2) / 2;
const cap5 = (x) => Math.max(1, Math.min(5, x));
const c = (d, k) => (d.capabilities || {})[k];
const on = (v) => (v && typeof v === "object" ? ["yes", "add_on"].includes(v.status) : ["yes", "add_on"].includes(v));
const sum = (items) => {
  let pts = 0; const why = [];
  for (const [ok, w, label] of items) if (ok) { pts += w; why.push(w === 1 ? label : `${label} (${w})`); }
  return [pts, why];
};

export const RUBRIC = [
  ["coverage", "Fraud coverage", 25],
  ["signals", "Signals", 15],
  ["decisioning", "Decisioning and control", 15],
  ["investigations", "Investigations", 10],
  ["fit", "Bank and fintech fit", 10],
  ["integration", "Integration and openness", 10],
  ["trust", "Trust", 10],
  ["pricing", "Pricing transparency", 5],
];

function coverage(d) {
  const [p, why] = sum([
    [on(c(d, "fraud_scam")), 1.5, "scams"],
    [on(c(d, "fraud_ato")), 1.5, "account takeover"],
    [on(c(d, "fraud_transaction")), 1, "card and payment"],
    [on(c(d, "fraud_check")), 1, "check"],
    [on(c(d, "fraud_onboarding")), 1, "onboarding"],
    [on(c(d, "fraud_mule")), 1, "mules"],
  ]);
  return [half(1 + (4 * p) / 7), why];
}
function signals(d) {
  const [p, why] = sum([
    [on(c(d, "behavioral_biometrics")), 1.5, "behavioural biometrics"],
    [on(c(d, "device_intelligence")), 1, "device"],
    [on(c(d, "graph_analytics")), 1, "graph"],
    [on(c(d, "fraud_consortium")), 1, "consortium"],
  ]);
  return [cap5(half(p + 1)), why];
}
function decisioning(d) {
  const [p, why] = sum([
    [on(c(d, "realtime_decisioning")), 1, "real-time decision"],
    [on(c(d, "fraud_rules")), 1, "no-code rules"],
    [on(c(d, "rule_testing")), 1, "rule testing"],
    [on(c(d, "payment_interventions")), 1, "graduated interventions"],
    [on(c(d, "explainability")), 1, "explanation"],
  ]);
  return [cap5(half(p)), why];
}
function investigations(d) {
  const [p, why] = sum([
    [on(c(d, "case_management")), 1.5, "case management"],
    [on(c(d, "ai_investigation")), 1, "AI investigation"],
    [on(c(d, "regulatory_filing")), 1, "filing from a case"],
    [on(c(d, "alert_prioritisation")), 0.5, "alert prioritisation"],
  ]);
  return [cap5(half(p + 1)), why];
}
function fit(d) {
  const dep = c(d, "deployment")?.status;
  const [p, why] = sum([
    [on(c(d, "payee_verification")), 1, "payee verification"],
    [on(c(d, "instant_payments")), 1, "instant rails named"],
    [on(c(d, "transaction_monitoring")), 1, "fraud and AML on one platform"],
    [["on_prem", "cloud_and_on_prem", "private_cloud"].includes(dep) || /private cloud|on-prem/i.test(c(d, "deployment")?.note || "") || on(c(d, "data_residency")), 0.5, "on-prem, private cloud or residency"],
    [on(c(d, "named_fi_customers")), 0.5, "named FI customers"],
  ]);
  return [cap5(half(p + 1)), why];
}
function integration(d) {
  const i = d.integration || {};
  const sdks = on(i.sdk_web) && (on(i.sdk_ios) || on(i.sdk_android));
  const [p, why] = sum([
    [on(i.docs_public), 1, "public docs"],
    [on(i.sandbox), 1, "sandbox or trial"],
    [on(c(d, "custom_models")), 1, "own data or models"],
    [on(c(d, "data_orchestration")), 0.5, "third-party data orchestration"],
    [sdks, 0.5, "web and mobile SDKs"],
  ]);
  return [cap5(half(p + 1)), why];
}
function trust(d) {
  const certs = d.certifications || [];
  const sec = certs.filter((x) => /27001|SOC 2.*Type (2|II)\b/i.test(x.name || "") && !/progress/i.test(x.name || ""));
  const pci = certs.filter((x) => /PCI DSS/i.test(x.name || ""));
  const conf = (l) => l.some((x) => x.status === "confirmed");
  const stated = (l) => l.some((x) => x.status === "vendor_stated");
  const own = d.track_record?.ownership?.status;
  const items = [
    [conf(sec), 2, "ISO 27001 or SOC 2 Type 2 confirmed"],
    [!conf(sec) && stated(sec), 1, "ISO 27001 or SOC 2 Type 2 vendor-stated"],
    [conf(pci), 1, "PCI DSS confirmed"],
    [!conf(pci) && stated(pci), 0.5, "PCI DSS vendor-stated"],
    [own === "stable", 1, "no sale or owner change"],
  ];
  let [p, why] = sum(items);
  const cutoff = new Date(TODAY); cutoff.setUTCDate(cutoff.getUTCDate() - 730);
  for (const x of INCIDENTS) {
    if (x.slug !== d.slug || x.counted === false || new Date(String(x.date)) < cutoff) continue;
    p -= 1; why.push(`incident ${x.id} (-1)`);
  }
  if (own && own !== "stable") why.push(`ownership: ${own}`);
  return [cap5(half(p + 1)), why];
}
function pricing(d) {
  const s = c(d, "fraud_pricing")?.status;
  const map = { published_list: 5, entry_plan: 4, model: 3, quote: 2 };
  return [map[s] ?? 2, [s || "quote"]];
}
const FN = { coverage, signals, decisioning, investigations, fit, integration, trust, pricing };

export function eligible(d) {
  if (d.status !== "published") return { ok: false, why: "no published review" };
  const types = ["fraud_transaction", "fraud_ato", "fraud_scam", "fraud_onboarding"].filter((k) => on(c(d, k)));
  if (!types.length) return { ok: false, why: "no fraud product for FIs or fintechs on its own site" };
  return { ok: true, why: `fraud product: ${types.join(", ")}` };
}

export function score(d) {
  const parts = RUBRIC.map(([k, name, w]) => { const [s, why] = FN[k](d); return { key: k, name, weight: w, score: s, why }; });
  const total = parts.reduce((a, p) => a + p.score * p.weight, 0) / 100;
  return { total: Math.round(total * 10) / 10, parts };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const slugs = only.length ? only : CANDIDATES;
  const rows = slugs.map((s) => {
    const file = path.join(dir, `${s}.yml`);
    const text = fs.readFileSync(file, "utf8");
    const d = yaml.load(text);
    return { s, file, text, d, el: eligible(d), r: score(d) };
  });
  rows.sort((a, b) => (b.el.ok - a.el.ok) || (b.r.total - a.r.total) || a.d.name.localeCompare(b.d.name));
  let rank = 0;
  for (const x of rows) x.rank = x.el.ok ? ++rank : "";
  if (only.length) for (const x of rows) {
    console.log(`\n${x.d.name}: ${x.r.total} (${x.el.ok ? "eligible" : "not eligible: " + x.el.why})`);
    for (const p of x.r.parts) console.log(`  ${p.name} ${p.weight}%: ${p.score}  ${p.why.join("; ")}`);
  }
  const head = ["rank", "provider", "eligible", "eligibility", "fraud_score", "overall_score", ...RUBRIC.map(([k]) => k), ...RUBRIC.map(([k]) => `${k}_why`)];
  const out = [head, ...rows.map((x) => [x.rank, x.d.name, x.el.ok, x.el.why, x.r.total, x.d.score, ...x.r.parts.map((p) => p.score), ...x.r.parts.map((p) => p.why.join("; "))])];
  if (!only.length) {
    const csv = out.map((r) => r.map((v) => (/[",;\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)).join(",")).join("\n") + "\n";
    fs.writeFileSync(path.join(root, "reports/rescore-fraud-1.0.csv"), csv);
    console.log("rank | provider | Fraud | overall | " + RUBRIC.map(([, n]) => n).join(" | "));
    for (const x of rows) console.log(`${x.rank || "-"} | ${x.d.name} | ${x.el.ok ? x.r.total : "not eligible"} | ${x.d.score} | ${x.r.parts.map((p) => p.score).join(" | ")}`);
    console.log("report: reports/rescore-fraud-1.0.csv");
  }
  if (process.argv.includes("--write")) {
    for (const x of rows) {
      if (!x.el.ok) continue;
      const block = [`  ${KEY}:`, `    score: ${x.r.total.toFixed(1)}`, `    methodology: fraud-1.0`, `    scored: '${TODAY.toISOString().slice(0, 10)}'`, `    breakdown:`,
        ...x.r.parts.map((p) => `    - {key: ${p.key}, score: ${p.score}}`)].join("\n");
      let t = x.text.replace(new RegExp(`\\n  ${KEY}:\\n(    .*\\n)+`), "\n");
      if (/^category_scores:/m.test(t)) {
        const tail = t.slice(t.search(/^category_scores:/m)).split("\n").slice(1);
        if (tail.some((l) => /^[^\s#]/.test(l))) throw new Error(`${x.s}: category_scores is not the last key`);
        t = t.replace(/\n*$/, "\n") + block + "\n";
      } else t = t.replace(/\n*$/, "\n") + "category_scores:\n" + block + "\n";
      const check = yaml.load(t);
      if (check.category_scores?.[KEY]?.score !== x.r.total) throw new Error(`${x.s}: block not readable`);
      fs.writeFileSync(x.file, t);
    }
    console.log("wrote category_scores." + KEY);
  }
}
