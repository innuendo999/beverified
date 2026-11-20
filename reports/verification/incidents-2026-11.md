# Incident tracker re-check, 20 Nov 2026

All 8 entries in `src/_data/incidents.yml` checked for updates after 5 Nov 2026. `checked` moved from 2026-11-05 to 2026-11-20.

Method: web search for each vendor and incident, reading the vendor's own page where search returned it (Chainalysis, Sumsub, Persona). Pages could not be opened in full in this session (fetch permission not granted), so a vendor notice changed only in parts that search did not return would be missed. RelyComply's notice was not readable this way.

| Entry | Result | Change |
|---|---|---|
| Chainalysis 2026-10 | Chainalysis update of 13 Nov 2026: contained, no unauthorised access found since 4 Nov 2026, investigation ongoing | status investigating → contained; timeline step 13 Nov; `since` updated; source title |
| RelyComply 2026-09 | No newer vendor update found. Found but **not added**: the ransomware group Direwolf claimed the attack on 9 Sep 2026 (leak-site trackers), and Virgin Active South Africa told customers that payment transaction data held by RelyComply may have been exposed, with access possibly from about 2 Sep 2026 (secondary report, thehackerwire.com) | none; owner to decide whether to add the claim and the customer notice from primary copies |
| IDMERIT 2026-02 | Cybernews found the database on 11 Nov 2025, per Bitdefender's summary of the Cybernews report | timeline step 11 Nov 2025; source added (Bitdefender) |
| Persona 2026-02 | Persona post-incident review, 24 Feb 2026: frontend source maps on a non-production subdomain; no customer data or backend systems affected; researchers published on 16 Feb 2026 | timeline dates; `since` updated; source added (Persona) |
| Sumsub 2026-02 | Notice still dated 4 Feb 2026, investigation ongoing | none |
| Veriff 2025-11 | Three S.D.N.Y. cases (Jan 2026); no settlement found | `since`: "No settlement found as of 20 Nov 2026" |
| Signzy 2024-11 | No findings or root cause published | dates moved to 20 Nov 2026 |
| AU10TIX 2024-06 | Nothing new | none |

Scores: no change today. Signzy's 2024-12-03 incident is counted through 3 Dec 2026; `RESCORE_TODAY=2026-12-04 node scripts/rescore.mjs signzy` gives v3.1 2.6 → 2.7 (Trust and track record 2 → 3). A scheduled task re-scores it on 4 Dec 2026 and opens a PR.
