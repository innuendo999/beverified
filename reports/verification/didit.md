# Didit: first review, 2026-11-17

Scope: new provider record `src/_data/providers/didit.yml`, scored under rubric v3.1 (identity family). Added to the Australia and Nigeria rankings; removed from `tracked.yml`.

## Score (scripts/rescore.mjs)

| Criterion | Weight | Score | Basis |
|---|---|---|---|
| Fraud defense | 25 | 3.5 | iBeta PAD Level 1 letter on ibeta.com (confirmed) + NFC |
| Pricing and total cost | 20 | 5 | public price list, no minimum, free plan |
| Coverage | 15 | 5 | 220+ countries, 14,000+ documents, non-doc checks (vendor) |
| Platform breadth | 15 | 4 | 6 of 8 modules |
| Integration | 15 | 5 | public docs, SDKs, free sandbox, hosted flow |
| Trust and track record | 10 | 3.5 | ISO/IEC 27001 confirmed (certificate opened), EU residency; founded 2023 |

Overall 4.3 (Great).

## Confirmed independently
- iBeta ISO/IEC 30107-3 PAD Level 1, Didit Identity, Inc., Didit Biometric Authentication v2.0, iPhone 13 Pro, 4 Feb 2026, 0% IAPAR in 360 attempts.
- ISO/IEC 27001:2022, Bureau Veritas Iberia, cert. ES144068 v2, Didit Identity Spain S.L., issued 7 Apr 2026, valid to 3 Jun 2027.

## Vendor-stated, not yet checked
- iBeta Level 2 (active liveness, 9 Nov 2026): letter hosted on Didit's S3, fetch needed approval. If it names Didit: fraud defense 4.5, overall about 4.6.
- SOC 2 Type 1 and Type 2 (reports gated). FSM age verification seal. Spanish regulators' supervised test report (tesoro.es not opened).

## Pricing (didit.me/pricing, read 17 Nov 2026; page notes a change on 1 Nov 2026)
Free $0 ($10 credit/mo), Growth $99/mo, Scale $299/mo, Enterprise custom. Full KYC $0.33, AML screening $0.20, ongoing monitoring $0.07/user/yr, non-doc lookups $0.05 to $4.30 by country. KYB at staging rates. Older "500 free verifications a month" claim replaced in the Australia card.

## Not used
Customer counts (3,000+ vs 1,500 conflict), speed/uptime/breach claims, logo wall, Trustpilot (end-user reviews, counts conflict).

## Follow-ups for the owner
- Whether to add Didit to Identity Verification and Budget KYC rankings (score 4.3 would place it among the top entries); the Budget KYC page now says it is reviewed but not yet scored there.
- Re-check iBeta Level 2 letter.
