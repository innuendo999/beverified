# Data schema (draft)

Extracted from the live pages by `scripts/extract.py` on 2026-10-18. Reconcile with the `{field}` labels in the Claude Design templates when the design export is added to `design/`.

Fields prefixed `legacy_` hold what the old pages showed. They are kept for reference and must not be rendered by new templates.

## `src/_data/providers/<slug>.yml`

| Field | Meaning | Status after extraction |
|---|---|---|
| slug, name, alternate_names | identity; alternate_names e.g. "Entrust Identity Verification" | name filled, alternate_names empty |
| rebranded_to | the new brand after a real rebrand or acquisition (e.g. "Entrust Identity Verification" for Onfido); shown as "now ..." under the logo. Legal names and product names stay in alternate_names (JSON-LD only) | empty |
| fit.yes[], fit.no[{text, alt}] | review V4 "Who {name} is for": lines start with a verb ("are", "send", "need"), describe the buyer's situation, use only facts already in the record; a "Look elsewhere" line only when 100% certain, `alt` = slug of an alternative with a review (owner, 2026-11-10) | empty (block hidden) |
| networks[{name, status, note, evidence, source}] | review V4 networks card (Travel Rule). status: built_in, own, live, bridge, via_membership, pending, planned, inbound, fallback, not_found | empty |
| screenshots[{file, width, height, caption, alt, long}], screenshots_meta{origin, provided, product_version, sample_data, permission} | product screenshots under `/assets/img/screens/<slug>/` (webp). origin vendor = "Screenshots provided by {name}", beverified = "Captured by BeVerified"; vendor screenshots never turn on "Manually tested". `permission` is internal | empty (block hidden) |
| product_jobs[{title, text, shots[], minor}] | review V5 "What {name} does", grouped by the buyer's job; facts from features[] only; `shots` = screenshots[] indexes for the "See ..." buttons; `minor` = small last block (engineers) | empty (features[] list) |
| pricing_calc{volume_label, plans[{tier, price_item, cap_item, includes[], source}]} | review V5 pricing calculator. `price_item`/`cap_item` = pricing.items labels the figures are read from ("CHF 900 / month", "up to 5,000"); a tier with no price_item shows as quoted; `includes` = item labels, or {item, label} to print "label: value". Nothing is typed here | empty (tier cards from pricing.plans) |
| link.sticky | `true` = sticky "Visit site" bar at the bottom of a V4/V5 review; only for providers the owner names (owner, 2026-11-11; 21 Analytics) | off |
| changes[{date, text}] | review V5 "What changed" under Sources, newest first; only real edits or re-checks | empty (hidden) |
| link.button | `primary` (dark Visit site) or `quiet` ("Official website ↗"), decided per provider by the owner; default primary for paid/affiliate, quiet for none | empty |
| sources[].type | optional override for the Sources grouping: register, counterparty, certificate, competitor, law, press, listing, vendor; otherwise inferred in `src/_lib/review-v4.js` | empty |
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
| pricing.index | optional; puts the provider in the KYC Pricing Index official table (`src/_data/pricingIndex.js`, added 2026-11-02): `product` (short text), `price[]` and `minimum[]` (labels of official `items`, shown verbatim; an unknown label fails the build), `minimum_note` (text when no item states the minimum), `included` (plain words, no figures) | 18 records |
| pricing.index_exclude | optional reason a record with an official price figure stays out of the index table; a record with an official money figure and neither field fails the build | gbg, complead |
| facts[] | `{label, value, source}` | values filled, sources empty |
| pros[], cons[] | 3 + 3 | filled |
| alternatives[], choose_instead[] | slugs + reason; ratings come from each provider's own record | filled |
| choose_instead[].need | optional short buyer-need label shown above "Choose X instead" (added 2026-11-02); `text` uses only facts from the alternative's own record | 5 reviews |
| alternatives_columns[] | optional; columns of the "X and alternatives compared" table on the review (this provider + its `choose_instead`), built by `buildMatrix` in `src/_lib/capabilities.js` like the category matrices. Keys: any `capabilities{}` key, certificate column, or `price_from` (the record's facts "From" value) | 5 reviews |
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

Starting price: a category file with `price_source: record` shows the price from the provider record, dated by `pricing.verified`: the `pricing.items[]` entry whose `label` equals the ranking entry's optional `price_item`, otherwise the `facts[]` "From" value. The build fails if `price_item` names a label the record does not have. Categories without the flag still show `legacy_price_shown` (retyped text, to be switched over one category at a time). Live on: liveness-detection (2026-11-03).

Outbound link on a listing: by default ranking cards link only to the review. An entry with `site_link: true` also shows "Official website ↗" to the provider record's `link.url`, with the rel from the record (`link.rel`, else sponsored for paid/affiliate, else nofollow) and the "Sponsored link" label for paid/affiliate unless `link.label: false`. Added 2026-11-10 (21 Analytics on travel-rule).

## `src/_data/categories/<slug>.yml`

`slug, url, seo, breadcrumb_label, quick_answer, reviewer, last_verified, explainer_html[] (legacy markup), faq[], adjacent[], capability_columns[], faq_templates[]`.

## Reports (regenerated, not hand-edited)

- `reports/content-inventory.csv` — every page with GSC metrics; fill the `decision` column (keep / rewrite / merge / new).
- `reports/gsc-missing-urls.csv` — URLs Google still shows that the site no longer has.
- `reports/rating-conflicts.csv` — every place a provider's rating appears, where values differ.
- `reports/content-gaps.csv` — what each page still needs, sorted by impressions.

## Rubric v3.1 fields (added 2026-11-05, draft)

Read by `scripts/rescore.mjs`, rules in `docs/scoring-v3.1.md`. Every leaf `{status, note, source}` uses `status: yes | add_on | partial | no | not_disclosed`, `note` = a few plain words, `source` = number in this record's `sources[]`. Add `independent: true` only when the source is a lab letter, register or third-party test.

```yaml
pricing:
  model:                     # how the published pricing looks, from pricing.items
    published: core | partial | none   # core = per-check price for the main product is public
    minimum: true | false    # monthly minimum, annual commitment or paid plan required
    trial: true | false      # free trial, free checks or free tier without a sales call
    source: 1
integration:
  checked: '2026-11'
  docs_public: {status, note, source}    # API reference readable without login
  sdk_web: {status, note, source}
  sdk_ios: {status, note, source}
  sdk_android: {status, note, source}
  sandbox: {status, note, source}        # self-serve sandbox or free trial, no sales call
  no_code: {status, note, source}        # no-code workflow builder or hosted verification link
  support_hours: {status, note, source}  # published support channels AND hours or SLA
coverage:                    # identity family only
  checked: '2026-11'
  countries: {value: 220, note: 'countries and territories', source}   # integer or null
  document_types: {value: 14000, note: 'document types', source}       # integer or null
  non_doc: {status, note, source}        # database, bank or registry checks for individuals
track_record:
  ownership: {status: stable | changed_disclosed | pending_sale | unknown, note, source}
  # incidents are not stored here: the score reads src/_data/incidents.yml (counted: false is not deducted)
capabilities:                # new keys, same shape as the other capabilities
  liveness: {...}            # identity family: has a liveness product
  injection_detection: {...} # add independent: true with a lab letter
  reusable_id: {...}
  data_residency: {...}      # customer can choose the processing or storage region
  ongoing_monitoring: {...}  # AML: re-screening of customers on list change
  list_updates: {...}        # AML: named sanctions lists with stated update frequency
  pep_tiers: {...}           # AML: PEP tiers or relatives and close associates
  fuzzy_matching: {...}      # AML: configurable fuzzy matching or thresholds
  alert_explanation: {...}   # AML: match reason shown to the analyst
  audit_trail: {...}         # AML: decision log or audit trail
  risk_scoring: {...}        # AML: risk scoring or rules engine
  batch_screening: {...}     # AML: bulk or batch screening
```

`score_breakdown[]` is written by `node scripts/rescore.mjs --write`; never type it by hand.
## `src/_data/incidents.yml` (security incident tracker, added 2026-11-05)

One record per incident (`id, slug, vendor, date, occurred, type, sensitivity, status, counted, title, summary, data[], scale, response, since, news?, corrections[]?, appeal?, sources[]`), rules in the file header. Renders `/incidents/` (`src/incidents/`) and the "Security incidents" block on the review of `slug` (`src/reviews.njk`, nav pill "Incidents"). Update `checked` after every re-check. Vendors correct or appeal by email (each entry has a prefilled link); accepted corrections go in `corrections[]`, appeals in `appeal{received, outcome, decided, note}`. Same rules for every vendor, including affiliate and paid-link partners.

## `src/_data/placements.yml` (sponsored slots, added 2026-11-10)

List of `{use_case, slug, start, end}`. One slot per use case in the homepage "Pick by use case" panel, shown from `start` to `end` (ISO dates, build date). `use_case` is a `rankings.yml` key listed in `home.yml` → `use_cases`; `slug` has a published review with a score, is in that ranking and not in its top 3; slots for one use case never overlap. The slot always shows the "Sponsored" label, the provider's real rank in that ranking, its record score and the ranking entry's `tagline` (else the record's), and links to the review. Rules in `src/_lib/placements.js`, checked by `scripts/checks/placements.mjs`; an entry that breaks a rule is never rendered. Empty until the advertising policy is published.

## `kya{}` (Know Your Agent data, KYA 1.0, added 2026-11-10)

Scored by `scripts/rescore-kya.mjs` under `docs/scoring-kya.md`; report `reports/rescore-kya-1.0.csv`. Not rendered yet.

- `checked` (date of the data pass), `methodology: kya-1.0`.
- Each item `{status, note, source}`; `source` is a 1-based index into the record's `sources[]`.
- `status`: `yes`, `beta` (both count), `partial`, `planned`, `no` (do not count). A key that is absent means not found. `availability.status` is `ga`, `beta`, `alpha` or `announced`; only `ga` and `beta` are eligible for the ranking.
- Keys: `product_name`, `availability`, `detect_undeclared`, `verify_signed`, `trust_score`, `shared_reputation`, `bind_person`, `bind_business`, `step_up`, `scoped_permissions`, `limits_expiry`, `revocation`, `pre_action_check`, `chaining`, `credential_format`, `protocols` (note = comma-separated protocol names), `open_spec`, `audit_log`, `tamper_evident`, `behaviour_monitoring`, `log_export`, `price`, `docs_public`, `self_serve`.
- Independent evidence for the human check is read from confirmed `certifications[]` (iBeta ISO/IEC 30107-3, IAL2, DIATF, eIDAS); the trust criterion reuses the v3.1 `score_breakdown` row.

## `budget{}` (Budget KYC data, Budget KYC 1.0, added 2026-11-11)

Inputs for `scripts/rescore-budget.mjs` (rules: `docs/scoring-budget-kyc.md`). No price is typed here: every amount is a `pricing.items` label, read from that item's value (`pick` = which amount when the value lists several).

- `checked`: date the vendor's pricing page was last opened for these figures (eligibility: 90 days).
- `currency`: `USD`, `EUR` or `GBP`; non-USD needs `fx{ rate, date, source }` (ECB reference rate on the check date, USD per unit).
- `options[]`: plans that include a full KYC check (document + liveness + face match): `plan`, `check[]` (item labels, summed), optional `aml[]` (screening add-on labels), `aml_included: true` when the plan's price already covers sanctions and PEP screening, optional `minimum{ item, covers_checks }` (`covers_checks: true` only when the vendor says so; otherwise the provider is not ranked), optional `fee_on_top` (item label).
- `aml_status`: `not_priced` (sold, no public price) or `not_sold`.
- `terms{ contract: none|monthly|annual|fixed_term|not_stated, self_serve: yes|no|not_stated, free_start: yes|no|programme|not_stated }`.
- `transparency{ parts_priced, aml_priced, tiers_published, addons_listed }` (booleans).
- `notes`: one line on how a fact was read.
- Output: `category_scores.cheap-kyc{ score, grade, methodology: budget-kyc-1.0, cost_s, cost_m, breakdown[] }`, written by `rescore-budget.mjs --write` for eligible providers only.
