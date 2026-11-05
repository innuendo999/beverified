// /incidents/ security incident tracker. Data: src/_data/incidents.yml (one record per incident).
const TYPE = { breach: "Data breach", security_incident: "Security incident", exposure: "Data exposure", credential_exposure: "Credential exposure", regulatory: "Regulatory action" };
const STATUS = { contained: "Contained", investigating: "Under investigation", disputed: "Disputed by vendor", litigation: "Litigation pending", resolved: "Resolved" };
const OUTCOME = { pending: "Appeal under review", upheld: "Appeal upheld", partly_upheld: "Appeal partly upheld", rejected: "Appeal not upheld" };
const items = (d) => (d.incidents?.items || []).slice().sort((a, b) => b.date.localeCompare(a.date)).map((x) => ({
  ...x,
  typeLabel: TYPE[x.type] || x.type,
  statusLabel: STATUS[x.status] || x.status,
  appealLabel: x.appeal ? OUTCOME[x.appeal.outcome] || "" : "",
  mailto: `mailto:support@beverified.org?subject=${encodeURIComponent(`Incident tracker: correction or appeal (${x.id})`)}`,
  year: x.date.slice(0, 4),
  // "ID document images, postal addresses, dates of birth": one sentence, acronyms kept.
  dataText: (x.data || []).map((s, i) => (i && /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s)).join(", "),
  p: d.providers?.[x.slug] || null,
}));
export default {
  permalink: "/incidents/",
  navCurrent: "incidents",
  seoTitle: "KYC & IDV Vendor Security Incident Tracker | BeVerified",
  seoDescription: "Data breaches, exposures and security incidents at KYC, identity verification and AML vendors since 2024, with what was exposed, the vendor's response and sources.",
  eleventyComputed: {
    list: (d) => items(d),
    years: (d) => [...new Set(items(d).map((x) => x.year))],
    stats: (d) => {
      const l = items(d);
      return {
        total: l.length,
        vendors: new Set(l.map((x) => x.slug)).size,
        idDocs: l.filter((x) => x.sensitivity === "high").length,
        recent: l.filter((x) => (new Date(d.incidents.checked) - new Date(x.date)) / 864e5 <= 730).length,
      };
    },
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${d.site.url}/incidents/#webpage`, url: `${d.site.url}/incidents/`,
          name: "KYC and identity verification vendor security incident tracker", isPartOf: { "@id": `${d.site.url}/#website` },
          dateModified: d.incidents?.checked,
          mainEntity: { "@type": "ItemList", itemListElement: items(d).map((x, i) => ({
            "@type": "ListItem", position: i + 1, name: `${x.vendor}: ${x.title}`, url: `${d.site.url}/incidents/#${x.id}` })) } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: "Incident tracker", item: `${d.site.url}/incidents/` } ] },
      ],
    }),
  },
};
