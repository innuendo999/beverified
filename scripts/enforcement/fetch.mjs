// AML Fines Tracker: document fetch (docs/aml-fines.md, section 8). Runs in GitHub Actions,
// because sessions cannot reach most regulator sites. For every entry in enforcement.yml:
// - downloads the document, stores its SHA-256 and page count (pdfinfo, from poppler-utils);
// - extracts its text (pdftotext, or tag-stripped HTML) and checks that every excerpt appears in it;
// - makes sure an archived copy exists in the Wayback Machine and stores its address;
// - marks a dead original as `archived_only` (the page then points to the archive);
// - stores ECB reference rates (USD and GBP per EUR) for every date with a EUR or GBP amount.
// Writes src/_data/enforcementDocs.json and a Markdown report (argument --report <file>).
// Never edits enforcement.yml. A network failure keeps the previous values and is reported.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const outFile = path.join(root, "src/_data/enforcementDocs.json");
const reportArg = process.argv.indexOf("--report");
const reportFile = reportArg > -1 ? process.argv[reportArg + 1] : null;
const UA = "Mozilla/5.0 (compatible; BeVerifiedBot/1.0; +https://beverified.org/aml-fines/)";
const today = new Date().toISOString().slice(0, 10);

const data = yaml.load(fs.readFileSync(path.join(root, "src/_data/enforcement.yml"), "utf8"));
const prev = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")) : { docs: {}, fx: {} };
const out = { generated: today, docs: {}, fx: { ...(prev.fx || {}) } };
const report = [];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, opts = {}) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { redirect: "follow", headers: { "user-agent": UA }, signal: AbortSignal.timeout(60000), ...opts });
      return res;
    } catch (e) {
      if (i === 2) throw e;
      await sleep(3000 * (i + 1));
    }
  }
}

const norm = (s) => String(s)
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
  .replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim().toLowerCase();

function htmlText(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&sect;/g, "§").replace(/&para;/g, "¶");
}

function pdfFacts(buf) {
  const tmp = path.join(os.tmpdir(), `doc-${crypto.randomUUID()}.pdf`);
  fs.writeFileSync(tmp, buf);
  try {
    const info = execFileSync("pdfinfo", [tmp], { encoding: "utf8" });
    const pages = Number((info.match(/^Pages:\s+(\d+)/m) || [])[1]) || null;
    const text = execFileSync("pdftotext", ["-layout", tmp, "-"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    return { pages, text };
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

async function wayback(url) {
  const q = await get(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`);
  const j = q && q.ok ? await q.json().catch(() => null) : null;
  const snap = j?.archived_snapshots?.closest;
  if (snap?.available) return { archive_url: snap.url.replace(/^http:/, "https:"), archived: `${snap.timestamp.slice(0, 4)}-${snap.timestamp.slice(4, 6)}-${snap.timestamp.slice(6, 8)}` };
  const save = await get(`https://web.archive.org/save/${url}`).catch(() => null);
  const loc = save?.headers?.get("content-location");
  if (loc) return { archive_url: `https://web.archive.org${loc}`, archived: today };
  if (save?.ok && save.url.includes("web.archive.org/web/")) return { archive_url: save.url, archived: today };
  return null;
}

for (const it of data.items || []) {
  const old = prev.docs?.[it.id] || {};
  const rec = { ...old };
  const url = it.document?.url;
  const excerpts = (it.findings || []).map((f) => f.excerpt).filter(Boolean);
  try {
    const res = await get(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const type = res.headers.get("content-type") || "";
    const isPdf = type.includes("pdf") || buf.subarray(0, 4).toString() === "%PDF";
    const { pages, text } = isPdf ? pdfFacts(buf) : { pages: old.pages ?? null, text: htmlText(buf.toString("utf8")) };
    const sha256 = crypto.createHash("sha256").update(buf).digest("hex");
    if (old.sha256 && old.sha256 !== sha256) report.push(`- **${it.id}**: the document changed since ${old.checked} (old hash ${old.sha256.slice(0, 12)}). Re-check the entry.`);
    const body = norm(text);
    const missing = excerpts.filter((x) => !body.includes(norm(x)));
    Object.assign(rec, { sha256, pages: isPdf ? pages : null, format: isPdf ? "pdf" : "html", bytes: buf.length, link_status: "ok", checked: today, excerpts_checked: excerpts.length, excerpts_missing: missing });
    if (missing.length) report.push(`- **${it.id}**: ${missing.length} excerpt(s) not found in the document: ${missing.map((m) => `"${m}"`).join("; ")}`);
  } catch (e) {
    rec.link_status = old.archive_url ? "archived_only" : "failed";
    rec.last_error = `${today}: ${e.message}`;
    report.push(`- **${it.id}**: could not fetch the document (${e.message}); ${rec.link_status === "archived_only" ? "the page will point to the archived copy" : "no archived copy yet"}.`);
  }
  if (!rec.archive_url && rec.link_status !== "failed") {
    try {
      const w = await wayback(url);
      if (w) Object.assign(rec, w);
      else report.push(`- **${it.id}**: no Wayback copy could be made.`);
    } catch (e) {
      report.push(`- **${it.id}**: Wayback request failed (${e.message}).`);
    }
    await sleep(5000); // Save Page Now rate limit
  }
  out.docs[it.id] = rec;
}

// ECB reference rates for EUR and GBP amounts (USD per EUR, GBP per EUR), on the action date
// or the last ECB business day before it.
const need = new Set();
for (const it of data.items || []) {
  const cur = [it.amount?.currency, ...(it.credits || []).map((c) => c.currency)];
  if (cur.some((c) => c === "EUR" || c === "GBP") && !out.fx[it.date]) need.add(String(it.date));
}
for (const date of need) {
  try {
    const start = new Date(Date.parse(date) - 10 * 864e5).toISOString().slice(0, 10);
    const res = await get(`https://data-api.ecb.europa.eu/service/data/EXR/D.USD+GBP.EUR.SP00.A?startPeriod=${start}&endPeriod=${date}&format=csvdata`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.text()).trim().split("\n").map((l) => l.split(","));
    const head = rows.shift();
    const iC = head.indexOf("CURRENCY"), iT = head.indexOf("TIME_PERIOD"), iV = head.indexOf("OBS_VALUE");
    const last = {};
    for (const r of rows) if (!last[r[iC]] || r[iT] > last[r[iC]].t) last[r[iC]] = { t: r[iT], v: Number(r[iV]) };
    if (!last.USD) throw new Error("no USD rate in range");
    out.fx[date] = { USD: last.USD.v, GBP: last.GBP?.v ?? null, date: last.USD.t, source: "ECB euro foreign exchange reference rates" };
  } catch (e) {
    report.push(`- ECB rate for ${date} not stored (${e.message}).`);
  }
}

fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + "\n");
const summary = [`# AML fines document check, ${today}`, "", `${Object.keys(out.docs).length} document(s) checked.`, "", ...(report.length ? report : ["Nothing to report."]), ""].join("\n");
if (reportFile) fs.writeFileSync(reportFile, summary);
console.log(summary);
