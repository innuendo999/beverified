# Provider finder (bottom-right widget)

Owner approved the canvas "BeVerified: Provider finder widget, logic and design" (https://claude.ai/artifact/B41J4XQcYzVXBYEkScqrdN) on 2026-11-23, including the closed launcher with the MRZ line.

## What it does

Three questions, one tap each, then up to three matches from our rankings:

1. What do you need to check (`site.json` → `v3.finder.needs`), or "Or start from your business" (`v3.finder.biz`).
2. Where are your customers (home.yml regions; the ones with a country ranking are bold).
3. How to treat price: any, only public prices, or "Estimate my monthly cost" (only for `v3.finder.costLists`, figures from the KYC cost calculator, `src/_data/costCalc.js`).

Rules:
- Order is the ranking's order. Filters only remove providers. The number shown (#) is the provider's place in that ranking.
- Country rankings cover identity checks only. For an identity need, providers that are also in the country ranking come first (tag "In our X ranking"), then the rest of the category ranking, and the panel says how many are in the country ranking. For AML, KYB, Travel Rule and KYA the panel says the country ranking covers identity checks only. For a country without a ranking it says so. We never claim a provider supports a country.
- A review page prefills that provider's ranking (primary category, else its first category ranking) and leaves the provider out: launcher "Alternatives to {name}".
- A ranking page prefills its category; a country page prefills the country.
- "Visit website" only where the rankings.yml entry has `site_link: true` (the listing-link rule), rel from the provider record. The commission sentence shows only when a shown link is affiliate or paid.
- Answers are kept in localStorage (`bv-finder`). After the first close the launcher stays compact (56 px tile); on phones it is compact while scrolling down.
- GA4 events, only after consent: `finder_open`, `finder_answer`, `finder_results`, `finder_click` (provider, link review or site).

## Where it shows

Every page on the v3 layout except `v3.finder.exclude` (/methodology/, /terms/, /privacy/). Not on the calculator embed page. Hidden while the cookie banner is open and until the reader scrolls past 60% of the first screen (short pages: at once). Shares the corner with Back to top (left of the launcher) and sits above the sticky "Visit site" bar on V4/V5 reviews. Hidden in print.

## Files

- Data: `src/_data/finder.js` → `/assets/finder.json` (`src/finder-json.njk`), loaded on first open.
- Markup and script: `src/_includes/v3/finder.njk`, included in `src/_layouts/v3.njk`.
- Styles: `.fd-*` at the end of `src/assets/css/v3.css`.
- Filter `mrz` in `eleventy.config.js` (launcher MRZ line).

## Not built yet

- PR 2: sponsored match row (`placements.yml` `surface: finder`, one sponsor per category, under the three matches, label "Sponsored", real rank and score, only when the sponsor passes the reader's filters and is not already shown, never on its own review; rules in `placements.js`, CI check, one adPolicy sentence).
- Lead form ("Get quotes"): deferred by the owner on 2026-11-23 (needs a backend, privacy policy change and consent).
