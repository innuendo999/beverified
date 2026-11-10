// Computed data for the homepage (src/index.njk). Content: src/_data/home.yml.
export default {
  permalink: "/",
  eleventyComputed: {
    seoTitle: (d) => d.home.seo.title,
    seoDescription: (d) => d.home.seo.description,
    picks: (d) => d.home.quick_picks.map((q) => ({ ...q, p: d.providers[q.slug] })).filter((q) => q.p),
    strip: (d) => d.home.logo_strip.map((s) => d.providers[s]).filter((p) => p && p.logo.wordmark),
    topRated: (d) => Object.values(d.providers).filter((p) => p.score != null && p.methodology === d.site.v3.methodologyVersion)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, d.home.top_rated_count),
    useCases: (d) => d.home.use_cases.map((u) => {
      const list = d.rankings[u.slug]?.providers || [];
      const cat = Object.values(d.categories).find((c) => c.slug === u.slug);
      return { ...u, url: cat?.url || `/providers/${u.slug}/`, count: list.length, top: list.slice(0, 3).map((r) => r.name) };
    }),
    // Homepage pixel map: regions with a ranking, pin position from lon/lat on the grid built by
    // scripts/region-map.mjs, top 3 from rankings.yml (minus site.v3.promoHide), logos from the records.
    regionMap: (d) => {
      const g = d.regionGrid, hide = d.site.v3.promoHide || [];
      if (!g) return [];
      return g.regions.map((slug, i) => {
        const r = d.home.regions.find((x) => x.slug === slug), cat = d.allCategories?.[slug];
        if (!r || !cat) return null;
        const top = (d.rankings[slug]?.providers || []).filter((x) => x.slug && !hide.includes(x.slug) && d.providers[x.slug])
          .slice(0, 3).map((x) => { const p = d.providers[x.slug], t = d.logoTiles?.[x.slug] || {};
            return { name: p.name, logo: p.logo?.src || null, wordmark: p.logo?.wordmark || null, bg: t.bg || "#FFFFFF", fit: t.fit || "contain" }; });
        const x = ((r.lon + 180) / 360) * 100, y = ((g.top - r.lat) / (g.top - g.bottom)) * 100;
        return { code: String(i + 1), slug, name: r.name, reg: r.reg, url: cat.url, top,
          x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, flip: x > 60 };
      }).filter(Boolean);
    },
    faqs: (d) => {
      const top = Object.values(d.providers).filter((p) => p.score != null && p.methodology === d.site.v3.methodologyVersion).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
      const kyb = d.rankings?.kyb?.providers || [];
      if (top.length < 3 || kyb.length < 3) return d.home.faq.filter((f) => !f.a.startsWith("{"));
      const fill = {
        "{top}": `On our editorial scores, ${top[0].name} leads at ${top[0].score.toFixed(1)} out of 5, followed by ${top[1].name} at ${top[1].score.toFixed(1)} and ${top[2].name} at ${top[2].score.toFixed(1)}. These scores come from our weighted rubric (fraud defense or screening quality, pricing and total cost, coverage, platform breadth, integration and track record), not from a satisfaction survey.`,
        "{kyb}": `In our KYB ranking, ${kyb[0]?.name} ranks first, with ${kyb[1]?.name} and ${kyb[2]?.name} next. We compared ${kyb.length} KYB providers.`,
      };
      return d.home.faq.map((f) => ({ q: f.q, a: fill[f.a] || f.a }));
    },
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${d.site.url}/#organization`, name: "BeVerified", url: `${d.site.url}/`,
          email: "support@beverified.org", publishingPrinciples: `${d.site.url}/methodology/`,
          foundingDate: "2021",
          sameAs: (d.site.profiles || []).map((x) => x.url) },
        { "@type": "WebSite", "@id": `${d.site.url}/#website`, url: `${d.site.url}/`, name: "BeVerified",
          publisher: { "@id": `${d.site.url}/#organization` } },
      ],
    }),
  },
};
