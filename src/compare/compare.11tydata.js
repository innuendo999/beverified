import { articleData } from "../_lib/article-data.js";
import { CAP_STATUS, certCell } from "../_lib/capabilities.js";
// Comparisons ("X vs Y"): Markdown text + data blocks built here from both provider records,
// rendered by src/_includes/v3/compare-block.njk. Nothing about either provider is typed in the article.
// URL /compare/<a>-vs-<b>/ in alphabetical order (owner, 2026-11-05).
const base = articleData("compare");
const status = (c) => (c && c.status ? CAP_STATUS[c.status]?.[1] || c.status : "Not disclosed");
const cell = (c) => ({ text: status(c), note: c?.note || "", kind: c?.status || "not_disclosed" });
const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dt = (s) => { const [y, m, d] = String(s || "").split("-"); return y && m && d ? `${M[+m - 1]} ${+d}, ${y}` : s || ""; };
const fact = (p, label) => (p.facts || []).find((f) => f.label === label)?.value || "Not publicly disclosed";
const CAPS = [
  ["Identity verification", ["identity_verification"]],
  ["Liveness check", ["liveness"]],
  ["NFC chip reading", ["nfc"]],
  ["Checks without a document", null, (p) => p.coverage?.non_doc],
  ["Video ident (live agent)", ["video_ident"]],
  ["Reusable ID for returning users", ["reusable_id"]],
  ["Sanctions and PEP screening", ["sanctions_pep"]],
  ["Adverse media", ["adverse_media"]],
  ["Ongoing AML monitoring", ["ongoing_monitoring"]],
  ["Transaction monitoring", ["transaction_monitoring"]],
  ["Case management", ["case_management"]],
  ["KYB: company registry checks", ["kyb_registry"]],
  ["KYB: UBO discovery", ["kyb_ubo"]],
  ["Age: ID document", ["age_document"]],
  ["Age: facial estimation", ["age_facial_estimation"]],
  ["Choice of data region", ["data_residency"]],
];
const INTEGRATION = [["Public API documentation", "docs_public"], ["Web SDK", "sdk_web"], ["iOS SDK", "sdk_ios"], ["Android SDK", "sdk_android"],
  ["Self-serve sandbox or trial", "sandbox"], ["No-code or hosted flow", "no_code"], ["Published support hours", "support_hours"]];

export default {
  ...base,
  eleventyComputed: {
    ...base.eleventyComputed,
    pair: (d) => (d.compare || []).map((s) => d.allProviders?.[s]).filter(Boolean),
    cmp: (d) => {
      const P = (d.compare || []).map((s) => d.allProviders?.[s]).filter(Boolean);
      if (P.length !== 2) return null;
      const [a, b] = P;
      const crit = (a.score_breakdown || []).map((r, i) => {
        const rb = (b.score_breakdown || []).find((x) => x.criterion === r.criterion) || {};
        return { name: r.criterion, weight: r.weight, a: r.score, b: rb.score ?? null, aNote: r.note, bNote: rb.note || "" };
      });
      const pad = (p) => { const c = certCell("liveness_pad", p.certifications); return c.status === "not_disclosed" ? "No lab letter found" : `${c.level ? `Level ${c.level}` : "Tested"} (${CAP_STATUS[c.status][1].toLowerCase()})`; };
      const cert = (p, k) => { const c = certCell(k, p.certifications); return c.status === "not_disclosed" ? "Not found" : `${CAP_STATUS[c.status][1]}${c.names ? `: ${c.names}` : ""}`; };
      const named = (p, re) => { const c = (p.certifications || []).find((x) => re.test(x.name)); return c ? CAP_STATUS[c.status]?.[1] || c.status : "Not found"; };
      const priceRows = (p) => (p.pricing?.items || []).map((i) => ({ label: i.label, value: i.value, kind: i.kind === "third_party" ? "Third-party estimate" : "Published by vendor", verified: i.verified }));
      const inc = (p) => (d.incidents?.items || []).filter((x) => x.slug === p.slug).sort((x, y) => y.date.localeCompare(x.date));
      const ratings = [...new Set([...(a.user_ratings || []), ...(b.user_ratings || [])].map((r) => r.platform))].map((pl) => {
        const f = (p) => (p.user_ratings || []).find((r) => r.platform === pl);
        return { platform: pl, a: f(a), b: f(b) };
      });
      return {
        a, b,
        crit,
        glance: [
          ["Our score", `${a.score.toFixed(1)} out of 5 (${a.grade})`, `${b.score.toFixed(1)} out of 5 (${b.grade})`],
          ["Starting price", fact(a, "From"), fact(b, "From")],
          ["Founded", fact(a, "Founded"), fact(b, "Founded")],
          ["Headquarters", fact(a, "HQ"), fact(b, "HQ")],
          ["Countries and territories", a.coverage?.countries?.value ? `${a.coverage.countries.value}+` : "Not publicly disclosed", b.coverage?.countries?.value ? `${b.coverage.countries.value}+` : "Not publicly disclosed"],
          ["Document types", a.coverage?.document_types?.value ? `${a.coverage.document_types.value.toLocaleString("en-US")}+` : "Not publicly disclosed", b.coverage?.document_types?.value ? `${b.coverage.document_types.value.toLocaleString("en-US")}+` : "Not publicly disclosed"],
          ["Liveness lab test (ISO/IEC 30107-3)", pad(a), pad(b)],
          ["Last fact check", dt(a.last_verified), dt(b.last_verified)],
        ],
        caps: CAPS.map(([label, keys, getter]) => {
          const g = (p) => (getter ? getter(p) : (p.capabilities || {})[keys[0]]);
          return { label, a: cell(g(a)), b: cell(g(b)) };
        }),
        certs: [
          ["Liveness (iBeta ISO/IEC 30107-3)", pad(a), pad(b)],
          ["ISO/IEC 27001", cert(a, "iso_27001"), cert(b, "iso_27001")],
          ["SOC 2", cert(a, "soc2"), cert(b, "soc2")],
          ["PCI DSS", named(a, /PCI DSS/i), named(b, /PCI DSS/i)],
          ["Identity assurance (ISO/IEC TS 29003, ACCS)", named(a, /29003/), named(b, /29003/)],
          ["eIDAS or ETSI conformity", named(a, /eIDAS|ETSI/i), named(b, /eIDAS|ETSI/i)],
        ],
        integration: INTEGRATION.map(([label, k]) => ({ label, a: cell(a.integration?.[k]), b: cell(b.integration?.[k]) })),
        pricing: { a: priceRows(a), b: priceRows(b), aSummary: a.pricing?.summary, bSummary: b.pricing?.summary },
        incidents: { a: inc(a), b: inc(b) },
        ratings,
      };
    },
  },
};
