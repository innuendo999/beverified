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

// ---- Travel Rule (owner, 2026-11-17, canvas "BeVerified: Travel Rule ranking page, redesign proposal") ----
// Green only where someone other than the vendor confirms it: a network that lists the provider
// (networks[].evidence: independent) or an ISO/IEC 27001 certificate we opened (status confirmed).
const NET_SHOWN = { built_in: "", live: "", own: "", bridge: " via bridge", outdated: " (old version)" };
const netName = (n) => (/^own network$/i.test(n.name) ? "Own network" : n.name);
const netList = (q) => (q?.networks || []).filter((n) => n.name && !/^other networks$/i.test(n.name));
const confirmedNets = (q) => netList(q).filter((n) => n.evidence === "independent" && n.status in NET_SHOWN && n.status !== "outdated").map(netName);
const vendorNets = (q) => netList(q).filter((n) => n.evidence !== "independent" && n.status in NET_SHOWN).map((n) => netName(n) + NET_SHOWN[n.status]);
const iso27001 = (q) => certs(q).some((c) => /27001/.test(c.name) && c.status === "confirmed");
const deployShort = (q, fit) => fit?.deploy?.[q.slug]?.short || null;

export function travelRuleTop3(q, fit) {
  const ok = confirmedNets(q), plain = vendorNets(q).slice(0, 2);
  return {
    cols: [
      { label: "Networks", ok: ok.join(", "), text: plain.join(", ") || (ok.length ? "" : "None confirmed") },
      { label: "Deployment", ok: "", text: deployShort(q, fit) || "Not stated" },
    ],
  };
}

export function travelRuleChips(q, fit) {
  if (!q) return [];
  const out = confirmedNets(q).map((n) => ({ label: `${n} link confirmed`, ok: true }));
  if (iso27001(q)) out.push({ label: "ISO/IEC 27001 certified", ok: true });
  for (const n of vendorNets(q)) out.push({ label: n, ok: false });
  const d = deployShort(q, fit);
  if (d) out.push({ label: d, ok: false });
  return out.slice(0, 5);
}

// Columns of the top 3 table and the list chips for one ranking (category file `evidence`).
export function v2Evidence(c, q, fit) {
  if (c.evidence === "travel-rule") return { ...travelRuleTop3(q, fit), chips: travelRuleChips(q, fit) };
  const f = top3Facts(q);
  return {
    cols: [
      { label: "Liveness test (iBeta)", ok: f.padOk ? f.pad : "", text: f.padOk ? "" : f.pad },
      { label: "Trust framework", ok: f.frameworkOk ? f.framework : "", text: f.frameworkOk ? "" : f.framework },
    ],
    chips: evidenceChips(q),
  };
}
