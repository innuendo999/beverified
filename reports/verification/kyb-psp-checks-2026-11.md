# KYB for PSPs: what the 10 ranked KYB providers document (23 Nov 2026)

Scope: the 10 providers in the `kyb` ranking on `main` (8540318). Question: which merchant-onboarding checks beyond standard KYB each vendor documents in public, on its own site or docs. Checked 23 Nov 2026 by web search and fetch. All entries are **Vendor-stated** (no independent evidence exists for these features). "Not found" means not found in public docs on the check date, not "not offered".

Registry, UBO and monitoring come from the provider records (`capabilities`, `features`), not re-checked here.

## Summary

| Provider | Website check | Industry / MCC classification | PSP or merchant page | MATCH / VMSS |
|---|---|---|---|---|
| Persona | Yes: Business Website Verification, 14 checks (domain age and expiry, content, ToS, privacy policy, malicious-site flags) | Yes: Business Classification Report returns NAICS or MCC (up to 1 MCC); KYB page says it flags high-risk or restricted categories | Yes (KYB solution page, merchant onboarding block) | Not found |
| iDenfy | Yes: "Website audit" in KYB docs (domain legitimacy and risk scoring) | Partly: "block certain IP locations or activity codes from onboarding"; AI company report gives industry classification; MCC not named | Blog only | Not found |
| Enigma (US only) | No content scan: high-risk activity flags from keywords in names, industry descriptions and website URLs; docs say Enigma "does not currently look at the content of a website" | NAICS 2017 + Enigma descriptions; MCC not named | Yes (payment providers page: card revenue, processing volume, ticket size from US card panel) | Not found |
| Signicat | Via partner TrueBiz (website and digital footprint analysis, announced 21 May 2026 on truebiz.io) | Not stated (TrueBiz checks activity against policy; MCC not named) | Partner announcement | Not found |
| GBG | Not found | Not found | Yes ("KYB for payments", GBG Detected: 600m+ company records, directors and UBOs, PEP/sanctions/adverse media, ongoing monitoring) | Not found |
| Trulioo | Not found | Partly: Business Insights responses include an industry code (NAICS in docs sample); MCC not named | Yes (payment service providers industry page) | Not found |
| Sumsub | Not found (KYB docs list registry check, documents, ownership, AML screening) | Not found | Payments and marketplaces pages ("merchant screening", not specified) | Not found |
| Shufti Pro | Not found | Registry "Industry Codes" in Standard KYB reports (registry data, not MCC) | Payments page (no merchant-risk checks listed) | Not found |
| Veriff | Not found | Not found | No (KYB in limited access after the Vespia acquisition, per record) | Not found |
| KYCAID | Not found | Not found | No (glossary pages on merchant topics only) | Not found |

## Findings for the article

1. **None of the 10 documents a MATCH or VMSS check.** Mastercard describes MATCH Pro as mandatory for Mastercard acquirers and used by Authorized Users (developer.mastercard.com/match/documentation). So the terminated-merchant check normally stays with the acquirer or a specialist merchant-risk vendor, not the KYB vendor. Legacy MATCH API endpoints are removed on 5 Nov 2026 per the same page.
2. **Only Persona documents both a website check and MCC classification** in its own help centre. iDenfy has a website audit and activity-code blocking but does not name MCC.
3. **Enigma is the only one with card-revenue data** for underwriting (US merchants only); its high-risk flag is keyword-based, not a website content scan.
4. **Signicat adds website analysis through a partner**, not its own product. Label it as partner-delivered.
5. **Six of 10 document standard KYB only** (registry, UBO, screening, monitoring): GBG, Trulioo, Sumsub, Shufti Pro, Veriff, KYCAID. GBG and Trulioo market it to PSPs.

## Sources (accessed 23 Nov 2026)

- Persona: help.withpersona.com/articles/6YMwMNVZpOYO4n6bpUhokY (Business Website Verification); help.withpersona.com/articles/60dDv0ttzy8rDFNPLaiszs (Business Classification Report); withpersona.com/solutions/know-your-business; withpersona.com/lp/kyb-solution (monitoring for "watchlist hits or website edits")
- iDenfy: documentation.idenfy.com/kyb/overview; idenfy.com/business-verification-services/; idenfy.com/ai-company-report-service/
- Enigma: documentation.enigma.com/v1/reference/attributes/kyb-and-identity-attributes/high-risk-activities; documentation.enigma.com/v1/reference/attributes/identity-and-firmographics-attributes/industries; enigma.io/solutions/payment-processors-and-platforms
- Signicat: truebiz.io/blog/signicat-truebiz-partnership (21 May 2026; partner source, not Signicat's own page)
- GBG: gbg.com/en/onboard-merchants-in-minutes/
- Trulioo: developer.trulioo.com/docs/step-4b-verify; trulioo.com/industries/payments-identity-verification
- Sumsub: docs.sumsub.com/docs/verify-businesses; docs.sumsub.com/docs/how-business-verification-works; sumsub.com/payments/; sumsub.com/marketplaces/
- Shufti Pro: shuftipro.com/know-your-business-ad/; shuftipro.com/payments/
- Veriff: veriff.com/pr-news/kyb-business-verification; record `veriff.yml`
- KYCAID: kycaid.com/glossary/k/know-your-merchant/; record `kycaid.yml`
- Mastercard MATCH Pro: developer.mastercard.com/match/documentation/

## Open items

- To store these in records, a new field is needed (proposal: `kyb_merchant: { website_check, industry_classification, match_vmss, card_data }` with `status`, `source`, `verified`). Data schema change: owner approval.
- Sumsub, Shufti Pro and Veriff may have these checks behind sales or in gated docs. If the article runs, offer each vendor a correction route like the certification tracker, not before.
