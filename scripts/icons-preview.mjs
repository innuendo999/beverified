// Builds design/icons.html: the whole icon set from src/_lib/icons.js, grouped, plus the meaning maps
// and a few usage samples. Not deployed. Run: node scripts/icons-preview.mjs
import fs from "node:fs";
import path from "node:path";
import { ICONS, MAP, renderIcon } from "../src/_lib/icons.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const css = fs.readFileSync(path.join(root, "src/assets/css/v3.css"), "utf8").match(/\/\* -{10} Icons[\s\S]*$/)[0];
const groups = {};
for (const [name, ic] of Object.entries(ICONS)) (groups[ic.group] ||= []).push([name, ic]);

const cell = ([name, ic]) => `<figure class="cell"><span class="art">${renderIcon(name, "", null, "i--32")}</span><figcaption><b>${ic.label}</b><code>${name}</code></figcaption></figure>`;
const mapRows = (kind) => Object.entries(MAP[kind]).map(([k, n]) => `<li>${renderIcon(n, "", null, "i--20")}<code>${k}</code><span>→ ${n}</span></li>`).join("");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>BeVerified icon library</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
:root { --ink:#0B1730; --body:#3D4A63; --muted:#5F6B83; --line:#DDE3EC; --bg:#F3F6FA; --accent:#1F4FD8; --accent-soft:#E9EFFD; --ok:#0B7A5C; --ok-soft:#E6F4EE; }
body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.5 Geist, ui-sans-serif, system-ui, sans-serif; }
main { max-width:1200px; margin:0 auto; padding:48px 32px 96px; }
h1 { font-size:40px; letter-spacing:-.03em; margin:0 0 8px; } h2 { font-size:20px; margin:48px 0 16px; }
p.lede { color:var(--body); max-width:720px; margin:0 0 8px; }
code { font:12px ui-monospace, Menlo, monospace; color:var(--muted); }
.grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:10px; }
.cell { margin:0; background:#fff; border:1px solid var(--line); border-radius:12px; padding:16px 12px 12px; display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center; }
.cell figcaption { display:flex; flex-direction:column; gap:2px; font-size:13px; }
.art { color:var(--ink); }
.maps { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; }
.maps ul { list-style:none; margin:0; padding:16px; background:#fff; border:1px solid var(--line); border-radius:12px; display:flex; flex-direction:column; gap:8px; }
.maps li { display:grid; grid-template-columns:24px 1fr auto; gap:10px; align-items:center; font-size:14px; } .maps li span { color:var(--muted); font-size:13px; }
.samples { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; }
.card { background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:12px; font-size:14px; }
.row { display:flex; align-items:center; gap:10px; }
.chip { display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:500; border-radius:5px; padding:2px 8px; }
.chip--ok { color:var(--ok); background:var(--ok-soft); } .chip--plain { color:var(--body); background:#EBEFF5; }
.meta { color:var(--muted); display:flex; gap:14px; flex-wrap:wrap; } .meta span { display:inline-flex; align-items:center; gap:6px; }
.sizes { display:flex; align-items:flex-end; gap:24px; color:var(--ink); }
${css}
</style></head><body><main>
<h1>Icon library</h1>
<p class="lede">${Object.keys(ICONS).length} icons on a 24 grid, stroke only, colour from the text. Source: <code>src/_lib/icons.js</code>. In templates: <code>{% icon "liveness" %}</code>, <code>{% icon "screening", "AML screening" %}</code>, <code>{% iconFor "category", "kyb" %}</code>.</p>
<h2>Sizes</h2>
<div class="sizes">${["i--16", "i--20", "i--24", "i--32"].map((c) => `<span>${renderIcon("liveness", "", null, c)}<br><code>${c}</code></span>`).join("")}<span class="i-tile">${renderIcon("company")}</span><code>.i-tile</code></div>
${Object.entries(groups).map(([g, list]) => `<h2>${g}</h2><div class="grid">${list.map(cell).join("")}</div>`).join("\n")}
<h2>By meaning</h2>
<div class="maps"><ul><li><b style="grid-column:1/-1">Rankings (category)</b></li>${mapRows("category")}</ul><ul><li><b style="grid-column:1/-1">Article section</b></li>${mapRows("section")}</ul><ul><li><b style="grid-column:1/-1">Evidence level</b></li>${mapRows("evidence")}</ul></div>
<h2>Samples</h2>
<div class="samples">
 <div class="card"><b>Review: independent tests</b>
  <span class="row"><span class="chip chip--ok">${renderIcon("check", "", null, "i--16")}iBeta liveness L3</span><span class="chip chip--ok">${renderIcon("check", "", null, "i--16")}UK DIATF</span></span>
  <span class="row"><span class="chip chip--plain">${renderIcon("not-found", "", null, "i--16")}SOC 2: vendor-stated</span></span></div>
 <div class="card"><b>Rankings list</b>
  ${["kyc", "kyb", "aml", "travel-rule", "know-your-agent"].map((k) => `<span class="row"><span class="i-tile">${renderIcon(MAP.category[k])}</span>${k}</span>`).join("")}</div>
 <div class="card"><b>News card meta</b>
  <span class="meta"><span>${renderIcon("news", "", null, "i--16")}News</span><span>${renderIcon("calendar", "", null, "i--16")}16 Nov 2026</span><span>${renderIcon("regulation", "", null, "i--16")}FinCEN</span></span>
  <span class="meta"><span>${renderIcon("guide", "", null, "i--16")}Guide</span><span>${renderIcon("clock", "", null, "i--16")}9 min read</span></span>
  <span class="meta"><span>${renderIcon("incident", "", null, "i--16")}Incident</span><span>${renderIcon("refresh", "", null, "i--16")}Re-checked</span></span></div>
</div>
</main></body></html>`;

fs.mkdirSync(path.join(root, "design"), { recursive: true });
fs.writeFileSync(path.join(root, "design/icons.html"), html);
console.log(`design/icons.html: ${Object.keys(ICONS).length} icons`);
