# Enigma: new review 2026-10-18

New record `src/_data/providers/enigma.yml`, written at the vendor's request. Score 4.4 (Very Good), weighted from the six rubric criteria in `score_breakdown`.

## Checked (pages opened)

- Product and scope: homepage, Onboarding & KYB, Data, Customer & Transaction Screening, Partners pages; KYB docs and docs index (sources 1, 4, 5, 6, 8, 9, 17).
- Pricing: pricing page and rate card. Free, Pro $20/mo (2,100 credits), Max $200/mo (25,000 credits), Enterprise custom; 1 credit = $0.01; KYB Identify $1.50 and KYB Verify $2.50 per match; watchlist $0.50, TIN $1.00, negative news and bankruptcy $0.10 per request (sources 2, 3).
- Certifications: security page states SOC 2 Type 2 (security, availability, confidentiality) and annual third-party pen tests. No auditor, date or trust centre. Status `vendor_stated` (source 7).
- Company: founded 2011, New York, $95M round Sept 2018 led by NEA with BB&T, Capital One Growth Ventures, MetLife, Third Point (FinTech Global, source 11); earlier rounds and founders from Wikipedia (source 12).
- 2026 news: KYB agent on Google Cloud Marketplace (12 May 2026, source 13); Proof partnership on Business Certificates (source 14); data in Parallel.ai's Index (19 May 2026, source 15). No acquisition, layoffs, regulatory action or breach found.
- Support: email (support@, contact@) and form; no hours or SLA except Enterprise contract SLA (sources 2, 10).
- User ratings: G2 seller page (source 18).

## Could not confirm

- Current CEO and leadership (Wikipedia only; no Enigma page names them).
- Founding year conflict: 2011 (FinTech Global, G2) vs 2012 (Wikipedia infobox). 2011 used.
- Any funding after 2018; total raised.
- SOC 2 report or auditor; any ISO/IEC 27001.
- Watchlists beyond OFAC SDN and Enigma's own PEP list.
- Sandbox, test keys, SDKs.
- Coverage counts differ across Enigma pages (100M+ registrations in docs; 116M+ registration records and 34M+ brands in data page meta; 100M+ entities, 30M brands, 30M locations in the May 2026 release). Docs figure used.
- Whether every logo shown (Capital One, Chase, Truist, Gusto, Faire) is a current customer.
- G2: 1 review on the business data product, rating shown inconsistently; the other "Enigma" G2 listing mixes unrelated products. No Capterra listing. `user_ratings` left empty.
- Wikidata id.

## Score

| Criterion | Weight | Sub-score |
|---|---|---|
| Compliance & certifications | 25 | 4.2 |
| Coverage | 20 | 4.0 |
| Pricing transparency | 20 | 4.9 |
| Integration & API depth | 15 | 4.6 |
| Support responsiveness | 10 | 4.0 |
| Track record | 10 | 4.5 |
| Weighted | | 4.37, shown 4.4 |

Calibration: same score as Strise and FullCircl (4.4, no published pricing) and below KYCAID (4.6, published pricing, global coverage, 24/7 chat). Enigma's full rate card lifts it; US-only scope and vendor-stated SOC 2 hold it back.

## Ranking cards (suggested; rankings.yml not edited)

### kyb (Best KYB Solution Providers)

By score it would sit 5th among reviewed entries: after KYCAID, Veriff, ComplyAdvantage (4.6) and Trulioo (4.5), ahead of the unreviewed Encompass, Kyckr and Ondato entries.

```yaml
  - slug: enigma
    name: Enigma
    award: Best for US SMB KYB
    tagline: US business verification by API, matching against 100M+ registrations across 52 US jurisdictions, per Enigma.
    coverage: US only
    size: SMB to Enterprise
    pros:
    - Published rate card, with KYB at $1.50 or $2.50 per match and no charge for non-matches
    - Card revenue and operating signals show whether a business is actually trading
    - GraphQL API, Console and MCP server, plus partner platforms such as Alloy
    cons:
    - US only; Enigma says it has no plans to expand KYB outside the US
    - No UBO register data; possible owners come mainly from state filings
    - SOC 2 Type 2 is vendor-stated, and there are almost no public user reviews
    legacy_price_shown: From $1.50/KYB match
    legacy_rating_shown: null
    segments: []
```

### Other lists

- `aml` / `aml/banks`: not recommended. Enigma sells sanctions, PEP and transaction screening (it says it screens over a billion requests a month and works with top 10 US banks), but only OFAC SDN and its own PEP list are named, with no adverse-media database beyond a negative news check. Reconsider if Enigma documents its list coverage.
- No country list fits (there is no US ranking).

## Score flag

None. New record.
