// Glossary term pages /glossary/<slug>/. Content: src/_data/glossary/<slug>.yml, spec docs/glossary-spec.md.
// The "Providers that offer it" table is built from provider records (capabilities{}, certifications[]), never typed.
import { providersFor, renderMd, CLUSTERS } from "../_lib/glossary.js";

const iso = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : undefined);

export default {
  pagination: { data: "glossaryTerms", size: 1, alias: "t", addAllPagesToCollections: true },
  permalink: (d) => d.t.url,
  layout: "v3.njk",
  navCurrent: "glossary",
  ogType: "article",
  eleventyComputed: {
    seoTitle: (d) => d.t.seo_title || `What Is ${d.t.abbr ? `${d.t.abbr} (${d.t.term})` : d.t.term}? | BeVerified`,
    seoDescription: (d) => d.t.seo_description || d.t.definition,
    updated: (d) => iso(d.t.updated),
    au: (d) => d.authors?.[d.t.author || "andrii-klymenko"] || null,
    // "What is liveness detection?" but "What is Know Your Customer?": lower-case only plain common nouns.
    question: (d) => {
      const t = d.t, name = t.abbr || t.term;
      const plain = !t.abbr && t.term.split(/\s+/).slice(1).every((w) => w === w.toLowerCase()) && !/^[A-Z]{2}/.test(t.term);
      return `What is ${plain ? name.charAt(0).toLowerCase() + name.slice(1) : name}?`;
    },
    cluster: (d) => CLUSTERS.find((c) => c.key === d.t.cluster) || null,
    bodyHtml: (d) => renderMd(d.t.body),
    offer: (d) => providersFor(d.t.capability, d.allProviders),
    rankingsFor: (d) => (d.t.rankings || []).map((k) => ({ c: d.allCategories?.[k], n: d.rankings?.[k]?.providers?.length || 0 })).filter((x) => x.c),
    relatedTerms: (d) => (d.t.related || []).map((s) => d.glossaryTerms.find((x) => x.slug === s)).filter(Boolean),
    sameCluster: (d) => d.glossaryTerms.filter((x) => x.cluster === d.t.cluster && x.slug !== d.t.slug && !(d.t.related || []).includes(x.slug)),
    jsonld: (d) => {
      const t = d.t, url = `${d.site.url}${t.url}`, au = d.authors?.[t.author || "andrii-klymenko"];
      const graph = [
        { "@type": "DefinedTerm", "@id": `${url}#term`, name: t.abbr ? `${t.term} (${t.abbr})` : t.term,
          ...(t.also_known_as?.length || t.abbr ? { alternateName: [t.abbr, ...(t.also_known_as || [])].filter(Boolean) } : {}),
          description: t.definition, url, inDefinedTermSet: { "@id": `${d.site.url}/glossary/#termset` } },
        { "@type": "WebPage", "@id": `${url}#webpage`, url, name: d.question, inLanguage: "en",
          ...(t.published ? { datePublished: iso(t.published) } : {}), ...(t.updated ? { dateModified: iso(t.updated) } : {}),
          ...(au ? { author: { "@type": "Person", "@id": `${d.site.url}${au.url}#person`, name: au.name, url: `${d.site.url}${au.url}` } } : {}),
          publisher: { "@id": `${d.site.url}/#organization` }, isPartOf: { "@id": `${d.site.url}/#website` },
          mainEntity: { "@id": `${url}#term` },
          ...((t.sources || []).length ? { citation: t.sources.map((s) => s.url) } : {}) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${d.site.url}/glossary/` },
          { "@type": "ListItem", position: 3, name: t.term, item: url } ] },
      ];
      if (t.faq?.length) graph.push({ "@type": "FAQPage", mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
      return { "@context": "https://schema.org", "@graph": graph };
    },
  },
};
