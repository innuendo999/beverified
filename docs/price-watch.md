# Price watch

Calculator PR 3 (owner, 2026-11-20 plan; built 2026-11-23). Keeps the prices behind the KYC cost calculator, the KYC Pricing Index and the provider finder current without anyone opening 30 pricing pages by hand.

## What it does

`scripts/price-watch/watch.mjs`, run daily by `.github/workflows/price-watch.yml` (05:37 UTC), writes only to branch `price-watch`, folder `price-watch/`:

1. Collects every vendor page that a published record cites for an `official` pricing item with a money value (32 pages on 23 Nov 2026).
2. Reads each page (fetch, then curl), turns it into text and lists the money figures on it ($, €, £, USD, EUR, GBP, CHF).
3. Report `latest.md` (and `history/<date>.md`):
   - **Record figures not found on the page**: a price in our record that the page no longer shows. This is the line that matters.
   - **Money figures that changed since the last run**: figures added or removed on a page.
   - **Pages we could not read**: errors, and pages under 500 characters of text or with no money figures (rendered by script). Check these by hand.
   - **Calculator prices due for a re-check**: `budget.checked` 75 days old or more (the calculator drops a provider at 90).

It never edits a record, a price or a date.

## Who acts on it

A scheduled Claude task reads `price-watch/latest.md` every Monday. For each mismatch it opens the vendor page, confirms the change, and opens one PR that updates `pricing.items`, `budget{}` if the provider is in the calculator (with `budget.checked`), and a dated `verification_notes` line. Scores are re-run with the rescore scripts; a score change is reported to the owner, never merged by the task. `last_verified` is not touched (that is the full fact re-check).

## Known limits

- Pages rendered by script (LedgerBrain) or that refuse bots (travel-rule.com) show up under "could not read" every day.
- A figure on the page is matched as a number with its currency, not with its label: a price moved to another plan still "matches". The weekly task reads the page itself before changing a record.

## Test

`node scripts/price-watch/watch.mjs --state <dir> --fixtures <dir> --now 2026-11-24T05:00:00Z` reads `<dir>/<page id>.html` instead of the network (page id = the first provider slug citing the page, plus a short hash when one provider cites several pages).
