// Award list for badges (owner, 2026-11-23). Awards come only from rankings.yml; Editor's Choice only at rank 1.
// Every award ever issued is listed in awardsIssued.json, so its badge URL keeps working: when the award ends
// (ranking change, exclude list, or after site.json v3.awards.until) the same URL serves "Reviewed on BeVerified".
// Register new awards with: node scripts/awards-register.mjs   (checked by scripts/checks/awards.mjs). Spec docs/award-badges.md.
import fs from "node:fs";
import yaml from "js-yaml";


const read = (rel) => yaml.load(fs.readFileSync(new URL(rel, import.meta.url), "utf8"));
const mrz = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]+/g, "<").replace(/^<|<$/g, "");

export function currentAwards() {
  const site = JSON.parse(fs.readFileSync(new URL("../_data/site.json", import.meta.url), "utf8"));
  const cfg = site.v3.awards, rankings = read("../_data/rankings.yml"), home = read("../_data/home.yml");
  const short = Object.fromEntries([...(home.use_cases || []).map((u) => [u.slug, u.name]), ...(home.regions || []).filter((r) => r.slug).map((r) => [r.slug, r.short || r.name])]);
  const dir = new URL("../_data/providers/", import.meta.url), P = {};
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".yml"))) { const d = yaml.load(fs.readFileSync(new URL(f, dir), "utf8")); if (d) P[d.slug] = d; }
  const out = [], held = [];
  for (const [key, list] of Object.entries(rankings)) {
    (list.providers || []).forEach((e, i) => {
      if (!e.award || !e.slug || P[e.slug]?.status !== "published") return;
      const id = `${key}/${e.slug}`;
      if (e.award === "Editor's Choice" && i !== 0) { held.push({ id, why: "Editor's Choice is not at rank 1" }); return; }
      if (i > 2) return; // owner, 2026-11-23: badges only for the top 3 of each ranking (Editor's Choice + ranks 2 and 3)
      if ((cfg.exclude || []).includes(id)) { held.push({ id, why: "held back by site.json v3.awards.exclude" }); return; }
      out.push({ id, key, slug: e.slug, name: P[e.slug].name, award: e.award, rank: i + 1,
        ranking: `${list.title.replace(/\s+in\s+\d{4}$/, "")} ${cfg.year}`, rankingUrl: `/providers/${key}/`,
        short: `${short[key] || key} ${cfg.year}`, year: cfg.year });
    });
  }
  return { cfg, out, held, P };
}

