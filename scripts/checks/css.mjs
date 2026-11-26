// Fails when a stylesheet has unbalanced braces or an unclosed comment: one missing "}" silently drops every rule after it
// (happened 2026-11-27, after a merge of two appends to v3.css). Run in deploy.yml and npm run check.
import fs from "node:fs";
const files = process.argv.slice(2).length ? process.argv.slice(2) : ["src/assets/css/v3.css"];
let bad = 0;
for (const f of files) {
  const s = fs.readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  if (/\/\*/.test(s)) { console.log(`${f}: unclosed comment`); bad++; continue; }
  let d = 0, line = 1, open = [];
  for (const c of s) {
    if (c === "\n") line++;
    else if (c === "{") open.push(line);
    else if (c === "}") { if (!open.pop()) { console.log(`${f}:${line}: "}" with no matching "{"`); bad++; } }
  }
  for (const l of open.slice(-3)) { console.log(`${f}:${l}: "{" never closed`); bad++; }
}
console.log(`css check: ${bad} issue(s)`);
process.exit(bad ? 1 : 0);
