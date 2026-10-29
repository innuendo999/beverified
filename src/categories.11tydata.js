// Computed data for category and region ranking pages (src/categories.njk).
// Content: src/_data/categories/<slug>.yml; order and cards: src/_data/rankings.yml;
// scores, logos and links always come from the provider records.
import { CAP_LABELS, NOTE_KEYS, CAP_STATUS, CERT_KEYS, certCell } from "./_lib/capabilities.js";
import { termForCapability } from "./_lib/glossary.js";

export default {
  pagination: { data: "categories", size: 1, alias: "c", resolve: "values", addAllPagesToCollections: true },
  permalink: (data) => data.c.url,
  eleventyComputed: {
    navCurrent: (d) => (["brazil", "canada", "india", "mexico", "peru", "south-africa"].includes(d.c.slug) ? "regions" : "use-cases"),
    seoTitle: (d) => d.c.seo?.title,
    seoDescription: (d) => d.c.seo?.description,
    updated: (d) => [d.c.updated, d.c.last_verified].filter(Boolean).sort().pop(),
    author: (d) => d.authors?.[d.c.author] || null,
    entries: (d) => (d.rankings[d.c.slug]?.providers || []).map((r, i) => ({
      rank: i + 1, r, q: r.slug ? d.providers[r.slug] || null : null,
    })),
    // Capability matrix: columns from the category file, cells from each ranked provider's capabilities{}
    // and, for certificate columns, from its certifications[].
    matrix: (d) => {
      const cols = (d.c.capability_columns || []).filter((k) => CAP_LABELS[k]);
      if (!cols.length) return null;
      const certMode = cols.some((k) => CERT_KEYS.includes(k));
      const rows = (d.rankings[d.c.slug]?.providers || [])
        .map((r) => (r.slug ? d.providers[r.slug] : null))
        .filter((q) => q && ((q.capabilities && cols.some((k) => q.capabilities[k])) || (certMode && q.certifications?.length)))
        .map((q) => ({
          slug: q.slug, name: q.name,
          cells: cols.map((k) => {
            const v = CERT_KEYS.includes(k) ? certCell(k, q.certifications) : (q.capabilities?.[k] || { status: "not_disclosed" });
            const status = String(v.status || "not_disclosed");
            const st = CAP_STATUS[status] || CAP_STATUS.not_disclosed;
            let label = st[1], note = (["add_on", "partial"].includes(status) || (NOTE_KEYS.includes(k) && status !== "not_disclosed")) ? v.note : null;
            if (k === "liveness_pad" && v.level) { label = `Level ${v.level}`; if (status === "vendor_stated") note = "Vendor-stated"; }
            if ((k === "trust_framework" || k === "age_certification") && v.names) note = v.names;
            if (note) note = note.charAt(0).toUpperCase() + note.slice(1);
            return { key: k, status, sym: st[0], label, note, source: v.source || null };
          }),
        }));
      if (!rows.length) return null;
      const checked = rows.map((r) => d.providers[r.slug].capabilities?.checked || d.providers[r.slug].last_verified?.slice(0, 7)).filter(Boolean).sort().pop();
      const legend = certMode
        ? [["full", "Confirmed, or in the core product"], ["half", "Vendor-stated, or add-on"], ["empty", "Not offered"], ["unknown", "Not disclosed"]]
        : [["full", "In the core product"], ["half", "Add-on module or higher plan"], ["empty", "Not offered"], ["unknown", "Not disclosed"]];
      const certNote = certMode ? "Confirmed means we opened the certificate, the register entry or the lab's letter." : null;
      const terms = termForCapability(d.glossaryTerms);
      return { cols: cols.map((k) => ({ key: k, label: CAP_LABELS[k], term: terms[k] || null })), rows, checked, legend, certNote };
    },
    // "Best for" by industry or use case: category file c.segments = [{segment, slug, reason}].
    segmentPicks: (d) => (d.c.segments || [])
      .map((x) => ({ segment: x.segment, reason: x.reason, q: x.slug ? d.providers[x.slug] : null }))
      .filter((x) => x.segment && x.q),
    related: (d) => (d.c.adjacent || []).map((slug) => {
      const cat = Object.values(d.categories).find((x) => x.slug === slug);
      return cat ? { slug, url: cat.url, name: cat.breadcrumb_label, count: (d.rankings[slug]?.providers || []).length } : null;
    }).filter(Boolean),
    jsonld: (d) => {
      const c = d.c, url = d.site.url + c.url;
      const list = d.rankings[c.slug]?.providers || [];
      const graph = [
        { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: c.seo?.h1,
          ...(c.updated || c.last_verified ? { dateModified: [c.updated, c.last_verified].filter(Boolean).sort().pop() } : {}) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${d.site.url}/` },
          { "@type": "ListItem", position: 2, name: c.breadcrumb_label, item: url },
        ] },
        { "@type": "ItemList", name: c.seo?.h1, itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: list.length,
          itemListElement: list.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name,
            ...(r.slug && d.providers[r.slug] ? { url: `${d.site.url}/providers/${r.slug}/` } : {}) })) },
      ];
      if (c.faq?.length) graph.push({ "@type": "FAQPage", mainEntity: c.faq.map((f) => ({
        "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
      return { "@context": "https://schema.org", "@graph": graph };
    },
  },
};
