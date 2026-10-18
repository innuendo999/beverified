// Author pages: one per entry in src/_data/authors.yml that has a url. Reviews list = providers with author == key.
export default {
  pagination: { data: "authorList", size: 1, alias: "who", addAllPagesToCollections: true },
  permalink: (d) => d.who.url,
  eleventyComputed: {
    seoTitle: (d) => `${d.who.name}, ${d.who.role} | BeVerified`,
    seoDescription: (d) => d.who.bio,
    written: (d) => Object.values(d.providers || {}).filter((p) => p && p.author === d.who.key)
      .sort((a, b) => (b.score ?? -1) - (a.score ?? -1) || a.name.localeCompare(b.name)),
    jsonld: (d) => {
      const url = `${d.site.url}${d.who.url}`;
      return {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ProfilePage", "@id": `${url}#webpage`, url, name: d.who.name,
            isPartOf: { "@id": `${d.site.url}/#website` }, mainEntity: { "@id": `${url}#person` } },
          { "@type": "Person", "@id": `${url}#person`, name: d.who.name, jobTitle: d.who.role, description: d.who.bio,
            url, ...(d.who.photo ? { image: `${d.site.url}${d.who.photo}` } : {}),
            ...(d.who.linkedin ? { sameAs: [d.who.linkedin] } : {}),
            ...(d.who.expertise?.length ? { knowsAbout: d.who.expertise } : {}),
            worksFor: { "@id": `${d.site.url}/#organization` } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
            { "@type": "ListItem", position: 2, name: d.who.name, item: url } ] },
        ],
      };
    },
  },
};
