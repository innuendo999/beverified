// Computed data for category and region ranking pages (src/categories.njk).
// Content: src/_data/categories/<slug>.yml; order and cards: src/_data/rankings.yml;
// scores, logos and links always come from the provider records.
import { buildMatrix } from "./_lib/capabilities.js";
import { termForCapability } from "./_lib/glossary.js";

export default {
  pagination: { data: "categories", size: 1, alias: "c", resolve: "values", addAllPagesToCollections: true },
  permalink: (data) => data.c.url,
  eleventyComputed: {
    navCurrent: (d) => (["brazil", "canada", "india", "mexico", "peru", "south-africa", "uk"].includes(d.c.slug) ? "regions" : "use-cases"),
    seoTitle: (d) => d.c.seo?.title,
    seoDescription: (d) => d.c.seo?.description,
    updated: (d) => [d.c.updated, d.c.last_verified].filter(Boolean).sort().pop(),
    author: (d) => d.authors?.[d.c.author] || null,
    // Starting price. With price_source: record in the category file, the price comes from the provider
    // record (pricing.items[] entry named by the ranking's price_item, else facts[] "From"), dated by
    // pricing.verified, so the table, the card and the review show the same figure. Other categories
    // still show legacy_price_shown until they are switched over one by one.
    entries: (d) => (d.rankings[d.c.slug]?.providers || []).map((r, i) => {
      const q = r.slug ? d.providers[r.slug] || null : null;
      let price = r.legacy_price_shown || null, priceVerified = null;
      if (d.c.price_source === "record" && q) {
        const item = r.price_item ? (q.pricing?.items || []).find((x) => x.label === r.price_item) : null;
        if (r.price_item && !item) throw new Error(`${d.c.slug}: price_item "${r.price_item}" not found in ${q.slug}`);
        const from = item ? item.value : (q.facts || []).find((x) => x.label === "From")?.value;
        const ym = String(item?.verified || q.pricing?.verified || "").slice(0, 7);
        if (from) {
          price = from;
          priceVerified = ym ? new Date(`${ym}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : null;
        }
      }
      // Score shown and ranked on: the overall score, or with score_source: category the provider's
      // score for this category (category_scores.<slug>, written by the category's scorer).
      let score = q ? q.score ?? null : null;
      if (d.c.score_source === "category" && q) {
        score = q.category_scores?.[d.c.slug]?.score ?? null;
        if (score == null) throw new Error(`${d.c.slug}: ${q.slug} has no category_scores.${d.c.slug}`);
      }
      return { rank: i + 1, r, q, price, priceVerified, score };
    }),
    // Capability matrix: columns from the category file, cells from each ranked provider's capabilities{}
    // and, for certificate columns, from its certifications[].
    matrix: (d) => buildMatrix(
      d.c.capability_columns,
      (d.rankings[d.c.slug]?.providers || []).map((r) => (r.slug ? d.providers[r.slug] : null)),
      termForCapability(d.glossaryTerms),
    ),
    // "Best for" by industry or use case: category file c.segments = [{segment, slug, reason}].
    segmentPicks: (d) => (d.c.segments || [])
      .map((x) => ({ segment: x.segment, reason: x.reason, q: x.slug ? d.providers[x.slug] : null }))
      .filter((x) => x.segment && x.q),
    related: (d) => (d.c.adjacent || []).map((slug) => {
      const cat = Object.values(d.categories).find((x) => x.slug === slug);
      return cat ? { slug, url: cat.url, name: cat.breadcrumb_label, count: (d.rankings[slug]?.providers || []).length } : null;
    }).filter(Boolean),
    jsonld: (d) => {
      const c = d.c, url = d.site.url + c.url;
      const list = d.rankings[c.slug]?.providers || [];
      const graph = [
        { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: c.seo?.h1,
          ...(c.updated || c.last_verified ? { dateModified: [c.updated, c.last_verified].filter(Boolean).sort().pop() } : {}) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: c.breadcrumb_label, item: url },
        ] },
        { "@type": "ItemList", name: c.seo?.h1, itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: list.length,
          itemListElement: list.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name,
            ...(r.slug && d.providers[r.slug] ? { url: `${d.site.url}/providers/${r.slug}/` } : {}) })) },
      ];
      if (c.faq?.length) graph.push({ "@type": "FAQPage", mainEntity: c.faq.map((f) => ({
        "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
      return { "@context": "https://schema.org", "@graph": graph };
    },
  },
};
