// Computed data for provider review pages (src/reviews.njk).
// Everything comes from src/_data/providers/<slug>.yml; nothing is typed here.
import { buildMatrix } from "./_lib/capabilities.js";
import { organization, offerFor } from "./_lib/schema.js";
import { termForCapability } from "./_lib/glossary.js";
import { buildSidebar, companyFacts } from "./_lib/sidebar.js";
import { reviewSponsor, shortLabel } from "./_lib/placements.js";
import { profileFor, heroFacts, networkRows, factRows, certRows, incidentRow, fitRows, questions, sourceGroups, reviewYear, pricingCalc, productJobs } from "./_lib/review-v4.js";
import { fitCheckData, deployHero } from "./_lib/fit-check.js";
import { isListed as inCertTracker } from "./_lib/cert-tracker.js";
import { productGroups, keyFacts, bestEvidence, awardsFor, fitBlock, costAtVolume, keySources } from "./_lib/review-v6.js";
import { currentAwards } from "./_lib/awards.js";
import { guilloche } from "./_lib/hero.js";

let awardList = null; // computed once per build
const awardsAll = () => (awardList ??= currentAwards().out);

export default {
  pagination: { data: "providers", size: 1, alias: "p", resolve: "values", addAllPagesToCollections: true },
  permalink: (data) => `/providers/${data.p.slug}/`,
  navCurrent: "reviews",
  ogType: "article",
  eleventyComputed: {
    // Review is listed in the KYC Certification Tracker (same rule as the page): its certifications block links to its row.
    certTrackerRow: (d) => (d.p && d.p.status === "published" && (d.p.certifications || []).length && inCertTracker(d.p) ? `/kyc-certification-tracker/#${d.p.slug}` : null),
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
      return buildMatrix(cols, [d.p, ...alts], termForCapability(d.glossaryTerms), d.logoTiles);
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
      const button = p.link?.button || (["affiliate", "paid"].includes(p.link?.type) ? "primary" : "quiet");
      // V5 (owner, 2026-11-11): Deployment replaces Founded in the hero where the profile has a fit check
      const dep = prof.fit_check ? deployHero(p, d.travelRuleFit) : null;
      let hero = heroFacts(p);
      if (prof.fit_check) {
        hero = hero.filter((f) => f.label !== "Founded");
        if (dep) hero.splice(hero.findIndex((f) => f.label === "Price") + 1, 0, dep);
      }
      // Alternatives only from the profile's ranking (V5): a provider outside it would show another category's score
      const sameRanking = prof.alts_same_ranking ? new Set((d.rankings?.[prof.alts_same_ranking]?.providers || []).map((x) => x.slug)) : null;
      const alts = (p.choose_instead || []).filter((a) => a.slug && d.providers[a.slug] && (!sameRanking || sameRanking.has(a.slug)))
        .map((a) => ({ text: a.text, need: a.need || null, q: d.providers[a.slug] }));
      const lv = String(p.last_verified || "").slice(0, 7), pv = String(p.pricing?.verified || "").slice(0, 7);
      return {
        profile: prof,
        year: reviewYear(p),
        hero,
        alts,
        fitCheck: prof.fit_check ? fitCheckData(d.providers, d.rankings, d.travelRuleFit) : null,
        selfHosted: !!dep?.selfHosted,
        calc: pricingCalc(p),
        jobs: productJobs(p),
        pricingRechecked: pv && lv && pv > lv ? p.pricing.verified : null,
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
    // Review page V6 (owner, 2026-11-27): every profile without v4. Template src/_includes/v3/review-v6.njk.
    v6: (d) => {
      const p = d.p;
      if (profileFor(p, d.reviewProfiles)?.v4) return null;
      const ctx = { rankings: d.rankings, providers: d.providers, categories: d.categories, menu: d.site.v3.menu };
      const alts = (p.choose_instead || []).filter((a) => a.slug && d.providers[a.slug])
        .map((a) => ({ text: a.text, need: a.need || null, q: d.providers[a.slug] }));
      const official = (p.pricing?.items || []).filter((i) => i.kind !== "third_party");
      return {
        year: reviewYear(p),
        g: guilloche(),
        facts: keyFacts(p),
        evidence: bestEvidence(p),
        awards: awardsFor(p, awardsAll(), d.rankings),
        fit: fitBlock(p, d.rankings, d.categories, d.providers),
        alts,
        sponsor: reviewSponsor(d.placements, ctx, p.slug),
        plans: p.pricing?.plans || [],
        official,
        estimates: (p.pricing?.items || []).filter((i) => i.kind === "third_party"),
        cost: costAtVolume(p),
        groups: productGroups(p),
        notDisclosed: productGroups(p).flatMap((g) => g.unknown),
        confirmed: (p.certifications || []).filter((c) => c.status === "confirmed"),
        claimed: (p.certifications || []).filter((c) => c.status === "vendor_stated"),
        incidents: (d.incidents?.items || []).filter((x) => x.slug === p.slug).sort((a, b) => b.date.localeCompare(a.date)),
        company: companyFacts(p).filter((f) => !["Founded", "HQ", "Headquarters", "Regions", "Coverage"].includes(f.label)),
        ownership: p.track_record?.ownership?.note || null,
        legal: String(p.what_is?.[0] || "").match(/legal name ([^)]+)\)/)?.[1] || null,
        sources: keySources(p),
        shots: (p.screenshots || []).map((s, i) => ({ ...s, i })),
        nav: [
          ["fit", "Who it’s for", true],
          ["pricing", "Pricing", true],
          ["alternatives", "Alternatives", alts.length > 0],
          ["in-use", "In use", (p.screenshots || []).length > 0 || !!p.video],
          ["product", "What it does", true],
          ["trust", "Trust record", true],
          ["awards", "Awards", awardsAll().some((x) => x.slug === p.slug)],
          ["faq", "FAQ", (p.faq || []).length > 0],
        ].filter((n) => n[2]),
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
          // Google accepts only its app types here; the record's own label goes to applicationSubCategory.
          applicationCategory: "BusinessApplication",
          ...(p.application_category ? { applicationSubCategory: p.application_category } : {}),
          ...(offerFor(p) ? { offers: offerFor(p) } : {}),
          operatingSystem: "Web",
          ...(p.entity?.same_as?.length ? { sameAs: p.entity.same_as } : {}),
          ...(p.screenshots?.length ? { screenshot: p.screenshots.map((x) => ({ "@type": "ImageObject", url: `${d.site.url}${x.file}`, caption: x.long || x.caption, width: x.width, height: x.height })) } : {}),
          ...(p.score != null ? {
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: p.score, bestRating: 5, worstRating: 1 },
              author: author ? { "@type": "Person", name: author.name, ...(author.url ? { url: d.site.url + author.url } : {}) }
                             : { "@type": "Organization", name: "BeVerified" },
              publisher: organization(d.site),
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
