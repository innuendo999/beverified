# BeVerified AML Fines Tracker: specification

Status: draft for owner approval (26 Nov 2026). Nothing in this file is built yet.

## 1. What it is

A public record of final regulator actions for AML, CFT, KYC and sanctions compliance failures at financial firms in the US, UK and EU, from 1 January 2025. Every entry is built from the regulator's own document. The page answers "fintech money laundering" with data: what regulators found, at which kind of firm, and which control failed.

Owner decisions (26 Nov 2026):

| Item | Decision |
|---|---|
| Name | BeVerified AML Fines Tracker |
| URL | `/aml-fines/`; yearly reports at `/aml-fines/2025/`, `/aml-fines/2026/` |
| H1 | AML Fines Tracker: Money Laundering Enforcement Against Banks and Fintechs |
| Title tag | AML Fines Tracker 2026: Bank and Fintech Money Laundering Penalties \| BeVerified (year changes on 1 January) |
| Firms | All financial firms (scope B); headline figures also computed for non-banks |
| Period | From 1 January 2025 |
| Non-monetary actions | Included, marked as non-monetary |
| Sources | No "Sources" column and no inline text links: the document is shown as a document (section 7) |

## 2. Scope

**In:**
- Firms: banks and credit unions, broker-dealers and investment firms, money services businesses and money transmitters, e-money and payment institutions, neobanks, crypto exchanges and other VASPs, card and payment processors, casinos only when the action is taken by a listed financial regulator (e.g. FinCEN).
- Actions: a final action by a listed regulator (section 3) for failures in AML/CFT programmes, customer due diligence, transaction monitoring, suspicious activity reporting, sanctions compliance, Travel Rule or beneficial ownership checks. Monetary (fine, civil money penalty, settlement) and non-monetary (restriction, voluntary requirement imposed at the regulator's request, licence revocation, cease and desist, consent order without a penalty).

**Out:**
- Non-financial firms, even when penalised by a listed regulator (e.g. OFAC penalties on exporters or logistics firms).
- Proposed actions, warning notices, allegations, lawsuits, actions under appeal before a final decision (an appeal after a final decision is shown on the entry).
- Market abuse, conduct, consumer protection and cybersecurity actions with no AML, KYC or sanctions finding (e.g. NYDFS cybersecurity settlements).
- A vendor we review that is itself penalised: goes to `/incidents/`, with a cross-link here only if it also fits this scope.

Open questions for the owner are in section 13.

## 3. Regulators

Launch set: regulators whose lists and documents our tools could read on 26 Nov 2026. Each source is re-checked from GitHub Actions before the data pass, because sessions cannot reach some sites.

| Regulator | Region | Readable 26 Nov 2026 | What we read |
|---|---|---|---|
| FinCEN | US | Yes: enforcement list with matter numbers and consent order PDFs | List page + order PDF |
| OFAC | US | Yes: civil penalties list with dates and amounts | List + enforcement release PDF |
| NYDFS | US | Yes: press releases (e.g. SEB, $33M, 15 Oct 2026) | Release + consent order PDF |
| OCC | US | Partly: monthly "Enforcement Actions for {month}" releases; search tool not tested | Monthly release + order PDF |
| Federal Reserve | US | List page needs JS; RSS feed already used by the news collector | RSS + order PDF |
| FCA | UK | No: robots.txt blocks our fetch tool; RSS already used by the news collector | RSS + final notice; owner checks in a browser when a document cannot be fetched |
| OFSI | UK | Not tested | |
| Central Bank of Ireland | EU | Yes: press releases (e.g. Coinbase Ireland, 22 Oct 2026) | Release + public statement / settlement notice |
| Bank of Lithuania, DNB, BaFin, FIAU Malta | EU | No: request refused from the session | Re-test from Actions; added only if readable |

Proposed additions (owner decides, section 13): FINRA (broker-dealer AML under Rule 3310), FDIC, HMRC (supervises UK MSBs), CSSF Luxembourg, ACPR France.

Rule: a regulator is listed on the page ("Regulators we track") with the date we started tracking it. Figures never claim coverage of a regulator that is not listed.

## 4. Unit of record

- **Action** = one document from one regulator against one firm (or a firm and its affiliates named in the same document). This is the row in the table.
- **Case** = actions that resolve the same conduct, linked by `case_id` (e.g. FinCEN, OCC and OFAC against Bank of America on 13 Oct 2026). The case is shown as a document trail inside each of its rows.
- Headline figures say which unit they count ("42 actions in 31 cases").

## 5. Data: `src/_data/enforcement.yml`

One record per action, newest first. Fields (the example uses facts from our Q3 2026 news item; fields marked null are not checked yet):

```yaml
checked: '2026-11-26'          # last full pass over all sources
items:
- id: fincen-2026-03                    # regulator + its matter number, or regulator + date + firm slug
  case_id: bofa-2026-10
  firm: Bank of America, N.A.
  firm_group: Bank of America             # for repeat findings across entities
  firm_type: bank                         # bank | broker | msb | emi | payment | neobank | vasp | card | casino | other
  country: US                             # firm's country as named in the document
  regulator: fincen                       # key from src/_data/regulators.yml
  date: '2026-10-13'                      # date the document was signed or issued
  action: penalty                         # penalty | settlement | restriction | licence_revoked | cease_and_desist | order_no_penalty
  monetary: true
  amount: {value: 1200000000, currency: USD}
  amount_payable: {value: 450000000, currency: USD}   # only when the document credits another penalty
  usd: 1200000000                         # computed by script, never typed (section 6)
  failures: [sar, correspondent_cdd, aml_programme]   # taxonomy, section 5.1
  position: admitted                      # admitted | neither_admit_nor_deny | contested | not_stated
  conduct_period: {from: '2018-01', to: '2025-07'}
  document:
    title: Consent Order Imposing Civil Money Penalty
    type: consent_order                   # consent_order | assessment | final_notice | settlement_notice | press_release_only
    number: '2026-03'
    pages: null                           # filled by the Action (section 8)
    url: https://www.fincen.gov/system/files/2026-10/BoA-Consent-Order-Execution-Final.pdf
    archive_url: null                     # filled by the Action
    archived: null                        # filled by the Action
    sha256: null                          # filled by the Action
  findings:                               # what the regulator found; each with a pin cite
  - text: Missed or late suspicious activity reports on over $5 billion of activity.
    pin: '¶ 12'
    excerpt: null                         # verbatim only for US federal documents; otherwise empty or under 15 words
    level: order                          # order | press_notice | media
  earlier: []                             # earlier actions the document itself refers to
  repeat: false                           # computed: true only when the document refers to an earlier action on the same failure
  ranking_keys: [aml, aml/banks]          # computed from failures (5.1); an override needs a note
  news: /news/aml-fines-q3-2026-bank-of-america-ubs-fca/
  verified: {date: null, by: andrii-klymenko}
  corrections: []                         # {date, change}, newest first, shown on the entry
```

### 5.1 Failure taxonomy

An action can carry several failures. A failure is recorded only when the document states it.

| Key | Label on the page | Ranking it links to |
|---|---|---|
| `aml_programme` | AML programme and governance | `aml` |
| `risk_assessment` | Risk assessment | `aml` |
| `cdd` | Customer due diligence and KYC | `kyc`, `identity-verification` |
| `edd` | Enhanced due diligence (high-risk, PEP) | `aml` |
| `correspondent_cdd` | Correspondent and nested account due diligence | `aml/banks` |
| `kyb_ubo` | Business customers and beneficial owners | `kyb` |
| `monitoring` | Transaction monitoring | `aml` |
| `sar` | Suspicious activity reporting | `aml` |
| `sanctions` | Sanctions screening | `aml` |
| `travel_rule` | Travel Rule | `travel-rule` |
| `crypto_controls` | Crypto-specific controls (wallet screening, mixers) | `crypto` |
| `records` | Record keeping and reporting other than SARs | none |
| `remediation` | Failure to fix earlier findings | none |

### 5.2 Regulators file

`src/_data/regulators.yml`: key, name, region, list URL, tracked since, readable status, how documents are cited (Bluebook / OSCOLA pattern).

## 6. Amounts

- `amount` is the figure in the document, in its currency. Nothing is rounded in the data.
- `usd` is computed by a script: USD amounts as is; EUR and GBP converted at the ECB reference rate on the action date (GBP through the EUR cross rates), as in Budget KYC. The rate and its date are stored by the script and shown on hover.
- When a document credits another regulator's penalty (Bank of America: FinCEN $1.2bn with the OCC's $750M credited), the case total counts the conduct once. Sums in headline figures are case totals, never the sum of the rows.
- Non-monetary actions have no amount and are counted separately ("9 non-monetary actions").

## 7. How primary sources are shown

No "Sources" column and no inline text links. The document is the evidence, shown as a document.

1. **Document header** on every entry: issuer, document type, number, date signed, page count, the firm's position. Example: `FinCEN · Consent Order · No. 2026-03 · 13 Oct 2026 · {pages} pp · admitted`.
2. **Findings with pin cites.** Each finding is one sentence with `¶` or page. Opening the pin shows the passage inside the row. Verbatim excerpts only from US federal documents (public domain); for UK and EU documents a paraphrase, or an excerpt under 15 words.
3. **Document trail.** Other actions in the same case and earlier actions the document refers to, in date order. "Repeat finding" appears only when the document itself refers to the earlier action on the same failure.
4. **Source level per finding**: Order, Regulator notice, or Media. When the order is not published: "Order not published. Findings from the {regulator} press notice."
5. **Durability.** Archived copy and date, SHA-256 of the file, "Checked against the order on {date}". If the original link stops working, the entry points to the archived copy and says so.
6. **Cite this.** A stable anchor per entry (`/aml-fines/#fincen-2026-03`) and two ready citations: our entry, and the order itself (Bluebook for US documents, OSCOLA for UK).

Pin cites and findings are written by hand during verification and never guessed. An entry without the document open is not published.

## 8. Automation (GitHub Actions)

- `scripts/enforcement/fetch.mjs`: for each `document.url`, download the file, store `sha256` and `pages`, request a Wayback snapshot, store `archive_url` and `archived`. Runs on a PR that changes `enforcement.yml` and weekly.
- Weekly link check: a dead original sets `link_status: archived_only`; the page then points to the archive and says so. Report-only; never fails the build.
- `scripts/enforcement/usd.mjs`: computes `usd` and stores the ECB rate used.
- CI check (`scripts/checks/enforcement.mjs` in `npm run check`): required fields, known taxonomy keys, `usd` not typed by hand, every finding has `pin` and `level`, no excerpt over 15 words for non-US documents, ranking keys match the taxonomy unless a note explains the override.

## 9. Headline figures

Computed from the data at build time, never typed. Each is a sentence with its period and count, so it stays true when quoted alone. Candidates:

- Number of actions and cases in the period, and how many were against non-banks.
- Total penalties in USD (case totals), all firms and non-banks.
- Share of actions citing each failure ("Transaction monitoring was cited in X of Y actions in 2026").
- Share of repeat findings.
- Largest action in the period.

The quick answer uses one of them. The yearly report pages (`/aml-fines/2026/`) hold the full set for that year and are the material for distribution.

## 10. Page outline

1. H1 (section 1), quick answer (category rules: up to 60 words, first sentence stands alone).
2. Headline figures as sentences (no stat tiles).
3. "Recent actions": the newest entries.
4. The full table: date, firm, firm type, regulator, action, amount (USD and original), failures, repeat marker. Each row expands into the document view (section 7). Filters: regulator, firm type, failure, year, monetary or not. The full list is in static HTML; filters only narrow it with JS.
5. "What failed, and what to check in a vendor": one short block per failure type, built from the findings, with a link to the matching ranking.
6. "Why fintechs get fined": the topic section, written only from findings in the data.
7. FAQ (recent AML fines, BSA penalties, OFAC penalties, AML fines in 2026), inclusion rules, regulators we track, corrections policy, CSV and JSON download, changelog.

Look: the register style of `/incidents/`. Design canvas before any build. JSON-LD: `Dataset` (with `distribution` for CSV and JSON) and `FAQPage`.

Keyword map (Ahrefs, US, 26 Nov 2026): fintech money laundering 150 → topic and quick answer; bsa violation penalties 50 and ofac penalties 40 → FAQ and filter; recent aml fines 40 → "Recent actions"; aml fines 2026 20 → yearly figures; brand fine queries → rows (news items from USD 5M link to the row).

## 11. News pipeline

- Rule `enforcement` in `scripts/news/sources.yml` routes small fines to `digest`, which was never built. New route `tracker`: the drafting task writes the entry (section 5, findings and pins included) from the document and opens a PR; the owner merges.
- From USD 5M, the task also writes a news item as now, and the news item links to the entry.
- Sources to add to the collector: FinCEN enforcement list, NYDFS press releases, OCC monthly releases, Central Bank of Ireland press releases.

## 12. Corrections

Same as the incident tracker: a firm or regulator can ask for a correction by email (prefilled link per entry); accepted corrections are shown on the entry with a date. No response deadline is promised.

## 13. Open questions for the owner

1. Actions against individuals (e.g. an MLRO fined by the FCA): in, as a separate firm type `individual`, or out?
2. Criminal resolutions by the DOJ (plea agreements, deferred prosecution) that run alongside a listed regulator's action: in as part of the case, or out?
3. Add FINRA, FDIC, HMRC, CSSF and ACPR to the launch set?
4. Licence for the CSV and JSON (e.g. CC BY 4.0, which asks re-users to credit BeVerified)?
5. Summary cadence: quarterly news item plus the yearly report, or yearly only?

## 14. Phases (one PR each)

1. This specification.
2. Data and scripts: `regulators.yml`, `enforcement.yml` for 2026, the fetch, USD and check scripts; then 2025. Each entry verified against its document; a log per batch in `reports/verification/`.
3. Design canvas for the page and the document view.
4. Page build, CSV and JSON, JSON-LD.
5. Pipeline route `tracker`.
6. First yearly report (`/aml-fines/2025/`) and the 2026 report in January 2027.
