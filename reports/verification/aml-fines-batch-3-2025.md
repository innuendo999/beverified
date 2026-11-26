# AML Fines Tracker: batch 3, 2025 (FinCEN, OFAC, NYDFS) and OCC June/July 2026 (26 Nov 2026)

Spec: `docs/aml-fines.md`. Same method as batches 1 and 2: each entry built from the regulator's own document, read with the session's fetch tool; pins from printed page, section and paragraph markers; excerpts re-checked against the document text by `scripts/enforcement/fetch.mjs` after merge. Visible text uses US spelling, as the rest of the site.

## Entries added (8 actions, 8 cases)

| Id | Firm | Regulator | Date | Amount | Firm type |
|---|---|---|---|---|---|
| fincen-2025-02 | Paxful, Inc. and Paxful USA, Inc. | FinCEN | 9 Dec 2025 (signed) | $3,500,000 ($1,750,000 credited to DOJ) | vasp |
| ofac-2025-12-16-exodus | Exodus Movement, Inc. | OFAC | 16 Dec 2025 | $3,103,360 | other (wallet software) |
| ofac-2025-09-22-shapeshift | ShapeShift AG | OFAC | 22 Sep 2025 | $750,000 | vasp |
| nydfs-2025-08-07-paxos | Paxos Trust Company, LLC | NYDFS | 7 Aug 2025 (signed) | $26,500,000 + $22,000,000 compliance commitment | vasp |
| ofac-2025-07-15-interactive-brokers | Interactive Brokers LLC | OFAC | 15 Jul 2025 | $11,832,136 | broker |
| nydfs-2025-07-09-wise-us | Wise US Inc. | NYDFS (multistate, 6 regulators) | 9 Jul 2025 (signed) | $4,200,000 total | msb |
| nydfs-2025-04-10-block | Block, Inc. | NYDFS | 10 Apr 2025 (signed) | $40,000,000 + independent monitor | payment |
| fincen-2025-01 | Brink's Global Services USA, Inc. | FinCEN | 31 Jan 2025 (list date) | $37,000,000 ($20,000,000 credited to DOJ) | msb |

Schema: new failure key `registration` (operating as an unregistered MSB: Paxful, Brink's); new fields `firm_desc` (the regulator's description of the firm) and `joint_with` (other signers of a multistate order); OFAC `egregious: partial` with `egregious_count` (Exodus: 12 of 254).

Tracker total after this batch: 19 actions in 16 cases.

## Notes

- Exodus: OFAC calls it a fintech company offering digital asset wallet software. It is recorded as firm type `other` with that description, because "VASP" would claim more than the release says.
- Wise US: the $4.2 million is split among six state regulators; New York's share is not stated. Wise does not admit wrongdoing.
- Paxos: the order finds a breach of a 2020 letter agreement with the Department. A letter agreement is a supervisory agreement, not an enforcement action, so the entry is not a repeat; the breach is recorded as `remediation`.
- DOJ amounts appear only as credits (Paxful, Brink's) and in `parallel_note`; DOJ resolutions are not recorded (owner rule).

## Held for the owner

- **GVA Capital Ltd.** (OFAC, 12 Jun 2025, $215,988,868, the statutory maximum): a San Francisco venture capital firm that managed an investment for a sanctioned person (Kerimov), egregious, not self-disclosed.
- **IPI Partners, LLC** (OFAC, 2 Dec 2025, $11,485,352): a Chicago private equity firm that buys and runs data centers; it kept dealing with a sanctioned investor's representative (Gadzhiev) in one of its funds, non-egregious.

Both are investment managers rather than banks, brokers or payment firms. In or out?

## Checked and left out

- **Sigue Corporation** (NYDFS multistate, 20 Mar 2025, $1,000,000 stayed): money transmission liabilities, net worth and permissible investments, not AML.
- **OFAC 2025, non-financial firms**: Gracetown, Inc. (property management), Key Holding, LLC (freight forwarding), Fracht FWO, Harman, Unicat, Haas Automation, Family International Realty, two individuals.
- **NYDFS 2025**: Healthplex and PayPal (cybersecurity), Roach & Murtha (debt collection).
- **OCC June 2026 (NR 2026-48)**: two prohibitions (mortgage fraud, bank fraud) and three terminations, including the Bank of America cease and desist order of 14 Jul 2022 (AA-ENF-2022-21). Nothing in scope.
- **OCC July 2026 (NR 2026-59)**: United Texas Bank (already recorded), one prohibition for theft, four terminations. Nothing new.

## Not covered yet (2025)

OCC 2025 monthly releases, Federal Reserve, FDIC, FINRA, FCA, OFSI, HMRC, Central Bank of Ireland 2025, CSSF, ACPR.
