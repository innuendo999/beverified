export default function (eleventyConfig) {
  // Static files copied as-is.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/googlecb6dc6a16be14e4c.html");
  eleventyConfig.addPassthroughCopy("src/backup-files");

  // Passthrough files must not also be processed as templates.
  eleventyConfig.ignores.add("src/googlecb6dc6a16be14e4c.html");
  eleventyConfig.ignores.add("src/backup-files/**");

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
