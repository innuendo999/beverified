// Incident tracker (/incidents/): rows, filters, vendor lookup and the CSV/JSON export, all built from
// src/_data/incidents.yml. Nothing is typed here; labels only.
export const TYPE = { breach: "Data breach", security_incident: "Security incident", exposure: "Data exposure", credential_exposure: "Credential exposure", regulatory: "Regulatory action" };
export const STATUS = { contained: "Contained", investigating: "Under investigation", disputed: "Disputed by vendor", litigation: "Litigation pending", resolved: "Resolved" };
export const OUTCOME = { pending: "Appeal under review", upheld: "Appeal upheld", partly_upheld: "Appeal partly upheld", rejected: "Appeal not upheld" };
const OPEN = new Set(["investigating", "disputed", "litigation"]);
const NOT_COUNTED = { test_system: "Not counted: test system", older_than_24_months: "Not counted: over 24 months", not_reviewed: "Not counted: not reviewed" };
const WINDOW_DAYS = 730; // scores use incidents from the last 24 months (docs/scoring-v3.1.md)
const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => `${M[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
const day = (iso) => new Date(`${String(iso).slice(0, 10)}T00:00:00Z`);

// "ID document images, postal addresses, dates of birth": one sentence, acronyms kept.
const dataText = (data) => (data || []).map((s, i) => (i && /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s)).join(", ");

function scoreLine(x, today) {
  if (x.counted === false) return NOT_COUNTED[x.not_counted_reason] || "Not counted in score";
  const until = new Date(day(x.date).getTime() + WINDOW_DAYS * 864e5);
  if (until < today) return "Past 24 months, drops out at the next re-score";
  return `Lowers score until ${fmt(until)}`;
}

export function rows(d, today = new Date()) {
  return (d.incidents?.items || []).filter((x) => x && x.date).slice().sort((a, b) => String(b.date).localeCompare(String(a.date))).map((x) => ({
    ...x,
    typeLabel: TYPE[x.type] || x.type,
    statusLabel: STATUS[x.status] || x.status,
    appealLabel: x.appeal ? OUTCOME[x.appeal.outcome] || "" : "",
    dataText: dataText(x.data),
    idData: x.sensitivity === "high",
    open: OPEN.has(x.status),
    scoreLine: scoreLine(x, today),
    mailto: `mailto:support@beverified.org?subject=${encodeURIComponent(`Incident tracker: correction or appeal (${x.id})`)}`,
    p: d.allProviders?.[x.slug] || d.providers?.[x.slug] || null,
  }));
}

export const FILTERS = [
  { key: "all", label: "All entries", test: () => true },
  { key: "id", label: "ID data exposed", test: (r) => r.idData },
  { key: "counted", label: "Lowers a score now", test: (r) => r.counted !== false && r.scoreLine.startsWith("Lowers") },
  { key: "open", label: "Not settled yet", test: (r) => r.open },
];
export const filters = (list) => FILTERS.map((f) => ({ key: f.key, label: f.label, count: list.filter(f.test).length }));
export const filterKeys = (r) => FILTERS.filter((f) => f.key !== "all" && f.test(r)).map((f) => f.key).join(" ");

// Vendor lookup: every reviewed provider, plus any tracked vendor that has an entry.
export function lookup(d, list) {
  const provs = d.allProviders || d.providers || {};
  list = (list || []).filter((x) => x && x.slug);
  const out = Object.entries(provs).filter(([, p]) => p && p.name).map(([slug, p]) => ({ n: p.name, s: slug, r: true, h: `/providers/${slug}/` }));
  for (const x of list) if (!provs[x.slug] && !out.some((v) => v.s === x.slug)) out.push({ n: x.vendor, s: x.slug, r: false });
  for (const v of out) v.e = list.filter((x) => x.slug === v.s).map((x) => ({ id: x.id, d: fmt(day(x.date)), t: x.title, c: x.scoreLine.startsWith("Lowers") }));
  return out.sort((a, b) => a.n.localeCompare(b.n));
}

// Export (CSV and JSON, CC BY 4.0): the record fields plus source URLs, which the page does not show.
export function exportRows(list) {
  return list.map((x) => ({
    id: x.id, vendor: x.vendor, reported: String(x.date).slice(0, 10), type: x.typeLabel, status: x.statusLabel,
    id_data_exposed: x.idData, data_exposed: x.dataText, scale: x.scale, confirmed_by: x.confirmed_by || "",
    counted_in_score: x.counted !== false, score_effect: x.scoreLine, title: x.title, summary: x.summary,
    vendor_response: x.response, since: x.since, timeline: (x.timeline || []).map((s) => `${s.when}: ${s.what}`).join("; "),
    customer_actions: (x.customer_actions || []).join("; "),
    sources: (x.sources || []).map((s) => `${s.title} (${s.publisher}) ${s.url}`).join("; "),
    url: `https://beverified.org/incidents/#${x.id}`,
  }));
}
export function toCsv(list) {
  const r = exportRows(list);
  if (!r.length) return "";
  const cols = Object.keys(r[0]);
  const cell = (v) => { const s = String(v ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  return [cols.join(","), ...r.map((o) => cols.map((c) => cell(o[c])).join(","))].join("\n") + "\n";
}
