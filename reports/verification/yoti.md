# Yoti: new review, 2026-11-24

New record `src/_data/providers/yoti.yml` (content plan: new vendor reviews 2/12). Desk research on yoti.com, Yoti developer docs, iBeta, the UK DVS register and Intertek's certificate, checked 24 Nov 2026.

## Score

v3.1, identity family, age scope (`node scripts/rescore.mjs yoti`): **4.8 (Excellent)**, unrounded 4.750.

| Criterion | Weight | Sub-score | Why |
|---|---|---|---|
| Fraud defense | 25 | 5 | iBeta Level 3 letter opened (23 Jan 2026), NFC in the Digital ID app |
| Pricing | 20 | 4 | published (£0.15 age check), £15 monthly minimum |
| Coverage | 15 | 5 | 200+ countries, 12,000+ document types, non-document age checks |
| Platform breadth (age modules) | 15 | 5 | 7 of 8 (no open banking) |
| Integration | 15 | 5 | public docs, web/iOS/Android SDKs, Hub sandbox, no-code portal |
| Trust | 10 | 4.5 | ISO 27001 confirmed, UK DVS confirmed, since 2014, minus 1 for the AEPD fine (Mar 2026) |

## Rankings in this PR (by score, owner to confirm)

- **Age Verification:** #3 (Yoti 4.750 below Sumsub 4.800). List grows to 8; quick answer count and pricing FAQ updated. Award "Best Age Check Specialist".
- **Liveness Detection (top 10 only):** #3. Onfido (#10, 3.6, tied with Regula) leaves the list; FAQ on iBeta levels updated. Award "Best Passive Liveness for Age Checks".
- **UK (DVS register only):** #1, Editor's Choice (Veriff 4.5 moves to #2, award "Best for Global Coverage"). Quick answer, description, two FAQ answers and the pricing-count line updated.
- Not scored on IDV 1.0 (no category score computed).

## Incident

`incidents.yml` entry `yoti-2026-03` (type regulatory, counted): AEPD fine €950,000 (10 Mar 2026) over the Digital ID app; appeal at the Audiencia Nacional; fine suspended Apr 2026; app withdrawn from Spanish stores from 10 Sep 2026. The AEPD resolution PDF is blocked for our tool (robots), so the entry cites Yoti's own post and trade press.

## Not used / open

- ACCS Level 2 age estimation: registry page not readable; snippet showed validity 21/10/2026. Listed as vendor_stated; re-check in a browser.
- SOC 2 Type II vendor-stated only.
- Document and selfie IDV has no public price.
- Logo and wordmark: added from the owner's images on 2026-11-24.
