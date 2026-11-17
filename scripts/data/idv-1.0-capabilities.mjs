// One-off: adds the four IDV 1.0 capability keys (docs/scoring-idv.md) to the ten providers
// ranked in Identity Verification on 17 Nov 2026, with a numbered source for each value.
// Values were checked on 17 Nov 2026 from the vendors' own pages and docs.
// node scripts/data/idv-1.0-capabilities.mjs   (idempotent: skips keys that already exist)
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dir = path.join(root, "src/_data/providers");
const CHECKED = "2026-11";

// status: yes | add_on | no | not_disclosed. manual_review.hours: text when the vendor publishes hours
// or a turnaround for its own reviewers, otherwise null (the IDV 1.0 point needs published hours).
const S = (title, publisher, url) => ({ title, publisher, url });
const DATA = {
  "shufti-pro": {
    doc_forensics: ["yes", "security feature analysis, forgery and tampering detection", S("Face and Document Verification (PDF)", "Shufti", "https://shuftipro.com/collaterals-library/PDF-Face-and-Document.pdf")],
    manual_review: ["yes", "verification specialists cross-check transactions; no hours or turnaround published", S("Two Fold Verification", "Shufti", "https://shuftipro.com/two-fold-technology"), null],
    proof_of_address: ["yes", "address documents such as utility bills, matched to the ID", S("Proof of Address", "Shufti", "https://shuftipro.com/proof-of-address")],
    reverification: ["yes", "1:1 face authentication of returning users at login, payment and recovery", S("1:1 Authentication", "Shufti", "https://shuftipro.com/1-1-authentication/")],
  },
  sumsub: {
    doc_forensics: ["yes", "forgery indicators in ID and alteration checks in address documents", S("User verification check results", "Sumsub", "https://docs.sumsub.com/docs/user-verification-check-results")],
    manual_review: ["yes", "clients can ask Sumsub to re-check a profile; no hours or turnaround published", S("Manage applicant profiles", "Sumsub", "https://docs.sumsub.com/docs/manage-results"), null],
    proof_of_address: ["yes", "document-based proof of address, checked for digital alteration", S("Document-based PoA", "Sumsub", "https://docs.sumsub.com/docs/document-based-poa")],
    reverification: ["yes", "face match against the previously verified user for repeat actions", S("Face Match", "Sumsub", "https://docs.sumsub.com/docs/face-match")],
  },
  veriff: {
    doc_forensics: ["yes", "document tampering checks such as data dependencies and font detection", S("Synthetic fraud and document tampering", "Veriff", "https://www.veriff.com/fraud/business/what-is-synthetic-fraud-document-tampering")],
    manual_review: ["yes", "verification specialists on the Plus and Premium plans; no hours or turnaround published", "pricing", null],
    proof_of_address: ["yes", "document-based proof of address with authenticity checks", S("Proof of Address", "Veriff", "https://veriff.com/product/proof-of-address")],
    reverification: ["yes", "reverification and biometric authentication of returning users", S("Reverification", "Veriff", "https://www.veriff.com/use-cases/reverification")],
  },
  kycaid: {
    doc_forensics: ["not_disclosed", "no document tampering or security-feature checks described on kycaid.com or in its docs", null],
    manual_review: ["yes", "human verification experts review cases the automatic check cannot decide; no hours or turnaround published on kycaid.com", S("Proof of address", "KYCAID", "https://kycaid.com/proof-of-address"), null],
    proof_of_address: ["yes", "proof of address check with manual review when needed", S("Proof of address", "KYCAID", "https://kycaid.com/proof-of-address")],
    reverification: ["not_disclosed", "no re-verification of returning users described", null],
  },
  persona: {
    doc_forensics: ["yes", "checks to catch doctored government IDs", S("Government ID", "Persona", "https://withpersona.com/product/verifications/government-id")],
    manual_review: ["not_disclosed", "review queues and cases for the customer's own team; no review by Persona staff described", S("Government ID", "Persona", "https://withpersona.com/product/verifications/government-id"), null],
    proof_of_address: ["yes", "KYC + Address solution: ID, selfie and proof-of-address document", S("KYC + Address Solution", "Persona", "https://help.withpersona.com/articles/TOVyBm0zPfRYqr89lzZcU")],
    reverification: ["yes", "reverification of existing users", S("What is reverification and why does it matter?", "Persona", "https://withpersona.com/blog/what-is-reverification-and-why-does-it-matter")],
  },
  incode: {
    doc_forensics: ["yes", "checks for physical and digital tampering, microprint and security features", S("Document verification", "Incode", "https://incode.com/our-technology/document-verification")],
    manual_review: ["not_disclosed", "no review by Incode staff described", null, null],
    proof_of_address: ["yes", "utility bills, bank statements and other proof-of-address documents", S("Non-ID document validation", "Incode", "https://incode.com/products/non-id-document-validation/")],
    reverification: ["yes", "face authentication of returning users and step-up checks", S("Authentication", "Incode", "https://incode.com/use-cases/authentication/")],
  },
  veridas: {
    doc_forensics: ["yes", "document authenticity checks on security features", S("Document Verification", "Veridas", "https://veridas.com/en/global-document-verification/")],
    manual_review: ["not_disclosed", "no review by Veridas staff described", null, null],
    proof_of_address: ["not_disclosed", "no proof-of-address product found", null],
    reverification: ["yes", "face biometric authentication of returning users", S("Face biometric authentication", "Veridas", "https://veridas.com/en/face-biometric-authentication/")],
  },
  jumio: {
    doc_forensics: ["yes", "document security features and fraud checks", S("Features and functionalities", "Jumio", "https://jumio.com/features/")],
    manual_review: ["not_disclosed", "human verification experts described only in 2017 to 2019 announcements; nothing current found", null, null],
    proof_of_address: ["yes", "Doc Proof: utility bills and bank statements as proof of address", S("Document Verification (Doc Proof)", "Jumio", "https://www.jumio.com/products/document-verification")],
    reverification: ["yes", "selfie.DONE re-verifies returning users with a selfie", S("selfie.DONE", "Jumio", "https://www.jumio.com/products/selfie-done/")],
  },
  regula: {
    doc_forensics: ["yes", "Automatic Authenticity Control of document security features", S("KYC verification", "Regula", "https://regulaforensics.com/kyc-verification/")],
    manual_review: ["no", "Regula's own comparison lists vendor-operated human review for iDenfy, not for Regula", S("Regula vs iDenfy", "Regula", "https://regulaforensics.com/blog/regula-vs-idenfy/"), null],
    proof_of_address: ["yes", "IDV Platform flows can include proof-of-address verification", S("What makes an identity verification platform enterprise-grade?", "Regula", "https://regulaforensics.com/blog/enterprise-grade-identity-verification-platform/")],
    reverification: ["yes", "re-authentication and re-verification of returning users", S("Regula vs iDenfy", "Regula", "https://regulaforensics.com/blog/regula-vs-idenfy/")],
  },
  onfido: {
    doc_forensics: ["yes", "visual authenticity and image integrity checks, including security features", S("Document report", "Entrust", "https://documentation.identity.entrust.com/guide/document-report/")],
    manual_review: ["yes", "hybrid AI and human expert review, stated in a customer story; no hours or turnaround published", S("Neeyamo case study", "Entrust", "https://www.entrust.com/resources/case-studies/neeyamo"), null],
    proof_of_address: ["yes", "Proof of Address report on bank statements and utility bills", S("Proof of Address", "Entrust", "https://documentation.identity.entrust.com/guide/proof-of-address-report/")],
    reverification: ["not_disclosed", "Known Faces checks duplicates; no re-verification of returning users found", null],
  },
};

// Second batch (17 Nov 2026): the other records that pass IDV 1.0 eligibility.
const ND = (note) => ["not_disclosed", note, null, null];
Object.assign(DATA, {
  idenfy: {
    doc_forensics: ["yes", "security features, fonts and templates checked against 16,000+ document types", S("Document verification software", "iDenfy", "https://idenfy.com/document-verification-software/")],
    manual_review: ["yes", "in-house team double-checks verifications 24/7, typically within about 3 minutes", S("Official information about iDenfy", "iDenfy", "https://idenfy.com/ai-info-page/"), "24/7, typically within about 3 minutes"],
    proof_of_address: ["yes", "proof of address documents with manual review", S("Proof of address verification", "iDenfy", "https://idenfy.com/proof-of-address-verification/")],
    reverification: ["yes", "face authentication of returning users, for example on high-value transactions", S("KYC mobile SDK", "iDenfy", "https://www.idenfy.com/kyc-mobile-sdk")],
  },
  complycube: {
    doc_forensics: ["yes", "document checks including visual security elements", S("Customer due diligence", "ComplyCube", "https://www.complycube.com/solutions/due-diligence-compliance/customer-due-diligence/")],
    manual_review: ND("no current review by ComplyCube staff described"),
    proof_of_address: ["yes", "proof-of-address documents checked against client and location data", S("Platform", "ComplyCube", "https://www.complycube.com/platform")],
    reverification: ["yes", "biometric authentication of returning users", S("Biometric verification", "ComplyCube", "https://complycube.com/solutions/identity-assurance/biometric-verification")],
  },
  socure: {
    doc_forensics: ["yes", "fake ID detection and fraud models in Predictive DocV", S("Predictive DocV", "Socure", "https://www.socure.com/berbix-acquisition-document-verification")],
    manual_review: ["no", "Socure markets DocV as replacing manual review teams", S("Document verification", "Socure", "https://socure.com/products/document-verification"), null],
    proof_of_address: ND("no proof-of-address document check found"),
    reverification: ["yes", "Selfie Reverification against the earlier DocV headshot", S("Selfie Reverification", "Socure", "https://help.socure.com/riskos/docs/selfie-reverification")],
  },
  au10tix: {
    doc_forensics: ["yes", "forgery detection, including on address documents", S("Address verification", "AU10TIX", "https://www.au10tix.com/solutions/address-verification/")],
    manual_review: ND("manual review described only on a partner page; nothing found on au10tix.com"),
    proof_of_address: ["yes", "proof of residence and address validation", S("Address verification", "AU10TIX", "https://www.au10tix.com/solutions/address-verification/")],
    reverification: ND("no re-verification of returning users found"),
  },
  gbg: {
    doc_forensics: ["yes", "50+ forensic document authentication tests", S("Document authentication", "GBG", "https://www.gbg.com/en/prove/identity-document-verification/")],
    manual_review: ["yes", "GBG experts review unclassified documents; no hours or turnaround published", S("Document authentication", "GBG", "https://www.gbg.com/en/prove/identity-document-verification/"), null],
    proof_of_address: ND("no proof-of-address document check found"),
    reverification: ND("no re-verification of returning users found"),
  },
  idnow: {
    doc_forensics: ["yes", "security features detection of holograms and OVDs", S("AutoIdent", "IDnow", "https://idnow.io/developers/autoident/")],
    manual_review: ["yes", "optional expert review by IDnow specialist agents; no hours or turnaround published", S("AutoIdent", "IDnow", "https://idnow.io/developers/autoident/"), null],
    proof_of_address: ["yes", "optional proof-of-address module reviewed by ident specialists", S("Core features", "IDnow", "https://doc.idnow.de/core-features")],
    reverification: ND("no re-verification of returning users found"),
  },
  trulioo: {
    doc_forensics: ["yes", "document liveness checks against fake or tampered IDs", S("Verify ID documents across the globe", "Trulioo", "https://content.trulioo.com/flip-book/351985/886495/page/2")],
    manual_review: ND("no review by Trulioo staff described"),
    proof_of_address: ["yes", "proof of address by data match or document", S("Proof of Address", "Trulioo", "https://www.trulioo.com/?p=19515")],
    reverification: ["yes", "a new selfie matched against document images from an earlier transaction", S("Customer API 2.5", "Trulioo", "https://docs.verification.trulioo.com/api/customer/2.5/index.html")],
  },
  signicat: {
    doc_forensics: ["yes", "document forgery detection in VideoID", S("How Signicat uses AI", "Signicat", "https://www.signicat.com/blog/how-signicat-uses-ai")],
    manual_review: ["yes", "VideoID High adds a manual review by a Signicat Registration Authority agent; no hours or turnaround published", S("About VideoID", "Signicat", "https://developer.signicat.com/docs/id-document-and-biometric-verification/provider-specific-integrations/signicat-videoid/about-videoid/"), null],
    proof_of_address: ND("no proof-of-address document check found"),
    reverification: ["yes", "MobileID Face Authentication at login", S("How Signicat uses AI", "Signicat", "https://www.signicat.com/blog/how-signicat-uses-ai")],
  },
  zyphe: {
    doc_forensics: ND("no document tampering checks described for the product"),
    manual_review: ND("no review by Zyphe staff described"),
    proof_of_address: ["yes", "proof of address in the crypto KYC flow", S("KYC for crypto", "Zyphe", "https://www.zyphe.com/industry/kyc-for-crypto")],
    reverification: ND("reusable credentials only; no re-verification of returning users described"),
  },
  "advance-ai": {
    doc_forensics: ["yes", "forgery detection on IDs", S("Fintech identity verification", "ADVANCE.AI", "https://advance.ai/fintech/")],
    manual_review: ND("no review by ADVANCE.AI staff described"),
    proof_of_address: ["yes", "utility bills for proof of address checks", S("Privacy notice", "ADVANCE.AI", "https://info.advance.ai/privacy-notice")],
    reverification: ["yes", "face authentication service keeps a facial image per user", S("Privacy notice", "ADVANCE.AI", "https://info.advance.ai/privacy-notice")],
  },
  aiprise: {
    doc_forensics: ["yes", "tampering and edited-text detection on submitted documents", S("How does Proof of Address validation work?", "AiPrise", "https://support.aiprise.com/articles/7810232795-how-does-proof-of-address-poa-validation-work")],
    manual_review: ND("no review by AiPrise staff described"),
    proof_of_address: ["yes", "proof of address documents and data sources", S("Automated proof of address verification", "AiPrise", "https://www.aiprise.com/services/automated-proof-address-verification-service")],
    reverification: ND("no re-verification of returning users found"),
  },
  fourthline: {
    doc_forensics: ND("no document tampering checks found on fourthline.com"),
    manual_review: ND("no review by Fourthline staff described"),
    proof_of_address: ["yes", "digital proof of address using geolocation and device signals", S("What is proof of address", "Fourthline", "https://www.fourthline.com/glossary/proof-of-address-poa")],
    reverification: ND("no re-verification of returning users found"),
  },
  signzy: {
    doc_forensics: ["yes", "advanced forgery detection on ID documents", S("ID Verification", "Signzy", "https://signzy.com/identity-verification")],
    manual_review: ND("video KYC agents are the customer's; no review by Signzy staff described"),
    proof_of_address: ["yes", "address extraction from utility bills", S("ID Verification", "Signzy", "https://signzy.com/identity-verification")],
    reverification: ND("no re-verification of returning users found"),
  },
  idmerit: {
    doc_forensics: ["yes", "tamper detection in IDMscan", S("Know Your Customer", "IDMERIT", "https://www.idmerit.com/?p=13320")],
    manual_review: ND("no review by IDMERIT staff described"),
    proof_of_address: ["yes", "proof-of-address verification service", S("Know Your Customer", "IDMERIT", "https://www.idmerit.com/?p=13320")],
    reverification: ND("no re-verification of returning users found"),
  },
  fullcircl: {
    doc_forensics: ["yes", "document fraud prevention in nCino identity verification", S("Identity verification software", "nCino Identity Solutions", "https://www.identitysolutions.ncino.com/products/identity-verification-software")],
    manual_review: ND("no review by nCino staff described"),
    proof_of_address: ND("no proof-of-address document check found"),
    reverification: ND("no re-verification of returning users found"),
  },
  vespia: {
    doc_forensics: ND("nothing found on 17 Nov 2026"),
    manual_review: ND("nothing found on 17 Nov 2026"),
    proof_of_address: ND("nothing found on 17 Nov 2026"),
    reverification: ND("nothing found on 17 Nov 2026"),
  },
  horuscheck: {
    doc_forensics: ND("nothing found on 17 Nov 2026"),
    manual_review: ND("nothing found on 17 Nov 2026"),
    proof_of_address: ND("nothing found on 17 Nov 2026"),
    reverification: ND("nothing found on 17 Nov 2026"),
  },
});

const sq = (s) => `'${String(s).replace(/'/g, "''")}'`;
for (const [slug, keys] of Object.entries(DATA)) {
  const file = path.join(dir, `${slug}.yml`);
  let text = fs.readFileSync(file, "utf8");
  const d = yaml.load(text);
  const caps = d.capabilities || {};
  const sources = d.sources || [];
  const newSources = [];
  const srcIndex = (s) => {
    if (s === "pricing") return 1;
    if (!s) return null;
    let i = sources.findIndex((x) => x.url === s.url);
    if (i >= 0) return i + 1;
    i = newSources.findIndex((x) => x.url === s.url);
    if (i >= 0) return sources.length + i + 1;
    newSources.push(s);
    return sources.length + newSources.length;
  };
  const lines = [];
  for (const [key, [status, note, src, hours]] of Object.entries(keys)) {
    if (caps[key]) continue;
    const n = srcIndex(src);
    lines.push(`  ${key}:`, `    status: ${sq(status)}`, `    note: ${sq(note)}`);
    if (n) lines.push(`    source: ${n}`);
    if (key === "manual_review") lines.push(`    hours: ${hours ? sq(hours) : "null"}`);
    lines.push(`    checked: '${CHECKED}'`);
  }
  if (!lines.length) continue;
  // Insert at the end of the capabilities block (just before the next top-level key).
  text = text.replace(/(^capabilities:\n(?:(?: .*)?\n)*?)(?=^\S)/m, (m, block) => block + lines.join("\n") + "\n");
  if (newSources.length) {
    const add = newSources.map((s) => `- title: ${sq(s.title)}\n  publisher: ${s.publisher}\n  url: ${s.url}\n  accessed: '${CHECKED}'`).join("\n") + "\n";
    text = text.replace(/(^sources:\n(?:(?:-|  ).*\n)*)/m, (m, block) => block + add);
  }
  const check = yaml.load(text);
  for (const key of Object.keys(keys)) if (!check.capabilities[key]) throw new Error(`${slug}: ${key} not written`);
  if (check.sources.length !== sources.length + newSources.length) throw new Error(`${slug}: sources not appended`);
  fs.writeFileSync(file, text);
  console.log(`${slug}: ${lines.filter((l) => /^  \w/.test(l)).length} keys, ${newSources.length} new sources`);
}
