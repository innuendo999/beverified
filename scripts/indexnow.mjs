// IndexNow (Bing, Yandex, Seznam, Naver, Yep; not Google): tell search engines which URLs changed.
// Key: site.json v3.indexnow.key, served at /<key>.txt by src/indexnow-key.njk.
//   node scripts/indexnow.mjs --diff <old-sitemap.xml> <new-sitemap.xml>   print new or changed URLs (lastmod differs)
//   node scripts/indexnow.mjs --all <sitemap.xml>                          print every URL
//   node scripts/indexnow.mjs --submit <urls.txt>                          POST the list (max 10,000 per request)
import fs from "node:fs";

const site = JSON.parse(fs.readFileSync(new URL("../src/_data/site.json", import.meta.url), "utf8"));
const { key, endpoint } = site.v3.indexnow;
const read = (f) => (f && fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "");
const parse = (xml) => {
  const out = new Map();
  for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)) out.set(m[1].trim(), (m[2] || "").trim());
  return out;
};
const [mode, a, b] = process.argv.slice(2);

if (mode === "--diff" || mode === "--all") {
  const next = parse(read(mode === "--all" ? a : b));
  const prev = mode === "--all" ? new Map() : parse(read(a));
  for (const [url, lastmod] of next) if (!prev.has(url) || prev.get(url) !== lastmod) console.log(url);
} else if (mode === "--submit") {
  const urls = read(a).split("\n").map((s) => s.trim()).filter(Boolean);
  if (!urls.length) { console.log("indexnow: nothing to submit"); process.exit(0); }
  const host = new URL(urls[0]).hostname;
  for (let i = 0; i < urls.length; i += 10000) {
    const urlList = urls.slice(i, i + 10000);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
    });
    console.log(`indexnow: ${urlList.length} URL(s) -> HTTP ${res.status}`);
    // 200 accepted, 202 accepted with key check pending; anything else is reported but does not fail the deploy.
    if (![200, 202].includes(res.status)) console.log(await res.text());
  }
} else {
  console.log("usage: --diff old.xml new.xml | --all sitemap.xml | --submit urls.txt");
  process.exit(1);
}
