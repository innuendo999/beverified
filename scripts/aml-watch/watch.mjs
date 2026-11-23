#!/usr/bin/env node
// AML watcher for the AML ranking (AML 1.0, owner 2026-11-23). Spec: docs/aml-watch.md, rules: docs/scoring-aml.md.
// For every provider in the `aml` ranking it opens the vendor pages that the record cites for AML 1.0 fields
// (plus extra pages from src/_data/amlWatch.yml), looks for the sanctions lists and feature terms each field is
// about, and compares them with the record and with the previous run. A term found is a candidate, never a point:
// a person reads the passage before a record changes. It never edits a record.
//
// Usage:
//   node scripts/aml-watch/watch.mjs --state <dir> [--fixtures <dir>] [--now 2026-11-24T06:00:00Z]
// --fixtures reads <dir>/<page id>.html instead of the network (page id = slug + "-" + first 6 hex of sha1(url)).
// Output in <dir>: snapshots/<id>.json, latest.json, latest.md, history/<date>.md

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
const load = (f) => yaml.load(fs.readFileSync(path.join(ROOT, f), 'utf8'));

// ---------- what we look for ----------
const LISTS = {
  ofac: /\bOFAC\b|Office of Foreign Assets Control|\bSDN\b/,
  eu: /\bEU\b(?! ?\d)|European Union/,
  uk: /\bHMT\b|HM Treasury|\bOFSI\b|UK Sanctions List|UK Consolidated|\bFCDO\b|\bUK\b[^.]{0,40}sanction/i,
  un: /\bUN\b(?! ?\d)|United Nations/,
};
const UPDATE = /\bwithin (?:a few )?minutes\b|\b(?:every|within)\s+\d+\s*(?:minutes?|mins?|hours?|hrs?)\b|\b(?:updated|refresh(?:ed|es)?|rescreens?)\s+(?:daily|nightly|hourly|each night|every day)\b|\b\d+[- ]minute (?:data )?(?:refresh|update)/gi;
const TERMS = {
  data_provenance: /directly from (?:issuing )?(?:authorities|issuers)|in-house|own (?:data|research|risk data)|World-Check|Dow Jones|ComplyAdvantage|\bLSEG\b|Refinitiv|Acuris|Moody'?s/i,
  fuzzy_matching: /fuzz(?:y|iness)|match(?:ing)? threshold|match score/i,
  transliteration: /translit|non-Latin|Cyrillic|Arabic script|scripts/i,
  secondary_identifiers: /date of birth|year of birth|birth year|\bDOB\b|nationality/i,
  whitelisting: /white-?list|allow[- ]?list|good[- ]guy|suppress(?:ed|ion)? (?:of )?(?:cleared|matches)|dismiss future/i,
  calibration_docs: /threshold|fuzz(?:y|iness)|tun(?:e|ing) (?:the )?(?:match|screening)/i,
  alert_reporting: /(?:alert|screening|examiner|management|MI) reports?|hit rate|reporting dashboard/i,
  model_validation: /model validation|validation report|test files?|test pack|tuning service/i,
  transfer_screening: /payment screening|transaction screening|transfer screening|wallet screening|ISO 20022/i,
  webhooks: /webhooks?|callback URLs?/i,
  four_eyes: /four[- ]eyes?|4[- ]eyes|maker[- ]checker|second review(?:er)?/i,
  ongoing_trigger: /\b(?:daily|nightly|each night)\b|list changes?|new designations?|delta screening/i,
};
// record field -> term key (and where the field lives)
const FIELDS = [
  ['capabilities', 'data_provenance', 'data_provenance'], ['capabilities', 'fuzzy_matching', 'fuzzy_matching'],
  ['capabilities', 'transliteration', 'transliteration'], ['capabilities', 'secondary_identifiers', 'secondary_identifiers'],
  ['capabilities', 'whitelisting', 'whitelisting'], ['capabilities', 'calibration_docs', 'calibration_docs'],
  ['capabilities', 'alert_reporting', 'alert_reporting'], ['capabilities', 'model_validation', 'model_validation'],
  ['capabilities', 'transfer_screening', 'transfer_screening'], ['integration', 'webhooks', 'webhooks'],
];
const scan = (text) => {
  const lists = Object.entries(LISTS).filter(([, re]) => re.test(text)).map(([k]) => k);
  const updates = [...new Set((text.match(UPDATE) || []).map((s) => s.toLowerCase().replace(/\s+/g, ' ')))];
  const terms = Object.entries(TERMS).filter(([, re]) => re.test(text)).map(([k]) => k);
  return { lists, updates, terms };
};
const snippet = (text, re) => { const m = text.match(re); if (!m) return ''; const i = Math.max(0, m.index - 60); return text.slice(i, m.index + m[0].length + 60).trim(); };

// ---------- which pages ----------
const ranked = (load('src/_data/rankings.yml').aml?.providers || []).map((p) => p.slug).filter(Boolean);
const extra = (fs.existsSync(path.join(ROOT, 'src/_data/amlWatch.yml')) ? load('src/_data/amlWatch.yml') : {})?.extra || {};
const AML_KEYS = new Set(['sanctions_pep', 'adverse_media', 'list_coverage', 'list_updates', 'pep_tiers', 'data_provenance',
  'fuzzy_matching', 'transliteration', 'secondary_identifiers', 'whitelisting', 'alert_explanation', 'audit_trail',
  'case_management', 'calibration_docs', 'alert_reporting', 'model_validation', 'ongoing_monitoring',
  'transaction_monitoring', 'transfer_screening', 'risk_scoring', 'batch_screening', 'docs_public', 'sandbox', 'no_code', 'webhooks']);
const providers = [];
for (const slug of ranked) {
  const rec = load(`src/_data/providers/${slug}.yml`);
  const urls = new Map(); // url -> fields citing it
  const cite = (n, label) => { const u = rec.sources?.[n - 1]?.url; if (u) urls.set(u, [...(urls.get(u) || []), label]); };
  for (const top of ['capabilities', 'integration']) for (const [k, v] of Object.entries(rec[top] || {})) {
    if (!v || typeof v !== 'object' || !AML_KEYS.has(k)) continue;
    for (const [a, x] of Object.entries(v)) if ((a === 'source' || a.endsWith('_source')) && Number.isInteger(x)) cite(x, `${top}.${k}${a === 'source' ? '' : '.' + a.replace(/_source$/, '')}`);
  }
  for (const u of extra[slug] || []) if (!urls.has(u)) urls.set(u, []);
  const pages = [...urls].map(([url, fields]) => ({ id: `${slug}-${crypto.createHash('sha1').update(url).digest('hex').slice(0, 6)}`, url, fields }));
  providers.push({ slug, name: rec.name, rec, pages });
}

// ---------- fetching (same as the price watch) ----------
const UA = 'BeVerified AML watcher (+https://beverified.org/methodology/#aml)';
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
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e.toLowerCase()] ?? m);
const toText = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<svg[\s\S]*?<\/svg>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

// ---------- run ----------
const report = { date: TODAY, pages: 0, read: 0, gone: [], candidates: [], changed: [], unreadable: [] };
for (const p of providers) {
  const seen = { lists: new Set(), terms: new Set(), text: [] };
  for (const pg of p.pages) {
    report.pages++;
    const snapFile = path.join(stateDir, 'snapshots', `${pg.id}.json`);
    const prev = readJson(snapFile, null);
    let text;
    try { text = toText(await get(pg)); } catch (e) { report.unreadable.push({ id: pg.id, name: p.name, url: pg.url, why: e.message.slice(0, 200) }); continue; }
    if (text.length < 500) { report.unreadable.push({ id: pg.id, name: p.name, url: pg.url, why: 'page text under 500 characters (rendered by script?)' }); continue; }
    report.read++;
    const s = scan(text);
    s.lists.forEach((x) => seen.lists.add(x)); s.terms.forEach((x) => seen.terms.add(x)); seen.text.push(text);
    // claims the record makes from this page that the page no longer supports
    for (const f of pg.fields) {
      const [top, key, attr] = f.split('.');
      const v = p.rec[top]?.[key] || {};
      if (key === 'list_coverage' && !attr) {
        const lost = (v.lists || []).filter((l) => !s.lists.includes(l));
        if (lost.length) report.gone.push({ name: p.name, slug: p.slug, field: f, url: pg.url, what: `lists not found: ${lost.join(', ')}` });
      } else if (key === 'list_updates' && !attr && v.hours && !s.updates.length) {
        report.gone.push({ name: p.name, slug: p.slug, field: f, url: pg.url, what: 'no stated update time found on the page' });
      } else {
        const t = attr === 'four_eyes' ? 'four_eyes' : attr === 'trigger' ? 'ongoing_trigger' : FIELDS.find(([tp, k]) => tp === top && k === key)?.[2];
        if (t && ['yes', 'partial', 'add_on'].includes(String(attr ? v[attr] ?? v.status : v.status)) && !s.terms.includes(t)) report.gone.push({ name: p.name, slug: p.slug, field: f, url: pg.url, what: `term for ${t} not found` });
      }
    }
    if (prev) {
      const diff = (a = [], b = []) => [a.filter((x) => !b.includes(x)), b.filter((x) => !a.includes(x))];
      const [la, lr] = diff(s.lists, prev.lists), [ta, tr] = diff(s.terms, prev.terms), [ua, ur] = diff(s.updates, prev.updates);
      if (la.length + lr.length + ta.length + tr.length + ua.length + ur.length) report.changed.push({ name: p.name, id: pg.id, url: pg.url, la, lr, ta, tr, ua, ur });
    }
    writeJson(snapFile, { url: pg.url, date: TODAY, ...s });
  }
  // fields the record leaves open where a watched page now has the term
  const all = seen.text.join(' ');
  const cov = p.rec.capabilities?.list_coverage;
  const newLists = [...seen.lists].filter((l) => !(cov?.lists || []).includes(l));
  if (newLists.length && seen.text.length) report.candidates.push({ name: p.name, slug: p.slug, field: 'capabilities.list_coverage', what: `lists named on a watched page but not in the record: ${newLists.join(', ')}` });
  for (const [top, key, t] of FIELDS) {
    const v = p.rec[top]?.[key];
    if ((!v || ['not_disclosed', 'no'].includes(String(v.status))) && seen.terms.has(t)) report.candidates.push({ name: p.name, slug: p.slug, field: `${top}.${key}`, what: `"${snippet(all, TERMS[t]).slice(0, 200)}"` });
  }
  const cm = p.rec.capabilities?.case_management;
  if (cm && !cm.four_eyes && seen.terms.has('four_eyes')) report.candidates.push({ name: p.name, slug: p.slug, field: 'capabilities.case_management.four_eyes', what: `"${snippet(all, TERMS.four_eyes).slice(0, 200)}"` });
}

// ---------- report ----------
const md = [`# AML watch ${TODAY}`, '', `${report.read} of ${report.pages} pages read for ${providers.length} providers in the AML ranking.`, ''];
md.push('## Record claims the cited page no longer supports', '', report.gone.length ? 'The record cites this page for the field, but the list or term is no longer on it. Open the page, confirm, then fix the record in a PR.' : 'None.', '');
for (const g of report.gone) md.push(`- **${g.name}** (${g.slug}) \`${g.field}\`: ${g.what}. ${g.url}`);
md.push('', '## Candidates: terms found where the record says not disclosed', '', report.candidates.length ? 'A term is not a point. Read the passage on the page; change the record only if it states the feature plainly.' : 'None.', '');
for (const c of report.candidates) md.push(`- **${c.name}** (${c.slug}) \`${c.field}\`: ${c.what}`);
md.push('', '## Changes since the last run', '', report.changed.length ? 'Lists, terms or stated update times added (+) or removed (-) on a page since the previous read.' : 'None (or first run).', '');
for (const c of report.changed) {
  const part = (l, a, r) => (a.length || r.length ? `${l} ${a.map((x) => '+' + x).concat(r.map((x) => '-' + x)).join(' ')}` : '');
  md.push(`- ${c.name} (${c.id}): ${[part('lists', c.la, c.lr), part('terms', c.ta, c.tr), part('update times', c.ua, c.ur)].filter(Boolean).join('; ')}. ${c.url}`);
}
md.push('', '## Pages we could not read', '', report.unreadable.length ? 'Check these by hand (browser) or ask the owner for a screenshot.' : 'None.', '');
for (const u of report.unreadable) md.push(`- ${u.name} (${u.id}): ${u.why}. ${u.url}`);
const out = md.join('\n') + '\n';
fs.writeFileSync(path.join(stateDir, 'latest.md'), out);
fs.writeFileSync(path.join(stateDir, 'history', `${TODAY}.md`), out);
writeJson(path.join(stateDir, 'latest.json'), report);
console.log(`aml watch: ${report.read}/${report.pages} pages read, ${report.gone.length} unsupported claim(s), ${report.candidates.length} candidate(s), ${report.changed.length} changed, ${report.unreadable.length} unreadable`);
