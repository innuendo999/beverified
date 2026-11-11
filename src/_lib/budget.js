// Budget KYC page helpers (docs/scoring-budget-kyc.md): turns a provider's budget{} block and pricing.items
// into the figures the cost calculator needs. Prices are read from pricing.items by label, never typed twice;
// non-USD prices use budget.fx (ECB reference rate). Used by src/categories.11tydata.js.

const AMOUNT = /[$€£]\s?([\d,]+(?:\.\d+)?)/g;

// Amount named by a budget{} reference: "Label" or { label, pick } (pick = which amount when a value lists several).
export function amount(d, ref) {
  const r = typeof ref === "string" ? { label: ref } : ref;
  const it = (d.pricing?.items || []).find((x) => x.label === r.label);
  if (!it) throw new Error(`budget: ${d.slug}: pricing item not found: ${r.label}`);
  const v = [...String(it.value).matchAll(AMOUNT)].map((m) => +m[1].replace(/,/g, ""))[r.pick ?? 0];
  if (v == null) throw new Error(`budget: ${d.slug}: no amount in "${it.value}"`);
  return v;
}

const rate = (b) => (b.currency === "USD" ? 1 : b.fx?.rate);
const round4 = (x) => Math.round(x * 10000) / 10000;

// Highest confirmed iBeta ISO/IEC 30107-3 level on the record, or 0.
export function padLevel(d) {
  return Math.max(0, ...(d.certifications || [])
    .filter((c) => /30107/.test(c.name) && c.status === "confirmed")
    .map((c) => +(((c.name + " " + (c.what || "")).match(/Level\s*(\d)/i) || [])[1] || 1)));
}

// Calculator input for one ranked provider. Monthly monitoring is described, not computed, so the page
// script can cost it for the visitor's own volume.
export function calcProvider(d, rank, entry) {
  const b = d.budget;
  if (!b?.options?.length) return null;
  const fx = rate(b);
  if (!fx) throw new Error(`budget: ${d.slug}: no fx rate for ${b.currency}`);
  const usd = (ref) => round4(amount(d, ref) * fx);
  const sum = (refs) => round4((refs || []).reduce((a, r) => a + amount(d, r), 0) * fx);
  const mon = b.monitoring || null;
  const opts = b.options.map((o) => {
    let monitoring = null;
    if (mon && (!mon.plan || mon.plan === o.plan)) {
      monitoring = mon.included ? { kind: "included" } : { kind: mon.basis, value: usd(mon.item) };
    }
    return {
      plan: o.plan,
      per: sum([...o.check, ...(o.per_user_monthly || [])]),
      min: o.minimum ? usd(o.minimum.item) : 0,
      amlIncl: !!o.aml_included,
      amlAdd: o.aml ? sum(o.aml) : null,
      monitoring,
    };
  });
  const lvl = padLevel(d);
  const t = b.terms || {};
  const lowMin = Math.min(...opts.map((o) => o.min));
  const badges = [
    t.self_serve === "yes" ? { label: "Self-serve", tone: "plain" } : null,
    t.contract === "none" ? { label: "No contract", tone: "plain" } : null,
    lowMin === 0 ? { label: "No minimum", tone: "plain" } : { label: "Minimum covers checks", tone: "plain" },
    lvl ? { label: `iBeta Level ${lvl}`, tone: "proof" } : { label: "No lab liveness letter", tone: "warn" },
  ].filter(Boolean);
  const notes = [
    ...(b.currency !== "USD" ? [`Priced in ${b.currency === "EUR" ? "euros" : "pounds"}`] : []),
    ...(b.starting_from ? ['"Starting from" price'] : []),
    ...(b.face_match === "not_named" ? ["Face match not named"] : []),
    ...(b.billing_note ? [b.billing_note] : []),
    ...(b.free_note ? [b.free_note] : []),
  ];
  return {
    slug: d.slug, name: d.name, rank, url: `/providers/${d.slug}/`,
    wordmark: d.logo?.wordmark || null,
    score: d.category_scores?.["cheap-kyc"]?.score ?? null,
    tradeoff: entry?.tradeoff || "",
    quoteAbove: b.quote_above || null,
    badges, notes, opts,
  };
}
