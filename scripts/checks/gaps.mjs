// Step 4: content gap report.
// Reads the structured data in src/_data and lists, per page, what is still
// missing before it matches the new templates. Sorted by Google impressions so
// research starts where traffic is.
// Usage: node scripts/checks/gaps.mjs   ->  reports/content-gaps.csv
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import yaml from "js-yaml";

const DATA = "src/_data";
const load = (p) => yaml.load(readFileSync(p, "utf8"));
const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

// GSC impressions per URL (fragments folded in)
const gsc = {};
if (existsSync("data/gsc/Pages.csv")) {
  for (const line of readFileSync("data/gsc/Pages.csv", "utf8").trim().split("\n").slice(1)) {
    const [url, clicks, impr] = line.split(",");
    const path = url.replace("https://beverified.org", "").split("#")[0] || "/";
    gsc[path] = gsc[path] || { clicks: 0, impressions: 0 };
    gsc[path].clicks += Number(clicks);
    gsc[path].impressions += Number(impr);
  }
}

// Rating conflicts from the inventory step
const conflicts = new Set();
if (existsSync("reports/rating-conflicts.csv")) {
  for (const line of readFileSync("reports/rating-conflicts.csv", "utf8").trim().split("\n").slice(1)) {
    conflicts.add(line.split(",")[0]);
  }
}

const today = new Date();
const daysSince = (iso) => (iso ? Math.round((today - new Date(iso)) / 864e5) : null);
const rows = [];

const providers = {};
for (const file of readdirSync(`${DATA}/providers`)) {
  const p = load(`${DATA}/providers/${file}`);
  providers[p.slug] = p;
  const gaps = [];
  const must = (cond, label) => { if (!cond) gaps.push(label); };
  must(!p.legacy_issues?.length, `fix legacy: ${(p.legacy_issues || []).join("+")}`);
  must(!conflicts.has(p.slug), "rating differs across pages");
  must(p.link?.type, "link.type (affiliate|paid|none)");
  must(p.score_breakdown?.length, "score_breakdown");
  must(p.pricing?.items?.some((i) => i.source), "pricing.items with source");
  must(p.pricing?.verified, "pricing.verified");
  const facts = p.facts || [];
  must(facts.length && facts.every((f) => f.source), `facts sources (${facts.filter((f) => f.source).length}/${facts.length})`);
  must(p.use_case_verdicts?.length, "use_case_verdicts");
  must(p.certifications?.length, "certifications");
  must(p.user_ratings?.length, "user_ratings (G2/Capterra: rating, count, date)");
  must(p.segments?.length, "segments");
  must(Object.keys(p.capabilities || {}).length, "capabilities");
  must(p.sources?.length, "sources list");
  must(p.entity?.wikidata || p.entity?.same_as?.length, "entity ids (wikidata / sameAs)");
  must((p.pros || []).length === 3 && (p.cons || []).length === 3, "pros/cons 3+3");
  const age = daysSince(p.last_verified);
  must(age !== null && age <= 182, `last_verified older than 2 quarters (${age ?? "none"} days)`);
  const url = `/providers/${p.slug}/`;
  rows.push({ url, type: "provider", name: p.name, ...gsc[url], gaps });
}

const rankings = load(`${DATA}/rankings.yml`);
for (const file of readdirSync(`${DATA}/categories`)) {
  const c = load(`${DATA}/categories/${file}`);
  const list = rankings[c.slug]?.providers || [];
  const gaps = [];
  const must = (cond, label) => { if (!cond) gaps.push(label); };
  must(!c.legacy_issues?.length, `fix legacy: ${(c.legacy_issues || []).join("+")}`);
  const unreviewed = list.filter((r) => !r.slug || !providers[r.slug]).map((r) => r.name);
  must(!unreviewed.length, `ranked without review page: ${unreviewed.join("; ")}`);
  const mismatched = list.filter((r) => providers[r.slug] && r.legacy_rating_shown !== providers[r.slug].score)
    .map((r) => `${r.name} ${r.legacy_rating_shown}≠${providers[r.slug].score}`);
  must(!mismatched.length, `card rating ≠ review score: ${mismatched.join("; ")}`);
  must(list.every((r) => r.segments?.length), "segments per ranked provider");
  must(c.capability_columns?.length, "capability matrix columns");
  must(c.faq_templates?.length, "FAQ templates");
  must(c.adjacent?.length, "adjacent categories");
  must(c.reviewer?.name, "reviewer");
  const age = daysSince(c.last_verified);
  must(age !== null && age <= 182, `last_verified older than 2 quarters (${age ?? "none"} days)`);
  rows.push({ url: c.url, type: "category", name: c.seo?.h1, ...gsc[c.url], gaps });
}

rows.sort((a, b) => (b.impressions || 0) - (a.impressions || 0));
mkdirSync("reports", { recursive: true });
const header = ["url", "type", "name", "gsc_impressions", "gsc_clicks", "gap_count", "gaps"];
const lines = [header.join(",")].concat(rows.map((r) =>
  [r.url, r.type, r.name, r.impressions || 0, r.clicks || 0, r.gaps.length, r.gaps.join(" | ")].map(csvCell).join(",")));
writeFileSync("reports/content-gaps.csv", lines.join("\n") + "\n");

const count = {};
for (const r of rows) for (const g of r.gaps) { const k = g.replace(/[:(].*$/, "").trim(); count[k] = (count[k] || 0) + 1; }
console.log(`content gaps: ${rows.length} pages, ${rows.reduce((n, r) => n + r.gaps.length, 0)} gaps`);
for (const [k, v] of Object.entries(count).sort((a, b) => b[1] - a[1])) console.log(`  ${v.toString().padStart(3)}  ${k}`);
