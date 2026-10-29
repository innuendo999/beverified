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
};
// Keys whose note is always shown (coverage counts, price points), not only for add-on or partial cells.
export const NOTE_KEYS = ["kyb_registry", "kyb_pricing"];
export const CAP_STATUS = {
  yes: ["full", "Yes"], add_on: ["half", "Add-on"], no: ["empty", "No"], not_disclosed: ["unknown", "Not disclosed"],
  partial: ["half", "Partial"], cloud: ["", "Cloud"], on_prem: ["", "On-premises"], cloud_and_on_prem: ["", "Cloud and on-premises"],
  confirmed: ["full", "Confirmed"], vendor_stated: ["half", "Vendor-stated"], in_progress: ["unknown", "In progress"],
};

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

