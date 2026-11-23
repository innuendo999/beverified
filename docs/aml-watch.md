# AML watch

AML 1.0 data upkeep (owner approved the automation plan in `docs/scoring-aml.md`, 2026-11-23). Keeps the AML ranking's record fields current without opening every vendor page by hand. It finds; a person decides.

## What it does

`scripts/aml-watch/watch.mjs`, run daily by `.github/workflows/aml-watch.yml` (06:13 UTC), writes only to branch `aml-watch-state`, folder `aml-watch/`:

1. For every provider in the `aml` ranking, collects the pages its record cites for AML 1.0 fields (`source` and every `*_source`), plus extra pages listed in `src/_data/amlWatch.yml`.
2. Reads each page (fetch, then curl), strips scripts and markup, and looks for:
   - the four core lists: OFAC, EU, UK (HMT, OFSI, UK Sanctions List, FCDO), UN;
   - stated update times ("every 5 minutes", "within minutes", "updated daily");
   - feature terms per field: data source, fuzzy matching, transliteration, secondary identifiers, whitelisting, calibration, alert reports, validation, transfer screening, webhooks, four-eyes, monitoring trigger.
3. Report `latest.md` (and `history/<date>.md`):
   - **Record claims the cited page no longer supports**: the record cites the page for a list or a feature that is no longer on it. This is the line that matters.
   - **Candidates**: a term found on a watched page where the record says `not_disclosed` or `no`, with the passage. A term is never a point: the feature counts only when the page states it plainly.
   - **Changes since the last run**: lists, terms or update times added or removed on a page.
   - **Pages we could not read**: errors and pages under 500 characters of text (rendered by script). Check these by hand.

It never edits a record, a score or a date.

## Who acts on it

A weekly Claude task (to be set up by the owner, like the price watch task) reads `aml-watch/latest.md`, opens each page in the report, confirms the passage, and opens one PR that updates the record through `scripts/set-capabilities.py` with a batch file in `scripts/aml-data/`, dated `checked` fields and new `sources[]`. Scores are re-run with `scripts/rescore-aml.mjs`; a rank change is reported to the owner, never merged by the task.

## Known limits

- Term matching is broad on purpose: "threshold" or "report" appear on many pages for other reasons, so candidates need reading.
- Marketing pages change wording often; a claim can drop off one page and live on another. Before removing a field, look for it in the vendor's docs.
- Script-rendered help centres show up under "could not read".

## Test

`node scripts/aml-watch/watch.mjs --state <dir> --fixtures <dir> --now 2026-11-24T06:00:00Z` reads `<dir>/<page id>.html` instead of the network. Page id = provider slug + "-" + the first 6 hex characters of sha1(url); a run without fixtures lists every id under "could not read".
