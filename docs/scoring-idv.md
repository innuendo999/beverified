# Identity Verification scoring methodology, IDV 1.0 (2026-11-17)

Status: criteria, weights and buyer profile approved by the owner on 2026-11-17. Not yet on /methodology/. No provider has an IDV score yet.

Applies to the ranking `/providers/identity-verification/`. The H1 and title stay as they are.

## Owner decisions (2026-11-17)

1. The ranking gets its own rubric under the standing rule of 2026-11-05: a separate score per category, the ranking sorts by it, the overall score on reviews is unchanged.
2. Buyer profile (ICP): **regulated fintech and iGaming operators.** Neobanks, lenders, payment and brokerage firms, and licensed gambling and betting operators, US, UK and EU, roughly 1,000 to 100,000 verifications a month. Buyer: head of compliance with product or fraud. They choose on fraud caught (deepfakes, multi-accounting, bonus abuse), good users passing, cover of the markets they are licensed in, total cost and what a regulator will accept.
3. Marketplaces, gig and dating, enterprise banks and telcos are served by the "Best pick by use case" block (`segments`), not by the weights. Small teams that buy on price are served by Budget KYC.
4. Weights approved as in the table below. Platform breadth drops from 15% to 5% and counts only modules these buyers add to an IDV contract.
5. No independent public hands-on test covers this ranking (search of 17 Nov 2026, see "Independent tests checked"). BeVerified has no resource for its own tests yet. Pass rates, false rejections and completion stay outside the score, and the page says so.
6. DHS S&T RIVR results count only as a bonus, never as a deduction: DHS anonymises vendors and only some disclose, so absence says nothing.
7. Vendor pass-rate or accuracy figures never enter the score: they use different samples and cannot be compared.

## Ranking eligibility

All must hold, each stored with a source and a date:

1. The provider has a published BeVerified review, scored on v3.1 (records still on v3.0 are not ranked).
2. It sells the full remote check itself or as its own modules: document verification, liveness and face match (`capabilities.identity_verification` and `capabilities.liveness` are `yes` or `add_on`).
3. The product is generally available. Pilots and announced products are listed with their status only.

A provider without a confirmed iBeta letter can be ranked; its card carries the con "No independent liveness test found". A provider that fails a rule is left out, not scored low.

## Rules for every criterion

As v3.1, KYA 1.0 and Budget KYC 1.0:
- Sub-score 1 to 5, in steps of 0.5, from the guide below. The same data gives the same sub-score.
- Each sub-score lists its evidence level (Independent, Vendor-stated, Hands-on).
- No public data for a criterion: "Not publicly disclosed", no sub-score, its weight shared out in proportion over the scored criteria. A public register that we checked and that does not list the provider is a fact, not missing data: it scores as "not listed".
- IDV score = weighted average, rounded to 0.1. Stored per category in `category_scores.identity-verification`, never replaces the overall score.
- User ratings stay outside. Payment, affiliate, paid-link or sponsored status never enters any criterion.
- Values are read from the record (`capabilities{}`, `coverage{}`, `integration{}`, `certifications[]`, `pricing`, `incidents.yml`), never retyped.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Fraud defense | 30% | Will it stop spoofs, deepfakes and injected video? |
| Coverage | 20% | Does it read the documents of every market we are licensed in? |
| Pricing and total cost | 15% | What will we actually pay? |
| Integration and user flow | 15% | How fast can we go live, and what happens to a user the machine cannot decide? |
| Compliance fit | 15% | Will our regulator and auditor accept it? |
| Platform breadth | 5% | Which adjacent checks come in the same contract? |

### Fraud defense (30%)

The v3.1 Fraud defense table, without the NFC adjustment (NFC moves to Coverage, so it is not counted twice).

| Evidence | Sub-score |
|---|---|
| iBeta ISO/IEC 30107-3 Level 3 letter, confirmed | 4.5 |
| Level 2 letter, confirmed | 4 |
| Level 1 letter, confirmed | 3 |
| Liveness sold, no lab letter found | 2 |

Adjustments, cap 5:
- +0.5 injection attack detection with an independent test: `capabilities.injection_detection` with `independent: true` (a lab letter or report we opened, for example CEN/TS 18099 or a lab's own injection test);
- +0.5 confirmed NIST FRTE or FATE listing;
- +0.5 DHS S&T RIVR: the provider met all DHS goals in at least one track, it disclosed its alias, and the alias matches the results published by the Maryland Test Facility (mdtf.org). Bonus only (decision 6).

A letter held by an SDK supplier (for example a liveness partner) counts as Vendor-stated, as in v3.1.

### Coverage (20%)

One point each, sub-score = points + 1, cap 5:
- 180 or more countries and territories (`coverage.countries`; owner rule of 2026-11-05: 180+ = global);
- NFC chip reading of ePassports or eIDs (`capabilities.nfc` = `yes` or `add_on`);
- document fraud checks described in the vendor's docs: tampering, template or security-feature checks, screen or print recapture (new key `capabilities.doc_forensics`);
- a non-document route for individuals in at least one market: database, bank or registry checks (`coverage.non_doc`).

Counts and features are Vendor-stated; the review says so. Region pages show local fit separately.

### Pricing and total cost (15%)

The v3.1 Pricing table, unchanged (quote-only = 2).

### Integration and user flow (15%)

One point each, sub-score = points + 1, cap 5:
- public API documentation without login (`integration.docs_public`);
- SDKs for web, iOS and Android (`integration.sdks`);
- self-serve sandbox or free trial (`integration.sandbox`);
- no-code workflow or hosted flow (`integration.no_code`);
- human review of cases the automated check cannot decide, with published hours or a stated turnaround (new key `capabilities.manual_review`; note = hours or turnaround with its source).

This replaces the v3.1 "support channels and hours" point: for these buyers the human fallback decides how many good users are lost.

### Compliance fit (15%)

Points, sub-score = points + 1, cap 5:

| Evidence | Points |
|---|---|
| ISO/IEC 27001 or SOC 2 Type 2, confirmed (certificate, register or report opened) | +2 (vendor-stated: +1) |
| One government trust framework or identity proofing certification, confirmed on a public register: UK DIATF, ACCS ISO/IEC TS 29003, ETSI TS 119 461 conformity, Kantara NIST SP 800-63 IAL2 | +1.5 |
| A second one, confirmed | +0.5 |
| Data residency choice or on-premises option (`capabilities.data_residency`, `capabilities.deployment`) | +0.5 |

Deductions: public regulatory action, disclosed breach or incident in the last 24 months, -1 each, from `incidents.yml` (`counted: false` is not deducted). Vendor-stated framework claims earn no points here; the review shows them as vendor-stated. The v3.1 point for "operating 5+ years" is not used.

### Platform breadth (5%)

Only modules these buyers add to an IDV contract. One point each, sub-score = points + 1, cap 5:
- sanctions and PEP screening (`capabilities.sanctions_pep`);
- proof of address (new key `capabilities.proof_of_address`);
- facial age estimation (`capabilities.age_facial_estimation`);
- re-verification after onboarding: a selfie or document re-check at login, recovery or a high-risk action (new key `capabilities.reverification`).

`yes` and `add_on` both count.

## What the score cannot measure

Public evidence cannot show pass rate, false rejection rate, completion time, manual review rate or fraud caught on your traffic, and vendor figures cannot be compared. The ranking page says this in plain words next to the table and keeps its "What to test in a proof of concept" block: run a pilot on your own users and devices, measure first-pass rate, median completion time, abandonment and the share sent to manual review, and ask for false accept and false reject rates at the threshold you will use.

## Independent tests checked (17 Nov 2026)

Searched for public, independent tests of the ten providers ranked on 17 Nov 2026 (Shufti Pro, Sumsub, Veriff, KYCAID, Persona, Incode, Veridas, Jumio, Regula, Onfido).

| Source | What it tests | Use |
|---|---|---|
| iBeta ISO/IEC 30107-3 letters | Presentation attacks at the camera | Already scored (Fraud defense) |
| CEN/TS 18099 injection tests (CLR Labs, Ingenium and others) | Injection attacks | Scored when a letter is opened. Found for iProov, Innovatrics, Keyless, Unissey; none of the ten found under its own name |
| DHS S&T RIVR 2025 (MdTF): selfie to document, document validation, liveness | Full remote flow on consumer phones | Bonus (decision 6). Of the ten, only Incode disclosed results (selfie to document; two document-validation categories). Alias still to be matched on mdtf.org |
| NIST FRTE / FATE | Face algorithms | Already scored |
| KYC AML Guide (kycaml.guide), June 2026 | Fake and genuine document acceptance | Not used: no document count, no vendor list, no dates, no method for the fakes, sells vendor services, no disclosure of vendor relationships |
| Trend Micro, "AI vs AI: DeepFakes and eKYC" | eKYC supply chain and partnerships | Not used for scores: no result per vendor |
| Gartner Magic Quadrant for Identity Verification (28 Jul 2026) | Analyst opinion | Not used: not a test, paywalled |
| Vendor guides and "tested and reviewed" listicles | Vendor marketing | Not used |

## New data fields

- `capabilities.doc_forensics`, `capabilities.manual_review`, `capabilities.proof_of_address`, `capabilities.reverification`: same shape as other capabilities (`{status, note, source}`, optional `checked`). Add them to `docs/data-schema.md` in the data PR.
- `independent_tests.rivr{ track, alias, goals_met: all | some | none, source, checked }`, one entry per track; filled only after the alias is matched on mdtf.org.
- `category_scores.identity-verification{ score, breakdown[], methodology: idv-1.0, scored }`, written by `scripts/rescore-idv.mjs --write`, never by hand, in the same `category_scores` map as KYA and Budget.
- Category file `identity-verification.yml`: `score_source: category`, `score_label: IDV score`, `rubric: rubricIdv`, `methodology_label: IDV 1.0`, `methodology_anchor: '#identity-verification'` (mechanism from PR #99).

## Page (proposal, needs owner approval before it is built)

- Ranking table and cards show the IDV score, labelled "IDV score".
- A plain line next to the table: what the score does not measure (pass rates, false rejections, completion), and why.
- `segments`: Best for fintech, Best for iGaming, Best for enterprise, Best for marketplaces, each chosen from record facts with a one-sentence reason.
- No rubric bar charts or stat tiles (owner, 2026-11-09).
- Review pages: "Ranked in" shows the rank only, as for KYA and Budget.

## Rollout

1. This file (owner approved the rules on 2026-11-17).
2. Methodology page: an "Identity verification" section with criteria, weights, the buyer profile and the date, plus a changelog entry, and `site.json` `v3.rubricIdv`. Published before any score.
3. Data: the four new capability keys and RIVR entries for every eligible record, sources dated, verification-spec.
4. `scripts/rescore-idv.mjs` reuses the v3.1 functions from `scripts/rescore.mjs`, writes `reports/rescore-idv-1.0.csv` (old rank, new rank, IDV score, each sub-score, eligibility reason). Owner reviews; manual overrides only with a written reason.
5. One PR: ranking re-ordered, cards and quick answer rewritten from the records (humanizer, invisible-characters, pre-publish check), page blocks as approved.

## Sources (accessed 17 Nov 2026)

1. iBeta, ISO 30107-3 Presentation Attack Detection confirmation letters. https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/
2. DHS S&T, Remote Identity Validation Rally results, Maryland Test Facility. https://mdtf.org/
3. Incode, "Incode Among Five Systems to Meet DHS S&T Goals in the Remote Identity Validation Rally", 5 Feb 2026. https://www.incode.com/blog/incode-meets-dhs-st-goals
4. Biometric Update, "Identy biometric PAD, Incode and Microblink document validation among RIVR winners", Mar 2026. https://www.biometricupdate.com/202603/identy-biometric-pad-incode-and-microblink-document-validation-among-rivr-winners
5. Mobile ID World, "DHS RIVR tests selfie verification and liveness detection on consumer smartphones", 31 Mar 2026 (DHS anonymises vendors). https://www.mobileidworld.com/dhs-rivr-tests-selfie-verification-and-liveness-detection-on-consumer-smartphones-with-five-vendors-meeting-all-goals/
6. iProov, CEN/TS 18099 High and Ingenium Level 4 injection attack detection, 12 Feb 2026. https://www.iproov.com/press/dynamic-liveness-first-achieving-cen-ts-18099-high-ingenium-level-4-injection-attack-detection
7. ID Tech Wire, "Innovatrics earns high-level injection attack detection certification under CEN/TS 18099". https://idtechwire.com/innovatrics-earns-high-level-injection-attack-detection-certification-under-cen-ts-18099/
8. KYC AML Guide, "Best Identity Verification Software Provider: 2026 Buyer's Roundup", 9 Jun 2026 (reviewed, not used). https://kycaml.guide/?p=15182
9. Trend Micro, "AI vs AI: DeepFakes and eKYC". https://www.trendmicro.com/vinfo/fr/security/news/cyber-attacks/ai-vs-ai-deepfakes-and-ekyc
10. Gartner, Magic Quadrant for Identity Verification, 28 Jul 2026 (abstract). https://www.gartner.com/doc/8184729
11. Buyer guides on the fraud and conversion trade-off: Persona, "Buyer's guide to identity verification solutions" (updated 12 Jan 2026), https://withpersona.com/blog/buyers-guide-identity-verification-solutions ; PYMNTS and Trulioo, "The Hidden Costs of Good Enough Identity Verification", Oct 2025, https://www.pymnts.com/wp-content/uploads/2025/10/PYMNTS-Trulioo-The-Hidden-Costs-of-Good-Enough-Identity-Verification-October-2025.pdf
