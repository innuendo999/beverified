// Evidence shown on ranking layout v2 (owner, 2026-11-17): the top 3 table and the chips on each list row.
// Read from the provider record only. Green ("ok") is used only for a confirmed independent check
// (owner rule, 2026-11-16); vendor claims and gaps are plain.

const has = (c) => c && ["yes", "add_on", "partial"].includes(c.status);
const certs = (q) => q?.certifications || [];
const FRAMEWORKS = [["UK DIATF", /DIATF|DVSTF|Digital Verification Serv|UK DVS/i], ["ISO/IEC TS 29003", /29003/], ["ETSI TS 119 461", /119 ?461/], ["Kantara IAL2", /800-63|IAL ?2/i]];

// Highest iBeta ISO/IEC 30107-3 level we confirmed, or 0.
export function padLevel(q) {
  const lv = certs(q).filter((c) => /30107/.test(c.name) && c.status === "confirmed")
    .map((c) => +(((c.name + " " + (c.what || "")).match(/Level\s*(\d)/i) || [])[1] || 1));
  return lv.length ? Math.max(...lv) : 0;
}

// Trust frameworks confirmed on a public register, by name.
export function frameworks(q) {
  return [...new Set(certs(q).filter((c) => c.status === "confirmed").map((c) => FRAMEWORKS.find(([, re]) => re.test(c.name))?.[0]).filter(Boolean))];
}

export function rivrMet(q) {
  return (q?.independent_tests?.rivr || []).some((r) => r.goals_met === "all" && r.alias && r.source);
}

// Short labels for the top 3 table.
export function top3Facts(q) {
  const lv = padLevel(q);
  const vendorPad = certs(q).some((c) => /30107/.test(c.name) && c.status === "vendor_stated");
  const fw = frameworks(q);
  return {
    pad: lv ? `Level ${lv}` : vendorPad ? "Vendor-stated only" : "No letter found",
    padOk: lv > 0,
    framework: fw.length ? fw.join(", ") : "None confirmed",
    frameworkOk: fw.length > 0,
  };
}

// Chips for one list row: at most five, confirmed checks first.
export function evidenceChips(q) {
  if (!q) return [];
  const out = [];
  const lv = padLevel(q);
  if (lv) out.push({ label: `iBeta Level ${lv} liveness`, ok: true });
  else if (certs(q).some((c) => /30107/.test(c.name) && c.status === "vendor_stated")) out.push({ label: "Liveness test vendor-stated", ok: false });
  else out.push({ label: "No iBeta letter found", ok: false });
  if (rivrMet(q)) out.push({ label: "DHS RIVR goals met", ok: true });
  for (const f of frameworks(q)) out.push({ label: f, ok: true });
  const nfc = q.capabilities?.nfc;
  if (nfc?.status === "yes") out.push({ label: "NFC chip reading", ok: false });
  else if (nfc?.status === "add_on") out.push({ label: "NFC as an add-on", ok: false });
  const mr = q.capabilities?.manual_review;
  if (has(mr) && mr.hours) out.push({ label: `Human review ${mr.hours.replace(/^24\/7, typically within about/, "24/7, about")}`, ok: false });
  return out.slice(0, 5);
}
