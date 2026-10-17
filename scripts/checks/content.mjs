// Blocking content checks on the built site (_site).
// Usage: node scripts/checks/content.mjs [--strict]
// Without --strict it only reports; switch CI to --strict once the live
// content is clean (see docs/redesign-plan.md, section 3).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "_site";
const SKIP = ["backup-files"];
const PATTERNS = [
  { name: "internal editorial note", re: /Editorial note \(pre-publish\)/i },
  { name: "TODO / TBD", re: /\b(TODO|TBD)\b/ },
  { name: "pending verification", re: /pending verification/i },
  { name: "confirm before publish", re: /confirm[^.<]{0,40}before (this page goes live|publish)/i },
  { name: "verify before publish", re: /verif(y|ied)[^.<]{0,40}before publish/i },
  { name: "template placeholder", re: /\{[a-z_]+(\.[a-z_\[\]]+)*\}/ },
  { name: "placeholder graphic", re: /product screenshot\s*[—-]\s*dashboard view/i },
  { name: "lorem ipsum", re: /lorem ipsum/i },
  { name: "em/en dash in copy (humanizer rule)", re: /(?<!A)[\u2014\u2013](?!Z)/, text: true },
];

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.includes(name)) continue;
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

const strict = process.argv.includes("--strict");
let hits = 0;
for (const file of htmlFiles(ROOT)) {
  const html = readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  const visible = html.replace(/<[^>]+>/g, " ");
  for (const { name, re, text } of PATTERNS) {
    if (re.test(text ? visible : html)) {
      hits++;
      console.log(`${file}: ${name}`);
    }
  }
}
console.log(`content check: ${hits} issue(s)${strict ? "" : " (report only)"}`);
process.exit(strict && hits ? 1 : 0);
