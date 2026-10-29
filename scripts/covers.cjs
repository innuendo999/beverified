// Generates blog cover images (1600x900, 16:9) for every article in
// src/guide, src/news, src/publications into src/assets/img/covers/<slug>.png.
// A cover does NOT repeat the article title: it shows a short topic label
// (front matter cover_label, 2-4 words), a flat illustration (cover_motif, see
// scripts/cover-motifs.cjs) and a background from the v3.css palette
// (cover_palette: light | warm | violet | dark | accent; default cycles per section).
//
// Usage: node scripts/covers.cjs            (only missing covers)
//        node scripts/covers.cjs --force    (re-render all)
//        node scripts/covers.cjs --file src/guide/x.md
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src/assets/img/covers");
const FONT = path.join(ROOT, "src/assets/fonts/Geist-Variable.woff2");
const SECTIONS = { guide: "Guide", news: "News", publications: "Research" };
const T = { ink: "#14141A", body: "#4A4A55", muted: "#6A6A74", bg: "#F7F6F3", line: "#E6E4DF", barA: "#DAD7D1", barB: "#CFCCC6", accent: "#5B2BD9", surface: "#FFFFFF" };

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.includes("--file") ? path.resolve(args[args.indexOf("--file") + 1]) : null;

function articles() {
  const list = [];
  for (const section of Object.keys(SECTIONS)) {
    const dir = path.join(ROOT, "src", section);
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const file = path.join(dir, f);
      if (only && file !== only) continue;
      const fm = yaml.load(fs.readFileSync(file, "utf8").split(/^---$/m)[1]);
      list.push({ section, slug: f.replace(/\.md$/, ""), title: fm.title, label: fm.cover_label || fm.title, motif: fm.cover_motif || "list", palette: fm.cover_palette });
    }
  }
  // Palette: explicit cover_palette, else the section's cycle by position in the folder.
  const seen = {};
  for (const a of list.sort((x, y) => x.slug.localeCompare(y.slug))) {
    const k = (seen[a.section] = (seen[a.section] ?? -1) + 1);
    a.palette = a.palette || ORDER[a.section][k % ORDER[a.section].length];
  }
  return list;
}

const { MOTIFS } = require("./cover-motifs.cjs");

// Backgrounds from the v3.css palette. Each section cycles through its own order so neighbouring cards differ.
const PAL = {
  light:  { bg: "#F7F6F3", s: "#FFFFFF", d: "#E2DFD8", i: "#14141A", a: "#5B2BD9", a2: "#E9E3FB", m: "#D6D3CC", text: "#14141A", sub: "#6A6A74" },
  warm:   { bg: "#EFEDE8", s: "#FFFFFF", d: "#D6D3CC", i: "#14141A", a: "#5B2BD9", a2: "#E9E3FB", m: "#DDD9D1", text: "#14141A", sub: "#6A6A74" },
  violet: { bg: "#F3F0FC", s: "#FFFFFF", d: "#DCD3F7", i: "#14141A", a: "#5B2BD9", a2: "#E4DCFB", m: "#D9D1F2", text: "#14141A", sub: "#5B2BD9" },
  dark:   { bg: "#14141A", s: "#2A2A33", d: "#050507", i: "#F7F6F3", a: "#7B57F0", a2: "#3A2F66", m: "#4A4A55", text: "#F7F6F3", sub: "#A99BF5" },
  accent: { bg: "#5B2BD9", s: "#FFFFFF", d: "#4A1FBF", i: "#14141A", a: "#14141A", a2: "#E9E3FB", m: "#DAD2F7", text: "#FFFFFF", sub: "#E9E3FB" },
};
const ORDER = { news: ["dark", "violet", "warm", "accent"], guide: ["violet", "light", "dark", "warm"], publications: ["accent", "warm", "violet", "dark"] };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html(a) {
  const p = PAL[a.palette];
  const motif = MOTIFS[a.motif];
  if (!motif) throw new Error(`${a.slug}: unknown cover_motif "${a.motif}" (see scripts/cover-motifs.cjs)`);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url('${FONT_URL}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 675px; overflow: hidden; background: ${p.bg}; font-family: Geist, sans-serif; -webkit-font-smoothing: antialiased; }
.wrap { position: relative; width: 1200px; height: 675px; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; color: ${p.text}; }
.top { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 600; letter-spacing: -0.03em; }
.kicker { margin-left: 14px; padding-left: 16px; border-left: 2px solid ${p.sub}; font-size: 17px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${p.sub}; }
.label { width: 470px; font-size: 64px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.02; }
.art { position: absolute; right: 56px; top: 50%; transform: translateY(-50%); width: 560px; height: 560px; }
</style></head><body><div class="wrap">
  <div class="top"><svg width="30" height="30" viewBox="0 0 24 24"><rect x="3" y="12" width="4.5" height="9" rx="1" fill="${p.text}"/><rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="${p.text}"/><rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="${a.palette === "accent" ? "#FFFFFF" : p.a}"/></svg>BeVerified<span class="kicker">${SECTIONS[a.section]}</span></div>
  <div class="label" id="t">${esc(a.label)}</div>
  <svg class="art" viewBox="0 0 560 560">${motif({ ...p })}</svg>
</div></body></html>`;
}

let FONT_URL = "";
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const list = articles().filter((a) => force || only || !fs.existsSync(path.join(OUT, `${a.slug}.png`)));
  if (!list.length) return console.log("covers: nothing to render");
  FONT_URL = "data:font/woff2;base64," + fs.readFileSync(FONT).toString("base64");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 4 / 3 });
  for (const a of list) {
    await page.setContent(html(a), { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const t = document.getElementById("t");
      for (let px = 64; px >= 44; px -= 2) { t.style.fontSize = px + "px"; if (t.getClientRects().length && Math.round(t.offsetHeight / (px * 1.02)) <= 2) break; }
    });
    await page.screenshot({ path: path.join(OUT, `${a.slug}.png`) });
    console.log(`covers: ${a.section}/${a.slug}.png`);
  }
  await browser.close();
})();
