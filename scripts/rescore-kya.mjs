// Scores providers on the Know Your Agent rubric KYA 1.0 (docs/scoring-kya.md) from their kya{} block.
// node scripts/rescore-kya.mjs          -> reports/rescore-kya-1.0.csv + summary (records unchanged)
// node scripts/rescore-kya.mjs --write  -> also writes category_scores.know-your-agent into eligible records
// node scripts/rescore-kya.mjs sumsub   -> prints the breakdown for these slugs
// A capability counts when its status is yes or beta. partial, planned, no and missing keys do not count.
// A criterion whose keys are all missing is "Not publicly disclosed": no sub-score, weight shared out.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dir = path.join(root, "src/_data/providers");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const WRITE = process.argv.includes("--write");
const KEY = "know-your-agent";
const grade = (s) => (s >= 4.5 ? "Excellent" : s >= 4.0 ? "Great" : s >= 3.5 ? "Very Good" : s >= 3.0 ? "Good" : "Fair");

export const RUBRIC = [
  ["detection", "Agent detection and recognition", 20],
  ["binding", "Human and business binding", 20],
  ["delegation", "Delegation and permission control", 20],
  ["credentials", "Credentials and interoperability", 10],
  ["audit", "Audit and monitoring", 10],
  ["availability", "Availability, pricing and integration", 10],
  ["trust", "Trust and track record", 10],
];
const LABEL = {
  detect_undeclared: "detects undeclared agents", verify_signed: "verifies signed agents or checks a registry",
  trust_score: "trust or confidence score", shared_reputation: "shared agent reputation or public registry",
  bind_person: "binds agents to a verified person", bind_business: "binds agents to a verified business",
  step_up: "re-verifies the person at high-risk actions", scoped_permissions: "scoped permissions",
  limits_expiry: "limits and expiry", revocation: "revocation", pre_action_check: "checked before each action",
  chaining: "agent-to-agent delegation documented", credential_format: "credential in a published format",
  open_spec: "open specification adopted by a standards body", audit_log: "action log with principal and permission",
  tamper_evident: "tamper-evident log", behaviour_monitoring: "monitoring after onboarding", log_export: "log export or API",
};
const counts = (c) => c && ["yes", "beta"].includes(c.status);
const seen = (k, keys) => keys.some((x) => k[x]);
const half = (x) => Math.round(x * 2) / 2;
const clamp = (x) => Math.max(1, Math.min(5, x));
const points = (k, keys) => keys.filter((x) => counts(k[x]));
const lab = (ks) => ks.map((x) => LABEL[x] || x).join(", ") || "none found";

function detection(k) {
  const keys = ["detect_undeclared", "verify_signed", "trust_score", "shared_reputation"];
  if (!seen(k, keys)) return [null, "no public data"];
  let p = points(k, keys).length;
  const ind = k.detect_undeclared?.independent_test ? 0.5 : 0;
  return [clamp(p + 1 + ind), lab(points(k, keys)), ind ? "independent" : "vendor"];
}
function binding(k, d) {
  const keys = ["bind_person", "bind_business", "step_up"];
  if (!seen(k, keys)) return [null, "no public data"];
  const got = points(k, keys);
  // Independent evidence for the human check counts only when an agent is actually bound to a person.
  const conf = (d.certifications || []).filter((c) => c.status === "confirmed" && /30107|IAL ?2|800-63|DIATF|Digital Verification Serv|eIDAS/i.test(`${c.name} ${c.what || ""}`));
  const ind = counts(k.bind_person) && conf.length > 0;
  const why = lab(got) + (ind ? `, independent evidence for the human check (${conf[0].name})` : "");
  return [clamp(got.length + (ind ? 1 : 0) + 1), why, ind ? "independent" : "vendor"];
}
function delegation(k) {
  const keys = ["scoped_permissions", "limits_expiry", "revocation", "pre_action_check"];
  if (!seen(k, [...keys, "chaining"])) return [null, "no public data"];
  const got = points(k, keys);
  const ch = counts(k.chaining) ? 0.5 : 0;
  return [clamp(got.length + 1 + ch), lab(ch ? [...got, "chaining"] : got), "vendor"];
}
function credentials(k) {
  const keys = ["credential_format", "protocols", "open_spec"];
  if (!seen(k, keys)) return [null, "no public data"];
  let p = 0; const why = [];
  if (counts(k.credential_format)) { p += 1; why.push(`credential: ${k.credential_format.note}`); }
  const n = counts(k.protocols) ? String(k.protocols.note).split(",").map((s) => s.trim()).filter(Boolean).length : 0;
  if (n >= 2) { p += 1; why.push(`${n} named protocols`); }
  if (n >= 4) p += 1;
  if (n === 1) why.push(`1 named protocol (${k.protocols.note})`);
  if (counts(k.open_spec)) { p += 1; why.push(LABEL.open_spec); }
  return [clamp(p + 1), why.join(", ") || "none found", counts(k.open_spec) && k.open_spec.independent ? "independent" : "vendor"];
}
function audit(k) {
  const keys = ["audit_log", "tamper_evident", "behaviour_monitoring", "log_export"];
  if (!seen(k, keys)) return [null, "no public data"];
  return [clamp(points(k, keys).length + 1), lab(points(k, keys)), "vendor"];
}
function availability(k) {
  const st = k.availability?.status;
  const base = st === "ga" ? 3 : st === "beta" ? 2 : null;
  if (base == null) return [null, `not ranked: ${st || "status unknown"}`];
  let p = base; const why = [st === "ga" ? "generally available" : "open beta or pilot"];
  if (counts(k.price)) { p += 1; why.push("published price or free tier"); }
  if (counts(k.docs_public)) { p += 0.5; why.push("public developer docs"); }
  if (counts(k.self_serve)) { p += 0.5; why.push("sandbox, trial or SDK"); }
  return [clamp(p), why.join(", "), "vendor"];
}
function trust(k, d) {
  const row = (d.score_breakdown || []).find((r) => r.criterion === "Trust and track record");
  return row && row.score != null ? [row.score, `v3.1 sub-score: ${row.note}`, row.evidence] : [null, "no v3.1 trust sub-score"];
}
const FN = { detection, binding, delegation, credentials, audit, availability, trust };

export function eligible(d) {
  return ["ga", "beta"].includes(d.kya?.availability?.status);
}
export function scoreKya(d) {
  const k = d.kya;
  if (!k) return null;
  const rows = RUBRIC.map(([key, name, weight]) => {
    const [s, note, evidence] = FN[key](k, d);
    return { key, criterion: name, weight, score: s == null ? null : half(s), note, evidence: s == null ? null : evidence };
  });
  const scored = rows.filter((r) => r.score != null);
  const w = scored.reduce((a, r) => a + r.weight, 0);
  const total = w ? Math.round((scored.reduce((a, r) => a + r.weight * r.score, 0) / w) * 10) / 10 : null;
  // Calibration view for the owner: the same score if "no public data" counted as 1 instead of sharing out the weight.
  const alt = Math.round((rows.reduce((a, r) => a + r.weight * (r.score ?? (r.key === "availability" ? 0 : 1)), 0) / rows.filter((r) => r.score != null || r.key !== "availability").reduce((a, r) => a + r.weight, 0)) * 10) / 10;
  return { rows, total, coverage: w, eligible: eligible(d), alt };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const out = [["slug", "name", "eligible", "availability", "kya_score", "if_not_disclosed_scored_1", "overall_score", "weight_scored", ...RUBRIC.map((r) => r[0]), "not_disclosed"]];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yml")).map((f) => f.replace(/\.yml$/, "")).filter((s) => !only.length || only.includes(s));
  for (const slug of files) {
    const file = path.join(dir, `${slug}.yml`);
    const text = fs.readFileSync(file, "utf8");
    const d = yaml.load(text);
    const r = scoreKya(d);
    if (!r) continue;
    if (WRITE) {
      // Generated block at the end of the record; the overall score is never touched.
      let next = text.replace(/\n# KYA score: generated by scripts\/rescore-kya\.mjs[\s\S]*?# end KYA score\n/, "\n");
      if (r.eligible && r.total != null) {
        const block = [`# KYA score: generated by scripts/rescore-kya.mjs, do not edit`, `category_scores:`, `  ${KEY}:`,
          `    score: ${r.total.toFixed(1)}`, `    grade: ${grade(r.total)}`, `    methodology: kya-1.0`, `    breakdown:`,
          ...r.rows.flatMap((x) => [`    - criterion: ${JSON.stringify(x.criterion)}`, `      weight: ${x.weight}`, `      score: ${x.score ?? "null"}`,
            `      note: ${JSON.stringify(x.note)}`, `      evidence: ${x.evidence ?? "null"}`]), `# end KYA score`].join("\n");
        // Share one category_scores map with the Budget KYC block (scripts/rescore-budget.mjs).
        const budgetAt = next.search(/^# Budget score: generated/m);
        if (/^category_scores:/m.test(next)) next = next.replace(/\n*$/, "\n") + block.replace("\ncategory_scores:", "") + "\n";
        else if (budgetAt >= 0) next = next.slice(0, budgetAt) + block + "\n" + next.slice(budgetAt);
        else next = next.replace(/\n*$/, "\n") + block + "\n";
      }
      if (next !== text) fs.writeFileSync(file, next);
      yaml.load(next);
    }
    const by = Object.fromEntries(r.rows.map((x) => [x.key, x.score ?? ""]));
    out.push([slug, d.name, r.eligible ? "yes" : "no", d.kya.availability?.status || "", r.total ?? "", r.alt, d.score, r.coverage,
      ...RUBRIC.map((x) => by[x[0]]), r.rows.filter((x) => x.score == null).map((x) => x.key).join(" ")]);
    if (only.length) {
      console.log(`\n${d.name}: KYA ${r.total} (scored weight ${r.coverage}%, ${r.eligible ? "eligible" : "not eligible"})`);
      for (const x of r.rows) console.log(`  ${x.criterion.padEnd(40)} ${String(x.weight).padStart(3)}%  ${x.score ?? "n/d"}  ${x.note}`);
    }
  }
  out.splice(1, out.length - 1, ...out.slice(1).sort((a, b) => (b[2] === "yes") - (a[2] === "yes") || (b[4] || 0) - (a[4] || 0)));
  if (!only.length) {
    const csv = out.map((r) => r.map((c) => (/[",;]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
    fs.writeFileSync(path.join(root, "reports/rescore-kya-1.0.csv"), csv);
    console.log(out.map((r) => r.slice(0, 8).join("\t")).join("\n"));
  }
}
