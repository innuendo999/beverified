# Travel Rule 1.0 dry run (2026-11-25)

Evidence: `src/_data/travelRuleEvidence.yml` (checked 2026-11-25) plus `networks[]` in each provider record.
Script: `scripts/travel-rule/dry-run-1.0.py`. For the owner's review only; nothing on the site changes.

Open owner decisions that change these numbers:
- A (no network size) or B (bonus = reachable named participants / 300, max +1 on reach).
- Calibration: rows no provider earns are dropped and each criterion's maximum becomes the best result found, not below 3 (proposed, not approved).
- Sub-scores computed exactly (the spec's "steps of 0.5" conflicts with 0.25-point rows).
- LedgerBrain eligibility (no protocol or network named; Travel Rule page needs a sign-in).
- Block Infrastructure left out: design partner stage, not generally available.

| Provider | v3.0 now | A | B | A + calibration | B + calibration |
|---|---|---|---|---|---|
| CryptoSwift | 3.9 | 3.9 | 4.0 | 4.1 | 4.2 |
| 21 Analytics | 4.1 | 3.5 | 3.6 | 3.7 | 3.8 |
| CODE | 3.4 | 3.1 | 3.4 | 3.3 | 3.6 |
| Notabene | 4.0 | 3.2 | 3.2 | 3.4 | 3.4 |
| Ospree | 3.5 | 3.2 | 3.2 | 3.3 | 3.3 |
| WIDTH | 3.4 | 3.1 | 3.1 | 3.3 | 3.3 |
| VerifyVASP | 3.8 | 3.0 | 3.0 | 3.2 | 3.2 |
| Blockpass | 3.7 | 2.2 | 2.2 | 2.3 | 2.3 |
| TRP | 3.7 | 2.1 | 2.1 | 2.1 | 2.1 |
| LedgerBrain | 3.1 | 1.6 | 1.6 | 1.7 | 1.7 |

B uses public named lists only: TRUST about 98 (logos), Ospree 122, CryptoSwift STRIP 253, Sygna 39, CODE estimated 260 (alliance list over 14 pages, full count still to do). TRISA, VerifyVASP and Notabene publish no list by name, so they add nothing under B.

Reach corrections found while collecting (they apply under A too): 21 Analytics TRP confirmed by the OpenVASP TRP page; own networks with a public list by name for Ospree, CryptoSwift and CODE; Notabene reaches counterparties without a tool through its free plan.
