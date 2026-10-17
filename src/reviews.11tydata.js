// Computed data for provider review pages (src/reviews.njk).
// Everything comes from src/_data/providers/<slug>.yml; nothing is typed here.
export default {
  pagination: { data: "providers", size: 1, alias: "p", resolve: "values", addAllPagesToCollections: true },
  permalink: (data) => `/providers/${data.p.slug}/`,
  navCurrent: "reviews",
  ogType: "article",
  eleventyComputed: {
    seoTitle: (d) => d.p.seo?.title || `${d.p.name} Review | BeVerified`,
    seoDescription: (d) => d.p.seo?.description,
    updated: (d) => [d.p.updated, d.p.last_verified].filter(Boolean).sort().pop(),
    author: (d) => d.authors?.[d.p.author] || null,
    alts: (d) => (d.p.choose_instead || [])
      .filter((a) => a.slug && d.providers[a.slug])
      .map((a) => ({ text: a.text, q: d.providers[a.slug] })),
    pricingOfficial: (d) => (d.p.pricing?.items || []).filter((i) => i.kind !== "third_party"),
    pricingEstimates: (d) => (d.p.pricing?.items || []).filter((i) => i.kind === "third_party"),
    navItems: (d) => {
      const p = d.p, has = (x) => Array.isArray(x) ? x.length > 0 : !!x;
      const alts = (p.choose_instead || []).filter((a) => a.slug && d.providers[a.slug]);
      return [
        ["what-is", "Overview", true],
        ["score", "Score", has(p.score_breakdown)],
        ["use-cases", "Use cases", has(p.use_case_verdicts)],
        ["pricing", "Pricing", true],
        ["certifications", "Certifications", has(p.certifications)],
        ["hands-on", "Hands-on test", has(p.hands_on)],
        ["features", "Features", has(p.features)],
        ["pros-cons", "Pros & cons", true],
        ["user-ratings", "User ratings", has(p.user_ratings) || has(p.user_reviews?.praise)],
        ["alternatives", "Alternatives", alts.length > 0],
        ["faq", "FAQ", has(p.faq)],
        ["sources", "Sources", has(p.sources)],
      ].filter((n) => n[2]);
    },
    jsonld: (d) => {
      const p = d.p;
      const url = `${d.site.url}/providers/${p.slug}/`;
      const author = d.authors?.[p.author];
      const graph = [
        {
          "@type": "WebPage", "@id": `${url}#webpage`, url, name: p.seo?.h1 || p.name,
          about: { "@id": `${url}#software` },
          ...(p.updated || p.last_verified ? { dateModified: [p.updated, p.last_verified].filter(Boolean).sort().pop() } : {}),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
            { "@type": "ListItem", position: 2, name: "Reviews", item: `${d.site.url}/providers/` },
            { "@type": "ListItem", position: 3, name: p.name, item: url },
          ],
        },
        {
          "@type": "SoftwareApplication", "@id": `${url}#software`, name: p.name,
          ...(p.alternate_names?.length ? { alternateName: p.alternate_names } : {}),
          applicationCategory: p.application_category || "BusinessApplication",
          operatingSystem: "Web",
          ...(p.entity?.same_as?.length ? { sameAs: p.entity.same_as } : {}),
          ...(p.score != null ? {
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: p.score, bestRating: 5, worstRating: 1 },
              author: author ? { "@type": "Person", name: author.name, ...(author.url ? { url: d.site.url + author.url } : {}) }
                             : { "@type": "Organization", name: "BeVerified" },
              publisher: { "@type": "Organization", name: "BeVerified", url: `${d.site.url}/` },
              ...(p.last_verified ? { datePublished: p.last_verified } : {}),
              ...(p.pros?.length ? { positiveNotes: { "@type": "ItemList", itemListElement: p.pros.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t })) } } : {}),
              ...(p.cons?.length ? { negativeNotes: { "@type": "ItemList", itemListElement: p.cons.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t })) } } : {}),
            },
          } : {}),
        },
      ];
      if (p.faq?.length) {
        graph.push({
          "@type": "FAQPage",
          mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        });
      }
      return { "@context": "https://schema.org", "@graph": graph };
    },
  },
};
