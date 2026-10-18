export default {
  eleventyComputed: {
    popular: (d) => Object.values(d.providers || {}).filter((p) => p && p.score != null && p.logo?.wordmark)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, 4),
  },
};
