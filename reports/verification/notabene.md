# Notabene: new review 2026-11-04

New record `src/_data/providers/notabene.yml`. Proposed score 4.1, grade Good, weighted from the six rubric criteria in `score_breakdown`. `link.type: none`. Categories: `travel-rule` only. Notabene was listed, unreviewed, in Travel Rule and Crypto KYC; the owner removed it from Crypto KYC on 4 Nov 2026 because it has no customer KYC. Notabene competes with TRUST and with 21 Analytics, which contributes Travel Rule guides to BeVerified; that relationship had no influence on the review or the score.

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 4.0 |
| Coverage | 20 | 4.2 |
| Pricing transparency | 20 | 3.6 |
| Integration & API depth | 15 | 4.3 |
| Support responsiveness | 10 | 4.1 |
| Track record | 10 | 4.5 |
| **Weighted** | | **4.065, rounds to 4.1** |

Calibration against the other reviewed Travel Rule records:

- Compliance 4.0 sits below 21 Analytics (4.3, public ISO/IEC 27001 certificate from an accredited body) and above VerifyVASP (3.9, SOC 2 vendor-stated). Notabene claims both ISO/IEC 27001:2022 and SOC 2 Type II and publishes its MSA, DPA, SLA, DORA and MAS exhibits and an amended certificate of incorporation, but the certificate and report are gated behind its Trust Center and no body or auditor is named.
- Coverage 4.2 is just below 21 Analytics (4.3): Notabene has the largest network claim and integrations documented by Fireblocks and Ripple Custody, and four wallet methods, but no direct TRUST route (21 Analytics has one, confirmed by TRUST), VerifyVASP pending and no live TRISA route documented.
- Pricing 3.6 equals 21 Analytics: a free tier with published limits and published contract terms, but no figure for the paid platform. Below CryptoSwift and TRP (4.4), which publish paid prices.

## Checked (pages opened, 4 Nov 2026)

- **Vendor site:** homepage (1), pricing (2), about us (3), security and trust (4), Main Services Agreement (5), SLA (6), privacy policy (7), website terms (8), agreements index (9), protocols overview (10), TRP (11), TRUST/USTRWG (12), VerifyVASP (13), Sygna Bridge (28), Crypto Wallet ID (15), Travel Rule compliance (16), TAP (17), SOC 2 post (22), Ripple investment post (23).
- **Developer docs (opened on re-try):** API reference (18): three platform references and a public Postman collection, no OpenAPI or sandbox mention, so those claims were removed; v2 webhooks page (19): Svix, signed payloads, retries, EU and US regions, polling.
- **From search results only (pages not opened):** TRISA protocol page (14), Fireblocks developer docs (20), Ripple Custody docs (21), Crypto Briefing (24), CoinDesk (25), The Block (26), Notabene help centre TFR article (27).
- **Not readable on re-try (4 Nov 2026):** trust.notabene.id and its subprocessors page load only page metadata (the content renders by script from Vanta); G2 refused the request. devx llms.txt, the certificate of incorporation and IRS good standing PDFs not opened. The GTR protocol page failed to load.
- **Searched** for acquisitions, breaches, regulatory actions, litigation and layoffs: none found.

## Networks and protocols

| Network | Status | Evidence |
|---|---|---|
| Notabene network | Vendor-stated | 2,300+ institutions claimed (1, 3); 1,500+ on the wallet page (15) |
| TRP | Vendor-stated | "Every Notabene customer has a live TRP 1.0 endpoint" (11) |
| TRUST | Not direct | Coinbase does not let outside vendors connect; customers join TRUST themselves and bridge by webhook (12) |
| VerifyVASP | Pending | Support waiting on a security review (13) |
| TRISA | Not documented | Notabene's page is marked historical and calls TRISA discontinued (14); TRISA itself announced interoperability with Ospree in June 2024, so the page looks out of date |
| Sygna Bridge | Unclear | Page invites firms to connect through Notabene's API; no live status (28) |
| GTR, CODE | Not found | GTR page did not load |
| Fireblocks, Ripple Custody | Integrated | Both document a Notabene integration (20, 21) |
| TAP | Notabene's own open protocol | Governed by community proposals per Notabene (17) |

## Ranking cards

- **`travel-rule`:** Notabene entry linked (`slug: notabene`) and moved from 6th to **2nd**. It ties 21 Analytics at 4.1; the existing order is kept on the tie, so 21 Analytics stays first. **Editor to confirm the tie order.** Tagline, coverage, size, pros and cons rewritten from the record; old cards claimed "Newer vendor with a smaller track record" and "Not a full KYC platform" style points that no longer fit. Award kept: "Best for Hosted Travel Rule Exchange".
- **`crypto`:** entry removed (owner decision, 4 Nov 2026: no customer KYC). The list now has 4 providers.
- `legacy_price_shown` set to "Free plan; paid plans on request" (the category does not use `price_source: record`).

Category copy: `travel-rule.yml` SEO description order and quick answer (Notabene second at 4.1, others renumbered, the "no full review yet" sentence removed). `crypto.yml`: Notabene removed from the quick answer and SEO description, count 5 to 4 in the quick answer and `legacy_stats`, `updated` 2026-11-04. Travel Rule count unchanged (6).

Other records: `21analytics.yml`, `trp.yml` and `verifyvasp.yml` list Notabene as an alternative; `slug: null` changed to `slug: notabene` so those entries link to the review. Their text was already consistent with this record. `tracked.yml`: Notabene removed (now reviewed).

## KYC Pricing Index

`pricing.index_exclude` set: the only published figures are the free plan and its send cap, so there is no per-check or per-transfer price to compare. Editor may prefer to add it to the index instead.

## Score flag

None. New score, proposed 4.1.

## Could not confirm

- ISO/IEC 27001 certification body, scope, certificate number and expiry; SOC 2 auditor and period.
- Hosting provider (privacy policy says US and EU servers only).
- Which of the protocols on the overview page are live today (only TRP is stated as live for every customer).
- Network, customer and volume figures (inconsistent across Notabene's own pages).
- User ratings (G2 not opened).
