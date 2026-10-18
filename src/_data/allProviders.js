// All provider records keyed by slug. Same data as the `providers` global, under a name that
// article front matter (`providers: [slugs]`) cannot shadow. Use this in shared includes.
import fs from "node:fs";
import yaml from "js-yaml";
const dir = new URL("./providers/", import.meta.url);
export default function () {
  const out = {};
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".yml")))
    out[f.replace(/\.yml$/, "")] = yaml.load(fs.readFileSync(new URL(f, dir), "utf8"));
  return out;
}
