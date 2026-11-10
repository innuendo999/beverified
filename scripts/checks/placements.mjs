// Checks src/_data/placements.yml (sponsored slots in the homepage use-case panel).
// Rules live in src/_lib/placements.js. node scripts/checks/placements.mjs   (exits 1 on any issue)
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { placementIssues } from "../../src/_lib/placements.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const load = (f) => yaml.load(fs.readFileSync(path.join(root, f), "utf8"));
const placements = load("src/_data/placements.yml") || [];
const rankings = load("src/_data/rankings.yml");
const home = load("src/_data/home.yml");
const providers = {};
for (const f of fs.readdirSync(path.join(root, "src/_data/providers")).filter((f) => f.endsWith(".yml")))
  providers[f.replace(/\.yml$/, "")] = load(`src/_data/providers/${f}`);

if (!Array.isArray(placements)) { console.log("placements.yml must be a list"); process.exit(1); }
const issues = placementIssues(placements, { rankings, providers, useCases: home.use_cases });
issues.forEach((m) => console.log(m));
console.log(`placements: ${placements.length} slot(s), ${issues.length} issue(s)`);
process.exit(issues.length ? 1 : 0);
