# Re-score under rubric v3.1: before and after (draft, 2026-11-05)

Status: DRAFT for owner review. No score on the site has changed. Data: v3.1 fields collected for 51 providers on 2026-11-05 (reports/verification/<slug>.md, section "v3.1 fields 2026-11-05"); scores from `node scripts/rescore.mjs`; full table with per-criterion sub-scores in `reports/rescore-v3.1.csv`. Travel Rule providers (6) stay on v3.0.

## Summary

- Average score falls from 4.38 to 3.45. 4 providers go up, 2 stay level, 45 go down.
- The main drivers: Pricing (20%) gives 2 to every quote-only vendor; Fraud defense gives 2 to 2.5 where no lab letter is public; Platform breadth punishes specialists.
- 47 of 51 providers have every criterion scored. Not scored: coverage for Veridas, Paravision, VerifyMy, Verified; fraud defense for VerifyMy and Verified (no liveness product found).

## Identity family

| Provider | v3.0 | v3.1 | Change | v3.1 if quote-only pricing is not scored |
|---|---|---|---|---|
| shufti-pro | 4.6 | 4.9 | 0.3 | 4.9 |
| sumsub | 4.8 | 4.8 | 0.0 | 4.8 |
| veriff | 4.6 | 4.3 | -0.3 | 4.3 |
| complycube | 4.3 | 3.9 | -0.4 | 3.9 |
| zyphe | 4 | 3.9 | -0.1 | 3.9 |
| idenfy | 4.5 | 3.7 | -0.8 | 3.7 |
| incode | 4.7 | 3.7 | -1.0 | 4.1 |
| jumio | 4.5 | 3.7 | -0.8 | 4.1 |
| persona | 4.6 | 3.7 | -0.9 | 3.7 |
| veridas | 4.6 | 3.7 | -0.9 | 4.3 |
| advance-ai | 4.3 | 3.5 | -0.8 | 3.9 |
| regula | 4.6 | 3.5 | -1.1 | 3.8 |
| vespia | 4.4 | 3.5 | -0.9 | 3.5 |
| onfido | 4.5 | 3.4 | -1.1 | 3.7 |
| signicat | 4.6 | 3.3 | -1.3 | 3.7 |
| gbg | 4.5 | 3.2 | -1.3 | 3.5 |
| enigma | 4.4 | 3.1 | -1.3 | 3.1 |
| au10tix | 4.5 | 3 | -1.5 | 3 |
| idnow | 4.5 | 3 | -1.5 | 3.3 |
| fullcircl | 4.4 | 2.9 | -1.5 | 3.1 |
| trulioo | 4.5 | 2.8 | -1.7 | 2.9 |
| fourthline | 4.5 | 2.7 | -1.8 | 2.8 |
| aiprise | 4.4 | 2.6 | -1.8 | 2.8 |
| signzy | 4.4 | 2.6 | -1.8 | 2.8 |
| verifymy | 4.4 | 2.5 | -1.9 | 2.8 |
| paravision | 3.9 | 2.4 | -1.5 | 2.5 |
| idmerit | 3.8 | 2.3 | -1.5 | 2.3 |
| verified | 4.5 | 2 | -2.5 | 2.1 |

## AML family

| Provider | v3.0 | v3.1 | Change | v3.1 if quote-only pricing is not scored |
|---|---|---|---|---|
| seon | 4.5 | 4.6 | 0.1 | 4.6 |
| namescan | 4.3 | 4.4 | 0.1 | 4.4 |
| complead | 4 | 4.3 | 0.3 | 4.3 |
| complyadvantage | 4.6 | 4.2 | -0.4 | 4.2 |
| amlwatcher | 4.1 | 4.1 | 0.0 | 4.6 |
| kycaid | 4.6 | 4.1 | -0.5 | 4.1 |
| sanction-scanner | 4.3 | 4.1 | -0.2 | 4.1 |
| castellum-ai | 4.5 | 3.8 | -0.7 | 4.2 |
| membercheck | 4.3 | 3.8 | -0.5 | 4.3 |
| sardine | 4.5 | 3.8 | -0.7 | 4.2 |
| smartsearch | 4.4 | 3.8 | -0.6 | 4.3 |
| hawkai | 4.6 | 3.6 | -1.0 | 4 |
| kychub | 4.5 | 3.6 | -0.9 | 4 |
| strise | 4.4 | 3.6 | -0.8 | 4 |
| kyc360 | 4.5 | 3.5 | -1.0 | 3.5 |
| napier | 4.5 | 3.5 | -1.0 | 3.8 |
| unit21 | 4.6 | 3.5 | -1.1 | 3.9 |
| relycomply | 3.4 | 3.4 | 0.0 | 3.8 |
| nice-actimize | 4.6 | 3.3 | -1.3 | 3.6 |
| feedzai | 4.6 | 2.9 | -1.7 | 3.1 |
| horuscheck | 3.2 | 2.8 | -0.4 | 2.9 |
| quantexa | 4.6 | 2.5 | -2.1 | 2.6 |
| amlranger | 3.3 | 2.3 | -1.0 | 2.3 |

## Calibration decisions for the owner

1. **Quote-only pricing.** Now 2 for every vendor without a published price (the absence of a price is a known fact). Alternative: not scored, weight shared out (last column). With 2, a vendor with Vendr data and one without score the same.
2. **Coverage cliff.** 195 countries scores 3, 200 scores 3.5 to 5. Proposal: 180+ countries counts as global.
3. **Platform breadth for specialists.** Regula (2 of 8), Paravision, Enigma, Quantexa lose most here. Options: score breadth only against the modules of their primary category, or keep it and let category pages show the trade-off.
4. **Rubric fit.** Quantexa (entity resolution layer), Verified (Nordic eID and AML), VerifyMy (age assurance), Paravision (face biometrics engine) fit neither family well. Options: a specialist rubric, or keep their v3.0 score marked "not yet re-scored".
5. **Grades.** Grade bands (Excellent 4.8, Great 4.6 to 4.7, Very Good 4.4 to 4.5 ...) were set for the v3.0 spread. After the re-score most providers would fall to Good or Fair; the bands need resetting with the scores.
6. **Data gaps in identity breadth.** `ongoing_monitoring` and KYB keys were not collected for every identity provider (e.g. Fourthline offers AML monitoring and re-KYC), so breadth may undercount. One more pass fixes this before any score ships.
7. **Incidents counted (-1 trust):** Sumsub (Feb 2026), Veriff (Nov 2025), IDMERIT (Feb 2026, disputed), Signzy (Dec 2024), Persona (Feb 2026, Persona says test environment, no personal data: confirm it counts), RelyComply (Sep 2026).

## Content fixes found (separate from scores)

- feedzai 4.6->3.1: enterprise, almost no public data
- amlranger 3.3->2.3: site unreadable to WebFetch; owner browser check
- hawkai 4.6->3.6: pricing 2 from AWS Marketplace private-offer listing stored as third_party (rule question)
- horuscheck: ownership unknown, no legal entity
- kyc360 4.5->3.5: acquired by Experian (Oct 2025)
- kycaid 4.6->4.1: Companies House change of controlling person at Compligate 12 Nov 2025; pro "24/7 chat, 15-minute SLA" outdated (24/7 priority only Enterprise)
- kychub: docs script-rendered; operator entity not confirmed
- membercheck: con "no published hosting region" now contradicted (regional instances Oceania, Europe, SE Asia, GCC)
- sardine 4.5->4.2; docs and sandbox via representative (no)
- seon 4.5->4.6; trial:false (trial requests reviewed) owner call
- unit21 4.6->3.9; docs behind login
- trust centres sardine/seon not read
- pricing.model.minimum null for quote-only (fine, scorer ignores)
- namescan 4.3->4.4; ownership unknown (Neurocom/Nexiant link)
- napier 4.5->3.8; Marlin 2025 changed_disclosed
- nice-actimize 4.6->3.6; sale pending (Brookfield), no deal by 4 Nov 2026
- quantexa 4.6->2.6; entity-resolution layer, rubric fit poor; docs blocked -> manual review
- relycomply 3.4->3.8 despite incident; notice updated 2 Nov 2026: forensic investigation ended 1 Oct, data removal confirmed -> prose update needed
- sanction-scanner 4.3->4.1
- veridas 4.6->3.7; Fourthline+Veridas merger CLOSED 3 Nov 2026 (fourthline.com/news/fourthline-and-veridas-complete-merger); both records say pending -> update; news candidate
- veriff 4.6->4.3; INCIDENT: Total Wireless breach notice 9 Jan 2026 (mass.gov) data from Veriff systems; class actions; review lacks it
- verified 4.5->2.1 (40% scored; AML/Nordic eID product, rubric fit)
- verifymy 4.4->2.8 (40% scored); PSC change 9 Sep 2025 Ryan Shaw -> Gethin Taylor, no announcement
- vespia 4.4->3.5; absorbed into Veriff (Feb 2026)
- zyphe 4.0->3.9
- SCORER FIXES: accept "Incorporated" fact; count PAD certs without "Level N" (LSTI ISO/IEC 30107 PAD, idnow); third_party price items that say "no price" should not give 2 (paravision); hawkai AWS listing
- gbg 4.5->3.3; idenfy 4.5->3.7 (doc count conflict 3,500 vs 16,000, recorded 3,500)
- idmerit 3.8->2.3; INCIDENT 2026-02-20 Cybernews unsecured DB ~1B records linked to IDMERIT, disputed; review lacks it
- idnow 4.5->2.9; incode 4.7->4.1 (BIPA $4m settlement 2024 not counted); onfido 4.5->3.4; paravision 3.9->2.4
- advance-ai 4.3->3.9; aiprise 4.4->2.6; au10tix 4.5->3.0 (credential exposure Jun 2024, owner decide); complycube 4.3->3.9 (250+ vs 220+); enigma 4.4->3.1; fourthline 4.5->2.8; fullcircl 4.4->3.1
- persona 4.6->3.7; INCIDENT? Feb 2026 frontend code exposed on government-authorized server (Biometric Update 23 Feb 2026), Persona: test env, no PII -> owner confirm
- regula 4.6->3.8; 17,000+ templates vs record 16,500+
- shufti-pro 4.6->4.9
- signicat 4.6->3.7; countries 181 from ReadID only
- signzy 4.4->2.8; INCIDENT Dec 2024 (Inc42 3 Dec 2024) security incident
- trulioo 4.5->2.8; claims iBeta L2 + NIST FATE top-5 on own page; not on iBeta list -> check

