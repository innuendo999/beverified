// Header mega menu and footer columns, resolved from site.json → v3.menu.
// site.json holds only hand-picked keys and slugs. Everything shown comes from the records:
// category URLs from src/_data/categories, top 3 per ranking from rankings.yml (order = rank),
// provider name, logo and tagline from src/_data/providers. Posts are added in the template
// from collections.articles. A key or slug that does not resolve is dropped, never invented.
import fs from "node:fs";
import yaml from "js-yaml";

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
  const tiles = fs.existsSync(read("./logoTiles.json")) ? JSON.parse(fs.readFileSync(read("./logoTiles.json"), "utf8")) : {};

  const card = (slug) => {
    const p = provs[slug];
    if (!p || p.status === "draft") return null;
    const logo = p.logo || {};
    return { slug, name: p.name, href: `/providers/${slug}/`, tagline: p.tagline || "",
      logo: logo.src || null, wordmark: logo.wordmark || null,
      bg: tiles[slug]?.bg || "#FFFFFF", fit: tiles[slug]?.fit || "contain" };
  };
  const anchor = (key) => key.replace(/[^a-z0-9]+/g, "-");

  const groups = menu.rankings.groups.map((g) => ({
    title: g.title,
    items: g.items.map(([key, label]) => {
      const c = cats[key];
      if (!c) return null;
      const top = (rankings[key]?.providers || []).filter((r) => !hide.includes(r.slug)).slice(0, 3).map((r) => (r.slug ? card(r.slug) : null) || { name: r.name });
      return { key, id: anchor(key), label, href: c.url, top, on: key === menu.rankings.preview };
    }).filter(Boolean),
  }));
  const regions = menu.rankings.regions.map(([key, label]) => (cats[key] ? { label, href: cats[key].url } : null)).filter(Boolean);

  const r = menu.reviews;
  return {
    rankings: { ...menu.rankings, groups, regions },
    reviews: { ...r,
      mostRead: r.mostRead.map(card).filter(Boolean),
      alternatives: r.alternatives.map(card).filter(Boolean) },
    blog: menu.blog,
  };
}
