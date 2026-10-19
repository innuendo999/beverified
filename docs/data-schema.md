# Data schema (draft)

Extracted from the live pages by `scripts/extract.py` on 2026-10-18. Reconcile with the `{field}` labels in the Claude Design templates when the design export is added to `design/`.

Fields prefixed `legacy_` hold what the old pages showed. They are kept for reference and must not be rendered by new templates.

## `src/_data/providers/<slug>.yml`

| Field | Meaning | Status after extraction |
|---|---|---|
| slug, name, alternate_names | identity; alternate_names e.g. "Entrust Identity Verification" | name filled, alternate_names empty |
| status | published / draft | published |
| seo.title, seo.description, seo.h1 | current meta | filled |
| logo.src, logo.background | logo file and tile colour | filled |
| tagline | one-line positioning | filled |
| score, grade | editorial score from the provider's own page (single source of truth) | filled |
| primary_category, categories | category slugs | filled |
| link.url, link.type | outbound link; type = affiliate / paid / none (owner decides). affiliate or paid → rel="sponsored noopener" plus a visible "Sponsored link" label; optional link.rel overrides the rel value (used for KYCAID by agreement); none or empty → rel="nofollow noopener" (filter `outRel`) | url filled, type empty |
| reviewer.name, reviewer.credential, last_verified | byline | filled |
| verdict | short answer | filled from "Quick verdict" |
| what_is[] | paragraphs | filled |
| features[] | buyer-language features | filled |
| pricing.summary, pricing.plans[] | current pricing copy | filled |
| pricing.items[] | `{label, value, kind: official \| third_party, source, verified}` | empty |
| pricing.verified | YYYY-MM of last price check | empty |
| facts[] | `{label, value, source}` | values filled, sources empty |
| pros[], cons[] | 3 + 3 | filled |
| alternatives[], choose_instead[] | slugs + reason; ratings come from each provider's own record | filled |
| user_reviews.praise/criticize/by_profile | themes | filled |
| user_ratings[] | `{platform, rating, count, checked, url}` | empty |
| faq[] | `{q, a}` | filled |
| score_breakdown[] | `{criterion, weight, score, evidence}` | empty |
| use_case_verdicts[] | `{use_case, verdict, reason, evidence, source}` | empty |
| certifications[] | `{name, status: confirmed \| vendor_stated \| not_found, url}` | empty |
| segments[], capabilities{} | for "best for" blocks and the capability matrix | empty |
| hands_on | hands-on test block (later) | empty |
| sources[] | `{title, publisher, url, accessed}` | empty |
| entity.wikidata, entity.kg_mid, entity.same_as[] | Knowledge Graph ids | empty |

## `src/_data/rankings.yml`

`<category-slug>: {title, providers: [{slug, name, award, tagline, coverage, size, pros, cons, segments, legacy_price_shown, legacy_rating_shown}]}` — list order is the rank. Entries without `slug` are providers with no review page yet.

## `src/_data/categories/<slug>.yml`

`slug, url, seo, breadcrumb_label, quick_answer, reviewer, last_verified, explainer_html[] (legacy markup), faq[], adjacent[], capability_columns[], faq_templates[]`.

## Reports (regenerated, not hand-edited)

- `reports/content-inventory.csv` — every page with GSC metrics; fill the `decision` column (keep / rewrite / merge / new).
- `reports/gsc-missing-urls.csv` — URLs Google still shows that the site no longer has.
- `reports/rating-conflicts.csv` — every place a provider's rating appears, where values differ.
- `reports/content-gaps.csv` — what each page still needs, sorted by impressions.
