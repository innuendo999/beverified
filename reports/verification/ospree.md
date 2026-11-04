# Ospree: new review 2026-11-04

New record `src/_data/providers/ospree.yml`. Proposed score 3.5, grade Good (editor to confirm the grade: no record sits at 3.5 or 3.6 yet; 3.4 is Fair, 3.7 Good), weighted from the six rubric criteria in `score_breakdown`. `link.type: none`. Categories: `travel-rule` only. Ospree was suggested by 21 Analytics, a partner that is itself ranked in Travel Rule; that had no influence on the review or the score. Ospree was not in `src/_data/providers/` under another slug and not in `src/_data/tracked.yml`.

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 3.4 |
| Coverage | 20 | 3.9 |
| Pricing transparency | 20 | 3.2 |
| Integration & API depth | 15 | 4.0 |
| Support responsiveness | 10 | 3.3 |
| Track record | 10 | 3.4 |
| **Weighted** | | **3.54, rounds to 3.5** |

Calibration against the other reviewed Travel Rule records:

- Compliance 3.4 sits just above TRP (3.3, no entity or certification named) and below CryptoSwift (3.8, entity, registry code and LEI published, ISO/IEC 27001 vendor-stated). Ospree names its Singapore entity but no registration number, and its only certification is UK Cyber Essentials, a baseline scheme, vendor-stated.
- Coverage 3.9 is just below CryptoSwift (4.0) and VerifyVASP (4.1). Ospree's open-protocol reach (TRP and TRISA, TRISA confirmed by TRISA) is wider than CryptoSwift's, and it routes to CryptoSwift itself, but it has one self-hosted wallet method against four at CryptoSwift and 21 Analytics, and no TRUST, GTR, Sygna or CODE route.
- Pricing 3.2 is the lowest in the list: VerifyVASP (3.4) at least describes its fee model in its terms, and 21 Analytics (3.6) explains a flat fee and has a third-party figure. Ospree shows three tiers with identical feature lists and no figures.

## Checked (pages opened, 4 Nov 2026)

- **Vendor site:** homepage (1), plans (2), about us (3), terms (4), privacy policy (5), partnerships (6), jurisdictions (7), blockchain analytics product (8), integrations (9), help centre (31), Travel Rule page (not listed as a source: no factual content beyond headings).
- **Vendor blog:** TRISA interoperability, 20 Jun 2024 (17); Cyber Essentials, 12 May 2026 (20); TRM Labs, 24 Apr 2026 (21); Monetari, 10 Mar 2026 (22); CoinMENA, 4 Aug 2025 (23); data protection, 11 Sep 2022 (24); blog index (consulted).
- **Developer docs:** protocols (10), Travel Rule API overview (11), CryptoSwift route (12), API integration flows (13), quickstart (14), request a VASP (15), docs index llms.txt (16), transfer type (32); dashboard Travel Rule and self-hosted wallets pages, errors, Sunrise Issue (consulted, nothing new).
- **Third parties:** TRISA's travelrule.io announcement (18), OpenVASP TRP page (19), Coinfirm release 29 Nov 2022 (25), Silicon Republic 13 Apr 2023 (26), CB Insights profile (27) and customers page (consulted), G2 product (28) and seller (29) pages, Protofire EU Travel Rule guide (30), village.ai and GetLatka (consulted, not used as sources), trisa.io homepage (does not list Ospree).
- **Not opened:**
  - per-protocol docs pages for the Ospree network, email, TRP and TRISA, the "DRAFT" interoperability page, Breaking Changes, Webhook Security, the self-hosted wallet learn page, Verify Address Control, FAQ and Network Directory: the fetch tool needed a permission that nobody could grant in this unattended run;
  - the Cyber Essentials certificate record on registry.blockmarktech.com and the IASME certificate search (same reason);
  - Singapore company register (ACRA / Bizfile): no register mirror found for "Ospree Pte. Ltd."; searches returned unrelated "Osprey" companies;
  - Tracxn (robots), dev-wp.ospree.io (robots).
- **Searched** for funding, acquisitions, breaches, regulatory actions and litigation: none found.

## Networks and protocols

| Network | Status | Evidence |
|---|---|---|
| Ospree (own network) | Vendor-stated | Docs protocols page lists "Ospree" as supported (10); counterparties invited by email join after Ospree review (15) |
| Email | Vendor-stated | Listed as supported (10); detail page not opened |
| TRP | Vendor-stated, plus OpenVASP listing | Listed as supported (10); OpenVASP's TRP page shows "ospree" with a link, placed after the two named vendors, so its role is not explicit (19); Protofire reads it as one of three TRP vendors (30) |
| TRISA | Confirmed by TRISA | travelrule.io (TRISA) announces full interoperability with Ospree, modified 28 Jun 2024 (18); Ospree post 20 Jun 2024 (17) |
| CryptoSwift (STRIP) | Documented by Ospree | Ospree routes data to VASPs on the CryptoSwift network through the standard API (12) |
| Sumsub, Fireblocks, TRUSThub, GTR | Planned, no dates | "Future interoperability options" (10) |
| TRUST, Sygna, VerifyVASP, CODE, Notabene | Not found | No mention in the pages opened |

## Self-hosted wallets

Signed ownership attestation only: the VASP requests a Verify Address Ownership link, the customer signs, Ospree labels the address self-hosted and fires a webhook (13). The product page names CAIP-122 off-chain message signing with no gas (8). No Satoshi test, AOPP, screenshot or video proof, or declaration found. Both addresses in a transfer cannot be self-hosted (11).

## Key facts

| Item | Finding |
|---|---|
| Legal entity | Ospree Pte. Ltd., "a Singapore company", Singapore law (terms, 4); no registration number published; register entry not found |
| Address | 111 North Bridge Road, #08-18 Peninsula Plaza, Singapore 179098 (privacy policy, last updated 12/11/2024, 5); CB Insights gives 75 High Street (27) |
| Founded | Not stated by Ospree; G2 seller listing 2022 (29); blog posts from Sep 2022 (24) and Coinfirm partnership Nov 2022 (25) |
| Leadership | Javier Tamashiro, co-founder and CEO; Jukka Pellinen, co-founder and CTO (3) |
| Funding | Not disclosed by Ospree; CB Insights one $120K seed round, Techstars programmes (27); TRISA page says backed by Ripple and Techstars (18) |
| Programmes | Techstars Web3 2023 (26), IBM Hyper Protect Accelerator, XRP Ledger Program (3) |
| Deployment | Hosted SaaS per terms (4); Monetari release says setup can run fully on local Turkish infrastructure (22); hosting provider and data location not named (5, 24) |
| Products | Travel Rule (Atlas), Blockchain Analytics (TRM Labs, Crystal, Global Ledger; BYOK listed on plans), Accounts Directory, Rule Engine, Reporting Hub, AI Catalyst assistant, Full API and Plug-and-Play screens (1, 2, 8, 9). No customer KYC found |
| Pricing | Foundation, Scale, Enterprise; "Contact sales"; identical feature lists; no figures (2). G2 none (28) |
| Certifications | UK Cyber Essentials, vendor-stated, 12 May 2026; level, body, number and expiry not stated; certificate record not opened (20). No ISO/IEC 27001 or SOC 2 claim |
| Customers | CoinMENA (Bahrain and UAE licences per Ospree, 23); testimonials from Bit2Me STX and RAID Square (1); Monetari exclusive channel partner in Türkiye (22) |
| User ratings | G2: 0 reviews (28). No Capterra, GetApp or SourceForge listing found |
| Regulatory status | Ospree itself holds no licence that we found; none is claimed |

Vendor figures recorded as vendor-stated only: 1,600+ VASPs in the directory, 120+ projects connected (1, 3). Not used: 65M+ end users (homepage) vs 70M+ (about page), 99.9% uptime, "first company to offer multi-chain, native Travel Rule capabilities", "a leading digital asset compliance platform".

## Ranking card (`travel-rule`)

Added at position **5**, after TRP (3.7) and before the unreviewed Notabene entry. It does **not** rank above any reviewed provider. Order is now 21 Analytics 4.1, CryptoSwift 3.9, VerifyVASP 3.8, TRP 3.7, Ospree 3.5, Notabene (not reviewed).

```yaml
  - slug: ospree
    name: Ospree
    award: Best for Built-In Wallet Screening
    tagline: Hosted Travel Rule platform from Singapore with TRP, TRISA and CryptoSwift routes, built-in wallet screening and a rule engine.
    coverage: Global (vendor-stated); named users in the Gulf, channel partner in Türkiye
    size: Startups to mid-market
```

Award, `size` and `coverage` are editorial proposals for the owner. Award alternative: "Best for TRISA Interoperability". `size` follows the Foundation tier ("teams launching Travel Rule operations"); set `null` if you prefer.

Category page `src/_data/categories/travel-rule.yml`: Ospree added to the SEO description and the quick answer (fifth at 3.5), count 5 to 6 in the quick answer and `legacy_stats`, `updated` 2026-11-04. The ranking table, cards, jump nav and JSON-LD ItemList read from `rankings.yml` and the record, so no numbers were retyped there. There is no capability matrix on this page (`capability_columns: []`).

## Suggestions for the owner (not done)

- **Crypto KYC ranking:** Ospree screens wallets and transactions with partner data, which overlaps crypto KYC/KYT, but it has no customer identity verification. Adding it to `crypto` is possible as a wallet-screening entry; not done.
- **Logo:** no press kit found and the fetch tool returns no image files. `logo.wordmark` is null; please supply an Ospree wordmark from their site or press contact.

## Score flag

None. New score, proposed 3.5.

## Could not confirm

- Singapore company registration (UEN, incorporation date, officers, shareholders).
- Cyber Essentials level, certification body, certificate number and expiry.
- How the TRP, TRISA, email and own-network routes work in detail (pages not opened).
- Funding beyond the CB Insights $120K seed; any Ripple investment amount.
- CoinMENA's licences with the Bahrain and UAE regulators.
- Hosting provider, data location and any SLA.
