# Certification re-check, KYC Certification Tracker providers (November 2026)

Scope: the 29 KYC providers listed in the KYC Certification Tracker (`docs/cert-tracker.md`), 142 `certifications[]` entries. Checked 2026-11-20 against the issuers' own pages. Part 1 covers iBeta, the UK DVS register and FIDO; part 2 covers ACCS, DHS RIVR, ISO/IEC 27001 and SOC 2. Scores and `last_verified` are not changed: this is not a full record re-check.

## Part 1: iBeta, UK DVS register, FIDO (done)

### iBeta ISO/IEC 30107-3 (25 entries)

Source: iBeta confirmation letter list, https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/, read in full 2026-11-20.

| Provider | Record | iBeta list | Result |
|---|---|---|---|
| Advance.AI | L2, Sep 2024 | Advance Intelligence L2 16 Sep 2024 (also L1 Jul 2024, Advance AI L1 Apr 2022) | matches |
| Didit | L1 Feb 2026, L2 Nov 2026 (L2 cited from Didit's storage) | Didit Identity L1 4 Feb 2026, L2 9 Nov 2026 | matches; L2 now cites ibeta.com (fixed) |
| Incode | L3 | Incode Technologies L3 16 Feb 2026 (Deepsight); L2 Jan 2023; L1 Aug 2019 | matches |
| Jumio | L2 | Jumio Corp. L2 11 Sep 2025 | matches |
| Onfido (Entrust) | L2 (Onfido 2022), L1 (Entrust Motion, Jul 2026) | Entrust L2 **4 Nov 2026** (Motion v2, Android, iOS, web); Entrust L1 27 Jul 2026; Onfido L2 Jan/Jun 2022; L1 2021 | **new letter missing: added** |
| Paravision | L2 confirmed, L1 vendor-stated ("letter not opened") | Paravision L2 28 Dec 2023, L1 16 Oct 2023 | **L1 letter opened: moved to confirmed** |
| Persona | L2, Nov 2023 | Persona Identities, Inc. L2 16 Nov 2023 (L1 Aug 2023) | matches |
| Regula | L2, Mar 2025 and Dec 2025 | Regula Forensics L2 21 Mar 2025, 10 Dec 2025 (L1 Oct 2024, Oct 2025) | matches |
| Shufti Pro | L3, L2, L1 | Shufti Pro L3 24 Apr 2026, L2 10 Apr 2025, L1 31 Oct 2024 | matches |
| Sumsub | L3, L2, L1 | Raritex Trade (Sumsub Liveness) L3 17 Sep 2026, L2 25 Mar 2025, L1 5 Feb 2025 | matches |
| Veridas | L2, L1, voice L1 | Veridas L2 11 Apr 2024, L1 15 Mar 2024, Voice Shield L1 6 Dec 2024 (older L1/L2 2020 to 2022) | matches |
| Veriff | L2, L1 | Veriff L2 29 Aug 2024, L1 16 Jul 2024 | matches |
| AU10TIX, Fourthline, iDenfy (vendor-stated) | iBeta claimed | no row under these names | stays vendor-stated |
| ComplyCube, Socure (vendor-stated, lab not named) | PAD claim | no row under these names | stays vendor-stated |

Older letters below the recorded highest level (Advance.AI L1, Incode L1/L2, Regula L1, Onfido 2021 L1) are not added: they change nothing on the page.

### UK DVS register (9 entries)

Source: https://www.access-dvs-register.service.gov.uk/register, service pages read 2026-11-20.

| Provider | Register entry | Dates | Result |
|---|---|---|---|
| AU10TIX | Identity Document Verification Suite, AU10TIX Ltd, Identity; RtW, RtR, DBS; Kantara, 0.4 gamma | 29 Dec 2025 to 29 Dec 2028 | matches |
| ComplyCube | ComplyCube Platform, Teemo Technology Ltd; Identity; RtW, RtR, DBS; Kantara | 30 Mar 2026 to 30 Mar 2029 | matches |
| GBG | GB Group PLC: GBG Go, ID3global, Identify, IDscan Enterprise, oZone FYQ2 | 14 Sep 2026 to 27 Sep 2029 | matches |
| Onfido (Entrust) | Entrust IDV, Onfido Ltd; Identity; RtW, RtR, DBS; Kantara | 20 Mar 2026 to 20 Mar 2029 | matches |
| Persona | Persona, Persona Identities Inc; Identity; RtW, RtR; Kantara | 15 Dec 2025 to 15 Dec 2028 | matches |
| Signicat | ReadID, Signicat B.V; Orchestration, Component | 29 Jun 2026 to 29 Jun 2029 | matches; entry cited a PDF, now cites the register (fixed) |
| SmartSearch | SmartDoc Advanced with Facial Recognition and Fraud Check, SmartCredit Limited; Identity | 4 Mar 2026 to 4 Mar 2029 | matches |
| SmartSearch | Credas Connect, **Credas Technologies Ltd**; Identity; RtW, RtR, DBS | 10 Sep 2025 to 10 Sep 2028 | matches; registered to Credas, kept under SmartSearch by owner decision (2026-11-10). Owner to confirm for the tracker |
| Veriff | Veriff UK Identity Verification Service, Veriff OÜ; Identity, Component; RtW, RtR | 14 Jan 2026 to 14 Jan 2029 | matches |

### FIDO (2 entries)

Source: https://fidoalliance.org/certification/identity-verification/face-verification/fido-certified-products/ (lists Face Verification and DocAuth), read 2026-11-20.

- Veriff Face Verification Level 2 (Reference Type 1), Ingenium, expires 13 Nov 2029: matches; lab and expiry added.
- Veriff DocAuth, Ingenium, expires 1 Oct 2029: matches; lab and expiry added.
- No FIDO IDV entry for any other tracker provider (iProov is listed but not reviewed).

## Part 2: ACCS, DHS RIVR, ISO/IEC 27001, SOC 2 (done where readable)

### ACCS registry

| Provider | Registry page | Result |
|---|---|---|
| Sumsub | ISO/IEC 29115:2013 and ISO/IEC TS 29003:2018, LoA2/LoA3, LoIP2/LoIP3, Active, valid to 8 Sep 2028 | matches |
| Paravision | Age Estimation, ACCS 1:2020, Level 3 "Highly Effective Compliance", valid to 18 Mar 2027 | matches |
| VerifyMy | ACCS 1:2025 and ISO/IEC 27566-1:2025, Active, AVID Certification Services, valid to 20 May 2029; IEEE 2089.1-2024 for the VerifyMy Age Estimation API, valid to 21 Sep 2027 | matches |
| Incode | both registry pages for Incode Technologies Inc (uncategorized, data-privacy) say no certification is listed | **was confirmed; moved to vendor_stated**, citing Incode's June 2024 announcement |
| ComplyCube (vendor-stated) | security page says ACCS 4:2020 certified; no registry entry checked | stays vendor-stated |

Effect on pages: Incode's age-certification cell on `/providers/age-verification/` and its row on the ISO/IEC 27566-1 glossary term change from Confirmed to Vendor-stated. No score input changes.

### DHS RIVR

mdtf.org/rivr/Results now returns an empty page to our tools (script-rendered). Paravision's disclosed aliases (PAD-P 9, MTDS 12) could not be checked against the values, so both entries stay vendor-stated. Shufti Pro's MTDS 15 (checked 17 Nov 2026) is unchanged. Owner: a browser check of the Results page would settle both.

### ISO/IEC 27001 and SOC 2

Confirmed certificates opened again: Didit (Bureau Veritas, ES144068, 7 Apr 2026 to 3 Jun 2027), iDenfy (CERT International, ISMS-1851/A, to 2 Jun 2029), Signicat (DNV, C849517, to 11 Oct 2029). All match.

Other confirmed entries opened again: Signicat ENS ALTA (AENOR, to 5 Mar 2028), Veridas ETSI EN 319 401 and TS 119 461 (DEKRA, issued 7 Aug 2026, two years), FedRAMP Moderate for Acuant COFRS (GBG, since 24 Nov 2021), Persona for Government (since 10 Apr 2026) and Socure for Government (since 19 Mar 2025). All match.

Vendor-stated entries, vendor page re-read:

| Provider | What the page says now | Change |
|---|---|---|
| Shufti Pro | ISO/IEC 27001:2022 by Insight Assurance; SOC 2 Type II | none |
| Veriff | ISO/IEC 27001:2022 (+27017, 27018); SOC 2 Type II | none |
| Trulioo | ISO 27001 since 2015; SOC 2 Type 2 since Feb 2024 | none |
| Persona | SOC 2 Type II, ISO 27001; copies on request | none |
| Socure | ISO/IEC 27001:2022; SOC 2 Type 2 | none |
| Jumio | ISO/IEC 27001:2022, PCI DSS, SOC 2 Type 2 | none |
| ComplyCube | ISO/IEC 27001:2022, ACCS, PAD Level 2 (lab not named); no SOC 2 | none |
| Regula | ISO/IEC 27001:2022 (Insight Assurance); **SOC 2 Type II audit completed** | **SOC 2 added as vendor-stated** |
| Didit | SOC 2 Type 1 (Apr 2026) and Type 2 (Jul 2026) by Atom Assurances | none |
| iDenfy | SOC 2 Type II by House of CPA; **docs page names a different ISO certificate** (TUV Thuringen, No. 1512120135) | auditor added; ISO conflict noted, ask iDenfy |
| Signicat | SOC 2 Type 1 (2018) and Type 2 (2019) | none |
| GBG | ISO/IEC 27001:2022, SOC 2 Type 2 | none |
| Fourthline | ISO/IEC 27001:2022, EY CertifyPoint 2021-039; homepage still says iBeta Level 1 and 2 | none |
| Signzy | ISO 27001, SOC 2 Type II, PCI DSS | none |
| Onfido (Entrust) | Practice statement v1.5 (Dec 2025): ISO/IEC 27001:2022, SOC 2 Type II | none |
| Sumsub | trust centre lists ISO/IEC 27001:2022, SOC 2 Type 2, PCI DSS and more; no body named | none |
| AiPrise | SOC 2 Type II, audited annually; no ISO | none |
| Veridas | ISO/IEC 27001 and ENS; no SOC 2 | none |
| Verified | ISO 27001; no SOC 2 | none |
| Zyphe | both still in progress (SOC 2 Type I targeted Oct 2026, ISO Stage 2 Nov to Dec 2026) | none |
| KYCAID | privacy policy: compliance with ISO/IEC 27001, SOC 2 Type 2 and PCI DSS "continuously verified", not certified | **ISO wording narrowed; SOC 2 added as vendor-stated** |
| IDMERIT | homepage: data access policies "adhere to" ISO 27001 and SOC 2 requirements, badges only | **wording of both entries narrowed** |
| Advance.AI | ISO/IEC 27001:2013 obtained Feb 2020 in Indonesia | none; owner note: the 2013 edition's transition period ended in Oct 2025, so this certificate is likely lapsed or re-issued under 2022. Ask Advance.AI |

Trust centres checked from the owner's screenshots (2026-11-20):

| Provider | What the trust centre shows | Change |
|---|---|---|
| AU10TIX | SOC 2 Type II, ISO/IEC 27001, ISO/IEC 27701, TX-RAMP Level 2, KJM, US state gaming authorizations, ISO/IEC 30107-3 PAD L1 and L2, Kantara IAL2, NIST and DHS face benchmarks, UK DIATF; no body or certificate named | KJM added as vendor-stated; rest already in the record |
| IDnow | ISO 27001:2022 cert I-12353/25 (all four entities); eIDAS 2.0 QES component certificates (LSTI); ETSI TS 119 461 v2.1.1; ANSSI PVID 1953/ANSSI/SDE/NP valid to 24 Jul 2027; TISAX AL3; ISAE 3402 Type 2 (restricted) | none; certificates are public ("Open") and would move entries to confirmed once opened |
| Incode | SOC 2 Type 2, ISO 27001 and ISO 42001 (Sensiba), HIPAA, ISO/IEC 30107-3, FedRAMP Moderate, Kantara IAL2; reviewed by Sensiba, A-LIGN, Zygma, iBeta; no ACCS | FedRAMP entry updated from the FedRAMP Marketplace: Incode Platform, Class C (Moderate), Agency Auth In Process since 25 Sep 2026 (kept vendor-stated, see below) |

Template issue found (owner decision, not changed): the trust-framework matrix column (`src/_lib/capabilities.js`) shows a FedRAMP "in progress" entry as Confirmed FedRAMP, because only some columns read "progress" in the name. Incode's FedRAMP entry stays vendor-stated until that is fixed.

Not covered in this pass: the 44 vendor-stated "other" entries (Cyber Essentials, PCI DSS, KJM, Kantara and similar). They are not columns in the tracker and show only in expanded rows.

## Changes in this PR

| Record | Change |
|---|---|
| onfido | new confirmed entry: iBeta L2, Entrust Motion v2, 4 Nov 2026 (+ source) |
| paravision | iBeta L1 vendor-stated → confirmed (+ source: the letter) |
| didit | iBeta L2 cites the ibeta.com letter |
| signicat | UK DVS entry cites the register; roles and dates from the register |
| veriff | FIDO entries get lab and expiry |
| incode | ACCS confirmed → vendor_stated (registry lists no certificate) |
| regula | SOC 2 Type II added (vendor-stated) |
| kycaid | ISO wording narrowed; SOC 2 Type 2 added (vendor-stated) |
| idmerit | ISO and SOC 2 wording narrowed |
| idenfy | SOC 2 auditor added; conflicting ISO certificate noted |
| incode | FedRAMP entry: Moderate, Agency Auth In Process (FedRAMP Marketplace), replaces "Ready (High baseline)"; trust centre notes |
| au10tix | KJM added (vendor-stated) |
| idnow | trust centre certificate numbers recorded in verification notes |

Every changed record has a dated `verification_notes` line. `rescore.mjs`, `rescore-idv.mjs`, `rescore-budget.mjs` and `rescore-kya.mjs` give identical output before and after (no score input changes).
