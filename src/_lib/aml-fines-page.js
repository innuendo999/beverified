// /aml-fines/ page view (owner approved the design canvas "BeVerified: AML Fines Tracker page,
// design proposal", 26 Nov 2026). Everything here is derived from src/_data/enforcement.yml,
// regulators.yml and enforcementDocs.json: no figure is typed.
import { FAILURES, NON_BANK, rankingKeys, toUsd, caseTotals } from "./enforcement.js";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = MONTHS.map((m) => m.slice(0, 3));
const day = (iso) => { const [y, m, d] = String(iso).split("-"); return `${Number(d)} ${MON[Number(m) - 1]} ${y}`; };
const dayShort = (iso) => { const [, m, d] = String(iso).split("-"); return `${Number(d)} ${MON[Number(m) - 1]}`; };
const usdFull = (n) => "$" + Number(n).toLocaleString("en-US");
export const usdShort = (n) => n >= 1e9 ? "$" + (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "bn"
  : n >= 1e6 ? "$" + (n / 1e6).toFixed(1).replace(/\.0$/, "") + "m" : usdFull(n);

const TYPE = { bank: "Bank", broker: "Broker-dealer", msb: "Money services", emi: "E-money", payment: "Payments", neobank: "Neobank", vasp: "Crypto", card: "Cards", casino: "Casino", individual: "Individual", other: "Other" };
const ACTION = { penalty: "Penalty", settlement: "Settlement", restriction: "Restriction", licence_revoked: "Licence revoked", cease_and_desist: "Cease and desist", order_no_penalty: "Order, no penalty", formal_agreement: "Formal agreement" };
const POSITION = { admitted: "Admitted the violations", neither_admit_nor_deny: "Neither admits nor denies", contested: "Contested", not_stated: "No admission stated" };
const LEVEL = { order: "From the order", press_notice: "From the regulator's notice", media: "From media" };

// Columns shown on the page: groups of taxonomy keys, each linked to the ranking that compares vendors for it.
export const CONTROLS = [
  { key: "program", label: "AML program", full: "AML program and governance", keys: ["aml_programme", "risk_assessment", "remediation"], href: "/providers/aml/", link: "AML providers" },
  { key: "cdd", label: "CDD and KYC", full: "Customer due diligence and KYC", keys: ["cdd", "edd", "kyb_ubo"], href: "/providers/kyc/", link: "KYC providers" },
  { key: "monitoring", label: "Monitoring", full: "Transaction monitoring", keys: ["monitoring"], href: "/providers/aml/", link: "AML providers" },
  { key: "sar", label: "SAR", full: "Suspicious activity reporting", keys: ["sar"], href: "/providers/aml/", link: "AML providers" },
  { key: "sanctions", label: "Sanctions", full: "Sanctions screening", keys: ["sanctions"], href: "/providers/aml/", link: "AML providers" },
  { key: "correspondent", label: "Correspondent", full: "Correspondent account due diligence", keys: ["correspondent_cdd"], href: "/providers/aml/banks/", link: "AML for banks" },
  { key: "crypto", label: "Crypto", full: "Crypto-specific controls", keys: ["crypto_controls"], href: "/providers/crypto/", link: "Crypto KYC providers" },
  { key: "other", label: "Other", full: "Registration, records and the wire Travel Rule", keys: ["registration", "records", "travel_rule"], href: null, link: "No ranking yet" },
];
const hits = (it, c) => c.keys.some((k) => (it.failures || []).includes(k));
const isNonBank = (it) => NON_BANK.has(it.firm_type);
const year = (it) => String(it.date).slice(0, 4);

function mrz(parts, len = 44) {
  return (parts.join("<").toUpperCase().replace(/[^A-Z0-9<]+/g, "<") + "<".repeat(len)).slice(0, len);
}

export function entries(d) {
  const items = [...(d.enforcement?.items || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const regs = d.regulators?.items || {};
  const docs = d.enforcementDocs?.docs || {};
  const fx = d.enforcementDocs?.fx || {};
  const rankings = d.rankings || {};
  return items.map((it) => {
    const reg = regs[it.regulator] || { short: it.regulator, name: it.regulator };
    const doc = docs[it.id] || {};
    const usd = it.monetary ? toUsd(it.amount, String(it.date), fx) : null;
    const controls = CONTROLS.filter((c) => hits(it, c));
    const ledger = [];
    if (it.monetary) {
      ledger.push({ k: ACTION[it.action], v: `${usdFull(it.amount.value)}${it.amount.currency !== "USD" ? " " + it.amount.currency : ""}`, strong: true });
      for (const c of it.credits || []) ledger.push({ k: `Credited for ${c.regulator}`, v: usdFull(c.value) });
      if (it.amount_payable) ledger.push({ k: `Payable to ${reg.short}`, v: usdFull(it.amount_payable.value), strong: true });
    } else {
      ledger.push({ k: ACTION[it.action], v: "No penalty; the order sets requirements" });
    }
    const trail = [];
    for (const e of it.earlier || []) {
      if (typeof e === "string") trail.push({ kind: "earlier", text: `Earlier: ${e}` });
      else trail.push({ kind: "earlier", text: `Earlier: ${e.regulator}, ${e.date}: ${e.title}` });
    }
    trail.push({ kind: "this", text: `${reg.short}, ${day(it.date)}: this ${it.document.type === "formal_agreement" ? "agreement" : "order"}` });
    for (const p of it.parallel || []) trail.push({ kind: "parallel", text: `Parallel: ${p.regulator}${p.value ? " " + usdFull(p.value) : ""}` });
    if (it.parallel_note) trail.push({ kind: "parallel", text: it.parallel_note });
    if (it.status_note) trail.push({ kind: "parallel", text: it.status_note });
    const docLine = [it.document.number ? `No. ${it.document.number}` : null, `${it.date_basis === "signed" ? "Signed" : "Published"} ${day(it.date)}`, doc.pages ? `${doc.pages} pages` : null].filter(Boolean).join(" · ");
    const rankLinks = rankingKeys(it).map((k) => ({ href: `/providers/${k}/`, label: rankings[k]?.title || rankings[k]?.name || k }));
    return {
      id: it.id, iso: String(it.date), month: String(it.date).slice(0, 7), year: year(it),
      firm: it.firm, firmType: TYPE[it.firm_type] || it.firm_type, firmDesc: it.firm_desc || "", nonBank: isNonBank(it),
      reg: reg.short, regFull: reg.name, action: ACTION[it.action], monetary: !!it.monetary,
      usd, amountShort: usd != null ? usdShort(usd) : (it.monetary ? "" : "No penalty"),
      day: day(it.date), dayShort: dayShort(it.date),
      controls: controls.map((c) => ({ label: c.full, short: c.label, href: c.href, link: c.link })),
      failText: controls.map((c) => c.label).slice(0, 3).join(", ") + (controls.length > 3 ? ` +${controls.length - 3}` : ""),
      repeat: !!it.repeat, position: POSITION[it.position] || "",
      docTitle: it.document.title, docLine, docUrl: it.document.url,
      ledger, payment_note: it.payment_note || "", position_note: it.position_note || "",
      findings: (it.findings || []).map((f) => ({ text: f.text, pin: f.pin, excerpt: f.excerpt || "", level: LEVEL[f.level] || "" })),
      requirements: it.requirements || [],
      trail, rankLinks,
      checked: it.verified, archiveUrl: doc.archive_url || "", archived: doc.archived ? day(doc.archived) : "",
      linkStatus: doc.link_status || "", sha: doc.sha256 || "",
      mrz1: mrz(["AMLF", reg.short, it.document.number || it.id.split("-").slice(-3).join(""), String(it.date).replace(/-/g, "")]),
      mrz2: mrz([it.firm, "", (doc.sha256 || "").slice(0, 12)]),
      search: `${it.firm} ${it.firm_group || ""} ${reg.short}`.toLowerCase(),
    };
  });
}

export function months(rows) {
  const out = [];
  for (const r of rows) {
    let m = out.find((x) => x.key === r.month);
    if (!m) { m = { key: r.month, label: `${MONTHS[Number(r.month.slice(5)) - 1]} ${r.month.slice(0, 4)}`, rows: [] }; out.push(m); }
    m.rows.push(r);
  }
  for (const m of out) {
    const names = [...new Set(m.rows.map((r) => r.firm.replace(/,? (N\.A\.|Inc\.|LLC|Ltd\.|AG)$/, "").replace(/ AB and its New York Branch$/, "")))];
    m.count = m.rows.length;
    m.firms = names.slice(0, 3).join(", ") + (names.length > 3 ? ` +${names.length - 3}` : "");
  }
  return out;
}

// Headline figures for one year: counts, case totals (credited penalties counted once), controls.
export function yearStats(d, y) {
  const items = (d.enforcement?.items || []).filter((it) => year(it) === y);
  const fx = d.enforcementDocs?.fx || {};
  const totals = caseTotals(items, fx);
  const nb = items.filter(isNonBank);
  const nbTotals = caseTotals(nb, fx);
  const sum = (t) => Object.values(t).reduce((a, b) => a + b.usd, 0);
  const cases = Object.keys(totals).length;
  const byCase = Object.entries(totals).sort((a, b) => b[1].usd - a[1].usd);
  let largest = null;
  if (byCase.length) {
    const [caseId, t] = byCase[0];
    const rows = items.filter((it) => it.case_id === caseId);
    const regs = d.regulators?.items || {};
    const names = [...new Set(rows.map((r) => regs[r.regulator]?.short || r.regulator))];
    largest = { firm: rows[0].firm_group || rows[0].firm, usd: t.usd, usdText: usdShort(t.usd), regulators: names, regText: names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names[0], date: day(rows.map((r) => String(r.date)).sort().pop()) };
  }
  const count = (c) => items.filter((it) => hits(it, c)).length;
  const repeats = items.filter((it) => it.repeat).map((it) => it.firm);
  return {
    year: y, actions: items.length, cases, usd: sum(totals), usdText: usdFull(sum(totals)), usdShort: usdShort(sum(totals)),
    nonBankActions: nb.length, nonBankUsd: sum(nbTotals), nonBankShort: usdShort(sum(nbTotals)),
    controls: Object.fromEntries(CONTROLS.map((c) => [c.key, count(c)])), repeats, largest,
  };
}

export function controlsTable(d, years) {
  const stats = years.map((y) => yearStats(d, y));
  return CONTROLS.map((c) => ({
    full: c.full, href: c.href, link: c.link,
    years: stats.map((s) => { const pct = s.actions ? Math.round((s.controls[c.key] / s.actions) * 100) : 0; return { year: s.year, n: s.controls[c.key], of: s.actions, pct, w: Math.max(2, pct) }; }),
  }));
}

export function guillocheLines() {
  const out = [];
  for (let k = 0; k < 11; k++) {
    const pts = [];
    for (let x = 0; x <= 1280; x += 16) {
      const y = 230 + (70 + k * 8) * Math.sin(x / 150 + k * 0.5) * Math.cos(x / 430 - k * 0.28);
      pts.push(`${x} ${Math.round(y)}`);
    }
    out.push({ d: "M" + pts.join(" L"), strong: k === 3 || k === 7 });
  }
  return out;
}

const CSV_COLS = ["id", "case_id", "date", "date_basis", "regulator", "firm", "firm_type", "country", "action", "amount", "currency", "usd", "failures", "position", "repeat", "document_title", "document_number", "document_url", "archive_url", "sha256", "pages", "verified"];
export function exportRows(d) {
  const docs = d.enforcementDocs?.docs || {};
  const fx = d.enforcementDocs?.fx || {};
  return (d.enforcement?.items || []).map((it) => {
    const doc = docs[it.id] || {};
    return {
      id: it.id, case_id: it.case_id, date: String(it.date), date_basis: it.date_basis, regulator: it.regulator, firm: it.firm,
      firm_type: it.firm_type, country: it.country, action: it.action,
      amount: it.monetary ? it.amount.value : null, currency: it.monetary ? it.amount.currency : null,
      usd: it.monetary ? toUsd(it.amount, String(it.date), fx) : null,
      failures: it.failures, position: it.position, repeat: !!it.repeat,
      document_title: it.document.title, document_number: it.document.number || null, document_url: it.document.url,
      archive_url: doc.archive_url || null, sha256: doc.sha256 || null, pages: doc.pages || null, verified: it.verified,
      findings: (it.findings || []).map((f) => ({ text: f.text, pin: f.pin, excerpt: f.excerpt || null, level: f.level })),
      requirements: it.requirements || [],
    };
  });
}
export function toCsv(rows) {
  const esc = (v) => { const s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  return [CSV_COLS.join(","), ...rows.map((r) => CSV_COLS.map((c) => esc(r[c])).join(","))].join("\n") + "\n";
}
