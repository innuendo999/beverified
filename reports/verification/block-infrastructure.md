# Block Infrastructure (BlockTravel): new review 2026-11-11

New record `src/_data/providers/block-infrastructure.yml`. Proposed score **3.0**, grade Good (v3.1 bands: Good 3.0 to 3.4), weighted from the six Travel Rule rubric criteria (`site.json` → `v3.rubricTravel`, v3.0) in `score_breakdown`. `link.type: none`, `link.url` = the BlockTravel page. Categories: `travel-rule` only. Block Infrastructure was suggested by 21 Analytics, a partner that is itself ranked in Travel Rule; that had no influence on the review or the score. It was not in `src/_data/providers/` under another slug and not in `src/_data/tracked.yml`.

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 3.3 |
| Coverage | 20 | 3.2 |
| Pricing transparency | 20 | 2.8 |
| Integration & API depth | 15 | 3.0 |
| Support responsiveness | 10 | 2.8 |
| Track record | 10 | 2.6 |
| **Weighted** | | **3.015, rounds to 3.0** |

Calibration against the other reviewed Travel Rule records:

- Compliance 3.3 equals TRP (3.3, no entity and no certification named) and sits below Ospree (3.4, entity named, vendor-stated Cyber Essentials). Block Infrastructure's entity is confirmed at Companies House, which TRP's is not, but it claims no certification of any kind and its privacy policy did not load.
- Coverage 3.2 is the lowest in the list: TRP and TRISA are vendor-stated only (Ospree 3.9 has TRISA confirmed by TRISA), five more networks are intentions, and no self-hosted wallet method is described.
- Pricing 2.8 is below Ospree (3.2, three named tiers, no figures): BlockTravel has no plans at all, only design partner terms.
- Integration 3.0 is below Ospree (4.0, public OpenAPI docs): the API is described on the product page, but there is no public reference and the sandbox is for design partners.
- Support 2.8 is below Ospree (3.3): no channels, hours or response times, only a contact form and info@ address.
- Track record 2.6 is the lowest in the list: registered October 2024, not on general release, no named customers, a discontinued strike-off notice in January 2026 and an overdue confirmation statement on the check date.

## Checked (pages opened, 11 Nov 2026)

- **Vendor site:** BlockTravel (1, also a targeted read for protocol, wallet, certification and pricing terms), homepage (2), products (3), about (4), team (5), contact (6), news (7), Network Compliance Oracle (8), BlockID (9). `/products/blockpay/` returned the products overview with no BlockPay content.
- **Register:** Companies House overview (10), officers (11), filing history (12).
- **Press:** Financial IT, 19 May 2026 (13); TechBullion, 21 May 2026, labelled partner content (14).
- **Third parties checked, not used as sources:** Capterra BlockID listing 266248 (a 1Kosmos product, unrelated, 0 reviews).
- **Not opened** (the fetch tool needed a permission nobody could grant in this unattended run): the brand-assets logo SVG, privacy policy (`/legal/privacy/` returned a client error), Companies House PSC page, OpenVASP TRP page, Finopotamus, Let Fintech Grow profile.
- **Searched** for funding, FCA status, TRISA or OpenVASP listings, G2 or Capterra pages, breaches, regulatory actions and litigation: none found.

## Networks and protocols

| Network | Status | Evidence |
|---|---|---|
| OpenVASP TRP | Vendor-stated live, sender and receiver | "OpenVASP TRP and TRISA are the protocols we operate today, on both the sending and receiving side" (1). No OpenVASP listing checked (page not opened) |
| TRISA | Vendor-stated live, sender and receiver | Same sentence (1). No TRISA or travelrule.io listing found by search |
| Sygna Bridge, Notabene, VerifyVASP, CODE, Veriscope | Intention, not live | "the same adapter model extends to Sygna..."; "BlockTravel is built to speak to each of them through the same API" (1) |
| TRUST, GTR, own network | Not found | No mention (1) |
| Canton Network | Settlement layer, not a Travel Rule network | Simulated transfer on Canton DevNet, May 2026 (13, 14); protocols in the demo not named |

## Self-hosted wallets

No method described. The BlockTravel page has no mention of self-hosted or unhosted wallets, signatures, Satoshi tests or AOPP (1).

## Key facts

| Item | Finding |
|---|---|
| Legal entity | Block Infrastructure Ltd, private limited company, number 16030386, active (10) |
| Registered office | C/O Ajn Accountants, 1 Empire Mews, London SW16 2BF since 3 Nov 2026; before that 71-75 Shelton Street, Covent Garden, London WC2H 9JQ (10, 12) |
| Founded | Incorporated 21 Oct 2024, GBP 100 capital (10, 12) |
| Officers | Directors Richard Frederick Beverley (also secretary), Suhumar Karur, Joshan Mahmud, Kurtis Wright, all from 21 Oct 2024 (11) |
| Leadership (vendor) | Richard Beverley co-founder and CEO, Kurtis Wright co-founder and COO, Joshan Mahmud co-founder and CTO, "Suhu" co-founder and Chief Data Officer; partners Jakob (Europe) and Nikolaj Klein (Nordics); Anthony Ralphs compliance and advisory lead (5) |
| Owner | Filing history shows Richard Beverley as a person with significant control (PSC04, 20 Oct 2026) (12); PSC page not opened |
| Register events | First Gazette notice for compulsory strike-off 6 Jan 2026; confirmation statement for 20 Oct 2025 filed 13 Jan 2026; strike-off discontinued 14 Jan 2026; accounts to 31 Oct 2025 filed 20 Oct 2026; next confirmation statement due 3 Nov 2026, shown overdue on 11 Nov 2026 (10, 12) |
| Funding | Not disclosed; "seed stage" (4) |
| Availability | Design partner stage; "public availability later in 2026" (2, 3) |
| Deployment | API-first with sandbox; hosting and data location not stated (1) |
| Products | BlockTravel; BlockID (reusable KYC and KYB network for banks, design partner stage) (3, 9) |
| Pricing | Not published; design partners get "preferential commercial terms" later (1, 3) |
| Certifications | None claimed; frameworks listed (FATF, MiCA, FCA, MAS, GDPR, DABA) are customer rules, not vendor audits (2, 4) |
| Regulatory status | No licence or registration claimed (4) |
| Customers | None named; "a small group of regulated institutions and digital asset firms" (2, 13) |
| User ratings | None found |

## Ranking card (`travel-rule`)

Added at position **7**, after Ospree (3.5). It does **not** rank above any existing provider. Order: 21 Analytics 4.1, Notabene 4.0, CryptoSwift 3.9, VerifyVASP 3.8, TRP 3.7, Ospree 3.5, Block Infrastructure 3.0.

`award: null` for the owner to decide (proposed: "Best for Pre-Settlement Screening").

## Category page

`src/_data/categories/travel-rule.yml`: quick answer "We compared 6 providers" → 7 (checked by `quick-answers.mjs`), SEO description lists Block Infrastructure, `updated` 2026-11-11. No capability matrix (`capability_columns: []`), so nothing else to regenerate. `legacy_stats` still says 6 but is not rendered.

## Open for the owner

- **Eligibility:** BlockTravel is not on general release. The KYA rubric ranks only GA or open beta; Travel Rule has no written rule. Options: keep it ranked at #7, or hold it as "Review coming" until public availability.
- **Sponsored card:** the 21 Analytics review placement targets the whole `travel-rule` category, so it now also shows on this review (6 reviews, not the 5 agreed).
- **Logo:** supply one (site file `/brand-assets/01-logo/lockup-horizontal.svg` could not be fetched).
- **Other rankings:** crypto KYC not suggested (no customer KYC in BlockTravel; BlockID is separate and pre-release). Possible later: a reusable KYC / KYB listing for BlockID once it is available.

## Score flag

Re-check at public availability (planned later in 2026): published prices, docs, a third-party listing for TRP or TRISA, or a certification would each move the score.
