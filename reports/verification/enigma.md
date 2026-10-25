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

## Follow-up 2026-10-22

Worked through all 13 `verification_notes`; 12 remain (funding and leadership merged, free trial note resolved, one new note on SSN pricing). Existing editorial wording kept; no source showed it wrong. `last_verified` and `updated` set to 2026-10-22.

### Changed

- Pricing re-checked on the pricing page and rate card (sources 2, 3): Free $0; Pro $20/month with 2,100 credits; Max $200/month with 25,000 credits; Enterprise custom; 1 credit = $0.01; KYB Identify 150 credits ($1.50) and KYB Verify 250 credits ($2.50) per match; Bankruptcy and Negative News $0.10, Person Screening and Watch list $0.50, TIN Verification $1.00 per request (charged on every query, including no hit); prepaid bundles $100 to $1,000 with up to 25% bonus, valid one year. All unchanged.
- Pricing item added: "KYB searches with no match: $0 (billed per match, not per search)", official, source 4 (KYB solution page: "$0 ... searches that don't match", "Pay per match, not per search").
- Pricing item added: "Free trial: None; trials ended 31 Aug 2026 and those accounts moved to the Free plan", official, source 2 (was a note only).
- `user_ratings`: [] → G2 3.5 from 1 review, checked 2026-10 (new source 19, G2 product page describing the Enigma business data platform).

### Removed / unverifiable

- Note on free trials removed (now a pricing item). G2 note updated (the conflicting star display is gone).
- Still unverifiable: founding year (2011 vs 2012), funding after 2018, current CEO on an Enigma page, SOC 2 auditor or report date (a May 2020 Enigma post announced SOC 2 Type I, also without an auditor), sandbox and SDKs, named watchlists beyond OFAC SDN and Enigma's PEP list, Wikidata id. Capterra "Enigma Compliance" listing appears to be a different product and failed to load; no Gartner Peer Insights page found.
- Docs confirm SSN verification and TIN (EIN) verification as add-ons outside both KYB packages; SSN has no published price. The feature line ("Optional TIN/EIN and SSN verification") stays as written.

### Ranking cards

`kyb` entry checked. No text is now wrong: "$1.50 or $2.50 per match and no charge for non-matches", "From $1.50/KYB match", "US only; Enigma says it has no plans to expand KYB outside the US", "almost no public user reviews" (G2 shows 1) all still hold. No change suggested.

### Score flag

None.

## Follow-up 2026-10-25 (KYB)

### Changed

- Feature "Transaction screening for wires, ACH, Zelle and similar payments, with ongoing monitoring of customers." → "Transaction screening for wires, ACH, Zelle and similar payments." Reason: `capabilities.kyb_monitoring` is `not_disclosed`; KYB docs, KYB FAQ and KYB packages pages (sources 5, 20, 21) describe no monitoring, re-checks or alerts on businesses after onboarding (re-checked 2026-10-25).
- FAQ "Does Enigma offer sanctions screening?": "at onboarding and on an ongoing basis" removed from Enigma's own claim; answer now says the screening page (source 8) describes ongoing customer screening, and that the KYB docs do not describe monitoring of business records.
- Checked with no change needed: tagline, seo.description, verdict, what_is, pros, cons, user_reviews.by_profile (no monitoring claim). Pros and cons stay 3 and 3.
- `verification_notes`: added the 2026-10-25 monitoring note. `updated` → 2026-10-25; `last_verified` unchanged.

### Open point

- The screening page (source 8) does state "Customer screening at the time of onboarding and on an ongoing basis for both persons and business entities" under "Ongoing customer monitoring for any changes in sanctions status" (no frequency). Editor may want `kyb_monitoring` reviewed (e.g. `partial`, sanctions re-screening only); capabilities were not edited here.

### Ranking cards

- `kyb` card (`slug: enigma`): no monitoring claim; nothing contradicts the record.
