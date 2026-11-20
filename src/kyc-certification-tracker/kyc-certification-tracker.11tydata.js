// /kyc-certification-tracker/ (owner approved the design canvas "BeVerified: KYC Certification Tracker, page design", 2026-11-20).
// Rows, filters and export: src/_lib/cert-tracker.js from provider records. Page settings: src/_data/certTracker.yml.
// CSV/JSON: tracker-csv.njk, tracker-json.njk. Spec: docs/cert-tracker.md.
import { COLUMNS, rows, filters, exportRows, toCsv } from "../_lib/cert-tracker.js";

export default {
  permalink: "/kyc-certification-tracker/",
  navCurrent: "certifications",
  seoTitle: "KYC Certification Tracker: iBeta, UK DVS, FIDO and SOC 2 | BeVerified",
  seoDescription: "Which KYC and identity verification providers hold an iBeta liveness letter, UK DVS certification, FIDO IDV, ACCS, ISO/IEC 27001 or SOC 2, checked against the issuers' own registers.",
  eleventyComputed: {
    columns: () => COLUMNS,
    list: (d) => rows(d),
    filters: (d) => filters(rows(d)),
    confirmedCount: (d) => rows(d).filter((r) => r.okKeys).length,
    sourcesMain: (d) => (d.certTracker?.sources || []).filter((s) => !s.checked),
    sourcesOther: (d) => (d.certTracker?.sources || []).filter((s) => s.checked),
    changeList: (d) => (d.certTracker?.changes || []).map((c) => ({ ...c, name: d.allProviders?.[c.slug]?.name || c.slug })),
    trackerCsv: (d) => toCsv(exportRows(rows(d))),
    trackerJson: (d) => ({ title: "KYC Certification Tracker", publisher: "BeVerified", url: `${d.site.url}/kyc-certification-tracker/`,
      license: "CC BY 4.0", checked: d.certTracker?.checked, items: exportRows(rows(d)) }),
    jsonld: (d) => {
      const url = `${d.site.url}/kyc-certification-tracker/`;
      const l = rows(d);
      return {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: "KYC Certification Tracker",
            isPartOf: { "@id": `${d.site.url}/#website` }, dateModified: d.certTracker?.checked,
            mainEntity: { "@type": "ItemList", itemListElement: l.map((x, i) => ({
              "@type": "ListItem", position: i + 1, name: x.name, url: `${d.site.url}/providers/${x.slug}/` })) } },
          { "@type": "Dataset", "@id": `${url}#dataset`, name: "KYC Certification Tracker",
            description: "Independent test results and certifications of KYC and identity verification providers reviewed by BeVerified: iBeta ISO/IEC 30107-3 letters, UK DVS register, FIDO IDV, DHS RIVR, ACCS, ISO/IEC 27001 and SOC 2, each marked confirmed on the issuer's register or stated by the vendor, with sources.",
            url, creator: { "@id": `${d.site.url}/#organization` }, license: "https://creativecommons.org/licenses/by/4.0/",
            dateModified: d.certTracker?.checked, isAccessibleForFree: true,
            distribution: [
              { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${url}certifications.csv` },
              { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${url}certifications.json` } ] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
            { "@type": "ListItem", position: 2, name: "KYC Certification Tracker", item: url } ] },
        ],
      };
    },
  },
};
