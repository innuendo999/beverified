// KYC Certification Tracker (/kyc-certification-tracker/). Spec: docs/cert-tracker.md.
// Rows come from the provider records only (certifications[] + independent_tests.rivr); nothing is retyped.
// Listed: reviewed KYC providers = an identity category, or a confirmed identity check (owner, 2026-11-20).

export const KYC_CATS = ["identity-verification", "e-kyc", "liveness-detection", "cheap-kyc", "age-verification", "kyc"];
const ID_PROGRAMS = ["ibeta_pad", "uk_dvs", "fido_face", "fido_docauth", "rivr", "accs"];

// Table columns, in the order of the approved design. `programs` = certifications[].program values.
export const COLUMNS = [
  { key: "ibeta", label: "Liveness (ISO/IEC 30107-3)", filter: "iBeta letter", programs: ["ibeta_pad", "pad_other"] },
  { key: "dvs", label: "UK DVS register", filter: "UK DVS register", programs: ["uk_dvs"] },
  { key: "fido", label: "FIDO IDV", filter: "FIDO IDV", programs: ["fido_face", "fido_docauth"] },
  { key: "rivr", label: "DHS RIVR", filter: "DHS RIVR", programs: ["rivr"] },
  { key: "accs", label: "ACCS", filter: "ACCS", programs: ["accs"] },
  { key: "iso", label: "ISO/IEC 27001", filter: "ISO/IEC 27001", programs: ["iso27001"] },
  { key: "soc2", label: "SOC 2", filter: null, programs: ["soc2"] },
];

const RANK = { confirmed: 3, vendor_stated: 2, not_found: 1 };
const inProgress = (c) => /progress/i.test(c.name || "");
const maxLevel = (l) => (Array.isArray(l) ? Math.max(...l) : l || 0);
const STATUS = {
  confirmed: "Confirmed",
  vendor_stated: "Stated by vendor",
  not_found: "Not found",
  in_progress: "In progress",
};

// Every entry of one provider, certifications[] plus RIVR results kept under independent_tests.
const entries = (p) => {
  const src = (n) => (n && p.sources?.[n - 1]) || null;
  const list = (p.certifications || []).map((c) => ({
    name: c.name, what: c.what || "", program: c.program, level: c.level ?? null,
    status: inProgress(c) ? "in_progress" : c.status, source: src(c.source),
  }));
  for (const r of p.independent_tests?.rivr || [])
    list.push({ name: `DHS RIVR, ${r.track}`, what: `Alias ${r.alias}. ${r.note || ""}`.trim(), program: "rivr",
      level: null, status: "confirmed", alias: r.alias, source: src(r.source) });
  return list;
};

const cell = (col, list) => {
  const hits = list.filter((e) => col.programs.includes(e.program));
  if (!hits.length) return { kind: "none", text: "None" };
  const conf = hits.filter((e) => e.status === "confirmed");
  if (conf.length) {
    if (col.key === "ibeta") {
      const ib = conf.filter((e) => e.program === "ibeta_pad");
      // iBeta letters show their level; another lab's confirmed PAD result (IDnow, LSTI) shows as confirmed only.
      return ib.length ? { kind: "ok", text: `iBeta L${Math.max(...ib.map((e) => maxLevel(e.level)))}`, ibeta: true } : { kind: "ok", text: "Confirmed" };
    }
    if (col.key === "fido") {
      const face = conf.find((e) => e.program === "fido_face"), doc = conf.find((e) => e.program === "fido_docauth");
      return { kind: "ok", text: [face && (face.level ? `Face L${face.level}` : "Face"), doc && "DocAuth"].filter(Boolean).join(", ") };
    }
    if (col.key === "rivr") return { kind: "ok", text: conf.map((e) => e.alias).filter(Boolean).join(", ") || "Result" };
    return { kind: "ok", text: "Confirmed" };
  }
  const best = [...hits].sort((a, b) => (RANK[b.status] || 0) - (RANK[a.status] || 0))[0];
  if (best.status === "vendor_stated") return { kind: "stated", text: "Stated by vendor" };
  if (best.status === "in_progress") return { kind: "progress", text: "In progress" };
  return { kind: "none", text: "Not found" };
};

export const isListed = (p) =>
  (p.categories || []).some((c) => KYC_CATS.includes(c)) ||
  (p.certifications || []).some((c) => ID_PROGRAMS.includes(c.program) && c.status === "confirmed" && !inProgress(c)) ||
  (p.independent_tests?.rivr || []).length > 0;

export const rows = (d) =>
  Object.values(d.allProviders || {})
    .filter((p) => p.status === "published" && isListed(p))
    .map((p) => {
      const list = entries(p);
      if (!list.length) return null;
      const cells = COLUMNS.map((col) => ({ key: col.key, ...cell(col, list) }));
      return {
        slug: p.slug, name: p.name, cells,
        // The "iBeta letter" filter needs an iBeta letter, not any confirmed PAD result.
        okKeys: cells.filter((c) => c.kind === "ok" && (c.key !== "ibeta" || c.ibeta)).map((c) => c.key).join(" "),
        entries: [...list]
          .sort((a, b) => (RANK[b.status === "in_progress" ? "not_found" : b.status] || 0) - (RANK[a.status === "in_progress" ? "not_found" : a.status] || 0))
          .map((e) => ({ ...e, statusLabel: STATUS[e.status] || e.status })),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

export const filters = (list) => [
  { key: "all", label: "All providers", count: list.length },
  ...COLUMNS.filter((c) => c.filter).map((c) => ({ key: c.key, label: c.filter, count: list.filter((r) => r.okKeys.split(" ").includes(c.key)).length })),
];

// Flat export: one line per entry, with the source. Same data as the page.
export const exportRows = (list) =>
  list.flatMap((r) => r.entries.map((e) => ({
    provider: r.name, review: `/providers/${r.slug}/`, program: e.program, certification: e.name, level: e.level ?? "",
    status: e.status, scope: e.what, source_title: e.source?.title || "", source_url: e.source?.url || "",
  })));

export const toCsv = (items) => {
  const cols = ["provider", "review", "program", "certification", "level", "status", "scope", "source_title", "source_url"];
  const q = (v) => { const s = Array.isArray(v) ? v.join(" and ") : String(v ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  return [cols.join(","), ...items.map((x) => cols.map((c) => q(x[c])).join(","))].join("\n") + "\n";
};
