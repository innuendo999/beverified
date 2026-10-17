import yaml from "js-yaml";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function (eleventyConfig) {
  // YAML data files in src/_data (providers, categories, rankings).
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  // Static files copied as-is.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/googlecb6dc6a16be14e4c.html");
  eleventyConfig.addPassthroughCopy("src/backup-files");

  // Passthrough files must not also be processed as templates.
  eleventyConfig.ignores.add("src/googlecb6dc6a16be14e4c.html");
  eleventyConfig.ignores.add("src/backup-files/**");

  // ---- Filters used by the V3 templates ----

  // 5-segment rating meter: [100, 100, 100, 100, 60] for 4.6
  eleventyConfig.addFilter("meter", (score) =>
    [0, 1, 2, 3, 4].map((i) => Math.round(Math.max(0, Math.min(1, Number(score) - i)) * 100)));

  // "2026-07-25" -> "Jul 25, 2026"; "2026-07" -> "Jul 2026"
  eleventyConfig.addFilter("displayDate", (iso) => {
    if (!iso) return "";
    const [y, m, d] = String(iso).split("-").map(Number);
    return d ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${y}`;
  });

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
