# Socure: new review (2026-11-09)

New record `src/_data/providers/socure.yml`, built from public sources under docs/verification-spec.md. Score computed by `scripts/rescore.mjs` on rubric v3.1; owner confirms before merge.

## Score (v3.1, identity family): 3.8, Very Good

| Criterion | Weight | Sub-score | Basis |
|---|---|---|---|
| Fraud defense | 25% | 2 | liveness claimed as "NIST PAD Level 2", no iBeta letter found |
| Pricing and total cost | 20% | 4.5 | Socure Launch per-evaluation prices published, $1,000 monthly credits; no minimum stated, so not credited |
| Coverage | 15% | 4 | 190 countries, 6,000 document types, eKYC without a document |
| Platform breadth | 15% | 5 | 7 of 8 modules (no video ident) |
| Integration | 15% | 5 | public docs, web/iOS/Android SDKs, self-serve sandbox, Hosted Flow; support hours not found |
| Trust | 10% | 3 | ISO 27001 and SOC 2 vendor-stated, operating since 2012; FedRAMP Moderate confirmed but not a v3.1 trust-framework item |

## Score flags for the owner

- An iBeta (or other accredited lab) letter for Socure liveness would lift Fraud defense from 2 to 4 (Level 2) and the total to about 4.3.
- Opening Socure's ISO 27001 certificate or SOC 2 report in trust.socure.com would add +1 to Trust (total +0.1).
- FedRAMP Moderate is confirmed on the FedRAMP Marketplace but the v3.1 trust rule only counts DIATF, Kantara, ISO/IEC TS 29003, eIDAS, ETSI, PVID. Owner decision whether FedRAMP should count.

## Unconfirmed / left out

- Kantara IAL2: 2022 news report only; Trust Status List does not render.
- Transaction monitoring: one press-release sentence; docs describe Payment Screening.
- User ratings (G2, Gartner): not opened.
- KYB monitoring and company documents: not described in docs.

## Ranking cards

Socure is not in `src/_data/rankings.yml`. At 3.8 it would sit below the current Identity Verification top 10 (lowest 4.5). Adding it to any ranking, and to the KYC Pricing Index (`pricing.index`), is the owner's decision.
