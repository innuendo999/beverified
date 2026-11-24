// Wordmark size for logo rows (homepage use-case cards, owner 2026-11-24). Wordmarks differ a lot in shape
// (a square "21" next to a long "CryptoSwift"), so each one is sized to the same visual area instead of the
// same height. Reads the pixel size from the PNG header or the SVG viewBox; other formats get null and the
// card shows the provider name as text.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const cache = new Map();

function ratio(src) {
  if (cache.has(src)) return cache.get(src);
  let r = null;
  try {
    const buf = readFileSync(join("src", src));
    if (src.endsWith(".png") && buf.readUInt32BE(12) === 0x49484452) {
      r = buf.readUInt32BE(16) / buf.readUInt32BE(20);
    } else if (src.endsWith(".svg")) {
      const t = buf.toString("utf8"), vb = t.match(/viewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
      if (vb) r = Number(vb[1]) / Number(vb[2]);
    }
  } catch { r = null; }
  if (!(r > 0)) r = null;
  cache.set(src, r);
  return r;
}

// area: target box area in px²; a mark close to square (ratio < 1.5) is an icon and sits next to the name.
export function wordmarkBox(src, { area = 4140, minH = 24, maxH = 44, maxW = 168, iconH = 40 } = {}) {
  const r = src ? ratio(src) : null;
  if (!r) return null;
  if (r < 1.5) return { src, w: Math.round(iconH * r), h: iconH, icon: true };
  let h = Math.min(maxH, Math.max(minH, Math.sqrt(area / r)));
  const w = Math.min(maxW, h * r);
  h = w / r;
  return { src, w: Math.round(w), h: Math.round(h), icon: false };
}
