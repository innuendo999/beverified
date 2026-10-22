# Zyphe: new review 2026-10-18

New record `src/_data/providers/zyphe.yml`, written at the vendor's request. Score 4.0 (Good), weighted from the six rubric criteria in `score_breakdown`. `link.type: none`.

## Checked (pages opened)

- Product and scope: homepage, AI agents page, KYC, KYB and AML product pages, customers page (sources 1, 7, 8, 9, 10, 13).
- Docs: docs index, KYB guide, KYB country coverage, SDK overview, sandbox mode, decentralization page, llms.txt index, supported-documents index (sources 4, 5, 6, 11, 12).
- Pricing: pricing page, rates updated 14 Oct 2026 (source 2). Per-check rates for ID and liveness ($0.30), AML screening ($0.20), monitoring ($0.05 per subject per year), forms ($0.05), proof of address ($0.20), wallet screening ($0.15), transaction monitoring ($0.02), white label (+$0.20); agent rates $0.25 to $3.00 per task; $25 one-time signup credit; Managed Operations custom. KYB not on the rate card.
- Certifications: security page and KYC product page (source 3, 7). SOC 2 and ISO/IEC 27001 both in progress; "Neither is certified today". No auditor or certification body named. No liveness lab test.
- Company: terms (Zyphe Inc., Delaware law, source 15); about page (New York, London, Milan, source 14); co-founders from Zyphe author page (source 25); funding release (source 17), PitchBook (source 18), Dealroom (source 19).
- Chartis: FCC50 2026 reports index, ranking and award winners page, main report page, Chartis organisation page for Zyphe (source 20); Zyphe news post (source 21).
- User ratings: G2 (4.8, 6 reviews, source 22), Capterra Canada (5.0, 2 reviews, source 23).
- Third party: CompanyData case study (source 24, KYB register data supplier).
- Support: contact page (source 16). News index (source 26). Searched for regulatory actions, breaches and litigation: none found.

## Zyphe's claims from the listing request

| Claim | Status | Evidence |
|---|---|---|
| AI agents prepare KYC, KYB, AML, sanctions and TM reviews with evidence and a written rationale; the customer's team approves each decision | Vendor-stated, accurate with a caveat | Agents page: five desks, evidence cited, rationale written, "Nothing closes without a person". But auto-pilot can be switched on for validated categories, so approval of every decision is the default, not a guarantee. KYC periodic review exists; a KYB-specific agent is the UBO and EDD desk plus the KYB agentic review engine in docs. |
| PII encrypted and split across storage nodes, not in one Zyphe database | Vendor-stated, not independently verified | Security page: encrypted shards across thousands of nodes, 29 of 100 shares needed, no master key. Docs decentralization page gives no threshold or network name; CompanyData says "tens of thousands of nodes". Cipher described as both AES-GCM-256 and AES-256. |
| IDV covers documents from 190+ countries | Vendor-stated | KYC product page: "4,000+ identity document versions from 190+ countries". Supported-documents docs list eight regions but give no totals. |
| Named in the Chartis Research FCC50 2026 | Partly confirmed | Chartis's own FCC50 2026 ranking and award winners page (9 Mar 2026) tags Zyphe and links a Chartis organisation page for it. The page tags 98 organisations and the ranking is paywalled, so Zyphe's category or placement is not visible. "Market Disruptor" is from Zyphe's news post only. Record wording: "Zyphe says Chartis named it a Market Disruptor ... and Chartis lists Zyphe among the organisations on its FCC50 2026 ranking page." |
| Pricing page: free self-serve tier for sandbox | Partly accurate | No standing free tier. A one-time $25 credit (about 80 ID checks) after business or payment-method verification. Sandbox tests on internal team members cost zero credits; outside addresses are billed, and all sandbox events use trial credits during the trial (sandbox docs). |
| Security page: security and certification status | Confirmed as described | It states SOC 2 Type I targeted Oct 2026, Type II observation from Q1 2027, ISO/IEC 27001 Stage 1 Oct 2026 and Stage 2 Nov to Dec 2026. Nothing certified yet. |
| docs.zyphe.com and KYB guide | Opened | Public API reference, Node and browser SDKs, no native iOS or Android SDK, signed webhooks, sandbox flag, MCP. KYB: 25% UBO threshold, linked KYC per owner, register cross-check in 49 countries and territories plus 50 US states and DC. |

## Could not confirm

- Founding year (Dealroom: 2021 in summary, launch January 2025; no Zyphe page). Shown as Not publicly disclosed.
- HQ: New York, London, Milan (about page) vs San Francisco (funding release dateline, Dealroom summary) vs Camden, Delaware registered-agent address (PitchBook). Offices and legal entity shown instead of a single HQ.
- Funding amount: undisclosed per Zyphe; PitchBook preview says $2M (dated 1 Apr 2025) and 16 employees. Attributed to PitchBook in `what_is` only.
- CEO title; only "co-founder" titles appear on a Zyphe page.
- KYB coverage conflict: docs 49 countries and territories plus 51 US entries; KYB product page "240+ official registries". Docs figure used.
- KYB prices (not on the rate card).
- Sanctions list coverage beyond OFAC, UN and EU; "100K+ lists" unexplained; list data provider not named.
- Liveness testing: no iBeta or ISO/IEC 30107-3 claim.
- Customer logos (EBSI, ETHDenver, Pitchdrive VC and others): labelled "clients & partners"; only case-study and quote customers used (Azimut, Protocol Labs, Supra, Vesseo, Twotixx).
- Capterra shows outdated pricing ($295/month Verify & Scale); ignored in favour of the current pricing page.
- Wikidata id; LinkedIn page blocked to the fetcher.

## Score

| Criterion | Weight | Sub-score |
|---|---|---|
| Compliance & certifications | 25 | 3.4 |
| Coverage | 20 | 4.2 |
| Pricing transparency | 20 | 4.5 |
| Integration & API depth | 15 | 4.4 |
| Support responsiveness | 10 | 3.9 |
| Track record | 10 | 3.6 |
| Weighted | | 4.00, shown 4.0 |

Calibration: below Enigma (4.4: vendor-stated SOC 2 Type 2, full rate card, 2011 company) because Zyphe has no certification at all yet, KYB is unpriced and the company is about a year and a half into the market with one small round. Below the 4.1 to 4.3 "Good" records, which all have longer track records. Grade "Good", the band used for 4.1 to 4.3; 4.0 is a new low for the site. Upside at the next re-check: a SOC 2 Type I report or ISO/IEC 27001 certificate that can be opened would lift Compliance to roughly 4.0 and the overall score to about 4.2.

## Ranking cards (suggested; rankings.yml not edited)

Positions follow the methodology (ordered by score, unreviewed entries after reviewed ones).

### kyb (Best KYB Solution Providers)

6th: after KYCAID, Veriff, ComplyAdvantage (4.6), Trulioo (4.5) and Enigma (4.4); ahead of the unreviewed Encompass, Kyckr and Ondato. Existing awards: Editor's Choice, Best for KYB Plus Biometric IDV, Best for Enterprise Risk Data, Best for Global Registry Reach, Best for US Business Verification, Best for Live Registry Pulls, Best for Registry Breadth, Best for SMB KYB.

```yaml
  - slug: zyphe
    name: Zyphe
    award: Best for Agent-Prepared KYB Reviews
    tagline: KYB with register cross-checks in 49 countries and territories plus the US, and AI agents that prepare UBO reviews for human sign-off, per Zyphe.
    coverage: Strongest in Europe and US
    size: SMB to Mid-market
    pros:
    - UBO discovery at a configurable 25% threshold, with linked KYC for every owner and director
    - AI agent prepares company and UBO reviews for $3.00 each, with cited evidence
    - Self-serve setup with a sandbox, Node and browser SDKs and an MCP server
    cons:
    - KYB prices are not on the published rate card
    - Register checks cover 49 countries and territories plus the US; elsewhere data is applicant-declared
    - SOC 2 and ISO/IEC 27001 are still in progress
    legacy_price_shown: From $3.00/UBO review
    legacy_rating_shown: null
    segments: []
```

### aml (Best AML Software Providers)

7th: after Sumsub (4.8), ComplyAdvantage, KYCAID (4.6), Trulioo, Onfido, Jumio (4.5); ahead of the unreviewed World-Check, LexisNexis, Fenergo and Actico. Existing awards: Editor's Choice, Best for Enterprise, Best for Global Identity Data, Best for Identity Verification, Most Popular, Best for Sanctions Screening, Best for Enterprise Onboarding, Best for Transaction Monitoring.

```yaml
  - slug: zyphe
    name: Zyphe
    award: Best for AI Alert Review
    tagline: AML screening and monitoring with AI agents that clear false-positive alerts and write up each case for a human to approve.
    coverage: Global
    size: SMB to Mid-market
    pros:
    - Published per-task prices, from $0.25 per resolved false-positive alert
    - Every agent case carries cited evidence and a written rationale, with human sign-off by default
    - Screening at $0.20, ongoing monitoring at $0.05 per subject a year and transaction monitoring at $0.02
    cons:
    - Only OFAC, UN and EU lists are named; the list data provider is not disclosed
    - No SOC 2 report or ISO/IEC 27001 certificate yet
    - Young vendor with a short track record and few public reviews
    legacy_price_shown: From $0.20/screening
    legacy_rating_shown: null
    segments: []
```

### identity-verification (Top Identity Verification Companies)

5th: after KYCAID, Persona (4.6), Onfido, Jumio (4.5). Existing awards: Editor's Choice, Best for Flexible Orchestration, Best for Biometric Liveness, Most Popular.

```yaml
  - slug: zyphe
    name: Zyphe
    award: Best for Privacy-First Storage
    tagline: Document and liveness checks with personal data encrypted and split across distributed storage nodes, per Zyphe.
    coverage: Global, 190+ countries
    size: SMB to Mid-market
    pros:
    - ID plus liveness at a published $0.30 per check
    - 4,000+ document versions from 190+ countries, with NFC chip reading, per Zyphe
    - No central store of customer PII, per Zyphe
    cons:
    - No published ISO/IEC 30107-3 liveness test
    - No native iOS or Android SDK; mobile apps use a WebView
    - Storage and coverage claims are vendor-stated
    legacy_price_shown: From $0.30/verification
    legacy_rating_shown: null
    segments: []
```

### cheap-kyc (Best Cheap KYC Providers)

4th: after Sumsub (4.8), KYCAID (4.6), Trulioo (4.5); ahead of the unreviewed Ondato. Its $0.30 ID and liveness price is the lowest published per-check price in this list. Existing awards: Editor's Choice, Best for Non-Documentary Checks, Self-Serve EU Option.

```yaml
  - slug: zyphe
    name: Zyphe
    award: Lowest Published Per-Check Price
    tagline: Self-serve KYC at $0.30 per ID and liveness check, with a $25 signup credit and no monthly fee.
    coverage: Global, 190+ countries
    size: SMB
    pros:
    - $0.30 per ID and liveness check, published
    - $25 one-time signup credit with no expiry and no monthly fee
    - Add-ons priced per check, such as AML screening at $0.20
    cons:
    - Credit is issued only after business or payment-method verification
    - No SOC 2 or ISO/IEC 27001 certificate yet
    - Short track record and few public reviews
    legacy_price_shown: From $0.30/verification
    legacy_rating_shown: null
    segments: []
```

### Other lists

- `e-kyc`: possible, but it duplicates `identity-verification` here; not added to `categories`.
- `crypto`: plausible (wallet screening at $0.15, crypto customers such as Supra and Yescoin), not added because the record does not document Travel Rule support or on-chain analytics. Reconsider if the owner wants it.
- `aml/banks`: not recommended until certifications exist.
- No country list fits.

## Score flag

None. New record. Re-check SOC 2 Type I and ISO/IEC 27001 Stage 1, both targeted for October 2026, at the next review.

## Follow-up 2026-10-22

Fact re-check of all 20 open `verification_notes`, the full rate card, `user_ratings[]` and the `capabilities` block. `last_verified` and `updated` set to 2026-10-22. Notes: 20 → 17 (3 resolved and removed, 2 merged into others, 2 new). New sources appended: 27 Reviewing KYB cases (docs), 28 TM alert queue (docs), 29 Billing (docs), 30 Preqin profile, 31 Fintech Meetup speaker profile.

### Pricing re-check (source 2, "Rates updated 14 October 2026")

All 15 existing pricing items match the pricing page: $25 one-time credit (about 80 checks, no expiry, after business or payment-method verification), ID and liveness $0.30, AML screening $0.20, ongoing monitoring $0.05 per subject per year, proof of address $0.20, wallet screening $0.15, transaction monitoring $0.02, white label +$0.20, AML and adverse media agents $0.25 per false-positive alert resolved, transaction alert agent $0.40, company and UBO investigation $3.00, periodic file refresh $3.00, EDD $1.00 per review round with a spending cap agreed before work begins, Managed Operations custom. KYB still not on the rate card; the KYB product page (source 8) still says priced per jurisdiction with ownership discovery metered by a credit budget. Billing docs (source 29) say there is no subscription or monthly minimum and the signup credit never expires.

### Changed

- `last_verified`: '2026-10-18' → '2026-10-22'.
- `pricing.items`: added "Forms: $0.05 per form" (published on the pricing page but missing from the record; source 2).
- `features[0]`: appended "The transaction alert agent is priced and documented, but Zyphe's AML page says it is not yet shipped." The AML product page (source 9) says agent triage of TM alerts is "planned and not yet shipped" and "currently fixed to Disabled", while the pricing page (source 2) lists it at $0.40 and the agents page (source 10) lists the desk.
- Notes resolved and removed: ID coverage (KYC page now reads "over 4,000 identity document versions from 190+ countries", consistent with the record's 4,000+, source 7); free tier (pricing page, sandbox docs and billing docs all match the record; sources 2, 12, 29); leadership (Fintech Meetup 2026 lists Michelangelo Frigo as Founder and CEO, source 31; the record makes no CEO claim, so no field change).
- Notes merged: integrations logos and accuracy figures into the "vendor figures not used" customers note; support into the user ratings note.
- New notes: transaction alert agent conflict; `case_management` capability (see below).

### Confirmed unchanged

- SOC 2 and ISO/IEC 27001: still in progress on 22 Oct 2026 (security page, source 3; KYC page "Neither is certified today", source 7). No report, certificate, auditor or news post found.
- Liveness: no lab test claim. KYB coverage: 49 countries and territories plus 50 US states and DC (source 6). Sanctions lists: only OFAC, UN, EU named.
- Company: about page (New York, London, Milan), co-founders (source 25), funding undisclosed July 2025 (source 17; Preqin source 30 agrees), PitchBook $2M and 16 employees unchanged, Dealroom unchanged.
- Chartis FCC50 2026: still only a tag on Chartis's page among 98 organisations; "Market Disruptor" only from Zyphe.
- User ratings: G2 4.8 from 6 reviews (source 22); Capterra Canada 5.0 from 2 reviews (source 23). Gartner Peer Insights: no Zyphe listing found, nothing added. Capterra still shows outdated $295 per month pricing.
- Customers page: Azimut, Protocol Labs, Supra (case studies), Vesseo, Twotixx (quotes) unchanged. Support: hello@zyphe.com, form, demo booking; no SLA.
- Features and FAQ: sandbox, mobile (no native iOS or Android SDK, WebView, React Native guide), signed webhooks (HMAC-SHA256), MCP server, storage claims, agent human sign-off and auto-pilot, FIU reporting all match current pages.

### Capabilities check (not edited)

- `case_management: not_disclosed` ("Agents work in your own case tools") looks wrong. The docs describe built-in case management: KYB case assignment, approval matrix with reason codes and second signature, an Inbox with SLA targets, a TM alert queue with New / In review / Escalated / Closed / SAR filed statuses, and an audit trail (sources 27, 28). The AML page (source 9) says agents share case management across KYC, KYB and AML. Suggest `yes`. Note added.
- Other capabilities agree with current pages: sanctions_pep, adverse_media, transaction_monitoring (deterministic rules engine, not ML), identity_verification, deployment (cloud; EEA, UK and US regions per security page), published_pricing partial.

### Removed / unverifiable

- Nothing removed from rendered copy. Still unverifiable (kept as notes): founding year, single HQ, funding amount, Chartis placement, certification completion, liveness lab test, storage claims, KYB 240+ registries claim, sanctions list detail and provider, transaction alert agent availability, Wikidata id.

### Ranking cards

Searched `src/_data/rankings.yml` for `slug: zyphe`: entries in `cheap-kyc`, `identity-verification` and `kyb` (no `aml` entry). No text is now wrong:
- `cheap-kyc`: $0.30, $25 credit with no expiry, no monthly fee (billing docs: no subscription or monthly minimum), AML $0.20, credit conditions: all confirmed.
- `identity-verification`: $0.30, 4,000+ document versions from 190+ countries with NFC, no ISO/IEC 30107-3 test, no native iOS or Android SDK: all confirmed.
- `kyb`: 49 countries and territories plus the US, 25% UBO threshold, $3.00 company and UBO review, KYB prices not published, SOC 2 and ISO/IEC 27001 in progress: all confirmed.

### Score flag

None. Nothing found that plausibly changes the editorial score. The SOC 2 Type I and ISO/IEC 27001 Stage 1 dates (October 2026) have arrived with no report or certificate yet; re-check in January 2027. The transaction alert agent not being shipped is a small gap in a priced feature, not a score change.
