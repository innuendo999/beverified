// Sponsored slots in the homepage "Pick by use case" panel (owner chose layout A, 2026-11-10).
// Data: src/_data/placements.yml. One slot per use case, shown under the editorial top 3, always
// labelled "Sponsored", with the sponsor's real rank and score from rankings.yml and its record.
// Payment never changes scores or ranking order: the slot only adds a link to the sponsor's review.
//
// Rules (checked by scripts/checks/placements.mjs in CI; a broken entry is also never rendered):
// - use_case is a rankings.yml key that appears in home.yml use_cases;
// - the provider has a published review with a score and is in that ranking;
// - it is not already in that ranking's top 3 (the panel shows them anyway);
// - start and end are ISO dates, start <= end; slots for one use case never overlap.

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const iso = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ""));

export function placementIssues(placements, { rankings, providers, useCases }) {
  const issues = [];
  const keys = new Set((useCases || []).map((u) => u.slug));
  const seen = {};
  (placements || []).forEach((e, i) => {
    if (e?.surface === "review") return; // checked by reviewPlacementIssues
    const id = `placements[${i}] ${e?.use_case ?? "?"}/${e?.slug ?? "?"}`;
    const start = iso(e?.start), end = iso(e?.end);
    if (!e?.use_case || !keys.has(e.use_case)) issues.push(`${id}: use_case is not a homepage use case`);
    const list = rankings?.[e?.use_case]?.providers || [];
    const p = providers?.[e?.slug];
    if (!p || p.status !== "published" || p.score == null) issues.push(`${id}: no published review with a score`);
    const rank = list.findIndex((r) => r.slug === e?.slug);
    if (rank < 0) issues.push(`${id}: provider is not in this ranking`);
    else if (rank < 3) issues.push(`${id}: provider is already in the top 3 of this ranking`);
    if (!ISO.test(start) || !ISO.test(end)) issues.push(`${id}: start and end must be YYYY-MM-DD`);
    else if (start > end) issues.push(`${id}: start is after end`);
    for (const o of seen[e?.use_case] || []) if (start <= o.end && o.start <= end) issues.push(`${id}: overlaps ${o.id}`);
    (seen[e?.use_case] ||= []).push({ id, start, end });
  });
  return issues;
}

// The slot to show for each use case on the build date, or nothing. Entries that break a rule are skipped.
export function activePlacements(placements, ctx, today = new Date().toISOString().slice(0, 10)) {
  const out = {};
  (placements || []).forEach((e) => {
    if (e?.surface === "review") return;
    if (placementIssues([e], ctx).length) return;
    if (iso(e.start) > today || iso(e.end) < today || out[e.use_case]) return;
    const list = ctx.rankings[e.use_case].providers;
    const rank = list.findIndex((r) => r.slug === e.slug);
    out[e.use_case] = { slug: e.slug, rank: rank + 1, entry: list[rank], provider: ctx.providers[e.slug] };
  });
  return out;
}

// ---- Review pages (owner, 2026-11-10) ----
// One sponsor card on the first screen of a review (above the score card) and again after the
// editorial alternatives. Entry: { surface: review, slug, category, pages?, start, end }.
// - category: a rankings.yml key; the sponsor must be ranked in it. Without pages, the slot shows on
//   every review of a provider ranked in that list. pages: only these reviews (competitor targeting).
// - never on the sponsor's own review; one sponsor per review page for any day.
// - the card always says "Sponsored", shows the sponsor's real score and rank, and links out with
//   rel="sponsored". Policy text: site.json v3.adPolicy (Methodology, For providers, Terms).
// Short ranking name from the header menu ("Travel Rule"), else the category's breadcrumb label.
export const shortLabel = (menu, key) => (menu?.rankings?.groups || []).flatMap((g) => g.items || []).find(([k]) => k === key)?.[1] || null;
const inRanking = (rankings, key, slug) => (rankings?.[key]?.providers || []).findIndex((r) => r.slug === slug);

export function reviewPlacementIssues(placements, { rankings, providers }) {
  const issues = [];
  const live = [];
  (placements || []).forEach((e, i) => {
    if (e?.surface !== "review") return;
    const id = `placements[${i}] review/${e?.slug ?? "?"}`;
    const start = iso(e?.start), end = iso(e?.end);
    const p = providers?.[e?.slug];
    if (!p || p.status !== "published" || p.score == null) issues.push(`${id}: no published review with a score`);
    if (!e?.category || !rankings?.[e.category]) issues.push(`${id}: category is not a rankings.yml key`);
    else if (inRanking(rankings, e.category, e.slug) < 0) issues.push(`${id}: sponsor is not ranked in ${e.category}`);
    for (const pg of e?.pages || []) {
      if (!providers?.[pg]) issues.push(`${id}: page ${pg} has no provider record`);
      if (pg === e?.slug) issues.push(`${id}: a sponsor never shows on its own review`);
    }
    if (!ISO.test(start) || !ISO.test(end)) issues.push(`${id}: start and end must be YYYY-MM-DD`);
    else if (start > end) issues.push(`${id}: start is after end`);
    const pages = e?.pages?.length ? e.pages : (rankings?.[e?.category]?.providers || []).map((r) => r.slug);
    for (const o of live) {
      if (!(start <= o.end && o.start <= end)) continue;
      const both = pages.filter((x) => o.pages.includes(x) && x !== e.slug && x !== o.slug);
      if (both.length) issues.push(`${id}: overlaps ${o.id} on ${both.join(", ")}`);
    }
    live.push({ id, start, end, pages, slug: e?.slug });
  });
  return issues;
}

// The sponsor card for one review page on the build date, or null.
export function reviewSponsor(placements, { rankings, providers, categories, menu }, pageSlug, today = new Date().toISOString().slice(0, 10)) {
  for (const e of placements || []) {
    if (e?.surface !== "review" || e.slug === pageSlug) continue;
    if (reviewPlacementIssues([e], { rankings, providers }).length) continue;
    if (iso(e.start) > today || iso(e.end) < today) continue;
    const onPage = e.pages?.length ? e.pages.includes(pageSlug) : inRanking(rankings, e.category, pageSlug) >= 0;
    if (!onPage) continue;
    const rank = inRanking(rankings, e.category, e.slug);
    const cat = Object.values(categories || {}).find((c) => c.slug === e.category) || {};
    return { provider: providers[e.slug], rank: rank + 1, entry: rankings[e.category].providers[rank],
      category: shortLabel(menu, e.category) || cat.breadcrumb_label || rankings[e.category].title, url: cat.url || `/providers/${e.category}/` };
  }
  return null;
}

// Providers with a live review placement: their own review says they advertise.
export function liveSponsors(placements, ctx, today = new Date().toISOString().slice(0, 10)) {
  return [...new Set((placements || []).filter((e) => e?.surface === "review"
    && !reviewPlacementIssues([e], ctx).length && iso(e.start) <= today && iso(e.end) >= today).map((e) => e.slug))];
}
