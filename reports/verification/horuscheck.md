# HorusCheck: fact re-check 2026-10-18

## Changed
- Identity: vendor found. Site is horuscheck.io, brand styled "Horus Checks" (source 1). link.url null → https://horuscheck.io.
- Product: "KYC/AML verification provider (general capability, per available listings)" → self-service KYC, KYB and AML platform: ID verification with OCR/MRZ across 14,000+ templates, one-shot and 3D liveness with face match, AML watchlist/sanctions screening, KYB with registry and UBO checks, no-code flow builder (source 1).
- Pricing: "not publicly disclosed" → pay-as-you-go model stated, no figures published (source 1).
- Founded, HQ, Regions: "Unverified" / "Not disclosed" → "Not publicly disclosed"; website, terms and privacy policy name no entity or address (sources 1, 2, 3).
- Pros: 2 → 3, all now tied to the homepage (source 1). Cons rewritten around what is missing from the vendor's own pages.
- Removed "per available listings" phrasing and placeholder features ("Specific feature depth not independently confirmed").

## Removed / unverifiable
- "Appears in provider listings / directories" claims: replaced with what the vendor's own site says.
- user_reviews legacy note about G2/Capterra aggregation: no listings found.

## Ranking cards
- No `rankings.yml` entry carries `slug: horuscheck`. Nothing to correct.

## Score flag
- Yes, for review. The 4.1 "Good" score sits on a vendor that publishes no legal entity, address, founding year, prices or certifications. Nothing here suggests it has shut down, but the score cannot be traced to verifiable facts. Score unchanged.

## Follow-up 2026-10-22

### Changed
- Regions fact: "Not publicly disclosed" → "Screening across 200+ countries (vendor-stated)" (contact page, source 4).
- Sources added: 4 Contact page (Horus Checks), 5 Trustpilot profile, 6 UK Companies House name search.
- Pricing note resolved: the pricing section lists what KYC and KYB include under "A flexible pay as you go solution" and shows no figures; the console sign-in page shows none either (source 1). Pricing copy unchanged.
- verification_notes rewritten and deduplicated; the internal notes about link.url and the third pro were dropped as no longer needed.
- last_verified and updated → 2026-10-22.

### Removed / unverifiable
- Company identity: no independent source confirms the company. Website, terms, privacy policy, contact page and console name only the brand "Horus Checks", with no legal entity, registration number, address, founders or founding year, and no governing-law clause (sources 1 to 4). UK Companies House has no company named "Horus Checks" (source 6). No Crunchbase, LinkedIn or press coverage was found.
- Trustpilot business profile (claimed June 2025, 0 reviews) lists Mauritius as the country (source 5). This is company-supplied, gives no address and was not matched to a register entry, so it is kept in notes only and HQ stays "Not publicly disclosed".
- Certifications: none beyond a GDPR badge image. certifications stays empty.
- User ratings: no G2, Capterra or Gartner Peer Insights listing; Trustpilot has 0 reviews. user_ratings stays empty.

### Ranking cards
- No `rankings.yml` entry carries `slug: horuscheck`. Nothing to correct.

### Score flag
- Yes, unchanged from 2026-10-18 and now firmer. The core company facts (legal entity, location, founding, who runs it) cannot be confirmed from any independent source; the only location signal is a self-reported country on Trustpilot. Nothing suggests the product has shut down (site and console are live), but the 4.1 "Good" score rests on vendor marketing alone. Score unchanged; editor review recommended.

## Re-score 2026-10-22

Owner-approved direction: lower to 3.5 or below. Score 4.1 Good → 3.2 Fair. Sub-scores use only facts already in the record (sources 1 to 6, verification_notes).

| Criterion | Weight | Sub-score | Evidence |
|---|---|---|---|
| Compliance & certifications | 25 | 2.9 | vendor |
| Coverage | 20 | 3.8 | vendor |
| Pricing transparency | 20 | 3.2 | vendor |
| Integration & API depth | 15 | 3.3 | vendor |
| Support responsiveness | 10 | 3.0 | vendor |
| Track record | 10 | 2.6 | independent |

Arithmetic: (25 × 2.9 + 20 × 3.8 + 20 × 3.2 + 15 × 3.3 + 10 × 3.0 + 10 × 2.6) / 100 = (72.5 + 76 + 64 + 49.5 + 30 + 26) / 100 = 318 / 100 = 3.18 → 3.2.

- All six criteria scored. Integration is scored on the self-service console and no-code builder; no API documentation, SDK or sandbox is cited in the sources.
- Grade "Fair" is the new label for 3.0 to 3.6.
- `node scripts/checks/provider.mjs` flags `score` and `grade` as changed against HEAD; this is the intended, owner-approved change.
