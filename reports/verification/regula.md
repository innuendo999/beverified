# Regula: fact re-check 2026-10-18

## Changed
- Template library "16,000+" → "16,500+" document templates, 254 countries and territories (source 2).
- "Not a full onboarding platform" / FAQ "Does Regula offer a hosted, no-code platform? No" → Regula launched an IDV Platform on 14 Oct 2025 with document, biometric, AML and PEP screening, cloud or on-premise (source 7). Tagline, verdict, what_is, features, con 2 and con 3, FAQ and Jumio choose_instead text updated.
- Pricing: not published, confirmed; added usage-based pricing and 30-day free trial of the Document Reader SDK (source 2).
- Founded 1992: confirmed (source 3). Offices Daugavpils, Reston, Warsaw, Düsseldorf, Naarden, Rio de Janeiro (source 3).
- CEO: Arif Mamedov listed as chief executive of Regula Forensics, Inc. (source 8).
- Gartner MQ 2025 → 2026 Gartner Magic Quadrant for Identity Verification, vendor-stated (source 1).
- Face SDK: liveness iBeta Level 1 and 2 (sources 5, 6); deployment wording "on-premise and on-device" → self-hosted Linux/Windows/Docker packages and offline mobile operation (sources 2, 5).
- Customers: added "over 2,000 enterprises" (vendor, source 3).
- Certifications added: iBeta ISO/IEC 30107-3 Level 2 confirmed (Regula Face Mobile SDK, Mar 2025 and Dec 2025, source 6); ISO 27001:2022, ISO 9001:2015, ISO 14001:2015 vendor-stated (source 4).
- Pro 1 "Largest document template library in the category" → "Largest document template library we track" (editorial scope, not a market-wide claim).

## Removed / unverifiable
- Co-founder Ivan Shumsky (no source opened).
- "Support for 30+ languages across SDK and hardware interfaces" (not found; SDK page states 138+ document languages and scripts, a different measure).
- Review theme qualifiers ("cited in several third-party evaluations", "reviewers often flag").

## Ranking cards
- No entries with `slug: regula` in `src/_data/rankings.yml`.

## Score flag
- None negative. The new IDV Platform with AML screening (Oct 2025) widens scope beyond what the old review assessed; editor may want to revisit the "SDK only" framing in the score rationale. Score unchanged.

## Follow-up 2026-10-22

### Changed
- HQ fact: "Daugavpils, Latvia (offices also in Reston, VA)", vendor office list (source 3) → "Daugavpils, Latvia (registered office of SIA Regula Baltija)", Lursoft register data: reg. no. 41503036161, registered 17 Jun 2005, Višķu iela 34, Daugavpils (source 11, independent).
- Recognition fact: "Gartner Magic Quadrant for Identity Verification 2026" (homepage, source 1) → "Niche Player, Gartner Magic Quadrant for Identity Verification 2025 and 2026" (Regula releases of 30 Jul 2026 and 27 Aug 2025, sources 9 and 10).
- user_ratings added: G2 4.8 from 41 reviews (source 12); Gartner Peer Insights, Regula Document Reader SDK, 4.8 from 14 ratings (source 13).
- Template count re-checked: SDK page still says 16,500+ templates from 254 countries and territories, 30-day free trial, usage-based pricing (source 2). No change.

### Removed / unverifiable
- Notes closed: co-founder Ivan Shumsky (claim already removed; still no source found), "30+ languages" (already removed), search-budget note.
- Still unresolved: certification body, numbers and dates for ISO/IEC 27001:2022, ISO 9001:2015 and ISO 14001:2015 (vendor page only; kept vendor_stated). Regula does not name a group HQ; the official Register of Enterprises page was not opened directly.

### Ranking cards
- No `slug: regula` in `src/_data/rankings.yml`.

### Score flag
- None.

## Follow-up 2026-10-30 (AML screening capabilities)

- identity_verification: yes. https://regulaforensics.com/products/identity-verification-platform/ (source 14)
- sanctions_pep: add_on. https://docs.regulaforensics.com/develop/idv/release-notes/3-1/ (source 15; third-party services "such as Polixis PEP&REP"); the platform page (source 14) claims AML/PEP watchlist screening without naming a provider
- adverse_media: not_disclosed. nothing found on vendor pages
- transaction_monitoring: not_disclosed. nothing found on vendor pages
- No existing values changed (the four keys were empty). capabilities.checked stays 2026-10.

## v3.1 fields 2026-11-05

Added (key: status, source):
- `pricing.model`: published none, minimum null (not stated), trial true (30-day Document Reader SDK trial); source 2
- `capabilities.deployment`: cloud_and_on_prem (IDV Platform on premises or hosted cloud); source 14 (was missing)
- `capabilities.liveness`: yes; source 5
- `capabilities.injection_detection`: yes, vendor-stated (injected video into camera stream); source 5. iBeta list shows PAD letters only, no IAD letter, so no `independent`.
- `capabilities.data_residency`: partial (on premises option, no cloud region choice stated); source 14
- `integration.docs_public`, `sdk_web`, `sdk_ios`, `sdk_android`: yes; source 16. `sandbox`: yes (demo license via self-created account on the licensing page); source 16.
- `coverage.countries`: 254; source 2. `coverage.document_types`: 17000 (templates); source 2.
- `track_record.ownership`: stable (operating since 1992, no sale found); source 3. `incidents`: none found.

Not disclosed: `reusable_id`; `integration.no_code` (configurable workflows, "no-code" not stated); `integration.support_hours` (regulaforensics.com/support/ did not load); `coverage.non_doc`.

Rescore (v3.1 draft): 4.6 -> 3.8, scored weight 80% (pricing n/d: no price published, no third-party data).

Fact drift: the Document Reader SDK page now says 17,000+ templates and documents; `verification_notes` and existing copy cite 16,500+. Not changed here.
