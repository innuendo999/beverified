# AML Fines Tracker: 2026 data, batch 2, OCC (26 Nov 2026)

Spec: `docs/aml-fines.md`. Same method as batch 1: each entry built from the OCC order PDF (`occ.gov/static/enforcement-actions/eaAA-ENF-*.pdf`), read with the session's fetch tool; pins from the printed article, paragraph and page markers; excerpts re-checked against the PDF text by `scripts/enforcement/fetch.mjs` after merge. The OCC site returned errors or redirects for some requests; each document below was read in full at least once.

OCC set to `live: true` in `regulators.yml`.

## Entries added (5 actions, 3 new cases)

| Id | Firm | Date signed | Action | Amount | Failures |
|---|---|---|---|---|---|
| occ-aa-enf-2026-41 | Bank of America, N.A. | 13 Oct 2026 | Civil money penalty | $750,000,000 | AML programme, SAR, correspondent due diligence, wire Travel Rule |
| occ-aa-enf-2026-47 | American Express National Bank | 8 Oct 2026 | Civil money penalty | $350,000,000 | AML programme, SAR, CDD/CIP |
| occ-aa-enf-2026-46 | American Express National Bank | 8 Oct 2026 | Cease and desist | none | requirements recorded (risk assessment, CDD/EDD/CIP, monitoring, SAR look-back) |
| occ-aa-enf-2026-29 | United Texas Bank, N.A. | 16 Jun 2026 | Cease and desist | none | AML programme, CDD, monitoring, SAR, OFAC screening |
| occ-aa-enf-2025-21 | Community Federal Savings Bank | 24 Apr 2026 | Consent order, no penalty | none | AML programme, monitoring, CDD, SAR, 314(a) information sharing |

Bank of America case total stays $1,211,662,930: FinCEN credits the OCC's $750,000,000, so the OCC row is not counted twice.

## Notes

- The Bank of America OCC order cites the wire transfer Travel Rule (31 CFR 1010.410(f)). It uses `ranking_override: [aml, aml/banks]` so the entry does not link to our crypto Travel Rule ranking.
- American Express: the Federal Reserve Board issued a parallel cease and desist order against American Express Company and American Express Travel Related Services Company (OCC release NR 2026-87). The Federal Reserve is not live yet, so that order is not recorded; it is noted in `parallel_note`.
- Community Federal Savings Bank: the order says the findings are largely unrelated to customers involved in digital asset activity (p. 1).

## Monthly releases checked (2026)

| Release | Month | In scope |
|---|---|---|
| NR 2026-3 | January | none (one prohibition for embezzlement, five terminations) |
| NR 2026-8 | February | none (five terminations of formal agreements) |
| NR 2026-15 | March | none (one prohibition, four terminations) |
| NR 2026-28 | April | none (FTC Act consent order on VA loans, two prohibitions, three terminations) |
| NR 2026-40 | May | Community Federal Savings Bank (read from a search snippet listing; the order itself read in full) |
| NR 2026-48 | June | not fully read: the site redirected to its homepage; the snippet shows lending-fraud prohibitions only. To re-check. |
| NR 2026-59 | July | United Texas Bank (read from a search snippet; the order itself read in full). To re-check the full release. |
| NR 2026-70 | August | none (one termination) |
| NR 2026-79 | September | none (two prohibitions for embezzlement) |
| NR 2026-93 | October | Bank of America, American Express (two prohibitions for embezzlement out of scope) |
| NR 2026-104 | November | none (flood insurance penalty, one termination) |

Terminations of earlier orders are not new actions and are not recorded. Prohibition orders for embezzlement or theft are not AML control failures and are out of scope.
