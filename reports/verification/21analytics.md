# 21 Analytics: new review 2026-10-19

New record `src/_data/providers/21analytics.yml`, written at the vendor's request. Score 4.0 (Good), weighted from the six rubric criteria in `score_breakdown`. `link.type: none`. Categories: `travel-rule` only (no customer KYC or wallet screening of its own, so `crypto` does not fit).

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 3.8 |
| Coverage | 20 | 4.3 |
| Pricing transparency | 20 | 3.6 |
| Integration & API depth | 15 | 4.3 |
| Support responsiveness | 10 | 3.8 |
| Track record | 10 | 4.2 |
| **Weighted** | | **3.975, rounds to 4.0** |

## Checked (pages opened)

- Vendor: homepage (1), pricing (2), TRUST page (3), company (4), TRUST partnership release (6), TRP and TRISA bridge post (14), release notes (18), 8.1.0 post (19), self-hosted wallet verification (20), products overview (21), data security (22), Travel Rule regulations (23), success stories (24), 2025 recap (25), AOPP history (26), ISO blog (27), press page (39).
- Docs: reference deployment 8.3.0 (15), software architecture 7.1.0 (16), security 8.3.0 (17).
- TRUST and competitors: Coinbase TRUST page (5), Crypto Briefing (7), FX News Group on TRUSThub (8), Notabene TRUST analysis (9) and protocol overview (10), Sumsub Travel Rule FAQ (11), VerifyVASP acquires Sygna (12), Coincub 2026 tool comparison (13).
- Company: graph.swiss register extract (29), Moneyhouse person roles (30), Moneycab Aug 2020 (31), AML Incubator release (32), Trezor AOPP decision (33), Scytale case study (28).
- Ratings and third-party prices: G2 (34), Capterra UK (35).
- Regulation: EUR-Lex 2023/1113 (36, metadata only), FATF seventh targeted update (37), Regulation Tomorrow (38).
- Not opened: the EIN Presswire copy of the TRUST release (HTTP 429 from the fetch proxy, which said not to retry); trust centre compliance.21analytics.co (renders by script, empty to the fetcher); the main docs index (script rendered); Azure Marketplace listing (not found).
- Searched for funding, acquisitions, breaches, regulatory actions, litigation: none found.

## The TRUST claim

Claim: "We have the strongest network by being the only Travel Rule solution with a built-in TRUST network access."

| Part | Status | Evidence |
|---|---|---|
| What TRUST is | Confirmed | Coinbase page titled "Travel Rule Universal Solution Technology": built by a coalition of VASPs, Coinbase "plays a leading role in operating the TRUST network", members vote, members must meet AML, security and privacy requirements (Exiger assists), costs split between members, free option for smaller VASPs (5). Notabene: "TRUST is operated by Coinbase", closed, membership-only (9). Crypto Briefing, 28 May 2026: over 195 participating VASPs (7). |
| 21 Analytics integrates TRUST | Confirmed | Built in since 21 Travel Rule 8.1.0 (30/31 Mar 2026) (18, 19); `trustd` service and TRUST ports in the 8.3.0 reference deployment (15); partnership release 28 May 2026 with a Coinbase TRUST manager quoted (6); TRUST page lists 21 Analytics (5). Works only after the VASP itself passes TRUST due diligence (3). |
| "Only" built-in TRUST access | Confirmed as of Oct 2026, with a caveat | The TRUST page's "Interoperability Partners" section lists 21 Analytics only and says members "may also use TRUST via our partnership with 21 Analytics to connect to other protocols" and that TRUST "is actively working on expanding its integrations" (5). Notabene says it "cannot connect directly" because Coinbase does not let outside vendors interact with TRUST; it relays TRUST transfers by webhook only for customers that are TRUST members (9). Sumsub lists Sumsub protocol, GTR, TRP, CODE, Sygna Bridge, no TRUST (11). No TRUST link found for VerifyVASP, Sygna (now owned by VerifyVASP), TRISA or Shyft Veriscope (10, 12, 13). CipherTrace TRP not checked (no current source). Caveat: TRUSThub lets any VASP, member or not, exchange data with TRUST members (5, 8), so other vendors' customers can still reach TRUST members. "Only" holds for built-in vendor access, and may change as TRUST adds integrations. |
| "Strongest network" | Vendor-stated, not verified | No public network-size comparison. The vendor's own counterparty figures conflict: "6 of the top 6" (homepage), "8 of the top 10" (TRUST page), "top 8" (8.1.0 post), all citing Kaiko rankings we did not open. |

Separate superlatives on the vendor's own site, not used in the record: "The only Travel Rule solution that guarantees GDPR-compliance"; "21 Analytics' prices can't be matched"; AOPP "100% accuracy".

## Key facts

| Item | Finding |
|---|---|
| Legal entity | 21 Analytics AG, UID CHE-204.325.525, Poststrasse 22, 6300 Zug; registered 8 Jun 2018 as 21 Lectures AG (register mirror) |
| Founded | 2020 per vendor (Travel Rule business) |
| Leadership | Filip Gospodinov CEO, Lucas Betschart COO and board chair (also OpenVASP board), Dominik Spicher CTO |
| Funding | Not disclosed |
| Deployment | Self-hosted on own hardware or cloud: Podman, Helm on Kubernetes or OpenShift, PostgreSQL, Keycloak; licensed private registry; "zero telemetry" (vendor). Managed service via AML Incubator since Oct 2025. |
| Protocols | TRUST and TRP native; TRISA via the TRP bridge; encrypted email fallback. No GTR, CODE, Sygna, VerifyVASP or TAP found. |
| Wallet proofs | AOPP, signed message, Satoshi test, visual proof; AOPP in 540+ wallets (vendor). Trezor removed AOPP in Jan 2022. |
| Pricing | No prices on the vendor page; Essentials and Enterprise, flat fee, unlimited transactions and users. Starter CHF 900/month on G2 and Capterra (Azure Marketplace only, 5,000 transfers a month per Capterra). |
| Certifications | ISO/IEC 27001:2022 vendor-stated, no certificate published. No SOC 2. |
| Customers | Case studies: Tangany, Xerof, Relai. Logo wall unlabelled. |
| User ratings | G2 and Capterra: no reviews |
| Regulatory | EU TFR 2023/1113 in force from 30 Dec 2024; FATF seventh targeted update 16 Jul 2026 |

## Suggested ranking card (`travel-rule`)

Position: **1**. The current list has five entries and all have `slug: null` (unreviewed), including an old 21 Analytics entry at position 5. Reviewed entries go before unreviewed ones, so the 21 Analytics entry should get `slug: 21analytics`, move to the top, and the other four keep their order behind it. Its `legacy_rating_shown: 4.8` is far above the new score of 4.0; the card should take the rating from the record.

```yaml
  - slug: 21analytics
    name: 21 Analytics
    award: Best for Self-Hosted Deployments
    tagline: Self-hosted Travel Rule software with built-in TRUST and TRP connectivity and four ways to prove self-hosted wallet ownership.
    coverage: Global, strong in Switzerland and the EU
    size: Mid-market to Enterprise
    pros:
    - Built-in TRUST connectivity; TRUST lists 21 Analytics as its only interoperability partner
    - Runs in your own infrastructure, and 21 Analytics says it cannot see customer data
    - Four self-hosted wallet proofs, including AOPP
    cons:
    - No prices on the vendor's page; CHF 900 a month Starter figure only from G2 and Capterra
    - ISO/IEC 27001 is vendor-stated with no certificate published, and there is no SOC 2 report
    - You install, patch and back up the software yourself
    legacy_price_shown: On request
    legacy_rating_shown: null
    segments: []
```

Award: "Best for Self-Hosted Deployments" is already this entry's award and duplicates none of the others (Editor's Choice, Best for High-Volume Exchanges, Best APAC Coverage, Best Open Protocol). Alternative if the editor wants the TRUST angle: "Best for TRUST Access". `size` is an editorial judgement from the Starter, Essentials and Enterprise tiers and bank logos; set `null` if you prefer.

Problems in the current card:
- Pro "Enterprise-grade security through on-premises hosting" is puffery; replace as above.
- Con "it is not a hosted SaaS": mostly true, but a managed option exists through AML Incubator and Capterra lists a Starter plan on the Azure Marketplace.
- Con "Built for established operations rather than early-stage startups": no source; replace as above.
- `legacy_rating_shown: 4.8` conflicts with the reviewed score 4.0.

Other entries in the same list (report only, not edited):
- Sygna Bridge: VerifyVASP announced the acquisition of Sygna on 29 Apr 2026 (12). Sygna Bridge and VerifyVASP are now one owner; the editor may want to merge or relabel the two cards.
- Notabene con says Notabene "does not connect to TRP, OpenVASP or Shyft"; its own protocol page says it aims to "integrate all live protocols" (10). Re-check before the Notabene card is reviewed.
- `categories/travel-rule.yml` `quick_answer` puts Notabene first; once 21 Analytics is the only reviewed entry, the quick answer and "5 providers compared" stats will need a refresh.

## Score flag

None for this record. The score is new (4.0). The vendor's self-reported 4.8 on the old ranking card was never a reviewed score.

## Could not confirm

- ISO/IEC 27001:2022 certificate (number, body, scope, validity); trust centre unreadable.
- "Strongest network"; the Kaiko exchange-ranking figures.
- Whether CipherTrace TRP still operates or links to TRUST.
- Funding; team size.
- The Azure Marketplace Starter listing itself (seen only through G2 and Capterra).
- Who hosts the software under the AML Incubator managed service.
- Customer status of the homepage logo wall (Vontobel, Luzerner Kantonalbank and others).

## Update 2026-10-20: feedback from 21 Analytics

21 Analytics replied by email to the published review. What changed:

| Point | Their feedback | Change in the record |
|---|---|---|
| ISO/IEC 27001 | Certificate downloadable from the Compliance Centre (compliance.21analytics.co, reports and documents), linked on the homepage. DORA and NIS2 readiness, ICT risk statement, ISO 20243 and ISO 27034 verification reports there under NDA | Wording now says where the certificate is. The page renders by script and was empty to our fetcher, so the status stays `vendor_stated` until we see certificate number, body and scope. Compliance score unchanged (3.8) for now |
| User reviews | SourceForge is their review platform | `user_ratings`: SourceForge 5.0 from 1 review (posted 13 Oct 2026). Support score unchanged |
| Sygna and VerifyVASP | Same entity since the acquisition | Wording merged in coverage note and FAQ |
| Sandbox | Prospects get one on request; docs to be updated | Vendor-stated in the integration note; integration 4.3 to 4.4 |
| Trezor and AOPP | Open AOPP dropped by Trezor, but their software supports Trezor, Ledger, Jade, TRONLink and 540+ wallets through direct integrations | Clarified in what_is, features and FAQ; removed from the track record note |
| Pricing transparency | Enterprise B2B vendors don't publish prices; price list sent privately | Rubric unchanged: the criterion scores public prices, and other Travel Rule vendors (Sumsub, TRP) publish theirs. The private price list is not used in the record or this report |

Not recorded because 21 Analytics said it is not public yet: planned network bridges.

Weighted score: 3.8×0.25 + 4.3×0.20 + 3.6×0.20 + 4.4×0.15 + 3.8×0.10 + 4.2×0.10 = 3.99, rounds to **4.0** (unchanged).

## Update 2026-10-20 (2): ISO/IEC 27001 confirmed

The editor downloaded the certificate from the Compliance Centre (public "Download" button; most other documents there are "Request Access").

| Field | Certificate |
|---|---|
| Body | InterCert (InterCert Inc., The Woodlands, Texas); SCC and IAF marks |
| Holder | 21 Analytics AG, Poststrasse 22, 6300 Zug |
| Standard | ISO/IEC 27001:2022, SoA version 1.0 |
| Scope | ISMS covering business processes, infrastructure and data for development, operation and maintenance of its compliance software |
| Dates | Initial certification and issue 24 Apr 2026; surveillance validity 23 Apr 2027; recertification 23 Apr 2029 |
| Registration | IC-IS-2604284 (not checked in InterCert's lookup form, which renders by script) |

Accreditation: the SCC directory lists InterCert Inc. as accredited (file 8070, valid to 25 Feb 2030), and the SCC scope of accreditation (v7, 12 Nov 2024) covers ISO/IEC 27001:2013 and 27001:2022.

Certification status `vendor_stated` → `confirmed`. Compliance 3.8 → 4.3, the same as AML Watcher (confirmed ISO/IEC 27001 only, no SOC 2).

Weighted: 4.3×0.25 + 4.3×0.20 + 3.6×0.20 + 4.4×0.15 + 3.8×0.10 + 4.2×0.10 = 4.115, rounds to **4.1** (Good). Travel Rule rank unchanged (1st).
