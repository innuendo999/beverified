// Fit check on Travel Rule reviews (review page V5, owner 2026-11-11).
// Reads only provider records and src/_data/travelRuleFit.yml: networks[], the Deployment and
// self-hosted wallet facts, certifications[], capabilities.published_pricing and pricing items.
// Status codes for the page script: y (yes), p (partly), plan (planned or pending), n (not found).
// A need with no entry shows "Not checked" on the page.

const ND = /^not publicly disclosed\b|^none stated$|^not stated\b/i;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = (v) => { const [y, m, d] = String(v || "").split("-").map(Number); return m ? `${MONTHS[m - 1]} ${d ? d + ", " : ""}${y}` : String(y || ""); };
const month = (v) => { const [y, m] = String(v || "").split("-").map(Number); return m ? `${MONTHS[m - 1]} ${y}` : ""; };
const fact = (p, label) => (p.facts || []).find((f) => f.label === label);

const NET_STATUS = { built_in: "y", own: "y", live: "y", fallback: "y", bridge: "p", via_membership: "p", inbound: "p", pending: "plan", planned: "plan", not_found: "n" };
const PROOFS = { sig: /sign/i, sat: /satoshi|micro-?trans|test payment/i, aopp: /\baopp\b/i, vis: /screenshot|photo|video|visual/i };

function networks(p, map) {
  const out = {};
  const keyOf = (name) => {
    if (/^own network$/i.test(name)) return map.own_network?.[p.slug] || null;
    const n = map.networks.find((x) => x.aliases.some((a) => a.toLowerCase() === name.toLowerCase()));
    return n ? n.key : null;
  };
  for (const n of p.networks || []) {
    const st = NET_STATUS[n.status];
    if (!st) continue;
    const note = n.note || (st === "n" ? `No connection found (${month(p.last_verified)})` : "");
    const row = [st, note, n.evidence === "independent" ? 1 : 0];
    if (/^other networks$/i.test(n.name)) {
      const skip = map.other_networks_skip?.[p.slug] || [];
      for (const x of map.networks) if (!skip.includes(x.key) && !out["net_" + x.key]) out["net_" + x.key] = row;
      continue;
    }
    for (const name of n.name.split(/,\s*|\s+and\s+/)) {
      const k = keyOf(name.trim());
      if (k) out["net_" + k] = row;
    }
  }
  for (const [k, v] of Object.entries(map.also?.[p.slug] || {})) {
    const own = (p.networks || []).find((n) => /^own network$/i.test(n.name));
    out["net_" + k] = [v.status === "yes" ? "y" : v.status, own?.note || "", 0];
  }
  return out;
}

function proofs(p) {
  const f = fact(p, "Self-hosted wallet proofs") || fact(p, "Self-hosted wallet checks");
  if (!f || ND.test(f.value)) return {};
  const v = String(f.value);
  const cut = v.search(/\bno\b/i);
  const pos = cut >= 0 ? v.slice(0, cut) : v, neg = cut >= 0 ? v.slice(cut) : "";
  const out = {};
  for (const [k, re] of Object.entries(PROOFS)) {
    if (re.test(pos)) out["p_" + k] = ["y", v, 0];
    else if (re.test(neg)) out["p_" + k] = ["n", v, 0];
  }
  return out;
}

function cert(p, re) {
  const c = (p.certifications || []).find((x) => re.test(x.name));
  if (!c) return ["n", "No claim found", 0];
  if (c.status === "confirmed") return ["y", `${c.name}, confirmed by us`, 1];
  if (c.status === "vendor_stated") return ["p", `${c.name}, vendor-stated`, 0];
  return ["n", "No claim found", 0];
}

function price(p, map) {
  const pp = p.capabilities?.published_pricing;
  const PP = { yes: "y", partial: "p", no: "n" };
  if (pp && PP[pp.status]) {
    const lead = { y: "Prices are published", p: "Some prices are published", n: "No published prices" }[PP[pp.status]];
    return [PP[pp.status], pp.note ? `${lead}: ${pp.note}` : lead, 0];
  }
  const m = map.price?.[p.slug];
  if (!m) return null;
  const item = (p.pricing?.items || []).find((i) => i.label === m.item);
  const st = { yes: "y", partly: "p", not_found: "n" }[m.status];
  return [st, m.note || item?.value || "", 0];
}

function deploy(p, map) {
  const d = map.deploy?.[p.slug];
  if (!d) return {};
  const base = fact(p, "Deployment")?.value || "";
  const own = d.fact ? fact(p, d.fact)?.value : "";
  const st = { yes: "y", partly: "p", not_found: "n" };
  const out = {};
  if (st[d.self]) out.self = [st[d.self], d.self === "not_found" && own ? own : base, 0];
  if (st[d.hosted]) out.hosted = [st[d.hosted], base, 0];
  return out;
}

// Everything the fit check needs, for every provider in the Travel Rule ranking.
export function fitCheckData(providers, rankings, map) {
  if (!map?.ranking) return null;
  const order = (rankings?.[map.ranking]?.providers || []).map((x) => x.slug).filter((s) => providers[s]);
  const list = order.map((slug, i) => {
    const p = providers[slug];
    const s = { ...deploy(p, map), ...networks(p, map), ...proofs(p), iso: cert(p, /27001/), soc2: cert(p, /SOC 2/i) };
    const pr = price(p, map);
    if (pr) s.price = pr;
    return { slug, name: p.name, score: p.score != null ? Number(p.score).toFixed(1) : "", rank: i + 1, checked: day(p.last_verified), s };
  });
  return {
    providers: list,
    networks: map.networks.map((n) => ({ key: n.key, label: n.label })),
  };
}

// Short deployment line for the hero, from the same reading.
export function deployHero(p, map) {
  const d = map?.deploy?.[p.slug];
  const f = fact(p, "Deployment");
  if (!d?.short || !f) return null;
  return { label: "Deployment", value: d.short, sub: d.sub || f.value, selfHosted: d.self === "yes" };
}
