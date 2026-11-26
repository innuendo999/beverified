# AML Fines Tracker: batch 4, OCC 2025 (26 Nov 2026)

Same method as earlier batches. Each 2025 monthly OCC release was read for actions against banks that name BSA/AML, suspicious activity, correspondent accounts, sanctions or OFAC; matching orders were then read in full from the PDF.

## Entries added (2)

| Id | Bank | Signed | Action | Failures |
|---|---|---|---|---|
| occ-aa-ne-2025-05 | Patriot Bank, N.A. | 14 Jan 2025 | Formal agreement, no penalty | AML program, CDD (CIP for prepaid cards), SAR, risk assessment |
| occ-aa-so-2025-46 | First National Bank of Pasco | 18 Sep 2025 | Formal agreement, no penalty | AML program, SAR, correspondent due diligence, CDD, monitoring |

New action and document type `formal_agreement`; new field `status_note` (Patriot Bank's agreement was terminated in July 2026, NR 2026-59). Both agreements also cover non-AML issues (capital, strategy, credit); only the AML failures are recorded.

Tracker total with this batch: 23 actions in 20 cases.

## Monthly releases checked (2025)

| Release | Month | In scope |
|---|---|---|
| NR 2025-5 | January | Bank of America cease and desist order AA-ENF-2024-56: dated 23 Dec 2024, before the tracker's period, so not recorded (it appears as `earlier` on the 2026 Bank of America OCC entry) |
| NR 2025-12 | February | Patriot Bank formal agreement |
| NR 2025-20 | March | none (one new C&D on capital and earnings; ICICI Bank New York branch BSA/AML C&D of 2022 terminated) |
| NR 2025-35 | April | none (three prohibitions; no bank actions) |
| NR 2025-46 | May | none (two C&Ds on capital, earnings and governance) |
| NR 2025-54 | June | none (three formal agreements on strategy, capital, liquidity) |
| NR 2025-72 | July | none (no bank actions; one prohibition after a conviction for bank fraud and illegal monetary transactions, a criminal matter, not an AML control failure) |
| NR 2025-80 | August | none (one formal agreement on capital and liquidity; Anchorage Digital Bank BSA/AML C&D of 2022 terminated) |
| NR 2025-90 | September | not read: the OCC site returned a server error twice. Search snippets show prohibitions only. To re-check. |
| NR 2025-102 | October | First National Bank of Pasco formal agreement (National Iron Bank and California International Bank agreements terminated) |
| NR 2025-109 | November | none (no bank actions; Blue Ridge Bank BSA/AML C&D of 2024 terminated) |
| NR 2025-131 | December | none (six terminations, including the UBS AG Stamford Branch C&D of 2018) |

Terminations of earlier BSA/AML orders are not recorded (owner rule), but they are useful context: ICICI Bank NY (Mar 2025), Anchorage Digital Bank (Aug 2025), Blue Ridge Bank (Nov 2025), UBS AG Stamford Branch (Dec 2025).
