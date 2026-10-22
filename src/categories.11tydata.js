// Computed data for category and region ranking pages (src/categories.njk).
// Content: src/_data/categories/<slug>.yml; order and cards: src/_data/rankings.yml;
// scores, logos and links always come from the provider records.
const CAP_LABELS = {
  sanctions_pep: "Sanctions & PEP", adverse_media: "Adverse media", transaction_monitoring: "Transaction monitoring",
  case_management: "Case management", identity_verification: "Identity verification", deployment: "Deployment",
  published_pricing: "Published pricing",
};
const CAP_FILTER_LABELS = { deployment: "On-premises option" };
const CAP_STATUS = {
  yes: ["full", "Yes"], add_on: ["half", "Add-on"], no: ["empty", "No"], not_disclosed: ["unknown", "Not disclosed"],
  partial: ["half", "Partial"], cloud: ["", "Cloud"], on_prem: ["", "On-premises"], cloud_and_on_prem: ["", "Cloud and on-premises"],
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
    // Capability matrix: columns from the category file, cells from each ranked provider's capabilities{}.
    matrix: (d) => {
      const cols = (d.c.capability_columns || []).filter((k) => CAP_LABELS[k]);
      if (!cols.length) return null;
      const rows = (d.rankings[d.c.slug]?.providers || [])
        .map((r) => (r.slug ? d.providers[r.slug] : null))
        .filter((q) => q && q.capabilities && cols.some((k) => q.capabilities[k]))
        .map((q) => ({
          slug: q.slug, name: q.name,
          cells: cols.map((k) => {
            const v = q.capabilities[k] || { status: "not_disclosed" };
            const st = CAP_STATUS[String(v.status)] || CAP_STATUS.not_disclosed;
            const showNote = ["add_on", "partial"].includes(String(v.status));
            return { key: k, status: String(v.status || "not_disclosed"), sym: st[0], label: st[1], note: showNote ? v.note : null, source: v.source || null };
          }),
        }));
      if (!rows.length) return null;
      const checked = rows.map((r) => d.providers[r.slug].capabilities.checked).filter(Boolean).sort().pop();
      return { cols: cols.map((k) => ({ key: k, label: CAP_LABELS[k], filterLabel: CAP_FILTER_LABELS[k] || CAP_LABELS[k] })), rows, checked };
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
