// "For banks" line on AML for Banks ranking cards (category file fit_line: aml-banks; owner, 2026-11-25).
// Only what the vendor states, with a source in src/_data/amlBanksEvidence.yml; nothing is shown for
// "not stated", so the line never reads as a gap. Deployment comes from the provider record.
// No outbound vendor links on ranking cards (owner rule, 2026-11-05): the urls stay in the evidence file.
const RUNS = { cloud: "Cloud", cloud_and_on_prem: "Cloud or on-premises", on_prem: "On-premises" };
const CHANNELS = ["FinCEN", "goAML"];

export function amlBanksFit(q, ev) {
  if (!q || !ev) return [];
  const out = [];
  const dep = q.capabilities?.deployment;
  const runs = RUNS[typeof dep === "object" ? dep?.status : dep];
  if (runs) out.push({ label: "Runs", value: runs });
  const f = ev.fit || {};
  const cores = f.core_systems?.value;
  if (Array.isArray(cores) && cores.length && f.core_systems.url) out.push({ label: "Cores named", value: cores.join(", "), url: f.core_systems.url });
  if (f.overlay?.value === "yes" && f.overlay.url) out.push({ label: "On top of an existing system", value: "Yes", url: f.overlay.url });
  if (String(f.framl?.value || "").startsWith("yes")) out.push({ label: "Fraud and AML", value: "In one platform", url: f.framl.url || null });
  const ch = CHANNELS.filter((c) => String(f.filing_channel?.value || "").includes(c));
  if (ch.length && f.filing_channel.url) out.push({ label: "Files SARs to", value: ch.join(" and "), url: f.filing_channel.url });
  return out;
}
