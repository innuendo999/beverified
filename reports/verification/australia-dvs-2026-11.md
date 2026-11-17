# Australia ranking: DVS evidence check, 17 Nov 2026

Rule (owner, 2026-11-17): a provider is scored in `/providers/australia/` only if its own documentation or website describes a check through the Australian Government Document Verification Service (DVS), directly as a gateway service provider (GSP) or through a partner. Incode and NameScan left out (owner, 2026-11-17). Unreviewed vendors with documented DVS checks are listed as "Review coming" (owner, 2026-11-17).

The government list of approved GSPs (https://www.idmatch.gov.au/node/1160) and the IVS agreements register (https://ivsregister.ag.gov.au/, 2,431 rows) could not be read reliably with our tools: the GSP page renders only partial names, and the register search does not filter. GSP status below rests on OAIC assessment reports.

## Qualify (reviewed providers)

| Provider | Route | Evidence | Source (checked 17 Nov 2026) |
|---|---|---|---|
| Sumsub | not named | Australia DVS Verification product: real-time checks of passports, driving licences and visas (announced 5 Feb 2025) | https://sumsub.com/newsroom/sumsub-integrates-australias-document-verification-service-dvs-for-enhanced-fraud-protection/ |
| Persona | Data Zoo (partner) | Official support for the DVS and other databases through Data Zoo (blog, 28 Sep 2026). Page blocks WebFetch; claim taken from the indexed page text | https://withpersona.com/blog/persona-data-zoo-australian-document-verification-service/ |
| Jumio | National Crime Check (partner) | "Easy access to the Australian Document Verification Service (DVS), powered by National Crime Check (InstaID)" | https://go.jumio.com/ekyc-australia |
| Onfido (Entrust) | not named | Workflow Builder tenants: Australia 2+2, Australia 2+2 with DVS, Australia DVS only | https://documentation.identity.entrust.com/guide/australia/ |
| GBG | direct GSP (greenID) | OAIC assessed GBG (greenID) as a DVS GSP; finding: default image retention up to 31 days, GBG rejected the suggestion to change it to zero. GBG terms: customer appoints GBG ANZ as Information Match Agent | OAIC summary report; https://www.gbgplc.com/legal-and-regulatory/additional-terms/identity-verification/greenid-mandatory-additional-terms-section-1-document-verification-service-terms |
| Trulioo | direct GSP | OAIC assessment (final report 1 Mar 2018) confirms approved GSP status | https://www.oaic.gov.au/privacy/privacy-assessments-and-decisions/privacy-assessments/handling-personal-information-trulioo |

## Do not qualify (reviewed providers)

| Provider | Finding |
|---|---|
| Shufti Pro | Australia page mentions the DVS only in a general FAQ; no DVS check described (https://shuftipro.com/australia) |
| Veriff | Registry docs list Mexico, Brazil, Colombia and metadata databases; no Australia (https://devdocs.veriff.com/docs/registries) |
| ComplyCube, iDenfy, Zyphe, KYCAID | No documented DVS check found |
| Incode | Supports the DVS only for clients that obtain DVS approval themselves and appoint Incode as Information Match Agent (https://developer.incode.com/general-reference/system-of-record-australia/). Left out (owner) |
| NameScan | Article (20 Aug 2026) invites readers to discuss DVS-based verification; no check described. Left out (owner) |

## Review coming (not reviewed, no score)

| Vendor | Evidence |
|---|---|
| Equifax | IDMatrix accesses the DVS as an approved GSP (https://equifax.com.au/idmatrix/node/74) |
| Didit | DVS cross-check after ID capture; DVS driver licence and passport checks at $0.45 per successful query; 500 free verifications a month (https://updates.didit.me/solutions/countries/australia/, https://updates.didit.me/blog/australia-passport-database-validation/) |

## Regulatory facts used on the page

- DVS: run by the Attorney-General's Department; 14 document types; used by 3,500+ organisations in Australia and New Zealand; Face Verification Service is separate (https://www.idmatch.gov.au/node/1105). Users appoint their GSP as information match agent (https://www.idmatch.gov.au/node/1108).
- AML/CTF Amendment Act 2024 and AML/CTF Rules 2025 commence 31 Mar 2026; initial CDD transition for existing reporting entities to 30 Mar 2029; ongoing CDD from 31 Mar 2026 (https://www.austrac.gov.au/reforms/amlctf-transitional-rules-update, https://www.austrac.gov.au/node/1458).
- Tranche 2 obligations from 1 Jul 2026; enrolment opened 31 Mar 2026; enrol by 29 Jul 2026 (https://www.austrac.gov.au/node/1248).
- Digital ID Act 2024: ACCC as Digital ID Regulator keeps the accredited entities register; private sector to join AGDIS from 30 Nov 2026 (Allens, Apr 2026; ACCC says "from December 2026").
- Privacy Act 1988, OAIC; OAIC assesses DVS GSPs.
