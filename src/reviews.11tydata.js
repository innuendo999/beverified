// Computed data for provider review pages (src/reviews.njk).
// Everything comes from src/_data/providers/<slug>.yml; nothing is typed here.
import { buildMatrix } from "./_lib/capabilities.js";
import { termForCapability } from "./_lib/glossary.js";
import { buildSidebar, companyFacts } from "./_lib/sidebar.js";
import { reviewSponsor, liveSponsors, shortLabel } from "./_lib/placements.js";
import { profileFor, heroFacts, networkRows, factRows, certRows, incidentRow, fitRows, questions, sourceGroups, reviewYear } from "./_lib/review-v4.js";

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
      .map((a) => ({ text: a.text, need: a.need || null, q: d.providers[a.slug] })),
    // "Alternatives compared": this provider plus its choose_instead alternatives, same matrix as category pages.
    // Columns: p.alternatives_columns (capability, certificate or extra keys, see src/_lib/capabilities.js).
    altMatrix: (d) => {
      const cols = d.p.alternatives_columns;
      if (!cols?.length) return null;
      const alts = (d.p.choose_instead || []).filter((a) => a.slug && d.providers[a.slug]).map((a) => d.providers[a.slug]);
      if (!alts.length) return null;
      return buildMatrix(cols, [d.p, ...alts], termForCapability(d.glossaryTerms));
    },
    // Sidebar rows and the "Company facts" section (src/_lib/sidebar.js)
    side: (d) => buildSidebar(d.p, d.incidents?.items, (d.p.choose_instead || [])
      .filter((a) => a.slug && d.providers[a.slug]).map((a) => ({ q: d.providers[a.slug] }))),
    company: (d) => companyFacts(d.p),
    pricingOfficial: (d) => (d.p.pricing?.items || []).filter((i) => i.kind !== "third_party"),
    pricingEstimates: (d) => (d.p.pricing?.items || []).filter((i) => i.kind === "third_party"),
    incidentList: (d) => (d.incidents?.items || []).filter((x) => x.slug === d.p.slug).sort((a, b) => b.date.localeCompare(a.date)),
    // Review page V4 (owner, 2026-11-10): on for profiles with v4: true in reviewProfiles.yml.
    v4: (d) => {
      const p = d.p;
      const prof = profileFor(p, d.reviewProfiles);
      if (!prof?.v4) return null;
      const nets = networkRows(p);
      const ctx = { rankings: d.rankings, providers: d.providers, categories: d.categories, menu: d.site.v3.menu };
      const sponsor = reviewSponsor(d.placements, ctx, p.slug);
      const isSponsor = liveSponsors(d.placements, ctx).includes(p.slug);
      const button = p.link?.button || (["affiliate", "paid"].includes(p.link?.type) ? "primary" : "quiet");
      return {
        profile: prof,
        year: reviewYear(p),
        hero: heroFacts(p),
        fit: fitRows(p, d.providers),
        networks: nets,
        networkFacts: factRows(p, prof.network_facts),
        integration: factRows(p, prof.integration_facts),
        company: factRows(p, prof.company_facts),
        certs: certRows(p, prof.certs_expected),
        incident: incidentRow(p, d.incidents?.items),
        questions: questions(p, nets),
        sources: sourceGroups(p, d.providers),
        sponsor,
        sponsorNote: isSponsor ? d.site.v3.sponsorNote.replace("{name}", p.name) : null,
        button,
        // "#1 in Travel Rule": best position, with the short ranking name from the header menu
        rank: Object.entries(d.rankings || {}).map(([k, r]) => ({ k, pos: (r.providers || []).findIndex((x) => x.slug === p.slug) + 1 }))
          .filter((x) => x.pos > 0).sort((a, b) => a.pos - b.pos).slice(0, 1).map((x) => {
            const c = Object.values(d.categories || {}).find((c) => c.slug === x.k) || {};
            return { pos: x.pos, label: shortLabel(d.site.v3.menu, x.k) || c.breadcrumb_label || d.rankings[x.k].title, url: c.url || `/providers/${x.k}/` };
          })[0] || null,
        pricingOfficial: (p.pricing?.items || []).filter((i) => i.kind !== "third_party"),
        pricingEstimates: (p.pricing?.items || []).filter((i) => i.kind === "third_party"),
      };
    },
    navItems: (d) => {
      const p = d.p, has = (x) => Array.isArray(x) ? x.length > 0 : !!x;
      const alts = (p.choose_instead || []).filter((a) => a.slug && d.providers[a.slug]);
      return [
        ["what-is", "Overview", true],
        ["score", "Score", has(p.score_breakdown)],
        ["use-cases", "Use cases", has(p.use_case_verdicts)],
        ["pricing", "Pricing", true],
        ["certifications", "Certifications", has(p.certifications)],
        ["incidents", "Incidents", (d.incidents?.items || []).some((x) => x.slug === p.slug)],
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
          ...(p.screenshots?.length ? { screenshot: p.screenshots.map((x) => ({ "@type": "ImageObject", url: `${d.site.url}${x.file}`, caption: x.long || x.caption, width: x.width, height: x.height })) } : {}),
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
