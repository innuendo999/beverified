# BeVerified — project map for Claude Code

Independent review and ranking site for KYC, KYB, AML and identity-verification providers. Static site built with Eleventy (11ty) and deployed to GitHub Pages (beverified.org).

Full plan, decisions and prompts: `docs/redesign-plan.md`. Read only the section you need.

## Where things live

All pages are generated from templates + data. There is no hand-written page HTML left.

| To change | Edit |
|---|---|
| Header menu, footer columns, disclosure text, rubric weights, evidence labels | `src/_data/site.json` → `v3` |
| Header / footer / page shell | `src/_includes/v3/header.njk`, `footer.njk`, `src/_layouts/v3.njk` |
| Styles (tokens + components, incl. mobile) | `src/assets/css/v3.css` |
| One provider (score, pricing, facts, pros/cons, FAQ, link, logo) | `src/_data/providers/<slug>.yml` → rendered by `src/reviews.njk` at `/providers/<slug>/` |
| Ranked lists per category / region (order = rank, award, card copy) | `src/_data/rankings.yml` |
| Category / region page copy (quick answer, explainer, FAQ, related) | `src/_data/categories/<slug>.yml` → `src/categories.njk` |
| Homepage copy, quick picks, use-case cards, regions map | `src/_data/home.yml` → `src/index.njk` |
| Reviews directory (`/providers/`), unreviewed tracked providers | `src/directory.njk`, `src/_data/tracked.yml` |
| Authors (byline, author box) | `src/_data/authors.yml` |
| Methodology page copy | `src/methodology/index.njk` (layout `text.njk`) |
| About, Privacy, Terms | `src/about/`, `src/privacy/`, `src/terms/` (layout `text.njk`; legal text is a baseline, have a lawyer review it) |
| Use cases hub `/use-cases/`, Regions hub `/regions/` | `src/hubs/*.njk`; cards from `home.yml` (`group`, `area`) + `rankings.yml` |
| Author pages `/authors/<slug>/` | `src/authors/authors.njk`; one page per `authors.yml` entry with `url`; review list = providers with that `author` |
| 404 | `src/404.njk` (popular reviews = top 4 by score) |
| Articles (guides, news, research) at old URLs `/guide/`, `/news/`, `/publications/` | `src/<section>/<slug>.md`, spec `docs/article-spec.md`, validate `node scripts/checks/articles.mjs`; layout `src/_layouts/article.njk`. Related posts, "Related reading" on reviews and "Guides and news" on rankings come from front matter `provider_slugs`, `ranking_keys`, `topics` |
| Article cover images (1600x900, og:image, schema `image`, post cards) | front matter `cover_label` / `cover_motif` / `cover_palette` (see `docs/article-spec.md`), motifs in `scripts/cover-motifs.cjs`; `npm run covers` renders missing covers into `src/assets/img/covers/<slug>.png` (`--force` re-renders all); picked up automatically by `src/_lib/article-data.js` |
| "Follow BeVerified on Google" (preferred source) block at the end of articles | `src/_layouts/article.njk` (card + `btn--secondary` with Google G icon, styles `.pref-source` in v3.css), link in `site.json` → `v3.preferredSourceHref` (deeplink, no Google script) |
| Blog index `/blog/` and archives `/category/<section>/` | `src/blog.njk` + `src/_data/blogArchives.js` |
| Legacy URLs `/author/beverified/` (refresh to author page), `/contact-us/` | `src/legacy/` |
| Font | self-hosted `src/assets/fonts/Geist-Variable.woff2` |
| Analytics (GA4) | ID in `site.json` → `v3.analytics.ga4`; loaded only after consent by `src/_includes/v3/consent.njk`. No other third-party scripts or cookies: the privacy policy (`#analytics`) describes exactly this |
| Favicon, touch icons, manifest, default og:image (1200x630) | `src/assets/brand/`, `src/favicon.ico`; a page can set `ogImage` in front matter |
| `/llms.txt` | `src/llms.njk`, generated from the same data (rankings, providers, articles) |
| For providers page | `src/placement-options/index.njk` |
| Field definitions | `docs/data-schema.md` |
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
- `npm run inventory` / `npm run extract` — one-off migration scripts (Python: bs4, PyYAML). `extract` overwrites `src/_data`; do not re-run after the data has been edited by hand.

## Rules

- Never read `_site/` or `node_modules/` (generated). Change sources in `src/` only.
- Keep every existing URL. GitHub Pages cannot send 301 redirects.
- Do bulk edits with scripts in `scripts/`, not by opening pages one by one.
- One provider record must feed every place the provider appears. Never retype a rating, price or count.
- No number ships without a source and a verified date. Unknown = "Not publicly disclosed". Never invent data.
- Work in small steps; stop for review after each step.

## Writing rules

Any prose written or edited in `src/providers`, `src/categories`, `src/blog`, `src/pages`:
1. run the `humanizer` skill (natural voice, embedded mode) on the changed prose only;
2. then run the `beverified-landing` pre-publish check.

Humanizer never adds facts. If style and provenance conflict, provenance wins. Do not touch front matter, data, links, quotes or provider names while humanizing.

## Git

- `main` deploys to production. Work on feature branches; open a PR.
