# AML for Banks scoring methodology, AML Banks 1.0 (2026-11-24)

Status: **approved by the owner on 2026-11-24** (buyer profile option C, seven criteria and weights below). Methodology section `/methodology/#aml-banks` and `site.json v3.rubricAmlBanks` published before any score. No provider has an AML Banks score yet, and nothing on the site changes until the owner approves this file.

Applies to the ranking `/providers/aml/banks/` (rankings.yml key `aml/banks`). The H1 and title stay as they are. The AML ranking `/providers/aml/` keeps AML 1.0 (`docs/scoring-aml.md`).

## Decisions

1. **Buyer profile: one ranking with segments (owner, 2026-11-24, option C).** Banks, credit unions and building societies in the US, UK and EU. Segments (community banks, on-premises, FRAML, overlay on an existing system) are chosen from record facts, as in IDV 1.0. Nasdaq Verafin and Abrigo go into the review plan; the community bank segment opens when they are reviewed.
2. Pricing has no criterion of its own. Whether the vendor says what the price depends on counts under "Vendor risk and cost transparency" (5%).
3. Eligibility needs bank evidence (rule 4 below). Customer names never earn points.
4. Quantexa (still on v3.0) is scored under this rubric and returns to the ranking if it qualifies.
5. Phase 1 uses public evidence only. Vendor accuracy figures, analyst positions (Chartis, Forrester, Gartner), awards, client logos and user ratings never enter the score.
6. Situational needs are a fit check, not points: on-premises or SaaS, data region, named core banking system, overlay on an existing system, fraud and AML together, FinCEN or goAML filing, bank size. Each shows yes, no or not stated, with a source.

Criteria and weights approved by the owner on 2026-11-24, after the critique and the dry run.

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
| Detection | 20% | Will it catch what our examiners expect, on all our channels and across linked accounts? |
| Alert quality and analyst workload | 20% | How much of our analysts' day goes on noise, and how fast is a case closed and filed? |
| Tuning without depending on the vendor | 15% | Can we change and test rules ourselves? |
| Validation and audit for examiners | 15% | Can our model risk team validate it and can we show every change? |
| Implementation and data integration | 15% | How hard is it to get our data in? |
| Sanctions screening of customers and payments | 10% | Right lists, fast enough, on payments too? |
| Vendor risk and cost transparency | 5% | Will it pass vendor risk review, and do we know what drives the price? |

Points per criterion, sub-score = 1 + points, cap 5. Each piece of evidence counts in one criterion only.

**Detection (20%).** Named typologies or scenarios (+1; a count without names: +0.5). Stated latency or monitoring before execution (+1; "real-time" without a time: 0). At least three payment channels named (+1; two: +0.5). Entity resolution or links across accounts and counterparties (+1). Segmentation or peer groups (+0.5). Customer risk scoring that updates (`capabilities.risk_scoring`, +0.5).

**Alert quality and analyst workload (20%).** Alert prioritisation or alert risk scores (+1). Reason for the alert shown to the analyst (`capabilities.alert_explanation`, +1). Regulatory report filing from the platform (+1; drafting only: +0.5). Second reviewer or approval step (`case_management.four_eyes: yes`, +0.5). Automatic closing of alerts earns nothing unless it can be tested and logged (see Validation).

**Tuning without depending on the vendor (15%).** Clients create and change rules without the vendor (+1.5). Simulation, back-testing or shadow mode on the client's data before a change goes live (+1.5).

**Validation and audit for examiners (15%).** Model documentation or a validation pack for clients (`capabilities.model_validation`, +1). Log of rule and model changes with who approved them (+1; log without approvals: +0.5). Audit trail of alerts and dispositions (`capabilities.audit_trail`, +1).

**Implementation and data integration (15%).** Public API documentation (`integration.docs_public`, +1). Published data model or ingestion specification (+1). Batch and streaming ingestion (+1; one of them: +0.5). Sandbox or test environment (+0.5).

**Sanctions screening (10%).** AML 1.0 rules: four core lists named (+1; three: +0.5), stated update time of 24 hours or less (+1; longer: +0.5), payment or transfer screening (+1), fuzzy matching and transliteration (+1; one: +0.5).

**Vendor risk and cost transparency (5%).** ISO/IEC 27001 or SOC 2 confirmed (+1.5). The vendor says what the price depends on, or publishes prices (+1; partly: +0.5). Regulatory action, disclosed breach or incident in the last 24 months: -1 each, from `incidents.yml`.

Dropped after the dry run because no provider publishes them, so they would only add zeros: above- and below-the-line testing, alert consolidation per customer, published independent validation, published implementation approach, DORA or third-party risk documentation. They move to "What to ask in a pilot".

### Evidence protocol

The dry run showed that the score follows how deep we search: NICE Actimize's product page names almost nothing, while its brochures name channels, segmentation, simulation and alert scoring. So every provider gets the same search: product pages, documentation portal, brochures and datasheets on the vendor's own domain, and trust centre. A feature found in any of them counts. Pages behind a login or a form do not count. Every point stores its source URL and the date checked.

### Dry run (2026-11-24, not published)

One pass over 1 to 3 public pages per vendor plus existing record fields, with the criteria above. AML 1.0 screening fields are missing for NICE Actimize, Feedzai and Quantexa, so their screening scores are too low. Result: ComplyAdvantage 3.4, Napier 2.9, Unit21 2.5, NICE Actimize 2.5, Hawk 2.4, Feedzai 2.4, Quantexa 2.0. The criteria separate providers (sub-score spread 2 to 3 points per criterion), but the order is not final until the evidence protocol has been run in full for every provider.

## What the score cannot measure

Public evidence cannot show detection rates on your data, false-positive volumes, data quality, how long implementation really takes, or support quality during an exam. The page says so next to the table and keeps a "What to ask in a pilot" block:
- run the vendor's scenarios on a sample of your historical transactions, including cases you filed SARs on;
- ask whether alerts for one customer are consolidated into one case;
- change one threshold in the simulation tool and check the impact report, including what falls below the line;
- ask for the model documentation your model risk team would validate, and any independent validation;
- ask for the implementation plan for your core system and the DORA or third-party risk pack.

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
