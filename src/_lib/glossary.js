// Glossary helpers shared by the term pages, the hub, category matrices and llms.txt.
// Terms: src/_data/glossary/<slug>.yml (spec docs/glossary-spec.md).
import markdownIt from "markdown-it";
import { CAP_LABELS, CAP_STATUS, CERT_KEYS, certCell } from "./capabilities.js";

export const CLUSTERS = [
  { key: "identity", label: "Identity verification" },
  { key: "aml", label: "AML and due diligence" },
  { key: "kyb", label: "Business verification (KYB)" },
  { key: "crypto", label: "Crypto and the Travel Rule" },
  { key: "age", label: "Age assurance" },
  { key: "standards", label: "Laws, standards and certifications" },
];

const slugify = (t) => String(t).toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const md = markdownIt({ html: false, linkify: false, typographer: false });
md.core.ruler.push("heading_ids", (state) => {
  const t = state.tokens;
  for (let i = 0; i < t.length; i++)
    if (t[i].type === "heading_open" && ["h2", "h3"].includes(t[i].tag) && !t[i].attrGet("id")) t[i].attrSet("id", slugify(t[i + 1].content));
});
export const renderMd = (s) => md.render(String(s || ""));

// Capability key -> term URL (first term that declares it), for links from matrix headers.
export const termForCapability = (terms) => {
  const out = {};
  for (const t of terms || []) if (t.capability && !out[t.capability]) out[t.capability] = t.url;
  return out;
};

// Providers whose record shows the capability (core, add-on, partial; for certificates: confirmed or vendor-stated).
// Order: core or confirmed first, then score. Only providers with a recorded value are listed.
const ORDER = { yes: 0, confirmed: 0, add_on: 1, partial: 1, vendor_stated: 1, in_progress: 2 };
export const providersFor = (key, allProviders) => {
  if (!key || !CAP_LABELS[key]) return null;
  const rows = [];
  let recorded = 0, checked = null;
  for (const p of Object.values(allProviders || {})) {
    if (p.status && p.status !== "published") continue;
    const v = CERT_KEYS.includes(key) ? certCell(key, p.certifications) : p.capabilities?.[key];
    if (!v || !v.status || v.status === "not_disclosed") continue;
    recorded++;
    if (!(v.status in ORDER)) continue;
    const st = CAP_STATUS[v.status] || CAP_STATUS.not_disclosed;
    let label = st[1], note = v.note || v.names || null;
    if (key === "liveness_pad" && v.level) label = v.status === "confirmed" ? `Level ${v.level}` : `Level ${v.level}, vendor-stated`;
    const c = p.capabilities?.checked || p.last_verified?.slice(0, 7);
    if (c && (!checked || c > checked)) checked = c;
    rows.push({ slug: p.slug, name: p.name, score: p.score, status: v.status, sym: st[0], label, note: note ? note.charAt(0).toUpperCase() + note.slice(1) : null });
  }
  rows.sort((a, b) => ORDER[a.status] - ORDER[b.status] || (b.score ?? 0) - (a.score ?? 0) || a.name.localeCompare(b.name));
  return rows.length ? { key, label: CAP_LABELS[key], rows, recorded, checked, cert: CERT_KEYS.includes(key) } : null;
};
