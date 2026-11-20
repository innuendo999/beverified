# KYC cost calculator

Owner approved the canvas "BeVerified: KYC Pricing Index with cost calculator, design" on 2026-11-20.

## Where it lives

- KYC Pricing Index `/publications/kyc-pricing-index/`: in the hero, right under the title, lede and byline (front matter `calculator: true`, include in `src/_layouts/article.njk`). The article body has a "How the calculator works" section; the anchor `#how-the-calculator-works` is linked from the calculator.
- `/providers/kyc/`: compact block "What would this cost you?" after the rank table. Cheapest three of that ranking's providers with full prices, one volume input, link to the Pricing Index calculator.
- Embed `/publications/kyc-pricing-index/embed/`: noindex, canonical to the Pricing Index, links open in a new tab. The embed code shown in the article carries a visible link "KYC Pricing Index by BeVerified" under the iframe.
- Downloads: `calculator-prices.csv` (one line per plan) and `calculator-prices.json`, CC BY 4.0.
- `/llms.txt`: one line under "Data sets".

## Data

`src/_data/costCalc.js`, from provider records only. Nothing is typed into a template.

- Priced: published KYC providers (categories in `KYC_CATS`) with `budget.options`. Same figures and rules as the Budget KYC calculator (`calcProvider` in `src/_lib/budget.js`): the cheapest plan for the volume and options; a minimum is a floor when `covers_checks` is set (true or `estimator`), otherwise added on top; above `quote_above` the provider is "not priced".
- Drops out when `budget.checked` is older than 90 days ("Price re-check due").
- Partial prices: no `budget{}`, but an official `pricing.items` entry with a money value; the first such item is shown.
- Price on request: everything else.
- Sort order is the monthly cost, never the ranking. Sponsorship does not change inclusion or order.

## Adding a provider

Add a `budget{}` block to its record (see `docs/data-schema.md`) with the source and `checked` date. It appears in the calculator, downloads and llms.txt on the next build.
