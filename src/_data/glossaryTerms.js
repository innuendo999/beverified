// Glossary terms as a sorted list (src/_data/glossary/<slug>.yml), for pagination, the hub and llms.txt.
import fs from "node:fs";
import yaml from "js-yaml";
const dir = new URL("./glossary/", import.meta.url);
export default function () {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".yml")).map((f) => {
    const slug = f.replace(/\.yml$/, "");
    return { ...yaml.load(fs.readFileSync(new URL(f, dir), "utf8")), slug, url: `/glossary/${slug}/` };
  }).sort((a, b) => a.term.localeCompare(b.term));
}
