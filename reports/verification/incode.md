# Incode: fact re-check 2026-10-18

## Changed
- Founded: "Unicorn since 2021" (fact) → founded 2015 in San Francisco (source 1); unicorn status kept in prose with source ($220M Series B at $1.25B, Dec 2021, source 8).
- Gartner: "Leader 2024 & 2025 / two years running" → Leader in 2024, 2025 and 2026, third consecutive year (source 1).
- Scale: "processes 4.1B+ identity checks per year" → 7.1B+ trust checks to date (sources 1, 2); 4.1B checks in 2024 refers to the combined company with AuthenticID (source 6).
- Coverage: "200+ countries" → 4,900+ ID document types across 190+ countries (source 2).
- Product name: "Incode Omni" → Incode Platform (sources 1, 2). Omni noted as earlier name (iBeta 2023 letter, source 5).
- Customers: "Fortune 500 companies, neobanks, and governments" → eight of top 10 U.S. banks, eight of top nine U.S. telecoms, top three global neobanks, four of top five marketplaces (source 1).
- Acquisitions: "MataMap" typo → MetaMap (June 2024, source 7); AuthenticID dated August 2025 (source 6).
- Features: added Deepsight, GovFaceMatch, digital ID, non-doc verification, on-device age estimation, KYB, Workforce (source 2).
- Certifications added: iBeta ISO/IEC 30107-3 Level 3 for Deepsight on iOS and Android, 16 Feb 2026 (confirmed, source 4); SOC 2 Type 2, ISO 27001:2022, ISO 42001:2023, FedRAMP Moderate, Kantara IAL2 (vendor-stated, source 3).
- Pro "One of the largest proprietary identity datasets (400M+ profiles)" → vendor-reported 400M+ profiles and 7B+ checks (source 1). Pro "End-to-end omnichannel..." → iBeta Level 3 liveness (source 4).
- choose_instead for Jumio: "largest processed-verification scale" (unsourced comparison) → "long-established enterprise IDV vendor with AML screening".
- User ratings: G2 5.0 / 5 from 51 reviews (source 10).
- Pricing: confirmed not published (source 9).

## Removed / unverifiable
- "Top-ranked performance in NIST FRTE biometric benchmarks": no source found.
- "valued at $1.25B" kept only as the 2021 Series B figure; no current valuation published.
- "frequently cited" count in review themes.

## Ranking cards
- `age-verification` card: pros "Age and liveness models run on the device" consistent with Incode's On-device Age Estimation product (source 2). "Failed checks are rerouted to another method automatically" not checked on a page opened; needs a source. Con "No public pricing" correct (source 9).
- Incode now lists the Age Check Certification Scheme (ACCS) on its AI info page (source 9); con "names no specific regulation or regulator approval" may need rewording after checking the ACCS register.

## Score flag
- None. Company operating, product line expanded, new iBeta Level 3 result.

## Follow-up 2026-10-22

### Changed
- Certification: "FedRAMP Moderate" (vendor_stated, trust centre) → "FedRAMP Ready (High baseline)", readiness stage, not an authorization (Incode release 14 Nov 2025, source 12). The trust centre still lists "FedRAMP Moderate"; no FedRAMP Marketplace entry could be opened.
- Certification added: Age Check Certification Scheme (ACCS), confirmed by an ACCS registry entry for "Incode Technologies Inc" (source 15); the entry lists no scope, standard or dates.
- FAQ acquisitions: "MetaMap in 2024 and AuthenticID in August 2025" → adds Identiq in June 2026 (Incode release 25 Jun 2026, source 13).
- Unicorn round: $220M Series B at $1.25B, Dec 2021, led by General Atlantic and SoftBank, now also confirmed by General Atlantic (source 11).
- User ratings: added Gartner Peer Insights 4.6 from 55 ratings (source 14). G2 re-opened: 5.0 from 51 reviews (source 10), unchanged.
- Re-confirmed: 7.1B+ trust checks, 400M+ profiles, 600+ staff, 25+ nationalities, customer list, Gartner Leader 2024 to 2026 (source 1); 4.9K+ ID document types across 190+ countries (source 2); pricing not published (source 9); iBeta Level 3 for Deepsight on iOS and Android, 16 Feb 2026 (sources 4, 5).
- New sources 11 to 15 appended.

### Removed / unverifiable
- Notes on the NIST FRTE claim (already removed from the page), the G2 spot-check and the older iBeta Level 2 Omni letter are closed.
- Still unresolved: SOC 2, ISO 27001, ISO 42001 and Kantara IAL2 are trust-centre only; FedRAMP Moderate vs Ready conflict; ACCS scope; Gartner report gated.
- Nov 2025 Bloomberg report of talks to raise at up to $3B: no closed round found; not added.

### Ranking cards
- `age-verification` (Best on-device age estimation), con 1 is now wrong:
  - Old: "Its Age Check Certification Scheme listing is vendor-stated; we did not confirm a register entry"
  - New: "The ACCS register lists Incode but shows no certified scope or dates"
- `south-africa` (Best for Home Affairs Database Checks): pricing and liveness statements still match; Home Affairs pros not re-checked in this pass.

### Score flag
- Possible: the record previously listed FedRAMP Moderate; Incode's own release shows only FedRAMP Ready (High). If the score credited a FedRAMP authorization, it may merit a second look. Score unchanged.

## Follow-up 2026-10-30 (AML screening capabilities)

Filled `capabilities` keys from vendor pages opened 2026-10-30. No existing values changed (all four keys were empty). Score, prose, `last_verified` and `updated` untouched.

- `identity_verification`: yes (ID document check plus face match and liveness); source 20, https://www.incode.com/use-cases/kyc-aml/
- `sanctions_pep`: add_on (Watchlist module); source 21, https://developer.incode.com/features-and-modules/watchlist/
- `adverse_media`: add_on (Watchlist module); source 21, https://developer.incode.com/features-and-modules/watchlist/
- `transaction_monitoring`: not_disclosed (not found on Incode pages); no vendor page found

- Note: Incode's KYC/AML page says periodic rescreening and ongoing monitoring are separate needs; the Watchlist module supports optional webhook subscriptions to watchlist changes. Marked add_on because screening is its own processing module; no published plan structure.
