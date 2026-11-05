# AU10TIX: fact re-check 2026-10-18

## Changed

- Pricing "does not publish pricing" → published plans: Basic KYC and Enhanced KYC each with a $500 monthly minimum, Enterprise quoted; per-check prices not published (source 1). Verdict, summary, FAQ, con and user theme updated.
- Funding "$80M raised (TPG, Oak HC/FT)" → confirmed and itemised: $60M TPG (Jul 2019) and $20M Oak HC/FT (Nov 2019) preferred shares (source 5, ICTS 20-F on SEC EDGAR).
- Ownership "subsidiary of ICTS International" → ICTS holds 68.69% (as of the June 2021 share sale), Oak 12.87%, GF 10.93%, TPG 7.51% (source 5).
- Founded 2002 kept, now sourced to vendor boilerplate (source 4, which says founded in the Netherlands).
- HQ "Hod Hasharon, Israel" → Offices: London, New York, Singapore; R&D in Israel and Eastern Europe (source 4).
- Fraud prevented "$24B+" → "over $33 billion" (source 4, company-reported).
- Features rewritten to match the plan feature lists (180+ forgery tests, deepfake and injection detection, Serial Fraud Monitor, consortium verification, KYB, age estimation, Reusable Digital ID) (source 1).
- Certifications added (all vendor-stated): UK DIATF (RTW, RTR, DBS; Kantara Initiative UK), ISO/IEC 27001, ISO/IEC 27701, SOC 2 Type II, iBeta ISO/IEC 30107-3 L1 and L2, Kantara IAL2, TX-RAMP L2 (sources 2, 4).
- Pro "Fully automated verification in 4 to 8 seconds" → "Automated verification with UK DIATF certification for right to work, right to rent and DBS checks".
- Con "Enterprise-oriented, less self-serve" → "$500 monthly minimum on entry plans rules out very low volumes"; con "No published pricing" → "Per-check prices are not published".
- User ratings: G2 4.5 from 43 reviews (source 6). Counts and legacy note removed.

## Removed / unverifiable

- "4 to 8 seconds" verification time (verdict, feature, pro, FAQ, seo.description, user theme). Vendor homepage case study cites "within 10 seconds"; FAQ now says no standard time is published.
- Founders "Ron Atzmon and Gil Atzmon"; "roughly 205 employees"; HQ "Hod Hasharon/Tel Aviv".
- Feature "Cryptographic signature validation against government data sources" and "Facial and data cross-checks against official databases": replaced by "database verification" (Enterprise plan), the only matching current claim.
- "billions of verifications" as a feature (vendor says "authenticated billions of identities"; not a countable fact).

## Ranking cards

- AU10TIX has no entry in `src/_data/rankings.yml` (no `slug: au10tix`).

## Score flag

- None. Company active; finding is that pricing is partly published (favourable). Ownership unchanged (ICTS majority).

## Follow-up 2026-10-22

### Changed
- Owner: "ICTS International N.V. (68.69% as of the 2021 share sale)" → "ICTS International N.V. (66.30% as of 31 Dec 2025)" (source 7, FY2025 20-F; Oak 12.42%, GF 10.55%, TPG 7.25%).
- UK DIATF certification: vendor_stated → confirmed. Register entry for AU10TIX Ltd, Identity Document Verification Suite: Right to Work, Right to Rent, DBS; assessed by Kantara; certificate 29 Dec 2025 to 29 Dec 2028 (source 8).
- User ratings: G2 4.5 / 43 → 4.5 / 46 (source 6); Capterra 5.0 / 3 added (source 9).
- User review themes rewritten from the 3 Capterra reviews: praise speed and support; criticism of thin API docs and pricing competitiveness (one review each). "Fraud detection" praise and "self-serve access" criticism removed (not seen in visible reviews).
- Pricing re-checked: Basic KYC and Enhanced KYC $500 monthly minimum, Enterprise quoted, no per-check prices (source 1). No change.
- Consortium of "over 60 leading companies" and "100% automated" re-confirmed in source 4. "Within 10 seconds" case study still on homepage.
- last_verified and updated → 2026-10-22.

### Removed / unverifiable
- Resolved notes dropped: HQ, 4 to 8 seconds, $24B figure, 2021 ownership percentages.
- Still unresolved: founding year conflict (vendor 2002 vs CTech 2010); airport and border-security roots not stated by AU10TIX itself; ISO 27001, ISO 27701, SOC 2, iBeta L1/L2, Kantara IAL2 and TX-RAMP remain vendor-stated (no letters or register entries opened).
- Trust Center also lists a German KJM age-verification evaluation and US gaming supplier registrations; not added (fact pass only).

### Ranking cards
- AU10TIX has no entry in `src/_data/rankings.yml` (no `slug: au10tix`).

### Score flag
- None. UK DIATF is now register-confirmed (favourable). Preferred shareholders gained exit rights from 3 Jul 2026 per the 20-F; no sale announced. Worth watching.

## Follow-up 2026-10-30 (AML screening capabilities)

- identity_verification: yes. https://www.au10tix.com/products/identity-verification-suite/ (source 13)
- sanctions_pep: yes. https://www.au10tix.com/solutions/aml-screening/ (source 12)
- adverse_media: yes. https://www.au10tix.com/solutions/aml-screening/ (source 12)
- transaction_monitoring: yes. https://www.au10tix.com/solutions/compliance-suite/ (source 14; one line, "Continuous monitoring of transactions for unusual activities", no product detail)
- No existing values changed (the four keys were empty). capabilities.checked stays 2026-10.

## v3.1 fields 2026-11-05

- pricing.model: published partial ($500 monthly minimum on Basic and Enhanced, per-check price quoted), minimum true, trial false, source 1.
- integration: sdk_web, sdk_ios, sdk_android yes (15); no_code partial (low-code WebApp and setup wizard, 16); docs_public not_disclosed (no public developer docs found); sandbox not_disclosed; support_hours not_disclosed.
- coverage: countries 190, document_types 5000 (AU10TIX vs Veriff page, 17); non_doc add_on (database verification on Enterprise, 1).
- track_record: ownership stable (ICTS majority owner, no sale announced, 7); incidents none in window.
- capabilities: liveness yes (13); injection_detection add_on (Enhanced KYC plan, vendor-stated, no lab letter, 1); reusable_id add_on (Enterprise plan, 1); data_residency partial ("flexible residency" claim with no detail, 17); case_management yes (from Basic KYC, 1).
- Still not_disclosed: docs_public, sandbox, support_hours. KYB is listed on the Enterprise plan but no registry detail, so kyb_registry not added.
- New sources 15 to 18. Source 18 is AU10TIX's 28 Jul 2025 statement on the June 2024 credential exposure.
- Score flag (for review): the admin-credential exposure was discovered June 2024 and reported by 404 Media that month, so it falls before the Nov 2024 incident window and is not listed in incidents. Owner may want to decide whether the July 2025 clarification counts. Preferred shareholders' exit rights from Jul 2026 remain; no sale announced.

## v3.1 breadth keys 2026-11-05

- ongoing_monitoring: yes, source 12 (periodic AML screenings by risk profile)
- kyb_registry: yes, source 19 (new: Business Verification page, 200+ jurisdictions, government databases)
- kyb_ubo: yes, source 19
- kyb_entity_screening: add_on, source 19 (Enterprise tier)
- kyb_monitoring: add_on, source 19 (Enterprise tier)
- kyb_documents: yes, source 19 (Proof of Business)
- kyb_pricing: not added (outside this brief)
- transaction_monitoring, video_ident, reusable_id, case_management: unchanged
