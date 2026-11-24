# AML for Banks scoring methodology, AML Banks 1.0 (proposal, 2026-11-24)

Status: **proposal, not approved.** Criteria, weights, buyer profile and eligibility wait for the owner. No provider has an AML Banks score yet, and nothing on the site changes until the owner approves this file.

Applies to the ranking `/providers/aml/banks/` (rankings.yml key `aml/banks`). The H1 and title stay as they are. The AML ranking `/providers/aml/` keeps AML 1.0 (`docs/scoring-aml.md`).

## Decisions for the owner

1. **Buyer profile (ICP).** Proposed: banks, credit unions and building societies in the US, UK and EU that buy or replace a transaction monitoring and screening system, from community banks to mid-size and digital banks. Buyer: BSA officer or MLRO with the head of financial crime technology; IT security and procurement sign off. Tier-1 global banks that build in-house are not the target reader, but nothing excludes vendors that serve them.
2. **Pricing has no weight.** Proposed: 0%. Every provider on the current list quotes through sales; a criterion where all score 2 does not separate them. Published prices, where they exist, still show in the table and on the review.
3. **Eligibility needs bank evidence.** Proposed: a provider is eligible only if its own site names a bank, credit union or building society as a customer or publishes a bank case study (rule 4 below). Customer names never earn points.
4. **Quantexa** (still on v3.0, out of rankings until a per-category rubric exists) is scored under this rubric and returns to the ranking if it qualifies.
5. Phase 1 uses public evidence only, as AML 1.0. Vendor accuracy figures ("70% fewer false positives"), analyst positions (Chartis, Forrester, Gartner), awards and client logos never enter the score.
6. Separate score per category (standing rule, 2026-11-05): the ranking sorts by the AML Banks score; the overall score on reviews is unchanged.

## What the buyer is choosing on

| Job | Why it matters | Source |
|---|---|---|
| Detect suspicious activity across every channel, in time | Monitoring for suspicious activity is wider than automated transaction monitoring and combines customer behaviour and attributes with transactions | Wolfsberg MSA Statement (2024) |
| Show that vendor models are governed and tested | Vendor and third-party models fall under the same model risk management principles as models built in-house; the US agencies replaced SR 11-7 and the 2021 BSA/AML model risk statement with revised guidance on 17 Apr 2026 | SR 26-2 / OCC 2026-13 |
| Test rules and thresholds before and after changes | NYDFS requires pre- and post-implementation testing of the monitoring and filtering program, documented thresholds and scenario reviews | NYDFS 3 NYCRR 504.3 |
| Move from rules to models responsibly | Validation, oversight and explainability are named as the pillars for adopting new monitoring technology | Wolfsberg MSA Statement Part II (2025) |
| Screen customers and payments against sanctions lists | Supervisors name failures to update screening and to catch spelling variants among root causes of breaches; EU PSPs must update lists as soon as new measures apply | OFAC Framework (2019), EBA/GL/2024/15 |
| Investigate and file reports | US banks file SARs with FinCEN; EU and UK firms file STRs/SARs with their FIU | BSA, AMLR (EU) 2024/1624 |
| Pass third-party and ICT risk review | EU banks keep a register of all ICT third-party contracts and need mandatory contract terms (DORA applies from 17 Jan 2025) | DORA Art. 28 and 30 |

Not scored: AI claims without a method, detection or false-positive percentages, "real-time" without a stated time, number of scenarios without a list, analyst badges, awards, logos.

## Ranking eligibility

All must hold, each stored with a source and a date:

1. A published BeVerified review.
2. The provider sells, itself, transaction monitoring (`capabilities.transaction_monitoring` `yes` or `add_on`), sanctions and PEP screening (`capabilities.sanctions_pep` `yes` or `add_on`) and case management (`capabilities.case_management` `yes` or `add_on`).
3. The product is generally available.
4. The provider's own site names at least one bank, credit union or building society as a customer, or publishes a bank case study (`aml_banks.bank_evidence{ note, source }`).

A provider that fails a rule is left out, not scored low.

## Rules for every criterion

As AML 1.0: sub-scores 1 to 5 in steps of 0.5; `yes` and `add_on` earn the point, `partial` half; a feature with no public evidence earns no point and its weight does not move; values are read from the record, never retyped; AML Banks score = weighted average rounded to 0.1, stored in `category_scores.aml-banks`. Payment, affiliate or sponsored status never enters any criterion.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Transaction monitoring and detection | 25% | Will it catch what our examiners expect us to catch, on all our channels? |
| Model governance, testing and explainability | 20% | Can we validate it, tune it safely and explain every alert? |
| Sanctions and payment screening | 15% | Are customers and payments screened against the right lists, fast enough? |
| Investigation, case management and reporting | 15% | Can analysts work cases and file reports in one place? |
| Deployment, security and third-party risk | 15% | Will it pass our IT security, data residency and vendor risk review? |
| Integration and data onboarding | 10% | How hard is it to feed our core banking data in? |

### Transaction monitoring and detection (25%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| Scenario or typology library published or listed by name (`aml_banks.scenario_library`) | +1 |
| Monitoring before execution or with a stated latency (`aml_banks.realtime_monitoring`; post-event batch only: 0) | +1 |
| Payment channels named: at least three of cards, wires, ACH or SEPA, instant payments, cash, cheques (`aml_banks.channels[]`; two named: +0.5) | +1 |
| Behavioural or machine-learning detection with documented segmentation or peer groups (`aml_banks.behavioural_models`) | +0.5 |
| Entity resolution or network analytics across customers and counterparties (`aml_banks.entity_resolution`) | +0.5 |
| Customer risk scoring that updates on new data (`capabilities.risk_scoring`, AML 1.0 field) | +0.5 |

### Model governance, testing and explainability (20%)

| Evidence | Points |
|---|---|
| Reason for the alert shown to the analyst: rules fired or model features (`capabilities.alert_explanation`, AML 1.0 field) | +1 |
| Model documentation or a validation pack offered to clients (`capabilities.model_validation`, AML 1.0 field) | +1 |
| Rule or threshold changes tested on historical data before going live: simulation, back-testing, above- and below-the-line testing (`aml_banks.tuning_simulation`) | +1 |
| Audit trail of rule and model changes, with who approved them (`aml_banks.change_audit`) | +0.5 |
| Independent evidence: a published third-party model validation or test we opened | +0.5 |

### Sanctions and payment screening (15%)

| Evidence | Points |
|---|---|
| All four core lists named: OFAC SDN, EU, UK, UN (`capabilities.list_coverage`; three: +0.5) | +1 |
| Stated list update time of 24 hours or less (`capabilities.list_updates.hours`; longer: +0.5) | +1 |
| Payment message screening: SWIFT MT or ISO 20022 messages, or payments screened before release (`capabilities.transfer_screening`, AML 1.0 field, plus `aml_banks.message_formats[]`) | +1 |
| Fuzzy matching and transliteration (`capabilities.fuzzy_matching` and `capabilities.transliteration`; one of the two: +0.5) | +1 |

### Investigation, case management and reporting (15%)

| Evidence | Points |
|---|---|
| Case management with a second reviewer or approval step (`capabilities.case_management.four_eyes`; without a stated step: +0.5) | +1 |
| Regulatory report filing from the platform: FinCEN SAR e-filing, goAML or a named FIU format (`aml_banks.regulatory_filing`; report drafting without filing: +0.5) | +1 |
| Audit trail of every alert and disposition (`capabilities.audit_trail`) | +1 |
| Management information on alerts, cases and productivity (`capabilities.alert_reporting`) | +0.5 |
| Case consolidation across alerts and products for one customer (`aml_banks.case_consolidation`) | +0.5 |

### Deployment, security and third-party risk (15%)

| Evidence | Points |
|---|---|
| Deployment choice: on-premises or private cloud as well as SaaS (`capabilities.deployment` `cloud_and_on_prem`; SaaS only with a single-tenant option: +0.5) | +1 |
| Data residency regions named (`capabilities.data_residency`) | +1 |
| ISO/IEC 27001 or SOC 2 Type II confirmed (`certifications[]` with status `confirmed`; vendor-stated: 0) | +1 |
| Published material for regulated-firm vendor review: DORA, outsourcing or third-party risk documentation (`aml_banks.tprm_docs`) | +0.5 |

Deductions: public regulatory action, disclosed breach or incident in the last 24 months, -1 each, from `incidents.yml` (`counted: false` is not deducted).

### Integration and data onboarding (10%)

| Evidence | Points |
|---|---|
| Public API documentation without login (`integration.docs_public`) | +1 |
| Named core banking or payment system connectors, or a published data model for ingestion (`aml_banks.core_connectors`) | +1 |
| Batch or file ingestion (`capabilities.batch_screening` or `aml_banks.batch_ingestion`) | +1 |
| Sandbox, trial or test environment offered (`integration.sandbox`) | +0.5 |

Pricing: 0% (decision 2). Published prices are shown, never scored.

## What the score cannot measure

Public evidence cannot show detection rates on your data, false-positive volumes, how long implementation takes, or how good the vendor's support is in an exam. The page says so next to the table and keeps a "What to test in a pilot" block:
- run the vendor's scenarios on a sample of your historical transactions, including cases you filed SARs on;
- ask for the model documentation your model risk team would validate;
- change one threshold in the vendor's simulation tool and check the impact report;
- ask for the DORA or third-party risk pack and the exit plan your vendor risk team needs.

## New data fields

`aml_banks{}` block per record, each item `{status, note, source, checked}` unless stated: `bank_evidence`, `scenario_library`, `realtime_monitoring`, `channels[]` (values `cards`, `wires`, `ach_sepa`, `instant`, `cash`, `cheques`), `behavioural_models`, `entity_resolution`, `tuning_simulation`, `change_audit`, `message_formats[]` (`swift_mt`, `iso20022`), `regulatory_filing`, `case_consolidation`, `tprm_docs`, `core_connectors`, `batch_ingestion`. AML 1.0 fields are reused as they are. NICE Actimize, Feedzai and Quantexa need the AML 1.0 fields filled too. Scorer `scripts/rescore-aml-banks.mjs` reuses the AML 1.0 functions; checks in `scripts/checks/aml.mjs`.

## Rollout

1. This file, approved by the owner.
2. Methodology page: an "AML for Banks" section with criteria, weights, buyer profile and date, changelog entry, `site.json v3.rubricAmlBanks`. Published before any score.
3. Data for the current six providers (ComplyAdvantage, Hawk, Unit21, Napier, NICE Actimize, Feedzai) plus Quantexa, report `reports/rescore-aml-banks-1.0.csv` with old and new rank. Owner reviews.
4. One PR: ranking re-ordered, cards, quick answer and FAQ rewritten from the records (humanizer, invisible-characters, pre-publish check). The explainer and FAQ still cite SR 11-7, rescinded on 17 Apr 2026: fixed in this PR at the latest.

## Sources (accessed 24 Nov 2026)

1. Federal Reserve, SR 26-2, Revised Guidance on Model Risk Management, 17 Apr 2026 (supersedes SR 11-7 and SR 21-8). https://www.federalreserve.gov/supervisionreg/srletters/sr2602.htm
2. OCC News Release 2026-29, 17 Apr 2026. https://occ.gov/news-issuances/news-releases/2026/nr-occ-2026-29.html
3. NYDFS, 3 NYCRR 504.3. https://www.law.cornell.edu/regulations/new-york/3-NYCRR-504.3
4. Wolfsberg Group, Statement on Effective Monitoring for Suspicious Activity, Jul 2024. https://wolfsberg-group.org/news/69
5. Wolfsberg Group, Statement on Effective Monitoring for Suspicious Activity, Part II: Transitioning to Innovation, Aug 2025. https://wolfsberg-group.org/news/the-wolfsberg-group-publishes-its-second-statement-on-effective-monitoring-for-suspicious-activity
6. FinCEN, AML/CFT Program NPRM fact sheet, Apr 2026 (proposed, not final). https://www.fincen.gov/system/files/2026-04/Program-NPRM-FactSheet.pdf
7. EBA, Preparations for reporting of DORA registers of information. https://www.eba.europa.eu/node/16835
8. OFAC, A Framework for OFAC Compliance Commitments, May 2019. https://ofac.treasury.gov/media/16331/download
9. EBA, Guidelines on restrictive measures (EBA/GL/2024/15), Nov 2024 (as in AML 1.0).
