# CODE (CodeVASP): new review, 2026-11-24

New record `src/_data/providers/codevasp.yml` (content plan row "CODE / CodeVASP", owner found it 13 Nov 2026). Travel Rule rubric v3.0: sub-scores proposed by Claude, **owner sets the score**. Proposed **3.4 (Good)**.

| Criterion | Weight | Proposed | Why |
|---|---|---|---|
| Compliance & certifications | 25 | 3.4 | ISO 27001 and ISO 37301 vendor-stated, no certificate; GDF due diligence on members; no PII stored (vendor) |
| Coverage | 20 | 4.0 | Korean exchange network, 350+ VASPs (vendor), Sumsub confirms the bridge; GTR, Sygna, VerifyVASP (domestic) documented by CODE; no TRUST/TRISA/TRP |
| Pricing transparency | 20 | 2.5 | nothing published; LEI free |
| Integration & API depth | 15 | 3.8 | public docs, sandbox, onboarding guide, TXID lookup |
| Support responsiveness | 10 | 3.0 | email, two business days |
| Track record | 10 | 3.8 | live since 2022; shareholders changed (Bithumb Holdings 2025, Digital X/Mirae 2026) |

## Ranking in this PR

Travel Rule **#9**, after WIDTH (both 3.4; placed below WIDTH as the newer entry, owner to decide the tie). List grows to 11; quick answer count and description updated. Fit check: `own_network codevasp: code`, deploy reading hosted.

## Checks

- Plan note asked to check owners (Digital-X instead of Korbit), 350+ VASPs and 60 jurisdictions, ISO 27001: Digital X is Korbit's operator renamed under Mirae Asset (Korea Herald, Aug 2026); network size and ISO are vendor-stated.
- Notabene and CryptoSwift links named only on CODE's homepage.
- No logo yet.
