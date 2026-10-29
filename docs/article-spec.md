# Article spec (guides, news, publications)

Articles live as Markdown in `src/guide/`, `src/news/`, `src/publications/`. The file name is the URL slug:
`src/guide/what-is-a-whitelist.md` → `/guide/what-is-a-whitelist/`. Old WordPress URLs are kept exactly.
Layout, related posts, "Mentioned providers", "Related rankings", schema and archive pages are generated; the file only holds content.
Validate with `node scripts/checks/articles.mjs` (add `--file src/guide/x.md` for one file).

## Front matter

```yaml
---
title: "What Is a Whitelist? Meaning, Examples and Uses in Compliance"   # H1, under ~70 chars
seoTitle: "What Is a Whitelist? Meaning and Examples | BeVerified"          # under ~60 chars incl. brand
seoDescription: "One or two sentences, 140-160 chars, answers the query."
lede: "Two sentences under the H1 that answer the main question directly."
section: guide              # guide | news | publications
published: 2025-06-12       # original publish date from the old site; omit if unknown (never guess)
updated: 2026-10-18         # date of this refresh
author: andrii-klymenko
takeaways:                  # 3-5 bullets, each one sentence, each a real fact or instruction
  - "..."
topics: [Whitelist, Sanctions screening]   # 2-5 short topic tags, Title Case
provider_slugs: [complyadvantage, sumsub]  # provider slugs from src/_data/providers that the article genuinely discusses (0-6)
ranking_keys: [aml, kyb]                   # ranking keys from src/_data/rankings.yml relevant to the reader (1-3)
about_terms: [sanctions-screening]          # optional: 1-5 glossary slugs the article is about -> Article "about" (DefinedTerm), Entity SEO
mention_orgs:                              # optional: regulators or standard bodies the article relies on -> Article "mentions"
  - name: "Financial Crimes Enforcement Network"
    url: "https://www.fincen.gov/"
faq:                                       # 3-5, use real search queries where given
  - q: "What does whitelisted mean?"
    a: "Plain answer, 1-3 sentences."
sources:                                   # every external fact in the body must be backed here
  - title: "Specially Designated Nationals And Blocked Persons List"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/..."
    accessed: 2026-10
---
```

## Cover image

Covers never repeat the article title (the card and the page already show it). Front matter:

```yaml
cover_label: "Allowlists explained"   # 2-4 words, the topic in plain words, not the headline
cover_motif: list                      # illustration from scripts/cover-motifs.cjs
cover_palette: violet                  # optional: light | warm | violet | dark | accent (default cycles per section)
```

Motifs: list, stacks, magnifier, coin, wallet, bank, cycle, cyclebiz, flow, bars, threshold, org, gavel, globe, document, idcard, face, gear, newspaper, network, fingerprint, passport, unlock. Pick one that differs from the neighbouring posts where possible; add a new motif to `scripts/cover-motifs.cjs` if none fits.
Then run `npm run covers` (renders `src/assets/img/covers/<slug>.png`, 1600x900; `--force` re-renders all). The cover is used on the article, on post cards (title + date only), as og:image and as schema `image`. A custom image can be set with `cover: /assets/img/...`.

## Body

- Markdown. Start with a short intro paragraph (no heading). Then `##` sections (4-8), `###` allowed. Tables allowed.
- Do not repeat the H1, the lede or the takeaways in the body.
- Internal links: 3-8 natural links to our pages (provider reviews, rankings, hubs, methodology) plus 1-3 links to sibling articles. Only URLs from the list in `scripts/checks/articles.mjs` output (`--urls`) are valid.
- External links: link to the primary source inline where the claim is made (regulator, official journal, law text, vendor page). Every such URL must also be in `sources`.
- News items keep the original story and its date, then end with a section `## What has happened since` (status as of the refresh date, sourced). If nothing changed, say so and say what was checked.
- Guides and publications are refreshed to be correct as of the `updated` date: new laws, deadlines that passed, changed thresholds, renamed lists, acquisitions.

## Rules

- No number, date, fine, threshold, count or name ships without a source you actually opened. Unknown = leave it out or say "not publicly disclosed". Never invent quotes, statistics, case details or customer names.
- No em dashes or en dashes anywhere (body or front matter). Use commas, colons, full stops or parentheses. Use "to" for ranges.
- Natural voice (see `.claude/skills/humanizer`): concrete, plain, varied sentence length. Avoid "In today's...", "landscape", "delve", "crucial", "robust", "seamless", "navigate the complexities", "it's important to note", rule-of-three padding and closing summaries that restate the article.
- Not legal advice: guides explain rules; they don't tell a specific reader what they must do.
- Mention providers neutrally. Never claim a provider holds a certification or feature without a source.
