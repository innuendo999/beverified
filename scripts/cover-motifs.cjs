// Flat "matte slab" illustrations for blog covers (scripts/covers.cjs).
// Every motif draws into a 560x560 box with palette p:
//   s = slab face, d = slab depth (shadow side), i = ink details, a = accent, a2 = soft accent, m = muted lines
// A slab is a rounded shape with a darker copy 12px below it, the same matte look as the homepage hero.

const slab = (x, y, w, h, r, fill, p, depth = 12) =>
  `<rect x="${x}" y="${y + depth}" width="${w}" height="${h}" rx="${r}" fill="${p.d}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const disc = (cx, cy, r, fill, p, depth = 10) =>
  `<circle cx="${cx}" cy="${cy + depth}" r="${r}" fill="${p.d}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const bar = (x, y, w, fill, h = 14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`;
const check = (cx, cy, s, stroke, w = 7) =>
  `<path d="M${cx - s} ${cy} l${s * 0.7} ${s * 0.7} l${s * 1.3} -${s * 1.4}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const line = (x1, y1, x2, y2, stroke, w = 8) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`;

const M = {
  // Screening list with one confirmed row
  list: (p) => slab(90, 60, 380, 440, 30, p.s, p) +
    [0, 1, 2, 3, 4].map((k) => {
      const y = 120 + k * 72, hit = k === 2;
      return (hit ? `<rect x="110" y="${y - 22}" width="340" height="60" rx="16" fill="${p.a2}"/>` : "") +
        `<circle cx="150" cy="${y + 8}" r="16" fill="${hit ? p.a : p.m}"/>` + (hit ? check(150, y + 9, 8, "#fff", 5) : "") +
        bar(186, y, hit ? 200 : 150 + ((k * 37) % 90), hit ? p.i : p.m, 16);
    }).join(""),
  // Three overlapping lists (SDN / SSI / FSE)
  stacks: (p) => [0, 1, 2].map((k) => {
    const x = 60 + k * 70, y = 70 + k * 70, top = k === 2;
    return slab(x, y, 300, 330, 28, top ? p.s : p.s, p) +
      `<rect x="${x + 28}" y="${y + 30}" width="70" height="22" rx="11" fill="${top ? p.a : p.m}"/>` +
      [0, 1, 2, 3].map((r) => bar(x + 28, y + 90 + r * 50, 200 - r * 30, top && r === 1 ? p.a : p.m)).join("");
  }).join(""),
  // Magnifier over a record card
  magnifier: (p) => slab(70, 120, 330, 380, 28, p.s, p) +
    [0, 1, 2, 3, 4].map((r) => bar(110, 190 + r * 52, 230 - (r % 2) * 70, p.m)).join("") +
    `<g transform="rotate(45 400 360)"><rect x="380" y="380" width="44" height="150" rx="22" fill="${p.d}" transform="translate(0 10)"/><rect x="380" y="380" width="44" height="150" rx="22" fill="${p.i}"/></g>` +
    `<circle cx="330" cy="270" r="118" fill="${p.d}" transform="translate(0 10)"/><circle cx="330" cy="270" r="118" fill="${p.a}"/><circle cx="330" cy="270" r="84" fill="${p.a2}"/>` +
    bar(282, 254, 96, p.a, 16) + bar(282, 284, 60, p.a, 16),
  // Coin stack + token
  coin: (p) => [0, 1, 2, 3].map((k) => `<ellipse cx="190" cy="${430 - k * 38}" rx="120" ry="40" fill="${p.d}"/><ellipse cx="190" cy="${418 - k * 38}" rx="120" ry="40" fill="${k === 3 ? p.s : p.s}" stroke="${p.d}" stroke-width="3"/>`).join("") +
    disc(370, 220, 140, p.a, p, 14) + `<circle cx="370" cy="220" r="100" fill="none" stroke="${p.a2}" stroke-width="10"/>` +
    `<path d="M370 150 L430 220 L370 290 L310 220 Z" fill="#fff"/>`,
  // Self-hosted wallet with signed message
  wallet: (p) => slab(70, 200, 400, 270, 34, p.i, p) + slab(70, 150, 360, 90, 26, p.s, p, 8) +
    bar(110, 182, 180, p.m) + `<rect x="330" y="290" width="160" height="96" rx="48" fill="${p.a}"/><circle cx="380" cy="338" r="20" fill="#fff"/>` +
    disc(440, 110, 56, p.a2, p, 8) + check(428, 112, 14, p.a, 9),
  // Bank building
  bank: (p) => `<path d="M60 210 L280 70 L500 210 Z" fill="${p.d}" transform="translate(0 12)"/><path d="M60 210 L280 70 L500 210 Z" fill="${p.s}"/>` +
    `<circle cx="280" cy="160" r="22" fill="${p.a}"/>` +
    [0, 1, 2, 3].map((k) => slab(92 + k * 104, 236, 64, 190, 14, k === 2 ? p.a : p.s, p, 8)).join("") + slab(50, 440, 460, 50, 16, p.i, p, 8),
  // Ongoing loop around an ID
  cycle: (p) => `<circle cx="280" cy="280" r="200" fill="none" stroke="${p.a2}" stroke-width="34"/>` +
    `<path d="M280 80 A200 200 0 0 1 480 280" fill="none" stroke="${p.a}" stroke-width="34" stroke-linecap="round"/><path d="M455 250 L480 300 L510 252" fill="none" stroke="${p.a}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M280 480 A200 200 0 0 1 80 280" fill="none" stroke="${p.i}" stroke-width="34" stroke-linecap="round"/><path d="M105 310 L80 260 L50 308" fill="none" stroke="${p.i}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>` +
    slab(170, 200, 220, 150, 22, p.s, p, 10) + `<circle cx="225" cy="262" r="26" fill="${p.m}"/>` + bar(270, 245, 90, p.i, 14) + bar(270, 275, 64, p.m, 14),
  // Ongoing loop around a company
  cyclebiz: (p) => M.cycle(p).replace(/<rect x="170"[\s\S]*$/, "") +
    slab(200, 190, 160, 180, 18, p.s, p, 10) + [0, 1, 2].map((r) => [0, 1].map((c) => `<rect x="${228 + c * 62}" y="${216 + r * 46}" width="42" height="28" rx="6" fill="${r === 1 && c === 1 ? p.a : p.m}"/>`).join("")).join(""),
  // Payments flowing between nodes, one flagged
  flow: (p) => line(130, 140, 420, 140, p.m, 10) + line(130, 140, 200, 400, p.m, 10) + line(420, 140, 420, 400, p.m, 10) + line(200, 400, 420, 400, p.a, 10) +
    [[130, 140], [420, 140], [200, 400]].map(([x, y]) => slab(x - 60, y - 44, 120, 88, 22, p.s, p, 10) + bar(x - 32, y - 7, 64, p.m)).join("") +
    slab(360, 356, 120, 88, 22, p.a, p, 10) + `<path d="M420 372 L420 410" stroke="#fff" stroke-width="10" stroke-linecap="round"/><circle cx="420" cy="428" r="6" fill="#fff"/>`,
  // Market spend: ascending bars
  bars: (p) => slab(50, 470, 460, 30, 15, p.i, p, 6) +
    [0.35, 0.55, 0.72, 1].map((v, k) => slab(80 + k * 110, 470 - v * 360, 80, v * 360, 18, k === 3 ? p.a : p.s, p, 0)).join("") +
    `<path d="M120 300 L230 230 L340 180 L450 70" fill="none" stroke="${p.i}" stroke-width="8" stroke-linecap="round" stroke-dasharray="2 18"/>`,
  // Threshold: bars under a raised line
  threshold: (p) => [0.3, 0.45, 0.62, 0.5, 0.38].map((v, k) => slab(60 + k * 90, 470 - v * 340, 64, v * 340, 16, p.s, p, 0)).join("") +
    slab(40, 470, 480, 26, 13, p.i, p, 6) + `<path d="M30 250 L530 250" stroke="${p.m}" stroke-width="6" stroke-dasharray="16 14"/>` +
    `<path d="M30 160 L530 160" stroke="${p.a}" stroke-width="10" stroke-linecap="round"/><path d="M470 220 L470 180 M450 195 L470 172 L490 195" stroke="${p.a}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  // Ownership tree (beneficial owners)
  org: (p) => line(280, 150, 280, 230, p.m) + line(120, 230, 440, 230, p.m) + [120, 280, 440].map((x) => line(x, 230, x, 300, p.m)).join("") + line(440, 380, 440, 440, p.m) +
    slab(200, 70, 160, 90, 20, p.i, p, 10) + bar(240, 108, 80, p.s) +
    [120, 280, 440].map((x) => slab(x - 70, 300, 140, 86, 20, p.s, p, 10) + bar(x - 40, 336, 80, p.m)).join("") +
    disc(440, 470, 44, p.a, p, 8) + `<circle cx="440" cy="458" r="12" fill="#fff"/><path d="M418 492 Q440 466 462 492" fill="#fff"/>`,
  // Enforcement: gavel and block
  gavel: (p) => slab(70, 410, 300, 70, 20, p.i, p, 10) +
    `<g transform="rotate(-35 300 240)">` + slab(220, 170, 220, 110, 26, p.a, p, 12) + `<rect x="210" y="160" width="36" height="140" rx="12" fill="${p.s}"/><rect x="414" y="160" width="36" height="140" rx="12" fill="${p.s}"/>` +
    `<rect x="310" y="290" width="40" height="230" rx="20" fill="${p.i}"/></g>` + disc(450, 440, 40, p.a2, p, 6),
  // Country list: globe with pins
  globe: (p) => disc(280, 300, 200, p.s, p, 14) +
    `<g fill="none" stroke="${p.m}" stroke-width="6"><ellipse cx="280" cy="300" rx="90" ry="200"/><path d="M80 300 H480 M110 200 H450 M110 400 H450"/></g>` +
    [[210, 210], [350, 330]].map(([x, y], k) => `<path d="M${x} ${y + 60} C${x - 40} ${y + 10} ${x - 44} ${y - 30} ${x} ${y - 40} C${x + 44} ${y - 30} ${x + 40} ${y + 10} ${x} ${y + 60} Z" fill="${k ? p.a : p.i}"/><circle cx="${x}" cy="${y - 6}" r="14" fill="#fff"/>`).join(""),
  // Draft law: document with seal
  document: (p) => slab(130, 70, 300, 410, 24, p.s, p) + `<path d="M370 70 L430 130 L370 130 Z" fill="${p.m}"/>` +
    bar(170, 120, 150, p.i, 20) + [0, 1, 2, 3, 4, 5].map((r) => bar(170, 180 + r * 40, 220 - (r % 3) * 50, p.m)).join("") +
    disc(400, 430, 64, p.a, p, 8) + `<circle cx="400" cy="430" r="40" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="6 8"/>`,
  // Identity card
  idcard: (p) => slab(50, 130, 460, 300, 30, p.s, p) + `<rect x="50" y="130" width="460" height="60" rx="30" fill="${p.a}"/><rect x="50" y="160" width="460" height="30" fill="${p.a}"/>` +
    `<rect x="90" y="220" width="140" height="170" rx="18" fill="${p.a2}"/><circle cx="160" cy="285" r="34" fill="${p.a}"/><path d="M110 380 Q160 320 210 380 Z" fill="${p.a}"/>` +
    bar(260, 240, 190, p.i, 18) + bar(260, 285, 150, p.m) + bar(260, 320, 200, p.m) + bar(260, 355, 110, p.m),
  // Face scan with brackets
  face: (p) => slab(110, 90, 340, 380, 40, p.s, p) +
    `<g fill="none" stroke="${p.a}" stroke-width="14" stroke-linecap="round"><path d="M150 170 V130 H190 M370 130 H410 V170 M410 390 V430 H370 M190 430 H150 V390"/></g>` +
    `<circle cx="280" cy="250" r="70" fill="${p.a2}"/><circle cx="256" cy="240" r="8" fill="${p.i}"/><circle cx="304" cy="240" r="8" fill="${p.i}"/><path d="M258 276 Q280 292 302 276" stroke="${p.i}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    `<path d="M190 410 Q280 320 370 410" fill="${p.a2}"/><path d="M130 300 H430" stroke="${p.a}" stroke-width="6"/>`,
  // Automation: gears
  gear: (p) => {
    const g = (cx, cy, r, teeth, fill, hole) => `<g fill="${fill}">${Array.from({ length: teeth }, (_, k) => `<rect x="${cx - r * 0.16}" y="${cy - r - r * 0.24}" width="${r * 0.32}" height="${r * 0.5}" rx="${r * 0.08}" transform="rotate(${(360 / teeth) * k} ${cx} ${cy})"/>`).join("")}<circle cx="${cx}" cy="${cy}" r="${r}"/></g>` + (hole ? `<circle cx="${cx}" cy="${cy}" r="${r * 0.38}" fill="${hole}"/>` : "");
    return g(220, 312, 150, 10, p.d) + g(220, 300, 150, 10, p.s, p.bg) + g(420, 160, 84, 8, p.d) + g(420, 150, 84, 8, p.a, p.bg);
  },
  // Adverse media: newspaper
  newspaper: (p) => slab(110, 110, 360, 380, 22, p.d, p, 0) + slab(80, 80, 360, 380, 22, p.s, p) +
    bar(120, 120, 280, p.i, 26) + `<rect x="120" y="180" width="130" height="110" rx="12" fill="${p.a}"/>` +
    [0, 1, 2].map((r) => bar(270, 186 + r * 36, 130, p.m)).join("") + [0, 1, 2, 3].map((r) => bar(120, 320 + r * 34, 280 - (r % 2) * 60, p.m)).join(""),
  // OSINT: connected nodes
  network: (p) => {
    const n = [[120, 140], [400, 110], [470, 330], [270, 450], [90, 380]];
    return n.map(([x, y]) => line(280, 280, x, y, p.m, 7)).join("") + line(120, 140, 400, 110, p.m, 5) + line(470, 330, 270, 450, p.m, 5) +
      n.map(([x, y], k) => disc(x, y, 38, k === 2 ? p.a2 : p.s, p, 8)).join("") + disc(280, 280, 76, p.a, p, 12) + `<circle cx="280" cy="280" r="28" fill="#fff"/>`;
  },
  // Identity theft: fingerprint
  fingerprint: (p) => slab(100, 80, 360, 400, 44, p.s, p) +
    `<g fill="none" stroke-linecap="round" stroke-width="12">` +
    [40, 70, 100, 130].map((r, k) => `<path d="M${280 - r} ${300} A${r} ${r * 1.15} 0 0 1 ${280 + r} ${300} V${330 + k * 14}" stroke="${k === 2 ? p.a : p.i}"/>`).join("") +
    `<path d="M280 300 V380" stroke="${p.i}"/></g><path d="M150 430 L410 170" stroke="${p.a}" stroke-width="14" stroke-linecap="round"/>`,
  // NFC passport
  passport: (p) => slab(90, 90, 280, 390, 26, p.i, p) +
    `<circle cx="230" cy="250" r="70" fill="none" stroke="${p.a2}" stroke-width="8"/><circle cx="230" cy="250" r="34" fill="${p.a}"/>` + bar(160, 370, 140, p.a2, 16) +
    `<rect x="190" y="410" width="80" height="40" rx="8" fill="${p.a}"/>` +
    `<g fill="none" stroke="${p.a}" stroke-width="14" stroke-linecap="round">${[50, 95, 140].map((r) => `<path d="M${400 + r * 0.3} ${270 - r} A${r} ${r} 0 0 1 ${400 + r * 0.3} ${270 + r}"/>`).join("")}</g>`,
  // Sanctions lifted: open padlock
  unlock: (p) => `<path d="M170 250 V170 A110 110 0 0 1 390 170 V180" fill="none" stroke="${p.d}" stroke-width="44" transform="translate(-60 -40)"/><path d="M170 250 V170 A110 110 0 0 1 390 170 V180" fill="none" stroke="${p.i}" stroke-width="40" stroke-linecap="round" transform="translate(-60 -40)"/>` +
    slab(110, 230, 340, 250, 34, p.a, p) + `<circle cx="280" cy="330" r="28" fill="#fff"/><rect x="268" y="340" width="24" height="70" rx="12" fill="#fff"/>`,
};

module.exports = { MOTIFS: M };
