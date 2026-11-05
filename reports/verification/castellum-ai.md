# Castellum.AI: fact re-check 2026-10-18

## Changed

- Leadership: CTO "Julian Vasilkoski" (named as co-founder) → not confirmed; current about page lists Lee Roggenkamp as CTO and Marissa Venuto as COO (source 2). Second co-founder not named publicly.
- Founder background "former US Treasury/OFAC official" → "worked at OFAC and other US Treasury offices, then ran US compliance for a major Asian bank" (source 6).
- Funding "~$12.6M raised from Spider Capital and NewFund" → $4M seed led by Spider Capital (Oct 2023, source 4) and $8.5M Series A led by Curql (Jul 2025, source 5).
- Data claims kept but sourced and reworded to vendor terms: "1,000+ watchlists updated every 5 minutes", "200,000+ sources" (source 1). "1,000+ sanctions lists" → "watchlists".
- Agentic AI: 83% of L1/L2 alerts resolved instantly and 94% fewer false positives kept as vendor claims (source 1); agents named (Arbiter); AI Governance Center added.
- Features updated to current product list: KYC/KYB onboarding, real-time monitoring, transaction screening, lookbacks, shelf company data (sources 1, 3).
- Certification added: SOC 2 Type 2, vendor-stated (homepage badge, source 1).
- HQ New York sourced (source 4). Founded 2019 sourced to CB Insights only (source 7).
- User reviews: G2 lists no reviews for Castellum.AI, so the praise/criticism themes and legacy note were removed.

## Removed / unverifiable

- "Roughly 26 employees".
- List names "OFAC, UN, UK HMT, EU" in prose.
- Features "forced-labor and supply-chain risk screening", "PDF investigation reports", "Perpetual KYC (pKYC) support".
- All "frequently cited" user-review themes (no reviews on G2).

## Ranking cards

- Castellum.AI has no entry in `src/_data/rankings.yml` (no `slug: castellum-ai`).

## Score flag

- None. Company active, raised a Series A in 2025, product scope unchanged. Note: there are no public user reviews behind the old user-review section.

## Follow-up 2026-10-22

### Changed

- Watchlist count: vendor pages disagree on 2026-10-22. Sanctions and PEPs product page says "1,700+ watchlists" (new source 10); homepage says "1,000+ watchlists" (source 1). Number dropped from `seo.description` and `verdict`; `what_is` and the FAQ now give both figures with their page; fact "Data: 1,000+ watchlists updated every 5 minutes; 200,000+ sources" → "Watchlists: 1,700+ per the sanctions and PEPs page (homepage says 1,000+), updated every 5 minutes" (source 10) and "Data sources: 200,000+" (source 1).
- Feature "Sanctions, PEP and AI-powered adverse-media screening" → adds export control, forced labor and law enforcement list screening (source 10).
- Feature added: investigations workspace exporting results, audit trail and findings to a PDF or white-labelled report (new source 12). Restores the "PDF reports" item removed on 2026-10-18.
- Pricing: money-back guarantee terms read (new source 11): fewer false positives or money back, measured with before and after test files and added to the contract; no time limit or claims procedure published. Added to the summary and as a pricing item.

### Removed / unverifiable

- Still not found: supply-chain risk screening, perpetual KYC.
- Founding year 2019 still only from CB Insights; vendor pages give none.
- SOC 2 Type 2: still vendor_stated (homepage "SOC 2 compliant" heading; "T2" only in the badge file name; no report or trust centre).
- User ratings: G2 page says "hasn't been reviewed yet"; no Capterra listing. Left empty.
- Transaction Monitoring Agent: still unclear whether it detects or reviews alerts from an existing system.
- Notes on CTO, employee count, funding total, investors and list names were already reflected in the record and are resolved; removed from `verification_notes`.

### Ranking cards

- `south-africa` entry, pro "In-house risk data, with 1,000+ watchlists updated every 5 minutes, per Castellum.AI" → "In-house risk data, with watchlists updated every 5 minutes, per Castellum.AI" (vendor pages now give 1,000+ and 1,700+).
- `aml` entry: no text is wrong.
- Correction to the 2026-10-18 section: Castellum.AI has entries in `src/_data/rankings.yml` (categories `aml` and `south-africa`).

### Score flag

- None.

## v3.1 fields 2026-11-05

New sources: 13 Using Batch Screen (support article), 14 Compliance API page.

Added (key: status, source):
- pricing.model: published none, minimum true (contract), trial false (3)
- integration: docs_public yes, SwaggerHub API reference linked from the site (14); sandbox partial, free sandbox with no stated self-serve route (14); no_code yes, web platform with batch upload (13)
- capabilities: kyb_entity_screening yes, KYC/KYB onboarding (1); ongoing_monitoring yes (1); list_updates yes (10); fuzzy_matching yes, Jgram matching with adjustable thresholds (10); alert_explanation yes, narrative with source references (1); audit_trail yes (1); batch_screening yes (13)
- track_record.ownership: stable, independent and venture funded (5); incidents: none found (search hits were the unrelated Castellum, Inc.)

Stayed not_disclosed: sdk_web, sdk_ios, sdk_android, support_hours, pep_tiers, risk_scoring, data_residency.

Notes: the SwaggerHub reference (app.swaggerhub.com/apis-docs/castellum.ai/Search/1.0.0) is script-rendered and could not be opened by WebFetch or curl; docs_public = yes rests on the public link and the API page. Recheck in a browser.

Rescore v3.1: 4.5 -> 4.2 (80%; pricing n/d). Score flag: none.
