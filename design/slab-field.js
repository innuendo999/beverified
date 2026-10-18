// <slab-field> — "The Shortlist" hero background for BeVerified.
// 46 matte graphite slabs (one per reviewed provider) on an isometric field.
// A violet evaluation plane sweeps across; slabs rise to their score; the three
// tallest get a check + label chip; the field settles and restarts under a new filter.
// Attributes:
//   mode   "loop" (default) | "static"       t       seconds into the 14s loop (static)
//   filter start filter index 0–3            win     "x0,y0,x1,y1" fractions where winners may sit
//   cx,cy  field centre (fractions)          scale   field width relative to host (default 1.05)
//   mask   CSS mask-image for the canvas     ui      chip scale (default 1)
// Respects prefers-reduced-motion (renders the static poster frame, t=9.6).
(function () {
  if (customElements.get('slab-field')) return;
  const LOOP = 14, COLS = 8, ROWS = 6;
  const FILTERS = ['All providers · Global', 'Crypto · Brazil', 'AML · Banks', 'KYB · EU'];
  const LABELS = ['Best overall', 'Best for crypto', 'Best budget option'];
  let VIOLET = [139, 108, 255];
  const PAL = {
    dark: { violet: [139, 108, 255], ground: '#0d0d0f', grid: 'rgba(255,255,255,0.035)', shadow: 'rgba(0,0,0,0.75)', topLo: [35, 36, 40], topHi: [62, 63, 69], win: [74, 75, 82], aLo: [22, 23, 26], aHi: [30, 31, 35], bLo: [14, 15, 17], bHi: [19, 20, 23], edge: 'rgba(255,255,255,0.07)', lead: 'rgba(255,255,255,0.32)', ink: '#F4F4F5', chip: '#0E0E10', chipLine: 'rgba(255,255,255,0.16)', check: '#3DDC97', checkInk: '#04140C', pre: '#A9A9AE', sheet: 0.035 },
    light: { violet: [106, 69, 232], ground: '#EFEDE8', grid: 'rgba(20,20,26,0.05)', shadow: 'rgba(70,58,40,0.20)', topLo: [250, 249, 246], topHi: [255, 255, 255], win: [255, 255, 255], aLo: [228, 225, 218], aHi: [233, 230, 224], bLo: [214, 210, 202], bHi: [221, 217, 210], edge: 'rgba(20,20,26,0.07)', lead: 'rgba(20,20,26,0.28)', ink: '#14141A', chip: '#FFFFFF', chipLine: '#DEDBD4', check: '#1B7A4B', checkInk: '#FFFFFF', pre: '#5E5E68', sheet: 0.025 },
  };
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const eo = (t) => 1 - Math.pow(1 - t, 3);
  const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  function rng(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

  // 8×6 grid minus two corners = 46 slabs
  const CELLS = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if ((c === COLS - 1 && r === 0) || (c === 0 && r === ROWS - 1)) continue;
    CELLS.push({ c, r });
  }

  class SlabField extends HTMLElement {
    static get observedAttributes() { return ['mode', 't', 'filter', 'win', 'cx', 'cy', 'scale', 'mask', 'ui', 'theme', 'chip']; }
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>:host{display:block;position:relative;width:100%;height:100%;overflow:hidden;pointer-events:none}canvas{position:absolute;inset:0;width:100%;height:100%;display:block}</style><canvas aria-hidden="true"></canvas>';
      this.cv = root.querySelector('canvas');
      this.ctx = this.cv.getContext('2d');
      this.cache = {};
      this.t0 = performance.now();
      this.visible = true;
    }
    connectedCallback() {
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this);
      this.io = new IntersectionObserver((e) => { this.visible = e[0].isIntersecting; if (this.visible) this.kick(); }); this.io.observe(this);
      this.rm = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.rmh = () => this.kick(); this.rm.addEventListener && this.rm.addEventListener('change', this.rmh);
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => this.draw());
      this.resize();
    }
    disconnectedCallback() { this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); cancelAnimationFrame(this.raf); this.raf = 0; }
    attributeChangedCallback() { this.applyMask(); this.cache = {}; this.resize(); }
    applyMask() { const m = this.getAttribute('mask') || ''; this.cv.style.webkitMaskImage = m; this.cv.style.maskImage = m; }
    get animated() { return (this.getAttribute('mode') || 'loop') === 'loop' && !(this.rm && this.rm.matches); }
    num(n, d) { const v = parseFloat(this.getAttribute(n)); return isNaN(v) ? d : v; }
    resize() {
      const w = this.clientWidth, h = this.clientHeight; if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.W = w; this.H = h; this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const tw = (w * this.num('scale', 1.05)) / ((COLS + ROWS) / 2);
      this.tw = tw; this.th = tw * 0.56; this.maxH = tw * 0.95;
      const gx = ((COLS / 2 - ROWS / 2) * tw) / 2, gy = ((COLS / 2 + ROWS / 2) * this.th) / 2;
      this.ox = w * this.num('cx', 0.5) - gx; this.oy = h * this.num('cy', 0.58) - gy;
      this.cache = {};
      this.kick();
    }
    P(c, r, z) { return [this.ox + ((c - r) * this.tw) / 2, this.oy + ((c + r) * this.th) / 2 - z]; }
    win() { const a = (this.getAttribute('win') || '0,0,1,1').split(',').map(Number); return { x0: a[0] * this.W, y0: a[1] * this.H, x1: a[2] * this.W, y1: a[3] * this.H }; }
    heights(fi) {
      if (this.cache[fi]) return this.cache[fi];
      const R = rng(fi * 7919 + 31), tw = this.tw, wn = this.win();
      const target = CELLS.map(() => tw * (0.05 + R() * 0.11));
      for (let k = 0; k < 7; k++) target[Math.floor(R() * CELLS.length)] = tw * (0.24 + R() * 0.16);
      const ok = CELLS.map((cell, i) => { const [x, y] = this.P(cell.c + 0.5, cell.r + 0.5, 0); return x > wn.x0 && x < wn.x1 && y > wn.y0 && y < wn.y1 ? i : -1; }).filter((i) => i >= 0);
      const pool = ok.length >= 3 ? ok : CELLS.map((_, i) => i);
      const top = [];
      let guard = 0;
      while (top.length < 3 && guard++ < 400) {
        const i = pool[Math.floor(R() * pool.length)];
        if (top.includes(i)) continue;
        if (guard < 300 && top.some((j) => Math.abs(CELLS[j].c - CELLS[i].c) + Math.abs(CELLS[j].r - CELLS[i].r) < 3)) continue;
        top.push(i);
      }
      [0.95, 0.8, 0.68].forEach((f, k) => (target[top[k]] = tw * f));
      return (this.cache[fi] = { target, top });
    }
    kick() {
      if (this.animated && this.visible) { if (!this.raf) { const loop = () => { this.raf = 0; if (!this.animated || !this.visible || document.hidden) return; this.draw(); this.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop); } }
      else this.draw();
    }
    poly(pts, fill, stroke, lw) {
      const x = this.ctx; x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.closePath();
      if (fill) { x.fillStyle = fill; x.fill(); }
      if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw || 1; x.stroke(); }
    }
    rr(x0, y0, w, h, r) { const x = this.ctx; x.beginPath(); x.moveTo(x0 + r, y0); x.arcTo(x0 + w, y0, x0 + w, y0 + h, r); x.arcTo(x0 + w, y0 + h, x0, y0 + h, r); x.arcTo(x0, y0 + h, x0, y0, r); x.arcTo(x0, y0, x0 + w, y0, r); x.closePath(); }
    draw() {
      if (!this.W) return;
      let T = this.animated ? (performance.now() - this.t0) / 1000 : this.num('t', 9.6);
      if (!this.animated && this.rm && this.rm.matches && this.getAttribute('mode') !== 'static') T = 9.6;
      const loopN = Math.floor(T / LOOP), t = T - loopN * LOOP;
      const fi = (this.num('filter', 0) + loopN) % FILTERS.length;
      const { target, top } = this.heights(fi);
      const x = this.ctx, W = this.W, H = this.H, tw = this.tw, ui = this.num('ui', 1);
      const K = PAL[this.getAttribute('theme') === 'light' ? 'light' : 'dark']; VIOLET = K.violet;
      x.clearRect(0, 0, W, H);

      const s = t < 0.8 ? -1.2 : t > 7.8 ? COLS + 1.2 : -1.2 + ((t - 0.8) / 7) * (COLS + 2.4);
      const sweepA = clamp((t - 0.8) / 0.4) * (1 - clamp((t - 7.4) / 0.5));
      const fall = t < 11.5 ? 1 : 1 - eio(clamp((t - 11.5) / 1.5));
      const base = tw * 0.045;

      // ground
      this.poly([this.P(-0.35, -0.35, 0), this.P(COLS + 0.35, -0.35, 0), this.P(COLS + 0.35, ROWS + 0.35, 0), this.P(-0.35, ROWS + 0.35, 0)], K.ground);
      x.strokeStyle = K.grid; x.lineWidth = 1; x.beginPath();
      for (let c = 0; c <= COLS; c++) { const a = this.P(c, -0.35, 0), b = this.P(c, ROWS + 0.35, 0); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); }
      for (let r = 0; r <= ROWS; r++) { const a = this.P(-0.35, r, 0), b = this.P(COLS + 0.35, r, 0); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); }
      x.stroke();

      // evaluation plane — ground trace + hairline
      if (sweepA > 0) {
        this.poly([this.P(s - 0.9, -0.35, 0), this.P(s, -0.35, 0), this.P(s, ROWS + 0.35, 0), this.P(s - 0.9, ROWS + 0.35, 0)], rgba(VIOLET, 0.05 * sweepA));
        const a = this.P(s, -0.35, 0), b = this.P(s, ROWS + 0.35, 0);
        x.strokeStyle = rgba(VIOLET, 0.95 * sweepA); x.lineWidth = 1; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
      }

      const hs = CELLS.map((cell, i) => {
        const p = eo(clamp(s - (cell.c + 0.5) + 0.2));
        return base + (target[i] - base) * p * fall;
      });

      // soft cast shadows (light from upper-left), blurred via offset-shadow trick
      x.save();
      const OFF = 10000;
      CELLS.forEach((cell, i) => {
        const h = hs[i]; if (h < base * 1.4) return;
        const inn = 0.16, c0 = cell.c + inn, c1 = cell.c + 1 - inn, r0 = cell.r + inn, r1 = cell.r + 1 - inn, k = h / tw;
        const pts = [this.P(c0, r0, 0), this.P(c1, r0, 0), this.P(c1 + k * 1.1, r0 + k * 0.2, 0), this.P(c1 + k * 1.1, r1 + k * 0.2, 0), this.P(c0 + k * 1.1, r1 + k * 0.2, 0), this.P(c0, r1, 0)];
        x.shadowColor = K.shadow; x.shadowBlur = 6 + k * 18; x.shadowOffsetX = OFF;
        this.poly(pts.map((p) => [p[0] - OFF, p[1]]), '#000');
      });
      x.restore();

      const chipT = (k) => eo(clamp((t - (8.1 + k * 0.3)) / 0.5)) * (1 - clamp((t - 11.3) / 0.5));
      const order = CELLS.map((_, i) => i).sort((a, b) => CELLS[a].c + CELLS[a].r - (CELLS[b].c + CELLS[b].r) || CELLS[a].c - CELLS[b].c);
      const TOPLO = K.topLo, TOPHI = K.topHi, WIN = K.win;
      order.forEach((i) => {
        const cell = CELLS[i], h = hs[i], inn = 0.16;
        const c0 = cell.c + inn, c1 = cell.c + 1 - inn, r0 = cell.r + inn, r1 = cell.r + 1 - inn;
        const lift = clamp((h - base) / (this.maxH - base));
        const wk = top.indexOf(i), win = wk >= 0 ? chipT(wk) : 0;
        let topC = mix(TOPLO, TOPHI, lift); if (win) topC = mix(topC, WIN, win);
        this.poly([this.P(c0, r1, 0), this.P(c1, r1, 0), this.P(c1, r1, h), this.P(c0, r1, h)], `rgb(${mix(K.aLo, K.aHi, lift)})`);
        this.poly([this.P(c1, r0, 0), this.P(c1, r1, 0), this.P(c1, r1, h), this.P(c1, r0, h)], `rgb(${mix(K.bLo, K.bHi, lift)})`);
        const tp = [this.P(c0, r0, h), this.P(c1, r0, h), this.P(c1, r1, h), this.P(c0, r1, h)];
        this.poly(tp, `rgb(${topC})`);
        const d = s - (cell.c + 0.5);
        const evalA = sweepA * (d > -0.1 && d < 1.4 ? 1 - clamp(d / 1.4) : 0);
        x.strokeStyle = evalA > 0.02 ? rgba(VIOLET, 0.7 * evalA) : K.edge;
        x.lineWidth = 1; x.beginPath(); x.moveTo(tp[3][0], tp[3][1]); x.lineTo(tp[0][0], tp[0][1]); x.lineTo(tp[1][0], tp[1][1]); x.stroke();
      });

      // vertical evaluation sheet (very faint) drawn over the field
      if (sweepA > 0) {
        this.poly([this.P(s, -0.35, 0), this.P(s, ROWS + 0.35, 0), this.P(s, ROWS + 0.35, this.maxH * 1.05), this.P(s, -0.35, this.maxH * 1.05)], rgba(VIOLET, K.sheet * sweepA));
        const a = this.P(s, -0.35, this.maxH * 1.05), b = this.P(s, ROWS + 0.35, this.maxH * 1.05);
        x.strokeStyle = rgba(VIOLET, 0.28 * sweepA); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
      }

      // winner chips
      x.font = `500 ${12 * ui}px Geist, ui-sans-serif, system-ui, sans-serif`; x.textBaseline = 'middle';
      top.forEach((i, k) => {
        const a = chipT(k); if (a <= 0.01) return;
        const cell = CELLS[i], h = hs[i];
        const [px, py] = this.P(cell.c + 0.5, cell.r + 0.5, h);
        const lead = (22 + 8 * (1 - a)) * ui, ch = 26 * ui, tw2 = x.measureText(LABELS[k]).width, cw = tw2 + 40 * ui;
        const cy = py - lead - ch, cx = px - cw / 2;
        x.globalAlpha = a;
        x.strokeStyle = K.lead; x.lineWidth = 1; x.beginPath(); x.moveTo(px, py - 2); x.lineTo(px, cy + ch); x.stroke();
        x.beginPath(); x.arc(px, py - 2, 2, 0, Math.PI * 2); x.fillStyle = K.ink; x.fill();
        this.rr(cx, cy, cw, ch, ch / 2); x.fillStyle = K.chip; x.fill(); x.strokeStyle = K.chipLine; x.stroke();
        const kx = cx + 15 * ui, ky = cy + ch / 2;
        x.beginPath(); x.arc(kx, ky, 7 * ui, 0, Math.PI * 2); x.fillStyle = K.check; x.fill();
        x.strokeStyle = K.checkInk; x.lineWidth = 1.6 * ui; x.lineCap = 'round'; x.lineJoin = 'round';
        x.beginPath(); x.moveTo(kx - 3 * ui, ky + 0.2 * ui); x.lineTo(kx - 0.8 * ui, ky + 2.4 * ui); x.lineTo(kx + 3.2 * ui, ky - 2.4 * ui); x.stroke();
        x.lineWidth = 1; x.lineCap = 'butt';
        x.fillStyle = K.ink; x.fillText(LABELS[k], cx + 28 * ui, ky + 0.5);
        x.globalAlpha = 1;
      });

      // active filter chip
      const wn = this.win();
      const showNext = t > 13;
      const label = FILTERS[showNext ? (fi + 1) % FILTERS.length : fi];
      const fa = showNext ? clamp((t - 13.2) / 0.5) : Math.min(clamp(t / 0.6), 1 - clamp((t - 12.6) / 0.4));
      if (fa > 0.01) {
        x.globalAlpha = fa;
        x.font = `500 ${12 * ui}px Geist, ui-sans-serif, system-ui, sans-serif`;
        const pre = 'Filter', lw = x.measureText(label).width, pw = x.measureText(pre).width;
        const ch = 28 * ui, cw = pw + lw + 44 * ui, cx = wn.x0 + 8 * ui, cy = this.getAttribute('chip') === 'top' ? wn.y0 + 8 * ui : wn.y1 - ch - 8 * ui;
        this.rr(cx, cy, cw, ch, ch / 2); x.fillStyle = K.chip; x.fill(); x.strokeStyle = rgba(VIOLET, 0.55); x.stroke();
        x.beginPath(); x.arc(cx + 13 * ui, cy + ch / 2, 3 * ui, 0, Math.PI * 2); x.fillStyle = rgba(VIOLET, 1); x.fill();
        x.fillStyle = K.pre; x.fillText(pre, cx + 22 * ui, cy + ch / 2 + 0.5);
        x.fillStyle = K.ink; x.fillText(label, cx + 30 * ui + pw, cy + ch / 2 + 0.5);
        x.globalAlpha = 1;
      }
    }
  }
  customElements.define('slab-field', SlabField);
})();
