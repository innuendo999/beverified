// Validates article Markdown files (docs/article-spec.md).
// node scripts/checks/articles.mjs [--file path] [--urls]
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const SECTIONS = ["guide", "news", "publications"];
const providers = new Set(fs.readdirSync(path.join(root, "src/_data/providers")).map((f) => f.replace(/\.yml$/, "")));
const rankings = yaml.load(fs.readFileSync(path.join(root, "src/_data/rankings.yml"), "utf8"));
const catUrls = fs.readdirSync(path.join(root, "src/_data/categories")).map((f) =>
  yaml.load(fs.readFileSync(path.join(root, "src/_data/categories", f), "utf8")).url);
const articleFiles = SECTIONS.flatMap((s) => {
  const dir = path.join(root, "src", s);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => path.join(dir, f)) : [];
});
const plannedArticles = fs.existsSync(path.join(root, "src/_data/articlePlan.yml"))
  ? yaml.load(fs.readFileSync(path.join(root, "src/_data/articlePlan.yml"), "utf8")) : [];
const urls = new Set([
  "/", "/providers/", "/use-cases/", "/regions/", "/methodology/", "/methodology/#disclosure", "/about/",
  "/placement-options/", "/blog/", "/category/guide/", "/category/news/", "/category/publications/",
  "/authors/andrii-klymenko/",
  ...[...providers].map((p) => `/providers/${p}/`),
  ...catUrls,
  ...articleFiles.map((f) => `/${path.basename(path.dirname(f))}/${path.basename(f, ".md")}/`),
  ...plannedArticles,
]);
if (process.argv.includes("--urls")) { console.log([...urls].sort().join("\n")); process.exit(0); }

const only = process.argv.includes("--file") ? [path.resolve(process.argv[process.argv.indexOf("--file") + 1])] : articleFiles;
let errors = 0;
const err = (f, m) => { errors++; console.log(`${path.relative(root, f)}: ${m}`); };
for (const f of only) {
  const raw = fs.readFileSync(f, "utf8");
  let fm;
  try { fm = matter(raw); } catch (e) { err(f, "front matter does not parse: " + e.message); continue; }
  const d = fm.data, body = fm.content;
  for (const k of ["title", "seoTitle", "seoDescription", "lede", "section", "updated", "author", "takeaways", "topics", "categories", "faq", "sources"])
    if (d[k] == null || (Array.isArray(d[k]) && !d[k].length)) err(f, `missing ${k}`);
  if (!SECTIONS.includes(d.section)) err(f, `section must be one of ${SECTIONS}`);
  if (d.section && path.basename(path.dirname(f)) !== d.section) err(f, "section does not match folder");
  for (const p of d.providers || []) if (!providers.has(p)) err(f, `unknown provider slug ${p}`);
  for (const c of d.categories || []) if (!rankings[c]) err(f, `unknown category key ${c}`);
  for (const s of d.sources || []) if (!s.url || !/^https?:\/\//.test(s.url) || !s.title || !s.accessed) err(f, `incomplete source ${JSON.stringify(s)}`);
  for (const q of d.faq || []) if (!q.q || !q.a) err(f, "faq item needs q and a");
  if ((d.seoTitle || "").length > 65) err(f, `seoTitle ${d.seoTitle.length} chars`);
  if (/[–—]/.test(raw)) err(f, "contains an em or en dash");
  if (/\bTODO\b|lorem ipsum|\{[a-z_.]+\}|verify before/i.test(raw)) err(f, "placeholder or editorial note");
  if (/^#\s/m.test(body)) err(f, "body must not contain an H1 (#)");
  if ((body.match(/^##\s/gm) || []).length < 3) err(f, "needs at least 3 ## sections");
  const sourceUrls = new Set((d.sources || []).map((s) => s.url));
  for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    const u = m[1];
    if (u.startsWith("/")) { if (!urls.has(u.split("#")[0].replace(/([^/])$/, "$1")) && !urls.has(u)) err(f, `internal link not found: ${u}`); }
    else if (/^https?:/.test(u) && !sourceUrls.has(u)) err(f, `external link not in sources: ${u}`);
  }
  const internal = [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].length;
  if (internal < 3) err(f, `only ${internal} internal links`);
}
console.log(`articles: ${only.length} file(s), ${errors} issue(s)`);
process.exit(errors ? 1 : 0);
