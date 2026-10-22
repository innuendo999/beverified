# Sanction Scanner: fact re-check 2026-10-18

## Changed
- Pricing: "~€990/mo, third-party report, not confirmed by the vendor" → official published Starter plan, €990/month for 100 entities, annual billing with two months free, Enterprise custom with unlimited usage (source 1, sanctionscanner.com/pricing).
- Founded: "2018 to 2019 (sources vary)" → 2019 ("Established in 2019", source 2).
- Backers: "Backed by Mastercard Lighthouse Turkiye and TT Ventures" → CB Insights lists TT Ventures and Mastercard Lighthouse Türkiye as investors (source 6); Mastercard's own release describes Lighthouse as an acceleration programme that selected Sanction Scanner in 2024, with no investment mentioned (source 5).
- Deloitte recognition: "Turkey Technology Fast 50 in 2025" → Deloitte Technology Fast 50 Türkiye 2024, third consecutive year (source 4, dated 6 Dec 2024).
- Features: added the 3,000+ sanctions, PEP and watchlists figure, ongoing daily re-screening and KYB from the homepage (source 3); "Coverage across 70+ countries" feature replaced (70+ is countries served, kept in facts with source 2).
- HQ wording: London, UK and Istanbul, Türkiye (source 2).
- Certifications added as vendor-stated: ISO 27001, ISO 9001 (source 2), SOC 2 for data centres (source 1).
- User ratings: G2 4.8 from 69 reviews (source 7).

## Removed / unverifiable
- "Roughly 26 to 27 employees": no current source opened.
- "Pricing accessibility" user-review theme and "(frequently cited)" labels: themes were not visible on G2; G2 shows perceived cost in the highest band. Remaining themes kept as general statements.
- 2025 Deloitte Fast 50 listing: not confirmed.

## Ranking cards
- No entries with `slug: sanction-scanner` in `src/_data/rankings.yml`.

## Score flag
- None. Pricing moved from third-party to official, which supports rather than weakens the current score.

## Follow-up 2026-10-22

### Changed
- Company: Sanction Scanner → complead (formerly Sanction Scanner), rebranded September 2026; Sanction Scanner continues as complead's sanctions and PEP screening product. Added `alternate_names: [complead]`, a "Company" fact, and a new FAQ (source 10, complead announcement dated 21 Sep 2026; sanctionscanner.com footer "Sanction Scanner is a complead product"). `name` and `slug` unchanged.
- what_is, verdict, seo.description: now separate the product (Sanction Scanner) from the company (complead) and state that it does not do document or biometric identity verification (sources 9, 10).
- Legal entity added: Sanction Scanner Ltd, 27 Old Gloucester Street, London (source 13).
- HQ: "London, UK and Istanbul, Türkiye" → "London, UK; offices in Istanbul, Türkiye and New York, US" (source 10).
- Regions: "70+ countries served" (source 2) → "80+ countries with live customers" (source 11); what_is and FAQ client line updated (800+ in 80+ countries).
- Recognition: "Deloitte Technology Fast 50 Türkiye (2024, third year)" → "(2022, 2023, 2024 and 2026)" (source 15). Verdict updated to "four times".
- Certifications: ISO/IEC 27001 vendor_stated → ISO/IEC 27001:2022 confirmed (certificate D36249W opened, valid 02.07.2026 to 01.07.2027, source 13); ISO 9001 vendor_stated → ISO 9001:2015 confirmed (certificate D36248W, same dates, source 14); "SOC 2, data centre security" (source 1) → "SOC 2 Type II, security and availability", still vendor_stated (Trust Center, report under NDA, source 12).
- Con 3: "Data-residency questions for some EU clients given its Türkiye/UK dual presence" → "No document or biometric identity verification; it runs alongside a separate IDV provider" (source 9). The Trust Center now lists selectable EU, UK and Türkiye residency, so the old con no longer held (source 12).
- New FAQ "Does Sanction Scanner verify identity documents?": No (source 9). `application_category` "Identity Verification Software" → "AML Software" (the JSON-LD category claimed IDV).
- User ratings: added Capterra 5.0 from 27 reviews (source 16). G2 unchanged, 4.8 from 69 (G2 now titles it "Complead (formerly Sanction Scanner)").
- User review themes: editorial "Scale" and "Screening depth" criticisms replaced with themes visible on Capterra (integration and ease of use, support; reporting, batch-upload speed).
- entity.same_as: added https://complead.ai.
- link.url kept as https://sanctionscanner.com: home, pricing and about still load there; only comparison pages redirect (302) to complead.ai.

### Removed / unverifiable
- 2025 Deloitte listing: confirmed absent (listed 2022, 2023, 2024, 2026 per source 15).
- Employee count: still no source (complead pages give none); stays removed.
- Investors: still CB Insights only (latest round recorded as "Incubator/Accelerator"); kept with attribution, note retained.
- Founder quote "In September 2026 we rebranded from Sanction Scanner to complead" not found verbatim; the date comes from the 21 Sep 2026 announcement.
- Founding year conflict: complead.ai/company says "Founded 2020" (UK incorporation year); kept 2019 from the about page and the founder's post.

### Ranking cards
- No entries with `slug: sanction-scanner` in `src/_data/rankings.yml`. Nothing to correct.

### Score flag
- None. The company rebranded but the product continues under its name with unchanged pricing, and ISO certificates are now confirmed. Editor note: `capabilities.deployment` ("Azure hosted, EU data residency") is now out of date against the Trust Center (EU, UK, Türkiye; host not named). Capabilities were not edited in this pass.
