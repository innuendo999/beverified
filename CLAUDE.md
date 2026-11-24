# BeVerified — project map for Claude Code

Independent review and ranking site for KYC, KYB, AML and identity-verification providers. Static site built with Eleventy (11ty) and deployed to GitHub Pages (beverified.org).

Full plan, decisions and prompts: `docs/redesign-plan.md`. Read only the section you need.

## Where things live

All pages are generated from templates + data. There is no hand-written page HTML left.

| To change | Edit |
|---|---|
| Header menu, footer columns, disclosure text, rubric weights, evidence labels | `src/_data/site.json` → `v3` |
| Header / footer / page shell | `src/_includes/v3/header.njk`, `footer.njk`, `src/_layouts/v3.njk` |
| Header mega menu (Rankings, Reviews, Blog panels) and footer columns | picks in `site.json` → `v3.menu` (category keys and `col` 1 to 3 per group, "Most read" slugs, featured article URL); resolved by `src/_data/megaMenu.js` from rankings.yml, category and provider records. Menu v2 (owner, 2026-11-24; canvas "BeVerified: footer, visual proposal", page "Header menu"): compact columns, Rankings preview = ID card (real rank, award, the score the ranking sorts on, MRZ line; `promoHide` providers left out, others keep their real rank), one sponsored slot per panel: Rankings = the ranking slot with `menu: true`, Reviews = `surface: menu-reviews`, Blog = `surface: menu-blog` (article with `sponsored_by`, labelled on the article too, `.art__sponsored`); rules in `src/_lib/placements.js`, checked by `scripts/checks/placements.mjs`. "For providers" = `.btn-prov` (turning gradient outline, still under reduced motion). Open/close script in `src/_layouts/v3.njk`, styles `.mm-*` in v3.css |
| Styles (tokens + components, incl. mobile) | `src/assets/css/v3.css` |
| One provider (score, pricing, facts, pros/cons, FAQ, link, logo) | `src/_data/providers/<slug>.yml` → rendered by `src/reviews.njk` at `/providers/<slug>/` |
| Review sidebar (Price, Independent tests, Watch, Alternatives when the card would have one row) and "Company facts" section | `src/_lib/sidebar.js` builds both from the provider record and `incidents.yml`. No heading, no "Not publicly disclosed" rows, no numbered source refs; only independent evidence gets ◆ (owner, 2026-11-10) |
| Review page V4 (owner, 2026-11-10; canvas "BeVerified: review page V4", board V4b) | on per profile with `v4: true` in `src/_data/reviewProfiles.yml` (Travel Rule only for now); template `src/_includes/v3/review-v4.njk`, data builders `src/_lib/review-v4.js` (hero facts, fit, networks, cards, questions, source groups), computed in `src/reviews.11tydata.js` → `v4`; styles `.rv4-*` at the end of v3.css. Other profiles keep the old review layout |
| Review page V5 on Travel Rule (owner, 2026-11-11; canvas page "V5 proposal") | same template, switched by profile flags in `reviewProfiles.yml` (`fit_check`, `score_section: false`, `diligence: false`, `alts_same_ranking`). Fit check: `src/_includes/v3/fit-check.njk`, data `src/_lib/fit-check.js` + `src/_data/travelRuleFit.yml` (network names, deployment reading). Pricing calculator: `src/_includes/v3/pricing-calc.njk` from record `pricing_calc` (figures read from `pricing.items`); tier cards from `pricing.plans` otherwise. Product by buyer job: record `product_jobs`. Change log: record `changes`. Styles `.fc*`, `.pc*`, `.rv4-tier*`, `.rv4-job*` at the end of v3.css |
| Sponsored placements on reviews (first screen above the score card + card after Alternatives; never on the sponsor's own review; links `data-ad` → always rel="sponsored") | `src/_data/placements.yml` entries with `surface: review`; rules `reviewPlacementIssues` / `reviewSponsor` in `src/_lib/placements.js`; policy text once in `site.json` → `v3.adPolicy`, rendered on /methodology/#advertising, /placement-options/#advertising and /terms/ |
| Ranked lists per category / region (order = rank, award, card copy) | `src/_data/rankings.yml` |
| Ranking layout v2 (owner, 2026-11-17; Identity Verification and Travel Rule): top 3 table, sponsor slot under it, cards for all ranked providers with evidence chips | `layout: v2` + `list_noun`, optional `score_note`, `top3_note`, `evidence` (`travel-rule`; default = identity columns) in `src/_data/categories/<slug>.yml`; template `src/_includes/v3/ranking-v2.njk`; top 3 columns (`cols`) and chips `v2Evidence` in `src/_lib/ranking-evidence.js` via `categories.11tydata.js` → `entries[].v2` (Travel Rule reads `networks[]`, certifications and `travelRuleFit.yml` deploy); caption date `top3Checked` = oldest `pricing.verified` in the top 3; commission line only when a listed link is affiliate/paid (`hasPaidLink`); sponsor slot `placements.yml` `surface: ranking`, rules `rankingPlacementIssues`; styles `.r2-*` at the end of v3.css. Other rankings keep the old layout |
| AML ranking page (owner approved the canvas "BeVerified: AML ranking page, redesign proposal", 2026-11-23): layout v2 with AML evidence, grouped capabilities grid (variant B) instead of the matrix | `aml.yml`: `layout: v2`, `evidence: aml` (top 3 columns and chips `amlTop3` / `amlChips` in `src/_lib/ranking-evidence.js`), `capability_grid: aml` (grid `src/_lib/aml-grid.js` via `categories.11tydata.js` → `capGrid`, template `src/_includes/v3/cap-grid-aml.njk`, styles `.cg-*` at the end of v3.css). All v2 rankings now show the award icon instead of ◆ (◆ stays for independent evidence), link the #1 award to `/about/#awards`, open pros and cons on #1, an MRZ line (`mrzLine` filter, `.r2-mrz`) under the top 3 and on the #1 card, and icons on the section heads. Every other capability table (category pages and the "X and alternatives compared" table on reviews, `src/_includes/v3/cap-matrix.njk`) uses the same `.cg-*` style: brand in a sticky first column (wordmark, else logo tile + name; rank and page score on rankings via `matrixRank`), marks instead of dots, green only for a confirmed certificate, notes only for value keys (`NOTE_KEYS`) |
| Category / region page copy (quick answer, explainer, FAQ, related) | `src/_data/categories/<slug>.yml` → `src/categories.njk` |
| Homepage copy, use-case cards, regions map | `src/_data/home.yml` → `src/index.njk` |
| Homepage first screen, identity palette (owner, 2026-11-16) | config `home.yml` → `hero` (ranking, rows, CTA, evidence chips, count groups); builders `src/_lib/hero.js` (card rows with confirmed checks only, review counts, guilloche, MRZ line); optional sponsor row `placements.yml` `surface: hero`, rules `heroPlacementIssues`; styles `.hero*`, `.idcard*`, `.check-chip` in v3.css. Green (`--ok`) is only for a confirmed check |
| Homepage use-case block (variant C, owner 2026-11-24: category buttons, use cases under them, top 3 as cards) | categories and order `home.yml` → `use_case_tabs`, definitions from `use_cases`, cards from `rankings.yml` top 3 (award, score, wordmark sized by area in `src/_lib/wordmark.js`; no wordmark = name as text); computed in `index.11tydata.js` → `useCaseTabs`; inline script and styles `.ucc*` in v3.css |
| Sponsored slot in that panel (one per use case, label always shown, real rank and score) | `src/_data/placements.yml` (entries without `surface`); rules `src/_lib/placements.js`; check `node scripts/checks/placements.mjs` (in `npm run check` and CI) |
| Homepage region pixel map ("Pick by region") | regions with `slug` + `iso` + `lon`/`lat` in `home.yml`; land grid `src/_data/regionGrid.json` generated by `npm run region-map` (Natural Earth 1:110m via world-atlas; rerun after adding a region ranking); pins and cards from `index.11tydata.js` → `regionMap`; top 3 from rankings.yml minus `site.json` → `v3.promoHide`; inline script and styles `.rmap*` |
| Providers kept out of promo spots (menu top 3, region map) | `site.json` → `v3.promoHide` (Onfido, owner 2026-11-10). Rankings and reviews are not affected |
| Incident tracker `/incidents/` (owner approved the canvas "BeVerified: Incident tracker, UX proposal", 2026-11-20): vendor check, filters, register rows with timeline and vendor reply, CSV/JSON download (CC BY 4.0) | data `src/_data/incidents.yml` (also feeds the review incident blocks, the sidebar Watch row and `scripts/rescore.mjs`); rows, filters, lookup, export in `src/_lib/incidents.js` via `src/incidents/incidents.11tydata.js`; templates `src/incidents/index.njk`, `incidents-csv.njk`, `incidents-json.njk`; styles `.reg-*` in v3.css. No sources list and no score paragraph inside an entry (owner): sources ship in the download |
| KYC Certification Tracker `/kyc-certification-tracker/` (owner approved the canvas "BeVerified: KYC Certification Tracker, page design", 2026-11-20): reviewed KYC providers A to Z, search, filters, rows open to every certification entry, CSV/JSON download (CC BY 4.0), menu item "Certifications" | rows from provider `certifications[]` (+ `independent_tests.rivr`) in `src/_lib/cert-tracker.js` (listing rule, columns, export); page settings, checked dates and "Recent changes" in `src/_data/certTracker.yml`; templates `src/kyc-certification-tracker/` (`index.njk`, `tracker-csv.njk`, `tracker-json.njk`, `kyc-certification-tracker.11tydata.js`); styles `.ct-*` at the end of v3.css; spec `docs/cert-tracker.md`. No source link per certificate (owner); sources ship in the download. Never ranked. Watcher: `scripts/cert-watch/watch.mjs` + `.github/workflows/cert-watch.yml` (daily, writes only to branch `cert-watch`; register names per provider in `src/_data/certWatch.yml`); a scheduled Claude task turns its report into PRs |
| Reviews directory (`/providers/`), unreviewed tracked providers | `src/directory.njk`, `src/_data/tracked.yml` |
| Authors (byline, author box) | `src/_data/authors.yml` |
| Methodology page copy | `src/methodology/index.njk` (layout `text.njk`) |
| About, Privacy, Terms | `src/about/`, `src/privacy/`, `src/terms/` (layout `text.njk`; legal text is a baseline, have a lawyer review it) |
| Use cases hub `/use-cases/`, Regions hub `/regions/` | `src/hubs/*.njk`; cards from `home.yml` (`group`, `area`) + `rankings.yml` |
| Author pages `/authors/<slug>/` | `src/authors/authors.njk`; one page per `authors.yml` entry with `url`; review list = providers with that `author` |
| 404 | `src/404.njk` (popular reviews = top 4 by score) |
| Articles (guides, news, research) at old URLs `/guide/`, `/news/`, `/publications/` | `src/<section>/<slug>.md`, spec `docs/article-spec.md`, validate `node scripts/checks/articles.mjs`; layout `src/_layouts/article.njk`. Related posts, "Related reading" on reviews and "Guides and news" on rankings come from front matter `provider_slugs`, `ranking_keys`, `topics` |
| KYC Pricing Index `/publications/kyc-pricing-index/` | tables built by `src/_data/pricingIndex.js` from provider `pricing.items` + `pricing.index` (see `docs/data-schema.md`); prose figures via `pricingIndex.price(slug, label)`; article text `src/publications/kyc-pricing-index.md`; re-check log `reports/pricing-index-recheck-2026-11.md` |
| KYC cost calculator (owner approved the canvas "BeVerified: KYC Pricing Index with cost calculator, design", 2026-11-20): in the KYC Pricing Index hero (front matter `calculator: true`), compact block on `/providers/kyc/`, embed page `/publications/kyc-pricing-index/embed/` (noindex), CSV/JSON download | data `src/_data/costCalc.js` (KYC providers with `budget{}`, via `calcProvider` in `src/_lib/budget.js`; budget checked over 90 days ago drops out; partial and price-on-request lists from `pricing.items`); templates `src/_includes/v3/cost-calc.njk`, `cost-calc-mini.njk`, `src/pricing-calc/`; styles `.pcalc*` at the end of v3.css; spec `docs/cost-calculator.md`. Price watch: `scripts/price-watch/watch.mjs` + `.github/workflows/price-watch.yml` (daily, writes only to branch `price-watch-state`), spec `docs/price-watch.md`; a weekly Claude task turns its report into PRs |
| Provider finder, bottom right (owner approved the canvas "BeVerified: Provider finder widget, logic and design", 2026-11-23): three questions (need, country, price), up to 3 matches in ranking order, review/ranking/country context, launcher = ID card tab with MRZ line | config `site.json` → `v3.finder` (needs, biz, costLists, exclude: methodology, terms, privacy; off on phones below 641 px, owner 2026-11-23); data `src/_data/finder.js` → `/assets/finder.json`; markup and script `src/_includes/v3/finder.njk` (included in `v3.njk`); styles `.fd-*` at the end of v3.css; spec `docs/provider-finder.md`. Country rankings shape identity results only. Sponsored row: `placements.yml` `surface: finder` (one per category, outside the top 3), rules `finderPlacementIssues` / `finderSponsors` in `src/_lib/placements.js`, checked by `scripts/checks/placements.mjs`; lead form deferred |
| Award badges (owner, 2026-11-23): Editor's Choice + awards of ranks 2 and 3, SVGs at `/badges/<ranking>/<slug>-<size>-<theme>.svg`, rules and embed picker on `/about/#awards`, never sold | rules `src/_lib/awards.js`, registry `src/_data/awardsIssued.json` (`node scripts/awards-register.mjs`; check `scripts/checks/awards.mjs`), drawing `src/_lib/badge-svg.js`, files `src/_data/awards.js` + `src/badges/badges.njk`, config `site.json` → `v3.awards`; spec `docs/award-badges.md` |
| Glossary `/glossary/` and `/glossary/<slug>/` | `src/_data/glossary/<slug>.yml`, spec `docs/glossary-spec.md`, term list `docs/glossary-terms.md`, validate `node scripts/checks/glossary.mjs`; templates `src/glossary/term.njk`, `src/glossary/index.njk`. "Providers that offer it" is generated from provider `capabilities{}` / `certifications[]` (`src/_lib/glossary.js`, `src/_lib/capabilities.js`); matrix column headers link to the term with the same `capability` |
| Article cover images (1600x900, og:image, schema `image`, post cards) | front matter `cover_label` / `cover_motif` / `cover_palette` (see `docs/article-spec.md`), motifs in `scripts/cover-motifs.cjs`; `npm run covers` renders missing covers into `src/assets/img/covers/<slug>.png` (`--force` re-renders all); picked up automatically by `src/_lib/article-data.js` |
| "Follow BeVerified on Google" (preferred source) block at the end of articles | `src/_layouts/article.njk` (card + `btn--secondary` with Google G icon, styles `.pref-source` in v3.css), link in `site.json` → `v3.preferredSourceHref` (deeplink, no Google script) |
| Reading progress bar and "Back to top" button (articles: guide, news, publications; reviews get the button only) | `src/_layouts/article.njk` (markup + inline script, hidden without JS); reviews: `src/_includes/v3/to-top.njk`; styles `.read-progress`, `.to-top` at the end of v3.css |
| News candidates (daily AML/KYC news collection; drafting task opens PRs, owner merges) | sources and topic rules `scripts/news/sources.yml`, collector `scripts/news/collect.mjs`, workflow `.github/workflows/news-candidates.yml` (writes only to branch `news-candidates`), spec `docs/news-pipeline.md` |
| Blog index `/blog/` and archives `/category/<section>/` | `src/blog.njk` + `src/_data/blogArchives.js` |
| Legacy URLs `/author/beverified/` (refresh to author page), `/contact-us/` | `src/legacy/` |
| Icons (all pages) | library `src/_lib/icons.js` (78 stroke icons + meaning maps for rankings, article sections, evidence levels); shortcodes `{% icon %}` / `{% iconFor %}` in `eleventy.config.js`; styles `.i`, `.i--*`, `.i-tile` at the end of v3.css; rules `docs/icons.md`; preview `npm run icons` → `design/icons.html`; check `scripts/checks/icons.mjs` (a new ranking key needs an icon) |
| Font | self-hosted `src/assets/fonts/Geist-Variable.woff2` |
| Analytics (GA4) | ID in `site.json` → `v3.analytics.ga4`; loaded only after consent by `src/_includes/v3/consent.njk`. No other third-party scripts or cookies: the privacy policy (`#analytics`) describes exactly this |
| Brand assets block on About `/about/#brand` (logo, icon and avatar downloads, colours, typeface, name) | section `#brand` in `src/about/index.njk`, styles `.brand-*` at the end of v3.css; files `src/assets/brand/beverified-*` built by `python3 scripts/brand-assets.py` (needs fonttools, brotli, Chrome). Footer link in `site.json` → `v3.footer.company` |
| Favicon, touch icons, manifest, default og:image (1200x630) | `src/assets/brand/`, `src/favicon.ico`, all rebuilt in the identity palette by `python3 scripts/brand-assets.py`; a page can set `ogImage` in front matter |
| IndexNow (Bing, Yandex, Seznam, Naver; not Google) | key in `site.json` → `v3.indexnow`, key file `/<key>.txt` from `src/indexnow-key.njk`; `scripts/indexnow.mjs`. The deploy workflow submits new or changed sitemap URLs (by `lastmod`) after each deploy; run the workflow manually with "indexnow_all" to submit every URL |
| `/llms.txt` | `src/llms.njk`, generated from the same data (rankings, providers, articles) |
| For providers page | `src/placement-options/index.njk` |
| Field definitions | `docs/data-schema.md` |
| AML ranking scoring (AML 1.0, owner 2026-11-23) | spec `docs/scoring-aml.md`, methodology `/methodology/#aml`, rubric `site.json` → `v3.rubricAmlRanking`; data fields in `capabilities{}` / `integration.webhooks` written with `python3 scripts/set-capabilities.py scripts/aml-data/<batch>.json` (keeps YAML layout); check `node scripts/checks/aml.mjs` (in `npm run check`); watcher `scripts/aml-watch/watch.mjs` + `.github/workflows/aml-watch.yml` (daily, writes only to branch `aml-watch-state`, extra pages `src/_data/amlWatch.yml`), spec `docs/aml-watch.md`. scorer `scripts/rescore-aml.mjs` (report `reports/rescore-aml-1.0.csv` + `.md`; `--write` adds `category_scores.aml`) |
| Fact re-check of a provider (every 90 days) | `docs/verification-spec.md`, validate `node scripts/checks/provider.mjs <slug>`, report in `reports/verification/<slug>.md`. `last_verified` = fact re-check, `updated` = content edit |
| Design reference (Claude Design export) | `design/` (open with a browser; not deployed) |
| Search Console / Bing exports | `data/gsc/`, `data/bing/` |
| Generated reports | `reports/` |

In shared includes use `allProviders` / `allCategories`, not `providers` / `categories`: article front matter shadows those names.

Templates hide any block whose data is empty, so filling a field in YAML is enough to make a section appear. Computed values (rank positions, alternatives, nav pills, JSON-LD) live in the `*.11tydata.js` file next to each template.

Planned, not built yet: topic pages, comparison pages (`comparisons.yml`), `entities.yml`.

## Commands

- `npm run build` — build into `_site/`
- `npm run serve` — local preview
- `npm run check` — content + internal link checks on `_site/` (report only for now; CI will switch to `--strict`)
- `npm run check:html` — HTML audit of `_site/`: authoring footprints, landmarks, headings, ids, ARIA references, alt text, link names
- `npm run gaps` — regenerate `reports/content-gaps.csv`
- `node scripts/cert-watch/watch.mjs --state <dir> [--fixtures <dir>]` — certification watcher (see `docs/cert-tracker.md`)
- `npm run inventory` / `npm run extract` — one-off migration scripts (Python: bs4, PyYAML). `extract` overwrites `src/_data`; do not re-run after the data has been edited by hand.

## Rules

- Never read `_site/` or `node_modules/` (generated). Change sources in `src/` only.
- Keep every existing URL. GitHub Pages cannot send 301 redirects.
- Do bulk edits with scripts in `scripts/`, not by opening pages one by one.
- One provider record must feed every place the provider appears. Never retype a rating, price or count.
- No number ships without a source and a verified date. Unknown = "Not publicly disclosed". Never invent data.
- Work in small steps; stop for review after each step.
- Articles (guides, news, publications, comparisons) have no visible Sources block (owner, 2026-11-20): every front matter source is linked inline in the body, checked by `scripts/checks/articles.mjs`. Reviews and glossary terms keep their Sources lists.
- OpenVASP is not a protocol (owner, 2026-11-19). The OpenVASP protocol was discontinued and replaced by TRP, which the OpenVASP Association now develops. Never list "OpenVASP" as a protocol, network or route next to TRP, TRISA, Sygna Bridge and the rest, even when a vendor or an AI answer does; write "TRP" or "the OpenVASP Association". If a vendor lists OpenVASP as a route, say once that the protocol was replaced by TRP and do not count it. Checked by `node scripts/checks/terms.mjs` in `npm run check` and CI.

## Writing rules

Any prose written or edited in `src/providers`, `src/categories`, `src/blog`, `src/pages`:
1. run the `humanizer` skill (natural voice, embedded mode) on the changed prose only;
2. then run the `beverified-landing` pre-publish check.

Category quick answer (`quick_answer` in `src/_data/categories/<slug>.yml`), written to be lifted whole by AI Overviews (owner, 2026-11-04), checked by `node scripts/checks/quick-answers.mjs` in `npm run check` and CI:
- 60 words at most, 4 sentences at most.
- Sentence 1 names the #1 provider and the one reason it wins, and reads on its own.
- Then one or two runner-ups, each with the dimension it wins on. Do not walk through the whole list: the table does that.
- Last sentence: "We compared N providers on A, B and C." N equals the ranking length.
- No scores (the table shows them). A price or count only when it is the reason for the pick, and it must match the provider record.

Humanizer never adds facts. If style and provenance conflict, provenance wins. Do not touch front matter, data, links, quotes or provider names while humanizing.

## Git

- `main` deploys to production. Work on feature branches; open a PR.
