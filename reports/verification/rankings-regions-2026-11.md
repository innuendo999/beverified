# Ranking re-check: Mexico, India, Canada, South Africa, Peru (18 Nov 2026)

Why: oldest regional copy on the site; fluff test hits in the site audit of 18 Nov 2026. Formal 90-day date was mid-January 2027.

Method: as for Liveness, Crypto KYC and Brazil (`rankings-liveness-crypto-brazil-2026-11.md`): every card against the provider record; category copy (quick answer, explainer, FAQ) checked for facts without a source, claims we do not measure and speculation; KYCAID's country checks re-read on kycaid.com/pricing (18 Nov 2026); Mexico's fintech count checked against Finnovista's Fintech Radar México VIII (16 Feb 2024). Scores and order unchanged.

## Changes

| Where | Before | After | Basis |
|---|---|---|---|
| Mexico, Canada, India, Peru quick answers | Compared on "decisioning speed", "Ley Fintech readiness", "bilingual support", "SBS-category mapping" | Compared on what the records hold (document and liveness checks, national ID number checks, AML screening, pricing, coverage) | We do not measure speed or readiness |
| Mexico, Peru: Veriff award | Best for Biometric Accuracy | Best for Self-Serve Pricing | We do not measure accuracy; Veriff publishes self-serve plans (record) |
| Mexico explainer and FAQ | "773 fintech startups as of 2024"; "$159.1 million by 2030" (no source) | 773 Mexican fintechs at the end of 2023 plus 217 foreign ones, Finnovista Fintech Radar México, Feb 2024; market projection removed | Finnovista |
| Mexico explainer | "Straight-through decisioning built to handle high applicant volume" | removed | Fluff test |
| India quick answer, KYCAID card | "Aadhaar OTP checks on its published price list" | Aadhaar number check at €0.80 | kycaid.com/pricing, 18 Nov 2026 (no India OTP check listed) |
| India quick answer | Signzy "has the deepest India-specific coverage, including … RBI-compliant V-CIP" | Signzy "covers India-specific checks, including CKYC search and V-CIP video verification" | Signzy record; "RBI-compliant" is Signzy's own claim |
| India, Onfido | Award "Best Document-Fraud Detection"; pro "AI document models built on tens of millions of verifications" | No award; pro attributed "per Entrust" | We do not measure document-fraud detection |
| India, Signzy card | Award "Best India-Specific Registry Depth"; pros "Deep … integration", "Strong relationships with Indian banks"; con "Smaller international brand recognition" | Award "Best for CKYC and Video KYC" (only ranked provider with CKYC); pros from the record (Aadhaar, CKYC, V-CIP; face match against PAN and Aadhaar; penny drop, IFSC, Aadhaar eSign); con "No outcome found for its unassisted video KYC in the RBI regulatory sandbox" | Signzy record and verification notes |
| India explainer and FAQ | "UPI-speed decisioning"; "Why does UPI matter for KYC in India?" | removed | Speculation, no source |
| Canada explainer and FAQ | "Bilingual EN/FR support is expected for … federally regulated entities nationwide"; "PIPEDA-aligned data residency" | French for customers in Quebec, with what to ask the vendor; "clear answers on where data is stored and processed, for PIPEDA" | PIPEDA has no data residency rule; the federal claim had no source |
| Peru explainer | "keeps latency low as onboarding volume spikes"; "Transaction monitoring calibrated for SBS reporting thresholds"; "Peru's growing digital-asset activity"; "A mismatch here is one of the most common reasons onboarding stacks fail local audits" | removed; DNI reading and DNI number checks against government data kept | No source for any of these |
| Peru FAQ | 6 questions, 3 of them on the unsourced claims above | 3 questions; DNI answer names KYCAID's €0.10 DNI number check | kycaid.com/pricing, 18 Nov 2026 |
| South Africa, KYCAID con | ID number checks "no price is published" | priced €0.10 to €0.80, data source not named | kycaid.com/pricing, 18 Nov 2026 (SAID Datamatch €0.10, SAID check €0.20, SAID with photo €0.80) |
| All five | `legacy_price_shown` | `price_source: record` | Same figures as the reviews, with the verified month |

South Africa copy (re-checked 21 Oct 2026) needed no other change.

## Follow-ups (not in this PR)

- KYCAID record: its pricing items still say Aadhaar OTP and no SAID price; update in the next KYCAID record re-check (the ranking cards above already use the pricing page of 18 Nov 2026).
- Mexico, India, Canada and Peru have no eligibility rule like the UK (DVS register), Nigeria (NIN/BVN check) and Australia (DVS). A rule per country (for example a documented CURP, Aadhaar or DNI number check) would decide who is ranked; owner decision.
