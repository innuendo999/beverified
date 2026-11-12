# Blockpass (Envoy Travel Rule): new review 2026-11-12

New record `src/_data/providers/blockpass.yml`. Proposed score **3.7**, grade Good (as on the other Travel Rule records under v3.0; the v3.1 bands would call 3.7 "Very Good"), weighted from the six Travel Rule rubric criteria (`site.json` → `v3.rubricTravel`, v3.0) in `score_breakdown`. `link.type: none`, `link.url` = the Travel Rule Solution page. Categories: `travel-rule` only. Blockpass was suggested by 21 Analytics, a partner that is itself ranked in Travel Rule; that had no influence on the review or the score. It was not in `src/_data/providers/` under another slug and not in `src/_data/tracked.yml`.

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 4.1 |
| Coverage | 20 | 3.6 |
| Pricing transparency | 20 | 3.5 |
| Integration & API depth | 15 | 3.3 |
| Support responsiveness | 10 | 3.6 |
| Track record | 10 | 3.6 |
| **Weighted** | | **3.66, rounds to 3.7** |

Calibration against the other reviewed Travel Rule records:

- Compliance 4.1 sits below 21 Analytics (4.3, confirmed ISO/IEC 27001 plus TRUST partner status) and above Notabene (4.0, ISO and SOC 2 behind a Trust Center request). Blockpass's ISO/IEC 27001:2022 certificate is on the certification body's own site with KYC and AML software in scope, and the entity, directors and PSC are on the UK register. No SOC 2; Cyber Essentials Plus only as a site mark.
- Coverage 3.6 is below Ospree (3.9): both use TRP, TRISA and email, but Ospree's TRISA link is announced by TRISA itself, while Blockpass's links are stated only in its own help centre. Self-hosted wallets: signature only, five EVM networks (Ospree also signature only).
- Pricing 3.5 is between VerifyVASP (3.4, nothing published) and 21 Analytics (3.6, third-party figure). Every KYC, AML, KYB and wallet price is public, and the Travel Rule entry point is known (Corporate, $999 a month, 12 months), but the Envoy add-on itself has no price.
- Integration 3.3 is below VerifyVASP (3.6) and Ospree (4.0, public OpenAPI docs and sandbox): Envoy has a dashboard guide but no Blockpass API reference, and accounts are created by hand.
- Support 3.6 is above CryptoSwift (3.5) and Ospree (3.3): hours and first-response targets are published; no contractual SLA.
- Track record 3.6 is above Ospree (3.4) and CryptoSwift (3.3), below VerifyVASP (4.1): a long KYC history since 2018 with named crypto clients, but the Travel Rule service has no named users, two filings were past their due dates on the check date, and a co-founder left the board in September 2026.

## Checked (pages opened, 12 Nov 2026)

- **Vendor site:** Travel Rule Solution (1), Envoy guide in the help centre (2), pricing (3), homepage (4), about (5), crypto compliance tools (6), Unhosted Wallet KYC (7), verification checks help article (8), KYC (9), KYB (10), terms of service (11), privacy policy (12), service plans support article (18), KYC Connect API reference (19), $99 plan blog post of 28 Jan 2026 (24). Also read, not cited: Travel Rule guide posts of 7 Apr 2025, 24 Sep 2025 and the Travel Rule Hub post of 7 Sep 2025 (no Envoy, protocol or price details), crypto Travel Rule page, docs.blockpass.org landing page.
- **Certificate:** Amtivo / British Assessment Bureau certificate page for certificate 241611 (13), reached from the link in the Blockpass footer.
- **Register:** Companies House overview (14), officers (15), PSC (16), filing history (17).
- **Third parties:** TRISA Envoy on GitHub (20) and Docker Hub (21); FF News on the CryptoSwift partnership, 11 Jun 2025 (22); Chainproof release, 13 Nov 2025 (23); ACN Newswire release list (27); Trustpilot UK (25); G2 (26).
- **Not opened** (the fetch tool needed a permission nobody could grant in this unattended run): trisa.dev Envoy docs and its OpenVASP page, the TRISA public directory, the brand guidelines PDF (logo), the Cyber Essentials Plus press release of Feb 2023 and the IASME register.
- **Searched** for TRISA directory listings, G2 or Capterra reviews, funding, breaches, regulatory actions and litigation: none found beyond what is recorded.

## Networks and protocols

| Network | Status | Evidence |
|---|---|---|
| TRISA | Vendor-stated live, native | "TRISA is the native protocol for Envoy, providing peer-to-peer, encrypted messaging" (2). TRISA's Envoy software is a TRISA node (20). No TRISA listing for Blockpass found |
| TRP | Vendor-stated live | REST, needs the counterparty's travel address (2). TRISA Docker Hub: Envoy "supports the TRISA and TRP protocols" (21). TRP version not stated |
| Email ("Sunrise") | Vendor-stated fallback | Secure compliance email to VASPs on neither protocol (2) |
| Directories | TRISA GDS, Daybreak, manual entry | Tabs in the Envoy transfer flow (2) |
| CryptoSwift | Partnership announced, status unknown | FF News, 11 Jun 2025: CryptoSwift's Travel Rule tools added to the Blockpass suite (22). Current Blockpass pages do not mention it. Shown as "Not checked" in the fit check |
| TRUST, GTR, CODE, Sygna, VerifyVASP, Notabene | Not found | No mention on any Blockpass page opened |

Access: "managed directly by the Blockpass team"; accounts created manually with temporary credentials; login at blockpass.tr-envoy.com (2). Who runs that host was not confirmed.

## Self-hosted wallets

Unhosted Wallet KYC: the user connects the wallet and signs a message; Blockpass checks the signature with the user's KYC data (7). Networks: Ethereum, Polygon, BSC, Avalanche, Arbitrum (8, updated 23 Oct 2025). No Satoshi test, AOPP or visual proof found. The pages do not say whether Envoy transfers use this check. Priced per check, $1.25 Basic to $0.50 Corporate (3).

## Key facts

| Item | Finding |
|---|---|
| Legal entity | Blockpass UK Ltd, private limited company, number 11251249, active (14); contracting party in the terms, England and Wales law (11) |
| Registered office | 27 Old Gloucester Street, London WC1N 3AX (14) |
| Founded | "Built since 2017" (5); UK company incorporated 13 Mar 2018 (14) |
| Officers | Directors Adam Vaziri Zanjani (since 13 Mar 2018), Thomas Leiritz (since 12 Aug 2020); secretary Fides Services Limited (Hong Kong); Johannes Richard Lombardo resigned 10 Sep 2026 (15, 17) |
| Owner | Active PSC Hiroyuki Enomoto, significant influence or control, since 28 Feb 2023; Blockpass Idn Limited (Hong Kong, 2566786) held 75% or more Dec 2018 to Feb 2019 (16) |
| Filings | Accounts to 31 Dec 2025 due 30 Sep 2026 and confirmation statement due 7 Oct 2026; neither in the filing history on 12 Nov 2026. The overview page as fetched did not show "overdue" (14, 17) |
| Funding | Not disclosed |
| Deployment | Hosted; data hosted in the Netherlands, stored mainly in the EU (2, 12) |
| Pricing | Basic $99, Starter $249, Growth $499 a month (1-month term), Corporate $999 a month (12-month term), 7-day trial; Envoy is a Corporate add-on, price not published (3, 4) |
| Certifications | ISO/IEC 27001:2022 confirmed, certificate 241611, British Assessment Bureau (Amtivo), issued 11 Mar 2026, valid to 8 Mar 2029, initial 9 Mar 2023 (13). Cyber Essentials and Cyber Essentials Plus: marks on the site only (5). No SOC 2 |
| Regulatory status | No licence or registration claimed |
| KYC capabilities | 200+ ID document types, face match with 3D liveness, proof of address, sanctions, PEP and adverse media, ongoing monitoring, periodic review, reusable profile (9); no NFC, no iBeta letter claimed |
| Other products | KYB (10), Crypto AML wallet screening on ETH, BTC, Polygon, BSC, Cardano (8), On-Chain KYC (6), managed services (3) |
| Customers | Chainproof (KYB, Nov 2025) (23); others in Blockpass releases (27); no Travel Rule user named |
| User ratings | Trustpilot UK 4.3 from 119 reviews, mostly end users, latest 3 Jun 2026 (25); G2 no reviews (26) |

## Ranking card (`travel-rule`)

Added at position **6**, after TRP. Blockpass ties TRP at 3.7, and ties keep the previous order, so TRP stays ahead. **Blockpass ranks above two existing providers: Ospree (3.5) and Block Infrastructure (3.0)**, which move to #7 and #8. Order: 21 Analytics 4.1, Notabene 4.0, CryptoSwift 3.9, VerifyVASP 3.8, TRP 3.7, Blockpass 3.7, Ospree 3.5, Block Infrastructure 3.0.

`award: null` for the owner to decide (proposed: "Best for KYC and Travel Rule in One").

## Category page and fit check

- `src/_data/categories/travel-rule.yml`: quick answer "We compared 7 providers" → 8, SEO description lists Blockpass, `updated` 2026-11-12. No capability matrix (`capability_columns: []`).
- `src/_data/travelRuleFit.yml`: deployment reading for Blockpass (hosted yes, self-hosted not found) and `other_networks_skip` so CryptoSwift shows "Not checked" rather than "not found".

## Open for the owner

- **Award** for the ranking card.
- **Logo:** supply one (brand guidelines PDF at blockpass.org/downloads/Blockpass_Brand_Guidelines_v1.1.pdf was not downloaded).
- **Other rankings (suggestions only, not added):** Crypto KYC (customer KYC, unhosted wallet KYC, crypto AML, On-Chain KYC), Cheap KYC (published per-check prices from $1.00 to $1.35 per full check; would need `budget{}` data and a check of whether the monthly minimum covers checks, which the Jan 2026 blog post suggests), KYB, and the KYC Pricing Index table (`pricing.index`).
- **Sponsored card:** the 21 Analytics review placement targets the whole `travel-rule` category, so it will also show on this review.
- **Filings:** if you want the late accounts and confirmation statement in the copy as "overdue", a browser check of the Companies House page first (the fetched page did not show that label).

## Score flag

Re-check when Blockpass publishes an Envoy price, an Envoy API reference or a TRISA directory listing, or confirms the CryptoSwift route; each would move Coverage, Pricing or Integration.
