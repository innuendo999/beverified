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
