#!/usr/bin/env node
// Price watcher for the KYC cost calculator, the KYC Pricing Index and the provider finder (calculator PR 3, owner 2026-11-23).
// Opens every vendor pricing page our records cite for an official price, reads the money figures on it, and compares them
// with the record and with the previous run. It never edits a record, a price or a date. Spec: docs/price-watch.md.
//
// Usage:
//   node scripts/price-watch/watch.mjs --state <dir> [--fixtures <dir>] [--now 2026-11-24T05:00:00Z]
// --fixtures reads <dir>/<slug>.html (the first provider citing a page) instead of the network.
//
// Output in <dir>: snapshots/<id>.json (figures per page), latest.json, latest.md, history/<date>.md

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const arg = (n, f) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : f; };
const stateDir = arg('state'), fixturesDir = arg('fixtures');
const NOW = new Date(arg('now', new Date().toISOString()));
const TODAY = NOW.toISOString().slice(0, 10);
if (!stateDir) { console.error('Missing --state <dir>'); process.exit(2); }
for (const d of ['snapshots', 'history']) fs.mkdirSync(path.join(stateDir, d), { recursive: true });
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n');

// ---------- records: which pages, which figures ----------
const MONEY = /(?:[$€£]\s?\d[\d,]*(?:\.\d+)?|\b(?:USD|EUR|GBP|CHF)\s?\d[\d,]*(?:\.\d+)?|\d[\d,]*(?:\.\d+)?\s?(?:USD|EUR|GBP|CHF)\b)/g;
const normMoney = (m) => {
  const cur = /€|EUR/.test(m) ? '€' : /£|GBP/.test(m) ? '£' : /CHF/.test(m) ? 'CHF' : '$';
  const n = Number(m.replace(/[^\d.]/g, '').replace(/\.$/, ''));
  return Number.isFinite(n) ? `${cur}${n}` : null;
};
const figures = (s) => [...new Set((String(s).match(MONEY) || []).map(normMoney).filter(Boolean))];

const pages = {}; // url -> { id, url, items: [{slug, name, label, value, figs}] }
const budgetDue = [];
for (const f of fs.readdirSync(path.join(ROOT, 'src/_data/providers')).filter((f) => f.endsWith('.yml'))) {
  const p = yaml.load(fs.readFileSync(path.join(ROOT, 'src/_data/providers', f), 'utf8'));
  if (!p || p.status !== 'published') continue;
  for (const it of p.pricing?.items || []) {
    if (it.kind !== 'official' || typeof it.source !== 'number') continue;
    const figs = figures(it.value);
    if (!figs.length) continue;
    const url = p.sources?.[it.source - 1]?.url;
    if (!url) continue;
    const pg = (pages[url] ||= { id: p.slug + (Object.values(pages).some((x) => x.id === p.slug) ? '-' + crypto.createHash('sha1').update(url).digest('hex').slice(0, 6) : ''), url, items: [] });
    pg.items.push({ slug: p.slug, name: p.name, label: it.label, value: it.value, figs });
  }
  if (p.budget?.checked) {
    const age = Math.floor((NOW - new Date(p.budget.checked)) / 864e5);
    if (age >= 75) budgetDue.push({ slug: p.slug, name: p.name, checked: String(p.budget.checked).slice(0, 10), age });
  }
}

// ---------- fetching ----------
const UA = 'BeVerified price watcher (+https://beverified.org/publications/kyc-pricing-index/)';
async function get(pg) {
  if (fixturesDir) {
    const f = path.join(fixturesDir, `${pg.id}.html`);
    if (!fs.existsSync(f)) throw new Error(`no fixture ${pg.id}.html`);
    return fs.readFileSync(f, 'utf8');
  }
  let why;
  try {
    const res = await fetch(pg.url, { headers: { 'user-agent': UA, accept: 'text/html,*/*' }, signal: AbortSignal.timeout(45000), redirect: 'follow' });
    if (res.ok) return res.text();
    why = `HTTP ${res.status}`;
  } catch (e) { why = `${e.message}${e.cause ? ` (${e.cause.code || e.cause.message})` : ''}`; }
  try {
    return execFileSync('curl', ['-sSL', '--compressed', '--max-time', '60', '-A', UA, '-f', pg.url], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) { throw new Error(`fetch: ${why}; curl: ${String(e.stderr || e.message).trim().split('\n').pop()}`); }
}
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', euro: '€', pound: '£' };
const decode = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e.toLowerCase()] ?? m);
// Keep text inside JSON blobs too (Next.js and similar put prices in __NEXT_DATA__), drop styles and SVG.
const toText = (html) => decode(html.replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<svg[\s\S]*?<\/svg>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

// ---------- run ----------
const report = { date: TODAY, pages: 0, read: 0, mismatches: [], changed: [], unreadable: [], budgetDue };
for (const pg of Object.values(pages).sort((a, b) => a.id.localeCompare(b.id))) {
  report.pages++;
  const snapFile = path.join(stateDir, 'snapshots', `${pg.id}.json`);
  const prev = readJson(snapFile, null);
  let text;
  try { text = toText(await get(pg)); } catch (e) { report.unreadable.push({ id: pg.id, url: pg.url, why: e.message.slice(0, 200) }); continue; }
  const onPage = figures(text);
  if (text.length < 500 || !onPage.length) { report.unreadable.push({ id: pg.id, url: pg.url, why: text.length < 500 ? 'page text under 500 characters (rendered by script?)' : 'no money figures in the page text (rendered by script?)' }); continue; }
  report.read++;
  for (const it of pg.items) {
    const missing = it.figs.filter((f) => !onPage.includes(f));
    if (missing.length) report.mismatches.push({ slug: it.slug, name: it.name, url: pg.url, label: it.label, value: it.value, missing });
  }
  if (prev?.figures) {
    const added = onPage.filter((f) => !prev.figures.includes(f)), removed = prev.figures.filter((f) => !onPage.includes(f));
    if (added.length || removed.length) report.changed.push({ id: pg.id, url: pg.url, names: [...new Set(pg.items.map((i) => i.name))], added, removed });
  }
  writeJson(snapFile, { url: pg.url, date: TODAY, figures: onPage });
}

// ---------- report ----------
const md = [`# Price watch ${TODAY}`, '', `${report.read} of ${report.pages} pricing pages read.`, ''];
md.push('## Record figures not found on the page', '', report.mismatches.length ? 'Each line is a price in our record that the vendor page no longer shows. Open the page, confirm, then fix the record in a PR (pricing.items, budget{} if used, verification note).' : 'None.', '');
for (const m of report.mismatches) md.push(`- **${m.name}** (${m.slug}), "${m.label}": record says "${m.value}"; not on the page: ${m.missing.join(', ')}. ${m.url}`);
md.push('', '## Money figures that changed since the last run', '', report.changed.length ? 'Figures added to or removed from a page since the previous read. Often a new plan or a price change; sometimes a banner or currency switch.' : 'None (or first run).', '');
for (const c of report.changed) md.push(`- ${c.names.join(', ')}: added ${c.added.join(', ') || 'none'}; removed ${c.removed.join(', ') || 'none'}. ${c.url}`);
md.push('', '## Pages we could not read', '', report.unreadable.length ? 'Check these by hand (browser) or ask the owner for a screenshot.' : 'None.', '');
for (const u of report.unreadable) md.push(`- ${u.id}: ${u.why}. ${u.url}`);
md.push('', '## Calculator prices due for a re-check', '', report.budgetDue.length ? 'budget{} checked 75 or more days ago. At 90 days the provider drops out of the calculator.' : 'None.', '');
for (const b of report.budgetDue) md.push(`- ${b.name} (${b.slug}): checked ${b.checked}, ${b.age} days ago.`);
const out = md.join('\n') + '\n';
fs.writeFileSync(path.join(stateDir, 'latest.md'), out);
fs.writeFileSync(path.join(stateDir, 'history', `${TODAY}.md`), out);
writeJson(path.join(stateDir, 'latest.json'), report);
console.log(`price watch: ${report.read}/${report.pages} pages read, ${report.mismatches.length} mismatch(es), ${report.changed.length} changed, ${report.unreadable.length} unreadable`);
