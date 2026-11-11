// Scores providers on the Budget KYC rubric 1.0 (docs/scoring-budget-kyc.md) from their budget{} block.
// node scripts/rescore-budget.mjs          -> reports/rescore-budget-1.0.csv + summary (records unchanged)
// node scripts/rescore-budget.mjs --write  -> also writes category_scores.cheap-kyc into eligible records
// node scripts/rescore-budget.mjs zyphe    -> prints the breakdown for these slugs
//
// Prices are never typed into budget{}: each option points at pricing.items by label, and the amount is read
// from that item's value (pick = which amount when one value lists several, e.g. "$1.05 (Starter) / $0.75 (Core)").
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { fraudDefense, coverage, breadth, integration } from "./rescore.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const WRITE = process.argv.includes("--write");
const KEY = "cheap-kyc";
const TODAY = new Date(process.env.BUDGET_TODAY || new Date().toISOString().slice(0, 10));
const VOLUMES = { s: 100, m: 1000 };
const grade = (s) => (s >= 4.5 ? "Excellent" : s >= 4.0 ? "Great" : s >= 3.5 ? "Very Good" : s >= 3.0 ? "Good" : "Fair");
const half = (x) => Math.round(x * 2) / 2;
const clamp = (x) => Math.max(1, Math.min(5, x));
const usd = (n) => `$${n.toFixed(2)}`;

export const RUBRIC = [
  ["cost", "Cost at 100 and 1,000 checks a month", 30],
  ["aml_cost", "AML screening cost", 10],
  ["fraud_defense", "Quality: fraud defense", 12.5],
  ["coverage", "Quality: coverage", 7.5],
  ["breadth", "Quality: platform breadth", 7.5],
  ["integration", "Quality: integration and time to launch", 7.5],
  ["terms", "Commitment and entry terms", 15],
  ["transparency", "Price transparency", 10],
];

// ---- reading prices from the record -------------------------------------------------------------
function item(d, ref) {
  const r = typeof ref === "string" ? { label: ref } : ref;
  const it = (d.pricing?.items || []).find((x) => x.label === r.label);
  if (!it) throw new Error(`${d.slug}: pricing item not found: ${r.label}`);
  const amounts = [...String(it.value).matchAll(/[$€£]\s?([\d,]+(?:\.\d+)?)/g)].map((m) => +m[1].replace(/,/g, ""));
  const v = amounts[r.pick ?? 0];
  if (v == null) throw new Error(`${d.slug}: no amount in "${it.value}"`);
  return { value: v, verified: it.verified, label: r.label };
}
const toUsd = (b, v) => (b.currency === "USD" ? v : b.fx?.rate ? v * b.fx.rate : null);

// Monthly cost of one option at n checks, in USD. Credited minimum = a floor; fee_on_top is added.
function optionCost(d, b, opt, n, withAml) {
  if (withAml && !opt.aml_included && !opt.aml) return null;
  const parts = [...opt.check, ...(withAml && !opt.aml_included ? opt.aml : [])].map((r) => item(d, r).value);
  const per = parts.reduce((a, x) => a + x, 0);
  const min = opt.minimum ? item(d, opt.minimum.item).value : 0;
  const fee = opt.fee_on_top ? item(d, opt.fee_on_top).value : 0;
  const cur = Math.max(n * per, min) + fee;
  const v = toUsd(b, cur);
  return v == null ? null : { usd: v, per, min, plan: opt.plan };
}
function cheapest(d, b, n, withAml) {
  const xs = b.options.map((o) => optionCost(d, b, o, n, withAml)).filter(Boolean);
  return xs.length ? xs.reduce((a, x) => (x.usd < a.usd ? x : a)) : null;
}

// ---- eligibility ----------------------------------------------------------------------------------
const asIdentity = (d) => ({ ...d, primary_category: "identity-verification" });
export function eligibility(d) {
  const b = d.budget;
  const why = [];
  if (d.status && d.status !== "published") why.push("no published review");
  if (!b?.options?.length) return { ok: false, why: ["no public price for a full KYC check"] };
  const checked = new Date(b.checked);
  if (!b.checked) why.push("no price check date recorded");
  else if ((TODAY - checked) / 864e5 > 90) why.push(`price check older than 90 days (${b.checked})`);
  for (const o of b.options) if (o.minimum && o.minimum.covers_checks !== true) why.push(`${o.plan}: minimum not stated to cover checks`);
  if (b.currency !== "USD" && !b.fx?.rate) why.push(`no ECB rate for ${b.currency}`);
  const [fd] = fraudDefense(asIdentity(d));
  if (fd == null || fd < 2) why.push("no liveness product found");
  return { ok: !why.length, why };
}

// ---- criteria -------------------------------------------------------------------------------------
const costBand = (p) => (p <= 0.5 ? 5 : p <= 0.9 ? 4 : p <= 1.4 ? 3 : p <= 2.0 ? 2 : 1);
function cost(d, b) {
  const s = cheapest(d, b, VOLUMES.s, false), m = cheapest(d, b, VOLUMES.m, false);
  if (!s || !m) return [null, "price not convertible"];
  const ps = s.usd / VOLUMES.s, pm = m.usd / VOLUMES.m;
  return [(costBand(ps) + costBand(pm)) / 2, `${usd(ps)} a check at 100 a month (${s.plan}), ${usd(pm)} at 1,000 (${m.plan})`, "vendor", { ps, pm }];
}
function amlCost(d, b) {
  if (b.aml_status === "not_sold") return [1, "screening not sold", "vendor"];
  const k = cheapest(d, b, VOLUMES.m, false), a = cheapest(d, b, VOLUMES.m, true);
  if (!a) return [null, "screening price not published"];
  const per = Math.max(0, (a.usd - k.usd) / VOLUMES.m);
  if (per === 0) return [5, "included in the KYC price", "vendor", { per }];
  const s = per <= 0.25 ? 4 : per <= 0.5 ? 3 : per <= 1 ? 2 : 1;
  return [s, `${usd(per)} a check at 1,000 a month${a.plan !== k.plan ? ` (needs the ${a.plan} plan)` : ""}`, "vendor", { per }];
}
function terms(d, b) {
  const t = b.terms || {};
  let pts = 0; const why = [];
  const mins = b.options.map((o) => (o.minimum ? toUsd(b, item(d, o.minimum.item).value) : 0));
  const low = Math.min(...mins);
  if (low === 0) { pts += 1.5; why.push("no monthly minimum"); }
  else if (low <= 100) { pts += 1; why.push(`credited minimum ${usd(low)}`); }
  else { pts += 0.5; why.push(`credited minimum ${usd(low)}`); }
  if (["none", "monthly"].includes(t.contract)) { pts += 1; why.push("no annual contract"); }
  if (t.self_serve === "yes") { pts += 1; why.push("self-serve signup"); }
  if (t.free_start === "yes") { pts += 0.5; why.push("trial, free tier or credit"); }
  return [clamp(pts + 1), why.join(", "), "vendor"];
}
function transparency(d, b) {
  const t = b.transparency || {};
  const keys = [["parts_priced", "every part of the check priced"], ["aml_priced", "AML priced"], ["tiers_published", "volume tiers published"], ["addons_listed", "add-on fees listed"]];
  const got = keys.filter(([k]) => t[k] === true).map(([, l]) => l);
  return [clamp(got.length + 1), got.join(", ") || "none found", "vendor"];
}
const quality = (fn) => (d) => { const [s, note, ev] = fn(asIdentity(d), "identity"); return [s, note, ev]; };
const FN = { cost, aml_cost: amlCost, fraud_defense: quality(fraudDefense), coverage: quality(coverage), breadth: quality(breadth),
  integration: quality(integration), terms, transparency };

export function scoreBudget(d) {
  const b = d.budget;
  if (!b?.options?.length) return null;
  const el = eligibility(d);
  const rows = RUBRIC.map(([key, name, weight]) => {
    let s, note, evidence, extra;
    try { [s, note, evidence, extra] = FN[key](d, b); } catch (e) { [s, note] = [null, e.message]; }
    return { key, criterion: name, weight, score: s == null ? null : half(s), note, evidence: s == null ? null : evidence, extra };
  });
  const scored = rows.filter((r) => r.score != null);
  const w = scored.reduce((a, r) => a + r.weight, 0);
  const total = w ? Math.round((scored.reduce((a, r) => a + r.weight * r.score, 0) / w) * 10) / 10 : null;
  return { rows, total, coverage: w, eligible: el.ok, why: el.why };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const rank = (yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"))[KEY]?.providers || []).map((p) => p.slug);
  const out = [["slug", "name", "eligible", "not_eligible_because", "budget_score", "overall_score", "old_rank", "cost_100_usd", "cost_1000_usd", "aml_usd", "weight_scored", ...RUBRIC.map((r) => r[0])]];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yml")).map((f) => f.replace(/\.yml$/, "")).filter((s) => !only.length || only.includes(s));
  for (const slug of files) {
    const file = path.join(dir, `${slug}.yml`);
    const text = fs.readFileSync(file, "utf8");
    const d = yaml.load(text);
    if (!d.budget && !rank.includes(slug)) continue;
    const r = scoreBudget(d);
    const by = Object.fromEntries((r?.rows || []).map((x) => [x.key, x]));
    if (WRITE && r) {
      // Generated block inside category_scores; the overall score is never touched.
      let next = text.replace(/\n# Budget score: generated by scripts\/rescore-budget\.mjs[\s\S]*?# end Budget score\n/, "\n");
      if (r.eligible && r.total != null) {
        const head = /^category_scores:/m.test(next) ? [] : ["category_scores:"];
        const block = [`# Budget score: generated by scripts/rescore-budget.mjs, do not edit`, ...head, `  ${KEY}:`,
          `    score: ${r.total.toFixed(1)}`, `    grade: ${grade(r.total)}`, `    methodology: budget-kyc-1.0`,
          `    cost_s: ${by.cost.extra.ps.toFixed(2)}`, `    cost_m: ${by.cost.extra.pm.toFixed(2)}`, `    breakdown:`,
          ...r.rows.flatMap((x) => [`    - criterion: ${JSON.stringify(x.criterion)}`, `      weight: ${x.weight}`, `      score: ${x.score ?? "null"}`,
            `      note: ${JSON.stringify(x.note)}`, `      evidence: ${x.evidence ?? "null"}`]), `# end Budget score`].join("\n");
        // category_scores must stay the last top-level key so the block continues that map.
        if (!head.length && next.slice(next.search(/^category_scores:/m)).split("\n").slice(1).some((l) => /^[^\s#]/.test(l)))
          throw new Error(`${slug}: category_scores is not the last key; move it to the end first`);
        next = next.replace(/\n*$/, "\n") + block + "\n";
      }
      yaml.load(next);
      if (next !== text) fs.writeFileSync(file, next);
    }
    out.push([slug, d.name, r?.eligible ? "yes" : "no", r ? r.why.join("; ") : "no budget{} data", r?.eligible ? r.total : "", d.score, rank.indexOf(slug) + 1 || "",
      by.cost?.extra ? by.cost.extra.ps.toFixed(2) : "", by.cost?.extra ? by.cost.extra.pm.toFixed(2) : "", by.aml_cost?.extra ? by.aml_cost.extra.per.toFixed(2) : by.aml_cost?.note || "",
      r?.coverage ?? "", ...RUBRIC.map((x) => by[x[0]]?.score ?? "")]);
    if (only.length && r) {
      console.log(`\n${d.name}: Budget ${r.total} (scored weight ${r.coverage}%, ${r.eligible ? "eligible" : "not eligible: " + r.why.join("; ")})`);
      for (const x of r.rows) console.log(`  ${x.criterion.padEnd(42)} ${String(x.weight).padStart(4)}%  ${x.score ?? "n/d"}  ${x.note}`);
    }
  }
  out.splice(1, out.length - 1, ...out.slice(1).sort((a, b) => (b[2] === "yes") - (a[2] === "yes") || (b[4] || 0) - (a[4] || 0)));
  if (!only.length) {
    const csv = out.map((r) => r.map((c) => (/[",;]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
    fs.writeFileSync(path.join(root, "reports/rescore-budget-1.0.csv"), csv);
    console.log(out.map((r) => r.slice(0, 10).join("\t")).join("\n"));
  }
}
