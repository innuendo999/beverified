// Every current award must be in src/_data/awardsIssued.json (run node scripts/awards-register.mjs), so badge URLs stay stable.
import fs from "node:fs";
import { currentAwards } from "../../src/_lib/awards.js";
const issued = JSON.parse(fs.readFileSync(new URL("../../src/_data/awardsIssued.json", import.meta.url), "utf8"));
const { out, held } = currentAwards();
const missing = out.filter((a) => !issued.includes(a.id));
missing.forEach((a) => console.log(`awards: ${a.id} not registered (run node scripts/awards-register.mjs)`));
held.forEach((h) => console.log(`awards: held ${h.id}: ${h.why}`));
console.log(`awards: ${out.length} live, ${held.length} held, ${missing.length} issue(s)`);
process.exit(missing.length ? 1 : 0);
