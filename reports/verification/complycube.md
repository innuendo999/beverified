# ComplyCube: fact re-check 2026-10-18

## Changed

- Pricing: "does not publish standard pricing; quoted via sales" → published plans: Starter $99/month, Core $299/month (fee credited against checks), Growth and Enterprise on quote; per-check prices e.g. document verification $1.05 / $0.75, standard AML $0.50 / $0.35, photo liveness $0.35 / $0.20, monitoring $0.03/month; no minimum beyond plan fee (source 1, ComplyCube pricing page).
- Verdict, FAQ "How much does ComplyCube cost?", con "No published pricing", user theme "Pricing opacity" and Sumsub choose-instead reason ("you want published pricing") rewritten, since ComplyCube does publish prices.
- Certifications: "ISO 27001, GDPR" → UK DIATF certified identity service (confirmed on the UK government register: ComplyCube Platform, Teemo Technology Ltd, Kantara, 30 Mar 2026 to 30 Mar 2029, source 4); ISO/IEC 27001:2022, ISO 9001:2015, ISO/IEC 30107-3 Level 2, Cyber Essentials, ACCS 4:2020 as vendor-stated (source 2). GDPR removed as a certification.
- Pro "ISO 27001-aligned security posture" → DIATF certified plus vendor-stated ISO claims.
- Added legal entity: Teemo Technology Ltd, UK company 12392069, incorporated 8 Jan 2020 (source 5, Companies House).
- Regions "Global" → "220+ countries and territories" (source 3, vendor).
- Feature "Video KYC" → eID, NFC chip verification and video liveness (pricing page lists these; agent-led video KYC not found).
- Shufti Pro choose-instead reason no longer claims ComplyCube has narrower country coverage (ComplyCube states 220+ countries).
- User ratings added: G2 5.0 from 70 reviews (source 7). "Frequently cited" counts and legacy note removed.

## Removed / unverifiable

- Founded "2016": not stated by the vendor; the operating company was incorporated in 2020 (Companies House) and CB Insights says 2020. Fact removed.
- "Effective: Not disclosed" fact replaced by published per-check range.
- Video KYC as a product.

## Ranking cards

- ComplyCube has no entry in `src/_data/rankings.yml` (no `slug: complycube`). Note: other providers' records (e.g. FullCircl alternatives) label it "API-First Budget Pick", which is consistent with published low entry pricing.

## Score flag

- None. The main finding (pricing is published) is favourable and does not involve a shutdown, acquisition or lapsed certificate.

## Follow-up 2026-10-22

### Changed
- Per-check column mapping confirmed: rows that show three cells on the pricing page (for example continuous monitoring "not included / $0.03/month / included") follow the Starter, Core, Growth column order (source 1). Note removed.
- Continuous AML monitoring: "$0.03 per profile per month" → "$0.03 per month on Core; not included on Starter" (source 1). Core plan extra now lists continuous monitoring.
- Pricing summary: "only successful verifications billed" (all plans) → stated for Starter only, as on the page; added that monitoring and fraud intelligence start on Core (source 1).
- Added pricing item: extensive AML screening with adverse media, $1.05 (Starter) / $0.85 (Core) per check (source 1).
- Minimum commitment: "None beyond the monthly plan fee" → "Not stated on the pricing page beyond the monthly plan fee" (the page does not mention a minimum; source 1).
- Enterprise plan note: "Case management" → "Advanced case management" (Starter already includes case management with audit trails; source 1).
- Per-check fact: "From $0.20 (Core liveness) to $1.05 (Starter document check)" → "Document check $1.05 (Starter) / $0.75 (Core); photo liveness $0.35 / $0.20" (source 1). The old range was wrong: Core device intelligence is $0.07 and the Core UK multi-bureau check is $1.25.
- FAQ "How much does ComplyCube cost?": "Per-check prices start at $0.20 for a photo liveness check on Core; a document check costs $1.05 on Starter" → "A document check costs $1.05 on Starter or $0.75 on Core, and a photo liveness check costs $0.35 or $0.20" (source 1).
- Legal entity fact now cites the Companies House company page (new source 9): TEEMO TECHNOLOGY LTD, 12392069, active, incorporated 8 January 2020.
- DSIT register entry re-confirmed: ComplyCube Platform, Kantara, 30 March 2026 to 30 March 2029 (source 4).
- User ratings: G2 5.0 from 70 reviews re-confirmed (source 7); added Capterra 5.0 from 10 reviews (new source 8).
- Starter $99/month and Core $299/month unchanged; Growth and Enterprise still quoted.

### Removed / unverifiable
- Resolved notes removed: column mapping; Video KYC (settled in the first pass).
- Still unverifiable: founding year; office footprint beyond the registered-office address; certificates or register entries for ISO/IEC 27001, ISO 9001, ISO/IEC 30107-3 (lab not named), Cyber Essentials and ACCS 4:2020. SOC 2 Type II ("compliant", developer docs) and ACCS 2:2021 are vendor claims not added.

### Ranking cards
- No entries with `slug: complycube` (and no mention of ComplyCube) in `src/_data/rankings.yml`. Nothing to correct.

### Score flag
- None.

## Follow-up 2026-10-30 (AML screening capabilities)

- identity_verification: yes. https://www.complycube.com/en/pricing/ (source 1; document check and photo liveness/facial similarity priced from Starter)
- sanctions_pep: yes. https://www.complycube.com/en/pricing/ (source 1; Standard AML screening, sanctions and Level 1 PEPs, from Starter)
- adverse_media: yes. https://www.complycube.com/en/pricing/ (source 1; Extensive AML screening tier, from Starter)
- transaction_monitoring: not_disclosed. only pre-payment transaction screening found (https://www.complycube.com/en/solutions/due-diligence-compliance/anti-money-laundering/transaction-screening-software/); pricing page lists no transaction monitoring
- No existing values changed (the four keys were empty). capabilities.checked stays 2026-10.
