// Review sidebar (owner, 2026-11-10): no heading, a few rows, each row links to the section that
// holds the detail. Built only from the provider record and incidents.yml. A row with nothing to say
// is left out; no row ever reads "Not publicly disclosed". Only independent evidence gets a mark (◆).
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthYear = (iso) => { const [y, m] = String(iso).split("-").map(Number); return m ? `${MONTHS[m - 1]} ${y}` : String(y); };
const nd = (v) => !v || /not publicly disclosed|^none\b|^not published/i.test(String(v));
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const list = (xs) => (xs.length < 3 ? xs.join(" and ") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const INCIDENT = { breach: "Data breach", security_incident: "Security incident", exposure: "Data exposure",
  credential_exposure: "Credential exposure", regulatory: "Regulatory action" };

function priceRow(p) {
  const items = p.pricing?.items || [];
  const official = items.filter((i) => i.kind !== "third_party");
  const from = (p.facts || []).find((f) => f.label === "From")?.value;
  const status = p.capabilities?.published_pricing?.status;
  const find = (re, pool = official) => pool.find((i) => re.test(i.label) && !nd(i.value));
  let value;
  const quoteOnly = /^(custom )?quote/i;
  if (!nd(from) && !quoteOnly.test(from)) value = /^free\b|^from\b/i.test(from) ? cap(from) : `From ${from}`;
  else if (quoteOnly.test(from || "") || status === "no") value = "Quote only";
  else return null;
  const sub = [];
  if (value !== "Quote only") {
    const min = (p.pricing?.index?.minimum || [])[0];
    const minItem = min && official.find((i) => i.label === min);
    const mv = minItem && !nd(minItem.value) ? String(minItem.value) : null;
    const short = mv && mv.split(/[ (]/)[0];
    if (mv && !String(from).includes(short) && mv.length <= 40) sub.push(/minimum|month/i.test(mv) ? cap(mv) : `${mv} monthly minimum`);
  } else {
    const model = find(/billing|pricing model|model/i);
    if (model) sub.push(cap(model.value));
    const est = find(/median/i, items.filter((i) => i.kind === "third_party"));
    if (est) sub.push(`${est.label}: ${est.value}`);
  }
  const trial = find(/trial/i);
  if (trial && !/^not |not stated|not mentioned|length not stated|on request/i.test(trial.value))
    sub.push(/^(free|trial)/i.test(trial.value) ? cap(trial.value) : `Free trial: ${trial.value}`);
  return { label: "Price", value, sub: sub.slice(0, 2).map((s) => s.replace(/\.$/, "") + ".").join(" "), href: "#pricing" };
}

function testsRow(p) {
  const conf = (p.certifications || []).filter((c) => c.status === "confirmed" && !/progress/i.test(c.name));
  if (!conf.length) return null;
  const lvl = (c) => Math.max(0, ...[...c.name.matchAll(/Levels?\s*([123])/gi)].map((m) => +m[1]));
  const date = (c) => (String(c.what || "").match(/\(([A-Z][a-z]{2} \d{4})\)/) || [])[1];
  const pads = conf.filter((c) => /30107/.test(c.name)).sort((a, b) => lvl(b) - lvl(a));
  const show = (c) => {
    if (/30107/.test(c.name) && /iBeta/i.test(c.name)) return `iBeta liveness Level ${lvl(c)}${date(c) ? ` (${date(c)})` : ""}`;
    return c.name;
  };
  const rest = conf.filter((c) => !/30107/.test(c.name));
  const ordered = [...(pads.length ? [pads[0]] : []), ...rest];
  const more = ordered.length - 2;
  return { label: "Independent tests", value: `◆ ${show(ordered[0])}`,
    sub: ordered[1] ? `◆ ${show(ordered[1])}${more > 0 ? `, +${more} more` : ""}` : "", href: "#certifications" };
}

function watchRow(p, incidents) {
  const inc = (incidents || []).filter((x) => x.slug === p.slug).sort((a, b) => b.date.localeCompare(a.date))[0];
  if (inc) return { label: "Watch", value: `${INCIDENT[inc.type] || "Incident"}, ${monthYear(inc.date)}`, sub: inc.title, href: "#incidents" };
  const own = p.track_record?.ownership;
  if (own && (own.status === "changed_disclosed" || own.status === "pending_sale"))
    return { label: "Watch", value: own.status === "pending_sale" ? "Business being sold" : "Ownership changed", sub: cap(own.note), href: "#what-is" };
  return null;
}

function altRow(p, alts) {
  const names = (alts || []).map((a) => a.q.name);
  if (!names.length) return null;
  return { label: "Alternatives", value: list(names.slice(0, 3)), sub: "", href: "#alternatives" };
}

export function buildSidebar(p, incidents, alts) {
  const rows = [priceRow(p), testsRow(p), watchRow(p, incidents)].filter(Boolean);
  if (rows.length <= 1) { const a = altRow(p, alts); if (a) rows.push(a); }
  return rows;
}

// "Company facts" section in the main column: the record's facts minus price rows.
export const companyFacts = (p) => (p.facts || []).filter((f) => !["From", "Effective"].includes(f.label) && !nd(f.value));
