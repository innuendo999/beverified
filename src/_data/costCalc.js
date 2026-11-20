// KYC cost calculator in the KYC Pricing Index hero and the compact block on /providers/kyc/
// (owner approved the canvas "BeVerified: KYC Pricing Index with cost calculator, design", 2026-11-20).
// Built only from provider records: budget{} + pricing.items via calcProvider() in src/_lib/budget.js,
// the same figures as the Budget KYC calculator. Spec: docs/cost-calculator.md.
import fs from "node:fs";
import yaml from "js-yaml";
import { calcProvider, padLevel } from "../_lib/budget.js";
import { KYC_CATS } from "../_lib/cert-tracker.js";

const dir = new URL("./providers/", import.meta.url);
const MONEY = /(?:[$€£]|\b(?:CHF|USD|EUR|GBP)\s?)\d|\d(?:\.\d+)?p\b/;
const STALE_DAYS = 90;

export default function () {
  const now = Date.now();
  const recs = fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))
    .map((f) => yaml.load(fs.readFileSync(new URL(f, dir), "utf8")))
    .filter((d) => d && d.status === "published" && (d.categories || []).some((c) => KYC_CATS.includes(c)))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  const priced = [], partial = [], onRequest = [], stale = [];
  for (const d of recs) {
    const b = d.budget;
    if (b?.options?.length) {
      const age = (now - new Date(b.checked).getTime()) / 864e5;
      if (age > STALE_DAYS) { stale.push({ slug: d.slug, name: d.name, checked: b.checked }); continue; }
      const c = calcProvider(d, null, null);
      priced.push({ slug: c.slug, name: c.name, url: c.url, badges: c.badges, notes: c.notes, opts: c.opts,
        quoteAbove: c.quoteAbove, checked: b.checked, ibeta: padLevel(d) > 0 });
      continue;
    }
    const items = (d.pricing?.items || []).filter((i) => i.kind === "official" && MONEY.test(String(i.value)));
    if (items.length) partial.push({ slug: d.slug, name: d.name, text: `${items[0].label}: ${items[0].value}` });
    else onRequest.push({ slug: d.slug, name: d.name });
  }
  const dates = priced.map((p) => p.checked).sort();
  return { priced, partial, onRequest, stale, checkedFrom: dates[0] || null, checkedTo: dates[dates.length - 1] || null };
}
