# IDMERIT: fact re-check 2026-10-18

## Changed
- Pricing: "Basic plan starts at $0.10 per user per month, the lowest published entry rate" → IDMERIT publishes no rate card and quotes by country, module and volume (source 3); $0.10/user/month appears only on its Capterra listing, now shown as `third_party` (source 4). Tagline, SEO description, verdict, pros, FAQ updated; "cheapest published rate in this category" removed everywhere.
- Fact "Effective: $0.10/check (Basic)" → Not publicly disclosed (no source for a per-check rate).
- HQ "Carlsbad, CA" → San Diego, CA (IDMERIT Our Story, source 2). G2 seller profile still says Carlsbad (source 5).
- Founded "2014" → Not publicly disclosed (IDMERIT states none; G2 says 2014, GetApp says 2016).
- Products: "Business verification and Video KYC" → IDMkyb (330M+ businesses, 140+ jurisdictions) and IDMlive live agent verification (source 1).
- Coverage 180+ countries, 440+ data sources, 580+ ID types: confirmed on homepage (source 1).
- AML: added 13M+ red-flagged profiles (source 1).
- Pro "Self-funded and profitable-by-design" → free sandbox and sample testing (source 3).
- Con "Narrower depth on advanced fraud/AML tooling" (unsourced) → no rate card on its own site (source 3).
- Certifications added: SOC 2 Type 2 and ISO 27001 (vendor-stated logos, source 1).
- User ratings: G2 4.9 / 5 from 19 reviews (source 5); Capterra 4.7 / 5 from 3 reviews (source 4).

## Removed / unverifiable
- "the lowest published entry rate" / "cheapest published rate in this category": IDMERIT does not publish a rate.
- Founding year 2014 and "self-funded, has raised no outside funding": not on any IDMERIT page opened.
- "Higher tiers add AML/KYC and video verification": no tier structure published.
- "Video KYC" product name.
- "frequently cited" count in review themes.

## Ranking cards
- No `rankings.yml` entry carries `slug: idmerit`, although the old page claimed "ranked #1 in Cheap KYC". If a cheap-kyc card is added later, it must not say "cheapest published rate"; use "Listed from $0.10/user/month on Capterra; quotes by country and module".

## Score flag
- Yes. The score and the "#1 in Cheap KYC" claim rested on "the cheapest published rate". IDMERIT publishes no rate; the $0.10 figure is a marketplace listing and the unit (per user per month) is unclear for per-check comparison. Flag for editorial review; score unchanged.

## Follow-up 2026-10-22

### Changed

- No page facts changed. Re-checked: homepage coverage (180+ countries, 440+ sources, 580+ ID types, 13M+ red-flagged profiles, 330M businesses in 140+ jurisdictions), FAQ pricing and testing wording, Capterra Basic plan $0.10 per user per month, Capterra 4.7 (3), G2 4.9 (19). All unchanged (sources 1, 3, 4, 5).
- Source 6 appended: PR.com press release (April 2020) on ISO/IEC 27001:2013 certification by an unnamed ANAB-accredited body. Certification status left vendor_stated: the 2013 version is superseded and no current certificate was found.
- Notes merged: founding year and HQ conflicts into one note; resolved history notes (self-funded claim, Video KYC) removed.

### Removed / unverifiable

- Nothing removed from the page.
- Still open: founding year (G2 2014, GetApp 2016, IDMERIT none); HQ San Diego (IDMERIT) vs Carlsbad (G2); idmerit.com/pricing returns an error; coverage figures differ between IDMERIT's own pages; no current SOC 2 or ISO 27001 evidence.

### Ranking cards

- No `slug: idmerit` entry in `src/_data/rankings.yml`. Nothing to correct.

### Score flag

- The 2026-10-18 flag still stands: no official rate card, so the "#1 in Cheap KYC" basis rests on a third-party $0.10 per user per month listing. No new finding.

## Re-score 2026-10-22

Owner-approved direction: lower. Score 4.3 Good → 3.8 Good. The old score leaned on "cheapest published rate"; pricing is now scored as quote-only with a third-party listing.

| Criterion | Weight | Sub-score | Evidence |
|---|---|---|---|
| Compliance & certifications | 25 | 3.8 | vendor |
| Coverage | 20 | 4.2 | vendor |
| Pricing transparency | 20 | 3.5 | vendor |
| Integration & API depth | 15 | 3.6 | vendor |
| Support responsiveness | 10 | 3.8 | user |
| Track record | 10 | 3.5 | independent |

Arithmetic: (25 × 3.8 + 20 × 4.2 + 20 × 3.5 + 15 × 3.6 + 10 × 3.8 + 10 × 3.5) / 100 = (95 + 84 + 70 + 54 + 38 + 35) / 100 = 376 / 100 = 3.76 → 3.8.

- All six criteria scored. Support uses the Capterra review theme (responsive support), not the star ratings, which stay outside the score.
- Compliance stays vendor-stated: the only public evidence is the April 2020 ISO/IEC 27001:2013 press release (source 6).
- `node scripts/checks/provider.mjs` flags `score` as changed against HEAD; this is the intended, owner-approved change. Grade unchanged.

## Follow-up 2026-10-30 (AML screening capabilities)

- identity_verification: yes (IDMscan document and selfie liveness), source 8: https://idmerit.com/idmscan/
- sanctions_pep: yes (IDMaml screening), source 9: https://www.idmerit.com/aml-solutions-services/
- adverse_media: yes (IDMaml screening), source 9: https://www.idmerit.com/aml-solutions-services/
- transaction_monitoring: yes (IDMaml transaction monitoring), source 9: https://www.idmerit.com/aml-solutions-services/

IDMscan (document plus selfie liveness) and IDMaml (screening, adverse media, transaction monitoring) are separate IDMERIT products quoted by module; set to yes as own products with no tier gating published.
