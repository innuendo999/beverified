// Generates blog cover images (1600x900, 16:9) for every article in
// src/guide, src/news, src/publications into src/assets/img/covers/<slug>.png.
// Style matches the default og:image and the LinkedIn visuals: warm off-white
// background, BeVerified mark, large Geist headline, ascending bars with one
// violet accent bar. Colours are the v3.css tokens.
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
      list.push({ section, slug: f.replace(/\.md$/, ""), title: fm.title, topics: fm.topics || [] });
    }
  }
  return list;
}

// Deterministic per-slug variation of the bar motif, so covers differ but stay on brand.
function bars(slug, section) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const n = section === "publications" ? 4 : 3;
  const heights = [];
  for (let i = 0; i < n; i++) {
    const base = 0.34 + (0.62 * i) / (n - 1);
    const jitter = (((h >> (i * 5)) & 31) / 31 - 0.5) * 0.1;
    heights.push(Math.min(0.96, Math.max(0.28, base + (i === n - 1 ? 0 : jitter))));
  }
  heights[n - 1] = 1;
  return heights;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html(a, fontUrl) {
  const hs = bars(a.slug, a.section);
  const barW = hs.length === 4 ? 66 : 76, gap = 22, maxH = 470;
  const barsHtml = hs.map((v, i) => `<div class="bar" style="height:${Math.round(v * maxH)}px;width:${barW}px;background:${i === hs.length - 1 ? T.accent : i % 2 ? T.barB : T.barA}"></div>`).join(`<div style="width:${gap}px"></div>`);
  const chips = a.topics.slice(0, 3).map((t) => `<span class="chip"># ${esc(t)}</span>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url('${fontUrl}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 675px; overflow: hidden; background: ${T.bg}; font-family: Geist, sans-serif; color: ${T.ink}; -webkit-font-smoothing: antialiased; }
.wrap { position: relative; width: 1200px; height: 675px; padding: 64px 80px 60px; display: flex; flex-direction: column; }
.top { display: flex; align-items: center; gap: 14px; }
.brand { display: flex; align-items: center; gap: 12px; font-size: 30px; font-weight: 600; letter-spacing: -0.03em; }
.pill { margin-left: 18px; font-size: 18px; font-weight: 500; color: ${T.accent}; background: ${T.surface}; border: 1.5px solid ${T.accent}; padding: 5px 14px; border-radius: 999px; }
.title { margin-top: auto; width: 740px; font-weight: 600; letter-spacing: -0.035em; line-height: 1.06; }
.chips { display: flex; gap: 10px; margin-top: 28px; }
.chip { font-size: 17px; color: ${T.body}; background: ${T.surface}; border: 1px solid ${T.line}; padding: 6px 13px; border-radius: 999px; white-space: nowrap; }
.foot { margin-top: 26px; font-size: 22px; color: ${T.muted}; letter-spacing: -0.01em; }
.bars { position: absolute; right: 80px; bottom: 0; display: flex; align-items: flex-end; }
.bar { border-radius: 14px 14px 0 0; }
</style></head><body><div class="wrap">
  <div class="top"><div class="brand"><svg width="34" height="34" viewBox="0 0 24 24"><rect x="3" y="12" width="4.5" height="9" rx="1" fill="${T.ink}"/><rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="${T.ink}"/><rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="${T.accent}"/></svg>BeVerified</div><span class="pill">${SECTIONS[a.section]}</span></div>
  <h1 class="title" id="t">${esc(a.title)}</h1>
  ${chips ? `<div class="chips">${chips}</div>` : ""}
  <div class="foot">beverified.org</div>
  <div class="bars">${barsHtml}</div>
</div>
</body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const list = articles().filter((a) => force || only || !fs.existsSync(path.join(OUT, `${a.slug}.png`)));
  if (!list.length) return console.log("covers: nothing to render");
  const fontUrl = "data:font/woff2;base64," + fs.readFileSync(FONT).toString("base64");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 4 / 3 });
  for (const a of list) {
    await page.setContent(html(a, fontUrl), { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Fit the headline: largest size that stays within 3 lines (4 for small sizes).
      const t = document.getElementById("t");
      for (let s = 66; s >= 38; s -= 2) {
        t.style.fontSize = s + "px";
        if (Math.round(t.scrollHeight / (s * 1.06)) <= (s >= 54 ? 3 : 4)) break;
      }
    });
    await page.screenshot({ path: path.join(OUT, `${a.slug}.png`) });
    console.log(`covers: ${a.section}/${a.slug}.png`);
  }
  await browser.close();
})();
