# UK DVS register re-check, 23 Nov 2026

Step 1 of the UK buyer-job page (Right to Work, Right to Rent, DBS, MLR 2017). Rule unchanged (owner, 10 Nov 2026): only providers with a service on the UK digital verification services (DVS) register go in the UK ranking.

## How the register was read

- A direct read of the [DVS register](https://www.access-dvs-register.service.gov.uk/register) from this session failed on 23 Nov 2026 (blocked by the session's fetch tools, not an error on GOV.UK).
- Used instead: the register CSV ("Download register CSV" on the All services page) as downloaded by our certification watcher (`.github/workflows/cert-watch.yml`) on **22 Nov 2026**, branch `cert-watch`, file `cert-watch/snapshots/uk_dvs.json`: 67 services from 49 providers. The watcher's run for 22 Nov reports no new, removed or changed rows for reviewed providers and none ending within 60 days.
- The CSV snapshot carries provider, service, certificate date and expiry. It has **no roles, profiles or supplementary codes** (those fields are empty in the snapshot). Schemes and roles below are from the 10 Nov 2026 check (`reports/verification/uk-register-2026-11.md`) and the provider records; they were not re-read today.

## Reviewed providers on the register (8)

| Provider | Register provider | Service | Certified | Expires | Schemes (10 Nov check) | Record |
|---|---|---|---|---|---|---|
| Veriff | Veriff OÜ | Veriff UK Identity Verification Service | 2026-01-14 | 2029-01-14 | RTW, RTR | matches, no change |
| Persona | Persona Identities Inc | Persona | 2025-12-15 | 2028-12-15 | RTW, RTR | matches, no change |
| ComplyCube | Teemo Technology Ltd | ComplyCube Platform | 2026-03-30 | 2029-03-30 | RTW, RTR, DBS | matches, no change |
| SmartSearch | SmartCredit Limited | SmartDoc Advanced with Facial Recognition and Fraud Check | 2026-03-04 | 2029-03-04 | none listed | matches, no change |
| SmartSearch (Credas, owner 10 Nov) | Credas Technologies Ltd | Credas Connect | 2025-09-10 | 2028-09-10 | RTW, RTR, DBS | matches, no change |
| Onfido (Entrust) | Onfido Ltd | Entrust IDV | 2026-03-20 | 2029-03-20 | RTW, RTR, DBS (record: M1A and H2B profiles) | matches, no change |
| Signicat | Signicat B.V | ReadID | 2026-06-29 | 2029-06-29 | none listed | matches, no change |
| GBG | GB Group PLC | GBG Go, Identify, ID3global, IDscan Enterprise, oZone FYQ2 | 2026-09-14 | 2029-09-27 | GBG Go and Identify: RTW, RTR, DBS | matches, no change |
| AU10TIX | AU10TIX Ltd | Identity Document Verification Suite | 2025-12-29 | 2028-12-29 | RTW, RTR, DBS | matches, no change |

All certificates are in date. No `certifications[]` entry was missing or outdated, so no record was changed. `last_verified` stays as it is in every record: this was one fact, not a full 90-day re-check.

## Not on the register on 22 Nov 2026

Sumsub, Shufti Pro, Veridas, Trulioo, Socure, iDenfy, Jumio, Incode, Didit, KYCAID, Zyphe, Regula, IDnow: no row under these names.

## On the register, not reviewed

Yoti Ltd (Yoti IDV, Yoti Digital ID, Digital ID Connect, Post Office EasyID; certified 6 Oct 2026, expires 4 Nov 2028) and iProov Limited (iProov ID, NFC Document Verification, Dynamic Liveness, Express Liveness, iProov OIDC Bridge; 16 Oct 2025 to 16 Oct 2028), among others. They can join the UK ranking after a review.

## Owner to check in a browser

Roles, profiles and supplementary codes per service on today's register (the snapshot has none), in particular that the Right to Work / Right to Rent / DBS lists above still hold.
