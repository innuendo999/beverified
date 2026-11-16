#!/usr/bin/env node
// News candidates collector. Reads the sources and rules in scripts/news/sources.yml,
// fetches each feed or listing page, sorts every item into a route (news, incident,
// record-check, digest, research-check, skip) and writes the result to a state folder.
// It never writes an article. Spec: docs/news-pipeline.md.
//
// Usage:
//   node scripts/news/collect.mjs --state <dir> [--config scripts/news/sources.yml]
//        [--fixtures <dir>] [--now 2026-11-16T06:00:00Z]
// --fixtures reads <dir>/<source-id>.xml|html instead of the network (tests, local runs).
//
// Output in <dir>:
//   candidates.json  every item kept from this run (route != skip), newest first
//   skipped.json     items skipped in this run, with the rule that skipped them
//   seen.json        url hash -> first seen date (dedupe across runs, kept 90 days)
//   latest.md        short human-readable summary of this run

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const configPath = arg('config', path.join(ROOT, 'scripts/news/sources.yml'));
const stateDir = arg('state');
const fixturesDir = arg('fixtures');
const NOW = new Date(arg('now', new Date().toISOString()));
if (!stateDir) {
  console.error('Missing --state <dir>');
  process.exit(2);
}

const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
fs.mkdirSync(stateDir, { recursive: true });

// ---------- providers from our records ----------

const LEGAL_SUFFIX = /\b(ltd|llc|inc|ag|gmbh|plc|sa|bv|oy|ou|limited|corp|corporation)\.?$/i;

function loadProviders() {
  const out = [];
  const dir = path.join(ROOT, 'src/_data/providers');
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.yml'))) {
    const rec = yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')) || {};
    if (!rec.name) continue;
    const names = new Set([rec.name]);
    if (rec.rebranded_to) names.add(rec.rebranded_to);
    for (const n of rec.alternate_names || []) {
      if (typeof n === 'string' && !LEGAL_SUFFIX.test(n.trim())) names.add(n);
    }
    out.push({ slug: rec.slug || f.replace(/\.yml$/, ''), name: rec.name, names: [...names], reviewed: true });
  }
  const tracked = yaml.load(fs.readFileSync(path.join(ROOT, 'src/_data/tracked.yml'), 'utf8')) || [];
  for (const t of tracked) {
    if (t && t.name) out.push({ slug: null, name: t.name, names: [t.name], reviewed: false });
  }
  return out;
}

const providers = loadProviders();
const ambiguous = new Set((config.ambiguous_names || []).map((n) => n.toLowerCase()));

// ---------- text helpers ----------

const decode = (s) =>
  String(s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#039;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Whole-word, case-insensitive phrase match.
function has(text, phrase) {
  return new RegExp(`(^|[^a-z0-9])${esc(phrase.toLowerCase())}($|[^a-z0-9])`).test(text);
}
const hasAny = (text, list = []) => list.find((p) => has(text, p)) || null;

function parseDate(s) {
  if (!s) return null;
  let d = new Date(s);
  if (!isNaN(d)) return d;
  // FCA style: "Thursday, November 12, 2026 - 10:05"
  const m = String(s).match(/([A-Za-z]+ \d{1,2}, \d{4})\s*-\s*(\d{1,2}:\d{2})/);
  if (m) {
    d = new Date(`${m[1]} ${m[2]} UTC`);
    if (!isNaN(d)) return d;
  }
  return null;
}

// ---------- parsers ----------

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? m[1] : '';
}

function parseFeed(xml) {
  const items = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    let link = decode(tag(b, 'link'));
    if (!link) {
      const m = b.match(/<link[^>]*href="([^"]+)"/i);
      link = m ? m[1].replace(/&amp;/g, '&') : '';
    }
    items.push({
      title: decode(tag(b, 'title')),
      url: link,
      date: parseDate(decode(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date'))),
      summary: decode(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content')).slice(0, 600),
      publisher: decode(tag(b, 'source')),
    });
  }
  return items;
}

function parseListing(html, source) {
  const base = new URL(source.url);
  const re = new RegExp(source.link_pattern);
  const seen = new Set();
  const items = [];
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    let href = m[1].replace(/&amp;/g, '&');
    let u;
    try {
      u = new URL(href, base);
    } catch {
      continue;
    }
    if (u.host !== base.host || !re.test(u.pathname)) continue;
    const title = decode(m[2]);
    if (!title || title.length < 12 || seen.has(u.pathname)) continue;
    seen.add(u.pathname);
    // OFAC paths carry the date: /recent-actions/20261113
    const dm = u.pathname.match(/(\d{4})(\d{2})(\d{2})/);
    items.push({
      title,
      url: u.href,
      date: dm ? new Date(`${dm[1]}-${dm[2]}-${dm[3]}T12:00:00Z`) : null,
      summary: '',
      publisher: source.name,
    });
  }
  return items.slice(0, 40);
}

// ---------- fetching ----------

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'BeVerifiedNewsBot/1.0 (+https://beverified.org/about/)',
      accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.8',
    },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function fixture(id, suffix = '') {
  for (const ext of ['xml', 'html']) {
    const p = path.join(fixturesDir, `${id}${suffix}.${ext}`);
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  }
  return null;
}

async function load(source) {
  if (source.type === 'gnews_providers') {
    const size = source.batch || 6;
    const names = providers.map((p) => p.name);
    const items = [];
    for (let i = 0; i < names.length; i += size) {
      const q = names
        .slice(i, i + size)
        .map((n) => (ambiguous.has(n.toLowerCase()) ? `("${n}" "identity verification")` : `"${n}"`))
        .join(' OR ');
      const batchNo = i / size;
      const text = fixturesDir
        ? fixture(source.id, `-${batchNo}`)
        : await fetchText(source.url + encodeURIComponent(`(${q}) when:7d`));
      if (text) items.push(...parseFeed(text));
    }
    // Google News titles end with " - Publisher"
    for (const it of items) {
      const m = it.title.match(/^(.*) - ([^-]+)$/);
      if (m) {
        it.title = m[1].trim();
        it.publisher = it.publisher || m[2].trim();
      }
    }
    return items;
  }
  const text = fixturesDir ? fixture(source.id) : await fetchText(source.url);
  if (text == null) return [];
  if (source.type === 'html') return parseListing(text, source);
  const items = parseFeed(text);
  if (source.url.includes('news.google.com')) {
    for (const it of items) {
      const m = it.title.match(/^(.*) - ([^-]+)$/);
      if (m) {
        it.title = m[1].trim();
        it.publisher = it.publisher || m[2].trim();
      }
    }
  }
  return items;
}

// ---------- classification ----------

function matchProviders(text) {
  const hits = [];
  for (const p of providers) {
    const name = p.names.find((n) => has(text, n));
    if (!name) continue;
    if (ambiguous.has(p.name.toLowerCase()) && !hasAny(text, config.context_keywords)) continue;
    hits.push({ slug: p.slug, name: p.name, reviewed: p.reviewed });
  }
  return hits;
}

const MULT = { thousand: 1e3, k: 1e3, million: 1e6, m: 1e6, mn: 1e6, mln: 1e6, billion: 1e9, bn: 1e9, b: 1e9 };
const SYMBOL = { $: 'USD', '£': 'GBP', '€': 'EUR' };

// Largest money amount in the text, e.g. "$1.2 billion", "£42m", "EUR 5 million", "HK$16.2m".
function largestAmount(raw) {
  let best = null;
  const re = /(?:(US\$|HK\$|S\$|A\$|C\$|\$|£|€)|\b(USD|EUR|GBP|CHF|HKD|SGD|AUD|CAD|INR|AED|BRL)\s?)\s?(\d[\d,]*(?:\.\d+)?)\s?(thousand|million|billion|mln|mn|bn|k|m|b)?\b/gi;
  for (const m of raw.matchAll(re)) {
    const sym = m[1];
    let currency = sym ? SYMBOL[sym] || { 'US$': 'USD', 'HK$': 'HKD', 'S$': 'SGD', 'A$': 'AUD', 'C$': 'CAD' }[sym.toUpperCase()] : m[2].toUpperCase();
    const n = parseFloat(m[3].replace(/,/g, '')) * (m[4] ? MULT[m[4].toLowerCase()] : 1);
    if (!isFinite(n)) continue;
    if (!best || n > best.amount) best = { amount: n, currency };
  }
  return best;
}

function region(source, text) {
  if (source.region !== 'Global') return source.region;
  if (source.id === 'gnews-fatf' || /\bfatf\b/.test(text)) return 'Global';
  const other = hasAny(text, config.regions.other_markers);
  return other ? `other:${other}` : 'Global';
}

function classify(item, source) {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  const raw = `${item.title} ${item.summary}`;
  const provs = matchProviders(text);
  const reg = region(source, text);
  const base = { providers: provs, region: reg };

  for (const rule of config.rules) {
    if (rule.sources && !rule.sources.includes(source.id)) continue;
    if (rule.needs_provider && !provs.length) continue;

    if (rule.id === 'fallback') return { ...base, rule: rule.id, route: rule.route, reason: rule.reason };

    let hit = rule.any ? hasAny(text, rule.any) : 'source';
    if (!hit && rule.generic) {
      const g = hasAny(text, rule.generic);
      if (g && hasAny(text, rule.context)) hit = g;
    } else if (hit && rule.context && !rule.generic && !hasAny(text, rule.context)) {
      hit = null;
    }
    if (!hit) continue;
    if (rule.unless && hasAny(text, rule.unless)) continue;
    if (rule.needs_research && !hasAny(text, rule.needs_research)) continue;

    let route = rule.route;
    const out = { ...base, rule: rule.id, matched: hit, route, priority: rule.priority || null, reason: rule.reason };
    if (rule.also) out.also = rule.also;

    if (rule.news_if && hasAny(text, rule.news_if)) {
      out.route = 'news';
      out.reason += ` Promoted to news: "${hasAny(text, rule.news_if)}".`;
    }
    if (rule.news_if_fine_at_least_threshold) {
      const amt = largestAmount(raw);
      out.fine = amt;
      const { threshold, face_value_currencies: fv } = config.fines;
      if (!amt) {
        out.reason += ' Amount not found in the title or summary: check the primary source.';
        out.check_amount = true;
      } else if (fv.includes(amt.currency)) {
        if (amt.amount >= threshold) out.route = 'news';
      } else {
        out.reason += ` Amount in ${amt.currency}: compare with USD ${threshold / 1e6}M by hand.`;
        out.check_amount = true;
      }
    }
    // Outside the focus regions: no standalone news, digest only.
    if (reg.startsWith('other:') && out.route === 'news') {
      out.route = 'digest';
      out.reason += ` Outside the US/UK/EU focus (${reg.slice(6)}).`;
    }
    return out;
  }
  return { ...base, rule: 'none', route: 'skip', reason: 'No rule.' };
}

// ---------- dedupe against the site and earlier runs ----------

const hash = (u) => crypto.createHash('sha1').update(normaliseUrl(u)).digest('hex').slice(0, 16);

function normaliseUrl(u) {
  try {
    const x = new URL(u);
    for (const k of [...x.searchParams.keys()]) if (/^utm_|^fbclid$|^gclid$/.test(k)) x.searchParams.delete(k);
    x.hash = '';
    return x.href.replace(/\/$/, '').toLowerCase();
  } catch {
    return String(u).toLowerCase();
  }
}

function siteSourceUrls() {
  const set = new Set();
  for (const section of ['news', 'guide', 'publications']) {
    const dir = path.join(ROOT, 'src', section);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const txt = fs.readFileSync(path.join(dir, f), 'utf8');
      for (const m of txt.matchAll(/^\s*url:\s*["']?([^"'\s]+)/gm)) set.add(normaliseUrl(m[1]));
    }
  }
  return set;
}

const seenPath = path.join(stateDir, 'seen.json');
const seen = fs.existsSync(seenPath) ? JSON.parse(fs.readFileSync(seenPath, 'utf8')) : {};
const onSite = siteSourceUrls();
// Day granularity: an item dated 7 days ago (any time of day) still counts.
const cutoff = new Date(new Date(NOW.getTime() - config.max_age_days * 864e5).toISOString().slice(0, 10) + 'T00:00:00Z');

// ---------- run ----------

const kept = [];
const skipped = [];
const errors = [];
const today = NOW.toISOString().slice(0, 10);

for (const source of config.sources) {
  if (source.enabled === false) continue;
  let items;
  try {
    items = await load(source);
  } catch (e) {
    errors.push({ source: source.id, error: String(e.message || e) });
    continue;
  }
  for (const it of items) {
    if (!it.url || !it.title) continue;
    const id = hash(it.url);
    const rec = {
      id,
      title: it.title,
      url: it.url,
      date: it.date ? it.date.toISOString().slice(0, 10) : null,
      source: source.id,
      source_name: source.name,
      publisher: it.publisher || source.name,
      tier: source.tier,
      needs_primary_source: source.tier !== 1,
    };
    if (onSite.has(normaliseUrl(it.url))) {
      skipped.push({ ...rec, rule: 'covered', reason: 'Already a source of an article on the site.' });
      continue;
    }
    if (seen[id]) continue;
    if (it.date && it.date < cutoff) {
      skipped.push({ ...rec, rule: 'too-old', reason: `Older than ${config.max_age_days} days.` });
      continue;
    }
    const c = classify(it, source);
    const full = { ...rec, ...c, first_seen: today };
    seen[id] = today;
    (c.route === 'skip' ? skipped : kept).push(full);
  }
}

// Same story from several sources: keep the tier 1 copy first.
const ROUTE_ORDER = { news: 0, incident: 1, 'record-check': 2, 'research-check': 3, digest: 4 };
kept.sort(
  (a, b) =>
    ROUTE_ORDER[a.route] - ROUTE_ORDER[b.route] ||
    (a.priority || 9) - (b.priority || 9) ||
    a.tier - b.tier ||
    String(b.date).localeCompare(String(a.date)),
);

// Forget seen URLs after 90 days.
const forget = new Date(NOW.getTime() - 90 * 864e5).toISOString().slice(0, 10);
for (const [k, d] of Object.entries(seen)) if (d < forget) delete seen[k];

// candidates.json accumulates open candidates; the drafting task marks them done.
const candPath = path.join(stateDir, 'candidates.json');
const previous = fs.existsSync(candPath) ? JSON.parse(fs.readFileSync(candPath, 'utf8')) : { items: [] };
const open = previous.items.filter((x) => !x.status && x.first_seen >= forget);
const closed = previous.items.filter((x) => x.status && x.first_seen >= forget);
const all = [...kept, ...open, ...closed];

fs.writeFileSync(candPath, JSON.stringify({ generated: NOW.toISOString(), items: all }, null, 2) + '\n');
fs.writeFileSync(path.join(stateDir, 'skipped.json'), JSON.stringify({ generated: NOW.toISOString(), items: skipped }, null, 2) + '\n');
fs.writeFileSync(seenPath, JSON.stringify(seen, null, 2) + '\n');

const count = (r) => kept.filter((x) => x.route === r).length;
const lines = [
  `# News candidates, ${today}`,
  '',
  `New this run: ${kept.length} kept (news ${count('news')}, incident ${count('incident')}, record-check ${count('record-check')}, research-check ${count('research-check')}, digest ${count('digest')}), ${skipped.length} skipped.`,
  `Open candidates in total: ${kept.length + open.length}.`,
  '',
];
if (errors.length) {
  lines.push('## Source errors', '');
  for (const e of errors) lines.push(`- ${e.source}: ${e.error}`);
  lines.push('');
}
for (const r of Object.keys(ROUTE_ORDER)) {
  const list = kept.filter((x) => x.route === r);
  if (!list.length) continue;
  lines.push(`## ${r}`, '');
  for (const x of list) {
    const flags = [x.needs_primary_source ? 'find primary source' : null, x.check_amount ? 'check amount' : null, x.also || null]
      .filter(Boolean)
      .join(', ');
    lines.push(`- [${x.title}](${x.url}) (${x.publisher}, ${x.date || 'no date'})${flags ? ` · ${flags}` : ''}`);
  }
  lines.push('');
}
fs.writeFileSync(path.join(stateDir, 'latest.md'), lines.join('\n'));

console.log(lines.slice(0, 4).join('\n'));
if (errors.length) console.log(`Source errors: ${errors.map((e) => e.source).join(', ')}`);
