// Computed data for the homepage (src/index.njk). Content: src/_data/home.yml.
import { activePlacements, heroPlacement } from "./_lib/placements.js";
import { organization } from "./_lib/schema.js";
import { heroCard, heroCounts, guilloche } from "./_lib/hero.js";

export default {
  permalink: "/",
  eleventyComputed: {
    seoTitle: (d) => d.home.seo.title,
    seoDescription: (d) => d.home.seo.description,
    // First screen (owner, 2026-11-16): top of one ranking with each provider's confirmed independent
    // checks, review counts per group, and an optional sponsor row. Builders: src/_lib/hero.js.
    hero: (d) => heroCard(d, heroPlacement(d.placements, { rankings: d.rankings, providers: d.providers, hero: d.home.hero })),
    heroCounts: (d) => heroCounts(d),
    guilloche: () => guilloche(),
    topRated: (d) => Object.values(d.providers).filter((p) => p.score != null && p.methodology === d.site.v3.methodologyVersion)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, d.home.top_rated_count),
    // "Pick by use case" (layout A, owner 2026-11-10): use cases grouped in the order of
    // home.yml → use_case_groups; each panel shows the ranking's top 3 in rank order (award, score,
    // logo tile from the record) and, when placements.yml has a live slot, one Sponsored row.
    useCaseGroups: (d) => {
      const tiles = d.logoTiles || {};
      const tile = (slug) => { const p = d.providers[slug], t = tiles[slug] || {};
        return { logo: p?.logo?.src || null, wordmark: p?.logo?.wordmark || null, bg: t.bg || "#FFFFFF", fit: t.fit || "contain" }; };
      const live = activePlacements(d.placements, { rankings: d.rankings, providers: d.providers, useCases: d.home.use_cases });
      const items = d.home.use_cases.map((u) => {
        const list = d.rankings[u.slug]?.providers || [];
        const cat = Object.values(d.categories).find((c) => c.slug === u.slug);
        // Categories with their own rubric (score_source: category) show that category's score.
        const sc = (p) => (cat?.score_source === "category" ? p?.category_scores?.[u.slug]?.score : p?.score) ?? null;
        const top = list.slice(0, 3).map((r, i) => { const p = r.slug ? d.providers[r.slug] : null;
          return { rank: i + 1, name: p?.name || r.name, url: p ? `/providers/${r.slug}/` : null, award: r.award || "",
            score: sc(p), ...tile(r.slug) }; });
        const s = live[u.slug];
        const sponsor = s ? { name: s.provider.name, url: `/providers/${s.slug}/`, rank: s.rank, score: sc(s.provider),
          line: s.entry.tagline || s.provider.tagline || "", ...tile(s.slug) } : null;
        return { ...u, id: u.slug.replace(/\//g, "-"), url: cat?.url || `/providers/${u.slug}/`, scoreLabel: cat?.score_label || "Score", top, sponsor };
      });
      const order = d.home.use_case_groups || [...new Set(items.map((u) => u.group))];
      return order.map((g) => ({ name: g, items: items.filter((u) => u.group === g) })).filter((g) => g.items.length);
    },
    // Homepage pixel map: regions with a ranking, pin position from lon/lat on the grid built by
    // scripts/region-map.mjs, top 3 from rankings.yml (minus site.v3.promoHide), logos from the records.
    regionMap: (d) => {
      const g = d.regionGrid, hide = d.site.v3.promoHide || [];
      if (!g) return [];
      return g.regions.map((slug, i) => {
        const r = d.home.regions.find((x) => x.slug === slug), cat = d.allCategories?.[slug];
        if (!r || !cat) return null;
        const top = (d.rankings[slug]?.providers || []).filter((x) => x.slug && !hide.includes(x.slug) && d.providers[x.slug])
          .slice(0, 3).map((x) => { const p = d.providers[x.slug], t = d.logoTiles?.[x.slug] || {};
            return { name: p.name, logo: p.logo?.src || null, wordmark: p.logo?.wordmark || null, bg: t.bg || "#FFFFFF", fit: t.fit || "contain" }; });
        const x = ((r.lon + 180) / 360) * 100, y = ((g.top - r.lat) / (g.top - g.bottom)) * 100;
        return { code: g.codes ? g.codes[i] : String(i + 1), slug, name: r.name, reg: r.reg, url: cat.url, top,
          x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, flip: x > 60 };
      }).filter(Boolean);
    },
    faqs: (d) => d.home.faq,
    jsonld: (d) => ({
      "@context": "https://schema.org",
      "@graph": [
        { ...organization(d.site),
          description: d.entity.long, email: "support@beverified.org", publishingPrinciples: `${d.site.url}/methodology/`,
          ownershipFundingInfo: `${d.site.url}/methodology/#disclosure`, foundingDate: "2021",
          sameAs: (d.site.profiles || []).map((x) => x.url) },
        { "@type": "WebSite", "@id": `${d.site.url}/#website`, url: `${d.site.url}/`, name: "BeVerified",
          publisher: { "@id": `${d.site.url}/#organization` } },
      ],
    }),
  },
};
