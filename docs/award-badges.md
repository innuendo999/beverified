# Award badges

Owner decisions, 23 Nov 2026 (canvas "BeVerified: award badges for providers, design and rules", https://claude.ai/artifact/698aPatEs52r7FUTtAjFmg):

- Badges only for **Editor's Choice (rank 1) and the awards of ranks 2 and 3** in each ranking (`rankings.yml`). Editor's Choice anywhere but rank 1 is held back.
- Every "Best for" award must rest on a fact in the provider record or its ranking entry; checked before launch (`reports/awards-check-2026-11.md`).
- Rules and the embed picker live on **/about/#awards** (no separate page). `/about/#<slug>` preselects the provider.
- Vendors are told in a **separate email** after launch (not in the 1 Dec tracker emails).
- Awards and badges are never sold (sentence in `site.json` `v3.adPolicy`).
- Review pages: an awards block under the score card on desktop is proposed on the canvas (artboard ReviewHero), not built yet.

## How it works

- `src/_lib/awards.js` → `currentAwards()`: the live awards from `rankings.yml` (published providers, top 3, Editor's Choice at rank 1, minus `site.json` `v3.awards.exclude`).
- `src/_data/awardsIssued.json`: every award ever issued (`ranking/slug`). `node scripts/awards-register.mjs` adds new ones and never removes; `scripts/checks/awards.mjs` (in `npm run check`) fails when a live award is not registered.
- `src/_data/awards.js` + `src/badges/badges.njk`: one SVG per issued award, size and theme at `/badges/<ranking>/<slug>-<size>-<theme>.svg` (sizes card 300x130, square 200x200, small 120x120, banner 468x60, compact; themes light, dark) plus `/badges/<ranking>/<slug>.svg` (card, light). Drawn by `src/_lib/badge-svg.js` with system fonts (an `<img>` on another site cannot load our webfont).
- An issued award that is no longer live (ranking change, exclude list, or after `v3.awards.until`) keeps its URLs and renders "Reviewed on BeVerified". The daily scheduled deploy flips them on 1 January.
- Embed code: a link to the ranking page around the image, brand alt text, width only (height follows the image).

## New year

Before 1 January: re-check the rankings, set `v3.awards.year` and `until` to the new year. Badges of the old year switch to "Reviewed on BeVerified" on their own until then.
