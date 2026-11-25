# Liveness scoring methodology, Liveness 1.0 (draft, 2026-11-25)

Status: **draft for the owner**. Nothing on the site changes until the owner approves this file. Same process as AML for Banks 1.0 and Travel Rule 1.0: buyer profile and jobs, criteria and weights, critique, dry run on all candidates, then the methodology section, then scores.

Applies to the ranking `/providers/liveness-detection/` (rankings.yml key `liveness-detection`). The H1 and title stay as they are. Replaces the shared rubric v3.1 for this ranking only. The ranking stays **top 10 only** (owner, 2026-11-03).

## 1. Buyer profile (ICP)

**Primary buyer:** the fraud, risk or product lead at a business that verifies people remotely and is losing money or regulatory comfort to spoofed selfies: fintechs and neobanks, crypto exchanges, iGaming and other age-restricted services, marketplaces and gig platforms, telecoms, and public services with digital ID programmes.

- **Where:** EU and UK (EBA remote onboarding guidelines, ETSI TS 119 461, UK DIATF), US (NIST SP 800-63A-4 for anyone who follows it), and markets with national digital ID programmes.
- **Who signs off:** the head of fraud or compliance; engineering owns the integration; the DPO checks biometric data handling.
- **Two buying modes, same job:** a team that adds a liveness component to a flow it already runs (often a specialist such as iProov or FaceTec), and a team that buys liveness inside a full identity platform. Both are ranked together; the mode is a fit-check fact, not points.
- **Moments:** onboarding (selfie to document), re-verification and step-up (selfie to enrolled face), account recovery, age checks.

Situations that change the right choice but are not better or worse go into the fit check: hosted or on-premises, mobile only or web too, passive or active capture, liveness alone or a full platform, data region.

## 2. Jobs to be done and pains

| Job | What goes wrong today | Source |
|---|---|---|
| **J1. Stop fakes held up to the camera** (photos, screens, masks) | Lab results exist, but they name one product version and one level; buyers cannot tell how old the tested version is | ISO/IEC 30107-3; iBeta and BixeLab letters |
| **J2. Stop fakes that skip the camera** (virtual cameras, emulators, tampered apps, deepfake streams) | The fastest-growing attack. Entrust reports injection attacks up about 40% year on year and deepfakes in one in five biometric fraud attempts; iProov reports iOS injection attacks up 741% in 2025; Yoti counted 3.2 million injection attacks in 2025. A presentation attack test says nothing about injection | Entrust 2026 Identity Fraud Report (vendor); iProov 2026 Threat Intelligence Report (vendor); Yoti (vendor); NIST SP 800-63A-4 threat table |
| **J3. Let real customers through** | False rejects cost conversions and support tickets; error rates differ across skin tones, ages and devices | Lab letters report BPCER; ISO/IEC 19795-10; FIDO Face Verification tests |
| **J4. Show an auditor that the control is tested** | Regulators and frameworks now ask for tested PAD and injection controls, not vendor statements | EBA/GL/2022/15; NIST SP 800-63A-4 (Jul 2025); CEN/TS 18099 (Oct 2024); ISO/IEC 25456 (in development) |
| **J5. Keep biometric data lawful** | Face data is special category data under GDPR and is regulated by BIPA and similar laws; buyers need retention and deletion controls, consent support and a known data location | GDPR Art. 9; Illinois BIPA |
| **J6. Use the same face again** | Re-verification, step-up and account recovery need a stored face template, 1:1 matching and duplicate checks | Buyer profile |
| **J7. Integrate and know the cost** | Liveness is often bundled; few vendors price it on its own | Buyer profile |

## 3. What a buyer should weigh, and what we can score

| Question | Can public evidence answer it? | Where it goes |
|---|---|---|
| Does it stop presentation attacks, and on which version? | Yes: lab letters name lab, level, version, date | Criterion 1 |
| Does it stop injection attacks and deepfake streams? | Partly: lab IAD letters for a few vendors; documented device and camera integrity checks | Criterion 2 |
| Will genuine users pass, fairly? | Partly: BPCER in lab letters, third-party demographic tests, passive option | Criterion 3 |
| Is it certified beyond a PAD letter? | Yes: FIDO Face Verification, NIST FRTE/FATE listing, DHS RIVR, trust frameworks | Criterion 4 |
| What happens to the face data? | Partly: documented retention and deletion, region or on-premises, consent support, confirmed ISO 27001 or SOC 2 | Criterion 5 |
| Can we reuse the face and integrate easily? | Yes: docs, SDKs, sandbox, re-verification and duplicate checks | Criterion 6 |
| What will it cost? | Partly | Criterion 7 |
| Real attack catch rate in production, conversion rate | No: vendor figures only | Not scored; pilot checklist |
| Hosted or on-premises, mobile or web, liveness alone or platform | Yes, but depends on the buyer | Fit check, no points |

Not scored: vendor accuracy or "99.9%" claims, bounty programmes, number of attacks blocked, analyst badges, awards, customer logos.

## 4. Eligibility, criteria, weights and score

**Eligibility.** A published BeVerified review, and liveness sold by the provider today as its own product or inside its platform (`capabilities.liveness` yes). A lab letter counts only if it names the provider (or its own product) and the product version; a supplier's letter does not count for a reseller (same rule as IDV 1.0). A provider that fails is left out, not scored low.

| # | Criterion | Weight |
|---|---|---|
| 1 | Presentation attack defence (PAD) | 20% |
| 2 | Injection and deepfake defence (IAD) | 25% |
| 3 | Genuine users and fairness | 15% |
| 4 | Independent certification beyond PAD | 10% |
| 5 | Biometric data handling | 10% |
| 6 | Integration and reuse | 10% |
| 7 | Pricing transparency | 10% |

Sub-score = 1 + points, cap 5. Only public evidence earns points; nothing private does, and no weight moves to another criterion. Each piece of evidence counts in one criterion only. Liveness score = weighted average, rounded to 0.1, minus 0.3 per disclosed breach, security incident or regulatory action in the last 24 months (`incidents.yml`, `counted: false` excluded), floor 1. Grades as v3.1. Stored in `category_scores.liveness-detection`. Calibration as proposed for Travel Rule 1.0 if the owner approves it there: a row no provider earns is dropped, and a criterion's top is set by the best result found, not below 3 points.

### 4.1 Presentation attack defence (20%)

| Evidence (lab letter opened, NVLAP-accredited lab: iBeta, BixeLab or equivalent) | Points |
|---|---|
| Highest confirmed level: Level 3 | 3 |
| Level 2 | 2.5 |
| Level 1 | 1.5 |
| Tested version dated in the last 24 months | +0.5 |
| Mobile and web both tested (in one or more letters) | +0.5 |
| Liveness sold, no letter in the provider's name | 0 (sub-score 1) |

### 4.2 Injection and deepfake defence (25%)

| Evidence | Points |
|---|---|
| Lab IAD letter opened, aligned with CEN/TS 18099, level High (or the lab's equivalent) | 3 |
| Lab IAD letter opened, Substantial or level not stated | 2 |
| A second lab IAD letter, or a test on both mobile and web | +0.5 |
| Documented detection of virtual cameras, emulators, rooted or jailbroken devices, or tampered apps (in docs, not marketing copy) | +0.5 |
| Vendor-stated IAD result we could not open | +0.5 (instead of the lab rows) |

### 4.3 Genuine users and fairness (15%)

| Evidence | Points |
|---|---|
| Bona fide error rate (BPCER) published in a lab letter | 1 |
| Third-party demographic test published (FIDO Face Verification, ISO/IEC 19795-10 evaluation, NIST FRTE demographics) | 1.5 |
| Passive capture available (no user action) | 0.5 |
| Documented fallback for users the machine cannot decide (retry rules, human review) | 0.5 |
| Accessibility guidance or conformance statement for the capture flow | 0.5 |

### 4.4 Independent certification beyond PAD (10%)

| Evidence (confirmed on the issuer's register or certificate) | Points |
|---|---|
| FIDO Face Verification certificate | 2 |
| NIST FRTE or FATE listing for a face algorithm (matching, PAD or age) | 1 |
| DHS RIVR results disclosed and matched on mdtf.org | 1 |
| Trust framework certification that covers the face check: UK DIATF, ETSI TS 119 461, Kantara IAL2 | 1 |

### 4.5 Biometric data handling (10%)

| Evidence | Points |
|---|---|
| Documented retention period or customer-set retention, plus deletion (API or setting) | 1 |
| Region choice or on-premises deployment | 1 |
| Consent capture or BIPA/GDPR biometric guidance for customers | 0.5 |
| ISO/IEC 27001 or SOC 2 Type II confirmed (vendor-stated: 0.5) | 1 |
| Face data never leaves the customer's infrastructure | 0.5 |

### 4.6 Integration and reuse (10%)

| Evidence | Points |
|---|---|
| Public API documentation | 1 |
| SDKs for web, iOS and Android (two of three: 0.5) | 1 |
| Self-serve sandbox (on request: 0.5) | 1 |
| Re-verification or authentication against an enrolled face | 0.5 |
| Duplicate face search (1:N) or face blocklist | 0.5 |

### 4.7 Pricing transparency (10%)

Liveness priced as its own item, published: 5. Published only inside a bundle (for example document plus selfie): 4. Some modules priced, liveness not: 3. Price on request, or only a dated third-party price: 2. Always scored, as in Travel Rule 1.0.

## 5. What the score cannot measure

How many real attacks a product stops in production, its conversion rate with your users and devices, and whether the tested version is the one you will run. The page keeps a "What to test in a pilot" block: ask for the lab letter of the exact SDK version you will ship; run a red-team test with a virtual camera and an emulator; measure false rejects on your own traffic, split by device and age group; ask where face templates are stored and for how long.

## 6. Critique of this draft

| Risk | Why it matters | Mitigation in the draft |
|---|---|---|
| IAD gets 25% while few vendors have an IAD letter | Most providers will score 1 to 1.5 there, so the total drops for nearly everyone | This is the real differentiator in 2026 (J2); calibration lifts the scale; vendor-stated IAD still earns 0.5 |
| Old letters | A 2020 Level 2 letter and a 2025 Level 2 letter look the same on iBeta's list | +0.5 only for a tested version dated in the last 24 months |
| Letters hosted by the vendor | Only the vendor publishes some lab letters (FaceTec, Didit) | Count a lab-signed letter that names the vendor and version, wherever it is hosted; record the URL |
| Suppliers and resellers | Platforms license liveness from specialists (Ondato names none) | Only letters in the provider's own name count |
| Fairness is thinly evidenced | Few vendors publish demographic tests | Weighted 1.5 of 4 points in criterion 3, not a criterion of its own |
| Platforms vs specialists | Platforms win breadth, specialists win depth | No breadth criterion; reuse counts only face features (re-verification, 1:N) |
| Lab differences | iBeta, BixeLab and Ingenium use different protocols | All NVLAP or ISO/IEC 17025 accredited labs count the same; the letter's level is used as written, typos noted |

## 7. Owner decisions needed

1. **Buyer profile:** one ranking for platforms and specialists together (as drafted), or a separate list for specialists?
2. **Weights:** IAD 25% and PAD 20% (as drafted), or PAD and IAD equal at 22.5%?
3. **Recency:** +0.5 for a letter on a version tested in the last 24 months (as drafted), or a stricter rule that letters older than 36 months score one level lower?
4. **Calibration:** apply the Travel Rule calibration rule here too?

## 8. Rollout

1. This file, approved by the owner.
2. Evidence for every candidate (the 10 ranked plus Yoti, iProov, FaceTec, Didit, Ondato and other reviewed providers that sell liveness): `liveness{}` fields with url and date.
3. Dry run and before/after report for the owner.
4. Methodology section `/methodology/#liveness`, `site.json v3.rubricLiveness`, changelog, published before any score.
5. One PR: ranking re-ordered by the Liveness score, cards, quick answer and FAQ rewritten from the records (humanizer, invisible-characters, pre-publish check).

## Sources (accessed 25 Nov 2026)

1. NIST SP 800-63A-4, Identity Proofing and Enrollment (July 2025). https://pages.nist.gov/800-63-4/sp800-63a/security
2. ISO/IEC WD 25456, Biometric data injection attack detection (in development). https://www.iso.org/standard/90473.html
3. Persona, What is CEN/TS 18099 (vendor blog, Jul 2026). https://withpersona.com/blog/what-is-cen-ts-18099-a-guide-to-the-injection-attack-detection-standard
4. Entrust 2026 Identity Fraud Report, press release (vendor research, 18 Nov 2025). https://www.entrust.com/company/newsroom/deepfakes-social-engineering-and-injection-attacks-on-the-rise
5. iProov 2026 Threat Intelligence Report, via The Paypers (vendor research). https://thepaypers.com/fraud-and-fincrime/news/iproovs-2026-threat-intelligence-report-flags-surge-in-ai-driven-identity-attacks
6. Yoti research on injection attacks in 2025, via NHI Mgmt Group (vendor research). https://nhimg.org/articles/deepfake-injection-attacks-are-testing-liveness-controls-in-2025/
7. FIDO Alliance, certified Face Verification products. https://fidoalliance.org/certification/identity-verification/face-verification/fido-certified-products/
8. EBA Guidelines on remote customer onboarding (EBA/GL/2022/15), as cited on the liveness ranking page.
9. iBeta, ISO/IEC 30107-3 PAD confirmation letters. https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/
