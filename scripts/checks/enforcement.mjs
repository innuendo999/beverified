// AML Fines Tracker data check (docs/aml-fines.md, section 8). Part of `npm run check`.
// Errors (exit 1): unknown keys or values, missing required fields, duplicate ids, a finding
// without a pin or source level, a long excerpt from a non-federal document, dashes in
// visible text, an excerpt that fetch.mjs could not find in the document.
// Pending (report only): documents not fetched yet (no hash, archive or page count) and
// EUR/GBP amounts without an ECB rate.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { FAILURES, FIRM_TYPES, ACTIONS, POSITIONS, LEVELS, DOC_TYPES, FEDERAL, toUsd, caseTotals } from "../../src/_lib/enforcement.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const data = yaml.load(read("src/_data/enforcement.yml"));
const regs = yaml.load(read("src/_data/regulators.yml")).items;
const docs = JSON.parse(read("src/_data/enforcementDocs.json"));

const errors = [], pending = [];
const err = (id, m) => errors.push(`${id}: ${m}`);
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DASH = /[–—]/;
const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

const ids = new Set();
const items = data.items || [];
for (const it of items) {
  const id = it.id || "(no id)";
  if (ids.has(id)) err(id, "duplicate id");
  ids.add(id);
  for (const f of ["case_id", "firm", "firm_type", "country", "regulator", "date", "date_basis", "action", "position", "document", "findings", "verified"]) {
    if (it[f] == null || it[f] === "") err(id, `missing ${f}`);
  }
  if (!regs[it.regulator]) err(id, `unknown regulator "${it.regulator}"`);
  if (!FIRM_TYPES.includes(it.firm_type)) err(id, `unknown firm_type "${it.firm_type}"`);
  if (!ACTIONS.includes(it.action)) err(id, `unknown action "${it.action}"`);
  if (!POSITIONS.includes(it.position)) err(id, `unknown position "${it.position}"`);
  if (!["signed", "published"].includes(it.date_basis)) err(id, `unknown date_basis "${it.date_basis}"`);
  if (!DATE.test(String(it.date))) err(id, `date "${it.date}" is not YYYY-MM-DD`);
  if (String(it.date) < "2025-01-01") err(id, "date before 1 January 2025 (outside the tracker's period)");
  if (!DATE.test(String(it.verified))) err(id, "verified must be a YYYY-MM-DD date");
  if (it.monetary !== true && it.monetary !== false) err(id, "monetary must be true or false");
  if (it.monetary && !(it.amount && Number.isFinite(it.amount.value) && it.amount.currency)) err(id, "monetary action without amount {value, currency}");
  if (!it.monetary && it.amount) err(id, "non-monetary action with an amount");
  if (it.usd != null) err(id, "usd is computed, never typed");
  for (const f of it.failures || []) if (!FAILURES[f]) err(id, `unknown failure "${f}"`);
  if (!(it.failures || []).length) err(id, "no failures recorded");
  if (it.ranking_keys) err(id, "ranking_keys are computed from failures; use ranking_override with a note");
  if (it.ranking_override && !it.ranking_override_note) err(id, "ranking_override without ranking_override_note");
  if (!DOC_TYPES.includes(it.document?.type)) err(id, `unknown document.type "${it.document?.type}"`);
  if (!/^https:\/\//.test(it.document?.url || "")) err(id, "document.url must be https");
  if (typeof it.repeat !== "boolean") err(id, "repeat must be true or false");
  if (it.repeat && !(it.earlier || []).length) err(id, "repeat: true needs the earlier action in `earlier`");
  for (const e of it.earlier || []) if (typeof e === "string" && !items.some((x) => x.id === e)) err(id, `earlier "${e}" is not an entry`);

  const federal = FEDERAL.has(it.regulator);
  for (const [n, fd] of (it.findings || []).entries()) {
    const w = `${id}: findings[${n}]`;
    if (!fd.text) errors.push(`${w}: no text`);
    if (!fd.pin) errors.push(`${w}: no pin cite`);
    if (!LEVELS.includes(fd.level)) errors.push(`${w}: unknown level "${fd.level}"`);
    if (fd.excerpt && !federal && words(fd.excerpt) >= 15) errors.push(`${w}: excerpt from a non-federal document must be under 15 words`);
  }

  // Visible text: no en or em dashes.
  const visible = [it.firm, it.payment_note, it.position_note, it.repeat_note, it.document?.title,
    ...(it.findings || []).flatMap((f) => [f.text, f.pin]),
    ...(it.earlier || []).flatMap((e) => (typeof e === "object" ? [e.title, e.pin] : []))];
  for (const v of visible) if (v && DASH.test(v)) err(id, `dash in visible text: "${v}"`);

  // Machine fields written by fetch.mjs.
  const d = docs.docs?.[id];
  if (!d || !d.sha256) pending.push(`${id}: document not fetched yet (no hash, page count or archive copy)`);
  else {
    if (d.link_status === "archived_only") pending.push(`${id}: original link dead, page points to the archive`);
    for (const x of d.excerpts_missing || []) err(id, `excerpt not found in the document: "${x}"`);
  }
  if (it.monetary && toUsd(it.amount, String(it.date), docs.fx) == null) pending.push(`${id}: no ECB rate yet for ${it.amount.currency} on ${it.date}`);
}

// Case consistency: one firm group per case.
const byCase = new Map();
for (const it of items) {
  const g = byCase.get(it.case_id) || new Set();
  g.add(it.firm_group || it.firm);
  byCase.set(it.case_id, g);
}
for (const [c, g] of byCase) if (g.size > 1) errors.push(`case ${c}: rows from different firm groups (${[...g].join(", ")})`);

const totals = caseTotals(items, docs.fx);
console.log(`AML fines: ${items.length} action(s) in ${byCase.size} case(s).`);
for (const [c, t] of Object.entries(totals)) console.log(`  ${c}: $${t.usd.toLocaleString("en-US")}${t.complete ? "" : " (incomplete: missing FX rate)"}`);
for (const p of pending) console.log(`pending: ${p}`);
for (const e of errors) console.log(`error: ${e}`);
if (errors.length) process.exit(1);
