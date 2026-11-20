# KYC Certification Tracker

Status: data (PR #168), certification re-check (PR #169 to #171) and the page are built. Watcher not built yet. Planning doc (Ukrainian, owner decisions): Docs "BeVerified: реєстр незалежних перевірок і watcher, специфікація" (https://claude.ai/artifact/QSk3ga8ZJVYAjSFpGztJc5).

## What it is

A public page listing independent test results and certifications of the providers we review: iBeta ISO/IEC 30107-3 letters, the UK DVS register (DIATF), FIDO Face Verification and DocAuth, DHS RIVR, the ACCS registry, ISO/IEC 27001 and SOC 2. Every cell has a status, a link to the primary source and a date. No scores, no outbound commercial links.

Owner decisions (2026-11-20):
- Name: **KYC Certification Tracker**. URL `/kyc-certification-tracker/`, H1 "KYC Certification Tracker", menu item "Certifications" next to "Incidents".
- **KYC only:** a provider is listed when its `categories` include identity-verification, e-kyc, liveness-detection, cheap-kyc, age-verification or kyc, or it holds a confirmed identity check (iBeta, UK DVS, FIDO, RIVR, ACCS). Rule in `isListed()` in `src/_lib/cert-tracker.js`.
- Search box "Find a provider" filters the table rows only (not site search); placeholder names no provider. No source link per certificate; sources ship in the download. Rows A to Z.
- Only reviewed providers are listed (no rows for `tracked.yml` vendors).
- Data download (CSV and JSON) under CC BY 4.0.
- Daily scheduled deploy.
- PRs come through a state branch, as in the news pipeline (option B below).
- One plain email to each provider with at least one confirmed row, 1 to 2 weeks after launch, no follow-ups, same text for partners.

## What counts as confirmed

The provider or its legal entity is named on the issuer's register or in the issuer's letter. A press release, the vendor's own page or a letter held by an SDK supplier counts as `vendor_stated`. A RIVR alias counts only when the vendor disclosed it.

## Data

- `certifications[].program` and `level` in every provider record (`docs/data-schema.md`). Added by `scripts/cert-watch/add-program-fields.py` on 2026-11-20 (193 entries). Names, statuses and sources were not changed, so the build output is byte-identical.
- `src/_data/certWatch.yml`: source URLs and the names each provider has on each register (Sumsub appears on iBeta's list as Raritex Trade).
- Still to add from the registers on the watcher's first run, never parsed from free text: `product`, `issued`, `valid_to`, `register_name`, `confirmed` (date the owner merged it).

## Watcher (planned, PR 2)

Daily GitHub Action, writes snapshots and a report to the `cert-watch` branch only (no deploy). A scheduled Claude task reads the report on weekdays, opens the letters, checks that they name the provider, and opens one PR with full CI. The owner merges.

| Event | Action |
|---|---|
| New row for a provider in `certWatch.yml` | PR proposes a `confirmed` entry |
| Row removed from a register | PR flags it; status is not changed automatically |
| Expiry date changed or passed (DVS, FIDO, ACCS) | PR with the new date or an "expired" note |
| `valid_to` within 60 days | reminder line in the report |
| Vendor not in `certWatch.yml` | ignored |
| Source unreadable or its structure changed | run summary shows the failure; that source's "checked" date is not moved |

The watcher never changes scores, statuses or `last_verified`, and never merges. A confirmed change that may move a score is flagged; the re-score is a separate PR with the matching `rescore-*.mjs`.

The page shows two dates: "Sources checked {last successful watcher run}" for the page, and "Confirmed {date}" per row.

## Findings while building PR 1

- iBeta lists an Entrust Level 2 letter dated 4 Nov 2026 for "Facial Similarity Report: Motion". The Onfido record has the Motion letter at Level 1 (Jul 2026) only. Needs a record re-check (separate PR).
- `independent_tests.rivr` stays where it is; the page will read both it and `certifications[]`.

## Page (built 2026-11-20)

- Columns: Liveness (ISO/IEC 30107-3), UK DVS register, FIDO IDV, DHS RIVR, ACCS, ISO/IEC 27001, SOC 2. The liveness column reads `ibeta_pad` and `pad_other`: an iBeta letter shows its level ("iBeta L3"), another lab's confirmed result shows "Confirmed" (IDnow, LSTI). The "iBeta letter" filter needs an iBeta letter. (The design said "iBeta liveness"; renamed so a non-iBeta PAD claim is not shown as "None".)
- Cell states: confirmed (green check), stated by vendor, in progress (name contains "progress"), not found, none (no claim).
- "Checked {date} against ..." comes from `certTracker.yml` `checked` and `sources[]`; a source with its own `checked` date is listed separately (DHS RIVR, 17 Nov 2026, because mdtf.org was not readable on 20 Nov).
- "Recent changes" are hand-entered in `certTracker.yml`, each one already in a provider record with its source. The watcher will add them later.
- Downloads: `/kyc-certification-tracker/certifications.csv` and `.json`, one line per certification entry with source title and URL.
- JSON-LD: CollectionPage with ItemList of providers, Dataset with the two downloads, BreadcrumbList.
