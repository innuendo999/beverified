// Validates glossary terms (docs/glossary-spec.md): src/_data/glossary/<slug>.yml
// node scripts/checks/glossary.mjs [slug ...]
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { CAP_LABELS } from "../../src/_lib/capabilities.js";
import { CLUSTERS } from "../../src/_lib/glossary.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const gdir = path.join(root, "src/_data/glossary");
const all = fs.existsSync(gdir) ? fs.readdirSync(gdir).filter((f) => f.endsWith(".yml")).map((f) => f.replace(/\.yml$/, "")) : [];
const providers = Object.fromEntries(fs.readdirSync(path.join(root, "src/_data/providers")).filter((f) => f.endsWith(".yml"))
  .map((f) => [f.replace(/\.yml$/, ""), yaml.load(fs.readFileSync(path.join(root, "src/_data/providers", f), "utf8"))]));
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
const catUrls = fs.readdirSync(path.join(root, "src/_data/categories")).map((f) => yaml.load(fs.readFileSync(path.join(root, "src/_data/categories", f), "utf8")).url);
const articleUrls = ["guide", "news", "publications"].flatMap((s) => {
  const d = path.join(root, "src", s);
  return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".md")).map((f) => `/${s}/${f.replace(/\.md$/, "")}/`) : [];
});
const urls = new Set(["/", "/providers/", "/use-cases/", "/regions/", "/methodology/", "/about/", "/blog/", "/glossary/",
  ...Object.keys(providers).map((p) => `/providers/${p}/`), ...catUrls, ...articleUrls, ...all.map((s) => `/glossary/${s}/`)]);
const names = Object.entries(providers).map(([slug, p]) => [slug, p.name]).filter(([, n]) => n && n.length > 3);
const words = (s) => String(s || "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").split(/\s+/).filter(Boolean).length;

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
let errors = 0;
const err = (s, m) => { errors++; console.log(`glossary/${s}: ${m}`); };
for (const slug of only.length ? only : all) {
  const f = path.join(gdir, `${slug}.yml`);
  if (!fs.existsSync(f)) { err(slug, "file not found"); continue; }
  const raw = fs.readFileSync(f, "utf8");
  let t; try { t = yaml.load(raw); } catch (e) { err(slug, "YAML does not parse: " + e.message); continue; }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err(slug, "slug must be lowercase words joined by hyphens");
  for (const k of ["term", "cluster", "definition", "body", "buyer_questions", "faq", "sources", "author", "published", "updated"])
    if (t[k] == null || (Array.isArray(t[k]) && !t[k].length)) err(slug, `missing ${k}`);
  if (t.cluster && !CLUSTERS.some((c) => c.key === t.cluster)) err(slug, `cluster must be one of ${CLUSTERS.map((c) => c.key)}`);
  const dw = words(t.definition);
  if (dw < 20 || dw > 60) err(slug, `definition is ${dw} words (20 to 60)`);
  const bw = words(t.body);
  if (bw < 250 || bw > 1000) err(slug, `body is ${bw} words (250 to 1000)`);
  const body = String(t.body || "");
  if (/^#\s/m.test(body)) err(slug, "body must not contain an H1");
  if ((body.match(/^##\s/gm) || []).length < 2) err(slug, "body needs at least 2 ## sections");
  if ((t.buyer_questions || []).length < 3 || (t.buyer_questions || []).length > 6) err(slug, "buyer_questions: 3 to 6");
  for (const k of ["term", "definition", "body"]) if (t[k] != null && typeof t[k] !== "string") err(slug, `${k} must be a string`);
  for (const q of t.buyer_questions || []) if (typeof q !== "string") err(slug, `buyer question is not a string (quote it): ${JSON.stringify(q)}`);
  for (const q of t.faq || []) if (typeof q.q !== "string" || typeof q.a !== "string") err(slug, `faq q/a must be strings (quote them): ${JSON.stringify(q)}`);
  if ((t.faq || []).length < 2 || (t.faq || []).length > 4) err(slug, "faq: 2 to 4 items");
  for (const q of t.faq || []) if (!q.q || !q.a) err(slug, "faq item needs q and a");
  if ((t.sources || []).length < 2) err(slug, "at least 2 sources");
  for (const s of t.sources || []) if (!s.title || !s.publisher || !/^https?:\/\//.test(s.url || "") || !s.accessed) err(slug, `incomplete source ${JSON.stringify(s)}`);
  if (t.capability && !CAP_LABELS[t.capability]) err(slug, `unknown capability ${t.capability}`);
  for (const k of t.rankings || []) if (!rankings[k]) err(slug, `unknown ranking key ${k}`);
  for (const r of t.related || []) if (!all.includes(r)) err(slug, `related term not found: ${r}`);
  if ((t.related || []).includes(slug)) err(slug, "related lists itself");
  if (t.seo_title && t.seo_title.length > 65) err(slug, `seo_title ${t.seo_title.length} chars (max 65)`);
  const title = t.seo_title || `What Is ${t.abbr ? `${t.abbr} (${t.term})` : t.term}? | BeVerified`;
  if (title.length > 65) err(slug, `default title "${title}" is ${title.length} chars: set seo_title`);
  if (t.seo_description && t.seo_description.length > 160) err(slug, `seo_description ${t.seo_description.length} chars (max 160)`);
  if (!t.seo_description && String(t.definition || "").length > 160) err(slug, "definition is longer than 160 chars: set seo_description");
  if (/[–—]/.test(raw)) err(slug, "contains an em or en dash");
  if (/\bTODO\b|lorem ipsum|verify before|\[citation/i.test(raw)) err(slug, "placeholder or editorial note");
  const srcUrls = new Set((t.sources || []).map((s) => s.url));
  for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    const u = m[1];
    if (u.startsWith("/")) { if (!urls.has(u.split("#")[0])) err(slug, `internal link not found: ${u}`); }
    else if (/^https?:/.test(u) && !srcUrls.has(u)) err(slug, `external link not in sources: ${u}`);
  }
  const ext = [...body.matchAll(/\]\((https?:[^)\s]+)\)/g)].length;
  if (ext > 4) err(slug, `${ext} external links in body (max 4)`);
  const allowed = new Set(t.provider_mentions || []);
  const text = [t.definition, body, ...(t.buyer_questions || []), ...(t.faq || []).flatMap((q) => [q.q, q.a])].join(" ");
  for (const [ps, n] of names) if (!allowed.has(ps) && new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(text))
    err(slug, `names reviewed provider "${n}": the provider table is generated from data; list ${ps} in provider_mentions only for a sourced historical fact`);
}
console.log(`glossary: ${(only.length ? only : all).length} term(s), ${errors} issue(s)`);
process.exit(errors ? 1 : 0);
