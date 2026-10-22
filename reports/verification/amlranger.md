# AMLRanger: fact re-check 2026-10-18

## Changed

- Identity: "AML screening tool; company facts not independently verified" → AMLRanger (AML Ranger) is an AI screening assistant made by Ondato, live since October 2025 (sources 1, 2; amlranger.ai author tag names Ondato, source 3).
- Founded/HQ "Unverified" → maker Ondato, founded 2018, HQ London, R&D Vilnius (source 4).
- Pricing "not publicly disclosed" → free to use with monthly free credits; no paid tiers announced (source 2, third party).
- Features rewritten: three assistants (Sanctions, PEP, multilingual Adverse Media), real-time global and local sources, sourced reports in under 30 seconds (vendor claim) (sources 1, 2).
- Tagline, seo.description, verdict, what_is, pros, cons and FAQ rewritten to match.
- link.url null → https://amlranger.ai/ (link.type unchanged, null).
- Napier choose-instead: removed "150+ verified institutional clients".

## Removed / unverifiable

- Features "case management for flagged matches", "API-based integration", "ongoing monitoring": not stated for AML Ranger (these are Ondato's main AML software, source 5).
- All user-review themes ("screening-first tool", "simple to wire into onboarding flows"): no review listing found.
- "Founded/HQ unverified" FAQ answers.

## Ranking cards

- AMLRanger has no entry in `src/_data/rankings.yml` (no `slug: amlranger`). The record's `legacy_rank_claim` says "#6 in AML"; if any page still shows that rank, it should be reviewed.

## Score flag

- Yes. The review scored AMLRanger (4.2, Good) as a standalone screening vendor with case management and API. It is actually a free AI assistant inside Ondato, launched Oct 2025, with no announced case management, monitoring or API. The product scope is much narrower than the old page assumed, which plausibly changes the score and whether it belongs as its own AML review (versus an Ondato review). Score not changed.

## Follow-up 2026-10-22

### Changed

- Pricing: free tier with monthly credits now confirmed by the vendor (Ondato blog, source 6), not only press. `pricing.items` Price: "Free to use, monthly free credits" (third_party, source 2) → "Web portal with free monthly credits" (official, source 6); new item "Monthly credit allowance: Not publicly disclosed" (official, source 6); "Paid tiers: Not publicly disclosed" kept (source 2). Plan note "Monthly free credits" → "Free credits renewed monthly; allowance not published"; extra "No paid tiers listed" → "No paid tiers published". Summary and cost FAQ updated to match. `From` fact source 2 → 6, evidence vendor.
- API: Ondato's blog says AML Ranger is designed to integrate with banks' systems via API (source 6), while amlranger.ai says it needs no setup or APIs (source 7). "No announced ... API" was therefore too strong. Con 1 "An assistant for individual checks, with no announced case management, ongoing monitoring or API" → "An assistant for individual checks, with no announced case management or ongoing monitoring and no published API documentation". Verdict and by_profile "an API" / "API screening" → "a documented API" / "documented API screening".
- Con 2 "Data sources and paid limits are not documented publicly" → "Credit allowance, paid limits and named data sources are not published".
- New feature: sources in 100+ languages, according to Ondato (source 6).
- Sources 6 and 7 appended. last_verified and updated → 2026-10-22.

### Removed / unverifiable

- amlranger.ai pages still render only metadata to our tools, so the in-app plan screen, monthly credit allowance and any paid tier are unverified.
- Ongoing monitoring is hinted at in page metadata and press ("monitoring", "track status changes") but not described; not claimed.
- No G2, Capterra or Gartner Peer Insights listing for AML Ranger; no user_ratings. No product certifications.
- `capabilities.published_pricing.note` still reads "per press" (locked field; editor may update it to cite source 6).

### Ranking cards

- No entry with `slug: amlranger` in `src/_data/rankings.yml`. The Ondato card in `cheap-kyc` (`slug: null`, award "Self-Serve EU Option") has the pro "Ondato also makes the free AMLRanger screening assistant", which is still correct. Nothing to correct.

### Score flag

- No new flag. The free tier and the narrow scope found on 2026-10-18 still stand; the 2026-10-18 flag (score assumed a standalone screening vendor with case management) remains open for the editor.

## Re-score 2026-10-22

Owner-approved direction: lower. Score 4.2 Good → 3.3 Fair. Scored as what the record shows: a free AI screening assistant inside Ondato, not a standalone vendor.

| Criterion | Weight | Sub-score | Evidence |
|---|---|---|---|
| Compliance & certifications | 25 | 3.2 | vendor |
| Coverage | 20 | 3.4 | vendor |
| Pricing transparency | 20 | 3.6 | vendor |
| Integration & API depth | 15 | 2.8 | vendor |
| Support responsiveness | 10 | not scored | none |
| Track record | 10 | 3.7 | independent |

Arithmetic (support excluded, weights sum to 90): (25 × 3.2 + 20 × 3.4 + 20 × 3.6 + 15 × 2.8 + 10 × 3.7) / 90 = (80 + 68 + 72 + 42 + 37) / 90 = 299 / 90 = 3.322 → 3.3.

- Support responsiveness: score null, "Not publicly disclosed". amlranger.ai renders only metadata to our tools, no support channel, hours or SLA is described in the sources, and there are no user reviews.
- Compliance scores the product, not Ondato: Ondato's company badges are not attached to AML Ranger.
- `node scripts/checks/provider.mjs` flags `score` and `grade` as changed against HEAD; this is the intended, owner-approved change.
