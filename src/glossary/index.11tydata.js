// Glossary hub /glossary/: every term as a plain HTML link, grouped by cluster and A to Z.
import { CLUSTERS } from "../_lib/glossary.js";

export default {
  layout: "v3.njk",
  permalink: "/glossary/",
  navCurrent: "glossary",
  seoTitle: "KYC, AML & Identity Verification Glossary | BeVerified",
  seoDescription: "Plain definitions of KYC, KYB, AML, identity verification, age assurance and Travel Rule terms, with the rules behind them and the providers that offer each feature.",
  eleventyComputed: {
    updated: (d) => d.glossaryTerms.map((t) => (t.updated instanceof Date ? t.updated.toISOString().slice(0, 10) : String(t.updated || ""))).sort().pop(),
    groups: (d) => CLUSTERS.map((c) => ({ ...c, terms: d.glossaryTerms.filter((t) => t.cluster === c.key) })).filter((g) => g.terms.length),
    letters: (d) => [...new Set(d.glossaryTerms.map((t) => t.term[0].toUpperCase()))],
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "DefinedTermSet", "@id": `${d.site.url}/glossary/#termset`, name: "BeVerified KYC, AML and identity verification glossary",
          url: `${d.site.url}/glossary/`, inLanguage: "en", publisher: { "@id": `${d.site.url}/#organization` },
          hasDefinedTerm: d.glossaryTerms.map((t) => ({ "@type": "DefinedTerm", "@id": `${d.site.url}${t.url}#term`, name: t.term, url: `${d.site.url}${t.url}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${d.site.url}/glossary/` } ] },
      ],
    }),
  },
};
