# Fraud prevention scoring methodology, Fraud 1.0 (2026-11-27)

Status: scope, page URL, H1, provider set, buyer profile and weights approved by the owner on 2026-11-27 (weights revised the same day after the ICP and JTBD review below). Not yet on /methodology/. No provider has a Fraud score yet.

Applies to the new ranking `/providers/fraud-prevention/`, H1 "Best Fraud Prevention Solutions for Banks and Fintechs in 2026" (owner).

## Owner decisions (2026-11-27)

1. **Scope: banks and fintechs only.** Fraud against a financial institution and its customers: card and payment fraud, check and deposit fraud, account takeover, onboarding and application fraud (synthetic and stolen identities), authorised push payment (APP) and impersonation scams, money mules. Out of scope: ecommerce chargeback and merchant tools (Forter, Signifyd, Riskified), ad, click and affiliate fraud, insurance and healthcare claims. Document fraud is covered by the identity verification ranking.
2. URL `/providers/fraud-prevention/`, H1 "Best Fraud Prevention Solutions for Banks and Fintechs in 2026". Keyword research: `claude/beverified-fraud-category.md` in the project (Ahrefs, US, 27 Nov 2026): "fraud prevention solutions" 1.6K, KD 18.
3. **Launch with providers we already review.** Bank-focused vendors we do not review yet (Featurespace, BioCatch, Alloy, DataVisor, Oscilar, Verafin and others) are listed as "Review coming" and enter the ranking only after their review is published, then the ranking is re-scored.
4. The ranking gets its own rubric under the standing rule of 2026-11-05: a separate score per category, the ranking sorts by it, the overall score on reviews is unchanged.
5. **Weights revised after the ICP and JTBD review (same day):** scams, account takeover and behavioural signals weigh more; check fraud, payee verification, payment interventions, rule testing, investigations and openness to the buyer's own data and models are added. Table below.
6. As for IDV 1.0: no hands-on tests, and detection rates, false-positive rates or "fraud losses cut by X%" figures never enter the score. Vendor figures use different data and cannot be compared.
7. One score for banks and fintechs. Their different needs are shown by `segments` (Best for banks and credit unions, Best for neobanks and fintechs), not by separate weights.

## Buyer profile (ICP)

Head of fraud or fraud operations at a bank, credit union, neobank, lender, payment company or brokerage, with compliance as a second voice. Two groups with different first pains:
- **Banks and credit unions (US, UK, EU):** card and check fraud, scams paid out of customer accounts, reimbursement liability, legacy core systems, fraud and AML teams working on the same customers.
- **Neobanks and fintechs:** onboarding and synthetic identity fraud, account takeover, API-first integration, speed to go live and price.

## Jobs to be done and the evidence behind them

Sources are rated as in the SEO evidence rules: regulators and central banks (T1) and industry bodies (T2) first; surveys run by vendors (T3/T4) only where they agree with them. Accessed 27 Nov 2026.

| Job | Evidence | How the rubric answers it |
|---|---|---|
| Stop scams and account takeover that pass through a legitimate login | PYMNTS Intelligence (survey of 90 US banks, credit unions and fintechs, Jul 2026): 50.6% of fraud dollars involved a legitimate login or customer manipulation, up from 27.6% two years earlier; scams where the customer was manipulated into paying rose to 22.4% of fraud dollars from 12%. ThreatMark Fraud Readiness Benchmark 2026 (vendor survey): 55% say social engineering is involved in most of their fraud; 83% rate behavioural intelligence effective against it, 18% use it | Scams and account takeover weigh 1.5 in Fraud coverage; behavioural biometrics weighs 1.5 in Signals |
| Cut reimbursement liability for scams | PSR APP scams reimbursement dashboard (UK, updated 30 Jul 2026): 88% (£316m) of in-scope APP losses reimbursed. EU PSR and PSD3 political agreement (27 Nov 2025): payee name and IBAN verification for all credit transfers, full refund of bank-impersonation fraud. ThreatMark: 69% of North American respondents expect APP reimbursement rules within two years, 31% are ready | Payee verification (VoP, CoP) in Bank and fintech fit; interventions in the payment flow (hold, warning, step-up) in Decisioning and control |
| Stop check and card fraud (US banks and credit unions) | Federal Reserve Financial Services Risk Officer Survey 2026 (400+ institutions, Q4 2025): debit card fraud seen by 75%, about 40% of payment fraud losses; check fraud seen by 60%, counterfeit checks up 32%. American Banker 2026 Predictions: 56% of community bankers say check fraud will hurt them most in 2026 | Check and deposit fraud added to Fraud coverage; card fraud kept |
| Catch fraud without blocking good customers | Alloy State of Fraud 2026 (vendor survey, 500+ leaders): 91% of enterprise banks rank goodwill credits among the top fraud consequences. Fiserv study cited by ABA Banking Journal: 20% of cardholders stop using a card after more than one false decline in six months | False positives cannot be measured from public evidence; the rubric scores the controls that reduce them: rule testing on history or in shadow mode before going live, graduated responses instead of a hard block, an explanation per decision |
| Handle growing case volumes with the same team | ThreatMark: 91% agree AI can shorten fraud investigations significantly | New criterion Investigations: case management, AI help in investigations, filing from a fraud case |
| Fit into an already complex stack, keep own models | PYMNTS Intelligence: 78% name the complexity of new systems as their top barrier to innovation (48% a year earlier); 93% of those building in-house combine third-party technology with their own tools | Integration and openness: bring your own data and models, orchestration of third-party signals, public docs, sandbox |
| One view of fraud and AML on the same customers | Common across the vendor reviews we hold; UK Finance and BioCatch/Nasdaq Verafin forewords in the UK Finance Annual Fraud Report 2026 treat scams and mules as one problem | Fraud and AML on one platform, and mule detection, in Bank and fintech fit and Fraud coverage |

Reading the numbers: most survey figures come from vendors (PYMNTS reports are often sponsored; Alloy, ThreatMark, Alogent and SAS sell fraud tools). They are used only to rank the jobs, never quoted as fact on the page without the source named.

## Ranking eligibility

All must hold, each stored with a source and a date:

1. The provider has a published BeVerified review, scored on v3.1 or re-scored under this rubric (Quantexa, still on v3.0, may be ranked once its fraud data is filled).
2. It sells a fraud product for financial institutions or fintechs, described on its own site: at least one of transaction or payment fraud scoring, account takeover detection, scam detection, or onboarding/application fraud detection (`capabilities.fraud_transaction`, `fraud_ato`, `fraud_scam`, `fraud_onboarding` = `yes` or `add_on`). AML transaction monitoring alone does not qualify.
3. The product is generally available.
4. Top 10 only.

A provider that fails a rule is left out, not scored low, and the page's "Not in this ranking, and why" block names the reason.

## Rules for every criterion

As v3.1, IDV 1.0 and Budget KYC 1.0:
- Sub-score 1 to 5, in steps of 0.5, from the guide below (round half up). The same data gives the same sub-score.
- Each sub-score lists its evidence level (Independent, Vendor-stated, Hands-on). Almost all fraud evidence is Vendor-stated; the review says so.
- No public data for a criterion: "Not publicly disclosed", no sub-score, its weight shared out in proportion over the scored criteria.
- Fraud score = weighted average, rounded to 0.1. Stored in `category_scores.fraud-prevention`, never replaces the overall score.
- User ratings stay outside. Payment, affiliate, paid-link or sponsored status never enters any criterion.
- Values are read from the record (`capabilities{}`, `integration{}`, `certifications[]`, `pricing`, `incidents.yml`), never retyped. `yes` and `add_on` both count.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Fraud coverage | 25% | Which of our fraud types does it catch? |
| Signals | 15% | What does it see beyond the transaction? |
| Decisioning and control | 15% | Can it stop a payment or login in time, and can we test, tune and explain the decision before it hits good customers? |
| Investigations | 10% | Will our analysts get through the alerts? |
| Bank and fintech fit | 10% | Does it run on our rails and payee checks, in our setup, next to our AML work? |
| Integration and openness | 10% | Can we plug it into our stack and keep our own data and models? |
| Trust | 10% | Will our auditor accept the vendor, and has it had incidents? |
| Pricing transparency | 5% | Can we see what it costs before a sales call? |

### Fraud coverage (25%)

Points for each fraud type the vendor's own site or docs describe a product or model for (7 points at most):

| Fraud type | Key | Points |
|---|---|---|
| APP and impersonation scams: social engineering, scam payments, coached users | `capabilities.fraud_scam` | 1.5 |
| Account takeover: login, session, credential or device change risk | `capabilities.fraud_ato` | 1.5 |
| Card and payment fraud: transaction scoring for cards, transfers or wallets | `capabilities.fraud_transaction` | 1 |
| Check and deposit fraud: counterfeit, altered or duplicate checks, remote deposit | `capabilities.fraud_check` | 1 |
| Onboarding and application fraud: synthetic or stolen identities, first-party and loan fraud | `capabilities.fraud_onboarding` | 1 |
| Money mules: inbound mule accounts or mule networks | `capabilities.fraud_mule` | 1 |

Sub-score = 1 + 4 × points ÷ 7, rounded to 0.5. Check fraud is mostly a US bank problem; a fintech-only vendor without it can still reach 4.5.

### Signals (15%)

Points, sub-score = points + 1, cap 5:
- behavioural biometrics: typing, swipe, mouse or session behaviour, including signs of a coached or remote-controlled user (`capabilities.behavioral_biometrics`): 1.5;
- device intelligence: device fingerprinting, emulator, bot or remote-access detection (`capabilities.device_intelligence`): 1;
- graph or network analytics linking accounts, devices and payments (`capabilities.graph_analytics`): 1;
- consortium or shared fraud data across customers (`capabilities.fraud_consortium`): 1.

Machine learning plus rules is expected of every vendor here and earns nothing on its own.

### Decisioning and control (15%)

One point each, sub-score = points, minimum 1, cap 5:
- a real-time decision API that returns a score or action before the payment or login completes (`capabilities.realtime_decisioning`; note the stated latency if published);
- rules the customer writes and changes without code (`capabilities.fraud_rules`);
- rule and model testing before going live: backtesting on history, simulation or shadow mode on live traffic (`capabilities.rule_testing`);
- graduated responses in the flow, not only approve or block: hold or delay a payment, in-app scam warning, step-up authentication (`capabilities.payment_interventions`);
- an explanation per decision: reason codes or the features that drove the score (`capabilities.explainability`).

### Investigations (10%)

Points, sub-score = points + 1, cap 5:
- built-in case management for fraud alerts, with alerts grouped by customer or entity (`capabilities.case_management`): 1.5;
- AI help in investigations: alert summaries, suggested dispositions or an investigation agent, with the analyst deciding (`capabilities.ai_investigation`): 1;
- filing from a fraud case: SAR or STR drafted or filed from the case (`capabilities.regulatory_filing`): 1;
- alert prioritisation by risk or value (`capabilities.alert_prioritisation`): 0.5.

### Bank and fintech fit (10%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| Payee verification: Verification of Payee, Confirmation of Payee or a payee-risk check before the transfer (`capabilities.payee_verification`) | +1 |
| Named support for real-time payment rails: RTP, FedNow, Faster Payments, SEPA Instant, Pix or UPI (`capabilities.instant_payments`) | +1 |
| Fraud and AML on one platform: the vendor also sells AML transaction monitoring that shares cases or data with the fraud product (`capabilities.transaction_monitoring`) | +1 |
| On-premises or private-cloud deployment, or a data residency choice (`capabilities.deployment`, `capabilities.data_residency`) | +0.5 |
| Named bank, credit union or regulated fintech customers on the vendor's own site | +0.5 |

### Integration and openness (10%)

Points, sub-score = points + 1, cap 5:
- public API documentation without login (`integration.docs_public`): 1;
- self-serve sandbox or free trial (`integration.sandbox`): 1;
- bring your own data and models: the customer can send its own features or run its own models in the decision (`capabilities.custom_models`): 1;
- orchestration of third-party data and signals inside the decision flow (`capabilities.data_orchestration`): 0.5;
- SDKs for web and mobile, where device or behavioural signals need them (`integration.sdks`): 0.5.

### Trust (10%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| ISO/IEC 27001 or SOC 2 Type 2, confirmed (certificate, register or report opened) | +2 (vendor-stated: +1) |
| PCI DSS attestation, confirmed, when the product handles card data | +1 (vendor-stated: +0.5) |
| No change of owner, sale process or wind-down announced in the last 12 months | +1 |

Deductions: public regulatory action, disclosed breach or incident in the last 24 months, -1 each, from `incidents.yml` (`counted: false` is not deducted).

### Pricing transparency (5%)

| Evidence | Sub-score |
|---|---|
| Published price list with per-check or per-transaction prices | 5 |
| Published entry plan, larger plans quoted | 4 |
| Pricing model described (per transaction, per account, platform fee), no figures | 3 |
| Quote only | 2 |

## What the score cannot measure

Public evidence cannot show detection rate, false positives, the share of good customers blocked or friction added, scam reimbursements avoided, or results on your own traffic, and vendor figures cannot be compared. The ranking page says so next to the table and gives a short "What to test in a pilot" block: run the vendor in shadow mode on your own history, measure fraud caught at your alert volume, false positives per thousand transactions, goodwill credits and reimbursements on the test set, analyst time per case and decision latency on your rails.

Independent tests: no public independent test of fraud detection vendors comparable to iBeta or NIST exists to our knowledge (check of 27 Nov 2026). Analyst reports (Gartner, Forrester, Chartis) are paywalled opinion and are not used.

## New data fields

- New capability keys, same shape as the others (`{status, note, source}`, optional `checked`): `fraud_transaction`, `fraud_ato`, `fraud_onboarding`, `fraud_scam`, `fraud_check`, `fraud_mule`, `behavioral_biometrics`, `device_intelligence`, `graph_analytics`, `fraud_consortium`, `realtime_decisioning`, `fraud_rules`, `rule_testing`, `payment_interventions`, `explainability`, `ai_investigation`, `regulatory_filing`, `alert_prioritisation`, `payee_verification`, `instant_payments`, `custom_models`, `data_orchestration`. Keys that already exist (`case_management`, `transaction_monitoring`, `deployment`, `data_residency`) are reused. Add the new keys to `docs/data-schema.md` in the data PR.
- `category_scores.fraud-prevention{ score, breakdown[], methodology: fraud-1.0, scored }`, written by `scripts/rescore-fraud.mjs --write`, never by hand.
- Category file `src/_data/categories/fraud-prevention.yml`: `layout: v2`, `score_source: category`, `score_label: Fraud score`, `rubric: rubricFraud`, `methodology_label: Fraud 1.0`, `methodology_anchor: '#fraud-prevention'`.

## Candidates

Reviewed, to be checked against eligibility in the data pass: SEON, Sardine, Feedzai, Unit21, Hawk AI, Socure, NICE Actimize, Quantexa, ComplyAdvantage, Sumsub. A vendor whose fraud product is only an add-on to KYC or AML is checked on rule 2 like everyone else.

Review coming (tracked, not ranked): Featurespace (Visa), BioCatch, Alloy, DataVisor, Oscilar, Verafin (Nasdaq). More may be added from the data pass.

## Page (proposal, needs owner approval before it is built)

- Ranking layout v2 (as Identity Verification and AML): top 3 table, cards for all ranked providers with evidence chips, FAQ.
- Top 3 columns: Fraud score, fraud types covered, signals (behavioural, device, graph, consortium), payee checks and real-time rails, starting price.
- A plain line next to the table on what the score cannot measure, and the pilot block.
- `segments`: Best for banks and credit unions, Best for neobanks and fintechs, Best for scam and APP fraud, Best for fraud and AML on one platform, each from record facts.
- Glossary terms to link: account takeover, APP fraud, money mule, synthetic identity, behavioural biometrics, device fingerprinting, confirmation of payee (those not in the glossary yet are listed in the content PR).
- Menu: Rankings, Business and AML group. Use-case cards on the homepage and `/use-cases/` follow the existing rules.
- No rubric bar charts or stat tiles (owner, 2026-11-09).

## Rollout

1. This file (owner approved 2026-11-27).
2. Methodology page: a "Fraud prevention" section with criteria, weights, the buyer profile and the date, plus a changelog entry, and `site.json` `v3.rubricFraud`. Published before any score.
3. Data: the new capability keys for every candidate record, sources dated, written with `scripts/set-capabilities.py`; `tracked.yml` entries for the "Review coming" vendors.
4. `scripts/rescore-fraud.mjs` writes `reports/rescore-fraud-1.0.csv` (eligibility reason, Fraud score, each sub-score). Owner reviews; manual overrides only with a written reason.
5. Page PR: category file, cards and quick answer from the records (humanizer, invisible-characters, pre-publish check), menu link.

## Sources (accessed 27 Nov 2026)

1. PYMNTS Intelligence, "Scams Get Personal: Why Banks Pay More to Fight Fraud" (The Fraud Economy, Sep 2026), via "Banks' Growing Fraud Tech Stacks Create an Integration Challenge". https://www.pymnts.com/?p=4326455
2. ThreatMark, Fraud Readiness Benchmark 2026, as reported by Help Net Security, 19 Aug 2026 (vendor survey). https://www.helpnetsecurity.com/2026/08/19/threatmark-banking-fraud-prevention-report/
3. Payment Systems Regulator, APP scams reimbursement dashboard, updated 30 Jul 2026. https://www.psr.org.uk/information-for-consumers/app-scams-reimbursement-dashboard/
4. UK Finance, Annual Fraud Report 2026. https://www.ukfinance.org.uk/system/files/2026-06/UK%20Finance%20Fraud%20Report%202026.pdf
5. Addleshaw Goddard, PSR and PSD3 summary (Article 50 verification of payee, Article 59 impersonation fraud). https://www.addleshawgoddard.com/link/96c4af1c2ad94960914ed0b693edbc0d.aspx ; DLA Piper, "PSD3 and PSR", Mar 2026. https://www.dlapiper.com/en/insights/publications/2026/03/psd3-and-psr
6. Federal Reserve Financial Services, "Financial institutions report rising fraud trends across all major payment channels", 22 Apr 2026 (2026 Risk Officer Survey). https://frbservices.org/news/press-releases/042226-financial-institutions-report-rising-fraud-trends-major-payment-channels-criminal-tactics-evolve-risk-officer-survey-finds
7. American Banker, 2026 Predictions report, community banks and check fraud. https://www.americanbanker.com/payments/news/exclusive-research-community-banks-face-nonbank-pressures
8. Alloy, "What's driving fraud in 2026? 5 insights from Alloy's State of Fraud Report" (vendor survey). https://www.alloy.com/blog/2026-state-of-fraud-report-key-takeaways
9. ABA Banking Journal, "False dichotomy: fraud detection and cardholder relationships" (Fiserv false-decline study), Jun 2020. https://bankingjournal.aba.com/2020/06/false-dichotomy-fraud-detection-and-cardholder-relationships/
