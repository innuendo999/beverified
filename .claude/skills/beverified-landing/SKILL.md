---
name: beverified-landing
description: Building and reviewing BeVerified landing pages, covering category ranking pages, provider review pages, and the evidence, disclosure and freshness rules they carry. Use when creating or editing any page under beverified.org, adding or re-ranking a provider, updating pricing or ratings, writing comparison copy, or preparing a page for publish. Triggers on BeVerified, provider review page, category page, top 10 page, ranking table, editorial score, provider card, pros and cons, affiliate disclosure, sponsored placement, methodology link, last verified date, pre-publish check, KYC, AML, KYB, eKYC, IDV comparison.
---

# BeVerified landing pages

BeVerified sells a judgement, not a product. Every page asks a compliance buyer to trust a ranking that also earns affiliate revenue, so the page's credibility is the product and any unsourced number, stale date, or blurred sponsorship boundary spends it. Build accordingly: the evidence rules below are not editorial preference, they are what makes the ranking worth reading.

Two page types carry almost all the traffic: category pages ("Top Identity Verification Companies in 2026") and provider review pages ("Jumio Review 2026"). Their required section order lives in [page-anatomy.md](references/page-anatomy.md).

Visual craft is owned by the sibling skills and not restated here: spacing, grouping and breakpoints by `better-layout`, type scale and tabular figures by `better-typography`, palette and contrast by `better-colors`, focus, keyboard and semantics by `better-accessibility`, radius, shadows and motion by `better-ui`, and label and error wording by `better-writing`. This skill owns what is specific to a ranking site that takes affiliate money: provenance, disclosure, ranking integrity, and freshness. Match the repository's existing styling system and component set rather than introducing a second one.

## Quick Reference

| Category | When to Use |
| --- | --- |
| [Page Anatomy](references/page-anatomy.md) | Section order for category and provider pages, what each block must contain, schema markup |
| [Claims & Disclosure](references/claims-and-disclosure.md) | Sourcing a number, labelling estimates, disclosure placement, sponsored styling, ranking integrity |
| [Visual System](references/visual-system.md) | Extracting tokens from the live site, rating and badge rendering, pros/cons and sponsored-label treatment |
| [Design & Code Handoff](references/design-handoff.md) | Splitting work between Claude Design and Claude Code, what crosses the boundary |
| [Pre-Publish Check](references/pre-publish-check.md) | The gate every page passes before it ships |

## Core Principles

### 1. No Number Ships Without a Source and a Date

Every rating, price, coverage count, founding year, and percentage carries provenance. A figure from the vendor's own page is stated as such; a figure from a third party is labelled `third-party estimate`; a figure the team measured is dated. Pricing blocks state the month and year the price was checked, in the form `Pricing verified: Jul 2026`. If a number cannot be sourced, the sentence is rewritten without it rather than shipped soft. Do not fill a gap with a plausible figure.

### 2. Ratings, Prices and Counts Come From One Data File

The same provider appears on the homepage, a category table, a ranked card, and its own review page. Those four renderings read from one record, never from four hand-typed copies. Retyping is how a provider ends up rated `4.6` in one place and `4.7` in another, which is the single fastest way to discredit the whole rubric. The same rule governs "46 providers reviewed" and "40+ countries covered": derive them, never type them.

### 3. Disclosure Sits Before the First Affiliate Link

A footer-only affiliate disclosure is not adequate for a page whose main content is affiliate links. Place a short disclosure above or inside the first block that contains one, in normal body size and body contrast, never in muted small print. The footer statement stays as well. When a placement is sponsored, the label sits on the card itself, not in a legend elsewhere on the page.

### 4. Sponsorship Never Moves Rank

Rank order comes from the rubric alone. A sponsored provider keeps the position its score earns, and its card carries a visually distinct `Sponsored` label that survives grayscale. Never let a page imply both "we do not sell placement" and "apply for a featured placement": state the actual arrangement once, in the same words, on the methodology page and in the disclosure. A contradiction between the two is the claim a regulator reads first.

### 5. Answer in the First Screen

Category pages open with a quick answer that names the winner, names the runner-up and the reason, states what was compared, and gives the count: "**KYCAID** is the best overall for most businesses, since one workflow covers onboarding and re-verification." Then the byline with a named reviewer and credential, then the last-verified date. A buyer who reads only the first screen must leave with a usable answer and a reason to believe it.

### 6. Cons Are Real, and Balanced in Count

Every provider card carries the same number of pros and cons, three and three by default. A con names a genuine limitation a buyer would feel: enterprise-only pricing, weeks-long onboarding, a missing watchlist. Reversed compliments ("so thorough it takes time to configure") destroy the page's credibility faster than a bad ranking, because they signal the whole list is paid.

### 7. Table Before Cards, Both From the Same Data

The comparison table comes first for scanners, ranked cards after for readers. Rank, provider, rating, price, and best-for appear in both, generated from the shared record. Give the table a caption naming what is compared, mark the row header cells, and set `font-variant-numeric: tabular-nums` on rating and price columns so figures align down the column.

### 8. Name the Regulatory Frame Explicitly

Compliance buyers verify against standards, so category pages cite them by identifier: ISO/IEC 30107 for presentation-attack detection, NIST SP 800-63 for identity assurance levels, GDPR and CCPA for biometric template handling, FATF for travel-rule pages. Cite only standards that genuinely govern the category, and never imply a provider is certified against one without a source.

### 9. Freshness Is a Claim Like Any Other

`Last verified Jul 24, 2026` asserts that someone checked on that date. Bump it when a re-verification actually happens, never on a copy edit or a deploy. A page whose prices are older than two quarters gets re-checked before it gets re-dated. Stale-but-honest beats fresh-looking and wrong.

### 10. Internal Notes Never Reach the Build

Editorial to-dos, pre-publish reminders, placeholder figures, and "pending verification" hedges are working artifacts. They live in the CMS draft state, a comment, or an issue, never in publishable body copy where a static build will render them. A page carrying an internal note is not a page with a typo; it is a page telling every reader its facts were never checked.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Rating differs between homepage, category table, and review page | Render all three from one provider record |
| "See Top 10" links to a page listing four providers | Label the CTA with the real count, or fill the list |
| Affiliate disclosure only in the footer | Add it above the first affiliate link, at body size |
| Sponsored label as a pale tint only | Add text and shape; verify it reads in grayscale |
| Price with no date | `From $99/mo` plus `Pricing verified: Jul 2026` |
| Third-party estimate presented as vendor pricing | Label `third-party estimate` inline, not in a footnote |
| Cons written as disguised compliments | Replace with limitations a buyer would actually weigh |
| Editorial note or `pending verification` in shipped copy | Move to draft state; block the publish |
| `Last verified` bumped on a copy edit | Only re-date after a real re-check |
| Star rating rendered as images with no text equivalent | Expose the numeric value in text and to assistive technology |
| Ratings and prices in proportional figures | `font-variant-numeric: tabular-nums` in tables and cards |
| FAQ answer contradicting the body copy | Single source both from the same fact record |

## Publishing

A page is finished when it passes every item in [pre-publish-check.md](references/pre-publish-check.md). Treat a failed provenance, disclosure, or internal-note item as blocking rather than advisory: those three are the ones that cost the site its standing.
