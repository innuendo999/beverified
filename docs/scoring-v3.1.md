# Scoring rubric v3.1 (draft for owner review, 2026-11-05)

Status: DRAFT. Nothing on the site changes until the owner approves this file and the before/after report.

## Owner decisions (2026-11-05)

1. Quote-only pricing scores 2 (no published price is itself a known fact), whether or not third-party data exists.
2. Coverage: 180+ countries and territories counts as global.
3. Platform breadth for specialists is scored on the modules of their own category: KYB (registry, UBO, entity screening, monitoring, documents), liveness (identity verification, liveness, video ident, reusable ID, facial age estimation), age verification (the eight age methods), document specialists such as Regula (identity verification, NFC, liveness, video ident, reusable ID).
4. Quantexa, Verified, VerifyMy and Paravision keep their v3.0 score until per-category methodologies exist.
5. Grade bands reset: Excellent 4.5+, Great 4.0 to 4.4, Very Good 3.5 to 3.9, Good 3.0 to 3.4, Fair below 3.0.
6. An incident the vendor credibly limits to a test environment with no personal data is recorded with `counted: false` and a note, not deducted (Persona, Feb 2026).
7. Next: a separate methodology per category (owner).

## Why v3.1

v3.0 gives 25% to certificates and has no criterion for product quality. Buyer guides agree that buyers choose first on false rejections and conversion, fraud caught, market coverage and total cost; ISO 27001 and SOC 2 are treated as a baseline, not a differentiator. v3.1 moves weight to what buyers compare, scores it from fields we already store where possible, and says plainly what public evidence cannot measure.

## Scope

- One score per provider, from the rubric of its `primary_category` family.
- **Identity family:** identity-verification, e-kyc, kyc, liveness-detection, age-verification, kyb, cheap-kyc, crypto and region pages (28 providers on 2026-11-05).
- **AML family:** aml, aml/banks (23 providers).
- **Travel Rule:** stays on v3.0 until its own methodology ships (6 providers).

## Rules for every criterion

- Sub-score 1 to 5, in steps of 0.5, from the scoring guide below. The same data gives the same sub-score.
- Each sub-score lists the evidence level it rests on (Independent, Vendor-stated, Hands-on).
- No public data for a criterion: "Not publicly disclosed", no sub-score. Its weight is shared out in proportion over the scored criteria, and the review says so.
- Overall score = weighted average, rounded to 0.1.
- User ratings (G2, Capterra, Gartner Peer Insights) stay outside the score.
- Payment, affiliate or sponsored status never enters any criterion.

## Identity family

| Criterion | Weight | Buyer question |
|---|---|---|
| Fraud defense | 25% | Will it stop fake documents, spoofs and deepfakes? |
| Pricing and total cost | 20% | What will we actually pay? |
| Coverage | 15% | Does it cover our markets and documents? |
| Platform breadth | 15% | Do we need a second vendor? |
| Integration and time to launch | 15% | How fast can we go live? |
| Trust and track record | 10% | Can we trust it with data and in front of a regulator? |

### Fraud defense (25%)

Start from the best confirmed liveness result, then adjust.

| Evidence | Sub-score |
|---|---|
| iBeta ISO/IEC 30107-3 Level 3 letter, confirmed | 4.5 |
| Level 2 letter, confirmed | 4 |
| Level 1 letter, confirmed | 3 |
| Liveness test claimed, no lab letter found | 2 |
| No liveness product | 1.5 |

Adjustments (cap 5): +0.5 injection attack detection with an independent test (lab letter, e.g. CEN TS 18099 or iBeta IAD); +0.5 confirmed NIST FRTE/FATE listing; +0.5 NFC chip reading. KYB-primary providers use the KYB guide instead: registry checks, UBO discovery, company document checks and ongoing monitoring all `yes` = 4; each missing = -0.5; independent registry coverage evidence +0.5.

### Pricing and total cost (20%)

| Evidence | Sub-score |
|---|---|
| Per-check prices published for the core product, no monthly minimum, free trial or free tier | 5 |
| Per-check prices published, with a monthly minimum or annual plan | 4 |
| Some modules priced, core product quoted | 3 |
| No published price; third-party contract data (e.g. Vendr) with date | 2 |
| No price information anywhere | Not publicly disclosed |

### Coverage (15%)

| Evidence | Sub-score |
|---|---|
| 200+ countries and territories and 10,000+ document types, plus non-document data checks | 5 |
| 200+ countries and territories, 5,000+ document types | 4 |
| 100+ countries | 3 |
| Regional focus (one region or under 100 countries) | 2 |

Region pages and age verification keep the global sub-score; the region and age matrices show local fit separately. Counts come from the vendor's own pages (Vendor-stated).

### Platform breadth (15%)

Count of modules with `yes` or `add_on` in `capabilities{}`: identity verification, KYB, sanctions and PEP screening, ongoing AML monitoring or transaction monitoring, case management, video ident, reusable ID, age verification. 7 to 8 = 5; 5 to 6 = 4; 3 to 4 = 3; 2 = 2; 1 = 1.5. A specialist is not penalised in its own ranking: category pages show the matrix, and the review explains the trade-off.

### Integration and time to launch (15%)

One point each, sub-score = points + 1, cap 5: public API documentation without login; SDKs for web, iOS and Android; self-serve sandbox or free trial; no-code workflow or hosted flow; published support channels and hours. New field `integration{}` (below).

### Trust and track record (10%)

| Evidence | Points |
|---|---|
| ISO/IEC 27001 or SOC 2 Type 2, confirmed (certificate, register or report opened) | +2 (vendor-stated: +1) |
| Government trust framework or identity assurance certification, confirmed (UK DIATF, ACCS ISO/IEC TS 29003, eIDAS) | +1.5 |
| Data residency choice or on-premises option | +0.5 |
| Operating 5+ years, stable or disclosed ownership | +1 |

Sub-score = points + 1, cap 5. Deductions: public regulatory action, disclosed breach or incident in the last 24 months, -1 each, with source. Example: RelyComply (incident 16 Sep 2026).

## AML family

| Criterion | Weight | Buyer question |
|---|---|---|
| Screening data and match quality | 25% | Will it find real hits without drowning us in false ones? |
| Pricing and total cost | 20% | as identity family |
| Investigation and audit workflow | 15% | Can analysts clear alerts fast and show an auditor why? |
| Platform breadth | 15% | screening, adverse media, transaction monitoring, case management, KYB or entity screening, KYC |
| Integration and time to launch | 15% | as identity family |
| Trust and track record | 10% | as identity family |

### Screening data and match quality (25%)

One point each, sub-score = points + 1, cap 5: named sanctions lists with stated update frequency; PEP data with tiers or relatives and close associates; adverse media from named or counted sources; configurable fuzzy matching or match thresholds; ongoing monitoring with re-screening on list change. +0.5 for independent evidence (published model validation or third-party test). Mostly Vendor-stated: the review says so.

### Investigation and audit workflow (15%)

One point each, sub-score = points + 1, cap 5: case management; alert reason or match explanation shown; audit trail or decision log; risk scoring or rules engine; bulk or batch screening.

## What the score cannot measure

Public evidence cannot show false rejection rate, completion rate, manual review rate, false positive rate in name matching or latency on your traffic. Vendor figures use different methods and samples. Each review and comparison carries a "What to test in a proof of concept" block with these metrics and the questions to ask. Hands-on results, when we have them, appear in the Hands-on block and do not change the rubric weights.

## New data fields

- `integration{ docs_public, sdks[], sandbox, no_code, support_hours }`, each `{status, note, source}`.
- `coverage{ countries, document_types, non_doc }`, each `{value, source}`; replaces free-text Regions for scoring (the fact row stays).
- `capabilities.injection_detection` (planned 17 Nov task) and `capabilities.reusable_id`.
- AML: `capabilities.list_updates`, `pep_tiers`, `fuzzy_matching`, `alert_explanation`, `audit_trail`, `batch_screening`.
- `score_breakdown[]` is generated from these rules by a script, never typed by hand; `score` = its weighted result.

## Rollout

1. Owner approves this file.
2. Collect the new fields for all 51 providers (sources dated, verification-spec), in batches.
3. Script computes sub-scores and writes `reports/rescore-v3.1.csv` (old score, new score, change, rank change per category).
4. Owner reviews; manual overrides only with a written reason in the report.
5. One PR: methodology page v3.1 with changelog, `site.json` rubrics per family, all `score_breakdown[]`, new scores, rankings re-ordered. Homepage, category pages and llms.txt read the family rubric.
