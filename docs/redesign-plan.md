# BeVerified — redesign, architecture & SEO plan

Last updated: 2026-10-17. Captures the decisions made in the redesign working session. Treat as the source of truth for next steps in Claude Design and Claude Code.

---

## 1. Status

**Update 2026-10-18:** all page designs finished in Claude Design. Code work started in repo `innuendo999/beverified`, branch `redesign`: step 1 done (11ty, shared header/footer from `src/_data/site.json`, output byte-identical to the live site, deploy workflow, content check script reporting 96 issues — editorial notes and screenshot placeholders on provider pages, CLAUDE.md, skills in `.claude/skills/`). Steps 2–4 done (same branch): reports in `reports/` (content-inventory, gsc-missing-urls, rating-conflicts, content-gaps), data in `src/_data` (46 providers, 14 categories, rankings.yml), schema draft in `docs/data-schema.md`. Findings: 34 URLs with ~19.6k impressions in GSC no longer exist on the site (old /guide/, /publications/, /news/, /category/ content and /providers/age-verification/; top: /guide/what-is-a-whitelist/ 8.7k impressions); 6 providers show different ratings across pages and 13 of 14 category pages show card ratings that differ from review scores; 8 categories rank 17 providers with no review page; KYCAID is #1 in 11 of 14 categories; 2 broken links in the directory (hawk-ai, kyc-hub); biggest page by impressions is /providers/aml/ (21k, avg pos 49). Bing: ~1,000 AI citations per day across ~30 pages vs ~1 click/day. Next: design export into `design/`, then step 5 (templates).

**Update 2026-10-18 (later):** Step 5 done on branch `redesign` (not merged). Design export in `design/`. All 65 existing URLs now render in the V3 design from data: homepage (`home.yml`), 46 reviews (`reviews.njk`), 14 category/region pages (`categories.njk`), directory with 14 tracked unreviewed providers, methodology (text layout, copy unchanged), For providers (`/placement-options/` rebuilt from design; paid placement offers removed while advertising policy is undefined). Added sitemap.xml, robots.txt, strict CI checks (content notes, broken links). Pre-publish notes removed from 15 provider pages. Author on all pages = Andrii Klymenko (`authors.yml`); legacy reviewer names kept as `legacy_reviewer`. Not built (no content yet): blog, topic pages, hubs, comparisons, author page, About/Privacy/Terms, 404. Open: methodology still names Elena Marsh, David Okafor, Priya Nathan as evaluators and says analysts run sandbox tests — must match reality before merge; category rank order does not follow scores in several lists (e.g. IDV: KYCAID 4.6 #1, Onfido 4.5 #2, Persona 4.6 #4). Before merging to main: switch repo Settings → Pages → Source to "GitHub Actions".

- **Homepage redesign — done** (Claude Design, light theme, desktop 1440px).
- **Next in Claude Design (desktop only, to save credits):**
  1. Component sheet + Provider review page (prompt in section 9)
  2. Category ranking page (+ region variant as a small frame) + "X vs Y" comparison layout
  3. Providers directory A–Z + generic text page (Methodology, About, How we make money, Privacy, Terms, author variant)
- **Then Claude Code:** migrate to Eleventy (11ty) on GitHub Pages (section 5).

**Update 2026-10-18 (night):** rankings now ordered by provider score (ties keep order, unreviewed last; Editor's Choice follows #1; Sponsored Placement awards removed; quick answers and homepage quick picks rewritten to match). Methodology rewritten (v3.0): fictional evaluators, sandbox/ticket testing, sales-quote checks, "42 criteria", score bands and invented version history removed; describes public-evidence method. All rendered copy passed through invisible-characters (clean) and humanizer (374 sentences rewritten, no em/en dashes left; CI now fails on dashes in visible copy).

## 2. Decisions made by the owner (do not reverse without asking)

Homepage:
- Light theme (dark version strained the eyes). Warm off-white background, white cards, near-black ink, one violet accent.
- Framer.com is the UI/UX reference for structure and rhythm (large two-line left headlines, product-like panels, bento, dense footer) — not for dark colours.
- Hero background concept "The Shortlist": isometric field of matte slabs, a thin violet evaluation line, top 3 slabs rise with a check. Inspired by Sumsub's brand film but deliberately different (light, matte, top-down, selecting not building).
- Removed: site search, Compare tool / "Compare providers" button and nav, final "Your next vendor starts here" input, stat strip (46 / 40+ / date / rubric version), numbers in "Independently reviewed providers" and "See all providers", Methodology link in header (kept in footer and "How we evaluate" section).
- First screen: H1 + subhead (no numbers) + "See top providers" / "Browse by use case" + static Quick picks card. No author, no "How we score", no last-verified date, no "How we make money" on the first screen. Quick picks link only to internal reviews (no outbound affiliate links on first screen → no disclosure needed there).
- Sponsored / Featured placement: removed for now. Owner will decide later how to monetise. When it returns: one slot, "Sponsored" label on the card, survives grayscale, quieter than editorial picks, honest score, same policy wording everywhere, disclosure next to it.
- Header: Logo · Use cases · Regions · Reviews · "For providers" text link.
- "Manually tested" claim is KEPT. Provider template has a "Hands-on test" block to be filled later; the badge shows on a page only when that block has content.
- Provider cards ("Top rated"): logo directly on the white card (no grey double frame), large tabular rank, score as number + 5-segment meter (no stars), one "Best for" pill, 2-line description, "Read review →", Editor's choice only on #1 with icon + violet border, wordmark fallback when no logo.

## 3. Audit findings still to fix on the live site

- Provider pages show internal "Editorial note (pre-publish)" text — blocking, remove.
- Ratings inconsistent: Onfido 4.5 on its page vs 4.6 on homepage; "ranked #5 in IDV" vs 3rd on homepage; last verified Jul 25 vs Jul 24.
- "See Top 10" CTAs everywhere — must show real counts.
- Placeholder "product screenshot — dashboard view" rendered as content; duplicated "You may also like" row; clipped FAQ; background seam; homepage methodology block duplicated text.
- Category assignments look off (Trulioo in Cheap KYC, KYCAID in AML for Banks; Sumsub in almost every list).
- Onfido is now Entrust (entrust.com/company/onfido-is-now-entrust) — name pages "Onfido (Entrust Identity Verification)".
- Homepage `WebSite` + `SearchAction` schema is obsolete (Google removed sitelinks search box in 2024).
- Claude Design invented data in the homepage mock (Incode 4.7, Regula/Shufti 4.6, Veriff sponsored, NICE Actimize/Ondato/Notabene lists, FAQ "KYCAID ranks first"). Replace with real data before build.

Current real scores (from live homepage): Sumsub 4.8, ComplyAdvantage 4.7, Onfido 4.6, KYCAID 4.6, Feedzai 4.6, Trulioo 4.5, Jumio 4.5, SEON 4.5.

## 4. Onfido page — Search Console findings (last 3 months, to 2026-10-17)

- 31 clicks / 10,668 impressions, CTR 0.29%, avg position 9.7. 58% of impressions show the review snippet (stars).
- Pricing cluster: 611 impressions, avg pos 4.3, 1 click ("onfido pricing" 373 impr, pos 3.7, 0 clicks) → page gives no price info; fix title/description and pricing section with public/third-party data.
- What-is / ownership: 678 impressions, 0 clicks; many "onfido acquired by entrust 2024" queries.
- Alternatives: 321 impressions, pos ~12; "X vs Onfido" pos 13–50 (Jumio, Veriff, Persona, Didit).
- AI-agent style queries ("evaluate the … company onfido on aml monitoring / kyc / digital onboarding") at pos 3–6 → add per-use-case verdict table.

## 5. Architecture (Claude Code + GitHub Pages)

Eleventy (11ty) + GitHub Actions deploy. Structure:

```
src/_includes/header.njk, footer.njk, provider-card.njk, …
src/_layouts/base.njk, provider.njk, category.njk, compare.njk, page.njk
src/_data/site.json          menu & footer links
src/_data/rankings.yml       top lists per category/region (order = rank)
src/_data/comparisons.yml    approved "X vs Y" pairs + short editorial verdict
src/_data/entities.yml       entity registry (names, Wikidata QID, KG MID, sameAs, parent)
src/providers/<slug>.md      front matter = all provider data; body = review text
src/categories/<slug>.md     intro, explainer, FAQ only
.github/workflows/deploy.yml
CLAUDE.md                    map of the project for Claude Code
.claude/settings.json        deny Read(./_site/**), Read(./node_modules/**)
```

Rules:
- One provider record feeds review page, category cards, homepage, comparisons and JSON-LD. Never retype a number.
- Category H1 "Top {count}" and "See all {count}" use the real list length.
- Every number stored with `source` and `verified` date.
- Migration done by scripts (extract header/footer/provider data from existing HTML), not by Claude reading pages one by one.
- Work in small steps with review after each; short targeted prompts.

CI checks (fail the build): internal notes/TODO/"pending verification" in output; ranking slug without provider file; missing score/pricing date; rating in JSON-LD ≠ visible rating ≠ other pages; unresolved `@id`; comparison pair with missing data.

First Claude Code prompt (step 1): set up 11ty, base/header/footer from site.json, script to strip duplicated header/footer from all pages and add front matter, GitHub Pages workflow keeping CNAME and URLs, settings.json deny rules, CLAUDE.md, verify by diffing 5 sample pages. Then steps: providers → rankings/categories → homepage from data → apply new design to templates.

## 6. Provider review page — content approach

Evaluation is based on public evidence (owner's constraint), labelled by evidence level:
- **Independent:** iBeta ISO/IEC 30107-3 letters, FIDO Face Verification, NIST FRTE, UK DIATF register, ISO 27001 / SOC 2.
- **Vendor-stated:** vendor site, docs, trust centre, pricing pages, status page, SDK repos.
- **User-reported:** G2, Capterra, Gartner Peer Insights, Trustpilot — rating, review count, date; never merged into our score; never in AggregateRating.
- **Hands-on:** our own test (block filled later).
- Pricing: official info separated from "third-party estimate" (e.g. marketplace listings, Vendr), each with source and date.
- Criterion with no public data → "Not publicly disclosed", no score.

Section order: breadcrumb → H1 "{Provider} Review 2026" (+ alternate brand name) with score, best-for, rank link, author, last verified, conditional "Manually tested" badge → 50–60 word answer → disclosure + CTAs → sticky nav + Quick facts → score breakdown with weights and evidence level → "{Provider} for…" use-case verdict table (KYC, KYB, AML, fraud/deepfakes, crypto) → pricing → hands-on test → ownership & company facts → certifications & independent tests → features → pros/cons 3+3 with sources → user ratings → alternatives ("Choose X instead if…") + vs links → ranked in → FAQ from GSC queries → numbered sources → author box → footer. No promo banner at the end.

Title pattern: "Onfido (Entrust IDV) Review 2026: Pricing, Alternatives & Verdict". Meta description answers the pricing query.

## 7. Schema, Entity SEO, Knowledge Graph, topical authority

Schema (generated from data, one `@graph` per page, stable `@id`s):
- Site: `Organization` BeVerified `/#org` (logo, sameAs, publishingPrinciples → methodology, ownershipFundingInfo/ethicsPolicy → How we make money), `WebSite` (no SearchAction).
- Author: `Person` `/authors/<slug>/#person` with hasCredential (CAMS), sameAs LinkedIn, knowsAbout; author page as `ProfilePage`.
- Provider page: `WebPage` (about/mentions, dates), `Review` (reviewRating = visible score, author, publisher, positiveNotes/negativeNotes), `SoftwareApplication` `#software` (alternateName, applicationCategory, publisher), provider `Organization` `#org` (foundingDate, parentOrganization, sameAs), `BreadcrumbList`, `FAQPage`.
- Category: `ItemList` + `BreadcrumbList` + `FAQPage`. Comparison: `WebPage` about both `SoftwareApplication`s, no rating.
- Expectations: review stars yes; pros/cons possibly; breadcrumbs yes; FAQ rich results no (gov/health only) but useful for AI; ItemList no carousel.

Knowledge Graph — three levels:
1. On-site graph — fully automated from YAML.
2. Linking to Wikidata QIDs / Google KG MIDs — `scripts/enrich_entities.py` queries Wikidata API + Google Knowledge Graph Search API, writes candidates for human confirmation (ambiguous names like Regula, Incode).
3. BeVerified as a Google KG entity — not automatable: About page as entity home, consistent profiles (LinkedIn, Crunchbase, X, author), independent mentions; Wikidata item only once independent references exist. Monthly KG Search API check for "BeVerified".

Cloud Natural Language API check in CI (changed pages only): `analyzeEntities` — main entity has top salience and correct MID; `classifyText` — first category matches intended topic. Basis: 1492.vision study of Google Discover 2026 signals (one KG entity per reader by MID; topics from Google's public taxonomy; engagement-depth score predicts clicks). Discover relevance for BeVerified is mainly news-type content (acquisitions, regulation, pricing study).

Topical map: provider reviews → category & region rankings → topic pages (aggregation, no glossary) → regulation guides (FATF R.16, EU AMLR/AMLA, UK MLR, FinCEN CIP, BACEN, RBI) → "X vs Y" pages only with demand + real data → buyer guides (KYC cost per check, how to choose) → original study (e.g. "KYC Pricing Index 2026"). Avoid scaled thin pages.

GEO extras: Bing Webmaster Tools + IndexNow ping from Actions; robots.txt allow OAI-SearchBot, PerplexityBot, ClaudeBot (training bots = business decision); GA4 channel for AI referrals; monthly manual check of ~20 prompts.

## 8. "X vs Y" comparison pages

- Generated by 11ty only for pairs listed in `comparisons.yml` (never all 1,035 pairs).
- Pair suggestions: script reads GSC export for "X vs Y" queries where both names exist in entities.yml.
- Page content from both provider records: side-by-side facts, score breakdown, use-case verdicts, certifications, pricing with dates, user ratings, FAQ, sources; only the short verdict is hand-written.
- URL alphabetical: `/compare/jumio-vs-onfido/`. Review pages show vs-buttons automatically for existing pairs; hidden when none.

## 9. Claude Design prompt — Provider review page (latest version)

```
Design the PROVIDER REVIEW page template for BeVerified. DESKTOP ONLY (1440px). Light theme, same tokens and components as the approved homepage.

If the component sheet does not exist yet, first extract it from the homepage and name each component exactly: header, footer, breadcrumb, provider-card, rating (number + 5-segment meter, no stars), badge, pros-cons, faq, section-header, cta-row (primary "Visit site" + secondary), disclosure-line, last-verified, author-byline, evidence-tag, source-ref. Use only these components below; any new component gets added to the sheet with a name.

## Sample provider: Onfido (now Entrust Identity Verification)
Known facts to use: founded 2012, HQ London (UK), acquired by Entrust in 2024 and now branded as Entrust. Everything else (score, sub-scores, prices, review counts, certifications, test results) must be shown as field names in curly braces with a neutral sample value — do NOT invent real-looking figures. Overall score sample must equal the homepage card ({score} = 4.6).

## Data labelling
Label every data-bound value with its field name, e.g. {score}, {score_breakdown[].weight}, {pricing.items[].value}, {pricing.items[].source}, {pricing.verified}, {facts.founded}, {user_ratings[].platform}. This list becomes our data schema.
Every factual claim carries an evidence-tag: "Independent" (lab, government register, benchmark), "Vendor-stated" (vendor site/docs), "User-reported" (G2, Capterra, Gartner Peer Insights), "Hands-on" (our own test). Plus a small numbered source-ref [1] linking to the Sources list. Evidence tags must read in grayscale (icon + text).

## Section order
1. breadcrumb: Home › Reviews › Onfido
2. Header block: logo, H1 "Onfido (Entrust Identity Verification) Review 2026", rating {score}/5 with word grade, best-for badge, "Ranked #{rank} in {category}" link, author-byline (photo, name + credential, link to profile), last-verified, and a "Manually tested" badge shown ONLY when the Hands-on test block (section 9) has content — show both states (with and without the badge).
3. Short answer (first 50–60 words, real text): who it's for, the main trade-off, pricing in one sentence ("No public rate card; third-party estimates …"). Quotable by AI search.
4. disclosure-line directly above cta-row: "Visit site" (outbound) + "See alternatives" (anchor).
5. Sticky in-page nav (pills): Verdict · Score · Use cases · Pricing · Ownership · Certifications · Hands-on test · Pros & cons · User ratings · Alternatives · FAQ · Sources.
   Right column, sticky: Quick facts table — From price, Pricing model, Founded, HQ, Owner, Regions/document coverage, Certifications count, Last verified. Each row with evidence-tag.
6. Score breakdown: our rubric criteria with weights, this provider's sub-score per criterion as a bar, evidence level per criterion, and "Not publicly disclosed" state for a criterion with no data (no score shown).
7. "Onfido for…" verdict table by use case: KYC onboarding, KYB, AML screening & monitoring, Fraud & deepfakes, Crypto. Columns: use case, verdict (Strong / Adequate / Limited / Not offered), one-sentence reason, evidence-tag + source-ref.
8. Pricing: official information block clearly separated from a "Third-party estimates" block; each value with source and date; "What drives the price" list (volume, modules, minimum contract); "Pricing verified: {pricing.verified}". Include the sales-only state.
9. Hands-on test (placeholder template for later): test date, what we tested (onboarding flow, document check, liveness, dashboard, API sandbox), time-to-verify, pass/fail outcomes, screenshots slots. Show the empty state that is hidden on live pages until filled.
10. Ownership & company facts: "Who owns Onfido?" subsection with acquisition year and link to Entrust's announcement; facts table (founded, HQ, owner, offices) each with source-ref.
11. Certifications & independent tests: rows for ISO/IEC 30107-3 (iBeta), UK DIATF register, ISO 27001, SOC 2, NIST FRTE, FIDO Face Verification — states: Confirmed (with link), Vendor-stated, Not found.
12. Key features: max 6, buyer language.
13. pros-cons: exactly 3 + 3, each with source-ref; cons are real limitations.
14. User ratings: per platform — rating, number of reviews, date checked, link; plus "What users praise / criticise" (3 + 3 themes). Visually separated from our editorial score with the note "User ratings are not part of our score".
15. Alternatives: 4 rows "Choose X instead if …" with concrete reason, X's score and link to its review; plus links to "Onfido vs Jumio" and "Onfido vs Veriff" pages.
16. Ranked in: categories where the provider appears with its position (from rankings data).
17. faq (6): How much does Onfido cost? Who owns Onfido? Is Onfido the same as Entrust Identity Verification? What are the best Onfido alternatives? Does Onfido do AML screening? Is Onfido good for crypto companies?
18. Sources: numbered list — title, publisher, date accessed.
19. Author box: photo, name, credential, short bio, link to profile; published and updated dates.
20. footer. No full-width promotional banner at the end.

## Edge cases (small frames, not full pages)
- Provider with no logo (wordmark fallback) and very long name.
- Provider with published self-serve pricing (price table with 3 plans).
- Score breakdown where 2 of 6 criteria are "Not publicly disclosed".

No sponsored elements. No search, no compare tool. No placeholder graphics shown as content — if there's no screenshot, the slot is not rendered.
```

## 9b. Claude Design prompt — Category page + comparison layout

```
Design the CATEGORY RANKING page template for BeVerified, plus a compact "X vs Y" comparison layout. DESKTOP ONLY (1440px). Light theme. Use only components from the component sheet (header, footer, breadcrumb, provider-card, rating, badge, pros-cons, faq, section-header, cta-row, disclosure-line, last-verified, author-byline, evidence-tag, source-ref). Any new component gets added to the sheet with a name.

## Sample
Category: Identity Verification. Providers (sample order, label the list "sample data"): Sumsub 4.8, Onfido (Entrust) 4.6, KYCAID 4.6, Trulioo 4.5, Jumio 4.5. {count} = 5. All other values (prices, sub-scores, coverage) as field names in curly braces with neutral sample values — do not invent real-looking figures. Label every data-bound value with its field name, e.g. {rankings[].rank}, {provider.score}, {provider.pricing.from}, {provider.pricing.verified}, {rankings[].award}, {category.updated}.

## A) Category page — section order
1. breadcrumb: Home › Use cases › Identity Verification
2. H1 "Top {count} Identity Verification Providers in 2026" — the number always equals the cards on the page.
3. Short answer (50–70 words, real text): overall pick with reason, 1–2 runner-ups with the dimension each wins on, what was compared. Provider names bold only.
4. author-byline (photo, name + credential, profile link) + last-verified + "Manually tested" badge only if at least one provider in the list has hands-on results (show both states).
5. Jump nav: horizontal row of the ranked providers (logo + name) anchoring to their cards.
6. Summary ranking table (static, not a compare tool): rank, provider (logo + name), score, starting price + verified date, best for, "Read review". Caption above it naming what is compared. Tabular numerals. Top row marked Editor's choice.
7. disclosure-line directly above the first outbound "Visit site" link.
8. Ranked cards, one per provider in rank order, expanded provider-card: large rank number, award line ({rankings[].award}, e.g. "Editor's choice", "Best for enterprise", "Best budget option"), logo, name, rating, one-line positioning, meta row (regions/coverage, company size fit, pricing model), 3 pros + 3 cons, starting price with verified date and evidence-tag, cta-row ("Visit site" primary, "Read full review" secondary), and if available a small "Compare: X vs Y" link. Give one card a 14-word positioning line to test resilience.
9. How we ranked this category: the rubric criteria with weights used here, the evidence levels we rely on (Independent / Vendor-stated / User-reported / Hands-on), link to full methodology.
10. Buyer's checklist: "What to look for in an identity verification provider" — 6 items (document coverage, liveness certification ISO/IEC 30107-3, assurance level NIST SP 800-63, data residency & GDPR, pricing model, integration effort).
11. Pricing overview across the ranked providers: one compact row per provider (model, from price, source, verified date) — sales-only shown honestly.
12. Explainer: what identity verification covers and how it differs from eKYC and Liveness Detection (links to those categories).
13. Regulatory context: named standards only, each with source-ref.
14. Popular comparisons: pill buttons for approved "X vs Y" pages among these providers (block hidden when none).
15. faq (6) with real buyer questions.
16. Related categories (cards) and "Browse all providers" link (no number).
17. Sources list, then footer. No promotional banner.

Small frame: same template as a REGION page ("Top {count} KYC Providers in Brazil") — only H1, short answer, explainer and regulatory block change (e.g. BACEN, LGPD).
Small frame: empty/short state — category with only 3 providers (H1 "Top 3 …", no padding to 10).

## B) "X vs Y" comparison layout (one page): "Jumio vs Onfido (2026)"
breadcrumb → H1 → short verdict (2–3 sentences, hand-written: choose X if…, choose Y if…) → author-byline + last-verified → side-by-side header (logo, name, score, best for, "Read review" for each) → comparison table (score breakdown by criterion with the stronger side subtly marked, starting price + verified date, pricing model, founded, HQ, owner, coverage, certifications with evidence-tags) → use-case verdicts side by side (KYC, KYB, AML, fraud & deepfakes, crypto) → user ratings per platform for both (separate from our score) → disclosure-line + cta-row for each → faq (4) → other comparisons → sources → footer. Same fields as the provider review page; nothing new invented.

No search, no compare tool, no sponsored elements, no placeholder graphics shown as content.
```

## 9c. Full page inventory and linking model (added 2026-10-17)

| Page type | URL | Design session | Status |
|---|---|---|---|
| Homepage | / | done | done |
| Provider review | /providers/<slug>/ | 1 | prompt 9 |
| Category / region ranking | /providers/<category>/ (keep existing URLs) | 2 | prompt 9b |
| X vs Y | /compare/<a>-vs-<b>/ | 2 | prompt 9b |
| Blog index + topic/type archives | /blog/, /blog/type/<type>/ | 3 | prompt 9d |
| Blog post (News, Guide, Research, Regulation) | /blog/<slug>/ | 3 | prompt 9d |
| Author | /authors/<slug>/ | 3 | prompt 9d |
| Topic page (non-provider entities: topics, regulations, companies) | /blog/topic/<slug>/ | 4 | prompt 9d |
| Use cases hub, Regions hub | /use-cases/, /regions/ | 4 | prompt 9d |
| Providers directory A–Z | /providers/ | 4 | prompt 9d |
| Text pages (Methodology, About, How we make money, Contact, Privacy, Terms) | /<slug>/ | 5 | prompt 9d |
| For providers / Claim profile | /for-providers/ | 5 | prompt 9d |
| 404 | /404.html | 5 | prompt 9d |

Linking model (all automatic at build time from front matter, no hand-made links):
- Every content file declares `entities: [...]` (ids from entities.yml) and optionally `categories: [...]`, `regions: [...]`, `topics: [...]`.
- NO glossary (owner decision 2026-10-18): no /glossary/ pages, no definition tooltips. Entity chips link: provider → its review; category → its ranking; region → its region page; any other entity (topic, regulation, company like Entrust) → /blog/topic/<slug>/. "What is X" questions are answered in category explainers and blog guides.
- Backlinks computed by the build: provider page shows "Latest on {provider}" (blog posts mentioning it), "Ranked in", "Comparisons"; topic page shows rankings, providers and posts for that entity; category shows related guides; blog post shows mentioned providers (with score), related categories, related posts by shared entities.
- Auto-link: first mention of a provider name in body text links to its review (max N per page, never inside headings/links).
- Every page gets JSON-LD with `about` / `mentions` pointing to the same `@id`s: BlogPosting or NewsArticle (blog), CollectionPage (topic pages), CollectionPage + ItemList (hubs, blog index, directory), ProfilePage + Person (authors), AboutPage / ContactPage (text pages).
- CI: orphan check (every page has ≥3 internal inbound links), broken internal links, unknown entity ids.

## 9d. Claude Design prompts — sessions 3–5

### Session 3 — Blog + author

```
Design BLOG templates and the AUTHOR page for BeVerified. DESKTOP ONLY (1440px). Light theme. Use the component sheet; add any new component to it with a name: entity-chip, post-card, mentioned-provider, related-posts, toc, key-takeaways.

Linking principle: every post declares the entities it covers (providers, companies, regulations, topics). All "related" and "mentioned" blocks are generated from these declarations — show them as data-driven blocks labelled with field names, e.g. {post.entities[]}, {related_posts[]}, {mentioned_providers[]}. Data values as {field} placeholders; no invented figures.

A) Blog index /blog/
- H1 "Insights on KYC, AML and identity verification" + one-line description.
- Type tabs (plain links): All · News · Guides · Research · Regulation.
- Featured post (latest Research or Guide) as a large card.
- Grid of post-cards: type label, title, 2-line excerpt, up to 3 entity-chips, author, date, reading time. Optional cover image; the card must look complete without one.
- Topics row: entity-chips for main topics (KYC, AML, KYB, Travel Rule, Liveness, Onfido, Sumsub…) linking to topic pages (/blog/topic/<slug>/).
- Pagination. Small frame: archive variant "/blog/type/regulation/" with its own H1 and description.

B) Blog post /blog/<slug>/ — two variants:
- News (~600 words): "Entrust completes Onfido acquisition: what it means for KYC buyers" — with a large cover image (≥1200px wide, needed for Google Discover).
- Guide (~2,500 words): "How much does KYC cost per check in 2026?" — sticky toc on the left, no cover image needed.
Sections:
1. breadcrumb Home › Blog › {type}
2. type label, H1, standfirst (2 sentences), author-byline, published + updated dates, reading time
3. key-takeaways box (3–5 bullets, real text, quotable by AI search)
4. "In this article" entity-chips: provider → its review, category → its ranking, region → region page, anything else → topic page
5. Body: headings, paragraphs, table, callout, quote, image with caption, inline source-ref [1]; first mention of a provider name links to its review (no tooltips)
6. Mentioned providers: compact rows (logo, name, score, best for, "Read review") generated from entities that are providers
7. Guide only: "Related rankings" category cards
8. Sources list
9. Author box
10. related-posts (3 cards, chosen by shared entities)
11. footer

C) Author page /authors/elena-marsh/: photo, name, credential (CAMS), role, bio, areas of expertise (entity-chips), profile links (LinkedIn), link to editorial standards, list of reviews written (provider rows) and posts (post-cards), pagination.
```

### Session 4 — Hubs, topic pages, directory (no glossary)

```
Design for BeVerified: HUB pages, TOPIC pages and the PROVIDERS DIRECTORY. DESKTOP ONLY (1440px). Light theme. Use only the component sheet; add any new component to it with a name. Data values as {field} placeholders; no invented figures. All "related" blocks are data-driven from entity declarations ({entities[]}) — label them with field names. There is NO glossary: no glossary pages, no definition tooltips anywhere.

Entity-chip link rule (show it in the component sheet): provider → its review page; category → its ranking page; region → its region page; any other entity (topic, regulation, company that is not reviewed, e.g. Entrust or FATF Travel Rule) → its topic page.

A) Use cases hub /use-cases/
- breadcrumb, H1 "KYC, KYB & AML providers by use case", 2-sentence intro.
- Category cards grouped under small headings: Identity (Identity Verification, eKYC, Liveness Detection), Business (KYB), Financial crime (AML, AML for Banks), Crypto (Crypto KYC, Travel Rule), Budget (Budget KYC). Each card: name, one-line description, top 3 provider logos, real count "{count} providers", "See ranking →".
- "Guides by use case" (post-cards from the blog) and "Popular comparisons" (pill links).

B) Regions hub /regions/
- breadcrumb, H1 "KYC & AML providers by country", 2-sentence intro.
- Regions grouped by continent; each row: country/region name, main regulator (e.g. FCA, FinCEN, BACEN), "{count} providers", link. Priority markets shown first as larger cards: UK, EU, US, UAE, Singapore, India, Brazil, Mexico, Nigeria, Canada.
- State for a region without a ranking yet: "Coming soon", not a link.

C) Topic page /blog/topic/<slug>/ — the destination of non-provider entity-chips. Show two variants:
- Topic/regulation: "FATF Travel Rule".
- Company that is not reviewed: "Entrust" (with a link to the Onfido review it owns).
Layout: breadcrumb, H1 topic name, 1–2 sentence intro (context, not a dictionary definition), then data-driven blocks: related rankings (category cards), providers involved (compact rows with score and "Read review"), latest posts (post-cards, paginated), related comparisons (pills). A block with no items is not rendered.

D) Providers directory /providers/
- breadcrumb, H1 "All KYC & AML providers", 2-sentence intro.
- Use-case tabs (plain links, no search), A–Z jump letters.
- Compact provider rows grouped by letter: logo, name, score, best for, category chips, cta-row state per the link rules ("Visit site" with Affiliate/Sponsored tag, or quiet "Official website ↗"), "Read review".
- State for a provider without a review yet: "Review coming", no score, no outbound button.
```

### Session 5 — Text pages, For providers, 404

```
Design for BeVerified: TEXT PAGES, FOR PROVIDERS and 404. DESKTOP ONLY (1440px). Light theme, component sheet only.

A) Generic text page template (Methodology, About, How we make money, Contact, Privacy, Terms): breadcrumb, H1, last updated, sticky toc on the left, long-form body (~70-character lines, 17–18px), headings, lists, table, callout, quote, footer. Show these variants:
- Methodology: rubric with weights (bars), evidence levels (Independent / Vendor-stated / User-reported / Hands-on) with their icons, re-verification cadence, how scores change, corrections policy, editorial team cards, rubric version changelog.
- About (the entity home of BeVerified): who we are, mission, editorial team, company details (legal name, address, contact email), official profiles (LinkedIn etc.), link to How we make money.
- How we make money: affiliate model, what payment never affects, a sample of the disclosure-line as it appears on pages, a "Sponsored placements" section marked "to be defined".
- Contact: contact options for readers, corrections and providers (email links; no form needed).

B) For providers /for-providers/: who reads BeVerified, "Claim your profile" (correct facts, add documentation, respond — never change the score), 3-step process, email CTA, policy line "Payment never changes scores or ranking order", an "Advertising" section marked "to be defined".

C) 404: short message and links to Use cases, Regions, Reviews, Blog and 4 popular provider reviews.
```

## 9e. Outbound link states (decided 2026-10-17, recommended approach)

Every provider keeps a way to reach the vendor; only the treatment differs by commercial relationship. Data field per provider: `link: { type: affiliate | paid | none, url }`.
- affiliate → primary "Visit site" button + small "Affiliate link" tag; rel="sponsored noopener".
- paid (flat-fee link, not commission) → primary "Visit site" button + "Sponsored link" tag; rel="sponsored noopener". Counts as advertising.
- none → quiet text link "Official website ↗" (secondary style); rel="nofollow noopener".
- "Read review" stays visible on every card; score and rank never depend on link type.
- Outbound links go through /go/<slug>/ static redirect pages (noindex, disallowed in robots.txt), URL kept in provider YAML; GA4 click event.
- How we make money page explains the three states in the same words.

Claude Design add-on prompt:
```
Update the component sheet: cta-row gets three states driven by {provider.link.type}.
1) affiliate: primary "Visit site" button + small "Affiliate link" tag (icon + text, readable in grayscale) right under or beside it.
2) paid: primary "Visit site" button + small "Sponsored link" tag (distinct icon from affiliate).
3) none: no button; a quiet text link "Official website ↗" in secondary style.
"Read review" (secondary button) appears in all three states. Show the three states side by side on: a ranked category card, the provider review header, and a Quick picks row. Card heights must stay equal across states. Also add a tooltip/popover on the tags: "We earn a commission if you sign up through this link. It never affects scores or ranking." (affiliate) and "The provider paid for this link. It never affects scores or ranking." (paid).
```

## 9f. Identity Verification category — GSC findings and FAQ template (2026-10-18)

GSC, last 3 months, /providers/identity-verification/: 0 clicks, 4,459 impressions, avg position 45.6. Trend improving: Jul pos 49.3 → Aug 52.6 → Sep 40.0 → Oct (to 14th) 32.9. 85% of impressions from the US.
- 83% of attributed impressions are list-intent head terms (providers / companies / solutions / software / services / vendors / platform, "ID verification", "identity proofing") at positions 35–60.
- Year-tagged queries rank much better (e.g. "top identity verification companies for 2024" pos 8.9) → year in title/H1 must be generated, but only bumped after real re-verification.
- Long attribute/segment questions (many are AI-agent or persona-style synthetic prompts) at positions 1–10: SOC 2 certified, NIST IAL2, biometric + liveness, NFC, video identification, no-code, SDK/API docs, 24/7 manual review, low latency, BOI/ownership checks, age verification for dating/social, ecommerce, neobanks/digital banking, insurance, healthcare, mid-market vs high-volume.
- Comparison demand: Persona vs Jumio, Onfido vs Jumio, Jumio/Onfido alternatives, Prove vs Jumio.
- Vendor names Google associates with the page that may be missing: Persona, Veriff, Prove, Sprint Verify, Veri5Digital — check list completeness.

Category template additions:
- H1/title cover synonyms: "Top {count} Identity Verification Companies & Software in {year}"; intro mentions providers, solutions, vendors, ID verification, identity proofing.
- "Best for" by segment block (segment → provider → reason), from `rankings[].segments`.
- Capability & certification matrix (providers × SOC 2, ISO 27001, ISO/IEC 30107-3 iBeta level, NIST IAL2, NFC, video ident, no-code, SDKs, manual review, data residency) with evidence states — answers attribute queries.
- US regulatory block where relevant (NIST SP 800-63, state biometric laws such as Illinois BIPA, CCPA).

FAQ system (one template for all categories, answers generated from data so they never contradict the body):
- `_data/faq_templates.yml` with question patterns + answer builders: best overall, best for {segment}, cost, which are certified ({cert}), which offer {capability}, how we rank, what is {category} vs {adjacent}, alternatives to the #1.
- Each answer: first sentence names providers directly (≤50 words), then detail, "as of {verified}".
- Category front matter chooses which templates apply, plus 1–2 hand-written questions.
- 6–8 FAQ visible; the long tail is covered by the matrix and segment block, not by an endless FAQ.
- Monthly script: GSC export → cluster questions per page → suggest new FAQ/segment/capability entries for human approval.

## 11. Content migration plan and quality gates (2026-10-18)

Design of all page types is finished. Order of work in Claude Code:
1. Infrastructure: 11ty + base/header/footer, output identical to today (prompt in section 5).
2. Content inventory: script crawls current HTML + merges GSC page export → `content-inventory.csv` (URL, type, title, words, providers listed, rating shown, pricing present, FAQ present, internal notes found, clicks, impressions, decision: keep / rewrite / merge / new).
3. Extraction by script into the data schema (field names collected from Claude Design `{field}` labels): providers → `src/providers/<slug>.md`, categories → `src/categories/<slug>.md`, rankings → `rankings.yml`. Empty field stays empty; templates hide empty blocks.
4. Gap report generated at every build: `content-gaps.csv` per page (missing pricing source, certifications, user ratings, segments, capabilities, sources, hands-on test). This is the research to-do list.
5. Apply new design to templates.
6. Fill gaps by priority (GSC impressions first: Onfido review, Identity Verification category, then the rest): one provider per Claude Code session, web research from public sources only, every value with `source` + `verified`, human reviews the diff. Never invent; unknown = "Not publicly disclosed".
7. New content: methodology, About, How we make money, author page, category explainers + FAQ templates, approved comparisons, first blog posts.
8. URLs stay the same. GitHub Pages cannot send server 301s; removed/merged URLs get static redirect pages (meta refresh + canonical) and are listed in the sitemap only at their new URL.

Quality gates for text:
- Skills in the repo: copy `beverified-landing` and `humanizer` into `.claude/skills/` so every Claude Code session loads them (account skills may not be available in every environment).
- CLAUDE.md rule: any prose written or edited in providers/, categories/, blog/, pages/ goes through humanizer (natural voice, embedded mode) and then the beverified-landing pre-publish check. Humanizer never adds facts; provenance rules win over style.
- CI (free, deterministic): Vale prose linter with a BeVerified style built from humanizer patterns (AI vocabulary list, em/en dashes, copula avoidance, "not only… but", filler phrases, hedges, chatbot artifacts, title-case headings), reported as warnings with file:line; plus the blocking checks (internal notes, TODO, unsourced numbers, rating mismatches). Warnings only for style because of false positives (humanizer: look for clusters, not single tells).
- Optional: Claude Code GitHub Action reviews only changed content files on a PR against both skills.

## 12. Responsive version — economical approach (2026-10-18)

Do not design mobile for every page. Responsive behaviour is defined once per component and implemented in code.
- Claude Design: ONE mobile session (390px) for the component sheet mobile states + first screens of the provider review and category pages + the three table patterns.
- Claude Code: implements responsive CSS for all templates from the component rules; automatic checks with Playwright (pre-installed Chromium) at 390 / 768 / 1440: screenshots per template, test that no element is wider than the viewport, tap targets ≥ 44px, body text ≥ 16px. Owner reviews screenshots; Claude only re-opens failing ones.
- Google indexes the mobile version first: all content must exist on mobile (accordions are fine, removed blocks are not).

Component rules: header → burger menu (For providers inside); hero animation → static poster, Quick picks under H1; grids 4→2→1; summary ranking table → stacked rows; capability matrix → sticky first column + horizontal scroll; X vs Y table keeps two columns; review page Quick facts → under the short answer, collapsible; in-page nav pills → horizontally scrollable; blog toc → collapsible "On this page"; cta-row → full-width buttons; tooltips on Affiliate/Sponsored tags → tap popover; footer columns → accordions.

Claude Design prompt (mobile session):
```
Create MOBILE (390px) versions for BeVerified, based on the approved desktop designs and the same tokens. Only these frames, nothing else:
1) Component sheet, mobile states: header with burger menu (open and closed; "For providers" inside the menu), footer with accordion columns, provider-card, quick-pick-row, cta-row (affiliate / paid / none states, full-width buttons), rating, badges, evidence-tag, entity-chip, faq, post-card, tag popover on tap (instead of hover tooltip).
2) Homepage first two screens: H1, buttons, Quick picks card; hero animation replaced by its static poster.
3) Provider review page first three screens: header block, short answer, disclosure + CTAs, Quick facts as a collapsible block under the short answer, horizontally scrollable in-page nav pills.
4) Category page first three screens: H1, short answer, author line, summary ranking table as stacked rows, first ranked card.
5) Table patterns: capability matrix with sticky first column + horizontal scroll (show the scroll hint), X vs Y comparison table in two columns.
Rules: body text ≥16px, tap targets ≥44px, no horizontal page scroll, no content removed compared to desktop (collapse instead of hide). Name every new state in the component sheet.
```

## 10. Open questions for the owner

- How to monetise sponsored placement (format, wording, where).
- Whether to allow AI training crawlers (GPTBot, Google-Extended).
- Which score is correct for Onfido (4.5 vs 4.6) and the real per-category rankings.
- When hands-on testing starts and for which providers first.
