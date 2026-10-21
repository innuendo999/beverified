// /regions/ hub. Markets come from home.yml → regions; counts from rankings.yml; links from categories.
const AREAS = ["Europe", "North America", "Latin America", "Asia-Pacific", "Middle East & Africa"];
const markets = (d) => (d.home?.regions || []).map((r) => {
  const list = r.slug ? d.rankings?.[r.slug]?.providers || [] : [];
  const cat = r.slug ? Object.values(d.categories || {}).find((c) => c.slug === r.slug) : null;
  return { ...r, url: r.slug ? (cat?.url || `/providers/${r.slug}/`) : null, count: list.length,
    top: list.slice(0, 3).map((x) => x.name) };
});
export default {
  permalink: "/regions/",
  navCurrent: "regions",
  seoTitle: "KYC & AML Providers by Country | BeVerified",
  seoDescription: "Country rankings of KYC and AML providers, compared on local ID documents, registries and regulators. Brazil, Canada, India, Mexico, Peru and South Africa.",
  eleventyComputed: {
    guides: (d) => markets(d).filter((m) => m.url),
    areas: (d) => AREAS.map((a) => ({ name: a, items: markets(d).filter((m) => m.area === a) })).filter((a) => a.items.length),
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${d.site.url}/regions/#webpage`, url: `${d.site.url}/regions/`,
          name: "KYC & AML providers by country", isPartOf: { "@id": `${d.site.url}/#website` },
          mainEntity: { "@type": "ItemList", itemListElement: markets(d).filter((m) => m.url).map((c, i) => ({
            "@type": "ListItem", position: i + 1, name: c.name, url: `${d.site.url}${c.url}` })) } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: "Regions", item: `${d.site.url}/regions/` } ] },
      ],
    }),
  },
};
