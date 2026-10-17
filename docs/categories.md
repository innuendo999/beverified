# Category pages — `beverified/providers/<slug>/index.html`

## Purpose

Each category page is a "best X in 2026" ranked buyer's guide for one use-case or region — the pages people land on from search or from the homepage's "Browse by use case" / "Browse by region" grids. There are **14 category pages**, all built from one shared template.

## Shared template structure (in document order)

1. **Skip link + site header** — identical to every other page on the site (brand, mobile nav toggle, primary nav, "List Your Product").
2. **Breadcrumb** (`<nav aria-label="Breadcrumb"><ol>`) — Home → the category's own name, `aria-current="page"` on the current crumb.
3. **H1 + quick-answer callout** — one `<h1>` ("Best X Providers in 2026"), followed by a `.callout` box giving a 2–3 sentence "quick answer" naming the top 1–3 picks by name and why, so a skimming reader gets the verdict before scrolling.
4. **Byline + stat row** — reviewer credit/last-verified date alongside "N providers compared / 40+ countries covered / last updated" stats.
5. **Comparison table** (`#compare-table`) — a single `<table class="compare-table">` with a `<caption class="visually-hidden">`, real `<th scope="col">` headers (#, Provider, Rating, Price, Best for, Link), and one `<tr>` per ranked provider. Every row carries `data-rank`, `data-name`, `data-rating`, `data-price`, `data-region`, `data-size` attributes — plain, real, sortable/filterable data already present in the static HTML (not injected by JS). Rows for providers without a dedicated review page yet render `<span class="text-muted">In progress</span>` instead of a dead or fabricated link.
6. **Filter controls** (`data-category-filter` wrapper) — real `<fieldset><legend>` + `<label for>` checkbox/radio controls for region and company size, progressively enhanced by `assets/js/site.js` to filter the comparison table and the provider list below it client-side. With JS disabled, every provider is simply listed in full — filtering is an enhancement, not a requirement to see content.
7. **Ranked provider list** (`<ol class="provider-list" data-provider-list>`) — one `<li><article id="rank-N" class="provider-article" data-rank data-name data-rating data-price data-region data-size>` per provider, each with its own mini pros/cons, coverage/size tags, price, and a link to its full review (or "In progress" span). This is the actual content body of the page; the table above is a compact index into it.
8. **FAQ** (`#faq`) — native `<details class="faq-item"><summary>` accordion, 5–6 category-specific questions (e.g., "What is AML software?", "Is AML software legally required?"), zero-JS accessible by default.
9. **CTA banner + footer** — same site-wide CTA banner and four-column footer as every other page.

## Data sources

Every category page's provider list, ratings, and FAQ content came directly from that category's own DesignSync source (`Category Page - <Name> (Desktop).dc.html`), cross-referenced against the master `providers` array in the Reviews Directory source so a provider's rating/price/best-for label is consistent whether it's read on its category page, the homepage top-3 preview, or its own review page.

## Semantic HTML & ARIA decisions

- One `<h1>` per page; comparison table and FAQ use real `<table>`/`<details>` elements rather than div-soup grids, so screen readers and text browsers get the data for free.
- The compare table's link column has a `<span class="visually-hidden">Link</span>` header so the column isn't announced as blank to assistive tech.
- Filter controls use `<fieldset>`/`<legend>` grouping and `<label for>` association — never a bare `<div>` with a click handler.
- "In progress" placeholders for not-yet-reviewed top-10 slots are plain text, not disabled buttons or dead links, so they don't create a false affordance.

## Schema.org JSON-LD

Each category page emits one `@graph` with:
- **`BreadcrumbList`** — Home → category.
- **`ItemList`** — one `ListItem` per ranked provider, `item` typed as `SoftwareApplication` with `aggregateRating` and (where a real price is known) an `Offer`. Providers without a dedicated review page are still included in the `ItemList` (for ranking completeness) but omit the `url` field rather than link to a page that doesn't exist.
- **`FAQPage`** — mirrors the on-page FAQ `<details>` content exactly, so there's no schema/content drift.

Canonical domain: `https://beverified.org/`.

## The 14 category instances

| Category | Path | Providers compared | Unique input |
|---|---|---|---|
| Best AML Software Providers | `/providers/aml/` | 10 | Anti-money laundering / transaction monitoring; canonical template reference implementation |
| Best KYB Solution Providers | `/providers/kyb/` | 7 | Know-Your-Business / beneficial-ownership verification |
| Best eKYC Solution Providers | `/providers/e-kyc/` | 4 | Digital identity verification for onboarding |
| Top Identity Verification Companies | `/providers/identity-verification/` | 4 | Document & biometric identity checks |
| Top Crypto KYC Providers | `/providers/crypto/` | 5 | Compliance for exchanges & wallets |
| Liveness Detection Providers | `/providers/liveness-detection/` | 4 | Anti-spoofing facial verification |
| Cheap KYC Providers | `/providers/cheap-kyc/` | 4 | Budget-friendly verification for startups |
| Crypto Travel Rule Providers | `/providers/travel-rule/` | 4 | FATF-compliant crypto transfer data sharing |
| AML for Banks | `/providers/aml/banks/` | 4 | Enterprise screening for financial institutions (nested one level under `/providers/aml/`) |
| KYC Providers in Brazil | `/providers/brazil/` | 4 | Region: Brazilian fintechs |
| KYC Providers in Canada | `/providers/canada/` | 4 | Region: Canadian regulated industries |
| KYC Providers in India | `/providers/india/` | 4 | Region: India |
| KYC Providers in Mexico | `/providers/mexico/` | 4 | Region: Mexican market |
| KYC Providers in Peru | `/providers/peru/` | 4 | Region: Peru |

## Progressive enhancement

The full ranked list, every provider's rating/price/pros-cons, and the FAQ are all present in server-rendered HTML. `assets/js/site.js` adds client-side filtering (by region/company size) and sorting on top of the `data-*` attributes already in the markup — disabling JS never hides a provider, it only disables the interactive narrowing of an already-complete list.
