# CryptoSwift: new review 2026-10-30

New record `src/_data/providers/cryptoswift.yml`. Score 3.9 (Good), weighted from the six rubric criteria in `score_breakdown`. `link.type: none`. Categories: `travel-rule` only. CryptoSwift was suggested by 21 Analytics, a partner that is itself ranked in Travel Rule; that had no influence on the review or the score.

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 3.8 |
| Coverage | 20 | 4.0 |
| Pricing transparency | 20 | 4.4 |
| Integration & API depth | 15 | 4.2 |
| Support responsiveness | 10 | 3.5 |
| Track record | 10 | 3.3 |
| **Weighted** | | **3.94, rounds to 3.9** |

Calibration against the other reviewed Travel Rule records:

- Compliance 3.8 sits between TRP (3.3, no entity or certification named) and VerifyVASP (3.9, SOC 2 Type II and ISO/IEC 27001 both vendor-stated). CryptoSwift names its entity, registry code and LEI, but its only certification claim is ISO/IEC 27001:2022 with no certificate seen.
- Coverage 4.0 is below VerifyVASP (4.1, a large APAC network plus CODE) and 21 Analytics (4.3, TRUST and TRP confirmed). The CODE link is confirmed by CODE's own homepage. The Notabene link is incoming only, and CryptoSwift states it. The 2,500+ reachable VASPs figure is vendor-stated.
- Pricing 4.4 equals TRP. Both publish real prices with one gap: the meaning of a credit here, the protocol message price at TRP.

## Checked (pages opened, 30 Oct 2026)

- **Vendor:** homepage (1), pricing (2), about (3), product (4), self-hosted wallet verification (5), partners (6), September 2025 product update (9), vendor considerations post (10), terms (12), privacy policy (13), Januar case study (14), Striga case study (15), optional verification steps post (24), complete guide (25), blog index (26).
- **Third parties on networks:** CODE homepage (7), Ospree docs page on CryptoSwift (8).
- **Company and funding:**
  - Copla ISO case study (11);
  - tech.eu (16);
  - Tenity release (17);
  - Blockpass release on ACN Newswire (18);
  - Global Ledger blog (19);
  - The Paypers on Lexters (20);
  - krediidiraportid.ee register mirror (21);
  - AIN.ua, 3 Jul 2025 (consulted, not listed as a source; it repeats the funding facts).
- **Ratings:** GetApp UK (22), Software Advice AU (23).
- **Open source:** GitLab topic page listing CryptoSwift / STRIP (27).
- **Not opened:**
  - FAQ page (server error to the fetcher);
  - ecosystem page (cryptoswift.eu/ecosystem/ redirects to cryptoswift.network, which the fetch tool refused and the browser pane blocks);
  - docs.cryptoswift.eu, api.cryptoswift.eu and the STRIP repository (fetch tool refused);
  - official e-Business Register and GLEIF (shell blocked by the network allowlist).
- **Searched** for further funding, acquisitions, breaches, regulatory actions and litigation: none found.

## Networks and protocols

| Network | Status | Evidence |
|---|---|---|
| STRIP (own) | Vendor-stated | Product page, homepage; GitLab project listed, 1 star, last updated 14 Oct 2025 (27) |
| CODE | Confirmed by CODE | CODE homepage "Interoperability: Connect across protocols with a single integration" lists CryptoSwift with CodeVASP, VerifyVASP, GTR, Sumsub, Sygna, Notabene; news item 23 Dec 2025 "CryptoSwift travelrule solution integrates with CodeVASP" (7) |
| Notabene | Vendor-stated, incoming | Product update 10 Sep 2025: "We expanded our Travel Rule network with Notabene connectivity"; incoming Notabene transactions after registering CryptoSwift's webhook in a free Notabene account (9) |
| Ospree | Documented by Ospree | Ospree customers can exchange data with VASPs reachable through the CryptoSwift network, no direct CryptoSwift integration needed (8) |
| TRUST, TRP, TRISA, GTR, Sygna, VerifyVASP | Not found | FAQ text quoted on the product and partners pages explains these protocols but does not claim support (4, 6) |
| Email fallback | Not found | Not mentioned on the pages opened |

The ecosystem page was not readable and may list more networks; re-check before the next fact pass.

## Key facts

| Item | Finding |
|---|---|
| Legal entity | CryptoSwift OÜ, registry code 16668875, VAT EE102817036, LEI 6488D8YJGCG4X5697673 (terms, 12) |
| Address | Rukki 28, 50407 Tartu, Estonia (terms and privacy policy) |
| Registered | 3 Feb 2023 (register mirror, 21); vendor says founded 2022 (3, 18) |
| Leadership | Indrek Ulst CEO and founder; Uve Poom COO and co-founder, on the board since 30 Jun 2025 (3, 21) |
| Size | 3 employees in 2025; revenue €83,147 (2025), €10,013 (2024) (register mirror, 21; not shown on the page except "three employees" in the track record note) |
| Funding | €510,000 pre-seed, July 2025: Tenity, Startup Wise Guys, DEPO Ventures, angels (16, 17) |
| Deployment | Hosted (Google Cloud badge); Outpost on-prem PII storage on Enterprise (2, 4) |
| Wallet checks | Signature (600+ wallet apps; EVM, Bitcoin, Solana, Tron), micro-transfer, visual proof, self-declaration; optional guided selfie (liveness by CryptoSwift, no ID match) and source of funds or wealth (5, 24) |
| Pricing | Essentials €600 / month annual (min €7,200), €750 quarterly, 2,000 credits; Professional €1,200 / month (min €14,400), €1,500 quarterly, 6,000 credits; Enterprise custom, 20,000+ credits; no setup fee; free sandbox (2) |
| Certifications | ISO/IEC 27001:2022 vendor-stated (10, 11); no SOC 2 |
| Customers | Januar, Lightspark (Striga), Change, CryptoVoucher, Instacoins (1); Crypto2Cash (16) |
| Partners | Blockpass (18), Global Ledger (19), Lexters (20); tech.eu names AML Watcher, Scorechain, Fraud.com (16) |
| User ratings | GetApp and Software Advice: 0 reviews |
| Terms | Estonian law; liability capped at fees paid (or USD 100); no SLA; in force 1 Jun 2026 (12) |

## Ranking (`travel-rule`)

Inserted at **position 2**, between 21 Analytics (4.1) and VerifyVASP (3.8). **CryptoSwift now ranks above VerifyVASP and TRP.** The main reason is pricing transparency (4.4 vs 3.4 for VerifyVASP) and stronger integration evidence; VerifyVASP still scores higher on compliance, coverage and track record.

Award proposed: "Best for EU CASPs". It duplicates no other award in the list, and it rests on the record:

- published EUR plans;
- an EU TFR focus;
- an Estonian entity;
- EU customers, such as Januar with its MiCA licence.

If the editor prefers, an alternative is "Best Hosted API with Published Plans". That one sits close to TRP's "Best Published Travel Rule Pricing".

`size: Startups to mid-market` is an editorial judgement from the plan sizes; set `null` if you prefer.

Category page `categories/travel-rule.yml`:
- `quick_answer` names CryptoSwift second and moves VerifyVASP and TRP down one place each;
- the count goes from 4 to 5;
- the SEO description names CryptoSwift;
- `updated` is now 2026-10-30.

The category has no capability matrix (`capability_columns: []`). `docs/categories.md` count 4 to 5.

Not done (suggestions for the owner):
- **Crypto ranking:** not added. CryptoSwift has no KYC of its own, and its KYT comes from third parties.
- **Other reviews:** CryptoSwift is not added as an alternative in the 21 Analytics, VerifyVASP or TRP records.
- **Category FAQ:** "Which Travel Rule provider works with self-hosted wallets?" still names only 21 Analytics. CryptoSwift and TRP could be added.

## Could not confirm

- ISO/IEC 27001:2022 certificate: body, number, scope and validity.
- The 250+ connected and 2,500+ reachable VASP figures and 85+ jurisdictions.
- What one pricing credit buys.
- Networks listed on the ecosystem page (unreadable).
- The official e-Business Register entry and the GLEIF LEI record (the mirror and the vendor's terms agree).

## Update 2026-10-30: owner decisions

- Award "Best for EU CASPs" approved.
- Logo: the editor supplied the CryptoSwift logo (purple icon, white wordmark text). Saved as `src/assets/img/wordmarks/cryptoswift.png`, 64 px tall, with the white text recoloured to the site ink colour so it reads on the light background.
