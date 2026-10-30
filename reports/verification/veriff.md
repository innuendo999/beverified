# Veriff: fact re-check 2026-10-18

Record: `src/_data/providers/veriff.yml`

## Changed

- Pricing model: "Essential $49/month, Plus $99/month, Premium $209/month" → monthly minimums ($49 / $99 / $209) **plus** per-verification fees ($0.80 / $1.39 / $1.89); Enterprise quoted for 5,000+ verifications a month; add-ons PEP and sanctions +$0.64, monitoring +$0.09, 2-year retention +$0.30; 15-day trial up to 50 sessions (Veriff pricing and self-serve plans pages, sources 1 and 2).
- Human review: "AI plus human review" → hybrid review applies to Plus and Premium only; Essential is fully automated (source 2).
- Document coverage: "12,000+ document types" → "12,500+ government-issued ID documents" (Veriff homepage and about page, sources 3 and 4).
- Founded: "October 2015" now sourced to the Estonian e-Business Register (Veriff OÜ, registered 20.10.2015, legal address Tallinn; source 5).
- Liveness: "iBeta Level 2 certified" → confirmed on iBeta's PAD letters list (Level 2 on 08/29/24 and Level 1 on 07/16/24, Veriff Biometric Liveness 7.1.0; source 6). The test covered passive liveness (source 7).
- Unicorn wording: "a unicorn since raising venture funding" → $100M Series C at a reported $1.5B valuation in early 2022 (FinTech Futures, source 15).
- BrowserID acquisition dated January 2019 (Tech.eu, source 14).
- Added: UK DIATF register entry "Veriff UK Identity Verification Service", Identity and Component roles, Right to Work and Right to Rent, certified 14 Jan 2026, expires 14 Jan 2029 (GOV.UK register, source 9).
- Added: ISO/IEC 27001:2022 (with 27017/27018), SOC 2 Type II and Cyber Essentials as vendor-stated (source 8).
- Added: KYB from 300+ jurisdictions via a limited access program after the Vespia acquisition (sources 11, 12, 13); selfie-based age estimation (source 17).
- Cons: replaced "archive-access limits" and "low-bandwidth mobile" with themes visible on G2 (verification issues, expensive) and Trustpilot (end-user capture failures); added user ratings G2 4.5 (60 reviews) and Trustpilot 1.3 (239 reviews).

## Removed / unverifiable

- "48 languages": Veriff's about page says 48, the homepage says 50; number removed from prose.
- Offices in London (2020) and Barcelona (2021): not confirmed; removed. New York (2019) kept from Wikipedia only.
- "Archive access limits" and "low-bandwidth connections slow decisions" as user review themes: not found on G2; removed.
- Old user review legacy note with "as of Jul 2026" aggregation: removed.

## Ranking cards

Entries in `src/_data/rankings.yml` (canada, e-kyc, kyb, liveness-detection, mexico, peru, age-verification):

- All entries, `legacy_price_shown: Custom pricing` → wrong. Suggested: "From $49/mo minimum + $0.80 per verification".
- liveness-detection, con "Pricing not published" → wrong. Suggested: "Per-verification fees on top of a monthly minimum".
- canada, e-kyc, mexico, peru, liveness-detection, pro "Median decision time under 30 seconds" / "Median capture time under 30 seconds" → not supported. Veriff states a 6-second average IDV decision and sub-second liveness responses. Suggested: "Veriff states a 6-second average decision".
- e-kyc, pro "Reads NFC chip and MRZ across 190+ document types" → conflicts with Veriff's 12,500+ documents from 230+ countries; NFC not checked. Suggested: "Supports 12,500+ ID documents from 230+ countries, per Veriff".
- canada, mexico, peru, e-kyc, con "AML/watchlist screening sold separately" → correct (PEP and sanctions +$0.64 per verification).
- canada, mexico, peru, e-kyc, pro "Industry-leading liveness detection" → opinion. Suggested factual version: "iBeta ISO/IEC 30107-3 Level 2 tested liveness".
- liveness-detection, con "Liveness sold as part of a broader package, not standalone" → not confirmed; Veriff has a separate Liveness product page. Suggested: remove or "Check whether liveness can be bought on its own".
- kyb, pro "Real-time director-to-applicant biometric match" → not confirmed on Veriff's KYB page. KYB is offered via a limited access program after the Vespia acquisition. Suggested con: "KYB offered through a limited access program as of Oct 2026".
- canada / mexico / peru pro "Reads passports, provincial licences, and PR cards" / "INE" / "DNI" → not checked document by document.
- age-verification card: "Lists ISO/IEC 30107-3 presentation attack testing" correct; "No published accuracy figures for age estimation" correct.

## Score flag

None. No finding suggests a lower score; published pricing and new UK DIATF certification were confirmed.

## Follow-up 2026-10-22

### Changed

- Pricing re-checked against the pricing and self-serve plans pages (sources 1, 2): Essential $49 minimum + $0.80, Plus $99 + $1.39, Premium $209 + $1.89, Enterprise quoted for 5,000+ a month, PEP and sanctions +$0.64, monitoring +$0.09, 2-year retention +$0.30, 15-day trial up to 50 sessions with no credit card. All unchanged.
- Pricing items: added "Additional extracted data fields (Plus and Premium) +$0.30 per verification" (source 1).
- Co-founder: "Janer Gorohhov is also listed as a co-founder" (Wikipedia only) → "Veriff also names Janer Gorohhov as a co-founder" (Veriff podcast page, 27 July 2023, source 20). Same change in the "Who founded Veriff?" FAQ.
- New York office: "opened its first foreign office in New York later that year" → "opened a New York office in November 2019" (Cision release, 13 November 2019, source 21). "First foreign office" not confirmed and dropped.
- Fact added: Languages "50 languages and dialects" (about page, source 4; homepage also says 50, source 3). The 48 vs 50 conflict is gone.
- Certifications added, confirmed on the FIDO Alliance certified products register (source 22): FIDO Face Verification Level 2 (Full Auto IDV, Ingenium Biometric Laboratories, expires 13 Nov 2029) and FIDO DocAuth (Full Auto IDV, expires 1 Oct 2029). Veriff press release of 22 April 2026 (source 23).
- User ratings added: Capterra 4.7 from 3 reviews (correct listing /p/197760/Veriff/, source 24); Gartner Peer Insights 4.3 from 8 ratings (source 25). G2 4.5 from 60 and Trustpilot 1.3 from 239 unchanged.

### Removed / unverifiable

- Pricing add-on "Total: $0.09" and the $660.00 calculator figure still do not reconcile with listed prices; only per-unit figures shown.
- ISO/IEC 27001, SOC 2 Type II and Cyber Essentials remain vendor_stated (no certification body or dates named; trust.veriff.com did not render).
- KYB still a limited access program ("launching mid-2026" on the sign-up page); general availability not confirmed.
- CCPA/CPRA and GDPR homepage badges are compliance statements; not listed as certifications.
- Notes on human review, old user-review claims and the wrong Capterra listing were resolved and removed.

### Ranking cards

Entries checked: canada, e-kyc, kyb, liveness-detection, mexico, peru, age-verification. No text is wrong after this pass: prices ($0.80, $49 minimum, $0.64 AML add-on, 15-day trial up to 50 sessions), 12,500+ documents, 230+ countries, iBeta Level 1 and 2, 300+ KYB jurisdictions and "KYB offered only through a limited access program as of Oct 2026" all still match. Optional addition for the e-kyc or liveness-detection card: "FIDO-certified face verification (Level 2) and document authenticity" (source 22).

### Score flag

- None.

## Follow-up 2026-10-30 (AML screening capabilities)

Filled `capabilities` keys from vendor pages opened 2026-10-30. No existing values changed (all four keys were empty). Score, prose, `last_verified` and `updated` untouched.

- `identity_verification`: yes (document check plus selfie and liveness); source 29, https://www.veriff.com/product/identity-verification
- `sanctions_pep`: add_on (paid add-on on Self-Serve plans); source 1, https://www.veriff.com/pricing
- `adverse_media`: add_on (part of AML Screening product); source 30, https://www.veriff.com/product/aml-screening
- `transaction_monitoring`: not_disclosed (not found on Veriff pages); no vendor page found

- Note: Self-Serve pricing lists PEP and sanctions screening as a per-verification add-on and ongoing monitoring as a separate add-on; Enterprise lists AML Screening with adverse media.
