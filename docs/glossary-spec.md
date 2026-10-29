# Glossary spec

The glossary explains the terms buyers meet when they choose a KYC, KYB, AML, age assurance or Travel Rule provider. Each term is one YAML file, `src/_data/glossary/<slug>.yml`, rendered by `src/glossary/term.njk` at `/glossary/<slug>/`. The hub `/glossary/` (`src/glossary/index.njk`) lists every term as a plain link, grouped by cluster and A to Z.

Validate with `node scripts/checks/glossary.mjs` (or `node scripts/checks/glossary.mjs <slug> ...`). CI runs it.

## What makes a term worth a page

- It is a feature in our capability matrices, a rule or standard our rankings depend on, or a concept a buyer must understand to compare providers. Generic IT terms ("password salting") are out.
- Small and checked beats big and generated: no bulk-generated terms, no near-duplicates. If two terms would say the same thing, make one and list the other under `also_known_as`.
- If a full guide already exists (for example `/guide/perpetual-kyc/`, `/guide/transaction-monitoring-a-complete-guide/`), the term page is the short answer and links to the guide for depth. Do not copy the guide.

## Fields

```yaml
term: Liveness detection            # page H1; sentence case unless it is a proper name (Know Your Customer, Travel Rule)
abbr: null                          # optional: PEP, UBO, CDD. Shown as "Term (ABBR)"
also_known_as: [Liveness check]     # optional synonyms; become alternateName in JSON-LD
cluster: identity                   # identity | aml | kyb | crypto | age | standards
definition: >-                      # 20 to 60 words, one or two sentences, answers "what is X?" on its own (AI answers quote it)
  ...
seo_title: null                     # optional, max 65 chars. Default "What Is {ABBR (Term) | Term}? | BeVerified"
seo_description: null               # required when the definition is longer than 160 characters; max 160
capability: liveness_pad            # optional key from src/_lib/capabilities.js; turns on the generated "Providers that offer it" table
rankings: [liveness-detection]      # 1 to 3 keys from src/_data/rankings.yml ("Compare providers" cards)
related: [face-matching]            # 3 to 6 slugs of other glossary terms, chosen by hand (same topic, not random)
provider_mentions: []               # provider slugs the text may name; only for a sourced historical fact (who created AOPP)
body: |                             # Markdown, 250 to 1000 words, 2 to 4 "## " sections, no H1
  ## How it works
  ...
  ## What the rules say
  ...
buyer_questions:                    # 3 to 6 questions to put to a vendor; quote any line that contains ": "
  - "..."
faq:                                # 2 to 4; real questions people ask; plain 1 to 3 sentence answers
  - q: "..."
    a: "..."
sources:                            # at least 2; primary sources first (law, regulator, standard body, test lab)
  - title: ...
    publisher: ...
    url: https://...
    accessed: 2026-10
author: andrii-klymenko
published: 2026-10-29
updated: 2026-10-29                 # change only when the content changes
```

## Writing rules

- Facts only from sources opened on the day of writing: EUR-Lex, FATF, EBA, FCA, FinCEN, Ofcom, ISO, NIST, GOV.UK, national regulators, test labs. Every date, threshold, article number and figure must be in a listed source. If a fact cannot be confirmed, leave it out.
- Body sections usually: how it works (mechanics, plain language), what the rules or standards say (with article or paragraph numbers), and what to check when comparing providers. Add "Common confusions" when a term is often mixed up with another.
- Neutral: never name reviewed providers in the text; the "Providers that offer it" table is generated from provider records. A sourced historical fact is the only exception (`provider_mentions`).
- Links: at most 4 external links in the body, each on natural anchor text, each also listed in `sources`. Link other glossary terms where the reader needs them (2 to 5), the matching ranking page, and an existing guide if there is one.
- Style: plain, natural English for compliance and product people; short paragraphs; no em or en dashes; no hype words; British or American spelling consistently within a term (default American, but keep official names as published). Run the humanizer skill on the text, then the beverified-landing pre-publish check.
- Not legal advice: describe what a rule says; do not tell the reader what they must do in their situation.
- Quote YAML strings that contain ": " (colon + space) or start with a quote, bracket or `@`.

## What is generated

- Title, meta description, breadcrumb (Home > Glossary > cluster), table of contents, "Providers that offer it" (from `capabilities{}` and `certifications[]` of each published provider record, core and confirmed first, then by score), "Compare providers" cards, related terms (hand-picked first, then up to 8 from the same cluster), sources list, author box.
- JSON-LD: `DefinedTerm` (in the hub's `DefinedTermSet`), `WebPage` with author and citations, `BreadcrumbList`, `FAQPage`. The hub carries the `DefinedTermSet` with every term.
- Category capability matrices link a column header to the term whose `capability` matches it. `/llms.txt` lists every term with its definition.
