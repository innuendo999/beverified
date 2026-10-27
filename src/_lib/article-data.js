// Shared directory data for article sections (src/guide, src/news, src/publications).
const iso = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : undefined);
export const articleData = (section) => ({
  layout: "article.njk",
  section,
  author: "andrii-klymenko",
  ogType: "article",
  navCurrent: "blog",
  permalink: (d) => `/${section}/${d.page.fileSlug}/`,
  eleventyComputed: {
    au: (d) => d.authors?.[d.author] || null,
    mentioned: (d) => (d.provider_slugs || []).map((s) => d.allProviders?.[s]).filter(Boolean),
    rankingsFor: (d) => (d.ranking_keys || []).map((k) => ({ c: d.allCategories?.[k], n: d.rankings?.[k]?.providers?.length || 0 })).filter((x) => x.c),
    jsonld: (d) => {
      const url = `${d.site.url}/${section}/${d.page.fileSlug}/`;
      const au = d.authors?.[d.author];
      const graph = [
        {
          "@type": section === "news" ? "NewsArticle" : "Article", "@id": `${url}#article`, mainEntityOfPage: url,
          headline: d.title, description: d.seoDescription,
          ...(d.published ? { datePublished: iso(d.published) } : {}),
          ...(d.updated ? { dateModified: iso(d.updated) } : {}),
          ...(au ? { author: au.type === "Organization"
            ? { "@type": "Organization", name: au.name, ...(au.review ? { url: `${d.site.url}${au.review}` } : {}) }
            : { "@type": "Person", "@id": `${d.site.url}${au.url}#person`, name: au.name, url: `${d.site.url}${au.url}` } } : {}),
          publisher: { "@id": `${d.site.url}/#organization` },
          ...(d.topics?.length ? { keywords: d.topics.join(", ") } : {}),
          ...(d.provider_slugs?.length ? { mentions: d.provider_slugs.map((s) => ({ "@id": `${d.site.url}/providers/${s}/#software` })) } : {}),
          ...((d.sources || []).length ? { citation: d.sources.map((s) => s.url) } : {}),
        },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${d.site.url}/blog/` },
          { "@type": "ListItem", position: 3, name: { guide: "Guides", news: "News", publications: "Research" }[section], item: `${d.site.url}/category/${section}/` },
          { "@type": "ListItem", position: 4, name: d.title, item: url } ] },
      ];
      if (d.faq?.length) graph.push({ "@type": "FAQPage", mainEntity: d.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
      return { "@context": "https://schema.org", "@graph": graph };
    },
  },
});
