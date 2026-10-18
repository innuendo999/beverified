# Provider fact re-check (verification spec)

Goal: every fact on a review page is checked against a source on the check date, labelled with its evidence level, and anything we cannot confirm is removed or marked "Not publicly disclosed". Only then does `last_verified` move.

One record = `src/_data/providers/<slug>.yml` (field list: `docs/data-schema.md`). Validate with `node scripts/checks/provider.mjs <slug>`.

## Do not change

`slug`, `name`, `score`, `grade`, `logo`, `link.type`, `alternatives`, `author`, `legacy_*` fields other than `legacy_editorial_note`, and `src/_data/rankings.yml` (report ranking-card problems instead, see below). Never invent a number, date, customer, certificate or quote.

## What to check, in this order

1. **Company**: still operating, current legal/brand name, owner (acquisitions, mergers, rebrands up to Oct 2026), HQ, founding year. Sources: company about/press page, official registry, reputable news. Crunchbase/LinkedIn only as a last resort (evidence `user`? no: treat as third party, `independent` only if it is a registry or regulator).
2. **Pricing**: the vendor's pricing page today. Record what is published (plans, per-check price, minimums, trial). If nothing is published, say so: "Pricing is not published; [vendor] quotes on request." Third-party figures (Vendr, G2 pricing, marketplace listings such as AWS) only with a source, as `kind: third_party`.
3. **Certifications and tests**: ISO/IEC 27001, SOC 2, ISO/IEC 30107-3 (iBeta/BixeLab letters), UK DIATF register, eIDAS/ETSI, PCI, etc.
   - `confirmed`: you opened the certificate, the certification body's register, the lab's published letter or a government register entry.
   - `vendor_stated`: only the vendor's own site/trust centre says so.
   - `not_found`: the old page claimed it and you found nothing. Keep it listed as not_found only if the old page claimed it; otherwise drop.
4. **Features and coverage claims** in `features`, `what_is`, `verdict`, `tagline`, `pros`, `cons`, `faq`, `choose_instead[].text`, `seo.description`: each specific claim (counts like "200+ document types", "14,000 ID types", "220 countries", products, integrations) must match the vendor's current pages. Correct it, cite it, or rewrite the sentence without the number. Keep the rest of the wording; this is a fact pass, not a rewrite. Keep pros 3 and cons 3.
5. **User reviews**: `user_reviews` themes with counts like "roughly 4 of 10 reviews" are unverified. If you can open the G2/Capterra/Trustpilot page, fill `user_ratings[]` `{platform, rating, count, checked: '2026-10', url}` and keep themes you can see; otherwise remove the counts from the theme sentences (keep the theme only if it is a fair, general statement) and set `user_reviews.legacy_note` to null.
6. **Link**: `link.url` resolves to the vendor's current site.

## How to write it

- `sources`: `[{title, publisher, url, accessed: '2026-10'}]`, numbered by position (first = 1). Every field below that cites a source uses that number.
- `facts`: `[{label, value, source: <n>, evidence: vendor | independent | user}]`. Unknown value = `Not publicly disclosed` with no source.
- `pricing`: `summary` (plain sentence), `plans` (only published tiers), `items: [{label, value, kind: official | third_party, source: <n>, verified: '2026-10'}]`, `verified: '2026-10'`. `legacy_verified_note: null`.
- `certifications`: `[{name, what, status, source: <n>}]` (`what` = few words, e.g. "Information security").
- No em dashes or en dashes in any string. Plain, neutral voice.
- When done: `last_verified: '2026-10-18'`, `updated: '2026-10-18'`, `legacy_editorial_note: null`. Add `verification_notes: [..]` (internal, not rendered) listing anything left unconfirmed.

## Report file

Write `reports/verification/<slug>.md`:
- **Changed**: bullet list of corrected facts (old → new, source).
- **Removed / unverifiable**: claims dropped.
- **Ranking cards**: for each entry of this provider in `src/_data/rankings.yml` (search by `slug: <slug>`), list any tagline/pros/cons/`legacy_price_shown`/`coverage` statement that is now wrong, with the corrected text.
- **Score flag**: only if a finding plausibly changes the editorial score (shut down, acquired and product retired, pricing removed, certificate lapsed). Do not change the score.
