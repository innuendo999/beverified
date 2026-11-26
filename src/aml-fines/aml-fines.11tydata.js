// /aml-fines/ AML Fines Tracker (owner approved the design canvas "BeVerified: AML Fines Tracker page,
// design proposal", 26 Nov 2026; spec docs/aml-fines.md). Data: src/_data/enforcement.yml,
// regulators.yml, enforcementDocs.json. View helpers: src/_lib/aml-fines-page.js. CSV/JSON: aml-fines-csv.njk, aml-fines-json.njk.
import { entries, months, yearStats, controlsTable, guillocheLines, exportRows, toCsv } from "../_lib/aml-fines-page.js";

const years = (d) => [...new Set((d.enforcement?.items || []).map((it) => String(it.date).slice(0, 4)))].sort().reverse();

export default {
  permalink: "/aml-fines/",
  navCurrent: "aml-fines",
  eleventyComputed: {
    seoTitle: (d) => `AML Fines Tracker ${years(d)[0]}: Bank and Fintech Money Laundering Penalties | BeVerified`,
    seoDescription: (d) => `AML, KYC and sanctions actions against banks and fintechs since 2025, each read from the regulator's own order: amounts, findings with page references, and the controls that failed.`,
    af: (d) => {
      const rows = entries(d);
      const ys = years(d);
      const stats = ys.map((y) => yearStats(d, y));
      const regs = Object.values(d.regulators?.items || {}).filter((r) => r.live).map((r) => r.short);
      return {
        rows, months: months(rows), years: ys, stats, now: stats[0], prev: stats[1] || null,
        regs, regsText: regs.length > 1 ? regs.slice(0, -1).join(", ") + " and the " + regs[regs.length - 1] : regs[0],
        checked: d.enforcement?.checked, controls: controlsTable(d, ys.slice(0, 2)), legend: stats.slice(0, 2), guilloche: guillocheLines(),
        firstOpen: rows[0]?.id,
      };
    },
    afCsv: (d) => toCsv(exportRows(d)),
    afJson: (d) => ({ title: "BeVerified AML Fines Tracker", publisher: "BeVerified", url: `${d.site.url}/aml-fines/`,
      license: "CC BY 4.0", checked: d.enforcement?.checked, items: exportRows(d) }),
    jsonld: (d) => {
      const url = `${d.site.url}/aml-fines/`;
      const rows = entries(d);
      return {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: "AML Fines Tracker",
            isPartOf: { "@id": `${d.site.url}/#website` }, dateModified: d.enforcement?.checked,
            mainEntity: { "@type": "ItemList", itemListElement: rows.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: `${r.firm}: ${r.reg} ${r.action.toLowerCase()}, ${r.day}`, url: `${url}#${r.id}` })) } },
          { "@type": "Dataset", "@id": `${url}#dataset`, name: "BeVerified AML Fines Tracker",
            description: "Final regulator actions for AML, KYC and sanctions failures at financial firms in the US, UK and EU since 1 January 2025, each built from the regulator's own document, with amounts, findings, page references, archived copies and SHA-256 hashes.",
            url, creator: { "@id": `${d.site.url}/#organization` }, license: "https://creativecommons.org/licenses/by/4.0/",
            dateModified: d.enforcement?.checked, isAccessibleForFree: true, temporalCoverage: "2025-01-01/..",
            distribution: [
              { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${url}aml-fines.csv` },
              { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${url}aml-fines.json` } ] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
            { "@type": "ListItem", position: 2, name: "AML fines tracker", item: url } ] },
        ],
      };
    },
  },
};
