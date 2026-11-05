# MemberCheck: fact re-check 2026-10-18

## Changed

- Founded 2007 → 2008 (source 2).
- Ownership "Neurocom Group (sister: NameScan)" → still says it operates under Neurocom Group (est. 1992), and the site now brands MemberCheck "a Nexiant brand" (sources 1, 2, 6).
- HQ Chatswood, NSW kept, now sourced to the Nexiant AI Pty Ltd ABR record (NSW 2067) (source 5); MemberCheck pages give no address.
- Tagline, seo.description, verdict, features, pros, FAQ: "four-tier PEP and RCA screening" → screening against 1,000+ PEP and sanctions watchlists in 195 countries plus adverse media (source 1).
- "Daily ongoing monitoring" → ongoing monitoring plus daily database updates (sources 1, 2).
- "ID verification with face match and liveness" → document and biometric checks (source 1).
- Added: 13,000+ customers, KYB/UBO, transaction monitoring, industries list (sources 1, 2).
- Certifications added (vendor-stated): ISO/IEC 27001:2022, ISO/IEC 27701:2019 (source 2).
- Pricing "~$90/50 scans (third-party)" → not published; demo form asks for annual scan volume (source 3).
- User ratings: G2 5.0 from 1 review (2019) added (source 7).

## Removed / unverifiable

- Third-party "$90 for 50 scans": no source found.
- "Data is also held in the EU": sub-processor page lists AWS and Google (US) and no hosting region (source 4). Con reworded.
- Review themes (PEP depth, API flexibility, data residency, brand scale): one G2 review only. Removed.

## Ranking cards

- MemberCheck has no entry in `src/_data/rankings.yml` (no `slug: membercheck`).

## Score flag

- None. Company active; brand now presented under Nexiant. The headline "four-tier PEP" differentiator could not be confirmed, which the editor may want to weigh.

## Follow-up 2026-10-22

### Changed
- Feature "ID verification with document and biometric checks" → passports, driving licences and national ID cards checked against official sources (60+ countries), live selfie matched to the document photo where requested, liveness detection (source 9).
- Feature "Ongoing monitoring and transaction monitoring with configurable rules; database updated daily" split into ongoing monitoring with daily database updates (source 2) and transaction monitoring with configurable rules, risk-ranked alerts and case management on a separate platform with its own login (source 8). The FAQ answer was changed the same way.
- Pro 3: "Ongoing monitoring, with the screening database updated daily" → "Ongoing monitoring with daily database updates, plus ID verification with selfie matching and liveness" (sources 2, 9).
- Con 3: "Screening-focused rather than a full IDV/lifecycle platform" (outdated: IDV with selfie and liveness is part of the platform, source 9) → "Transaction monitoring runs on a separate platform with its own login, apart from the screening app" (source 8).
- New FAQ "Does MemberCheck verify identity documents?" (source 9).
- Pricing: added official item "Transaction monitoring trial: 30 days, 500 test credits, no credit card" (source 8); screening pricing still not published (source 3).
- User ratings: added Capterra 4.8 from 15 reviews (source 10). G2 unchanged (5.0, 1 review from 2019).
- User review themes added from Capterra: ease of use, support; limited hits or incomplete data capture.
- Rechecked and unchanged: founded 2008, 1,000+ watchlists, 195 countries, 13,000+ customers, demo-form pricing, sub-processors (AWS and Google, United States; no hosting region), ABR record for Nexiant AI Pty Ltd.

### Removed / unverifiable
- Neurocom and Nexiant legal relationship: still not confirmed (nexiant.ai does not mention Neurocom).
- HQ: still only from the ABR record and G2 pages; MemberCheck gives no address.
- ISO/IEC 27001:2022 and 27701:2019: still vendor-stated; no certificate or register found.
- API integration pro and feature: not reconfirmed on a current page; kept, note added.

### Ranking cards
- No entries with `slug: membercheck` in `src/_data/rankings.yml`. Nothing to correct.

### Score flag
- None. IDV with selfie and liveness, plus a transaction monitoring product, broadens the offering; this supports rather than lowers the current score.

## v3.1 fields 2026-11-05

Added (key: status, source):
- pricing.model: published none, minimum null (not stated), trial true (30-day transaction monitoring trial, self-serve sign-up, no card), source 8
- capabilities.ongoing_monitoring: yes, 11 (new source: PEP and sanctions screening page; daily rescreening of the monitoring list)
- capabilities.list_updates: yes, 11 (OFAC, UN, EU, HMT named; 24-hour refresh cycle)
- capabilities.pep_tiers: yes, 11 (FATF PEP categories; RCA screened in the same check; API categories include RCA)
- capabilities.fuzzy_matching: yes, 11 (phonetic and fuzzy matching, close-match threshold per organisation)
- capabilities.alert_explanation: yes, 11 (AI Analysis explains which identifiers align, does not decide)
- capabilities.audit_trail: yes, 1; risk_scoring: yes, 1; data_residency: yes, 1 (regional instances for Oceania, Europe, Southeast Asia, GCC)
- capabilities.batch_screening: yes, 11 (CSV or XML batch upload; batch scan endpoints in the API reference)
- capabilities.kyb_registry, kyb_ubo, kyb_documents, kyb_entity_screening: yes, 13 (new source: Know Your Business page)
- integration.docs_public: yes, 12 (new source: api.membercheck.com/docs, readable without login; the api-integration page says the reference is sent by the product team, but the reference itself is public)
- integration.sandbox: partial, 8 (self-serve trial for transaction monitoring only; screening sandbox on request; demo API base URL in the reference)
- track_record.ownership: stable, 2; incidents: none found

Not disclosed: kyb_monitoring (company-level monitoring not described), integration.sdk_web, sdk_ios, sdk_android, no_code, support_hours.

Rescore: 4.3 -> 4.3 (80% of weight scored; pricing n/d, no figures and no third-party data).

Score flag: none (no incident, sale or shutdown). Two content notes for the next fact pass, not changed here:
- Con "Australian-based group with no published hosting region" is now contradicted by the homepage, which lists regional instances for Oceania, Europe, Southeast Asia and the GCC (source 1).
- The "Start free trial" button on the screening page goes to the contact page, so screening has no self-serve trial; only transaction monitoring does.
- Neurocom Group to Nexiant AI Pty Ltd legal link still unconfirmed (as in October notes).
