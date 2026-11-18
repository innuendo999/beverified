# Ranking re-check: Liveness Detection, Crypto KYC, Brazil (18 Nov 2026)

Why: the three rankings showed "Last verified Jul 24, 2026", past the 90-day promise (site audit, 18 Nov 2026).

Method: every ranking card (tagline, pros, cons, price, award) checked against the provider record as it stands on `main` (records re-checked 22 Oct to 5 Nov 2026); category copy (quick answer, FAQ, explainer, segments) checked against the records; the two unreviewed entries checked against the vendor's own homepage. Order still follows the scores.

## Changes

| Where | Before | After | Basis |
|---|---|---|---|
| Liveness, Veridas con (also KYC ranking) | Pending merger with Fourthline, agreed in July 2026 | Merged into Fourthline in November 2026, platforms integrated in phases | Veridas record: merger closed 3 Nov 2026 |
| Liveness, segment "Banks" | Veridas "has been backed by BBVA since its founding" | "was founded in 2017 as a joint venture with BBVA" | Veridas record; now part of Fourthline Group |
| Crypto, Chainalysis (not reviewed) | Award "Best for On-Chain Analytics"; pro "Widely trusted by regulators and law enforcement" | No award; pro "Says 50+ regulators worldwide use its data" | Awards come only from scored reviews; chainalysis.com, 18 Nov 2026 |
| Crypto, quick answer | Named Chainalysis as "the pick for on-chain forensics depth"; compared on "wallet-risk accuracy" | Names reviewed providers only; compared on onboarding checks, sanctions screening, wallet screening and Travel Rule support | We do not measure accuracy; Chainalysis has no review |
| Crypto, FAQ Travel Rule | "Likely yes above the relevant transfer threshold." | "Usually yes, if your business is a VASP." | Same answer, no hedge |
| Crypto, KYCAID con | Crypto address check price not published | Crypto address check (€0.50) names no data provider | KYCAID record, pricing re-check 2 Nov 2026 |
| Brazil, idwall (not reviewed) | Award "Best Local Registry Depth"; pros on registry depth, fraud detection and "relationships" | No award; tagline, pros and cons limited to what idwall.co states (CNH validation, document and background checks, public-data lookups) | Awards come only from scored reviews; idwall.co, 18 Nov 2026 |
| Brazil, quick answer | "idwall has the deepest local registry database"; "suits Pix-speed onboarding" | Sumsub and KYCAID with sourced reasons | Unsourced superlative and speculation removed |
| Brazil, FAQ | "Is Brazil's KYC market growing?" (no source); "Leading vendors read RG, CPF and CNH natively" | First removed; second rewritten as what to ask, with KYCAID's €0.10 CPF check | Fluff test |
| Crypto and Brazil, prices | `legacy_price_shown` (KYCAID "From €0.50/check + €100/mo") | `price_source: record`: prices and dates from the records | The fixed €100 monthly fee is gone (KYCAID record, 2 Nov 2026) |
| KYCAID cards in all rankings | "Single-module prices carry a fixed €100 monthly service fee" (7 rankings); "Smaller watchlist database than category leaders" (9 rankings); price "+ €100/mo" (9 rankings), "From €0.75/verification" (age verification) | "Ongoing monitoring is a €100 monthly add-on on top of per-check prices"; "Its watchlist docs name no data provider (the sample response shows OpenSanctions)"; "From €0.50/check" | KYCAID record: pricing re-check 2 Nov 2026 and verification notes |

## Not changed

- Scores and order. Liveness order still follows score (Shufti Pro 4.9 down to Onfido 3.6).
- Travel Rule ranking: last verified 15 Sep 2026, due by 14 Dec 2026, separate re-check.
- Other rankings keep `legacy_price_shown` (rolled over one category at a time); only the wrong KYCAID strings were corrected there.
