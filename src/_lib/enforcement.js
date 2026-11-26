// AML Fines Tracker helpers (docs/aml-fines.md). Shared by the CI check and, later, the page.
// Nothing here is typed by hand: ranking keys come from the failure taxonomy, USD from the
// amount and the ECB rate stored by scripts/enforcement/fetch.mjs, case totals from the rows.

export const FAILURES = {
  aml_programme: { label: "AML programme and governance", rankings: ["aml"] },
  risk_assessment: { label: "Risk assessment", rankings: ["aml"] },
  cdd: { label: "Customer due diligence and KYC", rankings: ["kyc", "identity-verification"] },
  edd: { label: "Enhanced due diligence (high-risk, PEP)", rankings: ["aml"] },
  correspondent_cdd: { label: "Correspondent and nested account due diligence", rankings: ["aml/banks"] },
  kyb_ubo: { label: "Business customers and beneficial owners", rankings: ["kyb"] },
  monitoring: { label: "Transaction monitoring", rankings: ["aml"] },
  sar: { label: "Suspicious activity reporting", rankings: ["aml"] },
  sanctions: { label: "Sanctions screening", rankings: ["aml"] },
  travel_rule: { label: "Travel Rule", rankings: ["travel-rule"] },
  crypto_controls: { label: "Crypto-specific controls", rankings: ["crypto"] },
  records: { label: "Record keeping and reporting other than SARs", rankings: [] },
  remediation: { label: "Failure to fix earlier findings", rankings: [] },
};

export const FIRM_TYPES = ["bank", "broker", "msb", "emi", "payment", "neobank", "vasp", "card", "casino", "individual", "other"];
export const NON_BANK = new Set(["broker", "msb", "emi", "payment", "neobank", "vasp", "card", "casino", "other"]);
export const ACTIONS = ["penalty", "settlement", "restriction", "licence_revoked", "cease_and_desist", "order_no_penalty"];
export const POSITIONS = ["admitted", "neither_admit_nor_deny", "contested", "not_stated"];
export const LEVELS = ["order", "press_notice", "media"];
export const DOC_TYPES = ["consent_order", "assessment", "final_notice", "settlement_notice", "enforcement_release", "decision", "press_release_only"];
// Regulators whose documents are US federal works (verbatim excerpts allowed at any length).
export const FEDERAL = new Set(["fincen", "ofac", "occ", "fed", "fdic"]);

export function rankingKeys(item) {
  if (Array.isArray(item.ranking_override)) return item.ranking_override;
  const keys = new Set();
  for (const f of item.failures || []) for (const k of FAILURES[f]?.rankings || []) keys.add(k);
  return [...keys];
}

// fx: { "YYYY-MM-DD": { USD: <USD per EUR>, GBP: <GBP per EUR>, date: <ECB date used> } }
export function toUsd(money, date, fx) {
  if (!money || money.value == null) return null;
  const { value, currency } = money;
  if (currency === "USD") return value;
  const r = fx?.[date];
  if (!r || !r.USD) return null;
  if (currency === "EUR") return Math.round(value * r.USD);
  if (currency === "GBP" && r.GBP) return Math.round((value / r.GBP) * r.USD);
  return null;
}

// Case total in USD: every action's amount, minus credits a document gives for another
// action that is also in the same case (so the same conduct is counted once).
export function caseTotals(items, fx) {
  const cases = new Map();
  for (const it of items) {
    if (!cases.has(it.case_id)) cases.set(it.case_id, []);
    cases.get(it.case_id).push(it);
  }
  const out = {};
  for (const [id, rows] of cases) {
    const inCase = new Set(rows.map((r) => String(r.regulator).toLowerCase()));
    let total = 0, complete = true;
    for (const r of rows) {
      if (!r.monetary) continue;
      const usd = toUsd(r.amount, r.date, fx);
      if (usd == null) { complete = false; continue; }
      total += usd;
      for (const c of r.credits || []) {
        if (inCase.has(String(c.regulator).toLowerCase())) {
          const cu = toUsd(c, r.date, fx);
          if (cu == null) complete = false; else total -= cu;
        }
      }
    }
    out[id] = { usd: total, complete, actions: rows.length };
  }
  return out;
}

