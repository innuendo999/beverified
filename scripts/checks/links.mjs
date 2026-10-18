// Internal link check on the built site: every href="/..." must resolve to a
// built page or file. Usage: node scripts/checks/links.mjs [--strict]
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = "_site";
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== "backup-files") walk(p); }
    else if (name.endsWith(".html")) files.push(p);
  }
})(ROOT);

const broken = new Map();
for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = join(ROOT, href);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, "index.html")));
    if (!ok) {
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(file.replace(ROOT, "").replace(/index\.html$/, ""));
    }
  }
}
for (const [href, from] of broken) console.log(`${href}  <- ${[...from].join(", ")}`);
console.log(`link check: ${broken.size} broken internal link(s)`);
process.exit(process.argv.includes("--strict") && broken.size ? 1 : 0);
