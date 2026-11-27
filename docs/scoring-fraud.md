# Fraud prevention scoring methodology, Fraud 1.0 (2026-11-27)

Status: scope, page URL, H1, provider set and weights approved by the owner on 2026-11-27. This file turns them into scoring rules for the owner's final review. Not yet on /methodology/. No provider has a Fraud score yet.

Applies to the new ranking `/providers/fraud-prevention/`, H1 "Best Fraud Prevention Solutions for Banks and Fintechs in 2026" (owner).

## Owner decisions (2026-11-27)

1. **Scope: banks and fintechs only.** Fraud against a financial institution and its customers: card and payment fraud, account takeover, onboarding and application fraud (synthetic and stolen identities), authorised push payment (APP) scams and money mules. Out of scope: ecommerce chargeback and merchant tools (Forter, Signifyd, Riskified), ad, click and affiliate fraud, insurance and healthcare claims. Document fraud is covered by the identity verification ranking.
2. URL `/providers/fraud-prevention/`, H1 "Best Fraud Prevention Solutions for Banks and Fintechs in 2026". Keyword research: `claude/beverified-fraud-category.md` in the project (Ahrefs, US, 27 Nov 2026): "fraud prevention solutions" 1.6K, KD 18.
3. **Launch with providers we already review.** Bank-focused vendors we do not review yet (Featurespace, BioCatch, Alloy, DataVisor, Oscilar, Verafin and others) are listed as "Review coming" and enter the ranking only after their review is published, then the ranking is re-scored.
4. The ranking gets its own rubric under the standing rule of 2026-11-05: a separate score per category, the ranking sorts by it, the overall score on reviews is unchanged.
5. Weights approved as in the table below.
6. As for IDV 1.0: no hands-on tests, and detection rates, false-positive rates or "fraud losses cut by X%" figures never enter the score. Vendor figures use different data and cannot be compared.

## Buyer profile

Head of fraud or fraud operations at a bank, credit union, neobank, lender, payment company or brokerage, with compliance as a second voice. They choose on: which fraud types it catches, whether it decides in real time on their payment rails, how much of the decision they can see and tune, how it fits next to their AML monitoring, and what their auditor and regulator will accept.

## Ranking eligibility

All must hold, each stored with a source and a date:

1. The provider has a published BeVerified review, scored on v3.1 or re-scored under this rubric (Quantexa, still on v3.0, may be ranked once its fraud data is filled).
2. It sells a fraud product for financial institutions or fintechs, described on its own site: at least one of transaction or payment fraud scoring, account takeover detection, or onboarding/application fraud detection (`capabilities.fraud_transaction`, `capabilities.fraud_ato`, `capabilities.fraud_onboarding` = `yes` or `add_on`). AML transaction monitoring alone does not qualify.
3. The product is generally available.
4. Top 10 only.

A provider that fails a rule is left out, not scored low, and the page's "Not in this ranking, and why" block names the reason.

## Rules for every criterion

As v3.1, IDV 1.0 and Budget KYC 1.0:
- Sub-score 1 to 5, in steps of 0.5, from the guide below. The same data gives the same sub-score.
- Each sub-score lists its evidence level (Independent, Vendor-stated, Hands-on). Almost all fraud evidence is Vendor-stated; the review says so.
- No public data for a criterion: "Not publicly disclosed", no sub-score, its weight shared out in proportion over the scored criteria.
- Fraud score = weighted average, rounded to 0.1. Stored in `category_scores.fraud-prevention`, never replaces the overall score.
- User ratings stay outside. Payment, affiliate, paid-link or sponsored status never enters any criterion.
- Values are read from the record (`capabilities{}`, `integration{}`, `certifications[]`, `pricing`, `incidents.yml`), never retyped.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Fraud coverage | 25% | Which of our fraud types does it catch? |
| Signals and models | 20% | What does it see beyond the transaction, and how does it decide? |
| Real-time decisioning | 15% | Can it stop a payment or login before it completes, and can we tune and explain the decision? |
| Bank and fintech fit | 15% | Does it run on our rails, in our setup, next to our AML work? |
| Integration and access | 10% | How fast can we test and go live? |
| Pricing transparency | 5% | Can we see what it costs before a sales call? |
| Trust | 10% | Will our auditor accept the vendor, and has it had incidents? |

### Fraud coverage (25%)

One point for each fraud type the vendor's own site or docs describe a product or model for, sub-score = points, minimum 1, cap 5:
- card and payment fraud: transaction scoring for cards, transfers or wallets (`capabilities.fraud_transaction`);
- account takeover: login, session or credential-change risk (`capabilities.fraud_ato`);
- onboarding and application fraud: synthetic or stolen identities, first-party and loan application fraud (`capabilities.fraud_onboarding`);
- APP and scam detection: authorised push payment fraud, social engineering, scam payments (`capabilities.fraud_scam`);
- money mule detection: inbound mule accounts or mule networks (`capabilities.fraud_mule`).

### Signals and models (20%)

One point each, sub-score = points + 1, cap 5:
- device intelligence: device fingerprinting, emulator, bot or remote-access detection (`capabilities.device_intelligence`);
- behavioural biometrics: typing, swipe, mouse or session behaviour (`capabilities.behavioral_biometrics`);
- graph or network analytics linking accounts, devices and payments (`capabilities.graph_analytics`);
- consortium or shared fraud data across customers (`capabilities.fraud_consortium`).

Machine learning plus rules is expected of every vendor here and earns nothing on its own.

### Real-time decisioning (15%)

One point each, sub-score = points + 1, cap 5:
- a real-time decision API that returns a score or action before the event completes (`capabilities.realtime_decisioning`; note the stated latency if published);
- rules the customer writes and changes without code (`integration.no_code` or `capabilities.fraud_rules`);
- an explanation per decision: reason codes or the features that drove the score (`capabilities.explainability`);
- built-in case management for fraud alerts (`capabilities.case_management`).

### Bank and fintech fit (15%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| Named support for real-time payment rails: RTP, FedNow, Faster Payments, SEPA Instant, Pix or UPI (`capabilities.instant_payments`) | +1 |
| Card and ACH or bank transfer fraud both covered | +0.5 |
| On-premises or private-cloud deployment, or a data residency choice (`capabilities.deployment`, `capabilities.data_residency`) | +1 |
| Fraud and AML on one platform: the vendor also sells AML transaction monitoring that shares cases or data with the fraud product (`capabilities.transaction_monitoring`) | +1 |
| Named bank or regulated fintech customers on the vendor's own site | +0.5 |

### Integration and access (10%)

One point each, sub-score = points + 1, cap 5:
- public API documentation without login (`integration.docs_public`);
- SDKs for web and mobile, where device or behavioural signals need them (`integration.sdks`);
- self-serve sandbox or free trial (`integration.sandbox`);
- a stated go-live time or a shadow mode to test rules on live traffic without blocking (`capabilities.shadow_mode`).

### Pricing transparency (5%)

| Evidence | Sub-score |
|---|---|
| Published price list with per-check or per-transaction prices | 5 |
| Published entry plan, larger plans quoted | 4 |
| Pricing model described (per transaction, per account, platform fee), no figures | 3 |
| Quote only | 2 |

### Trust (10%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| ISO/IEC 27001 or SOC 2 Type 2, confirmed (certificate, register or report opened) | +2 (vendor-stated: +1) |
| PCI DSS attestation, confirmed, when the product handles card data | +1 (vendor-stated: +0.5) |
| No change of owner, sale process or wind-down announced in the last 12 months | +1 |

Deductions: public regulatory action, disclosed breach or incident in the last 24 months, -1 each, from `incidents.yml` (`counted: false` is not deducted).

## What the score cannot measure

Public evidence cannot show detection rate, false positives, the share of good customers blocked or friction added, or results on your own traffic, and vendor figures cannot be compared. The ranking page says so next to the table and gives a short "What to test in a pilot" block: run the vendor in shadow mode on your own history, measure fraud caught at your alert volume, false positives per thousand transactions, analyst time per case and decision latency on your rails.

Independent tests: no public independent test of fraud detection vendors comparable to iBeta or NIST exists to our knowledge (check of 27 Nov 2026). Analyst reports (Gartner, Forrester, Chartis) are paywalled opinion and are not used.

## New data fields

- `capabilities.fraud_transaction`, `fraud_ato`, `fraud_onboarding`, `fraud_scam`, `fraud_mule`, `device_intelligence`, `behavioral_biometrics`, `graph_analytics`, `fraud_consortium`, `realtime_decisioning`, `fraud_rules`, `explainability`, `instant_payments`, `shadow_mode`: same shape as other capabilities (`{status, note, source}`, optional `checked`). Keys that already exist (`case_management`, `transaction_monitoring`, `deployment`, `data_residency`) are reused. Add the new keys to `docs/data-schema.md` in the data PR.
- `category_scores.fraud-prevention{ score, breakdown[], methodology: fraud-1.0, scored }`, written by `scripts/rescore-fraud.mjs --write`, never by hand.
- Category file `src/_data/categories/fraud-prevention.yml`: `layout: v2`, `score_source: category`, `score_label: Fraud score`, `rubric: rubricFraud`, `methodology_label: Fraud 1.0`, `methodology_anchor: '#fraud-prevention'`.

## Candidates

Reviewed, to be checked against eligibility in the data pass: SEON, Sardine, Feedzai, Unit21, Hawk AI, Socure, NICE Actimize, Quantexa, ComplyAdvantage, Sumsub. A vendor whose fraud product is only an add-on to KYC or AML is checked on rule 2 like everyone else.

Review coming (tracked, not ranked): Featurespace (Visa), BioCatch, Alloy, DataVisor, Oscilar, Verafin (Nasdaq). More may be added from the data pass.

## Page (proposal, needs owner approval before it is built)

- Ranking layout v2 (as Identity Verification and AML): top 3 table, cards for all ranked providers with evidence chips, FAQ.
- Top 3 columns: Fraud score, fraud types covered, signals (device, behavioural, graph, consortium), real-time rails, starting price.
- A plain line next to the table on what the score cannot measure, and the pilot block.
- `segments`: Best for neobanks and fintechs, Best for banks and credit unions, Best for fraud and AML on one platform, Best for APP scams, each from record facts.
- Glossary terms to link: account takeover, APP fraud, money mule, synthetic identity, behavioural biometrics, device fingerprinting (those not in the glossary yet are listed in the content PR).
- Menu: Rankings, Business and AML group. Use-case cards on the homepage and `/use-cases/` follow the existing rules.
- No rubric bar charts or stat tiles (owner, 2026-11-09).

## Rollout

1. This file (owner reviews).
2. Methodology page: a "Fraud prevention" section with criteria, weights, the buyer profile and the date, plus a changelog entry, and `site.json` `v3.rubricFraud`. Published before any score.
3. Data: the new capability keys for every candidate record, sources dated, written with `scripts/set-capabilities.py`; `tracked.yml` entries for the "Review coming" vendors.
4. `scripts/rescore-fraud.mjs` writes `reports/rescore-fraud-1.0.csv` (eligibility reason, Fraud score, each sub-score). Owner reviews; manual overrides only with a written reason.
5. Page PR: category file, cards and quick answer from the records (humanizer, invisible-characters, pre-publish check), menu link.
