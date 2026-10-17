// /use-cases/ hub. Cards come from home.yml → use_cases; counts and top 3 from rankings.yml.
const GROUPS = ["Identity", "Business", "Financial crime", "Crypto", "Budget"];
const cards = (d) => (d.home?.use_cases || []).map((u) => {
  const list = d.rankings?.[u.slug]?.providers || [];
  const cat = Object.values(d.categories || {}).find((c) => c.slug === u.slug);
  return { ...u, url: cat?.url || `/providers/${u.slug}/`, count: list.length,
    top: list.slice(0, 3).map((r) => ({ name: r.name, p: d.providers?.[r.slug] || null })) };
});
export default {
  permalink: "/use-cases/",
  navCurrent: "use-cases",
  seoTitle: "KYC, KYB & AML Providers by Use Case | BeVerified",
  seoDescription: "Rankings of KYC, KYB and AML providers by job: identity verification, eKYC, liveness, KYB, AML screening, crypto KYC, Travel Rule and budget KYC.",
  eleventyComputed: {
    groups: (d) => GROUPS.map((g) => ({ name: g, items: cards(d).filter((c) => c.group === g) })).filter((g) => g.items.length),
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${d.site.url}/use-cases/#webpage`, url: `${d.site.url}/use-cases/`,
          name: "KYC, KYB & AML providers by use case", isPartOf: { "@id": `${d.site.url}/#website` },
          mainEntity: { "@type": "ItemList", itemListElement: cards(d).map((c, i) => ({
            "@type": "ListItem", position: i + 1, name: c.name, url: `${d.site.url}${c.url}` })) } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: "Use cases", item: `${d.site.url}/use-cases/` } ] },
      ],
    }),
  },
};
