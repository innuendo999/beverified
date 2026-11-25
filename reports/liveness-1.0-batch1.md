# Liveness 1.0, batch 1 evidence (2026-11-25, preliminary)

Batch 1: the current top 10 plus iProov, FaceTec, Didit, Ondato and Paravision. Criteria 3 (genuine users and fairness, 15%) and 5 (biometric data handling, 10%) are still being collected, so the scores below use 75% of the weight. For the owner's review only.

## PAD letters (iBeta list, checked 25 Nov 2026; FaceTec from the BixeLab letter)
| Provider | Highest confirmed | Version date | Within 24 months | Platforms in letter |
|---|---|---|---|---|
| FaceTec | Level 3 (BixeLab) | Oct 2025 | yes | Android, iOS, web |
| Shufti Pro | Level 3 | 24 Apr 2026 | yes | Android, iOS |
| Sumsub | Level 3 | 17 Sep 2026 | yes | not shown |
| Yoti | Level 3 | 23 Jan 2026 | yes | not shown |
| Incode | Level 3 | 16 Feb 2026 | yes | Android, iOS |
| Jumio | Level 2 | 11 Sep 2025 | yes | iOS |
| Regula | Level 2 | 10 Dec 2025 | yes | not shown |
| Didit | Level 2 | 9 Nov 2026 | yes | not shown |
| Veriff | Level 2 | 29 Aug 2024 | no | not shown |
| Persona | Level 2 | 16 Nov 2023 | no | not shown |
| Veridas | Level 2 | 11 Apr 2024 | no | not shown |
| Paravision | Level 2 (iBeta); Level 3 from Ingenium stated by Paravision, letter not opened | 28 Dec 2023 | no | not shown |
| iProov | Level 2 | 2020 | no | not shown |
| KYCAID, Ondato | none in their own name | | | |

## IAD evidence
| Provider | Evidence | Reading |
|---|---|---|
| FaceTec | BixeLab IAD letter (Oct 2025) and Ingenium Level 2 IAD, CEN High (Nov 2025), both opened | 3 + 0.5 |
| iProov | Ingenium Level 2 IAD, CEN High (Sep 2025) and Ingenium Level 4 (Feb 2026), announced; no letter found | vendor-stated, 0.5 |
| Veridas | CLR Labs CEN/TS 18099 High (Nov 2026), announced; no certificate found | vendor-stated, 0.5 |
| Incode | SocialProof Security adversarial pen test report (2026), published by Incode; not a CEN/TS 18099 lab test | vendor-stated, 0.5 |
| Others in batch 1 | no lab IAD result found | 0, pending the device and camera integrity check in their docs (+0.5) |

## Certification beyond PAD (confirmed)
FIDO Face Verification: iProov, Veriff. NIST FATE age listing (owner's screenshot of the NIST table, 25 Nov 2026): Yoti, Incode, Paravision, Regula, Ondato. Trust framework: UK DIATF for Yoti, Veriff, Persona, iProov; ETSI TS 119 461 for Veridas.

## Preliminary scores on 5 of 7 criteria (PAD 20, IAD 25, certification 10, integration 10, pricing 10)
| Provider | Score | PAD | IAD | Cert | Integration | Pricing |
|---|---|---|---|---|---|---|
| FaceTec | 3.77 | 5.0 | 4.5 | 1 | 4 | 2 |
| Yoti | 2.87 | 4.5 | 1 | 3 | 4 | 3 |
| Veriff | 2.87 | 3.5 | 1 | 4 | 4 | 4 |
| Sumsub | 2.73 | 4.5 | 1 | 1 | 4 | 4 |
| Shufti Pro | 2.73 | 4.5 | 1 | 1 | 4 | 4 |
| Didit | 2.73 | 4.0 | 1 | 1 | 4 | 5 |
| iProov | 2.70 | 3.5 | 1.5 | 4 | 3.5 | 2 |
| Incode | 2.63 | 4.5 | 1.5 | 2 | 3 | 2 |
| Regula | 2.47 | 4.0 | 1 | 2 | 4 | 2 |
| Persona | 2.40 | 3.5 | 1 | 2 | 3.5 | 3 |
| Veridas | 2.37 | 3.5 | 1.5 | 2 | 3 | 2 |
| Jumio | 2.20 | 4.0 | 1 | 1 | 3 | 2 |
| Paravision | 2.00 | 3.5 | 1 | 2 | 1.5 | 2 |
| KYCAID | 1.93 | 1 | 1 | 1 | 4 | 5 |
| Ondato | 1.87 | 1 | 1 | 2 | 3.5 | 4 |

## What changes the picture
- Letters that would move iProov, Veridas and Paravision up: Ingenium IAD letter (iProov), CLR Labs certificate (Veridas), Ingenium PAD Level 3 letter (Paravision). Ask each vendor for a public copy.
- IAD has 25% weight and only FaceTec has an opened IAD letter, so the scale is compressed: calibration (owner decision pending on Travel Rule) would set the IAD top at 3.5 points.
- Criteria 3 and 5 still to collect for all; iProov states WCAG 2.2 AA conformance (criterion 3, +0.5).
