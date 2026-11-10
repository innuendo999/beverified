// Capability labels, statuses and certificate cells shared by category matrices and glossary terms.
// Cells come from each provider record's capabilities{} and certifications[] (one record, no second copy).
export const CAP_LABELS = {
  sanctions_pep: "Sanctions & PEP", adverse_media: "Adverse media", transaction_monitoring: "Transaction monitoring",
  case_management: "Case management", identity_verification: "Identity verification", deployment: "Deployment",
  published_pricing: "Published pricing",
  liveness_pad: "Liveness test (ISO 30107-3)", nfc: "NFC chip reading", video_ident: "Video ident (live agent)",
  soc2: "SOC 2", iso_27001: "ISO 27001", trust_framework: "Government trust framework",
  age_document: "ID document", age_facial_estimation: "Facial age estimation", age_email_estimation: "Email age estimation",
  age_mobile_operator: "Mobile operator", age_credit_card: "Credit card", age_open_banking: "Open banking",
  age_digital_id: "Digital ID or wallet", age_reusable: "Reusable age result", age_certification: "Age assurance certification",
  kyb_registry: "Company registry checks", kyb_ubo: "UBO discovery", kyb_entity_screening: "Business and officer screening",
  kyb_monitoring: "Ongoing business monitoring", kyb_documents: "Company document checks", kyb_pricing: "Published KYB pricing",
  // Know Your Agent columns read the record's kya{} block (key without the kya_ prefix).
  kya_detect_undeclared: "Detects undeclared agents", kya_verify_signed: "Verifies signed or registered agents",
  kya_bind_person: "Agent bound to a verified person", kya_bind_business: "Agent bound to a verified business",
  kya_step_up: "Re-verifies the person at risky actions", kya_limits_expiry: "Spend or scope limits and expiry",
  kya_revocation: "Revocation", kya_audit_log: "Agent action log", kya_protocols: "Agent protocols named",
};
// Keys whose note is always shown (coverage counts, price points), not only for add-on or partial cells.
export const NOTE_KEYS = ["kyb_registry", "kyb_pricing", "kya_protocols"];
export const CAP_STATUS = {
  yes: ["full", "Yes"], add_on: ["half", "Add-on"], no: ["empty", "No"], not_disclosed: ["unknown", "Not disclosed"],
  partial: ["half", "Partial"], cloud: ["", "Cloud"], on_prem: ["", "On-premises"], cloud_and_on_prem: ["", "Cloud and on-premises"],
  confirmed: ["full", "Confirmed"], vendor_stated: ["half", "Vendor-stated"], in_progress: ["unknown", "In progress"],
  beta: ["half", "Beta"], planned: ["unknown", "Planned"],
};
const isKya = (k) => k.startsWith("kya_");

// Certificate columns are read from the review's certifications[] (one record, no second copy).
// confirmed = we opened the certificate, register entry or lab letter; vendor_stated = only the vendor says so.
export const CERT_KEYS = ["liveness_pad", "soc2", "iso_27001", "trust_framework", "age_certification"];
const CERT_RANK = { confirmed: 2, vendor_stated: 1 };
const FRAMEWORKS = [
  [/DIATF|Digital Verification Serv|DVS|trust framework/i, "UK DIATF"], [/FedRAMP/i, "FedRAMP"],
  [/eIDAS|qualified trust|ETSI/i, "eIDAS"], [/Kantara|IAL2|800-63/i, "Kantara / NIST IAL2"], [/PVID/i, "PVID (France)"],
];
const AGE_CERTS = [[/27566|ACCS|Age Check Certification/i, "ACCS / ISO 27566-1"], [/KJM/i, "KJM (Germany)"], [/IEEE 2089/i, "IEEE 2089.1"]];
export const certCell = (key, certs = []) => {
  const ok = certs.filter((c) => CERT_RANK[c.status]);
  const best = (list) => [...list].sort((a, b) => CERT_RANK[b.status] - CERT_RANK[a.status])[0];
  const prog = (c) => /progress/i.test(c.name);
  if (key === "soc2" || key === "iso_27001") {
    const c = best(ok.filter((x) => (key === "soc2" ? /SOC 2/i : /27001/).test(x.name)));
    if (!c) return { status: "not_disclosed" };
    return { status: prog(c) ? "in_progress" : c.status, source: c.source };
  }
  if (key === "liveness_pad") {
    const pads = ok.filter((x) => /30107/.test(x.name));
    if (!pads.length) return { status: "not_disclosed" };
    const lvl = (c) => Math.max(0, ...[...c.name.matchAll(/Levels?\s*([123])/gi)].map((m) => +m[1]));
    const pool = pads.some((x) => x.status === "confirmed") ? pads.filter((x) => x.status === "confirmed") : pads;
    const top = [...pool].sort((a, b) => lvl(b) - lvl(a))[0];
    return { status: top.status, level: lvl(top) || null, source: top.source };
  }
  if (key === "trust_framework" || key === "age_certification") {
    const hits = [];
    for (const c of [...ok].sort((a, b) => CERT_RANK[b.status] - CERT_RANK[a.status]))
      for (const [re, label] of (key === "trust_framework" ? FRAMEWORKS : AGE_CERTS)) if (re.test(c.name) && !hits.some((h) => h.label === label)) hits.push({ label, status: c.status });
    if (!hits.length) return { status: "not_disclosed" };
    const conf = hits.filter((h) => h.status === "confirmed");
    return { status: conf.length ? "confirmed" : "vendor_stated", names: (conf.length ? conf : hits).map((h) => h.label).join(", ") };
  }
  return { status: "not_disclosed" };
};


// Columns that are not capabilities: read from another field of the same record.
// price_from = the record's facts[] "From" value (the starting price shown in Quick facts).
export const EXTRA_COLS = { price_from: "Starting price" };

// One matrix, used by category pages (ranked providers) and by review pages (the review plus its alternatives).
// cols = capability, certificate or extra keys; provs = provider records in row order.
export const buildMatrix = (cols, provs, terms = {}) => {
  cols = (cols || []).filter((k) => CAP_LABELS[k] || EXTRA_COLS[k]);
  if (!cols.length) return null;
  const capCols = cols.filter((k) => CAP_LABELS[k]);
  const certMode = cols.some((k) => CERT_KEYS.includes(k));
  const rows = (provs || [])
    .filter((q) => q && ((q.capabilities && capCols.some((k) => q.capabilities[k])) || (certMode && q.certifications?.length) || (q.kya && capCols.some(isKya))))
    .map((q) => ({
      slug: q.slug, name: q.name,
      cells: cols.map((k) => {
        if (k === "price_from") {
          const f = (q.facts || []).find((x) => x.label === "From");
          return { key: k, status: "", sym: "", label: f?.value || "Not publicly disclosed", note: null, source: f?.source || null };
        }
        const v = CERT_KEYS.includes(k) ? certCell(k, q.certifications)
          : isKya(k) ? (q.kya?.[k.slice(4)] || { status: "not_disclosed" })
          : (q.capabilities?.[k] || { status: "not_disclosed" });
        const status = String(v.status || "not_disclosed");
        const st = CAP_STATUS[status] || CAP_STATUS.not_disclosed;
        let label = st[1], note = (["add_on", "partial", "beta", "planned"].includes(status) || (NOTE_KEYS.includes(k) && status !== "not_disclosed")) ? v.note : null;
        if (k === "liveness_pad" && v.level) { label = `Level ${v.level}`; if (status === "vendor_stated") note = "Vendor-stated"; }
        if (note) note = note.charAt(0).toUpperCase() + note.slice(1);
        // Framework names keep their own casing (eIDAS, not EIDAS).
        if ((k === "trust_framework" || k === "age_certification") && v.names) note = v.names;
        return { key: k, status, sym: st[0], label, note, source: v.source || null };
      }),
    }));
  if (!rows.length) return null;
  const byslug = Object.fromEntries((provs || []).filter(Boolean).map((q) => [q.slug, q]));
  const kyaMode = cols.some(isKya);
  const checked = rows.map((r) => (kyaMode ? byslug[r.slug].kya?.checked : null) || byslug[r.slug].capabilities?.checked || byslug[r.slug].last_verified?.slice(0, 7)).filter(Boolean).sort().pop();
  const legend = certMode
    ? [["full", "Confirmed, or in the core product"], ["half", "Vendor-stated, or add-on"], ["empty", "Not offered"], ["unknown", "Not disclosed"]]
    : kyaMode ? [["full", "Stated for the KYA product"], ["half", "Beta or partly stated"], ["unknown", "Planned or not disclosed"]]
    : [["full", "In the core product"], ["half", "Add-on module or higher plan"], ["empty", "Not offered"], ["unknown", "Not disclosed"]];
  const certNote = certMode ? "Confirmed means we opened the certificate, the register entry or the lab's letter." : null;
  return { cols: cols.map((k) => ({ key: k, label: CAP_LABELS[k] || EXTRA_COLS[k], term: terms[k] || null })), rows, checked, legend, certNote };
};
