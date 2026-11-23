// Award badge SVGs (owner, 2026-11-23; canvas "BeVerified: award badges for providers, design and rules").
// Plain SVG with system fonts: an <img> on another site cannot load our webfont. Text width is estimated so long
// award names wrap or shrink instead of overflowing.

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const W = (s, px, bold) => s.length * px * (bold ? 0.58 : 0.53); // rough average glyph width

function wrap(text, px, bold, max, lines = 2) {
  const words = text.split(" "), out = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (W(t, px, bold) <= max || !cur) cur = t; else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  return out.length <= lines ? out : null;
}
// Largest size (down to min) at which the text fits in `lines` lines.
function fit(text, px, min, bold, max, lines) {
  for (let s = px; s >= min; s -= 0.5) { const l = wrap(text, s, bold, max, lines); if (l) return { px: s, lines: l }; }
  return { px: min, lines: wrap(text, min, bold, max, 9) || [text] };
}

const THEMES = {
  light: { bg: "#FFFFFF", head: "#F7F9FC", line: "#DDE3EC", soft: "#E8EDF4", ink: "#0B1730", body: "#3D4A63", muted: "#5F6B83", blue: "#1F4FD8" },
  dark: { bg: "#0B1730", head: "#16244A", line: "#2A3A63", soft: "#2A3A63", ink: "#FFFFFF", body: "#C9D2E0", muted: "#9AA6BA", blue: "#7FA2FF" },
};
const logo = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s / 24})"><rect x="3" y="12" width="4.5" height="9" rx="1" fill="${c.ink}"/><rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="${c.ink}"/><rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="${c.blue}"/></g>`;
const frame = (x, y, s, c, check = true) => `<g transform="translate(${x} ${y}) scale(${s / 40})" fill="none" stroke-linecap="round"><path d="M2 11V5a3 3 0 0 1 3-3h6M29 2h6a3 3 0 0 1 3 3v6M38 29v6a3 3 0 0 1-3 3h-6M11 38H5a3 3 0 0 1-3-3v-6" stroke="${c.blue}" stroke-width="2.2"/>${check ? `<path d="M13 20.5l4.5 4.5L27 15.5" stroke="${c.ink}" stroke-width="2.4" stroke-linejoin="round"/>` : `<circle cx="20" cy="16" r="5.5" stroke="${c.ink}" stroke-width="1.8"/><path d="M10.5 31c1.6-4.6 5.1-7 9.5-7s7.9 2.4 9.5 7" stroke="${c.ink}" stroke-width="1.8"/>`}</g>`;
const tspans = (lines, x, y, lh) => lines.map((l, i) => `<tspan x="${x}" y="${y + i * lh}">${esc(l)}</tspan>`).join("");
const open = (w, h, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>`;

// a = { award, ranking, short, mrz, label, expired }
export const SIZES = {
  card(a, c) {
    const t = fit(a.award, 16, 12, true, 222, 2), r = fit(a.ranking, 12, 10, false, 222, 2);
    const h = 40 + 14 + t.lines.length * (t.px + 4) + r.lines.length * (r.px + 3) + 26;
    const ty = 40 + 14 + t.px;
    return open(300, h, a.label) +
      `<rect x="0.5" y="0.5" width="299" height="${h - 1}" rx="14" fill="${c.bg}" stroke="${c.line}"/>` +
      `<path d="M14.5 0.5h271a14 14 0 0 1 14 14V40H0.5V14.5a14 14 0 0 1 14-14z" fill="${c.head}"/><line x1="0.5" y1="40" x2="299.5" y2="40" stroke="${c.soft}"/>` +
      logo(12, 11, 18, c) + `<text x="36" y="25" font-family="${FONT}" font-size="13" font-weight="600" fill="${c.ink}">BeVerified</text>` +
      `<text x="286" y="25" text-anchor="end" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="0.6" fill="${c.muted}">${a.expired ? "REVIEW" : "AWARD " + a.year}</text>` +
      frame(14, 52, 34, c, !a.expired) +
      `<text font-family="${FONT}" font-size="${t.px}" font-weight="700" fill="${c.ink}">${tspans(t.lines, 62, ty, t.px + 4)}</text>` +
      `<text font-family="${FONT}" font-size="${r.px}" fill="${c.body}">${tspans(r.lines, 62, ty + (t.lines.length - 1) * (t.px + 4) + r.px + 6, r.px + 3)}</text>` +
      `<text x="14" y="${h - 10}" font-family="${MONO}" font-size="10" letter-spacing="1.2" fill="${c.muted}">${esc(a.mrz.slice(0, 34))}</text></svg>`;
  },
  square(a, c) {
    const t = fit(a.award, 16, 11, true, 172, 3), r = fit(a.expired ? a.ranking : a.short, 12, 9.5, false, 172, 1);
    const block = 48 + 10 + t.lines.length * (t.px + 3) + 4 + r.lines.length * (r.px + 3);
    const top = 38 + Math.max(6, (200 - 38 - 22 - block) / 2);
    const ty = top + 48 + 10 + t.px;
    return open(200, 200, a.label) +
      `<rect x="0.5" y="0.5" width="199" height="199" rx="16" fill="${c.bg}" stroke="${c.line}"/>` +
      `<path d="M16.5 0.5h167a16 16 0 0 1 16 16V36H0.5V16.5a16 16 0 0 1 16-16z" fill="${c.head}"/><line x1="0.5" y1="36" x2="199.5" y2="36" stroke="${c.soft}"/>` +
      logo(62, 10, 16, c) + `<text x="82" y="23" font-family="${FONT}" font-size="12" font-weight="600" fill="${c.ink}">BeVerified</text>` +
      frame(76, top, 48, c, !a.expired) +
      `<text text-anchor="middle" font-family="${FONT}" font-size="${t.px}" font-weight="700" fill="${c.ink}">${tspans(t.lines, 100, ty, t.px + 3)}</text>` +
      `<text text-anchor="middle" font-family="${FONT}" font-size="${r.px}" fill="${c.body}">${tspans(r.lines, 100, ty + (t.lines.length - 1) * (t.px + 3) + r.px + 6, r.px + 3)}</text>` +
      `<text x="100" y="191" text-anchor="middle" font-family="${MONO}" font-size="9" letter-spacing="1" fill="${c.muted}">${esc(a.mrz.slice(0, 26))}</text></svg>`;
  },
  small(a, c) {
    const t = fit(a.award, 12, 9.5, true, 104, 3);
    const block = 14 + 6 + 30 + 6 + t.lines.length * (t.px + 2) + 4 + 11;
    const top = (120 - block) / 2;
    const ty = top + 14 + 6 + 30 + 6 + t.px;
    return open(120, 120, a.label) +
      `<rect x="0.5" y="0.5" width="119" height="119" rx="14" fill="${c.bg}" stroke="${c.line}"/>` +
      logo(31, top, 12, c) + `<text x="46" y="${top + 10}" font-family="${FONT}" font-size="10" font-weight="600" fill="${c.ink}">BeVerified</text>` +
      frame(45, top + 20, 30, c, !a.expired) +
      `<text text-anchor="middle" font-family="${FONT}" font-size="${t.px}" font-weight="700" fill="${c.ink}">${tspans(t.lines, 60, ty, t.px + 2)}</text>` +
      `<text x="60" y="${ty + (t.lines.length - 1) * (t.px + 2) + 13}" text-anchor="middle" font-family="${FONT}" font-size="10" fill="${c.body}">${esc(a.short)}</text></svg>`;
  },
  banner(a, c) {
    const kicker = a.expired ? "REVIEW" : "AWARD " + a.year;
    const room = W(a.award, 15, true) <= 200 && W(a.ranking, 12, false) <= 200;
    const max = room ? 200 : 284;
    const t = fit(a.award, 15, 11, true, max, 1), r = fit(a.ranking, 12, 9.5, false, max, 1);
    return open(468, 60, a.label) +
      `<rect x="0.5" y="0.5" width="467" height="59" rx="10" fill="${c.bg}" stroke="${c.line}"/>` +
      `<path d="M10.5 0.5H118V59.5H10.5a10 10 0 0 1-10-10v-39a10 10 0 0 1 10-10z" fill="${c.head}"/><line x1="118" y1="0.5" x2="118" y2="59.5" stroke="${c.soft}"/>` +
      logo(14, 21, 18, c) + `<text x="37" y="35" font-family="${FONT}" font-size="13" font-weight="600" fill="${c.ink}">BeVerified</text>` +
      frame(130, 16, 28, c, !a.expired) +
      `<text x="168" y="${r.lines.length ? 28 : 35}" font-family="${FONT}" font-size="${t.px}" font-weight="700" fill="${c.ink}">${esc(t.lines[0])}</text>` +
      `<text x="168" y="45" font-family="${FONT}" font-size="${r.px}" fill="${c.body}">${esc(r.lines[0])}</text>` +
      (room ? `<text x="454" y="34" text-anchor="end" font-family="${MONO}" font-size="10" letter-spacing="1.2" fill="${c.muted}">${kicker}</text>` : "") + `</svg>`;
  },
  compact(a, c) {
    const label = a.award, sub = a.short;
    const w = Math.ceil(36 + W(label, 13, true) + 10 + W(sub, 12, false) + 14);
    return open(w, 36, a.label) +
      `<rect x="0.5" y="0.5" width="${w - 1}" height="35" rx="10" fill="${c.bg}" stroke="${c.line}"/>` +
      logo(10, 10, 16, c) +
      `<text x="32" y="23" font-family="${FONT}" font-size="13" font-weight="600" fill="${c.ink}">${esc(label)}<tspan dx="8" font-size="12" font-weight="400" fill="${c.body}">${esc(sub)}</tspan></text></svg>`;
  },
};

export function badgeSvg(a, size, theme) { return SIZES[size](a, THEMES[theme]); }
