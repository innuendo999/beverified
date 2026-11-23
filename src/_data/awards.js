import fs from "node:fs";
import { badgeSvg, SIZES } from "../_lib/badge-svg.js";
import { currentAwards } from "../_lib/awards.js";

const mrz = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]+/g, "<").replace(/^<|<$/g, "");
// Badge files and the /about/#awards list. Award rules: src/_lib/awards.js. Spec docs/award-badges.md.
export default function () {
  const { cfg, out, held, P } = currentAwards();
  const today = new Date().toISOString().slice(0, 10);
  const ended = today > cfg.until;
  const issued = JSON.parse(fs.readFileSync(new URL("./awardsIssued.json", import.meta.url), "utf8"));
  const byId = Object.fromEntries(out.map((a) => [a.id, a]));
  const files = [];
  const badges = [];
  for (const id of [...new Set([...issued, ...out.map((a) => a.id)])].sort()) {
    const [key, slug] = id.split("/").length > 2 ? [id.split("/").slice(0, -1).join("/"), id.split("/").pop()] : id.split("/");
    const a = byId[id], live = !!a && !ended;
    const name = a?.name || P[slug]?.name || "BeVerified";
    const view = live
      ? { award: a.award, ranking: a.ranking, short: a.short, year: a.year, mrz: `AWD<<${mrz(a.short.replace(/\s\d{4}$/, ""))}<<${a.year}<<${mrz(name)}<<<<<<<<<<<<<<`, label: `${a.award}, ${a.ranking}, BeVerified`, expired: false }
      : { award: "Reviewed on BeVerified", ranking: "Independent KYC and AML reviews", short: "Reviews", year: cfg.year, mrz: `REV<<${mrz(name)}<<<<<<<<<<<<<<<<<<<<<<<<`, label: `${name} is reviewed on BeVerified`, expired: true };
    const base = `/badges/${key}/${slug}`;
    for (const size of Object.keys(SIZES)) for (const theme of ["light", "dark"])
      files.push({ path: `${base}-${size}-${theme}.svg`, svg: badgeSvg(view, size, theme) });
    files.push({ path: `${base}.svg`, svg: badgeSvg(view, "card", "light") });
    if (live) badges.push({ ...a, base, href: `${a.rankingUrl}` });
  }
  const groups = [];
  for (const b of badges) { let g = groups.find((x) => x.key === b.key); if (!g) groups.push((g = { key: b.key, title: b.ranking, items: [] })); g.items.push(b); }
  groups.forEach((g) => g.items.sort((x, y) => x.rank - y.rank));
  return { year: cfg.year, until: cfg.until, ended, files, badges, groups, held, sizes: Object.keys(SIZES) };
}
