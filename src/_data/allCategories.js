// Category page records keyed by ranking key (e.g. "aml/banks"). Article front matter shadows `categories`.
import fs from "node:fs";
import yaml from "js-yaml";
const dir = new URL("./categories/", import.meta.url);
export default function () {
  const out = {};
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))) {
    const c = yaml.load(fs.readFileSync(new URL(f, dir), "utf8"));
    out[c.slug] = c;
  }
  return out;
}
