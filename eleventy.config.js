import yaml from "js-yaml";

// YAML front matter turns 2026-10-18 into a Date; normalise to "2026-10-18".
const isoDate = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v || ""));
const slugify = (t) => String(t).toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Article front matter lists (providers, categories) shadow global objects of the same name.
const arr = (v) => (Array.isArray(v) ? v : []);
const SECTION_LABEL = { guide: "Guide", news: "News", publications: "Research" };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function (eleventyConfig) {
  // YAML data files in src/_data (providers, categories, rankings).
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  // Static files copied as-is.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/googlecb6dc6a16be14e4c.html");

  // Passthrough files must not also be processed as templates.
  eleventyConfig.ignores.add("src/googlecb6dc6a16be14e4c.html");

  // Plain-text outputs (llms.txt): undo Nunjucks HTML escaping.
  eleventyConfig.addTransform("txt-unescape", function (content) {
    if (!(this.page.outputPath || "").endsWith(".txt")) return content;
    return content.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  });

  // ---- Articles (src/guide, src/news, src/publications). Spec: docs/article-spec.md ----
  eleventyConfig.amendLibrary("md", (md) => {
    md.core.ruler.push("heading_ids", (state) => {
      const t = state.tokens;
      for (let i = 0; i < t.length; i++) {
        if (t[i].type === "heading_open" && (t[i].tag === "h2" || t[i].tag === "h3") && !t[i].attrGet("id"))
          t[i].attrSet("id", slugify(t[i + 1].content));
      }
      // Tables have no caption in Markdown: label them with the nearest preceding heading.
      let lastHeading = "";
      for (let i = 0; i < t.length; i++) {
        if (t[i].type === "heading_open") lastHeading = t[i + 1].content;
        if (t[i].type === "table_open" && !t[i].attrGet("aria-label") && lastHeading) t[i].attrSet("aria-label", lastHeading);
      }
    });
  });
  const articleTime = (a) => isoDate(a.data.published || a.data.updated);
  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob(["src/guide/*.md", "src/news/*.md", "src/publications/*.md"])
      .sort((a, b) => articleTime(b).localeCompare(articleTime(a))));
  eleventyConfig.addFilter("iso", isoDate);
  eleventyConfig.addFilter("sectionLabel", (s) => SECTION_LABEL[s] || s);
  eleventyConfig.addFilter("readingTime", (html) =>
    Math.max(1, Math.round(String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220)));
  // [{id, title}] from rendered <h2 id> headings
  eleventyConfig.addFilter("headingToc", (html) =>
    [...String(html || "").matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({ id: m[1], title: m[2].replace(/<[^>]+>/g, "") })));
  // Articles mentioning a provider slug or a category key
  eleventyConfig.addFilter("articlesAbout", (list, kind, key, n = 4) =>
    (list || []).filter((a) => arr(a.data[kind === "providers" ? "provider_slugs" : "ranking_keys"]).includes(key)).slice(0, n));
  eleventyConfig.addFilter("byAuthor", (list, key) => (list || []).filter((a) => a.data.author === key));
  eleventyConfig.addFilter("inSection", (list, section) => section === "all" ? list : (list || []).filter((a) => a.data.section === section));
  // Top n related articles by shared providers (2), categories (1), topics (2); newest first on ties
  eleventyConfig.addFilter("relatedPosts", (list, url, data, n = 3) => {
    const sh = (a, b) => (a || []).filter((x) => (b || []).includes(x)).length;
    return (list || []).filter((a) => a.url !== url)
      .map((a, i) => ({ a, i, s: 2 * sh(arr(a.data.provider_slugs), data.providers) + sh(arr(a.data.ranking_keys), data.categories) + 2 * sh(a.data.topics, data.topics) }))
      .sort((x, y) => y.s - x.s || x.i - y.i).slice(0, n).map((x) => x.a);
  });

  // ---- Filters used by the V3 templates ----

  // 5-segment rating meter: [100, 100, 100, 100, 60] for 4.6
  eleventyConfig.addFilter("meter", (score) =>
    [0, 1, 2, 3, 4].map((i) => Math.round(Math.max(0, Math.min(1, Number(score) - i)) * 10) * 10));

  // "2026-07-25" -> "Jul 25, 2026"; "2026-07" -> "Jul 2026"
  eleventyConfig.addFilter("displayDate", (iso) => {
    if (!iso) return "";
    const [y, m, d] = isoDate(iso).split("-").map(Number);
    return d ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${y}`;
  });

  // Outbound provider link rel from link.type (affiliate | paid | none). Only paid or affiliate links are "sponsored".
  eleventyConfig.addFilter("outRel", (link) =>
    ["affiliate", "paid"].includes(link?.type) ? "sponsored nofollow noopener" : "nofollow noopener");

  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));

  eleventyConfig.addFilter("score1", (n) => (n == null ? "" : Number(n).toFixed(1)));

  // Providers object -> array sorted by name
  eleventyConfig.addFilter("byName", (obj) =>
    Object.values(obj || {}).sort((a, b) => a.name.localeCompare(b.name)));

  // Where a provider is ranked: [{pos, title, url}], best position first
  eleventyConfig.addFilter("rankedIn", (slug, rankings, categories) => {
    const out = [];
    for (const [cat, r] of Object.entries(rankings || {})) {
      const i = (r.providers || []).findIndex((p) => p.slug === slug);
      if (i < 0) continue;
      const c = Object.values(categories || {}).find((x) => x.slug === cat) || {};
      out.push({ pos: i + 1, title: c.breadcrumb_label || r.title, url: c.url || `/providers/${cat}/` });
    }
    return out.sort((a, b) => a.pos - b.pos);
  });

  // Legacy explainer markup: drop inline styles and old classes, keep structure.
  eleventyConfig.addFilter("cleanHtml", (html) => String(html || "")
    .replace(/\s+style="[^"]*"/g, "")
    .replace(/\s+class="(?!callout")[^"]*"/g, "")
    .replace(/\s+id="[^"]*"/g, "")
    .replace(/^<section[^>]*>|<\/section>$/g, ""));

  // Table of contents from <section id="..."> ... <h2>Title</h2> pairs in rendered content.
  eleventyConfig.addFilter("toc", (html) => {
    const out = [];
    for (const m of String(html || "").matchAll(/<section[^>]*\sid="([^"]+)"[^>]*>\s*(?:<[^h][^>]*>\s*)*<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
      out.push({ id: m[1], title: m[2].replace(/<[^>]+>/g, "").trim() });
    }
    return out;
  });

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v).replace(/</g, "\\u003c"));

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
