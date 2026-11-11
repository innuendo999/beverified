# Budget KYC scoring methodology, Budget KYC 1.0 (2026-11-11)

Status: criteria, weights and eligibility approved by the owner on 2026-11-11. Not yet on /methodology/. No provider has a Budget score yet.

Applies to the ranking `/providers/cheap-kyc/` (menu label "Budget KYC"). The H1 and title stay as they are.

## Owner decisions (2026-11-11)

1. The category answers one question: what does a working KYC check cost, and what quality do you get for that money. It gets its own rubric under the standing rule of 2026-11-05 (a separate score per category; the ranking sorts by it; the overall score is unchanged).
2. Weights approved as drafted (table below).
3. Cost is measured on two volume scenarios: 100 and 1,000 checks a month.
4. Prices in EUR or GBP are converted to USD for scoring only, at the ECB reference rate on the date the price was checked. Pages keep showing the price as the vendor publishes it.
5. A provider with a monthly minimum is ranked only if its own pricing page or docs say the minimum covers checks (a minimum spend or included checks). If it does not say, the provider is not ranked here.
6. Quality floor: the provider sells liveness (identity-rubric Fraud defense of at least 2.0). A confirmed iBeta letter is not required to enter; it raises the quality sub-score. Owner chose this after the iBeta check of 11 Nov 2026 showed that a 3.0 floor leaves two providers.
7. Per-user monthly fees count once per check; Zyphe and Socure stay eligible although their pricing pages do not name face match (owner, 2026-11-11, after the re-check).
8. The KYCAID ranking card still shows the pricing KYCAID dropped (bundles, fixed EUR 100 monthly fee). Fix it.

## Ranking eligibility

All must hold, each stored with a source and a date:

1. The provider has a published BeVerified review.
2. An official price for a full KYC check is public: document verification, liveness and face match, per check, or a plan that states how many checks it includes. Visible on the vendor's site or docs without a login, demo or sales form (same rule as the KYC Pricing Index).
3. That price was checked no more than 90 days before the score is computed.
4. Any monthly minimum is stated by the vendor to cover checks (see decision 5).
5. The provider sells liveness: identity-rubric Fraud defense sub-score of 2.0 or more.
6. Third-party price estimates (G2, Capterra, Vendr and similar) never make a provider eligible and never enter the score. They can still appear in the review.

A provider that fails a rule is left out, not scored low. If fewer than 3 providers qualify, the page shows the cost table without rank numbers.

## Rules for every criterion

As v3.1 and KYA 1.0:
- Sub-score 1 to 5, in steps of 0.5, from the guide below. The same data gives the same sub-score.
- Each sub-score lists its evidence level (Independent, Vendor-stated, Hands-on).
- No public data for a criterion: "Not publicly disclosed", no sub-score, its weight shared out in proportion over the scored criteria.
- Budget score = weighted average, rounded to 0.1. Stored per category, never replaces the overall score.
- User ratings stay outside. Payment, affiliate, paid-link or sponsored status never enters any criterion.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Cost at 100 and 1,000 checks a month | 30% | What do we pay per working check at our volume? |
| AML screening cost | 10% | What does adding sanctions and PEP screening cost? |
| Quality for the money | 35% | What do we get for that price? |
| Commitment and entry terms | 15% | Can a small team start and leave without being locked in? |
| Price transparency | 10% | Can we work out the bill before talking to sales? |

### Cost at 100 and 1,000 checks a month (30%)

A KYC check = document verification + liveness + face match. If the vendor sells them as modules, the module prices are added (for example document + liveness and face match).

For each scenario (S = 100, M = 1,000 checks a month):
- take the cheapest published plan that includes the full check;
- monthly cost = the larger of (checks x per-check price, after published volume tiers) and the credited minimum, plus any fee charged on top;
- effective price = monthly cost / checks, in USD (decision 4).

Fees billed per active user each month (for example storage) count once per check, for the month of the check (owner, 2026-11-11). One-off signup credits and trials do not lower the cost (they count under Terms). A recurring monthly free allowance lowers the cost only if every new customer gets it without applying; allowances tied to a startup or partner programme count under Terms only.

| Effective price per check | Sub-score |
|---|---|
| $0.50 or less | 5 |
| $0.51 to $0.90 | 4 |
| $0.91 to $1.40 | 3 |
| $1.41 to $2.00 | 2 |
| over $2.00 | 1 |

Criterion sub-score = average of the S and M sub-scores (15% each). A 10,000 checks scenario is shown on the page but not scored: at that volume most vendors quote.

### AML screening cost (10%)

AML cost per check = (cheapest monthly cost at M for KYC plus one sanctions and PEP screening per user, minus the KYC-only cost at M) / 1,000, in USD. This catches screening that is only sold on a higher plan.

| AML cost per check | Sub-score |
|---|---|
| Included in the KYC price | 5 |
| $0.25 or less | 4 |
| $0.26 to $0.50 | 3 |
| $0.51 to $1.00 | 2 |
| over $1.00, or screening not sold | 1 |
| Screening sold but not priced publicly | Not publicly disclosed |

### Quality for the money (35%)

The identity-rubric v3.1 sub-scores, computed for the KYC check whatever the provider's `primary_category` (an AML- or KYB-primary record is not scored on the AML or KYB guide here). Same rule tables as `docs/scoring-v3.1.md`, read from the record, never retyped.

| Part | Weight inside 35% |
|---|---|
| Fraud defense (liveness path; iBeta letter levels, injection test, NIST, NFC) | 12.5% |
| Coverage | 7.5% |
| Platform breadth (identity module list, unscoped) | 7.5% |
| Integration and time to launch | 7.5% |

These are half of the v3.1 identity weights, so the balance between them does not change. Trust and track record is not scored here; a provider's incidents still show on its review and in the tracker.

A provider without a confirmed iBeta letter carries the con "No independent liveness test found" on its ranking card. On 11 Nov 2026 iBeta's list had no letter under the names ComplyCube, Socure, iDenfy, AU10TIX, Zyphe or KYCAID; a letter held by an SDK supplier counts as Vendor-stated, as in v3.1.

### Commitment and entry terms (15%)

Points, sub-score = points + 1, cap 5:
- no monthly minimum: +1.5; credited minimum of $100 or less: +1; credited minimum over $100: +0.5;
- no annual or fixed-term contract on the cheapest plan that includes the full check: +1;
- self-serve signup and go-live without a sales call: +1;
- free trial, free tier or signup credit open to any new customer: +0.5.

### Price transparency (10%)

One point each, sub-score = points + 1, cap 5:
- every part of the KYC check (document, liveness, face match) is priced publicly, alone or as one price;
- AML screening is priced publicly;
- volume tiers, or the volume where custom pricing starts, are published;
- add-on fees (monitoring, data retention, manual review) are listed, or the vendor states there are none.

## What the score cannot measure

The score uses list prices. It cannot see negotiated discounts, approved-only billing in practice, failed or repeated checks you pay for, currency and VAT on your invoice, or pass rates on your users. A cheap check that fails good users costs more than its price. The ranking page carries a "What to ask before you sign" block with these points.

## New data fields

- `budget{}` in the provider record, each value `{value, note, source, verified}`:
  `plan` (cheapest plan with the full check), `check_price` (per-check price or module prices), `currency`, `tiers[]` (published volume tiers), `minimum` (`{amount, credited: true|false|not_stated}`), `fee_on_top`, `aml_price` (+ `aml_plan` if it needs another plan), `contract` (`none|annual|fixed_term|not_stated`), `self_serve`, `free_start` (`{kind: trial|free_tier|credit|programme, value}`), `addons_listed`, `custom_from` (volume where quoting starts).
  Figures are read from `pricing.items` by label where they already exist (the `price_item` pattern from the liveness ranking), so a price is never typed twice.
- `budget.fx{ rate, date, source }` for non-USD prices (ECB reference rate).
- KYCAID: `capabilities.liveness` is missing although KYCAID prices liveness and face match at EUR 0.25. Add it with its source before scoring.
- `category_scores.cheap-kyc{ score, breakdown[], cost_s, cost_m, aml_cost, methodology: budget-kyc-1.0, scored }`, written by `scripts/rescore-budget.mjs --write`, never by hand.
- Category file `cheap-kyc.yml`: `score_source: category`, `score_label: Budget score`, `rubric: rubricBudget`, `methodology_label: Budget KYC 1.0`, `methodology_anchor: '#budget-kyc'` (mechanism from PR #99).

## Page (proposal, needs owner approval before it is built)

- Ranking table and cards show the Budget score, labelled "Budget score".
- Main block: "What you would pay at 100, 1,000 and 10,000 checks a month", one row per provider, with the sum shown (checks x price, minimum) and the original currency.
- One line per card where a cheaper provider ranks below a dearer one, saying why (for example no independent liveness test).
- No rubric bar charts or stat tiles on the page (owner, 2026-11-09).
- Review pages: "Ranked in" shows the rank only, as for KYA.

## Rollout

1. This file (owner approved the rules on 2026-11-11).
2. Methodology page: a "Budget KYC" section with criteria, weights and the date, plus a changelog entry. Published before any score.
3. Data: `budget{}` for the candidates, sources dated, verification-spec; KYCAID liveness capability; ECB rates.
4. `scripts/rescore-budget.mjs` reuses the v3.1 functions (exported from `scripts/rescore.mjs`), writes `reports/rescore-budget-1.0.csv` with old rank, new rank, Budget score, costs S and M. Owner reviews; manual overrides only with a written reason.
5. One PR: rankings re-ordered, cards and quick answer rewritten from the records (humanizer, invisible-characters, pre-publish check), KYCAID card fixed, page blocks as approved.

## Evidence snapshot, 11 Nov 2026 (calibration only, not scored)

| Provider | Full check, cheapest public price | Minimum | Minimum covers checks? | iBeta letter (own name) | Eligible today |
|---|---|---|---|---|---|
| Zyphe | $0.30 (ID and liveness) | none listed | n/a | not found | yes |
| KYCAID | EUR 0.50 document + EUR 0.25 liveness and face match | none on usage plan | n/a | not found | yes, after the liveness capability is added |
| ComplyCube | $1.05 + $0.35 (Starter), $0.75 + $0.20 (Core) | $99 Starter, $299 Core | yes, "credited against checks" | not found | yes |
| Socure | $0.80 (DocV) | none stated | n/a | not found | yes; check the minimum and whether Launch credits are open to all |
| iDenfy | $1.35 Basic, $1.30 Premium | $135 Basic, $325 Premium | yes, billed like a subscription, unused checks do not roll over | not found | yes |
| Sumsub | $1.35 Basic | $149 Basic | yes, "the minimum amount that you pay each month", extra checks charged above it | L1, L2, L3 | yes |
| Shufti Pro | from $1.50 (Essentials) | none stated | n/a | L1, L2, L3 | yes |
| Veriff | $0.80 Essential | $49 | not stated ("minimum monthly commitment") | L1, L2 | no (decision 5) |
| Persona | no per-check price; Essential from $250 a month | 12-month term | not stated | L1, L2 | no (rule 2) |
| AU10TIX | per-check not disclosed | $500 | not stated | not found | no (rule 2) |
| Trulioo | quote only (G2 data, Jan 2021) | n/a | n/a | not found | no (rule 2) |
| Ondato | n/a | n/a | n/a | n/a | no (no review) |

## Sources (accessed 11 Nov 2026)

1. iBeta, ISO 30107-3 Presentation Attack Detection confirmation letters. https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/
2. Sumsub, Pricing. https://sumsub.com/pricing/
3. Veriff, Pricing. https://www.veriff.com/pricing
4. iDenfy, Pay-As-You-Go billing (documentation). https://documentation.idenfy.com/resources/billing/pay-as-you-go.md
5. Other prices: provider records `pricing.items` (checked Nov 2026) and the KYC Pricing Index, /publications/kyc-pricing-index/.
6. ECB euro foreign exchange reference rates. https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html
