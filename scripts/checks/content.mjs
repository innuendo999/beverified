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
  { name: "placeholder graphic", re: /product screenshot\s*[—-]\s*dashboard view/i },
  { name: "lorem ipsum", re: /lorem ipsum/i },
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
  const text = readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  for (const { name, re } of PATTERNS) {
    if (re.test(text)) {
      hits++;
      console.log(`${file}: ${name}`);
    }
  }
}
console.log(`content check: ${hits} issue(s)${strict ? "" : " (report only)"}`);
process.exit(strict && hits ? 1 : 0);
