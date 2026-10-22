# SEON: fact re-check 2026-10-18

## Changed
- Identity verification: "not a document or biometric verification tool on its own" (verdict, cons, FAQ) → SEON launched identity verification with document checks, biometric liveness and proof of address on 19 January 2026, Europe first (sources 5, 6).
- Starter plan: "entry-level fraud and AML screening" → $699/month with 2,500 fraud checks, 10 users and 50 custom rules; AML compliance and case management are Premium-only (source 1).
- Signals: "over 900 digital and device signals" → "more than 1,100 first-party data signals" (sources 2, 4).
- Offices: Singapore added (opened May 2025, source 2); HQ Austin, TX confirmed (source 3).
- Funding: added $80M Series C led by Sixth Street, September 2025, $187M total (source 9).
- Rule builder: "natural-language rule builder" → AI-assisted rule creation from a plain-language description (source 4).
- Cons rewritten: IDV is new (Jan 2026); Premium pricing unpublished; AML and case management not in Starter.
- Certifications added as vendor-stated: ISO 27001, SOC 2 Type 2 (source 7).
- User ratings: G2 4.6 from 394 reviews (source 10).

## Removed / unverifiable
- "Document/biometric gap" user-review theme (no longer accurate) and "(frequently cited)" labels.
- No ISO certificate or register entry opened; trust centre content did not load.

## Ranking cards
- No entries with `slug: seon` in `src/_data/rankings.yml`.
- Data bug in this record (not changed, do-not-change field): `alternatives[2]` is `slug: aml` with `name: Sardine`; it should be `slug: sardine`.

## Score flag
- Possible. SEON now has its own document and liveness IDV (Jan 2026), which removes a core con the score was built on. Also, the Starter plan does not include AML, so "fraud and AML from $699" was overstated. Editor should review; score not changed.

## Follow-up 2026-10-22

### Changed
- Pricing re-checked against the pricing page (source 1): Starter $699/month, 2,500 fraud checks (the comparison table calls them "2,500 API calls/month"), 10 users, 50 custom rules, no AML compliance or case management; Premium custom with unlimited API calls, users and rules plus AML and case management; free trial offered with no stated length. No change needed.
- Company facts re-checked: founded January 2017, HQ Austin, 5,000+ businesses, 1,100+ first-party signals, $300B+ fraud losses prevented (sources 2, 3); $80M Series C led by Sixth Street, $187M total (source 9). No change.
- IDV feature: "document checks, selfie liveness and proof of address" → "document checks (including NFC chip reading), selfie liveness and proof of address" (source 6, product page FAQ). Launch date 19 January 2026 and Europe-first rollout re-confirmed (source 5).
- Certifications: added ISO/IEC 27017 (cloud security) as vendor_stated (new source 11, SEON Trust Center). ISO/IEC 27001 and SOC 2 Type 2 remain vendor_stated; the Trust Center now loads but gives no auditor, date or certificate number.
- User ratings: G2 4.6 from 394 reviews re-confirmed (source 10); added Capterra 4.9 from 56 reviews (new source 12).
- Verification notes merged and reworded; the note that trust.seon.io did not load is resolved.

### Removed / unverifiable
- Nothing removed. Still unverifiable: certificate or register entry for ISO/IEC 27001, ISO/IEC 27017 and SOC 2 Type 2 (Eurocert register search found nothing); document-type and country counts and any ISO/IEC 30107-3 test for the IDV product; rollout beyond Europe.

### Ranking cards
- No entries with `slug: seon` (and no mention of SEON) in `src/_data/rankings.yml`. Nothing to correct.

### Score flag
- None new. The earlier flag (own IDV since January 2026; AML not in Starter) still stands for editor review.

## Re-score 2026-10-22

Owner-approved direction: raise from 4.5. **Not applied.** `score`, `grade` and `score_breakdown` in seon.yml are unchanged (4.5 Very Good, empty breakdown), because scoring the record's facts on the same scale as the other breakdowns gives a lower score, not a higher one. Owner decision needed.

Proposed breakdown (facts from the record only):

| Criterion | Weight | Sub-score | Evidence | Basis |
|---|---|---|---|---|
| Compliance & certifications | 25 | 4.3 | vendor | ISO/IEC 27001, ISO/IEC 27017 and SOC 2 Type 2 are vendor-stated only (no auditor, date or certificate number; 2020 note names Eurocert); no ISO/IEC 30107-3 test for the new liveness check |
| Coverage | 20 | 4.4 | vendor | 1,100+ signals, AML screening and transaction monitoring, own document, NFC, liveness and proof-of-address IDV since Jan 2026; IDV Europe first, no document or country counts |
| Pricing transparency | 20 | 4.3 | vendor | Starter $699/mo published with limits and exclusions; Premium, which holds AML and case management, is quote-only; trial length not stated |
| Integration & API depth | 15 | 4.1 | vendor | Sold as an API with call limits per plan; API docs, SDKs and sandbox not described in the sources |
| Support responsiveness | 10 | 4.0 | user | Large G2 and Capterra review base, but review text (including support comments) not visible; no published hours or SLA in the sources |
| Track record | 10 | 4.6 | independent | Founded 2017, 5,000+ businesses, $80M Series C (Sept 2025); no adverse findings in the record |

Arithmetic: (25 × 4.3 + 20 × 4.4 + 20 × 4.3 + 15 × 4.1 + 10 × 4.0 + 10 × 4.6) / 100 = (107.5 + 88 + 86 + 61.5 + 40 + 46) / 100 = 429 / 100 = 4.29 → 4.3 (Good).

Why it cannot reach 4.6: on the current scale, vendor-stated certification scores about 4.2 (enigma) and public certificates 4.3 to 4.5 (21analytics, paravision); pricing with one tier published sits below zyphe (4.5) and enigma (4.9, full rate card). Scoring every criterion 0.2 higher still gives 449 / 100 = 4.49 → 4.5. G2 and Capterra ratings are excluded by the methodology. Options: keep 4.5 with no breakdown; publish the breakdown at 4.3; or add verifiable evidence first (certificate register entries, an ISO/IEC 30107-3 result, public API docs) and re-score.
