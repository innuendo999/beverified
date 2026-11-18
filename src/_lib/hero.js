import { shortLabel } from "./placements.js";

// Homepage first screen (owner approved the "Identity palette" design canvas, 2026-11-16).
// Everything here is derived: ranks from rankings.yml, scores and certificates from the
// provider records, counts from the records and rankings. Nothing is typed into home.yml but labels.

// Short chip label for a certification that the record marks as confirmed (independent evidence only).
// Order = priority; a card row shows at most two. Vendor-stated items (ISO 27001, SOC 2 ...) never show.
const CHECKS = [
  { test: /iBeta|30107-3/i, label: (c) => { const m = /Level\s*(\d)/i.exec(c.name); return m ? `iBeta liveness L${m[1]}` : "iBeta liveness"; }, best: (c) => Number((/Level\s*(\d)/i.exec(c.name) || [])[1] || 0) },
  { test: /DIATF/i, label: () => "UK DIATF" },
  { test: /FIDO Face/i, label: () => "FIDO Face" },
  { test: /29003/, label: () => "ISO/IEC 29003" },
];

export function confirmedChecks(p, max = 2) {
  const certs = (p?.certifications || []).filter((c) => c?.status === "confirmed");
  const out = [];
  for (const rule of CHECKS) {
    const hits = certs.filter((c) => rule.test.test(c.name || ""));
    if (!hits.length) continue;
    const pick = rule.best ? hits.sort((a, b) => rule.best(b) - rule.best(a))[0] : hits[0];
    out.push(rule.label(pick));
    if (out.length === max) break;
  }
  return out;
}

export function heroCard(d, sponsor) {
  const cfg = d.home.hero || {};
  const list = d.rankings?.[cfg.ranking]?.providers || [];
  const cat = Object.values(d.categories || {}).find((c) => c.slug === cfg.ranking) || {};
  const own = cat.score_source === "category";
  const score = (p) => (own ? p?.category_scores?.[cfg.ranking]?.score : p?.score) ?? null;
  const rows = list.slice(0, cfg.top || 3).map((r, i) => {
    const p = r.slug ? d.providers[r.slug] : null;
    if (!p) return null;
    return { rank: i + 1, slug: r.slug, name: p.name, wordmark: p.logo?.wordmark || null, score: score(p),
      checks: confirmedChecks(p), prices: ["core", "full"].includes(p.pricing?.model?.published),
      method: p.methodology };
  }).filter(Boolean);
  // Machine-readable-zone look (bottom of a passport), decoration only: aria-hidden in the template.
  const field = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]+/g, "<");
  const mrzLine = (parts) => parts.map(field).join("<<").padEnd(44, "<").slice(0, 44);
  const now = new Date().toISOString().slice(0, 7);
  const mrz = [mrzLine([cfg.ranking, ...rows.map((r) => r.name)]), mrzLine(["BEVERIFIED ORG", "RANKING " + now])];
  return {
    mrz,
    ranking: cfg.ranking, url: cat.url || `/providers/${cfg.ranking}/`,
    label: shortLabel(d.site?.v3?.menu, cfg.ranking) || cfg.ranking.toUpperCase(), total: list.length,
    rubric: !own && rows.length && rows.every((r) => r.method === d.site?.v3?.methodologyVersion) ? d.site.v3.methodologyVersion : null,
    rows,
    scoreLabel: cat.score_label || "Score",
    sponsor: sponsor ? { name: sponsor.provider.name, slug: sponsor.slug, rank: sponsor.rank, score: score(sponsor.provider),
      url: sponsor.provider.link?.url || null } : null,
  };
}

export function heroCounts(d) {
  const groups = d.home.hero?.count_groups || [];
  const live = Object.values(d.providers).filter((p) => p.status === "published");
  const cells = groups.map((g) => {
    const set = new Set();
    for (const p of live) {
      const cats = [...(p.categories || []), p.primary_category];
      if (cats.some((c) => g.categories.includes(c))) set.add(p.slug);
    }
    for (const c of g.categories) for (const r of d.rankings?.[c]?.providers || []) {
      const p = r.slug && d.providers[r.slug];
      if (p && p.status === "published") set.add(r.slug);
    }
    return { name: g.name, url: g.url, count: set.size };
  });
  return { cells, total: live.length };
}

// Guilloche (security-print line pattern), decoration for the hero background. 18 lines on the right part.
export function guilloche() {
  const out = [];
  for (let k = 0; k < 18; k++) {
    const amp = 26 + k * 3, ph = k * 0.42, y0 = 120 + k * 22;
    let d = "";
    for (let x = 560; x <= 1440; x += 10) {
      const y = y0 + amp * Math.sin(x / 70 + ph) * Math.cos(x / 210 - ph * 0.6);
      d += `${x === 560 ? "M" : "L"}${x} ${y.toFixed(1)}`;
    }
    out.push({ d, strong: k % 3 === 0 });
  }
  return out;
}
