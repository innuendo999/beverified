// Shared JSON-LD pieces (owner, 2026-11-23: Organization logo, BusinessApplication, offers where a price is published).
const MONEY = /([$€£])\s?(\d[\d,]*(?:\.\d+)?)|\b(USD|EUR|GBP|CHF)\s?(\d[\d,]*(?:\.\d+)?)/;
const CUR = { $: "USD", "€": "EUR", "£": "GBP" };

// The publisher node, with the logo Google asks for (square mark, 512 x 512). Same @id on every page.
export function organization(site) {
  return {
    "@type": "Organization", "@id": `${site.url}/#organization`, name: "BeVerified", url: `${site.url}/`,
    logo: { "@type": "ImageObject", url: `${site.url}/assets/brand/beverified-mark-512.png`, width: 512, height: 512 },
  };
}

// Offer from the record's own published price: the first non-zero official item named in pricing.index.price.
// No offer when the record has no Pricing Index price (quote-only vendors, index_exclude): we never invent a price.
export function offerFor(p) {
  try { return offer(p); } catch { return null; } // Eleventy probes computed data with proxies first
}
function offer(p) {
  const pr = p?.pricing;
  if (!pr?.index?.price || pr.index_exclude) return null;
  for (const label of [].concat(pr.index.price)) {
    const it = (pr.items || []).find((i) => i.label === label && i.kind === "official");
    const m = it && typeof it.value === "string" ? it.value.match(MONEY) : null;
    if (!m) continue;
    const src = typeof it.source === "number" ? (p.sources || [])[it.source - 1] : null;
    const price = Number((m[2] || m[4]).replace(/,/g, ""));
    if (!price) continue;
    return { "@type": "Offer", price: String(price), priceCurrency: m[1] ? CUR[m[1]] : m[3], description: `${it.label}: ${it.value}`, ...(src?.url ? { url: src.url } : {}) };
  }
  return null;
}
