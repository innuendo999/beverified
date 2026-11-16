# WIDTH: new review 2026-11-16

New record `src/_data/providers/width.yml` (slug `width`), Travel Rule page https://www.width.com/travel-rule. Suggested by 21 Analytics, a partner ranked in Travel Rule; the suggestion had no influence on the review or the score. `link.type: none`. Categories: `travel-rule` only. Not in `src/_data/providers/` under another slug (no Cynopsis record) and not in `tracked.yml`.

Score **3.4 (Good)**, Travel Rule rubric v3.0 (`site.json` → `v3.rubricTravel`):

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 3.6 |
| Coverage | 20 | 3.5 |
| Pricing transparency | 20 | 3.3 |
| Integration & API depth | 15 | 3.1 |
| Support responsiveness | 10 | 3.3 |
| Track record | 10 | 3.5 |
| **Weighted** | | **3.405, rounds to 3.4** |

Ranking: **#8 of 9** in `travel-rule`, after Ospree (3.5) and above Block Infrastructure (3.0). It does not rank above any provider with a higher or equal score; Block Infrastructure moves from #8 to #9.

## Checked (pages opened 16 Nov 2026)

- Vendor: Travel Rule (1), Pricing (2), Security (3), About (4), Media kit (5), Privacy policy (6), Demo (7), Digital assets (8), KYT (9), homepage (10), launch blog post of 10 Apr 2026 (11).
- Predecessor: Cynopsis Solutions About page (12).
- Registers (ACRA open data mirrors): WIDTH Pte. Ltd. on sgpdirectory.com (13); Cynopsis Solutions Pte. Ltd. on RecordOwl (14). BizFile+ not opened; companieshouse.sg and scam.sg mirrors failed to load.
- DART: width.info (15), API reference (16), product manual v1.3 (17).
- Press: Fintech News Singapore, 19 Oct 2026 (18); FinTech Global, 25 May 2026 (19); Regula release, 25 Aug 2026 (20).
- Counterparty side: Sygna Alliance member page (21), OpenVASP TRP page (22).
- Ratings: Capterra India listing for Cynopsis Artemis (23).
- Not read: G2 (refuses the fetcher), WIDTH terms of service (not found), any Notabene or Veriscope member list (no public list found; searches found no WIDTH announcement).
- Searched for breaches, regulatory actions and litigation: none found.

## Claims and evidence

| Claim | Status | Evidence |
|---|---|---|
| Travel Rule over TRP, Sygna Bridge, Notabene, Veriscope, OpenVASP and direct VASP to VASP, per-counterparty fallback | Vendor-stated, not confirmed by any network | Travel Rule FAQ (1). Sygna Alliance page lists 39 members, no WIDTH or Cynopsis (21). OpenVASP TRP page names 21 Analytics, Blockchain Intelligence Group and Ospree only (22). No Notabene or Veriscope announcement found. Sygna Bridge now belongs to VerifyVASP; WIDTH does not mention VerifyVASP. TRP and OpenVASP listed as separate items, versions not stated. |
| TRUST, TRISA, GTR, CODE | Not named by WIDTH | (1) |
| IVMS101 v1.1, natural and legal persons, kanji name lines | Vendor-stated | (1) |
| Directory on GLEIF + MAS, HKSFC, FCA, FINMA, JFSA registers; LEI + key pinning | Vendor-stated | (1) |
| Self-hosted wallets: self-declaration, Satoshi test or signature where required, risk screening | Vendor-stated; no chain or wallet list | (1) |
| 85+ Travel Rule jurisdictions | Vendor-stated; differs from "500+ institutions across 180 jurisdictions" on the same page | (1) |
| Deployment | Hosted (multi-region active-passive, data in Singapore, EU or UAE); accounts set up by WIDTH; no self-hosted option found | (3), (15) |
| API docs | DART screening only (Chainalysis screening endpoints, rulesets); no Travel Rule endpoints, SDK or changelog | (16), (17) |
| Sandbox | Sandbox VASP in the demo, 14-day sandbox after; under 8 weeks to production | (1), (7) |
| ISO/IEC 27001:2022 | Vendor-stated; certificate under NDA, body not named, no register entry | (3) |
| ISO/IEC 27701 | Conflicting: "in progress" (3, 7), "certified" (10), "achieved" (18) | listed as vendor-stated, in progress |
| SOC 2 | No claim | (3) |
| Pricing | Travel Rule quoted after demo (7). Growth $1,499/yr, Pro $2,499/yr, Enterprise custom, full KYC $0.50 promotional to 31 Dec 2026 (2). No plan says it includes Travel Rule. | `pricing.index_exclude` set |
| Legal entity | WIDTH Pte. Ltd., UEN 202603234K, registered 21 Jan 2026, live, 1 Raffles Place #50-00 | (13); privacy policy names it controller (6) |
| Founded | 2014 as Cynopsis Solutions; Cynopsis Solutions Pte. Ltd., UEN 201407340G, registered 14 Mar 2014, still live | (14), (4), (12) |
| Owner | Vernal Capital bought Cynopsis in Oct 2025, per WIDTH; no terms | (11), (5) |
| Leadership | Chionh Chye Kit CEO, Du Jun Founder and Chairman, Zhu Huaiyu CTO, Yi Binghan CFO, Johnny Bi CRO | (4); Cynopsis page names Avere Hill as CRO (12) |
| Customers | Logos only (FAB, NETS, MSIG, Moomoo, Syfe, Green Link Digital Bank); none tied to Travel Rule | (1), (8) |
| User ratings | Capterra India: 0 reviews for Cynopsis Artemis; G2 not readable | (23) |

## Not used as facts

500+ customers, 180 jurisdictions, 100+ integrations, "10x faster onboarding", "95% fewer false positives", "100% audit completeness", KYC "in under 30 seconds", latency figures, "Wolfsberg AML Principles §5" compliance claim, awards, FIPS HSM claim. Context kept out of copy: Renaissance Capital names Jun Du and Binghan Yi as CEO/Chairman and CFO of Vernal Capital Acquisition Corp. (a SPAC); the link between that SPAC, Vernal Group and the Vernal Capital that bought Cynopsis is not confirmed.

## Ranking card (`travel-rule`)

Added at #8 with `award: null` (proposed: "Best for an All-in-One Compliance Platform"), `legacy_price_shown: On request`, `size: Banks, payment firms and VASPs (vendor-stated)`.

## Other changes

- `src/_data/travelRuleFit.yml`: deployment reading for `width` (hosted, no self-hosted option found); `other_networks_skip` keeps the TRP, Sygna and Notabene rows from being overwritten by "Other networks".
- `src/_data/categories/travel-rule.yml`: SEO description lists WIDTH; quick answer count 8 → 9 (`quick-answers.mjs` passes). The page has no capability matrix (`capability_columns: []`), so nothing else to update.
- Logo: wordmark supplied by the owner on 16 Nov 2026 (`src/assets/img/wordmarks/width.png`, tagline cropped, white made transparent) and a square tile with the W (`src/assets/img/logos/width.png`); `logoTiles.json` regenerated.

## Suggestions for the owner (not done)

- Other rankings: WIDTH sells KYC with passive liveness, KYB, sanctions/PEP/adverse media screening, KYT with Chainalysis, Elliptic and TRM Labs data, and transaction monitoring. It could be considered for `crypto`, `aml` and possibly `cheap-kyc` (published $0.50 KYC rate, but promotional and credit-based). Each needs its own data pass.
- Pricing Index: excluded for now; add only if the owner wants the promotional KYC rate there.

## Score flag

Main risks to the score: a confirmed network listing (would raise Coverage), a certificate on a register (would raise Compliance), or a published Travel Rule price. Re-check in 90 days or when WIDTH publishes Travel Rule docs.
