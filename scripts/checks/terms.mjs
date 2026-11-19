// Domain terms that keep getting wrong in vendor copy and AI answers. Exits 1 on any issue.
// node scripts/checks/terms.mjs
//
// OpenVASP (owner, 2026-11-19): the OpenVASP *protocol* was discontinued and replaced by
// TRP (Travel Rule Protocol), which the OpenVASP Association now develops. Never list
// "OpenVASP" as a protocol, network or route next to TRP, TRISA and the rest. Allowed:
// "the OpenVASP Association", "OpenVASP's TRP page", "OpenVASP TRP", or a sentence that
// says the old protocol was discontinued / replaced by TRP.
// Internal fields (verification_notes, legacy_*) are not checked: they may quote vendors.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const SKIP_KEYS = /^(verification_notes|legacy_.*|record_notes)$/;
const OK_CONTEXT = /discontinued|replaced by TRP|former OpenVASP protocol|older OpenVASP protocol/i;
const NAMES = "TRP|TRISA|Sygna(?: Bridge)?|Veriscope|Shyft(?: Veriscope)?|VerifyVASP|TRUST|GTR|CODE|Notabene";
const NOT_ORG = String.raw`(?!\s+(?:Association|TRP)|['’]s)`;
const BAD = [
  // "TRP, Sygna Bridge, ... and OpenVASP": OpenVASP as one more item in a list of protocols or networks
  new RegExp(String.raw`\b(?:${NAMES})(?:\s*,\s*[A-Z][\w ]{0,20}?)*\s*(?:,|\band\b|\bor\b)\s*OpenVASP\b${NOT_ORG}`),
  // "OpenVASP, Shyft" / "OpenVASP or TRISA" (but not "listing by OpenVASP or TRISA" or "no OpenVASP or TRISA listing": the organisations)
  new RegExp(String.raw`(?<!\b(?:by|from|of|no)\s)\bOpenVASP\s*(?:,|\band\b|\bor\b)\s*(?:${NAMES})\b(?![\w ]{0,15}\blisting)`),
  // "the OpenVASP protocol" (but "OpenVASP TRP" and "protocol from OpenVASP" are fine)
  /\bOpenVASP protocol\b/i,
];

let issues = 0;
const report = (where, text) => { issues++; console.log(`${where}: OpenVASP used as a protocol: "${text.slice(0, 160)}"`); };
const test = (where, text) => {
  if (typeof text !== "string" || !text.includes("OpenVASP") || OK_CONTEXT.test(text)) return;
  if (BAD.some((re) => re.test(text))) report(where, text);
};
const walk = (node, where, key = "") => {
  if (SKIP_KEYS.test(key)) return;
  if (typeof node === "string") return test(where, node);
  if (Array.isArray(node)) {
    // a networks list entry literally named OpenVASP
    node.forEach((v, i) => {
      if (key === "networks" && v && v.name === "OpenVASP") report(`${where}.networks[${i}]`, "name: OpenVASP");
      walk(v, `${where}[${i}]`, key);
    });
    return;
  }
  if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walk(v, `${where}.${k}`, k);
};

const files = (dir, ext) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  if (d.isDirectory()) return files(p, ext);
  return ext.some((e) => d.name.endsWith(e)) ? [p] : [];
});

for (const f of files(path.join(root, "src/_data"), [".yml", ".yaml"])) {
  walk(yaml.load(fs.readFileSync(f, "utf8")), path.relative(root, f));
}
for (const f of files(path.join(root, "src"), [".md", ".njk"])) {
  if (f.includes(`${path.sep}_data${path.sep}`)) continue;
  fs.readFileSync(f, "utf8").split(/\n\s*\n/).forEach((para) => test(path.relative(root, f), para));
}
console.log(`terms: ${issues} issue(s)`);
process.exit(issues ? 1 : 0);
