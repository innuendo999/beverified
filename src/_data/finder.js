// Provider finder (bottom-right widget, owner approved the canvas "BeVerified: Provider finder widget, logic and design", 2026-11-23).
// Everything comes from rankings.yml, home.yml and provider records; nothing is typed here. Written to /assets/finder.json
// by src/finder-json.njk and read by src/_includes/v3/finder.njk on first open. Spec: docs/provider-finder.md.
import fs from "node:fs";
import yaml from "js-yaml";
import costCalc from "./costCalc.js";

const read = (rel) => yaml.load(fs.readFileSync(new URL(rel, import.meta.url), "utf8"));
const MONEY = /(?:[$€£]|\b(?:CHF|USD|EUR|GBP)\s?)\d|\d(?:\.\d+)?p\b/;
const cut = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim().replace(/\.$/, ""); return s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n)) + "…"; };

function priceText(d) {
  const items = d.pricing?.items || [];
  const lab = d.pricing?.index?.price ? [].concat(d.pricing.index.price)[0] : null;
  const it = (lab && items.find((i) => i.label === lab)) || items.find((i) => i.kind === "official" && MONEY.test(String(i.value)));
  return it && it.kind === "official" && MONEY.test(String(it.value)) ? cut(`${it.label}: ${it.value}`, 80) : null;
}

// Short price for a finder row: the Pricing Index price of the record, first non-zero money value, cut at the first clause.
function shortPrice(d, calc) {
  if (calc) return "from $" + Math.min(...calc.opts.map((o) => o.per)).toFixed(2) + " a check";
  const items = d.pricing?.items || [];
  const labels = [].concat(d.pricing?.index?.price || [], d.pricing?.index?.minimum || []);
  for (const l of labels) {
    const it = items.find((i) => i.label === l && i.kind === "official");
    const v = it && String(it.value);
    if (!v || !MONEY.test(v) || /^(\$0\b|free)/i.test(v)) continue;
    return v.split(/;| \(|, | on /)[0].replace(/^From /, "from ").trim();
  }
  return null;
}

export default function () {
  const site = JSON.parse(fs.readFileSync(new URL("./site.json", import.meta.url), "utf8"));
  const cfg = site.v3.finder;
  const rankings = read("./rankings.yml");
  const home = read("./home.yml");
  const dir = new URL("./providers/", import.meta.url);
  const P = {};
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".yml"))) {
    const d = yaml.load(fs.readFileSync(new URL(f, dir), "utf8"));
    if (d?.status === "published") P[d.slug] = d;
  }
  const names = Object.fromEntries((home.use_cases || []).map((u) => [u.slug, u.name]));
  const regions = (home.regions || []).map((r) => ({ id: r.slug || r.short?.toLowerCase() || r.name.toLowerCase().replace(/\W+/g, "-"), name: r.name, short: r.short || r.name, rank: r.slug && rankings[r.slug] ? r.slug : null }));
  // Logo tiles as in the mega menu and the homepage use-case panel (src/_data/logoTiles.json).
  const tilesUrl = new URL("./logoTiles.json", import.meta.url);
  const tiles = fs.existsSync(tilesUrl) ? JSON.parse(fs.readFileSync(tilesUrl, "utf8")) : {};
  const lists = {};
  const providers = {};
  const keys = new Set([...cfg.needs, ...cfg.biz].map(([k]) => k).concat(Object.keys(rankings)));
  for (const k of keys) {
    const entries = (rankings[k]?.providers || []).filter((e) => P[e.slug]);
    lists[k] = { name: names[k] || rankings[k]?.title || k, url: `/providers/${k}/`, slugs: entries.map((e) => e.slug) };
    for (const e of entries) {
      const d = P[e.slug];
      const pr = (providers[e.slug] ||= { name: d.name, url: `/providers/${d.slug}/`, price: priceText(d), short: null, in: {},
        logo: d.logo?.src ? { src: d.logo.src, bg: tiles[d.slug]?.bg || d.logo.background || "#FFFFFF", fit: tiles[d.slug]?.fit || "contain" } : null });
      const link = e.site_link && d.link?.url ? { url: d.link.url, paid: ["affiliate", "paid"].includes(d.link.type), rel: d.link.rel || (["affiliate", "paid"].includes(d.link.type) ? "sponsored noopener" : "nofollow noopener"), label: d.link.label || "Visit website" } : null;
      pr.in[k] = { score: d.category_scores?.[k]?.score ?? d.score ?? null, award: e.award || null, line: cut(e.tagline || e.tradeoff, 100), site: link };
    }
  }
  // Review context: the ranking a review prefills (primary category if ranked there, else its first category ranking).
  const regionKeys = regions.filter((r) => r.rank).map((r) => r.rank);
  for (const [slug, pr] of Object.entries(providers)) {
    const pc = P[slug].primary_category;
    pr.home = pc && pr.in[pc] ? pc : Object.keys(pr.in).find((k) => !regionKeys.includes(k)) || null;
  }
  const cc = costCalc();
  for (const [slug, pr] of Object.entries(providers)) pr.short = shortPrice(P[slug], cc.priced.find((x) => x.slug === slug));
  const calc = cc.priced.map((p) => ({ slug: p.slug, quoteAbove: p.quoteAbove || null, opts: p.opts.map((o) => ({ plan: o.plan, per: o.per, min: o.min || 0, top: !!o.minOnTop })) }));
  return {
    needs: cfg.needs, biz: cfg.biz, costLists: cfg.costLists, exclude: cfg.exclude,
    countries: [{ id: "world", name: "Worldwide", short: "Worldwide", rank: null }, ...regions],
    regionByRank: Object.fromEntries(regions.filter((r) => r.rank).map((r) => [r.rank, { id: r.id, name: r.name }])),
    lists, providers, calc, calcChecked: cc.checkedTo,
  };
}
