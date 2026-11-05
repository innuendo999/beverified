# iDenfy: fact re-check 2026-10-18

## Changed
- Pricing: "Custom, contact for current rate" → published self-serve rate $1.35 per verification, $135 monthly minimum (Basic/Premium); Enterprise tailored, as low as $0.50 per check; 14-day trial with 10 free checks (source 1).
- Pay-per-approved: "you only pay for verifications that pass" (core model) → approved-only billing is a paid add-on at +$0.50 per verification (source 1). Tagline, verdict, pros, FAQ and facts updated.
- Human review: "human review on every verification case" → in-house experts double-check verifications (source 3); 24/7 manual review is a +$0.45 add-on (source 1).
- "up to 70% savings versus pay-per-completed models" → removed from pricing summary; homepage only says "up to 70% lower costs" with no baseline (source 3).
- Company: legal entity UAB "iDenfy", Kaunas (sources 4, 5); founded 2017 and CEO Domantas Ciulde confirmed (source 2); team 50+, offices in UK and USA added (source 2).
- Coverage added: 200+ countries and territories, 16,000+ documents, 180+ company registries in 120 countries, 1,000+ businesses (source 3).
- Features: "fraud scoring" → risk assessment; added transaction monitoring and UBO verification (source 3).
- Con "Mobile UX on low-spec devices is worth testing, per reviews" (unsourced) → add-on pricing for approved-only billing, AML, 24/7 review and 3D liveness (source 1).
- Certifications added: ISO/IEC 27001:2022, cert ISMS-1851/A by CERT International, valid 3 Jun 2026 to 2 Jun 2029 (confirmed, source 4); SOC and iBeta ISO 30107 (vendor-stated, source 3).
- User ratings: G2 4.9 / 5 from 243 reviews (source 6); Trustpilot 4.2 / 5 from 31 reviews (source 7). Review themes rewritten from what Trustpilot shows.

## Removed / unverifiable
- "originally Identifikaciniai Projektai" and co-founder Gediminas Ciulde: not found on any page opened.
- "EU-hosted option" and "templates for EEA national ID documents": not found on any page opened.
- "Competitive pricing against premium vendors, with strong API documentation" (pro): replaced with the published price.
- iBeta ISO 30107-3 result: not on iBeta's public list; left as vendor-stated.
- "frequently cited" count in review themes.

## Ranking cards
- `age-verification` card, pro "Charges only for approved verifications": now a paid add-on (+$0.50 per check). Suggest "Option to pay only for approved verifications (add-on)".
- `age-verification` tagline "billed only for approved verifications": same issue. Suggest "Document and non-document age checks, with an approved-only billing option."
- `age-verification` con "No price shown on the age verification page": the age page was not opened; the main pricing page does publish $1.35 per check (source 1). Suggest "Age-specific pricing not published separately".

## Score flag
- Possible: the headline pricing model (pay only for approved checks) is no longer the default and costs +$0.50 per check. Pricing became more transparent at the same time. Flag for editorial review; score unchanged.

## Follow-up 2026-10-22

### Changed
- Pricing plans: "Basic / Premium $1.35 per verification, $135 minimum" → Basic $1.35 per verification, $135 monthly minimum; Premium $1.30 per verification, $325 monthly minimum (sources 8, 9). Summary, plans, items, facts, verdict, FAQ and seo.description updated.
- Enterprise lowest stated rate: $0.50 → $0.55 per verification (source 8).
- Approved-only billing +$0.50 per check: kept, re-cited to the ROI calculator (source 10); source 1 (/pricing/) now shows only a quote form.
- AML add-on: +$0.45 → +$0.40 per verification (source 10, calculator estimate).
- 24/7 manual review add-on: +$0.45 → +$0.35 to +$0.55 per verification, by plan (source 10). FAQ answer updated.
- Free trial (14 days, 10 checks): re-cited to billing docs (source 9).
- Certification "SOC (type not stated)" → SOC 2 Type II, 12-month audit period, vendor-stated (source 11). iBeta ISO 30107-3 re-cited from homepage to compliance docs (source 11); still vendor-stated.
- Feature "Proxy detection, device and phone checks, and risk assessment" → "Proxy detection, phone validation and verification, address checks and risk assessment" (source 12). NFC (source 13) and transaction monitoring (source 14) now have sources.
- User ratings: Trustpilot 4.2 / 31 → 4.1 / 29 (source 7); Capterra 4.7 / 10 added (source 15); G2 unchanged at 4.9 / 243 (source 6).
- last_verified and updated → 2026-10-22.

### Removed / unverifiable
- "16,000+ government-issued documents" in what_is: homepage now says 3,500+ active documents, AI info page says 16,000+ document types. Number removed.
- "device checks": not in iDenfy's fraud-prevention docs.
- Resolved notes dropped: SOC type, former name and co-founder (already removed), "up to 70%" claim (already removed).
- Still unresolved (in verification_notes): Lithuanian register not opened (aggregator scoris.lt shows a different Kaunas address); ISO 27001 certificate number conflict (CERT International ISMS-1851/A vs TUV Thuringen 1512120135 in iDenfy docs); no iBeta letter; add-on prices exist only as calculator estimates; a second pricing page variant shows Enterprise at $0.90 with a 6,000 per year minimum.

### Ranking cards
- `age-verification`, con "$135 monthly minimum on the self-serve plans" → "$135 monthly minimum on the Basic plan ($325 on Premium)" (source 9).
- Other card text (approved-only +$0.50, 24/7 review add-on, legacy_price_shown $1.35/verification) still matches.

### Score flag
- None new. Pricing is still published; Premium and Enterprise figures changed slightly.

## Follow-up 2026-10-30 (AML screening capabilities)

Filled `capabilities` keys from vendor pages opened 2026-10-30. No existing values changed (all four keys were empty). Score, prose, `last_verified` and `updated` untouched.

- `identity_verification`: yes (ID check plus face match, all tiers); source 21, https://idenfy.com/pricing-plans/
- `sanctions_pep`: add_on (separate AML screening plans); source 21, https://idenfy.com/pricing-plans/
- `adverse_media`: add_on (separate AML screening plans); source 21, https://idenfy.com/pricing-plans/
- `transaction_monitoring`: add_on (separate Transaction Monitoring product); source 22, https://idenfy.com/transaction-monitoring-software/

- Note: AML screening (PEP and sanctions, company sanctions, adverse media, ongoing monitoring) is sold under its own Silver/Gold/Platinum plans with separate credits. Liveness is listed as a per-verification add-on; face matching is in all IDV tiers.

## Pricing re-check 2026-11-02 (KYC Pricing Index)

Checked: idenfy.com/identity-verification-price, documentation.idenfy.com pay-as-you-go billing page, idenfy.com/savings/ on 2 Nov 2026. `updated` → 2026-11-02; `last_verified` unchanged.

- Removed: "AML screening add-on (ROI calculator) +$0.40 per verification". The ROI calculator no longer shows an AML add-on price (source 10).
- Unchanged and re-dated to 2026-11: Basic $1.35 / $135 minimum, Premium $1.30 / $325 minimum, Enterprise lowest $0.55, approved-only +$0.50, 24/7 manual review $0.35 to $0.55, 14-day trial with 10 checks.
- Ranking cards: no iDenfy card mentions the AML add-on price; nothing to change.

## v3.1 fields 2026-11-05

### Added

- `pricing.model`: published core, minimum true ($135 and $325 monthly minimums), trial true (14 days, 10 free checks), source 9.
- `integration` (checked 2026-11): docs_public yes (24); sdk_ios, sdk_android yes, plus React Native and Flutter wrappers (24); sandbox yes, free trial and sandbox API keys (9); no_code yes, Magic Link "No coding required" and plugins (25); support_hours partial, Premium lists an SLA, no support hours published (8); sdk_web not_disclosed (iFrame and redirect only, no web SDK listed).
- `coverage`: countries 200, document_types 3,500 (homepage "3500+ active government-issued documents", source 3); non_doc yes, Soft KYC database checks for LT, HU, UK, US (27).
- `track_record`: ownership stable (2); incidents none found (a Lithuanian DPA fine of 2026 found in search concerns UAB DELSKA Lithuania, not iDenfy).
- `capabilities`: liveness yes, passive and active 3D (23); injection_detection yes, optional injection and virtual camera check, vendor docs only (23); data_residency partial, EU by default, specific jurisdictions on Enterprise, regions not named (26); reusable_id not_disclosed (face re-authentication for returning users only).
- New sources 23 to 28.

### Still not_disclosed

- sdk_web, reusable_id, video_ident, age_email_estimation, age_mobile_operator, age_credit_card, age_open_banking.

### Conflict for owner

- Document count: homepage says 3,500+ active documents; the docs page (source 28) says 16,000+ document types across 200+ countries. The lower homepage figure is recorded. With 16,000 the coverage sub-score would be 5 instead of 3.5.

### Rescore

- 4.5 -> 3.7 (scored weight 100%).

### Score flag

- None.

## v3.1 breadth keys 2026-11-05

- ongoing_monitoring: add_on, source 21 (daily PEP and sanctions monitoring in separate AML plans)
- case_management: yes, source 21 (verifications case management portal; KYB case management)
- video_ident: not_disclosed (unchanged)
- reusable_id: not_disclosed (unchanged)
