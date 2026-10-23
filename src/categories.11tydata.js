// Computed data for category and region ranking pages (src/categories.njk).
// Content: src/_data/categories/<slug>.yml; order and cards: src/_data/rankings.yml;
// scores, logos and links always come from the provider records.
const CAP_LABELS = {
  sanctions_pep: "Sanctions & PEP", adverse_media: "Adverse media", transaction_monitoring: "Transaction monitoring",
  case_management: "Case management", identity_verification: "Identity verification", deployment: "Deployment",
  published_pricing: "Published pricing",
  liveness_pad: "Liveness test (ISO 30107-3)", nfc: "NFC chip reading", video_ident: "Video ident (live agent)",
  soc2: "SOC 2", iso_27001: "ISO 27001", trust_framework: "Government trust framework",
};
const CAP_STATUS = {
  yes: ["full", "Yes"], add_on: ["half", "Add-on"], no: ["empty", "No"], not_disclosed: ["unknown", "Not disclosed"],
  partial: ["half", "Partial"], cloud: ["", "Cloud"], on_prem: ["", "On-premises"], cloud_and_on_prem: ["", "Cloud and on-premises"],
  confirmed: ["full", "Confirmed"], vendor_stated: ["half", "Vendor-stated"], in_progress: ["unknown", "In progress"],
};

// Certificate columns are read from the review's certifications[] (one record, no second copy).
// confirmed = we opened the certificate, register entry or lab letter; vendor_stated = only the vendor says so.
const CERT_KEYS = ["liveness_pad", "soc2", "iso_27001", "trust_framework"];
const CERT_RANK = { confirmed: 2, vendor_stated: 1 };
const FRAMEWORKS = [
  [/DIATF|Digital Verification Serv|DVS|trust framework/i, "UK DIATF"], [/FedRAMP/i, "FedRAMP"],
  [/eIDAS|qualified trust|ETSI/i, "eIDAS"], [/Kantara|IAL2|800-63/i, "Kantara / NIST IAL2"], [/PVID/i, "PVID (France)"],
];
const certCell = (key, certs = []) => {
  const ok = certs.filter((c) => CERT_RANK[c.status]);
  const best = (list) => [...list].sort((a, b) => CERT_RANK[b.status] - CERT_RANK[a.status])[0];
  const prog = (c) => /progress/i.test(c.name);
  if (key === "soc2" || key === "iso_27001") {
    const c = best(ok.filter((x) => (key === "soc2" ? /SOC 2/i : /27001/).test(x.name)));
    if (!c) return { status: "not_disclosed" };
    return { status: prog(c) ? "in_progress" : c.status, source: c.source };
  }
  if (key === "liveness_pad") {
    const pads = ok.filter((x) => /30107/.test(x.name));
    if (!pads.length) return { status: "not_disclosed" };
    const lvl = (c) => Math.max(0, ...[...c.name.matchAll(/Levels?\s*([123])/gi)].map((m) => +m[1]));
    const pool = pads.some((x) => x.status === "confirmed") ? pads.filter((x) => x.status === "confirmed") : pads;
    const top = [...pool].sort((a, b) => lvl(b) - lvl(a))[0];
    return { status: top.status, level: lvl(top) || null, source: top.source };
  }
  if (key === "trust_framework") {
    const hits = [];
    for (const c of [...ok].sort((a, b) => CERT_RANK[b.status] - CERT_RANK[a.status]))
      for (const [re, label] of FRAMEWORKS) if (re.test(c.name) && !hits.some((h) => h.label === label)) hits.push({ label, status: c.status });
    if (!hits.length) return { status: "not_disclosed" };
    const conf = hits.filter((h) => h.status === "confirmed");
    return { status: conf.length ? "confirmed" : "vendor_stated", names: (conf.length ? conf : hits).map((h) => h.label).join(", ") };
  }
  return { status: "not_disclosed" };
};

export default {
  pagination: { data: "categories", size: 1, alias: "c", resolve: "values", addAllPagesToCollections: true },
  permalink: (data) => data.c.url,
  eleventyComputed: {
    navCurrent: (d) => (["brazil", "canada", "india", "mexico", "peru", "south-africa"].includes(d.c.slug) ? "regions" : "use-cases"),
    seoTitle: (d) => d.c.seo?.title,
    seoDescription: (d) => d.c.seo?.description,
    updated: (d) => [d.c.updated, d.c.last_verified].filter(Boolean).sort().pop(),
    author: (d) => d.authors?.[d.c.author] || null,
    entries: (d) => (d.rankings[d.c.slug]?.providers || []).map((r, i) => ({
      rank: i + 1, r, q: r.slug ? d.providers[r.slug] || null : null,
    })),
    // Capability matrix: columns from the category file, cells from each ranked provider's capabilities{}
    // and, for certificate columns, from its certifications[].
    matrix: (d) => {
      const cols = (d.c.capability_columns || []).filter((k) => CAP_LABELS[k]);
      if (!cols.length) return null;
      const certMode = cols.some((k) => CERT_KEYS.includes(k));
      const rows = (d.rankings[d.c.slug]?.providers || [])
        .map((r) => (r.slug ? d.providers[r.slug] : null))
        .filter((q) => q && ((q.capabilities && cols.some((k) => q.capabilities[k])) || (certMode && q.certifications?.length)))
        .map((q) => ({
          slug: q.slug, name: q.name,
          cells: cols.map((k) => {
            const v = CERT_KEYS.includes(k) ? certCell(k, q.certifications) : (q.capabilities?.[k] || { status: "not_disclosed" });
            const status = String(v.status || "not_disclosed");
            const st = CAP_STATUS[status] || CAP_STATUS.not_disclosed;
            let label = st[1], note = ["add_on", "partial"].includes(status) ? v.note : null;
            if (k === "liveness_pad" && v.level) { label = `Level ${v.level}`; if (status === "vendor_stated") note = "Vendor-stated"; }
            if (k === "trust_framework" && v.names) note = v.names;
            return { key: k, status, sym: st[0], label, note, source: v.source || null };
          }),
        }));
      if (!rows.length) return null;
      const checked = rows.map((r) => d.providers[r.slug].capabilities?.checked || d.providers[r.slug].last_verified?.slice(0, 7)).filter(Boolean).sort().pop();
      const legend = certMode
        ? [["full", "Confirmed: we opened the certificate, register entry or lab letter, or the feature is in the core product"], ["half", "Vendor-stated, or an add-on"], ["empty", "Not offered"], ["unknown", "Not disclosed"]]
        : [["full", "In the core product"], ["half", "Add-on module or higher plan"], ["empty", "Not offered"], ["unknown", "Not disclosed"]];
      return { cols: cols.map((k) => ({ key: k, label: CAP_LABELS[k] })), rows, checked, legend };
    },
    related: (d) => (d.c.adjacent || []).map((slug) => {
      const cat = Object.values(d.categories).find((x) => x.slug === slug);
      return cat ? { slug, url: cat.url, name: cat.breadcrumb_label, count: (d.rankings[slug]?.providers || []).length } : null;
    }).filter(Boolean),
    jsonld: (d) => {
      const c = d.c, url = d.site.url + c.url;
      const list = d.rankings[c.slug]?.providers || [];
      const graph = [
        { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: c.seo?.h1,
          ...(c.updated || c.last_verified ? { dateModified: [c.updated, c.last_verified].filter(Boolean).sort().pop() } : {}) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: c.breadcrumb_label, item: url },
        ] },
        { "@type": "ItemList", name: c.seo?.h1, itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: list.length,
          itemListElement: list.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name,
            ...(r.slug && d.providers[r.slug] ? { url: `${d.site.url}/providers/${r.slug}/` } : {}) })) },
      ];
      if (c.faq?.length) graph.push({ "@type": "FAQPage", mainEntity: c.faq.map((f) => ({
        "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
      return { "@context": "https://schema.org", "@graph": graph };
    },
  },
};
