# Certification re-check, KYC Certification Tracker providers (November 2026)

Scope: the 29 KYC providers listed in the KYC Certification Tracker (`docs/cert-tracker.md`), 142 `certifications[]` entries. Checked 2026-11-20 against the issuers' own pages. Part 1 covers the independent registers; part 2 (ACCS, DHS RIVR, ISO/IEC 27001, SOC 2 and other entries) is still open. Scores and `last_verified` are not changed: this is not a full record re-check.

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

## Part 2: still open (needs page access)

- ACCS registry: Incode, Paravision, VerifyMy (Sumsub re-read 2026-11-20: ISO/IEC 29115 and TS 29003, Active, valid to 8 Sep 2028, matches), ComplyCube (vendor-stated).
- DHS RIVR (mdtf.org/rivr/Results): Paravision says its systems are PAD-P 9 and MTDS 12. Under the tracker rule (an alias counts when the vendor disclosed it, as for Shufti Pro's MTDS 15) these may move to confirmed once the values are checked against the results page.
- ISO/IEC 27001 (25), SOC 2 (19) and other entries (50): confirmed ones against the issuing body's certificate, vendor-stated ones against the vendor page cited.

## Changes in this PR

| Record | Change |
|---|---|
| onfido | new confirmed entry: iBeta L2, Entrust Motion v2, 4 Nov 2026 (+ source) |
| paravision | iBeta L1 vendor-stated → confirmed (+ source: the letter) |
| didit | iBeta L2 cites the ibeta.com letter |
| signicat | UK DVS entry cites the register; roles and dates from the register |
| veriff | FIDO entries get lab and expiry |

Every changed record has a dated `verification_notes` line. `rescore.mjs`, `rescore-idv.mjs` and `rescore-budget.mjs` give identical output before and after (no score input changes).
