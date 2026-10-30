# Jumio: fact re-check 2026-10-18

## Changed
- HQ "Palo Alto/Sunnyvale, CA" → Sunnyvale, California (press release boilerplate, source 1). Office list "Vienna, London, Singapore, New York, Montréal" → regions only (North America, Latin America, Europe, Asia Pacific, Middle East), as stated in source 1.
- CEO: added Mark Lorion, appointed April 2026 (source 1). Robert Prigge left in January 2026; Bala Kumar was interim CEO and remains President and CPTO.
- "1 billion identity verifications" → "more than 1 billion transactions" across 200+ countries and territories (Jumio's own wording, sources 1, 2).
- Document coverage "3,500+ ID types from 200+ countries" → 5,000+ ID types across 200 countries and territories (sources 2, 3).
- Funding "$233M+ raised (Series D)" → investors Centana Growth Partners, Great Hill Partners, Millennium Technology Value Partners (source 1).
- "KYX Platform" → Jumio Platform, Jumio Watch and selfie.DONE (source 2); KYX branding no longer appears.
- AML screening: confirmed sanctions, PEPs, adverse media and ongoing monitoring (source 6). "Add-on module" wording softened: packaging is not published.
- Pricing: third-party estimate "$0.90 to $2.30 per verification" (no traceable source) → Vendr buyer data: median $55,850/yr, range $5,832 to $213,684/yr, plus Vendr's market range of about $1.50 to $3 per verification at 100k to 500k checks a year (source 8). Not published by Jumio (source 2).
- Founded 2010: kept, sourced to Wikipedia only (source 7).
- Certifications added: ISO/IEC 27001:2022, SOC 2 Type 2, PCI DSS (vendor-stated, source 4); iBeta ISO/IEC 30107-3 Level 2 for Jumio Liveness SDK, letter 11 Sep 2025 (confirmed, source 5).
- Pro "24/7 enterprise support built for Tier-1 bank and marketplace requirements" → iBeta Level 2 tested liveness (source 5).
- Con "Third-party cost estimates run higher than several budget-tier competitors" → "Third-party contract data points to a high median annual spend" (source 8).
- User ratings: G2 4.1 / 5 from 38 reviews (source 9).

## Removed / unverifiable
- On-premise deployment option: not on any Jumio page opened.
- 24/7 support with dedicated account management: not on any Jumio page opened.
- "$233M+ raised (Series D)": no source found.
- "$0.90 to $2.30 per verification": no source found.
- "frequently cited" and "most consistently cited complaint" counts in review themes.

## Ranking cards
- `aml`, `e-kyc`, `identity-verification`: `legacy_price_shown: $1.15/verification` has no source. Jumio publishes no price; remove it or replace with "Custom quote (Vendr median contract $55,850/yr)".
- Con "Contracts often require annual commitment": not confirmed on any page opened (Vendr reports annual contract values but this is not a stated requirement). Suggest "Pricing only via sales quote".
- Pro "Strong regional data-center coverage": not confirmed on any page opened. Suggest "5,000+ ID types across 200 countries and territories".
- Pro "Very high brand recognition & trust": opinion; acceptable but unsourced.
- Tagline "Widely-adopted identity verification and AML screening for global platforms": consistent with sources 1, 6.

## Score flag
- None. Company operating, new permanent CEO (Apr 2026), product line unchanged.

## Follow-up 2026-10-22

### Changed
- User ratings: G2 4.1 / 38 re-checked directly on g2.com (source 9, unchanged). Added Gartner Peer Insights 3.5 from 2 ratings for "Jumio Identity Verification" (source 10).
- Re-checked, unchanged: 1B+ transactions and 5K+ ID types on the homepage (source 2); 5,000+ ID types across 200 countries and territories (source 3); ISO/IEC 27001:2022, SOC 2 Type 2 and PCI DSS on the Privacy Center page (source 4); iBeta Level 2 letter for Jumio Liveness SDK, 11 Sep 2025, still on iBeta's list (source 5).
- `last_verified` and `updated` → 2026-10-22.

### Removed / unverifiable
- Founded 2010: still third-party only. Wikipedia (source 7) and CB Insights both say 2010; Jumio's homepage and About page do not state it. Kept with a note.
- ISO 27001, SOC 2, PCI DSS: still vendor-stated. trust.jumio.com fails to load; no certificate or registry entry found (the Visa service provider registry could only be opened as a partial third-party copy, which was inconclusive). A Sep 2022 Jumio release names Moss Adams as SOC 2 auditor.
- Capterra: 0 reviews, so no rating added.
- Resolved notes dropped: old $0.90 to $2.30 price, old $233M funding figure, on-premise/24/7/KYX claims (all removed earlier, not reinstated), G2 count (re-read directly), ranking-card `legacy_price_shown` (rankings.yml now shows "Custom pricing" on all Jumio cards).

### Ranking cards
- No corrections needed. `e-kyc` and `identity-verification` cards match the record (1B+ transactions, 5,000+ ID types across 200 countries and territories, iBeta Level 2, Vendr median $55,850, custom pricing).

### Score flag
- None.

## Follow-up 2026-10-30 (AML screening capabilities)

Filled `capabilities` keys from vendor pages opened 2026-10-30. No existing values changed (all four keys were empty). Score, prose, `last_verified` and `updated` untouched.

- `identity_verification`: yes (ID document check plus selfie and liveness); source 13, https://www.jumio.com/products/identity-verification/
- `sanctions_pep`: add_on (separate AML Screening product); source 14, https://www.jumio.com/products/screening/
- `adverse_media`: add_on (part of AML Screening product); source 14, https://www.jumio.com/products/screening/
- `transaction_monitoring`: add_on (separate Transaction Monitoring product); source 15, https://go.jumio.com/transaction-monitoring-media

- Note: Jumio's screening page FAQ says AML screening and transaction monitoring are distinct processes; transaction monitoring is sold as its own product (vendor landing page, undated).
