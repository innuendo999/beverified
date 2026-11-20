#!/usr/bin/env node
// KYC Certification Tracker watcher. Reads the issuers' registers, compares them with the
// previous run and with our provider records, and writes a report to a state folder.
// It never edits a record, a score or a date on the site. Spec: docs/cert-tracker.md.
//
// Usage:
//   node scripts/cert-watch/watch.mjs --state <dir> [--fixtures <dir>] [--now 2026-11-21T05:00:00Z]
// --fixtures reads <dir>/<source-id>.html|csv instead of the network (tests, local runs).
//
// Output in <dir>:
//   snapshots/<source>.json  rows parsed from each source on its last good run
//   checked.json             source -> date of its last good run
//   latest.json, latest.md   this run's report (new and removed rows, items to check, errors)
//   history/<date>.md        copy of latest.md per day

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const arg = (n, f) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : f; };
const stateDir = arg('state');
const fixturesDir = arg('fixtures');
const NOW = new Date(arg('now', new Date().toISOString()));
const TODAY = NOW.toISOString().slice(0, 10);
if (!stateDir) { console.error('Missing --state <dir>'); process.exit(2); }
for (const d of ['snapshots', 'history']) fs.mkdirSync(path.join(stateDir, d), { recursive: true });

const cfg = yaml.load(fs.readFileSync(path.join(ROOT, 'src/_data/certWatch.yml'), 'utf8'));
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n');

// ---------- records ----------

const providers = {};
for (const f of fs.readdirSync(path.join(ROOT, 'src/_data/providers')).filter((f) => f.endsWith('.yml'))) {
  const p = yaml.load(fs.readFileSync(path.join(ROOT, 'src/_data/providers', f), 'utf8'));
  providers[p.slug] = p;
}
const tracked = (yaml.load(fs.readFileSync(path.join(ROOT, 'src/_data/tracked.yml'), 'utf8')) || []).map((t) => t.name);
const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');
const nameMap = {}; // program -> normalized register name -> slug
for (const [slug, progs] of Object.entries(cfg.names || {}))
  for (const [prog, names] of Object.entries(progs)) for (const n of names) (nameMap[prog] ||= {})[norm(n)] = slug;
const slugFor = (prog, name) => nameMap[prog]?.[norm(name)] || null;
const trackedHit = (name) => tracked.find((t) => norm(name).includes(norm(t))) || null;
const citedUrls = (slug) => new Set((providers[slug]?.sources || []).map((s) => s.url));

// ---------- fetching and text ----------

const UA = 'BeVerified certification watcher (+https://beverified.org/kyc-certification-tracker/)';
async function get(id, url, ext = 'html') {
  if (fixturesDir) {
    const f = path.join(fixturesDir, `${id}.${ext}`);
    if (!fs.existsSync(f)) throw new Error(`no fixture ${id}.${ext}`);
    return fs.readFileSync(f, 'utf8');
  }
  // Node fetch first; on a network error (TLS, HTTP/2, reset) fall back to curl, which some hosts accept.
  let why;
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,text/csv,*/*' }, signal: AbortSignal.timeout(45000), redirect: 'follow' });
    if (res.ok) return res.text();
    why = `HTTP ${res.status}`;
  } catch (e) { why = `${e.message}${e.cause ? ` (${e.cause.code || e.cause.message})` : ''}`; }
  try {
    return execFileSync('curl', ['-sSL', '--compressed', '--max-time', '60', '-A', UA, '-f', url], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) { throw new Error(`fetch: ${why}; curl: ${String(e.stderr || e.message).trim().split('\n').pop()}`); }
}
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '-', mdash: '-', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"' };
const decode = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e.toLowerCase()] ?? m);
const strip = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const toText = (html) => decode(html
  .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<\/(p|div|li|tr|h[1-6]|section|article|td|th|dt|dd)>|<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);

// US "11/04/26" -> 2026-11-04; "18/03/2027" (day first) handled by the caller.
const usDate = (s) => { const m = String(s).match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/); if (!m) return null;
  const y = m[3].length === 2 ? `20${m[3]}` : m[3]; return `${y}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`; };
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const textDate = (s) => { // "14 January 2029", "January 14, 2029", "Jun 2029"
  let m = String(s).match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/);
  if (m && MONTHS.includes(m[2].toLowerCase())) return `${m[3]}-${String(MONTHS.indexOf(m[2].toLowerCase()) + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  m = String(s).match(/([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),\s+(\d{4})/);
  if (m && MONTHS.includes(m[1].toLowerCase())) return `${m[3]}-${String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  m = String(s).match(/([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/);
  if (m && MONTHS.includes(m[1].toLowerCase())) return `${m[2]}-${String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, '0')}`;
  return null;
};

// ---------- parsers (each returns rows: {key, vendor, ...}) ----------

export function parseIbeta(html) {
  const rows = [];
  for (const tr of html.match(/<tr[\s\S]*?<\/tr>/gi) || []) {
    const cells = (tr.match(/<td[\s\S]*?<\/td>/gi) || []).map((c) => ({ text: strip(c), href: (c.match(/href="([^"]+)"/i) || [])[1] || '' }));
    if (cells.length < 5) continue;
    const date = usDate(cells[0].text);
    if (!date) continue;
    const level = (cells[2].text.match(/Level\s*([123])/i) || [])[1];
    const pdf = cells.map((c) => c.href).find((h) => /\.pdf$/i.test(h)) || '';
    rows.push({ key: pdf || `${date}|${cells[1].text}|${cells[3].text}|${cells[2].text}`, date, vendor: cells[1].text,
      level: level ? +level : null, levelText: cells[2].text, product: cells[3].text, version: cells[4]?.text || '', url: pdf });
  }
  return rows;
}

export function findDvsCsvLink(html, base) {
  // The register page links "Download register CSV" to /register/download-register (checked 2026-11-20).
  const byText = html.match(/<a[^>]+href="([^"]+)"[^>]*>[^<]*download[^<]*<\/a>/i);
  const byHref = html.match(/href="([^"]*(?:download|\.csv)[^"]*)"/i);
  const m = byText || byHref;
  return m ? new URL(decode(m[1]), base).href : new URL('/register/download-register', base).href;
}

export function parseCsv(text) {
  const out = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); out.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); out.push(row); }
  return out.filter((r) => r.some((x) => x.trim()));
}

export function parseDvs(csv) {
  const [head, ...body] = parseCsv(csv);
  if (!head) return [];
  const col = (re) => head.findIndex((h) => re.test(h));
  const ci = { provider: col(/provider|company|organisation/i), service: col(/service/i), expiry: col(/expir/i), cert: col(/(date of )?certif.*date|certified on|date of certification/i), roles: col(/role/i), codes: col(/supplement/i) };
  if (ci.provider < 0 || ci.service < 0) return [];
  return body.map((r) => {
    const g = (k) => (ci[k] >= 0 ? (r[ci[k]] || '').trim() : '');
    const expiry = textDate(g('expiry')) || usDate(g('expiry')) || g('expiry');
    return { key: `${g('provider')}|${g('service')}`, vendor: g('provider'), service: g('service'), roles: g('roles'), codes: g('codes'),
      certified: textDate(g('cert')) || g('cert'), expiry };
  }).filter((r) => r.vendor);
}

export function parseFido(html) {
  const text = toText(html);
  const blocks = text.split(/^(?=Company Name)/im).filter((b) => /^Company Name/i.test(b));
  return blocks.map((b) => {
    // Label and value may sit in separate cells, with the colon in its own element: skip spaces, newlines and colons.
    const f = (label) => { const m = b.match(new RegExp(`${label}[\\s:]*([^\\n:][^\\n]*)`, 'i')); return m ? m[1].trim() : ''; };
    const vendor = f('Company Name'), product = f('Product Name'), component = f('Component');
    const level = (f('Level and Reference Type').match(/Level\s*(\d)/i) || [])[1];
    const expiry = textDate(f('Certificate Expiration')) || f('Certificate Expiration');
    return { key: `${vendor}|${product}|${component}`, vendor, product, component, level: level ? +level : null, expiry };
  }).filter((r) => r.vendor);
}

export function parseAccs(html) {
  const text = toText(html);
  const none = /no (similar )?certifications? (listed|yet)/i.test(text);
  const validity = [];
  for (const m of text.matchAll(/Certification validity[\s:]*([^\n]{0,40})/gi)) {
    const v = m[1].match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    const d = v ? `${v[3]}-${v[2].padStart(2, '0')}-${v[1].padStart(2, '0')}` : textDate(m[1]);
    if (d) validity.push(d);
  }
  const i = text.search(/validity/i);
  return { none, validity, hash: hash(text), excerpt: i > -1 ? text.slice(Math.max(0, i - 80), i + 120) : text.slice(0, 200) };
}

// ---------- run ----------

const report = { date: TODAY, sources: {}, newRows: [], removedRows: [], changedRows: [], toCheck: [], candidates: [], expiring: [], errors: [] };
const checked = readJson(path.join(stateDir, 'checked.json'), {});

async function runSource(id, fn) {
  try {
    const rows = await fn();
    const file = path.join(stateDir, 'snapshots', `${id}.json`);
    let prev = readJson(file, null);
    // A snapshot whose vendor names hold no letters came from a parser bug: treat this run as a new baseline.
    if (prev?.rows && prev.rows.length && prev.rows.every((r) => !/[a-z0-9]/i.test(r.vendor || ''))) prev = null;
    if (Array.isArray(rows)) {
      if (!rows.length) throw new Error('parsed 0 rows: page structure may have changed');
      if (rows.every((r) => !/[a-z0-9]/i.test(r.vendor || ''))) throw new Error('rows parsed without vendor names: page structure may have changed');
      if (prev && prev.rows.length > 10 && rows.length < prev.rows.length * 0.5) throw new Error(`parsed ${rows.length} rows, previous run had ${prev.rows.length}: page structure may have changed`);
      if (prev) {
        const before = new Set(prev.rows.map((r) => r.key)), now = new Set(rows.map((r) => r.key));
        for (const r of rows) if (!before.has(r.key)) report.newRows.push({ source: id, ...r });
        for (const r of prev.rows) if (!now.has(r.key)) report.removedRows.push({ source: id, ...r });
        const old = new Map(prev.rows.map((r) => [r.key, r]));
        for (const r of rows) { const o = old.get(r.key); if (!o) continue;
          const diff = Object.keys(r).filter((k) => k !== 'key' && JSON.stringify(r[k]) !== JSON.stringify(o[k]));
          if (diff.length) report.changedRows.push({ source: id, ...r, changes: diff.map((k) => `${k}: ${o[k] || '(empty)'} -> ${r[k] || '(empty)'}`) }); }
      }
      writeJson(file, { date: TODAY, rows });
      report.sources[id] = { ok: true, rows: rows.length, baseline: !prev };
    } else {
      writeJson(file, { date: TODAY, ...rows });
      report.sources[id] = { ok: true, ...rows.summary };
    }
    checked[id] = TODAY;
  } catch (e) {
    report.sources[id] = { ok: false, error: String(e.message || e) };
    report.errors.push({ source: id, error: String(e.message || e) });
  }
}

await runSource('ibeta_pad', async () => parseIbeta(await get('ibeta_pad', cfg.sources.ibeta_pad.url)));
await runSource('uk_dvs', async () => {
  if (fixturesDir) return parseDvs(await get('uk_dvs', '', 'csv'));
  const page = await get('uk_dvs', cfg.sources.uk_dvs.url);
  const link = findDvsCsvLink(page, cfg.sources.uk_dvs.url);
  const csv = await get('uk_dvs', link, 'csv');
  if (/^\s*</.test(csv)) throw new Error(`${link} returned HTML, not CSV`);
  const rows = parseDvs(csv);
  if (!rows.length) throw new Error(`CSV header not recognised: ${csv.split(/\r?\n/)[0].slice(0, 200)}`);
  return rows;
});
await runSource('fido', async () => parseFido(await get('fido', cfg.sources.fido_face.url)));
await runSource('rivr', async () => {
  const text = toText(await get('rivr', cfg.sources.rivr.url));
  if (text.length < 500) throw new Error('page returned almost no text (script-rendered); check it in a browser');
  const prev = readJson(path.join(stateDir, 'snapshots', 'rivr.json'), null);
  const h = hash(text);
  if (prev && prev.hash !== h) report.toCheck.push({ source: 'rivr', note: 'The RIVR results page changed since the last run. Check new aliases and values; an alias counts only when the vendor disclosed it.' });
  const aliases = [...new Set(text.match(/\b(MTDS|DVS|PAD-[AP])\s?\d+\b/g) || [])];
  return { hash: h, aliases, summary: { aliases: aliases.length } };
});
// ACCS: one page per provider entry that cites an ACCS registry page.
const accsPages = [];
for (const p of Object.values(providers))
  for (const c of p.certifications || []) {
    const s = c.source && p.sources?.[c.source - 1];
    if (c.program === 'accs' && s?.url?.includes('accscheme.com/registry/')) accsPages.push({ slug: p.slug, status: c.status, url: s.url, name: c.name });
  }
await runSource('accs', async () => {
  const pages = {};
  for (const a of accsPages) {
    if (pages[a.url]) continue;
    const id = `accs-${a.slug}`;
    const r = parseAccs(fixturesDir ? await get(id, '') : await get(id, a.url));
    pages[a.url] = { slug: a.slug, ...r };
    if (r.none && a.status === 'confirmed') report.toCheck.push({ source: 'accs', slug: a.slug, note: `ACCS page says no certification is listed, but "${a.name}" is confirmed in the record: ${a.url}` });
    for (const v of r.validity) if (v < TODAY) report.toCheck.push({ source: 'accs', slug: a.slug, note: `ACCS validity ${v} has passed: ${a.url}` });
  }
  const prev = readJson(path.join(stateDir, 'snapshots', 'accs.json'), null);
  for (const [url, p] of Object.entries(pages))
    if (prev?.pages?.[url] && prev.pages[url].hash !== p.hash) report.toCheck.push({ source: 'accs', slug: p.slug, note: `ACCS registry page changed: ${url}` });
  return { pages, summary: { pages: Object.keys(pages).length } };
});

// ---------- compare with records ----------

const PROG = { ibeta_pad: 'ibeta_pad', uk_dvs: 'uk_dvs', fido: 'fido_face' };
for (const r of report.newRows) {
  const slug = slugFor(PROG[r.source], r.vendor);
  if (slug) { r.slug = slug; continue; }
  const t = trackedHit(r.vendor);
  if (t) report.candidates.push({ source: r.source, vendor: r.vendor, tracked: t, row: r });
}
report.newRows = report.newRows.filter((r) => r.slug);
report.removedRows = report.removedRows.map((r) => ({ ...r, slug: slugFor(PROG[r.source], r.vendor) })).filter((r) => r.slug);
report.changedRows = report.changedRows.map((r) => ({ ...r, slug: slugFor(PROG[r.source], r.vendor) })).filter((r) => r.slug);

// iBeta letters of mapped vendors from the last 18 months that the record does not cite.
const ib = readJson(path.join(stateDir, 'snapshots', 'ibeta_pad.json'), { rows: [] }).rows;
const since = new Date(NOW); since.setMonth(since.getMonth() - 18);
for (const r of ib) {
  const slug = slugFor('ibeta_pad', r.vendor);
  if (!slug || !r.url || r.date < since.toISOString().slice(0, 10)) continue;
  const mon = `${MONTHS[+r.date.slice(5, 7) - 1]} ${r.date.slice(0, 4)}`.toLowerCase();
  const inRecord = (providers[slug]?.certifications || []).some((c) => c.program === 'ibeta_pad' && c.status === 'confirmed'
    && [].concat(c.level).includes(r.level) && String(c.what || '').toLowerCase().includes(mon));
  if (!inRecord && !citedUrls(slug).has(r.url)) report.toCheck.push({ source: 'ibeta_pad', slug, note: `iBeta letter not cited in the record: ${r.vendor}, ${r.product}, Level ${r.level}, ${r.date}: ${r.url}` });
}
// UK DVS: mapped services whose expiry is near or passed.
for (const r of readJson(path.join(stateDir, 'snapshots', 'uk_dvs.json'), { rows: [] }).rows) {
  const slug = slugFor('uk_dvs', r.vendor);
  if (slug && /^\d{4}-\d{2}-\d{2}$/.test(r.expiry) && (new Date(r.expiry) - NOW) / 864e5 < 60)
    report.expiring.push({ slug, source: 'uk_dvs', what: `${r.service}`, date: r.expiry });
}
// Record entries with an end date in their text ("valid to Jun 2029", "expires 18 Mar 2027").
for (const p of Object.values(providers))
  for (const c of p.certifications || []) {
    if (c.status !== 'confirmed') continue;
    const m = String(c.what || '').match(/(?:valid (?:to|until)|expires?|to)\s+((?:\d{1,2}\s+)?[A-Z][a-z]{2,8}\.?\s+\d{4})/);
    const d = m && textDate(m[1]);
    if (!d) continue;
    const end = d.length === 7 ? `${d}-28` : d;
    if ((new Date(end) - NOW) / 864e5 < 60) report.expiring.push({ slug: p.slug, what: c.name, date: d });
  }

writeJson(path.join(stateDir, 'checked.json'), checked);
writeJson(path.join(stateDir, 'latest.json'), report);

const L = [`# Certification watch, ${TODAY}`, ''];
L.push('## Sources', '');
for (const [id, s] of Object.entries(report.sources))
  L.push(`- ${id}: ${s.ok ? `ok${s.rows != null ? `, ${s.rows} rows` : ''}${s.baseline ? ' (first run, baseline only)' : ''}` : `**failed**: ${s.error}`}`);
const sec = (title, items, fmt) => { L.push('', `## ${title} (${items.length})`, ''); if (!items.length) L.push('None.'); else items.forEach((x) => L.push(`- ${fmt(x)}`)); };
sec('New rows for providers we review', report.newRows, (r) => `${r.slug}: ${r.source} ${[r.vendor, r.product || r.service, r.level ? `Level ${r.level}` : '', r.component || '', r.date || r.expiry || ''].filter(Boolean).join(', ')}${r.url ? `: ${r.url}` : ''}`);
sec('Rows removed from a register', report.removedRows, (r) => `${r.slug}: ${r.source} ${[r.vendor, r.product || r.service].filter(Boolean).join(', ')}`);
sec('Rows changed on a register', report.changedRows, (r) => `${r.slug}: ${r.source} ${[r.vendor, r.product || r.service].filter(Boolean).join(', ')}: ${r.changes.join('; ')}`);
sec('To check against the record', report.toCheck, (x) => `${x.slug ? `${x.slug}: ` : ''}${x.note}`);
sec('Ending within 60 days or already ended', report.expiring, (x) => `${x.slug}: ${x.what}, ${x.date}`);
sec('Tracked vendors without a review (candidates only)', report.candidates, (x) => `${x.tracked}: ${x.source} ${x.vendor}${x.row.product ? `, ${x.row.product}` : ''}`);
fs.writeFileSync(path.join(stateDir, 'latest.md'), L.join('\n') + '\n');
fs.writeFileSync(path.join(stateDir, 'history', `${TODAY}.md`), L.join('\n') + '\n');
console.log(L.join('\n'));
