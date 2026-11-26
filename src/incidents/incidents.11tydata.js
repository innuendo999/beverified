// /incidents/ security incident tracker. Data: src/_data/incidents.yml (one record per incident);
// rows, filters, vendor lookup and export in src/_lib/incidents.js. CSV/JSON: incidents-csv.njk, incidents-json.njk.
import { rows, filters, filterKeys, lookup, exportRows, toCsv, view, years, stats } from "../_lib/incidents.js";
import { guillocheLines } from "../_lib/aml-fines-page.js";

export default {
  permalink: "/incidents/",
  navCurrent: "incidents",
  seoTitle: "KYC & IDV Vendor Security Incident Tracker | BeVerified",
  seoDescription: "Data breaches, exposures and security incidents at KYC, identity verification and AML vendors since 2024, with what was exposed, who confirmed it, the vendor's response and the effect on scores.",
  eleventyComputed: {
    list: (d) => view(rows(d)).map((r) => ({ ...r, filterKeys: filterKeys(r) })),
    inc: (d) => { const l = view(rows(d)).map((r) => ({ ...r, filterKeys: filterKeys(r) })); return { years: years(l), stats: stats(l), guilloche: guillocheLines() }; },
    filters: (d) => filters(rows(d)),
    lookupData: (d) => lookup(d, rows(d)),
    incidentsCsv: (d) => toCsv(rows(d)),
    incidentsJson: (d) => ({ title: "Security incidents at identity verification and AML vendors", publisher: "BeVerified",
      url: `${d.site.url}/incidents/`, license: "CC BY 4.0", checked: d.incidents?.checked, items: exportRows(rows(d)) }),
    reviewedCount: (d) => Object.keys(d.allProviders || {}).length,
    jsonld: (d) => {
      const url = `${d.site.url}/incidents/`;
      const l = rows(d);
      return {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: "KYC and AML Vendor Incident Tracker",
            isPartOf: { "@id": `${d.site.url}/#website` }, dateModified: d.incidents?.checked,
            mainEntity: { "@type": "ItemList", itemListElement: l.map((x, i) => ({
              "@type": "ListItem", position: i + 1, name: `${x.vendor}: ${x.title}`, url: `${url}#${x.id}` })) } },
          { "@type": "Dataset", "@id": `${url}#dataset`, name: "Security incidents at identity verification and AML vendors",
            description: "Breaches, data exposures, security incidents and regulatory actions reported since 2024 at vendors reviewed by BeVerified, with data exposed, confirmation, vendor response, timeline and sources.",
            url, creator: { "@id": `${d.site.url}/#organization` }, license: "https://creativecommons.org/licenses/by/4.0/",
            dateModified: d.incidents?.checked, isAccessibleForFree: true,
            distribution: [
              { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${url}incidents.csv` },
              { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${url}incidents.json` } ] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
            { "@type": "ListItem", position: 2, name: "Incident tracker", item: url } ] },
        ],
      };
    },
  },
};
