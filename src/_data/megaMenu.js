// Header mega menu and footer columns, resolved from site.json → v3.menu.
// site.json holds only hand-picked keys and slugs. Everything shown comes from the records:
// category URLs from src/_data/categories, top 3 per ranking from rankings.yml (order = rank),
// provider name, logo and tagline from src/_data/providers. Posts are added in the template
// from collections.articles. A key or slug that does not resolve is dropped, never invented.
// Menu v2 (owner, 2026-11-24): the Rankings preview lists the top 3 with real rank, award and the score that ranking
// sorts on, plus the ranking's sponsored row (placements.yml surface: ranking, only with menu: true). Providers in v3.promoHide are left out
// of the preview but keep everyone else's real rank. Reviews and Blog panels get one sponsored slot each
// (surface: menu-reviews, menu-blog); rules in src/_lib/placements.js.
// Menu v3 (owner, 2026-11-25; canvas page "Header menu v3"): preview = rank, wordmark, score (no award, no MRZ line);
// "Most read" shows only providers with a wordmark file, as cards with score and meter; Head to head = the two
// providers' wordmarks per comparison (provider_slugs of the article). No Alternatives list in the menu.
import fs from "node:fs";
import yaml from "js-yaml";
import { rankingSponsor, menuReviewsSponsor, menuBlogSponsor } from "../_lib/placements.js";
import { articleIndex } from "../_lib/article-index.js";
import { wordmarkBox } from "../_lib/wordmark.js";

const read = (rel) => new URL(rel, import.meta.url);
const loadDir = (rel, keyOf) => {
  const out = {};
  for (const f of fs.readdirSync(read(rel)).filter((f) => f.endsWith(".yml"))) {
    const rec = yaml.load(fs.readFileSync(read(rel + f), "utf8"));
    out[keyOf(f, rec)] = rec;
  }
  return out;
};

export default function () {
  const site = JSON.parse(fs.readFileSync(read("./site.json"), "utf8"));
  const menu = site.v3.menu;
  const hide = site.v3.promoHide || [];
  const rankings = yaml.load(fs.readFileSync(read("./rankings.yml"), "utf8"));
  const cats = loadDir("./categories/", (f, c) => c.slug);
  const provs = loadDir("./providers/", (f) => f.replace(/\.yml$/, ""));
  // Tile colour and fit per logo, measured by scripts/menu-logo-tiles.py
  const placements = yaml.load(fs.readFileSync(read("./placements.yml"), "utf8")) || [];
  const ctx = { rankings, providers: provs };
  const pageScore = (c, slug) => { const p = provs[slug]; return (c?.score_source === "category" ? p?.category_scores?.[c.slug]?.score : p?.score) ?? null; };
  const tiles = fs.existsSync(read("./logoTiles.json")) ? JSON.parse(fs.readFileSync(read("./logoTiles.json"), "utf8")) : {};

  const card = (slug) => {
    const p = provs[slug];
    if (!p || p.status === "draft") return null;
    const logo = p.logo || {};
    return { slug, name: p.name, href: `/providers/${slug}/`, tagline: p.tagline || "", score: p.score ?? null,
      logo: logo.src || null, wordmark: logo.wordmark || null,
      mark: wordmarkBox(logo.wordmark, { area: 2600, minH: 20, maxH: 30, maxW: 128, iconH: 28 }),
      pct: p.score != null ? Math.round((p.score / 5) * 100) : null,
      bg: tiles[slug]?.bg || "#FFFFFF", fit: tiles[slug]?.fit || "contain" };
  };
  const anchor = (key) => key.replace(/[^a-z0-9]+/g, "-");

  const groups = menu.rankings.groups.map((g) => ({
    title: g.title, col: g.col || 1,
    items: g.items.map(([key, label]) => {
      const c = cats[key];
      if (!c) return null;
      const top = (rankings[key]?.providers || []).slice(0, 3)
        .map((r, i) => ({ r, rank: i + 1 })).filter(({ r }) => !hide.includes(r.slug))
        .map(({ r, rank }) => ({ ...((r.slug ? card(r.slug) : null) || { name: r.name }), rank, award: r.award || "", score: r.slug ? pageScore(c, r.slug) : null }));
      const s = rankingSponsor(placements, ctx, key);
      // Shown in the menu only when the booking says so (menu: true on the surface: ranking entry, owner decision per deal).
      const sponsor = s && s.menu && !hide.includes(s.slug) ? { ...card(s.slug), rank: s.rank, score: pageScore(c, s.slug), url: s.provider.link.url } : null;
      return { key, id: anchor(key), label, href: c.url, top, sponsor, scoreLabel: c.score_label || "Score", on: key === menu.rankings.preview };
    }).filter(Boolean),
  }));
  const regions = menu.rankings.regions.map(([key, label]) => (cats[key] ? { label, href: cats[key].url } : null)).filter(Boolean);

  const r = menu.reviews;
  const rs = menuReviewsSponsor(placements, { ...ctx, mostRead: r.mostRead });
  const articles = articleIndex(new URL("../", import.meta.url).pathname);
  const bs = menuBlogSponsor(placements, { articles });
  // Head to head: each comparison as its two providers' wordmarks; dropped if a side has no wordmark.
  const compare = [].concat(r.compare || []).map((url) => {
    const fm = articles[url];
    const sides = (fm?.provider_slugs || []).map(card).filter((p) => p && p.mark);
    return fm && sides.length === 2 ? { url, label: fm.cover_label || fm.title, sides } : null;
  }).filter(Boolean);
  const rsCat = rs ? cats[rs.category] : null;
  const labels = Object.fromEntries(menu.rankings.groups.flatMap((g) => g.items));
  return {
    rankings: { ...menu.rankings, groups, regions },
    reviews: { ...r,
      mostRead: r.mostRead.map(card).filter((p) => p && p.mark),
      compare,
      sponsor: rs ? { ...card(rs.slug), rank: rs.rank, ranking: labels[rs.category] || rsCat?.title || rs.category, rankingHref: rsCat?.url, url: rs.provider.link.url } : null },
    blog: { ...menu.blog, sponsor: bs },
  };
}
