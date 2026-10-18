# Paravision: verification report (new record)

Checked 2026-10-18. New record `src/_data/providers/paravision.yml`, written from public sources only (Paravision sent no product details). Paravision asked to be listed; `link.type: none`.

## What we checked

- **Company**: homepage, company page (leadership), contact page (San Francisco HQ), privacy policy, newsroom pages 1 and 2. History from FTC documents (decision and order, May 2021 release, case page, Paravision's 2022 compliance report), Paravision's Aug 2020 post on closing Ever, Identity Week (Aug 2019 rebrand), TechCrunch (2016, Everalbum founders and funding). Funding from the HID Global release (Business Wire) and ID Tech Wire ($23M, May 2021, led by J2 Ventures). Founding year: not found in any source opened.
- **Products**: face recognition, liveness, deepfake detection and age estimation product pages; partners page; Deepfake Detection 2.0 launch (Jun 2025); Liveness 2.0 launch (Mar 2025).
- **Buyer type**: Paravision sells SDKs, Docker containers and edge SDKs to platforms, device makers and integrators. It is not an end-user KYC platform: no document verification, screening or case management. Partners named include Persona, ID.me, Entrust and HID.
- **Pricing**: nothing published; contact page offers a demo only; GetApp shows no pricing. No trial or evaluation licence found.
- **Independent tests**:
  - iBeta ISO/IEC 30107-3: **confirmed** on iBeta's letters page, Liveness v1.0 Level 1 (16 Oct 2023) and v1.2 Level 2 (28 Dec 2023). Level 2 letter opened (iPhone 13, iOS 16.6, 750 attacks, APCER 0%). No iBeta letter found for the current Liveness 2.0.
  - ACCS age estimation: **confirmed** on the ACCS register, Paravision Inc Age Estimator, Level 3 Highly Effective Compliance, ACCS 1:2020, expires 18 Mar 2027.
  - DHS RIVR 2025: MdTF results page (anonymised) shows PAD system 9 (APCER <1.7%, BPCER <0.5%) and SMTD system 12 (FMR <0.01%, FNMR <0.08%). Figures match Paravision's releases, which name P9 and MTDS 12 as its systems. Attribution is vendor-stated.
  - NIST FRTE: Paravision's July 2025 release (paravision-018 / -019, top 5 Visa-Border, 1:1 and 1:N) and Trust page (4th 1:1, Jan 2026). NIST pages opened but tables are script-rendered; **vendor_stated**.
  - Ingenium Level 3 PAD evaluation of Liveness 2.0 (Aug 2025): vendor release only.
- **Security certifications**: no ISO/IEC 27001 or SOC 2 claim found anywhere. Not listed.
- **Legal and privacy**: FTC matter 192 3172 (Everalbum, Inc., d/b/a Ever and Paravision). Final order of 7 May 2021 (vote 4-0) required deletion of models and algorithms built with Ever users' biometric data and runs 20 years (to 2041). The company neither admitted nor denied the allegations. 2022 compliance report says deletions were done and sold technology was not trained on Ever data. Separate 2020 BIPA class action (Walton v. Paravision, California federal court) reported by Biometric Update; outcome not found.
- **News to Oct 2026**: State Department award up to $6.5M (Biometric Update, 17 Oct 2026); DHS RIVR releases (Jan, Mar 2026); Prism report (Aug 2026); ISO/ICAO image quality suite (Sept 2026, title only).
- **User ratings**: GetApp 0 reviews; no G2 page found. `user_ratings` empty.

## Removed / unverifiable

- NIST ranks (vendor-stated only, tables not readable).
- DHS RIVTD 2024 and DHS Biometric Technology Rally 2021 to 2023 claims (vendor only).
- Liveness 2.0 and Deepfake Detection 2.0 improvement percentages (vendor only).
- ACCS bias evaluation and Australian AATT figures (vendor and joint vendor releases only).
- Wikipedia's $21M funding figure and its description of the FTC case (do not match primary sources).

## Score

3.9 (Good). Weighted average of the breakdown:

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 4.5 |
| Coverage | 20 | 3.8 |
| Pricing transparency | 20 | 3.0 |
| Integration & API depth | 15 | 4.3 |
| Support responsiveness | 10 | 3.5 |
| Track record | 10 | 3.8 |

**Score flag**: 3.9 is below the lowest existing record (Zyphe 4.0). No grade word is defined below 4.0; "Good" applied, editor to confirm. The low result comes mostly from coverage and pricing (40% of the weight), which the rubric measures for KYC platforms; a component supplier with no documents and no published prices scores low there even with strong independent test results.

## Ranking cards (suggested, `src/_data/rankings.yml` not edited)

### liveness-detection: position 3 of 5

After Veriff (4.6) and Onfido (4.5), before the unreviewed iProov and FaceTec.

```yaml
  - slug: paravision
    name: Paravision
    award: Best for Self-Hosted Face Biometrics
    tagline: Passive liveness and deepfake detection sold as SDKs and containers to platforms that build their own verification flow.
    coverage: Global
    size: Mid-market to Enterprise
    pros:
    - Liveness tested by iBeta to ISO/IEC 30107-3 Level 1 and Level 2 (2023 versions)
    - DHS RIVR 2025 PAD results match the figures Paravision gives for its entry
    - Runs on-premises, in your own cloud, on phones or on edge chips
    cons:
    - A component supplier, with no document checks or hosted flow of its own
    - No published pricing, trial or public developer documentation
    - No iBeta letter yet for the current Liveness 2.0
    legacy_price_shown: Custom pricing
    legacy_rating_shown: null
    segments: []
```

### age-verification: position 9 of 9

After VerifyMy (4.4), last in the list.

```yaml
  - slug: paravision
    name: Paravision
    award: Best age estimation engine to build on
    tagline: Face age estimation licensed as an SDK or container, certified by ACCS at Level 3 and used inside Persona's age checks.
    coverage: Global
    size: null
    pros:
    - ACCS Level 3 (Highly Effective Compliance) age estimation, valid to March 2027
    - Runs on-premises or in your own cloud, so face images stay in your systems
    - Comes with iBeta-tested liveness and deepfake detection from the same vendor
    cons:
    - An engine to integrate, not a hosted age check with document or database fallback
    - No public pricing
    - Lowest overall score in this list
    legacy_price_shown: Custom pricing
    legacy_rating_shown: null
    segments: []
```

Not added to identity-verification: Paravision has no document verification, so it does not meet that list's scope.
