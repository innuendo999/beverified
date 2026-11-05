# AiPrise: fact re-check 2026-10-18

## Changed

- Founded "Not disclosed" → 2022 (Y Combinator Summer 2022 batch, source 2).
- HQ "US-based (exact location not disclosed)" → San Francisco, CA (source 2).
- Founders: "founded by Chaitanya Sarda" → Chaitanya Sarda (CEO) and Rushabh Shah (Co-CEO) (sources 2, 3).
- Funding "raised two funding rounds" → $12.5M Series A led by Headline, October 2025 (sources 3, 4).
- Coverage 200+ countries confirmed (source 1); added government eKYC checks in 70+ countries (source 1).
- Features reworded to current homepage: registry search, document authenticity, local document and government checks, proof of address and source of funds, fraud and risk scoring, AI agents, Compliance Co-pilot.
- Certification added: SOC 2 Type II, vendor-stated (homepage badge, source 1).
- Con "Some company details (HQ, founding year) are not consistently public" → "Few public user reviews so far" (now that HQ and founding year are known).
- Verdict no longer says HQ and founding year are not public.
- User ratings: G2 4.7 from 28 reviews (source 5), Capterra 5.0 from 1 review (source 6). "Frequently cited" and legacy note removed.

## Removed / unverifiable

- KYB "ownership verification and social signals", KYC "biometric selfie match", "customizable rule engines", "automated EDD report generation": not found on current vendor pages.
- Vespia choose-instead "300+ jurisdictions" figure (not re-checked here).
- Pricing: aiprise.com/pricing could not be loaded; "not published" is based on the homepage, G2 and Capterra. Flagged in verification_notes.

## Ranking cards

- AiPrise has no entry in `src/_data/rankings.yml` (no `slug: aiprise`).

## Score flag

- None. Company active and funded (Series A Oct 2025).

## Follow-up 2026-10-22

### Changed

- Pricing summary "Pricing is not published; AiPrise quotes on request ... Capterra lists no free trial" → no price list on aiprise.com, quote on request; G2's vendor-supplied listing (pricing last updated December 2025) shows KYC from $1.25 and KYB from $3.00 per verification; G2 lists a free trial, Capterra lists none (G2 pricing, source 7; Capterra, source 6).
- Pricing items: added "KYC from $1.25 per verification" and "KYB from $3.00 per verification" as third_party (source 7); free trial split into "Capterra listing: Not available" (source 6) and "G2 listing: Listed, with no length or terms given" (source 7). "Published prices" value → "Not published on aiprise.com; quote on request" (source 1).
- Con "No published pricing" → "No price list on its own website; G2 shows only starting prices" (sources 1, 7).
- FAQ "How much does AiPrise cost?" now mentions the G2 starting prices (source 7).
- Fact added: Customers "200+ businesses", vendor-stated (homepage, source 1). An October 2025 article said 150+; the homepage figure is newer.
- SOC 2 Type II: still vendor_stated; source 1 → 8 (AiPrise support article: SOC 2 Type II, audited annually by an unnamed independent firm).
- User review themes: added G2 praise for responsive support and quick setup, and G2 criticism of genuine documents rejected without a clear reason and inaccurate alerts (G2 pros and cons summary, source 5). G2 4.7 from 28 and Capterra 5.0 from 1 unchanged.
- Co-founder surname resolved: Y Combinator, Pulse 2.0 and FinTech Global all give Rushabh Shah; note removed.

### Removed / unverifiable

- aiprise.com/pricing returned a client error again; G2 starting prices are third-party, not from AiPrise's site.
- Free trial: G2 and Capterra disagree; both shown as third-party.
- Founded 2022 and San Francisco HQ: still from Y Combinator only (no About page, trust centre and OpenCorporates did not render).
- Total funding: still not confirmed; only the Series A is shown.
- GDPR: homepage badge, but the support article says compliance is still in progress; not listed.
- No Gartner Peer Insights page found.
- Notes on old feature claims and the Vespia "300+ jurisdictions" figure were already resolved in the 2026-10-18 pass and were removed.

### Ranking cards

- AiPrise has no entry in `src/_data/rankings.yml` (no `slug: aiprise`). Nothing to correct.
- Related: alternative Vespia shows a "Veriff is acquiring Vespia" banner and routes sign-ups to Veriff. `alternatives` is locked; editor to review whether Vespia remains a fitting alternative.

### Score flag

- None.

## Follow-up 2026-10-30 (AML screening capabilities)

- identity_verification: yes (document, face match and liveness), source 11: https://docs.aiprise.com/docs/kyc
- sanctions_pep: add_on (AML screening powered by ComplyAdvantage), source 12: https://support.aiprise.com/articles/1649660382-types-of-background-checks-and-aml-screening
- adverse_media: add_on (adverse media via ComplyAdvantage), source 12: https://support.aiprise.com/articles/1649660382-types-of-background-checks-and-aml-screening
- transaction_monitoring: not_disclosed (named only as an integration use case), no source

AiPrise says its global AML screening "is powered by ComplyAdvantage"; set to add_on under the named-partner rule (it is sold by AiPrise as its own AML check). Docs also list Continuous AML Monitoring. Transaction monitoring is named only as an integration use case.

## v3.1 fields 2026-11-05

- pricing.model: published none (G2 third-party prices only), minimum false, trial false (own site offers demo only), source 1. aiprise.com/pricing still returns a client error.
- integration: docs_public yes (11); sdk_web yes (11); sdk_ios partial and sdk_android partial (WebView flow, React Native or Flutter SDK, 13); no_code yes (hosted verification URL, flow edited in dashboard, 11); support_hours partial (Slack, chat, email, no hours, 14); sandbox not_disclosed (sandbox keys exist, self-serve access not stated).
- coverage: countries 200 (200+ countries and territories, 15); document_types null (not stated); non_doc yes (government database eKYC checks, 16). Note: KYC docs page says templates support documents from 40+ countries, which conflicts with 200+.
- track_record: ownership stable (founder led, Series A, 3); incidents none found.
- capabilities: liveness yes (11); case_management yes (KYB page, 9). injection_detection not_disclosed (homepage claims deepfake detection, injection not named); reusable_id, data_residency not_disclosed.
- No lab letter for liveness found, so Fraud defense = 2.
- New sources 13 to 16.
- Score flag: none.

## v3.1 breadth keys 2026-11-05

- ongoing_monitoring: yes, source 17 (new: Continuous Monitoring page; daily re-screening of users and businesses)
- transaction_monitoring: not_disclosed (unchanged; Continuous Monitoring page says it does not cover transaction monitoring, which is not a statement that the product is not offered)
- video_ident: not_disclosed (unchanged, nothing on homepage or product pages)
- reusable_id: not_disclosed (unchanged; Reverification feature re-runs checks, no reuse without new scan stated)
- case_management, kyb_*: unchanged
