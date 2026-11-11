// Review page V4 (owner, 2026-11-10). Builds every V4 block from the provider record, its profile
// (src/_data/reviewProfiles.yml), incidents.yml and the other provider records. Nothing is typed here:
// each value comes from a record field, and a block with no data is left out of the page.

const ND = /^not publicly disclosed\b|^none stated$|^not stated\b/i;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthYear = (v) => { const [y, m] = String(v || "").split("-").map(Number); return m ? `${MONTHS[m - 1]} ${y}` : y ? String(y) : ""; };
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const rootOf = (h) => h.split(".").slice(-2).join(".");
const list = (xs) => (xs.length < 3 ? xs.join(" and ") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

export function profileFor(p, profiles) {
  const key = profiles?.map?.[p.primary_category];
  const prof = key ? profiles[key] : null;
  return prof ? { key, ...prof } : null;
}

// "CHF 900 / month for Starter (G2 and Capterra listings; ...)" -> main + sub
const split = (v) => {
  const s = String(v || "").trim();
  const y = s.match(/^(\d{4}), (.+)$/);
  if (y) return { main: y[1], sub: y[2] };
  const i = s.indexOf(" (");
  if (i > 0 && s.endsWith(")")) return { main: s.slice(0, i), sub: s.slice(i + 2, -1) };
  const c = s.indexOf(", ");
  if (/^\d{4}, /.test(s) && c > 0) return { main: s.slice(0, c), sub: s.slice(c + 2) };
  return { main: s, sub: "" };
};
const fact = (p, label) => (p.facts || []).find((f) => f.label === label);

// Three short facts under the verdict: price, best certificate, founded. Rows with no data are dropped.
export function heroFacts(p) {
  const out = [];
  const from = fact(p, "From");
  if (from && !ND.test(from.value)) {
    const { main, sub } = split(from.value);
    out.push({ label: "Price", value: /^(free|from)\b/i.test(main) ? main : `From ${main}`, sub });
  }
  const certs = p.certifications || [];
  const conf = certs.find((c) => c.status === "confirmed");
  const vend = certs.find((c) => c.status === "vendor_stated");
  if (conf) out.push({ label: "Certificate", value: conf.name, sub: "Confirmed by us", ok: true });
  else if (vend) out.push({ label: "Certificate", value: vend.name, sub: "Vendor-stated" });
  const founded = fact(p, "Founded");
  if (founded && !ND.test(founded.value)) {
    const { main, sub } = split(founded.value);
    out.push({ label: "Founded", value: main, sub });
  }
  return out;
}

const STATUS = {
  built_in: "Built in", own: "Own network", live: "Connected", bridge: "Through a bridge",
  via_membership: "Through your own membership", pending: "Pending", planned: "Listed as future",
  inbound: "Incoming only", fallback: "Fallback", not_found: "No connection found",
};
export function networkRows(p) {
  // Connected states read "Built in. <note>"; for the others the note already says it ("Through the TRP and TRISA bridge").
  const LEAD = ["built_in", "own", "live"];
  return (p.networks || []).map((n) => ({ ...n, line: n.note ? (LEAD.includes(n.status) ? `${STATUS[n.status]}. ${n.note}` : n.note) : (STATUS[n.status] || n.status), off: n.status === "not_found" }));
}

export function factRows(p, labels) {
  return (labels || []).map((l) => fact(p, l)).filter(Boolean)
    .map((f) => ({ label: f.label, value: ND.test(f.value) ? "Not disclosed" : f.value, independent: f.evidence === "independent" }));
}

// Certificates we found, plus "No claim found" for each expected one that is missing.
export function certRows(p, expected) {
  const certs = (p.certifications || []).map((c) => ({
    name: c.name, what: c.what || "",
    status: c.status === "confirmed" ? "Confirmed" : c.status === "vendor_stated" ? "Vendor-stated" : "Not found",
    ok: c.status === "confirmed",
  }));
  for (const e of expected || []) {
    if (!certs.some((c) => c.name.toLowerCase().includes(e.toLowerCase()))) certs.push({ name: e, what: "", status: "No claim found", ok: false });
  }
  return certs;
}

export function incidentRow(p, incidents) {
  const own = (incidents || []).filter((x) => x.slug === p.slug).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!own.length) return { value: "None found", ok: true };
  return { value: `${own.length} on record, latest ${monthYear(String(own[0].date).slice(0, 7))}`, ok: false, href: "#incidents" };
}

// "Look elsewhere" lines may name an alternative that has a review.
export function fitRows(p, providers) {
  const f = p.fit || {};
  return {
    yes: f.yes || [],
    no: (f.no || []).map((x) => ({ text: x.text, alt: x.alt && providers[x.alt] ? { name: providers[x.alt].name, url: `/providers/${x.alt}/` } : null })),
  };
}

// Questions for the sales call, built from gaps in the record. At most four, most important first.
export function questions(p, nets) {
  const q = [];
  const pp = p.capabilities?.published_pricing?.status;
  const from = fact(p, "From")?.value || "";
  const noPrice = pp === "no" || ND.test(from) || /not on the vendor|G2|Capterra/i.test(from)
    || (p.pricing?.items || []).some((i) => i.kind !== "third_party" && /^published prices$/i.test(i.label) && /none/i.test(i.value));
  if (noPrice) q.push(`What is the written price for our expected transfer volume, and is there a minimum commitment?`);
  else if (pp === "partial") q.push(`Which plan fits our transfer volume, and what does it cost in writing?`);
  const missing = (nets || []).filter((n) => n.status === "not_found").map((n) => n.name);
  if (missing.length && !/^other networks$/i.test(missing[0])) q.push(`How do we reach counterparties on ${list(missing)}, and at what cost?`);
  else if (missing.length) q.push(`Which other Travel Rule networks can we reach through you, and how?`);
  const certs = p.certifications || [];
  const soc = certs.find((c) => /SOC 2/i.test(c.name));
  const iso = certs.find((c) => /27001/.test(c.name));
  if (!soc) q.push(`Do you have a SOC 2 Type II report, and can we see it before we sign?`);
  else if (soc.status !== "confirmed") q.push(`Can we see the SOC 2 Type II report and the auditor's name before we sign?`);
  if (iso && iso.status !== "confirmed") q.push(`Can we see the ISO/IEC 27001 certificate and its scope?`);
  const entity = fact(p, "Legal entity") || fact(p, "Operator");
  if (!entity || ND.test(entity.value)) q.push(`Which legal entity signs the contract?`);
  return q.slice(0, 4);
}

// Sources grouped by who published them. Order: what the vendor does not control first.
const LISTING = ["g2.com", "capterra.com", "capterra.co.uk", "getapp.com", "sourceforge.net", "gartner.com", "trustradius.com", "trustpilot.com", "softwareadvice.com"];
const LAW = ["eur-lex.europa.eu", "fatf-gafi.org", "fincen.gov", "legislation.gov.uk", "esma.europa.eu", "eba.europa.eu", "mas.gov.sg", "fca.org.uk"];
const REGISTER = /register|registry|gleif|lei record|moneyhouse|graph\.swiss|companies house|opencorporates|ariregister|acra|uen|standards council|accreditation|ibeta|nist/i;
export const SOURCE_GROUPS = [
  ["register", "Registers, certificates and counterparties"],
  ["competitor", "Competitors"],
  ["law", "Law and regulators"],
  ["press", "Press and analysis"],
  ["listing", "Marketplaces and user reviews"],
  ["vendor", null],
];
export function sourceGroups(p, providers) {
  const own = hostOf(p.link?.url);
  const ownRoot = own ? own.split(".")[0] : "";
  const others = Object.values(providers || {}).filter((q) => q.slug !== p.slug);
  const type = (s) => {
    if (s.type) return s.type === "counterparty" || s.type === "certificate" ? "register" : s.type;
    const h = hostOf(s.url), pub = String(s.publisher || "");
    if (pub === p.name || (own && (h === own || rootOf(h) === rootOf(own))) || (ownRoot && h.startsWith(ownRoot + ".")) || (ownRoot && h.includes(ownRoot) && /docs|compliance/.test(h))) return "vendor";
    if (LISTING.some((d) => h === d || h.endsWith("." + d))) return "listing";
    if (LAW.some((d) => h === d || h.endsWith("." + d)) || /\.gov$|\.gov\.|europa\.eu$/.test(h)) return "law";
    if (others.some((q) => pub.startsWith(q.name) || (q.link?.url && rootOf(hostOf(q.link.url)) === rootOf(h)))) return "competitor";
    if (REGISTER.test(pub) || REGISTER.test(s.title || "") || /gleif|moneyhouse|graph\.swiss|uid\.admin|scc-ccn/.test(h)) return "register";
    return "press";
  };
  const items = (p.sources || []).map((s, i) => ({ ...s, n: i + 1, t: type(s) }));
  const groups = SOURCE_GROUPS.map(([k, title]) => ({ key: k, title: title || `${p.name}'s own site and docs`, items: items.filter((x) => x.t === k) }))
    .filter((g) => g.items.length);
  const count = (k) => items.filter((x) => x.t === k).length;
  const vendor = count("vendor"), reg = count("register"), rest = items.length - vendor - reg;
  const parts = [];
  if (vendor) parts.push(`${vendor} from ${p.name} itself`);
  if (reg) parts.push(`${reg} from registers, certificate bodies and counterparties`);
  if (rest) parts.push(`${rest} from the press, competitors, marketplaces and regulators`);
  const months = [...new Set(items.map((x) => monthYear(x.accessed)).filter(Boolean))];
  return { groups, total: items.length, summary: parts.length ? list(parts) : "", opened: months.length === 1 ? months[0] : "" };
}

export function reviewYear(p) {
  return String(p.last_verified || p.updated || "").slice(0, 4);
}

// V5 pricing calculator (owner, 2026-11-11). Every figure is read from pricing.items by label:
// price_item gives the currency and the monthly price, cap_item the monthly transfer cap.
// Tiers with no price_item are shown as quoted. Returns null when the record has no pricing_calc.
export function pricingCalc(p) {
  const c = p.pricing_calc;
  if (!c?.plans?.length) return null;
  const items = p.pricing?.items || [];
  const val = (label) => items.find((i) => i.label === label)?.value || "";
  const num = (s) => Number(String(s).replace(/,/g, ""));
  let currency = "";
  const plans = c.plans.map((pl) => {
    const pv = pl.price_item ? val(pl.price_item) : "";
    const m = pv.match(/\b([A-Z]{3})\s?([\d,]+)\s*\/\s*month/);
    if (m && !currency) currency = m[1];
    const cap = pl.cap_item ? (val(pl.cap_item).match(/up to ([\d,]+)/i) || [])[1] : null;
    return {
      tier: pl.tier,
      monthly: m ? num(m[2]) : null,
      priceLabel: m ? `${m[1]} ${m[2]} / month` : "Quoted",
      cap: cap ? num(cap) : null,
      // an include is an item label, or { item, label } to print "label: value" when the value needs it
      includes: (pl.includes || []).map((x) => typeof x === "string" ? val(x) : (val(x.item) ? `${x.label}: ${val(x.item)}` : "")).filter(Boolean),
      source: pl.source || "",
    };
  });
  if (!plans.some((x) => x.monthly)) return null;
  return { currency, volumeLabel: c.volume_label || "Transfers a month", plans };
}

// V5 "What X does", grouped by the buyer's job. shots point at screenshots[] by index.
export function productJobs(p) {
  const shots = p.screenshots || [];
  return (p.product_jobs || []).map((j) => ({
    title: j.title, text: j.text, minor: !!j.minor,
    shots: (j.shots || []).filter((i) => shots[i]).map((i) => ({ i, label: `See ${/^[A-Z][a-z]/.test(shots[i].caption) ? shots[i].caption.charAt(0).toLowerCase() + shots[i].caption.slice(1) : shots[i].caption}` })),
  }));
}
