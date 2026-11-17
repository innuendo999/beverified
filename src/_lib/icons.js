// BeVerified icon library (2026-11-16). One source for every icon on the site: reviews of all
// categories, rankings, blog, news, incidents.
//
// Drawing rules (keep new icons in line):
// - 24 x 24 grid, 2px padding, stroke only (no fills except 1-unit dots), round caps and joins.
// - Colour comes from the text (stroke: currentColor), width from CSS (.i, default 1.75).
// - One idea per icon, no letters except the "18" in `age`. Never use emoji instead.
// - Green is never baked in: the confirmed-check colour comes from the surrounding class.
//
// Use in templates:  {% icon "liveness" %}              decorative (aria-hidden)
//                    {% icon "liveness", "Liveness" %}  meaningful (role="img" + aria-label)
//                    {% iconFor "category", "kyb" %}    by meaning (MAP below), fallback "dot"
// Preview of the whole set: node scripts/icons-preview.mjs → design/icons.html

export const ICONS = {
  // ---- Identity
  "id-card": { group: "Identity", label: "ID card", svg: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="2"/><path d="M5.5 16c.6-1.5 1.7-2.2 3-2.2s2.4.7 3 2.2"/><path d="M14 10h4M14 13h4"/>' },
  passport: { group: "Identity", label: "Passport", svg: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 10h6"/><path d="M9 17h6"/>' },
  "document-check": { group: "Identity", label: "Document check", svg: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 14l2 2 4-4"/>' },
  "person-check": { group: "Identity", label: "Identity verified", svg: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c1-3.2 3.4-5 6.5-5 1.3 0 2.5.3 3.5.9"/><path d="M15 18l2 2 4-4"/>' },
  liveness: { group: "Identity", label: "Liveness", svg: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M9.5 10h.01M14.5 10h.01"/><path d="M9 14c1.6 1.4 4.4 1.4 6 0"/>' },
  "face-scan": { group: "Identity", label: "Face match", svg: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 16.5c.8-1.8 2.2-2.7 4-2.7s3.2.9 4 2.7"/>' },
  fingerprint: { group: "Identity", label: "Biometrics", svg: '<path d="M6.3 6.3A8 8 0 0 1 20 12v1"/><path d="M4 12a8 8 0 0 1 .6-3"/><path d="M8 12a4 4 0 0 1 8 0v2a10 10 0 0 1-1.2 4.8"/><path d="M12 12v2.5a6 6 0 0 1-2 4.5"/><path d="M5.2 16a12 12 0 0 0 .8-4"/><path d="M19.6 16.5a14 14 0 0 1-.9 2.5"/>' },
  nfc: { group: "Identity", label: "NFC chip read", svg: '<rect x="3" y="6" width="9" height="12" rx="1.5"/><path d="M6 10h3M6 14h3M7.5 6v12"/><path d="M15 9a4 4 0 0 1 0 6M18 7a7 7 0 0 1 0 10"/>' },
  "video-ident": { group: "Identity", label: "Video identification", svg: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/><circle cx="9.5" cy="10.5" r="2"/><path d="M6.5 15.5c.6-1.2 1.7-1.8 3-1.8s2.4.6 3 1.8"/>' },
  age: { group: "Identity", label: "Age verification", svg: '<circle cx="12" cy="12" r="9"/><path d="M7.5 9.5L9 8.5V15.5"/><circle cx="14.5" cy="10" r="1.6"/><circle cx="14.5" cy="13.8" r="1.9"/>' },
  deepfake: { group: "Identity", label: "Deepfake / injection", svg: '<path d="M4 6.5C6.5 5.2 9.2 4.5 12 4.5s5.5.7 8 2V11c0 5-3.6 8.5-8 8.5S4 16 4 11z"/><path d="M7.5 10.5c.8-.6 2.2-.6 3 0M13.5 10.5c.8-.6 2.2-.6 3 0"/><path d="M9.5 15c1.5.8 3.5.8 5 0"/>' },
  address: { group: "Identity", label: "Address check", svg: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>' },
  phone: { group: "Identity", label: "Phone / mobile SDK", svg: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17.5h2"/>' },
  mail: { group: "Identity", label: "Email check", svg: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>' },
  reusable: { group: "Identity", label: "Reusable identity", svg: '<rect x="3" y="4" width="13" height="10" rx="1.5"/><circle cx="7" cy="8.5" r="1.3"/><path d="M10 8h3M10 10.5h2"/><path d="M20.5 13.5a4.5 4.5 0 0 1-8 2.8"/><path d="M12 19.5v-3.3h3.3"/>' },

  // ---- Business
  company: { group: "Business", label: "Company (KYB)", svg: '<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 10h4a1 1 0 0 1 1 1v10"/><path d="M3 21h18"/><path d="M8 8h3M8 12h3M8 16h3"/>' },
  ubo: { group: "Business", label: "Beneficial owners", svg: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v10M5 17v-4h14v4"/>' },
  registry: { group: "Business", label: "Registry record", svg: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>' },

  // ---- Financial crime
  screening: { group: "Financial crime", label: "AML screening", svg: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/><path d="M8 9h5M8 12h3.5"/>' },
  sanctions: { group: "Financial crime", label: "Sanctions", svg: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>' },
  pep: { group: "Financial crime", label: "PEP", svg: '<circle cx="9.5" cy="8" r="3.5"/><path d="M3 20c1-3.3 3.4-5 6.5-5"/><path d="M17 12.5l1.3 2.6 2.8.4-2 2 .5 2.8L17 19l-2.6 1.3.5-2.8-2-2 2.8-.4z"/>' },
  "adverse-media": { group: "Financial crime", label: "Adverse media", svg: '<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M12 8v3.5M12 13.5h.01"/>' },
  monitoring: { group: "Financial crime", label: "Transaction monitoring", svg: '<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>' },
  transfer: { group: "Financial crime", label: "Payments", svg: '<path d="M4 8h15l-3-3M20 16H5l3 3"/>' },
  bank: { group: "Financial crime", label: "Bank", svg: '<path d="M3 9l9-5 9 5"/><path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7"/><path d="M3 20h18"/>' },
  "case-file": { group: "Financial crime", label: "Case management", svg: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 13l2 2 4-4"/>' },
  risk: { group: "Financial crime", label: "Risk score", svg: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><path d="M4 17h2M18 17h2M12 9V7.5"/>' },
  fraud: { group: "Financial crime", label: "Fraud", svg: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M12 8v4.5M12 15.5h.01"/>' },

  // ---- Crypto
  wallet: { group: "Crypto", label: "Wallet", svg: '<path d="M4 7a2 2 0 0 1 2-2h11v4"/><path d="M4 7v11a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2z"/><path d="M16 14.5h.01"/>' },
  coin: { group: "Crypto", label: "Crypto asset", svg: '<circle cx="12" cy="12" r="9"/><path d="M10 8h3.2a2 2 0 0 1 0 4H10h3.8a2 2 0 0 1 0 4H10zM11.5 6.5V8M11.5 16v1.5"/>' },
  "travel-rule": { group: "Crypto", label: "Travel Rule", svg: '<rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M6.5 10v3a4 4 0 0 0 4 4H14M17.5 14v-3a4 4 0 0 0-4-4H10"/>' },
  blockchain: { group: "Crypto", label: "On-chain", svg: '<rect x="2.5" y="9" width="5" height="6" rx="1"/><rect x="9.5" y="9" width="5" height="6" rx="1"/><rect x="16.5" y="9" width="5" height="6" rx="1"/><path d="M7.5 12h2M14.5 12h2"/>' },

  // ---- Know Your Agent
  agent: { group: "Know Your Agent", label: "AI agent", svg: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 5v3"/><path d="M12 4.5h.01"/><path d="M9.5 12.5h.01M14.5 12.5h.01"/><path d="M10 15.5h4"/><path d="M3 12v3M21 12v3"/>' },
  key: { group: "Know Your Agent", label: "Delegation / key", svg: '<circle cx="8" cy="15" r="4"/><path d="M10.8 12.2L20 3M16 7l3 3M14 9l2 2"/>' },
  lock: { group: "Know Your Agent", label: "Permissions / privacy", svg: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2"/>' },

  // ---- Pricing and platform
  "price-tag": { group: "Pricing and platform", label: "Price", svg: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><path d="M7.5 7.5h.01"/>' },
  calculator: { group: "Pricing and platform", label: "Cost calculator", svg: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>' },
  api: { group: "Pricing and platform", label: "API", svg: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>' },
  sandbox: { group: "Pricing and platform", label: "Sandbox / trial", svg: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>' },
  workflow: { group: "Pricing and platform", label: "No-code workflow", svg: '<rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="15" width="6" height="5" rx="1"/><rect x="15" y="4" width="6" height="5" rx="1"/><path d="M9 6.5h6M18 9v6"/>' },
  integration: { group: "Pricing and platform", label: "Integration", svg: '<path d="M9 3v4M15 3v4"/><path d="M6 7h12v4a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>' },
  globe: { group: "Pricing and platform", label: "Coverage", svg: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>' },
  languages: { group: "Pricing and platform", label: "Languages", svg: '<path d="M4 5h8M8 3v2M6 5c0 4 2.5 7 5 8M10 5c0 3-2 6.5-5 8"/><path d="M13 21l4-9 4 9M14.5 18h5"/>' },
  server: { group: "Pricing and platform", label: "Hosting / data residency", svg: '<rect x="4" y="4" width="16" height="7" rx="1.5"/><rect x="4" y="13" width="16" height="7" rx="1.5"/><path d="M8 7.5h.01M8 16.5h.01"/>' },
  support: { group: "Pricing and platform", label: "Support", svg: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a3 3 0 0 1-3 2h-2"/>' },
  location: { group: "Pricing and platform", label: "Region", svg: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>' },

  // ---- Evidence and trust
  lab: { group: "Evidence and trust", label: "Independent test", svg: '<path d="M9 3h6M10 3v5.5L5.5 17A2.5 2.5 0 0 0 7.7 21h8.6a2.5 2.5 0 0 0 2.2-4L14 8.5V3"/><path d="M7.5 14h9"/>' },
  certificate: { group: "Evidence and trust", label: "Certificate", svg: '<circle cx="12" cy="9" r="6"/><path d="M9 14.2L8 21l4-2 4 2-1-6.8"/><path d="M9.5 9l1.8 1.8 3.2-3.3"/>' },
  "vendor-stated": { group: "Evidence and trust", label: "Vendor-stated", svg: '<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9h8M8 12h5"/>' },
  star: { group: "Evidence and trust", label: "User rating", svg: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>' },
  "hands-on": { group: "Evidence and trust", label: "Hands-on test", svg: '<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2"/><path d="M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.6-2.2L4 15.5a1.6 1.6 0 0 1 2.4-2.1L9 15"/>' },
  "shield-check": { group: "Evidence and trust", label: "Compliance", svg: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>' },
  incident: { group: "Evidence and trust", label: "Security incident", svg: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M12.5 7.5L10 12h4l-2.5 4.5"/>' },
  ownership: { group: "Evidence and trust", label: "Ownership change", svg: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v2a4 4 0 0 0 4 4h1v4M18 7v2a4 4 0 0 1-4 4h-1"/>' },
  award: { group: "Evidence and trust", label: "Award / pick", svg: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3"/><path d="M12 13v4M8.5 21h7M9.5 17h5v4h-5z"/>' },
  score: { group: "Evidence and trust", label: "Score", svg: '<path d="M4 20h16"/><path d="M6 20v-5M10 20V9M14 20v-7M18 20V5"/>' },

  // ---- Status
  check: { group: "Status", label: "Confirmed", svg: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>' },
  "not-found": { group: "Status", label: "Not found", svg: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>' },
  warning: { group: "Status", label: "Warning", svg: '<path d="M10.3 4.5a2 2 0 0 1 3.4 0l7.5 13a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3z"/><path d="M12 10v4M12 17h.01"/>' },
  info: { group: "Status", label: "Info", svg: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>' },
  refresh: { group: "Status", label: "Re-checked", svg: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16"/><path d="M20 20v-4h-4"/>' },
  calendar: { group: "Status", label: "Date", svg: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>' },
  clock: { group: "Status", label: "Time / updated", svg: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  sponsored: { group: "Status", label: "Sponsored", svg: '<path d="M3 10v4h3l7 5V5L6 10z"/><path d="M16.5 9a4 4 0 0 1 0 6"/>' },

  // ---- Content
  news: { group: "Content", label: "News", svg: '<path d="M4 5h13v14a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2z"/><path d="M17 9h3v9a2 2 0 0 1-2 2"/><path d="M7 9h7M7 12h7M7 15h4"/>' },
  guide: { group: "Content", label: "Guide", svg: '<path d="M3 5.5c2-1 5-1 9 1v13c-4-2-7-2-9-1z"/><path d="M21 5.5c-2-1-5-1-9 1v13c4-2 7-2 9-1z"/>' },
  research: { group: "Content", label: "Research", svg: '<path d="M4 4v16h16"/><path d="M8 15l3-4 3 2 5-6"/>' },
  compare: { group: "Content", label: "Comparison", svg: '<path d="M7 4L3 8l4 4M3 8h13M17 12l4 4-4 4M21 16H8"/>' },
  regulation: { group: "Content", label: "Regulation", svg: '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>' },
  fine: { group: "Content", label: "Fine / enforcement", svg: '<rect x="10" y="3" width="10" height="5" rx="1" transform="rotate(45 15 5.5)"/><path d="M12.6 10.4L4 19"/><path d="M12 21h9"/>' },
  author: { group: "Content", label: "Author", svg: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/>' },
  question: { group: "Content", label: "FAQ", svg: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>' },
  source: { group: "Content", label: "Source", svg: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>' },

  // ---- Interface
  external: { group: "Interface", label: "External link", svg: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>' },
  "arrow-right": { group: "Interface", label: "Arrow", svg: '<path d="M5 12h14M13 6l6 6-6 6"/>' },
  "chevron-down": { group: "Interface", label: "Expand", svg: '<path d="M6 9l6 6 6-6"/>' },
  dot: { group: "Interface", label: "Fallback", svg: '<circle cx="12" cy="12" r="3"/>' },
};

// Icon by meaning. Keys: rankings.yml keys, article `section`, evidence levels.
export const MAP = {
  category: {
    kyc: "id-card", "identity-verification": "person-check", "e-kyc": "phone", "liveness-detection": "liveness",
    "age-verification": "age", kyb: "company", aml: "screening", "aml/banks": "bank", crypto: "wallet",
    "travel-rule": "travel-rule", "cheap-kyc": "price-tag", "know-your-agent": "agent",
    uk: "location", australia: "location", brazil: "location", canada: "location", india: "location", mexico: "location", nigeria: "location", peru: "location", "south-africa": "location",
  },
  section: { news: "news", guide: "guide", publications: "research", compare: "compare", incidents: "incident", glossary: "info" },
  evidence: { independent: "lab", "vendor-stated": "vendor-stated", "user-reported": "star", "hands-on": "hands-on" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Inline SVG. label → role="img" + aria-label; no label → aria-hidden. Unknown name throws at build.
export function renderIcon(name, label = "", size = null, cls = "") {
  const ic = ICONS[name];
  if (!ic) throw new Error(`icon: unknown name "${name}" (see src/_lib/icons.js)`);
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"';
  const dim = size ? ` width="${Number(size)}" height="${Number(size)}"` : "";
  return `<svg class="i i-${name}${cls ? " " + esc(cls) : ""}" viewBox="0 0 24 24"${dim} ${a11y}>${ic.svg}</svg>`;
}

export const iconNameFor = (kind, key) => MAP[kind]?.[key] || "dot";
