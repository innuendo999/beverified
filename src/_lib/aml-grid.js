// Capabilities table for the AML ranking (owner chose "variant B" on the canvas "BeVerified: AML ranking page,
// redesign proposal", 2026-11-23): columns grouped by buyer question, the four core lists as marks, plain marks
// for stated / add-on / not offered / not stated. Read from each record only (docs/scoring-aml.md fields).
// Green is never used here: every cell is what the vendor states.
const LISTS = [["ofac", "OFAC"], ["eu", "EU"], ["uk", "UK"], ["un", "UN"]];
const mark = (c, text = null) => {
  const s = String(c?.status || "not_disclosed");
  if (s === "yes") return { mark: "yes", text };
  if (s === "add_on" || s === "partial") return { mark: "half", tag: s === "add_on" ? "Add-on" : "Partly", text };
  if (s === "no") return { mark: "no" };
  return { mark: "nd" };
};
const updates = (c) => {
  const h = c?.hours;
  return h ? { value: h <= 1 ? "Within 1 hour" : h <= 24 ? "Daily" : h >= 720 ? "Up to 1 month" : `Up to ${h} hours` } : { mark: "nd" };
};
const rescreen = (c) => mark(c, { list_change: "On list change", daily: "Daily", periodic: "Periodic" }[c?.trigger] || "Trigger not stated");

export const AML_GRID_GROUPS = [
  { icon: "sanctions", label: "Screening data", cols: [["lists", "Core sanctions lists"], ["updates", "List updates"]] },
  { icon: "search", label: "Match controls", cols: [["translit", "Transliteration"], ["ids", "DOB and other identifiers"], ["cleared", "Cleared matches suppressed"]] },
  { icon: "refresh", label: "Monitoring", cols: [["rescreen", "Re-screening"], ["payments", "Payment screening"]] },
  { icon: "integration", label: "Integration", cols: [["webhooks", "Webhooks"], ["idv", "Identity verification"]] },
  { icon: "price-tag", label: "Price", cols: [["price", "Starting price"]] },
];

// entries: the category page's entries (rank, r = rankings.yml entry, q = provider record, score).
export function amlGrid(entries, logoTiles = {}) {
  const rows = (entries || []).filter((e) => e.q).map((e) => {
    const q = e.q, c = q.capabilities || {}, lists = c.list_coverage?.lists || [];
    const t = logoTiles[q.slug] || {};
    return {
      rank: e.rank, slug: q.slug, name: q.name, score: e.score,
      wordmark: q.logo?.wordmark || null, logo: q.logo?.src || null, tileBg: t.bg || "#FFFFFF", tileFit: t.fit || "contain",
      cells: {
        lists: { lists: LISTS.map(([k, l]) => ({ label: l, on: lists.includes(k) })) },
        updates: updates(c.list_updates),
        translit: mark(c.transliteration), ids: mark(c.secondary_identifiers), cleared: mark(c.whitelisting),
        rescreen: rescreen(c.ongoing_monitoring), payments: mark(c.transfer_screening),
        webhooks: mark(q.integration?.webhooks), idv: mark(c.identity_verification),
        price: { value: e.r.legacy_price_shown || "Quote only", strong: true },
      },
    };
  });
  // Latest check among the fields shown (each AML 1.0 field carries its own checked date).
  const KEYS = ["list_coverage", "list_updates", "transliteration", "secondary_identifiers", "whitelisting", "ongoing_monitoring", "transfer_screening", "identity_verification"];
  const checked = (entries || []).filter((e) => e.q).flatMap((e) => [...KEYS.map((k) => e.q.capabilities?.[k]?.checked), e.q.integration?.webhooks?.checked])
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(String(d || ""))).sort().pop() || null;
  return rows.length ? { groups: AML_GRID_GROUPS, rows, checked } : null;
}
