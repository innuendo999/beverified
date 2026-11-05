# VerifyMy: fact re-check 2026-10-18

Record: `src/_data/providers/verifymy.yml`

## Changed

- Founded and HQ: 2019 and London now sourced to Companies House (Verifymy Limited, 12050874, incorporated 14 June 2019, registered office London EC2A; source 3). Previous name KYC AVC UK Ltd until 11 June 2024.
- History: "launched as VerifyMyAge" kept, sourced to a 2022 interview with founder and CEO Ryan Shaw (source 7) and the about page, which says it "launched with age assurance" in 2019 (source 2).
- Offices: London, Lisbon and São Paulo added (source 2).
- Methods: added mobile number, name and address, ID with face match, Brazilian CPF checks; "AI-driven age estimation from short video capture" → facial age estimation (sources 1, 6).
- Content moderation: now lists creator identity and consent, pre-recorded and livestream moderation, complaints and case management (source 1).
- Certifications added: ISO/IEC 27566-1:2025 + ACCS 1:2025 for the age assurance platform, valid to 20/05/2029, confirmed on the ACCS register; IEEE 2089.1-2024 for the face age estimation API, valid to 21/09/2027, confirmed (source 4). KJM approval vendor-stated (source 1).
- Pricing: confirmed no published pricing; "Book a demo" only (source 6).
- FAQ "Does VerifyMy do full identity verification?": "No" → it offers ID and face match checks, but for age assurance and creator consent, not KYC/AML.
- Pros/cons: privacy pro replaced with the confirmed ISO/IEC 27566-1 certification; funding con replaced with "few public user reviews".

## Removed / unverifiable

- "Smaller scale and funding than general-purpose IDV competitors": funding not checked; removed.
- "Privacy-preserving, proportionate verification designed to minimize user friction": general marketing phrasing, not checked; removed.
- User review themes ("frequently cited" email estimation, sector focus, scope, pricing opacity): G2 shows no reviews and Trustpilot has one review; themes removed and legacy note set to null.

## Ranking cards

`age-verification` entry (`slug: verifymy`):
- Tagline "Age assurance only, including email-based age estimation, with ISO/IEC 27566-1 certification and German KJM approval." → partly out of date. VerifyMy now also offers identity verification, content moderation and consent. Suggested: "Age assurance and content moderation, including email-based age estimation, with ISO/IEC 27566-1 certification and German KJM approval."
- Pro "Email address age estimation, plus mobile, credit bureau, facial estimation, ID and credit card checks" → "credit bureau" not found on VerifyMy's pages. Suggested: "Email address age estimation, plus mobile, name and address, facial estimation, ID and credit card checks".
- Pro "States ISO/IEC 27566-1 certification by the Age Check Certification Scheme" → now confirmed on the ACCS register. Suggested: "ISO/IEC 27566-1 certified, confirmed on the ACCS register".
- Pro "States German KJM approval" → correct as worded (vendor-stated).
- Con "Age assurance only, so KYC or AML needs a second vendor" → mostly right; suggested: "No KYC or AML screening, so regulated KYC needs a second vendor".
- Con "No public pricing" → correct.

## Score flag

None.

## Follow-up 2026-10-22

### Changed
- user_ratings added: Gartner Peer Insights 4.3 from 9 ratings, Age Assurance Software (source 11). G2 still shows no reviews; Trustpilot still one 1-star review (Dec 2025) on an unclaimed profile, not added.
- Con 3: "Few public user reviews (none on G2, one on Trustpilot as of October 2026)" → "Few public user reviews (9 ratings on Gartner Peer Insights and none on G2 as of October 2026)" (sources 8, 11).
- KJM approval: source homepage (1) → VerifyMy blog of 27 Jun 2022 stating KJM approved its facial age estimation (source 10). Still vendor_stated. Certification `what` and the "Is VerifyMy certified?" FAQ now say what was approved and when.
- ACCS register re-checked: ISO/IEC 27566-1:2025 and ACCS 1:2025 (Verifymy Age Assurance Platform v1.0.1026) valid to 20/05/2029; IEEE 2089.1-2024 (Age Estimation API) valid to 21/09/2027 (source 4). No change.

### Removed / unverifiable
- Notes closed: video age estimation (corrected on 18 Oct), UK DIATF (VerifyMy not on the gov.uk DVS register, all 66 entries checked on 22 Oct; never claimed), ACCS validity dates (confirmed).
- Still unresolved: KJM database listing (only page 1 of 10 loads), 35M+ users (vendor figure, no date or method). Funding not on the page (CB Insights lists USD 6.34M; no primary source).

### Ranking cards
`age-verification` entry (`slug: verifymy`): tagline, pros and cons already carry the 18 Oct corrections and remain accurate. "Few independent user reviews to judge support by" still holds (9 Gartner ratings). No changes needed.

### Score flag
- None.

## v3.1 fields 2026-11-05

### Added
- `pricing.model`: published none, minimum null, trial null (6).
- `integration`: docs_public yes (15); sdk_ios, sdk_android partial, WebView guide only (15); sandbox partial, sandbox environment, access route not stated (16); no_code yes, Shopify, WooCommerce and eBay apps (17); sdk_web, support_hours not_disclosed.
- `coverage`: countries null, document_types null; non_doc yes, email, mobile, credit bureau, card and CPF checks (12).
- `track_record.ownership`: changed_disclosed (18). `incidents`: none found.
- `capabilities` (missing standard keys): identity_verification yes (12); case_management yes (1). New: liveness, injection_detection, reusable_id, data_residency not_disclosed.
- Sources 15 to 18 added.

### Still not_disclosed
- Liveness, injection detection, country count, support hours, data residency.

### Score flag
- Ownership: Companies House shows Ryan Shaw ceased as person with significant control on 9 Sep 2025 and Gethin James Taylor notified as PSC the same day (18). The about page still names Ryan Shaw as Founder and CEO; no announcement found. Check before the next content pass.
- v3.1 draft: 4.4 -> 2.8 on 40% of weight (fraud defense, pricing, coverage n/d).
