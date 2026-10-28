export default {
  eleventyComputed: {
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "AboutPage", "@id": `${d.site.url}/about/#webpage`, url: `${d.site.url}/about/`, name: "About BeVerified",
          isPartOf: { "@id": `${d.site.url}/#website` }, mainEntity: { "@id": `${d.site.url}/#organization` } },
        { "@type": "Organization", "@id": `${d.site.url}/#organization`, name: "BeVerified", url: `${d.site.url}/`,
          foundingDate: "2021", email: "support@beverified.org", publishingPrinciples: `${d.site.url}/methodology/`,
          sameAs: (d.site.profiles || []).map((x) => x.url) },
      ],
    }),
  },
};
