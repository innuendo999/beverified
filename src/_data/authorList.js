// Authors that have a public page (url set in authors.yml), as a list for pagination.
import fs from "node:fs";
import yaml from "js-yaml";
export default function () {
  const all = yaml.load(fs.readFileSync(new URL("./authors.yml", import.meta.url), "utf8")) || {};
  return Object.entries(all).filter(([, a]) => a && a.url).map(([key, a]) => ({ key, ...a }));
}
