// AML for Banks 1.0 scorer (docs/scoring-aml-banks.md).
// node scripts/rescore-aml-banks.mjs          -> report: reports/rescore-aml-banks-1.0.csv (+ table on stdout)
// node scripts/rescore-aml-banks.mjs --write  -> also writes category_scores.aml-banks into eligible records
// Reads src/_data/amlBanksEvidence.yml plus the provider record (capabilities{}, integration{}, certifications[], incidents.yml).
// The overall score is never touched.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { grade } from "./rescore.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const KEY = "aml-banks";
const TODAY = new Date();
const load = (f) => yaml.load(fs.readFileSync(path.join(root, f), "utf8"));
const EV = load("src/_data/amlBanksEvidence.yml");
const INC = (() => { const x = load("src/_data/incidents.yml"); return Array.isArray(x) ? x : x?.incidents || []; })();

export const RUBRIC = [
  ["detection", "Detection", 20],
  ["alerts", "Alert quality and analyst workload", 20],
  ["tuning", "Tuning without depending on the vendor", 15],
  ["validation", "Validation and audit for examiners", 15],
  ["integration", "Implementation and data integration", 15],
  ["screening", "Sanctions screening of customers and payments", 10],
  ["vendor", "Vendor risk and cost transparency", 5],
];

const st = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v.status : v);
const yp = (v) => ({ yes: 1, add_on: 1, partial: 0.5 }[st(v)] || 0);
const val = (e, k) => e?.[k]?.value;
const tri = (v) => ({ yes: 1, partial: 0.5 }[v] || 0);
const cap5 = (x) => Math.min(5, x);
const within24m = (date) => (TODAY - new Date(date)) / 86400000 <= 730;

export function eligibility(d, e) {
  const c = d.capabilities || {};
  const why = [];
  if (d.status !== "published") why.push("no published review");
  if (!yp(c.transaction_monitoring)) why.push("no transaction monitoring of its own");
  if (!yp(c.sanctions_pep)) why.push("no sanctions and PEP screening of its own");
  if (!yp(c.case_management)) why.push("no case management");
  if (!e?.bank_evidence?.url) why.push("no bank customer or case study on its own site");
  return { ok: !why.length, why };
}

export function scoreBanks(d, e) {
  const c = d.capabilities || {};
  const ig = d.integration || {};
  const rows = [];
  const add = (key, pts, note) => {
    const [, name, weight] = RUBRIC.find((r) => r[0] === key);
    rows.push({ key, criterion: name, weight, score: cap5(1 + pts), note: note.filter(Boolean).join("; ") || "no evidence found", evidence: "Vendor-stated" });
  };
  // Detection
  {
    const typ = { named: 1, count: 0.5 }[val(e, "typologies")] || 0;
    const lat = val(e, "latency") === "stated" ? 1 : 0;
    const n = (val(e, "channels") || []).length;
    const ch = n >= 3 ? 1 : n === 2 ? 0.5 : 0;
    const er = tri(val(e, "entity_links"));
    const seg = 0.5 * tri(val(e, "segmentation"));
    const rs = 0.5 * yp(c.risk_scoring);
    add("detection", typ + lat + ch + er + seg + rs, [
      typ && `typologies ${val(e, "typologies")} +${typ}`, lat && "stated latency +1", ch && `channels ${(val(e, "channels") || []).join(", ")} +${ch}`,
      er && `links across accounts +${er}`, seg && `segmentation +${seg}`, rs && `customer risk scoring +${rs}`]);
  }
  // Alert quality and analyst workload
  {
    const pr = tri(val(e, "alert_priority"));
    const rr = { factors: 1, generic: 0.5 }[val(e, "alert_reason")] || 0;
    const fi = { named_channel: 1, claimed: 0.5 }[val(e, "filing")] || 0;
    const fe = val(e, "four_eyes") === "yes" ? 0.5 : 0;
    add("alerts", pr + rr + fi + fe, [pr && `alert prioritisation +${pr}`, rr && `alert reason (${val(e, "alert_reason")}) +${rr}`,
      fi && `report filing (${val(e, "filing")}) +${fi}`, fe && "second reviewer +0.5"]);
  }
  // Tuning
  {
    const sr = 1.5 * tri(val(e, "self_service_rules"));
    const si = 1.5 * tri(val(e, "simulation"));
    add("tuning", sr + si, [sr && `own rules +${sr}`, si && `simulation or back-testing +${si}`]);
  }
  // Validation and audit
  {
    const md = Math.max(tri(val(e, "model_docs")), yp(c.model_validation));
    const cl = { with_approvals: 1, log_only: 0.5 }[val(e, "change_log")] || 0;
    const at = yp(c.audit_trail);
    add("validation", md + cl + at, [md && `model documentation or validation +${md}`, cl && `change log (${val(e, "change_log")}) +${cl}`, at && `alert audit trail +${at}`]);
  }
  // Implementation and data integration
  {
    const api = yp(ig.docs_public);
    const dm = { published: 1, described: 0.5 }[val(e, "data_model")] || 0;
    const inj = { both: 1, one: 0.5 }[val(e, "ingestion")] || 0;
    const sb = 0.5 * yp(ig.sandbox);
    add("integration", api + dm + inj + sb, [api && `public API docs +${api}`, dm && `data model (${val(e, "data_model")}) +${dm}`, inj && `ingestion (${val(e, "ingestion")}) +${inj}`, sb && `sandbox +${sb}`]);
  }
  // Sanctions screening: AML 1.0 record fields, or the evidence file where the record has none.
  {
    const s = e?.screening;
    const lists = new Set((s ? s.lists?.value : c.list_coverage?.lists) || []);
    const core = ["ofac", "eu", "uk", "un"].filter((x) => lists.has(x)).length;
    const l4 = core === 4 ? 1 : core === 3 ? 0.5 : 0;
    const hrs = s ? s.update_hours?.value : c.list_updates?.hours;
    const up = hrs == null ? 0 : Number(hrs) <= 24 ? 1 : 0.5;
    const xf = s ? tri(s.payment_screening?.value) : yp(c.transfer_screening);
    const ftv = s ? s.fuzzy_and_transliteration?.value : yp(c.fuzzy_matching) && yp(c.transliteration) ? "both" : yp(c.fuzzy_matching) || yp(c.transliteration) ? "fuzzy" : "no";
    const ft = { both: 1, fuzzy: 0.5 }[ftv] || 0;
    add("screening", l4 + up + xf + ft, [l4 && `${core} core lists +${l4}`, up && `update time ${hrs} h +${up}`, xf && `payment screening +${xf}`, ft && `matching (${ftv}) +${ft}`]);
  }
  // Vendor risk and cost transparency
  {
    const cert = (d.certifications || []).some((x) => /27001|SOC 2/.test(x.name || "") && x.status === "confirmed") ? 1.5 : 0;
    const pr = yp(c.published_pricing);
    const inc = INC.filter((i) => i && i.provider === d.slug && i.counted !== false && i.date && within24m(i.date)).length;
    const pts = Math.max(0, cert + pr - inc);
    add("vendor", pts, [cert && "confirmed ISO/IEC 27001 or SOC 2 +1.5", pr && `price basis published +${pr}`, inc && `${inc} incident(s) in 24 months -${inc}`]);
  }
  const total = Math.round(rows.reduce((a, r) => a + r.weight * r.score, 0) / 100 * 10) / 10;
  const exact = rows.reduce((a, r) => a + r.weight * r.score, 0) / 100;
  return { rows, total, exact };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const rank = (load("src/_data/rankings.yml")["aml/banks"]?.providers || []).map((p) => p.slug).filter(Boolean);
  const slugs = [...new Set([...rank, ...Object.keys(EV)])];
  const rows = slugs.map((slug) => {
    const d = yaml.load(fs.readFileSync(path.join(dir, `${slug}.yml`), "utf8"));
    const e = EV[slug];
    return { d, e, el: e ? eligibility(d, e) : { ok: false, why: ["no evidence entry"] }, r: e ? scoreBanks(d, e) : null, oldRank: rank.indexOf(slug) + 1 || "" };
  });
  // Ties: the unrounded score decides, then the current order.
  const ranked = rows.filter((x) => x.el.ok && x.r).sort((a, b) => b.r.exact - a.r.exact || (a.oldRank || 99) - (b.oldRank || 99));
  ranked.forEach((x, i) => (x.newRank = i + 1));
  const head = ["slug", "name", "eligible", "old_rank", "new_rank", "overall_score", "aml_banks_score", "unrounded", "grade", ...RUBRIC.map((r) => r[0]), "not_eligible_because", "notes"];
  const out = [head];
  for (const x of [...ranked, ...rows.filter((x) => !ranked.includes(x))]) {
    const by = Object.fromEntries((x.r?.rows || []).map((r) => [r.key, r]));
    out.push([x.d.slug, x.d.name, x.el.ok ? "yes" : "no", x.oldRank, x.newRank || "", x.d.score, x.r?.total ?? "", x.r ? x.r.exact.toFixed(3) : "", x.r ? grade(x.r.total) : "",
      ...RUBRIC.map(([k]) => by[k]?.score ?? ""), x.el.why.join("; "), (x.r?.rows || []).map((r) => `${r.key}: ${r.note}`).join(" | ")]);
  }
  if (process.argv.includes("--write")) {
    for (const x of rows) {
      const file = path.join(dir, `${x.d.slug}.yml`);
      const text = fs.readFileSync(file, "utf8");
      let next = text.replace(/\n# AML Banks score: generated by scripts\/rescore-aml-banks\.mjs[\s\S]*?# end AML Banks score\n/, "\n");
      if (x.el.ok && x.r) {
        const head = /^category_scores:/m.test(next) ? [] : ["category_scores:"];
        if (!head.length && next.slice(next.search(/^category_scores:/m)).split("\n").slice(1).some((l) => /^[^\s#]/.test(l)))
          throw new Error(`${x.d.slug}: category_scores is not the last key; move it to the end first`);
        const block = [`# AML Banks score: generated by scripts/rescore-aml-banks.mjs, do not edit`, ...head, `  ${KEY}:`,
          `    score: ${x.r.total.toFixed(1)}`, `    grade: ${grade(x.r.total)}`, `    methodology: aml-banks-1.0`, `    scored: '${TODAY.toISOString().slice(0, 10)}'`, `    breakdown:`,
          ...x.r.rows.flatMap((r) => [`    - criterion: ${JSON.stringify(r.criterion)}`, `      weight: ${r.weight}`, `      score: ${r.score}`,
            `      note: ${JSON.stringify(r.note)}`, `      evidence: ${r.evidence}`]), `# end AML Banks score`].join("\n");
        next = next.replace(/\n*$/, "\n") + block + "\n";
      }
      const check = yaml.load(next);
      if (x.el.ok && x.r && check.category_scores?.[KEY]?.score !== +x.r.total.toFixed(1)) throw new Error(`${x.d.slug}: block not readable`);
      if (next !== text) fs.writeFileSync(file, next);
    }
    console.log("wrote category_scores." + KEY);
  }
  const csv = out.map((r) => r.map((c) => (/[",;\n|]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(root, "reports/rescore-aml-banks-1.0.csv"), csv);
  console.log("rank  provider          overall  banks  exact  detect alerts tuning valid integ screen vendor  was");
  for (const x of ranked) {
    const s = Object.fromEntries(x.r.rows.map((r) => [r.key, r.score]));
    console.log(`${String(x.newRank).padStart(4)}  ${x.d.name.padEnd(17)} ${String(x.d.score).padStart(6)}  ${x.r.total.toFixed(1)}   ${x.r.exact.toFixed(3)}  ${RUBRIC.map(([k]) => String(s[k]).padEnd(6)).join(" ")} #${x.oldRank || "-"}`);
  }
  const left = rows.filter((x) => !ranked.includes(x));
  if (left.length) console.log("\nnot ranked:\n" + left.map((x) => `  ${x.d.slug}: ${x.el.why.join("; ")}`).join("\n"));
  console.log("report: reports/rescore-aml-banks-1.0.csv");
}
