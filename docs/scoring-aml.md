# AML scoring methodology, AML 1.0 (2026-11-23)

Status: criteria, weights, buyer profile and eligibility approved by the owner on 2026-11-23. No provider has an AML score yet.

Applies to the ranking `/providers/aml/` (rankings.yml key `aml`). `aml/banks` keeps its own list and is not scored by this rubric. The H1 and title stay as they are.

## Decisions

All approved by the owner on 2026-11-23:

1. Phase 1 uses public evidence only. BeVerified's own sandbox tests (time to list, match test set) are phase 2, added when vendor access exists; see "Phase 2". Until then the page says plainly what the score cannot measure.
2. Buyer profile (ICP): **fintechs, e-money institutions, payment firms and crypto-asset service providers** in the EU, UK and US, roughly 1,000 to 500,000 customers screened, with a compliance team of 1 to 10 people. Buyer: MLRO or head of compliance, with engineering for the integration. Banks are served by `aml/banks`.
3. A platform whose main product is not AML (for example an identity verification suite with a screening module) is eligible only under eligibility rule 4: at least 2 points in both data and match controls from its own documentation (option A, 2026-11-23).
4. The ranking gets its own rubric under the standing rule of 2026-11-05: a separate score per category, the ranking sorts by it, the overall score on reviews is unchanged.
5. One AML ranking for now. A separate sanctions-screening ranking only if search demand shows it.
6. Vendor accuracy figures ("90% fewer false positives", "99% match accuracy") never enter the score: they use different samples and methods and cannot be compared. Counts of lists or profiles without names do not score either.
7. Platform breadth has no weight here. Modules stay visible in the capability matrix on the page.

## What the buyer is choosing on (jobs to be done)

Taken from what supervisors expect of screening systems and from the most common failures they name. These are the reasons for the criteria below.

| Job | Why it matters | Source |
|---|---|---|
| Do not miss a real hit | Supervisors name failures to update screening software, and failures to catch alternate spellings, among the root causes of sanctions breaches | OFAC Framework (2019), FCA FCG 7.2 |
| See new designations fast | PSPs and CASPs must update screening lists as soon as new restrictive measures apply; under the EU Instant Payments Regulation, instant-transfer PSPs must re-screen their users right after new measures enter into force | EBA/GL/2024/15, Regulation (EU) 2024/886 |
| Keep false alerts manageable | Alert volume is the main running cost of screening; transliteration is a common cause of false matches | LSEG survey (vendor research), FCA FCG 7.2 |
| Show the regulator the tool is calibrated and tested | The firm must understand how its screening tool is calibrated and show it fits its risk; it cannot outsource that responsibility. NYDFS requires pre- and post-implementation testing of matching logic and documented thresholds | FCA FCG 7.2, FCA speech, NYDFS Part 504.3 |
| Monitor customers and transfers after onboarding | Re-screening on list change, transaction and transfer screening | EBA/GL/2024/15, Wolfsberg (2019) |
| Pay a known price and go live quickly | Small teams buy per check or per monitored entity, through an API | buyer profile |

What does not decide the choice and is not scored: AI claims without a method, accuracy percentages, "1,000+ lists" or "millions of profiles" without names, "real-time" without a stated time, analyst badges, awards, client logos, dashboards.

## Ranking eligibility

All must hold, each stored with a source and a date:

1. The provider has a published BeVerified review, scored on v3.1.
2. It sells name screening against sanctions and PEP data itself (`capabilities.sanctions_pep` is `yes` or `add_on`) and ongoing monitoring (`capabilities.ongoing_monitoring` is `yes` or `add_on`).
3. The product is generally available.
4. If `primary_category` is not an AML category, the provider is eligible only when its own public documentation earns at least 2 points in both "Sanctions, PEP and media data" and "Match quality controls". A screening module described in one marketing line is not enough.

A provider that fails a rule is left out, not scored low.

## Rules for every criterion

As v3.1 and IDV 1.0:
- Sub-score 1 to 5, in steps of 0.5, from the rules below. The same data gives the same sub-score.
- Each sub-score lists its evidence level (Independent, Vendor-stated, Hands-on). Almost all phase 1 evidence is Vendor-stated, and the review says so.
- Point-based criteria never become "Not publicly disclosed". A feature with no public evidence earns no point. Secrecy must not lift a score by moving weight elsewhere. Only Pricing can be "Not publicly disclosed"; then its weight is shared out in proportion over the other criteria.
- AML score = weighted average, rounded to 0.1. Stored in `category_scores.aml`, never replaces the overall score.
- User ratings stay outside. Payment, affiliate, paid-link or sponsored status never enters any criterion.
- Values are read from the record (`capabilities{}`, `integration{}`, `certifications[]`, `pricing`, `incidents.yml`), never retyped.
- `yes` and `add_on` both earn a point; `partial` earns half.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Sanctions, PEP and media data | 25% | Are the lists we must screen there, and how fast do changes arrive? |
| Match quality controls | 20% | Can we catch spelling variants without drowning in false alerts? |
| Calibration, testing and audit | 15% | Can we show a regulator how it is set up and why we cleared an alert? |
| Ongoing and transfer monitoring | 15% | Does it keep watching customers and payments after onboarding? |
| Pricing and total cost | 15% | What will we actually pay? |
| Integration | 10% | How fast can engineering connect it? |

Changes against the v3.1 AML family: match quality is split from data and gets its own weight; "Investigation and audit workflow" becomes "Calibration, testing and audit"; monitoring gets its own criterion; platform breadth (15%) and trust (10%) leave the weights; trust events move to deductions; mobile SDKs leave the integration points.

### Sanctions, PEP and media data (25%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| All four core sanctions lists named: OFAC SDN, EU consolidated financial sanctions list, UK Sanctions List, UN Security Council consolidated list (`capabilities.list_coverage.lists[]` holds `ofac`, `eu`, `uk`, `un`; HMT or OFSI counts as the UK list) | +1 (three of four: +0.5) |
| Stated time for sanctions list changes of 24 hours or less (`capabilities.list_updates.hours`) | +1 (a frequency longer than 24 hours: +0.5; "regularly" or no time: 0) |
| PEP data with tiers or relatives and close associates (`capabilities.pep_tiers`) | +1 |
| Adverse media from named or counted sources, or a published risk taxonomy (`capabilities.adverse_media.evidence` is `named`, `counted` or `taxonomy`) | +1 |
| Data source stated: own research team or a named data supplier (`capabilities.data_provenance`) | +0.5 |

### Match quality controls (20%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| Configurable match threshold or fuzzy logic (`capabilities.fuzzy_matching`) | +1 |
| Transliteration or matching across non-Latin scripts (`capabilities.transliteration`) | +1 |
| Secondary identifiers used to rule out matches: date of birth, nationality, ID number, entity identifiers (`capabilities.secondary_identifiers`) | +1 |
| Whitelisting or suppression of cleared matches on re-screening (`capabilities.whitelisting`) | +1 |
| Match explanation shown on the alert (`capabilities.alert_explanation`) | +0.5 |
| Independent evidence: a published third-party test or model validation we opened | +0.5 |

### Calibration, testing and audit (15%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| Audit trail or decision log of every alert and disposition (`capabilities.audit_trail`) | +1 |
| Case management with dispositions and a second-reviewer or approval step (`capabilities.case_management` with `four_eyes: yes`; `four_eyes: partial`, or case management without a stated approval step: +0.5) | +1 |
| Public documentation of how matching settings work and can be tuned (`capabilities.calibration_docs`) | +1 |
| Reports on alerts, true matches and list update times, for management information (`capabilities.alert_reporting`) | +1 |
| Validation support: a model validation report, test pack or tuning service offered to clients (`capabilities.model_validation`) | +0.5 |

Deductions: public regulatory action, disclosed breach or incident in the last 24 months, -1 each, from `incidents.yml` (`counted: false` is not deducted). Security certifications (ISO/IEC 27001, SOC 2) earn no points here; they are shown on the review and in the KYC Certification Tracker.

### Ongoing and transfer monitoring (15%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| Automatic re-screening of the customer base when lists change, or at least daily (`capabilities.ongoing_monitoring.trigger` is `list_change` or `daily`) | +1 (`periodic`, or monitoring sold with no stated trigger: +0.5) |
| Transaction monitoring with rules or scenarios (`capabilities.transaction_monitoring`) | +1 |
| Screening of payments or crypto transfers against lists before execution (`capabilities.transfer_screening`) | +1 |
| Customer risk scoring that updates on new data (`capabilities.risk_scoring`) | +1 |

### Pricing and total cost (15%)

The v3.1 Pricing table, with name screening as the core product:

| Evidence | Sub-score |
|---|---|
| Per-screen or per-entity prices published for screening and monitoring, no monthly minimum, free trial or free tier | 5 |
| Per-screen prices published, with a monthly minimum or annual plan | 4 |
| Some modules priced, screening quoted | 3 |
| No published price; third-party contract data (for example Vendr) with a date | 2 |
| No price information anywhere | Not publicly disclosed |

Prices are read from `pricing.items` and follow the 90-day re-check rule of the price watch.

### Integration (10%)

Points, sub-score = points + 1, cap 5:
- public API documentation without login (`integration.docs_public`);
- self-serve sandbox or free trial (`integration.sandbox`);
- batch screening by file or SFTP (`capabilities.batch_screening`);
- webhooks or callbacks for monitoring alerts (`integration.webhooks`);
- no-code dashboard search and case review (`integration.no_code`): +0.5.

## What the score cannot measure

Public evidence cannot show how many real hits a system misses, how many false alerts it raises on your customers, or how fast a new designation reaches it in practice. Vendor figures cannot be compared. The ranking page says this next to the table and keeps a "What to test in a pilot" block:
- screen a sample of your own customers and count alerts per 1,000;
- add known listed names in several spellings and scripts and check every one is found;
- ask how many hours after publication a new OFAC, EU or UK designation appears, and check it on the next real designation;
- ask for the calibration documentation and an example audit export you would give your regulator.

## Phase 2: our own tests (after vendor access)

Approved to plan, not to build yet (owner, 2026-11-23):
- **Time to list:** a script picks up new OFAC, EU and UK designations and queries each vendor's sandbox until the name is found; we record the hours.
- **Match test set:** fixed variants of listed names (transliteration, typos, word order) plus similar names that are not listed; we record hits found and false alerts.
- Results are Hands-on evidence. They will replace the vendor-stated update time point and add to the match quality criterion; the exact rule is set in AML 1.1 before any result is published. Each vendor's trial terms are read first; we test only where the terms allow publishing results.

## Automation

| Part | How it is kept up to date |
|---|---|
| Pricing | price watch (exists), 90-day rule |
| Certifications, incidents | cert watch and `incidents.yml` (exist) |
| Integration points | `scripts/aml-watch/` checks that docs, sandbox and webhook pages exist and reports changes |
| Data, match controls, monitoring, calibration | `aml-watch` reads each provider's coverage and docs pages (URLs in `src/_data/amlWatch.yml`), looks for named lists, update times and feature terms, and reports differences from the record. A term found is a candidate, not a point: a person confirms the passage before the field changes |
| Sub-scores and AML score | `scripts/rescore-aml.mjs`, from record fields only |
| Field checks | `scripts/checks/aml.mjs` in `npm run check`: every scored field has a source and a `checked` date, none older than 90 days for ranked providers |

`aml-watch` runs daily in GitHub Actions and writes only to its own state branch, like the price watch. A weekly Claude task turns its report into a PR; the owner merges.

## New data fields

- `capabilities.list_coverage{ status, lists[], note, source }`, `lists[]` from `ofac`, `eu`, `uk`, `un` (only lists the vendor names).
- `capabilities.list_updates` gains `hours`: the stated update time, rounded up to whole hours ("every 5 minutes" = 1, "daily" = 24, "a couple of hours to 1 month" = 720); omitted when the vendor states no time.
- `capabilities.adverse_media` gains `evidence` (`named`, `counted`, `taxonomy`; omitted when sources are only described) and `evidence_source`.
- `capabilities.ongoing_monitoring` gains `trigger` (`list_change`, `daily`, `periodic`) and `trigger_source`.
- `capabilities.case_management` gains `four_eyes` (`yes`, `partial`) and `four_eyes_source`.
- Data is written with `scripts/set-capabilities.py` from one JSON file per batch in `scripts/aml-data/`, so the record files keep their layout.
- `capabilities.transliteration`, `secondary_identifiers`, `whitelisting`, `data_provenance`, `calibration_docs`, `alert_reporting`, `model_validation`, `transfer_screening`, and `integration.webhooks`: same shape as other capabilities (`{status, note, source}`, optional `checked`). Add them to `docs/data-schema.md` in the data PR.
- `category_scores.aml{ score, breakdown[], methodology: aml-1.0, scored }`, written by `scripts/rescore-aml.mjs --write`, never by hand.
- Category file `aml.yml`: `score_source: category`, `score_label: AML score`, `rubric: rubricAmlRanking`, `methodology_label: AML 1.0`, `methodology_anchor: '#aml'`.

## Page (owner approved the canvas "BeVerified: AML ranking page, redesign proposal", 2026-11-23; built)

- Ranking layout v2 with the AML score labelled "AML score", and the top 3 table columns: core lists, stated update time, match controls, published screening price.
- A plain line next to the table on what the score does not measure.
- `segments`: Best for crypto, Best for payments and EMIs, Best for UK regulated firms, each chosen from record facts with a one-sentence reason.
- No rubric bar charts or stat tiles (owner, 2026-11-09).
- Review pages: "Ranked in" shows the rank only.

## Rollout

1. This file (owner approved the rules on 2026-11-23).
2. Methodology page: an "AML" section with criteria, weights, buyer profile and date, plus a changelog entry, and `site.json` `v3.rubricAmlRanking`. Published before any score.
3. Data in three batches for the ten providers in `aml` (Sumsub, ComplyAdvantage, Castellum.AI, SmartSearch, Hawk, KYC Hub, Strise, Unit21, Napier, KYC360), with `aml-watch` built in the first batch.
4. `scripts/rescore-aml.mjs` reuses the v3.1 functions from `scripts/rescore.mjs` and writes `reports/rescore-aml-1.0.csv` (old rank, new rank, AML score, each sub-score, eligibility reason). Owner reviews; manual overrides only with a written reason.
5. One PR: ranking re-ordered, cards and quick answer rewritten from the records (humanizer, invisible-characters, pre-publish check), page blocks as approved.

## Sources (accessed 23 Nov 2026)

1. Wolfsberg Group, Guidance on Sanctions Screening, Jan 2019. https://wolfsberg-group.org/news/19
2. FCA, Financial Crime Guide FCG 7.2 (sanctions and asset freezes). https://handbook.fca.org.uk/handbook/FCG/7/2.html
3. FCA, FCTR 8.3, examples of good and poor practice. https://handbook.fca.org.uk/handbook/FCTR/8/3.html
4. FCA, speech "Calibrating controls to build confident markets". https://www.fca.org.uk/news/speeches/calibrating-controls-build-confident-markets
5. NYDFS, 3 NYCRR 504.3, Transaction Monitoring and Filtering Program Requirements. https://www.law.cornell.edu/regulations/new-york/3-NYCRR-504.3
6. OFAC, A Framework for OFAC Compliance Commitments, May 2019. https://ofac.treasury.gov/media/16331/download
7. EBA, Final Report, Guidelines on restrictive measures (EBA/GL/2024/14 and EBA/GL/2024/15), Nov 2024. https://www.eba.europa.eu/sites/default/files/2024-11/eaeae49d-81a5-4154-8af9-5014f6ee8881/Final%20Report%20Guidelines%20restrictive%20measures%20.pdf
8. EMA response to the EBA consultation, on screening of PSUs under the Instant Payments Regulation (Article 5d). https://www.eba.europa.eu/eba-response/74710
9. LSEG, global survey of 400 compliance leaders on screening data (vendor research). https://www.lseg.com/en/risk-intelligence/resources/white-paper/global-survey-report-on-screening-data
