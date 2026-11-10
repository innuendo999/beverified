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
    if (placementIssues([e], ctx).length) return;
    if (iso(e.start) > today || iso(e.end) < today || out[e.use_case]) return;
    const list = ctx.rankings[e.use_case].providers;
    const rank = list.findIndex((r) => r.slug === e.slug);
    out[e.use_case] = { slug: e.slug, rank: rank + 1, entry: list[rank], provider: ctx.providers[e.slug] };
  });
  return out;
}
