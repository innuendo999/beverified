// Reviews directory (src/providers.njk): every reviewed provider plus tracked ones without a review yet.
export default {
  permalink: "/providers/",
  navCurrent: "reviews",
  seoTitle: "All KYC & AML Providers A–Z: Reviews and Scores | BeVerified",
  seoDescription: "Every KYC, KYB and AML provider we track, A to Z, with its BeVerified score and what it is best for. Providers we haven't reviewed yet are listed without a score.",
  eleventyComputed: {
    groups: (d) => {
      const rows = [
        ...Object.values(d.providers || {}).filter((p) => p && p.name).map((p) => ({ name: p.name, p, cats: p.directory_categories || [], desc: p.tagline })),
        ...(d.tracked || []).map((t) => ({ name: t.name, p: null, cats: t.categories || [], desc: t.description })),
      ].filter((r) => r && r.name).sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
      const groups = {};
      for (const r of rows) {
        const L = r.name[0].toUpperCase();
        (groups[L] = groups[L] || []).push(r);
      }
      return Object.entries(groups).map(([letter, items]) => ({ letter, items }));
    },
    letters: () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    filters: () => [["", "All"], ["Identity Verification", "Identity verification"], ["AML", "AML"], ["KYB", "KYB"], ["Crypto KYC", "Crypto"], ["Liveness Detection", "Liveness"]],
  },
};
