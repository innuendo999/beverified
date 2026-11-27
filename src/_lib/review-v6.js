// Review page V6 (owner, 2026-11-27; canvas "BeVerified: review page V6 for all reviews, proposal").
// Builders for src/_includes/v3/review-v6.njk. Everything is read from the provider record and shared data;
// nothing is typed here. Empty results hide their block.
import { calcProvider } from "./budget.js";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = (s) => { const [y, m] = String(s).split("-"); return m ? `${MONTHS[+m - 1]} ${y}` : String(s); };
const nd = (v) => v == null || v === "" || /not publicly disclosed|not disclosed|not published/i.test(String(v));

// Capability rows grouped by the job the buyer hires the provider for.
const GROUPS = {
  people: ["Onboard people", [
    ["identity_verification", "ID document check"], ["liveness", "Liveness and face match"], ["nfc", "NFC chip reading"],
    ["video_ident", "Video ident with an operator"], ["reusable_id", "Reusable KYC"], ["proof_of_address", "Proof of address"],
    ["doc_forensics", "Document forensics"], ["injection_detection", "Injection attack detection"], ["manual_review", "Manual review"],
    ["reverification", "Re-verification"],
  ]],
  screen: ["Screen and monitor", [
    ["sanctions_pep", "Sanctions and PEP screening"], ["adverse_media", "Adverse media"], ["ongoing_monitoring", "Ongoing monitoring"],
    ["transaction_monitoring", "Transaction monitoring"], ["case_management", "Case management"], ["risk_scoring", "Risk scoring"],
    ["batch_screening", "Batch screening"], ["audit_trail", "Audit trail"],
  ]],
  business: ["Verify businesses", [
    ["kyb_registry", "Company registry checks"], ["kyb_ubo", "Owner (UBO) discovery"], ["kyb_entity_screening", "Business and officer screening"],
    ["kyb_documents", "Company document checks"], ["kyb_monitoring", "Ongoing business monitoring"],
  ]],
  age: ["Check age", [
    ["age_document", "Age from an ID document"], ["age_facial_estimation", "Facial age estimation"], ["age_email_estimation", "Email age estimation"],
    ["age_mobile_operator", "Mobile operator check"], ["age_credit_card", "Credit card check"], ["age_digital_id", "Digital ID or wallet"],
    ["age_reusable", "Reusable age result"],
  ]],
  integrate: ["Integrate and deploy", [
    ["i:docs_public", "Public API docs"], ["i:sdk_web", "Web SDK"], ["i:sdk_ios", "iOS SDK"], ["i:sdk_android", "Android SDK"],
    ["i:sandbox", "Sandbox or trial"], ["i:no_code", "No-code flow builder"], ["i:webhooks", "Webhooks"], ["i:support_hours", "Published support hours"],
    ["deployment", "Deployment"], ["data_residency", "Data residency options"],
  ]],
};
const ORDER = {
  aml: ["screen", "business", "people", "integrate"], "aml/banks": ["screen", "business", "people", "integrate"],
  kyb: ["business", "screen", "people", "integrate"], "age-verification": ["age", "people", "screen", "integrate"],
};
const MARK = { yes: "yes", add_on: "plus", partial: "plus", beta: "plus", no: "no", not_disclosed: "unknown", in_progress: "unknown", planned: "unknown" };
const PLACE = { cloud: "Cloud", on_prem: "On-premises", cloud_and_on_prem: "Cloud and on-premises" };

export function productGroups(p) {
  const order = ORDER[p.primary_category] || ["people", "screen", "business", "age", "integrate"];
  const out = [];
  for (const g of order) {
    const [title, keys] = GROUPS[g];
    const rows = [];
    for (const [key, label] of keys) {
      const v = key.startsWith("i:") ? p.integration?.[key.slice(2)] : p.capabilities?.[key];
      if (!v || typeof v !== "object" || !v.status) continue;
      const text = PLACE[v.status];
      if (!text && !MARK[v.status]) continue;
      rows.push({ label, mark: text ? "text" : MARK[v.status], value: text || null, note: v.note ? String(v.note).slice(0, 70) : "" });
    }
    // A group where we know nothing is noise: keep it only if at least one row is known.
    if (rows.some((r) => r.mark !== "unknown")) out.push({ title, rows });
  }
  return out;
}

// Four labelled facts under the hero: price, coverage, founded, deployment. Each is dropped when unknown.
export function keyFacts(p) {
  const f = (label) => (p.facts || []).find((x) => x.label === label && !nd(x.value));
  const out = [];
  const from = f("From");
  const min = (p.pricing?.items || []).find((i) => i.kind !== "third_party" && /minimum/i.test(i.label) && !nd(i.value));
  if (from) out.push({ label: "Price from", value: from.value, sub: [min ? `${min.value} minimum` : null, p.pricing?.verified ? `checked ${month(p.pricing.verified)}` : null].filter(Boolean).join(" · ") });
  else out.push({ label: "Price", value: "Not published", sub: "quoted by sales" });
  const cov = p.coverage?.countries;
  const reg = f("Regions") || f("Coverage");
  if (cov?.value) out.push({ label: "Coverage", value: `${cov.value}+ countries`, sub: "vendor-stated" });
  else if (reg) out.push({ label: "Coverage", value: reg.value, sub: reg.evidence === "independent" ? "" : "vendor-stated" });
  const founded = f("Founded");
  const hq = f("HQ") || f("Headquarters");
  if (founded) out.push({ label: "Founded", value: founded.value, sub: hq ? hq.value : "" });
  const dep = p.capabilities?.deployment;
  if (dep && PLACE[dep.status]) out.push({ label: "Deployment", value: PLACE[dep.status], sub: dep.note ? String(dep.note).split(";")[0].slice(0, 48) : "" });
  return out.slice(0, 4);
}

// The one piece of independent evidence the score card names: best confirmed certificate, else none.
export function bestEvidence(p) {
  const conf = (p.certifications || []).filter((c) => c.status === "confirmed");
  const pad = conf.filter((c) => /30107/.test(c.name))
    .map((c) => ({ c, lvl: +((c.name.match(/Level\s*(\d)/i) || [])[1] || 0) })).sort((a, b) => b.lvl - a.lvl)[0];
  if (pad) return `Liveness tested by iBeta, Level ${pad.lvl || "confirmed"}`.replace("by iBeta", /ibeta/i.test(pad.c.name) ? "by iBeta" : "in a lab");
  const pick = conf.find((c) => /DIATF|DVS|eIDAS|qualified/i.test(c.name)) || conf.find((c) => /27001|SOC 2/i.test(c.name)) || conf[0];
  return pick ? `${pick.name} confirmed with the issuer` : null;
}

// Awards from the ranking order (src/_lib/awards.js currentAwards().out), Editor's Choice first, with the
// ranking entry's tagline as the reason.
export function awardsFor(p, awards, rankings) {
  const list = (awards || []).filter((a) => a.slug === p.slug).map((a) => {
    const e = (rankings?.[a.key]?.providers || []).find((x) => x.slug === p.slug) || {};
    return { ...a, reason: e.tagline || null, ec: a.award === "Editor's Choice" };
  }).sort((a, b) => (b.ec - a.ec) || (a.rank - b.rank) || a.ranking.localeCompare(b.ranking));
  const ec = list.filter((a) => a.ec);
  const primary = list.find((a) => a.key === p.primary_category);
  const headline = ec.length ? `Editor’s Choice ${list[0].year} in ${ec.length} ranking${ec.length > 1 ? "s" : ""}`
    : primary ? `${primary.award}, #${primary.rank} in ${primary.short}` : list[0] ? `${list[0].award}, #${list[0].rank} in ${list[0].short}` : null;
  return { headline, featured: ec.length ? ec : list.slice(0, 2), more: ec.length ? list.filter((a) => !a.ec) : list.slice(2), total: list.length };
}

// Fit: where the provider ranks best (top 3 with the ranking's reason) and when to look elsewhere (choose_instead).
export function fitBlock(p, rankings, categories, providers) {
  const strong = [];
  for (const [key, r] of Object.entries(rankings || {})) {
    const i = (r.providers || []).findIndex((x) => x.slug === p.slug);
    if (i < 0 || i > 2) continue;
    const c = Object.values(categories || {}).find((x) => x.slug === key) || {};
    const e = r.providers[i];
    strong.push({ pos: i + 1, title: c.breadcrumb_label || r.title.replace(/\s+in\s+\d{4}$/, ""), url: c.url || `/providers/${key}/`, why: e.tradeoff || e.tagline || "", primary: key === p.primary_category });
  }
  strong.sort((a, b) => (b.primary - a.primary) || (a.pos - b.pos));
  const away = (p.choose_instead || []).filter((a) => a.slug && providers[a.slug]).slice(0, 3)
    .map((a) => ({ need: a.need || (a.text ? String(a.text).replace(/^you (want|need) /, "").replace(/\.$/, "").slice(0, 70) : null), name: providers[a.slug].name, url: `/providers/${a.slug}/` }));
  return { strong: strong.slice(0, 3), away };
}

// Cost at 100 and 1,000 checks a month from the budget{} block (same figures as the cost calculator).
export function costAtVolume(p) {
  let c;
  try { c = calcProvider(p, null, {}); } catch { return null; }
  const o = c?.options?.[0] || c?.opts?.[0];
  if (!o || o.per == null) return null;
  const at = (n) => {
    const total = o.minOnTop ? o.min + o.per * n : Math.max(o.min, o.per * n);
    return { n: n.toLocaleString("en-US"), total: Math.round(total).toLocaleString("en-US"), each: (total / n).toFixed(2) };
  };
  return { plan: o.plan, rows: [at(100), at(1000)] };
}

// Up to five sources, shown as plain text links (owner, 2026-11-27: no Sources list, no [n] refs).
// Independent publishers first, then the vendor's pricing page.
export function keySources(p) {
  const all = (p.sources || []).map((s, i) => ({ ...s, n: i + 1 }));
  const vendor = (s) => !s.publisher || s.publisher.toLowerCase().startsWith(String(p.name).toLowerCase().split(" ")[0]);
  const indep = all.filter((s) => !vendor(s));
  const seen = new Set(), pick = [];
  for (const s of indep) { const k = s.publisher || s.url; if (seen.has(k)) continue; seen.add(k); pick.push({ label: s.publisher, url: s.url }); }
  const priceN = p.pricing?.model?.source || (p.pricing?.items || []).find((i) => i.source)?.source;
  const price = priceN ? all[priceN - 1] : null;
  const out = pick.slice(0, price ? 4 : 5);
  if (price) out.push({ label: `${p.name} pricing page`, url: price.url });
  return out;
}
