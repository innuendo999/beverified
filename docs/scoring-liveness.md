# Liveness scoring methodology, Liveness 1.0 (draft, 2026-11-25)

Status: **approved by the owner on 2026-11-25**: one ranking for platforms and specialists together (a separate specialist list later, once more specialists are reviewed), criteria and weights as below, +0.5 recency for a version tested in the last 24 months. Calibration follows the owner's decision on the Travel Rule calibration rule. Nothing on the site changes until the dry run is reviewed. Same process as AML for Banks 1.0 and Travel Rule 1.0: buyer profile and jobs, criteria and weights, critique, dry run on all candidates, then the methodology section, then scores.

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

Revised on 2026-11-25 after the first batch showed that an additive "1 + points" scale left most providers at 1 on criteria where almost nobody has evidence yet. All criteria now use steps (as Fraud defense in IDV 1.0), fixed before the full evidence pass.

**Eligibility.** A published BeVerified review, and liveness sold by the provider today as its own product or inside its platform (`capabilities.liveness` yes). A provider that fails is left out, not scored low.

**Whose letter counts.** A lab letter counts at full value only if it names the provider (or its own product) and the version. If a provider names its liveness supplier and documents that it uses the supplier's SDK unchanged, the supplier's letter counts one step lower. An unnamed supplier's letter does not count.

| # | Criterion | Weight |
|---|---|---|
| 1 | Presentation attack defence (PAD) | 20% |
| 2 | Injection and deepfake defence (IAD) | 20% |
| 3 | Genuine users | 15% |
| 4 | Compliance evidence | 15% |
| 5 | Biometric data handling | 10% |
| 6 | Integration and reuse | 10% |
| 7 | Pricing transparency | 10% |

Only public evidence counts; each piece of evidence counts in one criterion only; no weight moves. Liveness score = weighted average, rounded to 0.1, minus 0.3 per disclosed breach, security incident or regulatory action in the last 24 months (`incidents.yml`, `counted: false` excluded), floor 1. Grades as v3.1. Stored in `category_scores.liveness-detection`. Calibration follows the owner's decision on the Travel Rule calibration rule.

### 4.1 Presentation attack defence (20%)

Steps by the highest level confirmed in a letter from an accredited lab (NVLAP or ISO/IEC 17025: iBeta, BixeLab, Ingenium, CLR Labs and others):

| Highest confirmed level | Sub-score |
|---|---|
| Level 3 | 4.5 |
| Level 2 | 4 |
| Level 1 | 3 |
| Liveness sold, no letter that counts | 1.5 |

Adjustments, then cap 5 and floor 1.5:
- **+0.5** if the tested version is dated in the last 24 months.
- **One step lower** if the newest letter at that level is older than 36 months (Level 2 counts as Level 1).
- **−0.5** if the error rate for genuine users (BPCER) for that test is not published anywhere public (letter, report, or the vendor's release quoting the lab's report).

### 4.2 Injection and deepfake defence (20%)

| Evidence | Sub-score |
|---|---|
| Lab IAD letter opened, level High (or the lab's stated equivalent), covering both web and mobile capture | 5 |
| Lab IAD letter opened, level High, one capture type only | 4.5 |
| Lab IAD letter opened, level Substantial or not stated | 4 |
| Lab IAD result or independent penetration test announced, letter or report not found | 3 |
| Technical controls documented in the vendor's docs: virtual camera, emulator, rooted or jailbroken device, or app tampering detection | 2.5 |
| Nothing found | 1.5 |

### 4.3 Genuine users (15%)

Sub-score = 2 + points, cap 5:

| Evidence | Points |
|---|---|
| Passive capture available (no user action) | 1 |
| Third-party demographic test published (ISO/IEC 19795-10 evaluation, NIST FRTE demographic results) | 1 |
| Capture on web as well as mobile | 0.5 |
| Documented fallback for users the machine cannot decide (retry rules, human review) | 0.5 |
| Accessibility conformance stated for the capture flow (WCAG 2.1 or 2.2 AA) | 0.5 |

Completion rates, time to complete and behaviour on low-end devices are not public and go to "What to test in a pilot".

### 4.4 Compliance evidence (15%)

Sub-score = 1.5 + points, cap 5. Confirmed on the issuer's register, certificate or report:

| Evidence | Points |
|---|---|
| FIDO Face Verification certificate | 2 |
| NIST FATE PAD or FRTE listing for the face algorithm, or DHS RIVR results matched on mdtf.org | 1 |
| Trust framework certification of a service that includes the face check: UK DIATF, ETSI TS 119 461, Kantara IAL2 | 1 |
| ISO/IEC 27001 or SOC 2 Type II confirmed (vendor-stated: 0.5) | 1 |

NIST FATE age estimation is not counted here: it tests age, not liveness.

### 4.5 Biometric data handling (10%)

Sub-score = 1.5 + points, cap 5:

| Evidence | Points |
|---|---|
| Documented retention period or customer-set retention, plus deletion (API or setting) | 1.5 |
| Region choice or on-premises deployment | 1 |
| Face data never leaves the customer's infrastructure | 0.5 |
| Consent capture or biometric privacy guidance for customers (GDPR Art. 9, BIPA) | 0.5 |

### 4.6 Integration and reuse (10%)

Sub-score = 1 + points, cap 5: public API docs 1; SDKs for web, iOS and Android 1 (two of three 0.5); self-serve sandbox 1 (on request 0.5); re-verification or authentication against an enrolled face 0.5; duplicate face search (1:N) or face blocklist 0.5.

### 4.7 Pricing transparency (10%)

Liveness priced as its own item, published: 5. Published only inside a bundle: 4. Some modules priced, liveness not: 3. Price on request, or only a dated third-party price: 2.

## 5. What the score cannot measure

How many real attacks a product stops in production, its conversion rate with your users and devices, and whether the tested version is the one you will run. The page keeps a "What to test in a pilot" block: ask for the lab letter of the exact SDK version you will ship; run a red-team test with a virtual camera and an emulator; measure false rejects on your own traffic, split by device and age group; ask where face templates are stored and for how long.

## 6. Critique (2026-11-25) and what changed

| Problem | Change |
|---|---|
| A "1 + points" scale left most providers at 1 where almost nobody has evidence | Steps for every criterion |
| A lab pass says nothing about genuine users if BPCER is hidden | −0.5 on PAD when BPCER is not public |
| Old letters cost almost nothing | Letters older than 36 months count one step lower |
| NIST FATE age estimation was counted as liveness evidence | Removed; only FATE PAD or FRTE count |
| A letter on one SDK says little about the web flow, where most injection happens | Top IAD step needs web and mobile |
| Resellers with a strong supplier scored as if they had nothing | Named supplier with unchanged SDK counts one step lower |
| Trust frameworks cover the whole service, FIDO Face tests the face check | FIDO 2 points, trust frameworks 1 |
| Lab tests cost money and favour large vendors | Kept: untested is a real risk for the buyer; said openly on the page |
| Conversion and friction matter most to many buyers but are not public | Kept at 15% on what is public; the rest goes to the pilot checklist |
| Scores measure evidence of testing, not production performance | Said on the page; pilot checklist |

## 7. Owner decisions (2026-11-25)

1. **Buyer profile:** one ranking for platforms and specialists together. Approved. A separate specialist list once Daon, Innovatrics, Paravision and other specialists are reviewed.
2. **Weights:** revised the same day to PAD 20, IAD 20, genuine users 15, compliance evidence 15, data 10, integration 10, pricing 10, with steps instead of additive points (owner approved the mix and the eight changes in section 6).
3. **Recency:** +0.5 for a version tested in the last 24 months. Approved.
4. **Calibration:** same decision as for Travel Rule 1.0 (pending there).

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
