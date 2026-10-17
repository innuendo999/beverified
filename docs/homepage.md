# Homepage — `beverified/index.html`

## Purpose

The homepage is the site's single entry point for two parallel browse paths — **by use case** (AML, KYB, eKYC, etc.) and **by region** (Brazil, Canada, India, Mexico, Peru) — plus a top-rated providers strip and a methodology/trust preview. It is the canonical `/` and `https://beverified.org/` URL.

## Content sections (in document order)

1. **Skip link** — `<a class="skip-link" href="#main">` as the first focusable element, landing on `<main id="main">`.
2. **Site header** (`<header class="site-header">`) — logo/home link, a `<button data-nav-toggle>` that drives the mobile nav (progressively enhanced by `assets/js/site.js`), primary nav (`<nav aria-label="Primary">`), and a "List Your Product" mailto CTA.
3. **Hero** (`<section class="hero">`) — `<h1>`, one-line value prop, a `<form role="search" action="/providers/">` that GETs to the Reviews Directory with a `q` param (works with JS disabled), and three "Try:" quick-fill chips (`data-chip-fill`) that populate the search input via `site.js`.
4. **Stat bar** — three headline numbers (providers reviewed / countries covered / last updated) plus a link to `/methodology/`.
5. **Browse by use case** (`#use-case`) — a 3-column card grid of the 9 top-level use-case categories (AML, KYB, eKYC, Identity Verification, Crypto KYC, Liveness Detection, Cheap KYC, Travel Rule, AML for Banks). Each `entity-card` links to its category page and lists that category's top 3 providers as a static preview. Cards carry `data-home-card`, `data-home-group="use-case"`, `data-name`, `data-desc` — the hooks `site.js` uses for the homepage's client-side search filter (typing in the hero search box filters both grids live; the `data-home-empty` paragraph shows when a group has zero matches). All of this is inert, fully-linked HTML without JS.
6. **Browse by region** (`#region`) — same card pattern for the 5 regions with full pages (Brazil, Canada, India, Mexico, Peru) plus a "See all regions" card pointing at `/providers/`.
7. **Top overall rated providers** (`#reviews`) — a horizontal strip (`provider-strip`) of the 8 highest-rated reviewed providers, each a `provider-mini` card (logo initial, name, star rating, "Read Review →") linking straight to its review page.
8. **Methodology preview** — a short paragraph plus three `badge-pill`s (Manually tested / Sponsorships disclosed / Re-verified quarterly) and a link to `/methodology/`.
9. **CTA banner** — "Get your product listed", linking to a `mailto:` and to `/placement-options/`.
10. **Footer** — the same four-column link footer (by use case / overflow use-case items / by region / trust) reused verbatim across every page on the site, plus the affiliate disclosure paragraph (`id="how-we-make-money"`).

## Data sources

All copy and stats (provider counts, ratings, top-3-per-category lists) were ported directly from the DesignSync source `Homepage - BeVerified (Desktop).dc.html`, which itself pulled from the same master `providers` array used to build the Reviews Directory — so the top-3 previews here and the full rankings on each category page are the same underlying data, just truncated.

## Semantic HTML & ARIA decisions

- Single `<h1>` (the hero headline); every section below it uses `<h2>` via `section-title`, keeping one clean heading level per section (`#use-case-heading`, `#region-heading`, `#top-rated-heading`, `#methodology-heading`, `#cta-heading`), each referenced by the section's `aria-labelledby`.
- The mobile nav toggle button has `aria-expanded` (kept in sync by `site.js`) and `aria-controls="primary-nav"`.
- The search input has a visually-hidden `<label>` rather than relying on a placeholder alone.
- Decorative elements (star glyphs, colored logo-initial squares, the brand mark) are `aria-hidden="true"`, with the real information (e.g., "Rating: 4.8/5") carried in adjacent visually-hidden text or plain text nodes.
- Card grids use `<a class="entity-card">`/`<a class="provider-mini">` as single link wrappers rather than nesting interactive elements, so each card is one tab stop with a clear accessible name (the card's own text content).

## Schema.org JSON-LD

A single `@graph` combining:
- **`Organization`** (`@id`: `.../#organization`) — name, url, logo, contact email.
- **`WebSite`** (`@id`: `.../#website`) — includes a `SearchAction` (`potentialAction`) pointed at `/providers/?q={search_term_string}`, matching the hero search form's actual `action`/`method`/`name` so the schema describes real, working site search rather than an aspirational one.
- **`ItemList`** of the 9 use-case categories (name + url), giving search engines a structured map of the site's primary taxonomy without duplicating the full provider-level detail that lives on each category page's own `ItemList`.

Canonical domain used throughout: `https://beverified.org/`.

## Progressive enhancement

Everything above — search, category browsing, provider links — is fully functional as plain server-rendered HTML with JavaScript disabled. `assets/js/site.js` only adds: live client-side filtering of the two homepage card grids as the visitor types in the search box, chip click-to-fill, and the mobile nav open/close toggle. No content is JS-only.
