// Computed data for the homepage (src/index.njk). Content: src/_data/home.yml.
export default {
  permalink: "/",
  eleventyComputed: {
    seoTitle: (d) => d.home.seo.title,
    seoDescription: (d) => d.home.seo.description,
    picks: (d) => d.home.quick_picks.map((q) => ({ ...q, p: d.providers[q.slug] })).filter((q) => q.p),
    strip: (d) => d.home.logo_strip.map((s) => d.providers[s]).filter((p) => p && p.logo.wordmark),
    topRated: (d) => Object.values(d.providers).filter((p) => p.score != null)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, d.home.top_rated_count),
    useCases: (d) => d.home.use_cases.map((u) => {
      const list = d.rankings[u.slug]?.providers || [];
      const cat = Object.values(d.categories).find((c) => c.slug === u.slug);
      return { ...u, url: cat?.url || `/providers/${u.slug}/`, count: list.length, top: list.slice(0, 3).map((r) => r.name) };
    }),
    regions: (d) => d.home.regions.map((r) => {
      const list = r.slug ? d.rankings[r.slug]?.providers || [] : [];
      return { ...r, url: r.slug ? `/providers/${r.slug}/` : "/providers/", count: list.length, guide: !!r.slug };
    }),
    faqs: (d) => {
      const top = Object.values(d.providers).filter((p) => p.score != null).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
      const kyb = d.rankings?.kyb?.providers || [];
      if (top.length < 3 || kyb.length < 3) return d.home.faq.filter((f) => !f.a.startsWith("{"));
      const fill = {
        "{top}": `On our editorial scores, ${top[0].name} leads at ${top[0].score.toFixed(1)} out of 5, followed by ${top[1].name} at ${top[1].score.toFixed(1)} and ${top[2].name} at ${top[2].score.toFixed(1)}. These scores come from our weighted rubric (compliance, coverage, pricing transparency, integration, support and track record), not from a satisfaction survey.`,
        "{kyb}": `In our KYB ranking, ${kyb[0]?.name} ranks first, with ${kyb[1]?.name} and ${kyb[2]?.name} next. We compared ${kyb.length} KYB providers.`,
      };
      return d.home.faq.map((f) => ({ q: f.q, a: fill[f.a] || f.a }));
    },
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${d.site.url}/#organization`, name: "BeVerified", url: `${d.site.url}/`,
          email: "support@beverified.org", publishingPrinciples: `${d.site.url}/methodology/` },
        { "@type": "WebSite", "@id": `${d.site.url}/#website`, url: `${d.site.url}/`, name: "BeVerified",
          publisher: { "@id": `${d.site.url}/#organization` } },
      ],
    }),
  },
};
