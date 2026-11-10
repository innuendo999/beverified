# UK DVS register check, 10 Nov 2026

Step 1 of the UK ranking brief. Rule (owner, 10 Nov 2026): only providers with a service on the UK digital verification services (DVS) register go in the UK ranking.

Source: [DVS register](https://www.access-dvs-register.service.gov.uk/), opened 10 Nov 2026. The register's "All providers" view listed 49 providers and 66 services; the register's download view gave the dates below. CAB = conformity assessment body. Kantara certified every row we checked.

## Reviewed providers on the register (8)

| Provider in our records | Score | Register provider | Service | Schemes | Certificate issued | Expires | Record status |
|---|---|---|---|---|---|---|---|
| Veriff | 4.5 | Veriff OÜ | Veriff UK Identity Verification Service | Right to Work, Right to Rent | 14 Jan 2026 | 14 Jan 2029 | Confirmed, matches |
| ComplyCube | 4.0 | Teemo Technology Ltd (trading as ComplyCube) | ComplyCube Platform | Right to Work, Right to Rent, DBS | 30 Mar 2026 | 30 Mar 2029 | Confirmed, matches |
| Persona | 4.0 | Persona Identities Inc | Persona | Right to Work, Right to Rent | 15 Dec 2025 | 15 Dec 2028 | **Added in this PR** (was missing) |
| SmartSearch | 3.8 | SmartCredit Limited (trading as SmartSearch) | SmartDoc Advanced with Facial Recognition and Fraud Check | none listed | 4 Mar 2026 | 4 Mar 2029 | Confirmed, matches |
| Onfido (Entrust) | 3.6 | Onfido Ltd | Entrust IDV | Right to Work, Right to Rent, DBS | 20 Mar 2026 | 20 Mar 2029 | Confirmed, matches |
| Signicat | 3.4 | Signicat B.V | ReadID | none listed | 29 Jun 2026 | 29 Jun 2029 | Confirmed, matches |
| GBG | 3.3 | GB Group PLC | GBG Go, Identify (RTW, RTR, DBS); ID3global, IDscan Enterprise, oZone FYQ2 | see service | 14 Sep 2026 | 27 Sep 2029 | Confirmed, matches |
| AU10TIX | 3.3 | AU10TIX Ltd | Identity Document Verification Suite | Right to Work, Right to Rent, DBS | 29 Dec 2025 | 29 Dec 2028 | Confirmed, matches |

## To resolve before the page ships

- **Credas Connect.** The SmartSearch record lists a second certificate for Credas Connect. On the register it belongs to a separate provider, Credas Technologies Ltd (RTW, RTR, DBS; 10 Sep 2025 to 10 Sep 2028). Keep it in the SmartSearch record only if a source shows SmartSearch owns Credas; otherwise remove it from that record.

## Reviewed providers not on the register

None of these names appears among the 49 providers on 10 Nov 2026: **Sumsub, Shufti Pro, Veridas, Trulioo, Socure.** They stay out of the UK ranking. The Veridas record cites an older DIATF certificate (validity 20/12/2024); it is not on the register now. Add a note to that record at its next re-check.

## On the register but not reviewed by us

These include Yoti, iProov, Daon, Mitek, LexisNexis Risk Solutions (IDVerse), Experian (Identity Connect), TransUnion (TruValidate), TrustID, Thirdfort, Credas and Digidentity. Several are on the review roadmap (Yoti, iProov, Mitek, Daon, LexisNexis). They can join the UK ranking once they have a review.

## Result

8 providers qualify. The ranking can ship as a Top 8, in v3.1 score order: Veriff, ComplyCube, Persona, SmartSearch, Onfido, Signicat, GBG, AU10TIX. ComplyCube and Persona tie at 4.0; the brief's tie rule (framework version) does not separate them, because both certificates are on the same framework. The owner decides their order.
