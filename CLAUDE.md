# BeVerified — project map for Claude Code

Independent review and ranking site for KYC, KYB, AML and identity-verification providers. Static site built with Eleventy (11ty) and deployed to GitHub Pages (beverified.org).

Full plan, decisions and prompts: `docs/redesign-plan.md`. Read only the section you need.

## Where things live

| To change | Edit |
|---|---|
| Header menu, footer links, footer disclosure text | `src/_data/site.json` |
| Header / footer markup | `src/_includes/header.njk`, `src/_includes/footer.njk` |
| A page's footer date or meta line | that page's front matter (`updated`, `footerMeta`) |
| Styles / scripts | `src/assets/css/style.css`, `src/assets/js/site.js` |
| Provider review pages | `src/providers/<slug>/index.html` |
| Category and region ranking pages | `src/providers/<category>/index.html` (aml, aml/banks, kyb, e-kyc, identity-verification, crypto, liveness-detection, cheap-kyc, travel-rule, brazil, canada, india, mexico, peru) |
| Reviews directory | `src/providers/index.html` |
| Methodology, Placement options | `src/methodology/`, `src/placement-options/` (own header/footer, not shared) |

Planned (not built yet): `src/_data/rankings.yml`, `comparisons.yml`, `entities.yml`, provider data as `src/providers/<slug>.md` front matter, layouts in `src/_layouts/`. See plan sections 5–9.

## Commands

- `npm run build` — build into `_site/`
- `npm run serve` — local preview
- `npm run check` — content checks on `_site/` (report only for now; CI will switch to `--strict`)

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
