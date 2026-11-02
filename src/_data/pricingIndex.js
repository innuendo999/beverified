// KYC Pricing Index: built only from provider records (src/_data/providers/<slug>.yml → pricing).
// Official table: providers with a `pricing.index` block. Each cell shows `pricing.items[].value`
// verbatim, picked by item label, so the article and the reviews can never disagree.
// Third-party table: every `kind: third_party` item that carries a money figure.
// `pricing.index_exclude: "<reason>"` marks a record that has an official figure but is left out.
// A label in `index.price` / `index.minimum` that does not exist in `items` fails the build.
import fs from "node:fs";
import yaml from "js-yaml";

const dir = new URL("./providers/", import.meta.url);
const MONEY = /(?:[$€£]|\b(?:CHF|USD|EUR|GBP)\s?)\d|\d(?:\.\d+)?p\b/;
const byName = (a, b) => a.name.localeCompare(b.name, "en");
const oldest = (months) => months.filter(Boolean).sort()[0] || null;

export default function () {
  const records = fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))
    .map((f) => yaml.load(fs.readFileSync(new URL(f, dir), "utf8")))
    .filter((d) => d && d.status === "published");

  const official = [], thirdParty = [], excluded = [], noFigure = [];
  for (const d of records) {
    const pr = d.pricing || {};
    const items = pr.items || [];
    const src = (n) => {
      const s = (d.sources || [])[Number(n) - 1];
      return s ? { n: Number(n), title: s.title, publisher: s.publisher, url: s.url } : null;
    };
    const pick = (labels, what) => (labels || []).map((label) => {
      const it = items.find((i) => i.label === label && i.kind === "official");
      if (!it) throw new Error(`pricingIndex: ${d.slug} index.${what} label "${label}" not found in official pricing.items`);
      return it;
    });

    const hasOfficialFigure = items.some((i) => i.kind === "official" && MONEY.test(String(i.value)));
    const tp = items.filter((i) => i.kind === "third_party" && MONEY.test(String(i.value)));

    if (pr.index) {
      const price = pick(pr.index.price, "price");
      const minimum = pick(pr.index.minimum, "minimum");
      const used = [...price, ...minimum];
      const sources = [];
      for (const i of used) { const s = src(i.source); if (s && !sources.some((x) => x.url === s.url)) sources.push(s); }
      official.push({
        slug: d.slug, name: d.name, product: pr.index.product, included: pr.index.included,
        price: price.map(({ label, value }) => ({ label, value })),
        minimum: minimum.map(({ label, value }) => ({ label, value })),
        minimumNote: pr.index.minimum_note || (minimum.length ? null : "Not stated"),
        sources, checked: oldest(used.map((i) => i.verified)),
      });
    } else if (hasOfficialFigure) {
      excluded.push({ slug: d.slug, name: d.name, reason: pr.index_exclude || null });
    } else if (!tp.length) {
      noFigure.push(d.slug);
    }

    for (const i of tp) {
      thirdParty.push({ slug: d.slug, name: d.name, label: i.label, value: i.value, source: src(i.source), checked: i.verified || null, alsoOfficial: !!pr.index });
    }
  }

  official.sort(byName);
  thirdParty.sort(byName);
  excluded.sort(byName);
  const thirdPartyOnly = [...new Set(thirdParty.filter((t) => !t.alsoOfficial).map((t) => t.slug))];
  const unlisted = excluded.filter((e) => !e.reason).map((e) => e.slug);
  if (unlisted.length) throw new Error(`pricingIndex: official price figures but no pricing.index or pricing.index_exclude: ${unlisted.join(", ")}`);

  // price("veriff", "PEP and sanctions add-on") → that item's value, for figures quoted in article prose.
  const price = (slug, label) => {
    const d = records.find((r) => r.slug === slug);
    const it = (d?.pricing?.items || []).find((i) => i.label === label);
    if (!it) throw new Error(`pricingIndex.price: no pricing item "${label}" in ${slug}`);
    return it.value;
  };

  // Most common check month for a table, plus the rows checked in another month (shown under the table).
  const checkedSummary = (rows) => {
    const n = {}; for (const r of rows) if (r.checked) n[r.checked] = (n[r.checked] || 0) + 1;
    const month = Object.keys(n).sort((a, b) => n[b] - n[a] || b.localeCompare(a))[0] || null;
    const except = [];
    for (const r of rows) if (r.checked !== month && !except.some((e) => e.name === r.name && e.checked === r.checked)) except.push({ name: r.name, checked: r.checked });
    return { month, except };
  };

  return {
    official, thirdParty, excluded, price,
    officialChecked: checkedSummary(official),
    thirdPartyChecked: checkedSummary(thirdParty),
    counts: {
      reviewed: records.length,
      official: official.length,
      thirdPartyOnly: thirdPartyOnly.length,
      thirdPartyRows: thirdParty.length,
      noFigure: noFigure.length,
    },
    thirdPartyOnlyList: records.filter((d) => thirdPartyOnly.includes(d.slug)).map((d) => ({ slug: d.slug, name: d.name })).sort(byName),
    thirdPartyOnlyNames: records.filter((d) => thirdPartyOnly.includes(d.slug)).map((d) => d.name).sort(),
  };
}
