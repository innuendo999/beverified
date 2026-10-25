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
| link.url, link.type | outbound link; type = affiliate / paid / none (owner decides). affiliate or paid → rel="sponsored noopener" plus a visible "Sponsored link" label; optional link.rel overrides the rel value (used for KYCAID by agreement); optional link.label: false hides the "Sponsored link" label (KYCAID, editor decision); none or empty → rel="nofollow noopener" (filter `outRel`) | url filled, type empty |
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
| segments[], capabilities{} | for "best for" blocks and the capability matrix (see below) | empty |
| hands_on | hands-on test block (later) | empty |
| sources[] | `{title, publisher, url, accessed}` | empty |
| entity.wikidata, entity.kg_mid, entity.same_as[] | Knowledge Graph ids | empty |

### `capabilities{}` (AML capability matrix, added 2026-10-22)

Each key is `{status, note, source}`; `source` = number in this record's `sources[]`; `note` = a few plain words, no numbers without the source.

| key | status values |
|---|---|
| sanctions_pep | yes \| add_on \| no \| not_disclosed |
| adverse_media | yes \| add_on \| no \| not_disclosed |
| transaction_monitoring | yes \| add_on \| no \| not_disclosed |
| case_management | yes \| add_on \| no \| not_disclosed |
| identity_verification | yes \| add_on \| no \| not_disclosed |
| deployment | cloud \| on_prem \| cloud_and_on_prem \| not_disclosed |
| published_pricing | yes \| partial \| no |
| nfc | yes \| add_on \| no \| not_disclosed (IDV, added 2026-10-23: SDK reads ePassport/eID chips) |
| video_ident | yes \| add_on \| no \| not_disclosed (IDV, added 2026-10-23: live agent video call, not an automated selfie video) |
| age_document, age_facial_estimation, age_email_estimation, age_mobile_operator, age_credit_card, age_open_banking, age_digital_id, age_reusable | yes \| add_on \| no \| not_disclosed (age verification methods, added 2026-10-23; judged on the vendor's age verification pages) |
| kyb_registry, kyb_ubo, kyb_entity_screening, kyb_monitoring, kyb_documents | yes \| add_on \| no \| not_disclosed (KYB, added 2026-10-25; kyb_registry note carries the vendor's registry/jurisdiction count with its source and is always shown) |
| kyb_pricing | yes \| partial \| no (KYB price published on the vendor's own site; note = the price point, always shown) |

Plus `checked: '2026-10'`. `yes` = in the core product per the vendor's current pages; `add_on` = separate module, plan tier or partner; `no` = the vendor says it does not, or the product clearly does not; `not_disclosed` = nothing found. `partial` pricing = some plans or per-check prices published, others quoted.

Certificate columns for category matrices (`liveness_pad`, `soc2`, `iso_27001`, `trust_framework`, `age_certification` = ACCS / ISO/IEC 27566-1, KJM, IEEE 2089.1) are not stored here: `src/categories.11tydata.js` reads them from the record's `certifications[]` (name match, best status wins; `confirmed` beats `vendor_stated`; a name containing "in progress" shows as In progress). Keep certification names standard (e.g. "ISO/IEC 30107-3 Level 2 (iBeta)", "SOC 2 Type II", "UK DIATF ...") so the match works.

## Category `segments` (added 2026-10-23)

`segments: [{segment, slug, reason}]` in `src/_data/categories/<slug>.yml` renders the "Best pick by use case" table (heading override: `segments_heading`). `reason` = one plain sentence built only from facts in that provider's record; the review link carries the sources.

## `src/_data/rankings.yml`

`<category-slug>: {title, providers: [{slug, name, award, tagline, coverage, size, pros, cons, segments, legacy_price_shown, legacy_rating_shown}]}` — list order is the rank. Entries without `slug` are providers with no review page yet.

## `src/_data/categories/<slug>.yml`

`slug, url, seo, breadcrumb_label, quick_answer, reviewer, last_verified, explainer_html[] (legacy markup), faq[], adjacent[], capability_columns[], faq_templates[]`.

## Reports (regenerated, not hand-edited)

- `reports/content-inventory.csv` — every page with GSC metrics; fill the `decision` column (keep / rewrite / merge / new).
- `reports/gsc-missing-urls.csv` — URLs Google still shows that the site no longer has.
- `reports/rating-conflicts.csv` — every place a provider's rating appears, where values differ.
- `reports/content-gaps.csv` — what each page still needs, sorted by impressions.
