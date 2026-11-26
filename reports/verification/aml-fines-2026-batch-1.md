# AML Fines Tracker: 2026 data, batch 1 (26 Nov 2026)

Spec: `docs/aml-fines.md`. Data: `src/_data/enforcement.yml`.

## Method

Each entry was built from the regulator's own document, read with the session's web fetch tool (text extracted from the PDF or HTML). Pin cites come from the printed page, section or paragraph markers in that text. Excerpts are copied from the document; `scripts/enforcement/fetch.mjs` re-checks every excerpt against the full document text in GitHub Actions and the CI check fails if one is missing. Findings are written in our own words.

The session cannot download the documents directly, so hashes, page counts and archive copies are filled by the Action after merge.

## Entries added (6 actions, 5 cases)

| Id | Firm | Regulator | Date | Amount | Document |
|---|---|---|---|---|---|
| fincen-2026-03 | Bank of America, N.A. | FinCEN | 13 Oct 2026 (list date) | $1,200,000,000; OCC $750,000,000 credited; $450,000,000 payable | Consent Order No. 2026-03 |
| ofac-2026-10-13-bank-of-america | Bank of America, N.A. | OFAC | 13 Oct 2026 | $11,662,930 | Enforcement release |
| nydfs-2026-10-15-seb | Skandinaviska Enskilda Banken AB and NY Branch | NYDFS | 15 Oct 2026 (signed) | $33,000,000 | Consent Order |
| fincen-2026-02 | UBS Financial Services Inc. | FinCEN | 3 Aug 2026 (list date) | $125,000,000; $48,000,000 credited to CFTC, SEC, FINRA | Consent Order No. 2026-02 |
| ofac-2026-03-17-tradestation | TradeStation Securities, Inc. | OFAC | 17 Mar 2026 | $1,110,661 | Enforcement release |
| fincen-2026-01 | Canaccord Genuity LLC | FinCEN | 6 Mar 2026 (list date) | $80,000,000; $20,000,000 SEC and $20,000,000 FINRA credited; $35,000,000 payable; $5,000,000 suspended | Consent Order No. 2026-01 |

Case total for Bank of America (FinCEN + OFAC rows, OCC credit not double counted): $1,211,662,930.

## Checked and left out (outside the scope in section 2)

- **Coinbase Ireland Limited**, Central Bank of Ireland, 22 Oct 2026, €3,252,618: breaches of the E-Money Regulations 2011 on safeguarding and outsourcing, not AML.
- **Order Express, Inc.**, NYDFS, Aug 2026, $250,000: cybersecurity regulation (23 NYCRR 500).
- **Santander Consumer USA Inc.**, NYDFS, 3 Jun 2026, $400,000: consumer lending fees.
- **Swedbank AB (publ) and NY Branch**, NYDFS, 16 Jul 2026, $50,000,000: Banking Law § 125(3), failing to give the Department information it asked for (¶ 35). Owner decision 26 Nov 2026: not included; withholding information from a regulator is not an AML control failure.
- **OFAC 2026 penalties on non-financial firms** (Extreme Networks, Pegasus Worldwide Logistics, Rice Lake Weighing Systems, FTI Consulting, Adani Enterprises, IMG Academy, two individuals not at financial firms).

## Discrepancies to resolve

- **UBS figures in our news item.** `/news/aml-fines-q3-2026-bank-of-america-ubs-fca/` said "more than 50,000 foreign currency wires worth over $10 billion". The consent order says more than 61,500 wires with an aggregate value of more than $10.5 billion (pp. 8, 32, 34, 36). Owner asked to update the news item (26 Nov 2026): separate PR `news-ubs-figures`.
- **OFAC amount as quoted in the FinCEN order.** The fetch tool's summary of the FinCEN order (p. 67) gave the OFAC penalty as $11,000,000, while OFAC's own release says $11,662,930. Probably a summarising error; the entry uses OFAC's figure. The owner will check p. 67 in the PDF (26 Nov 2026).

## Not covered yet (2026)

- OCC (the $750,000,000 Bank of America order and other 2026 AML orders), Federal Reserve, FDIC: documents not readable from the session; to be added once the Action or the owner can read them.
- FCA, OFSI, HMRC, FINRA, CSSF, ACPR: not readable from the session (robots.txt or refused requests).
- NYDFS 2026 list checked in full: SEB is the only in-scope action.
- Central Bank of Ireland: only the first page of press releases was checked.
