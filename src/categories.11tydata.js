// Computed data for category and region ranking pages (src/categories.njk).
// Content: src/_data/categories/<slug>.yml; order and cards: src/_data/rankings.yml;
// scores, logos and links always come from the provider records.
import { buildMatrix } from "./_lib/capabilities.js";
import { termForCapability } from "./_lib/glossary.js";
import { calcProvider } from "./_lib/budget.js";
import { v2Evidence } from "./_lib/ranking-evidence.js";
import { rankingSponsor } from "./_lib/placements.js";
import { amlGrid } from "./_lib/aml-grid.js";

export default {
  pagination: { data: "categories", size: 1, alias: "c", resolve: "values", addAllPagesToCollections: true },
  permalink: (data) => data.c.url,
  eleventyComputed: {
    navCurrent: (d) => (["australia", "brazil", "canada", "eu", "india", "mexico", "nigeria", "peru", "south-africa", "uk"].includes(d.c.slug) ? "regions" : "use-cases"),
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
      // Budget KYC: cost per check at 100 and 1,000 a month, from the generated category score block.
      const cs = d.c.budget_calc && q ? q.category_scores?.[d.c.slug] : null;
      const costS = cs?.cost_s ?? null, costM = cs?.cost_m ?? null;
      // Layout v2 (category file layout: v2): evidence for the top 3 table and the chips on each list row.
      // Price chip shows the listed text as it is ("From" is already part of it where it applies).
      const v2 = d.c.layout === "v2" && q ? { ...v2Evidence(d.c, q, d.travelRuleFit), price: price || null } : null;
      return { rank: i + 1, r, q, price, priceVerified, score, costS, costM, v2 };
    }),
    // Layout v2: month of the oldest price check among the top 3 (pricing.verified), for the top 3 caption.
    top3Checked: (d) => {
      if (d.c.layout !== "v2") return null;
      const ym = (d.rankings[d.c.slug]?.providers || []).slice(0, 3)
        .map((r) => String(d.providers[r.slug]?.pricing?.verified || "").slice(0, 7)).filter((x) => /^\d{4}-\d{2}$/.test(x)).sort()[0];
      return ym ? new Date(`${ym}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : null;
    },
    // Layout v2: the commission disclosure shows only when the list carries an affiliate or paid link (owner, 2026-11-17).
    hasPaidLink: (d) => (d.rankings[d.c.slug]?.providers || []).some((r) => r.site_link && ["affiliate", "paid"].includes(d.providers[r.slug]?.link?.type)),
    // Layout v2: one sponsor slot under the top 3 (placements.yml surface: ranking), with its real rank and the
    // score this page ranks on. Never changes the order of the list.
    rankSponsor: (d) => {
      if (d.c.layout !== "v2") return null;
      const s = rankingSponsor(d.placements, { rankings: d.rankings, providers: d.providers }, d.c.slug);
      if (!s) return null;
      const q = s.provider;
      const score = d.c.score_source === "category" ? q.category_scores?.[d.c.slug]?.score ?? null : q.score;
      return { ...s, score };
    },
    // Cost calculator input (category file budget_calc: true), built from each record's budget{} and pricing.items.
    budgetCalc: (d) => (d.c.budget_calc ? (d.rankings[d.c.slug]?.providers || [])
      .map((r, i) => (r.slug && d.providers[r.slug] ? calcProvider({ slug: r.slug, ...d.providers[r.slug] }, i + 1, r) : null))
      .filter(Boolean) : null),
    // AML ranking: grouped capabilities grid instead of the capability matrix (category file capability_grid: aml).
    capGrid: (d) => (d.c.capability_grid === "aml" ? amlGrid(d.entries, d.logoTiles) : null),
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
