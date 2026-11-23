import { organization } from "../_lib/schema.js";
export default {
  eleventyComputed: {
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "AboutPage", "@id": `${d.site.url}/about/#webpage`, url: `${d.site.url}/about/`, name: "About BeVerified",
          isPartOf: { "@id": `${d.site.url}/#website` }, mainEntity: { "@id": `${d.site.url}/#organization` } },
        { ...organization(d.site),
          description: d.entity.long, foundingDate: "2021", email: "support@beverified.org", publishingPrinciples: `${d.site.url}/methodology/`,
          ownershipFundingInfo: `${d.site.url}/methodology/#disclosure`,
          sameAs: (d.site.profiles || []).map((x) => x.url) },
      ],
    }),
  },
};
