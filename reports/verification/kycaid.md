# KYCAID: fact re-check 2026-10-18

## Changed

- Pricing: Starter $99/mo (500 checks), Growth $299/mo (2,000), overages, 14-day trial, Enterprise min 10,000 → published EUR per-verification bundles: Basic KYC €0.75, Standard KYC (adds AML) €0.85, Advanced KYC (adds address) €1.10; €50 credit on registration; Enterprise tailored from 10,000 verifications/month; country number checks €0.05 to €0.80 (source 1).
- Facts "From $99/mo", "Effective ~$0.15 to $0.20/check" → €0.75 per verification, €0.75 to €1.10 (source 1).
- Founded 2019 → 2018 (KYCAID Limited incorporated 9 Nov 2018; about page "Since 2018") (sources 4, 2).
- HQ "Vilnius, LT" → London, UK registered office (source 4); privacy policy names Compligate Ltd (England, no. 15376538) as operator (sources 3, 5).
- Certifications "ISO 27001, GDPR" → ISO 27001, SOC 2 Type 2, PCI DSS, all vendor-stated in the privacy policy (source 3). GDPR dropped (regulation, not a certificate).
- "200+ document types" → 200+ countries and territories (source 2).
- "White-label client portal" → white labeling is part of the Enterprise plan (source 1); custom domain hosting in docs (source 6).
- Pro "Responsive support team" → 24/7 chat with a stated 15-minute SLA (source 2).
- Con "Mobile SDK is newer" → public docs describe API, hosted form and iframe; native mobile SDKs not documented there (source 6).
- seo.description "Pricing from $99/mo" → "from €0.75 per verification".

## Removed / unverifiable

- Adverse-media screening in the AML FAQ (pricing page lists PEP, sanctions, watchlists, OFAC only).
- "Faster average approval times" for Sumsub in the comparison FAQ.
- User review themes with "roughly X of 10" counts: G2 shows 0 reviews. Removed.

## Ranking cards

Every KYCAID card shows a price that is not on the vendor's pricing page. Suggested corrections:

- aml #3, e-kyc #1, identity-verification #1, india #1, brazil #2, mexico #2, peru #2, canada #1, age-verification #6: `legacy_price_shown: $99/mo` → `From €0.75/verification`.
- kyb #1: `legacy_price_shown: $129/mo` → `From €0.75/verification` (company check price not published).
- crypto #2: `legacy_price_shown: $149/mo` → `From €0.75/verification`.
- cheap-kyc #2: `legacy_price_shown: $0.35/check` → `From €0.75/verification`. Pro "Core sanctions/PEP screening included by default" is wrong: AML screening starts at the €0.85 Standard bundle; suggest "AML screening included from the €0.85 Standard bundle". Pro "Lowest published per-check price in this category" is unverified; suggest "Published per-verification prices with €50 starting credit". Con "Support hours skew to EU business hours" conflicts with the vendor's 24/7 chat; suggest "Company check and monitoring prices not published".
- aml #3 and e-kyc #1 con "Mobile SDK is newer": unverified; suggest "Native mobile SDKs not documented in public docs".
- aml #3 pro "White-label client portal" and e-kyc #1 pro "White-label onboarding UI": white labeling is an Enterprise plan feature; suggest "White labeling on the Enterprise plan".
- india #1 "CKYC registry lookups" and pro "Aadhaar and CKYC integration out of the box": pricing lists Aadhaar (SMS OTP, €0.60) only; CKYC not found.
- canada #1 "FINTRAC-aligned" and mexico #2 "CNBV/Ley Fintech-aligned": not stated on vendor pages checked; unverified.

## Score flag

- Possible. The old page's published plan prices ($99/$299) do not exist; the real entry price is per verification and AML screening is not in the cheapest bundle. If the score or the cheap-kyc ranking leaned on the $99/mo bundle, it should be reviewed.

## Update 2026-10-19: editor corrections, checked against KYCAID's public pages

| Request | Result |
|---|---|
| Price "from €0.50, base is a document" | Confirmed on kycaid.com homepage price list: document check €0.50. The same list adds a fixed €100/month service fee on top of verification prices, so cards read "From €0.50/check + €100/mo". Bundles from €0.75 (pricing page) kept. Age-verification card keeps €0.75 (needs document + face). |
| Regions 240+ | Not changed. kycaid.com/about-us still says "200+ countries and territories". Will switch when the public site says 240+. |
| SOC 2 Type 2 not held yet (expected early 2027) | Removed from certifications; quick facts say "SOC 2 in progress". The privacy policy still lists SOC 2 Type 2 and should be corrected by KYCAID. |
| Company check, monitoring "not publicly disclosed" | Corrected: homepage price list shows company check €10, ongoing KYC monitoring €25/month, AML €0.50, face and address €0.25. |
| Country number checks €0.05 to €0.80, "from 10 cents"; rename to non-document checks in government databases | Renamed everywhere. Range kept at €0.05 to €0.80 because the pricing page lists Turkey Kimlik at €0.05; CPF, CURP and DNI are €0.10. |
| "Fewer native integrations" | Removed: unsourced legacy con. Replaced with a sourced limitation (fixed €100 monthly fee on the module price list). |
| Mobile SDKs "on request" | Rephrased: public docs cover API, hosted form and iframe; mobile SDKs provided on request (vendor-stated, Oct 2026). |
| Regions 240+ (follow-up, 19 Oct) | Changed to 240+ after KYCAID confirmed it to BeVerified by email; labelled vendor-stated ("per KYCAID, Oct 2026") because the public about page still says 200+. |

## Follow-up 2026-10-22

Checked: kycaid.com pricing, homepage price list, about-us, privacy policy (updated 17 Oct 2025), docs.kycaid.com (index, form integration, risks check, non-doc pages), Companies House (11670407, 15376538 and their PSC pages), Trustpilot, G2, Capterra. No acquisition, rebrand or shutdown found; both UK companies are active.

### Changed

- Feature (AML): added "The API docs also list a separate adverse media check, rule-based transaction monitoring and a crypto address check; these have no price on the pricing page" (sources 9, 10, 11).
- FAQ (AML screening): added "The API docs also list a separate adverse media check, which is not priced on the pricing page" (source 9). Bundled AML screening on the pricing page still excludes adverse media.
- Pricing items: added video verification €0.50 and financial viability check €0.25 from the homepage price list (source 7). All other prices re-confirmed unchanged (sources 1, 7).
- Facts: added Operator "Compligate Ltd, a private limited company registered in England (no. 15376538)" (source 5, independent).
- Pro: "24/7 chat support with a stated 15-minute response SLA" → "24/7 chat support, with a stated 15-minute SLA for resolving issues". The about page says "resolving the issue quickly, in maximum of 15 minutes SLA" (source 2).
- Con: "Public docs cover the API, hosted form and iframe; mobile SDKs are provided on request" → "Public docs cover the API, hosted form, iframe and mobile WebView; native mobile SDKs are provided on request" (source 13).
- choose_instead Sumsub: "don't mind per-check pricing" → "don't mind a monthly minimum on its published plans" (KYCAID is also priced per check; Sumsub's own record shows $149 / $299 monthly minimums).
- choose_instead Trulioo: "per-check cost is the deciding factor and you run high volumes" → "you run high volumes across many countries and are fine with pricing quoted on request" (Trulioo publishes no prices per its own record).
- user_ratings: added Trustpilot 2.2 from 38 reviews, checked 2026-10 (source 8). G2 and Capterra both show 0 reviews; no Gartner Peer Insights page found.
- user_reviews: added one praise theme (business reviewers: integration, OCR, responsive staff) and one criticism theme (most negative reviews are from people being verified: rejected documents, slow or automated support replies), from reviews visible on Trustpilot. No counts.
- Sources 8 to 14 appended (Trustpilot, four API doc pages, form integration guide, Compligate PSC register). Source 7 `accessed` quoted.
- `last_verified` and `updated` → 2026-10-22.

### Removed / unverifiable

- Notes resolved and removed: old $99/$299 plan note (historic), "200+ document types" (historic), old adverse media note (now replaced with a clearer one), user ratings note (replaced).
- Still unresolved (kept as notes): operational HQ; ISO 27001 and PCI DSS (vendor-stated in the privacy policy only, no certificate or register entry found); SOC 2 (not held per KYCAID, still listed in the privacy policy); native mobile SDKs (on request, vendor-stated); 240+ coverage (email only, public page says 200+); South African SAID check data source and price; price and availability of adverse media, transaction monitoring and crypto address checks; watchlist data provider (doc sample shows "Open Sanctions Default"); conflicting verification-speed claims.
- Ownership: Companies House lists only Ukrainian-resident individuals as persons with significant control of both companies. Compligate's controllers changed on 12 Nov 2025 (three 25 to 50% holders ceased; one individual now holds 75% or more). Not a sale to another company; not rendered on the page.

### Ranking cards

Entries that need no change: e-kyc #1, peru #2 (except con below), india #1, canada #1 (text supported; see fit).

- brazil #2, con: "Company check and ongoing monitoring prices are not published" → "Non-document checks cover CPF only; no CNPJ check is listed". Homepage lists company check €10 and monitoring €25/month; docs Brazil page covers CPF only.
- mexico #2, con: "Company check and ongoing monitoring prices are not published" → "Prices are published in euros, not Mexican pesos". Homepage lists company check €10 and monitoring €25/month.
- mexico #2, pro: "24/7 chat support with a stated 15-minute response SLA" → "24/7 chat support, with a stated 15-minute SLA for resolving issues".
- peru #2, con: "Company check and ongoing monitoring prices are not published" → "Single-module prices carry a fixed €100 monthly service fee".
- cheap-kyc #2, con: "Company check and monitoring prices are not published" → "Single-module prices carry a fixed €100 monthly service fee".
- kyb #1, con: "Company check prices are not published" → "Company check costs €10 per check, plus the fixed €100 monthly fee on single modules".
- crypto #2, con: "No wallet screening or on-chain analytics listed" → "Crypto address check is in the API docs, but its price and data provider are not published".
- crypto #2, con: "No Travel Rule support listed" → keep, or "No Travel Rule support on kycaid.com; the separate TRP product is published by a KYCAID TRP Team" (per this site's TRP record).
- identity-verification #1, tagline: "...liveness checks in 240+ countries." → "...liveness checks in 200+ countries and territories." (240+ is email-only; public about page says 200+). Alternatively keep 240+ only if labelled vendor-stated.
- age-verification #6, con: "No facial age estimation listed among its features" → "Age estimation is listed under face verification, with no accuracy data published". The pricing page lists "age estimation" in the face verification module.
- south-africa #4, con: "No check against the Home Affairs population register; its database checks cover 7 other countries" → "South African ID number checks are in the API docs, but the data source is not named and no price is published". Docs list SAID number, SAID with photo and name-match endpoints; non-doc docs cover 10 countries, the pricing page prices 7.
- All cards with a support or reputation angle: consider that Trustpilot shows 2.2 from 38 reviews (mostly end users). No card mentions it now.

### Category fit

- e-kyc #1: Fits. Document, face, liveness and configurable flows are documented and priced. #1 over Veriff/Jumio rests on price and flexibility, not on any measured accuracy or certification.
- identity-verification #1: Partial fit. Core IDV is documented, but no iBeta/ISO 30107-3 liveness test, no certificate, and SDKs only on request; the ranking criteria (liveness accuracy, lifecycle reach) are not evidenced better than Onfido/Persona.
- kyb #1: Weak fit for #1. The company check is a €10 module (documents, addresses, UBO, authorised persons) with no published registry or jurisdiction count; the docs show no company-registry endpoints. Competitors in the same list document registry depth.
- cheap-kyc #2: Fits. Published prices from €0.50 plus €100/month, or €0.75 bundles with €50 credit.
- crypto #2: Partial fit. Source of funds, AML and a crypto address check exist; Travel Rule is not on kycaid.com, and wallet screening is unpriced with no named data provider.
- india #1: Partial fit. Aadhaar OTP (€0.60), DigiLocker e-Aadhaar and driving licence lookups are in the docs; no CKYC, PAN or V-CIP. The page's own criteria (Aadhaar/CKYC, PAN) favour Signzy.
- canada #1: Weak fit for #1. No Canada-specific check in docs or pricing, no CAD pricing, no FINTRAC statement; only the privacy policy names TransUnion of Canada as a data source where a client uses it.
- brazil #2: Fits. CPF check €0.10 documented; no CNPJ.
- mexico #2: Fits. CURP check €0.10 documented.
- peru #2: Fits. DNI check €0.10 documented.
- age-verification #6: Fits as a document-based option; age estimation is listed under face verification without accuracy data.
- south-africa #4: Fits at #4; SAID checks are documented, data source unnamed.
- aml: KYCAID no longer appears in the aml ranking although its `primary_category` is aml and `legacy_rank_claim` says #4; the owner may want to align these.

### Score flag

- Possible, low. No change in company status, pricing or certificates. Two points the owner may weigh: the Trustpilot rating (2.2 from 38, mostly end users) and that ISO 27001 / PCI DSS remain unproven while the privacy policy still lists a SOC 2 Type 2 KYCAID says it does not hold. Neither changes facts the score was based on.

## Follow-up 2026-10-30 (AML screening capabilities)

Filled `capabilities` keys from vendor pages opened 2026-10-30. No existing values changed (all four keys were empty). Score, prose, `last_verified` and `updated` untouched.

- `identity_verification`: yes (Document Verification and Liveness checks); source 1, https://kycaid.com/pricing/
- `sanctions_pep`: yes (Database screening check, all plans); source 1, https://kycaid.com/pricing/
- `adverse_media`: yes (Adverse Media Check, all plans); source 1, https://kycaid.com/pricing/
- `transaction_monitoring`: yes (per-transaction check, all plans); source 1, https://kycaid.com/pricing/

- Note: All plans list full access to every check; each check is billed separately (document, liveness, database screening, adverse media, transaction monitoring per transaction). Marked yes as included in standard plans.
