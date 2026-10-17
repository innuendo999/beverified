# Page anatomy

Section order for the two page types that carry the site. The order is not
arbitrary: each block answers the question the previous one raises, and a buyer
who stops at any point should still have a usable answer.

## Category page

The archetype is a "Top N <category> Companies in <year>" page. Sections in
order:

1. **Breadcrumb.** Home → category → page. Mark it up as an ordered list inside
   `nav` with an accessible name, and add `BreadcrumbList` schema.
2. **H1.** `Top <N> <Category> Companies in <Year>`. The N must equal the number
   of providers actually on the page.
3. **Quick answer.** Two or three sentences: the overall pick with the reason,
   one or two runner-up picks with the dimension each wins on, and a closing
   line naming what was compared and on which criteria. Bold the provider names
   only, not whole clauses.
4. **Byline and freshness.** Reviewer name with credential, then
   `Last verified <date>`. A real person; a category page with no named reviewer
   has no author to hold responsible.
5. **Stat strip.** Three figures: providers compared, one headline outcome
   metric with its qualifier, and the last-updated month. Every one derived, not
   typed.
6. **Comparison table.** Rank, provider, rating, price, best-for, link. Caption
   describing what is compared. See principle 7 in `SKILL.md`.
7. **Ranked provider cards.** One per provider, in rank order. Each carries: a
   rank badge with its award line (`#1 Editor's Choice`, `Best for Biometric
   Liveness`, `Most Popular`), provider name, star rating with the numeric value
   and its word grade, a one-line positioning statement, coverage and company-size
   meta, three pros, three cons, the entry price, and two calls to action
   (visit and read the full review). Give each card a stable `id` so the jump
   nav can target it.
8. **Explainer.** What the category covers, the capabilities buyers require, and
   how it differs from the adjacent category, with a link to that category page.
9. **Regulatory context.** Named standards only. See principle 8.
10. **Methodology link.** One line, pointing at the full rubric.
11. **FAQ.** Five to seven entries answering real search queries. Add `FAQPage`
    schema. Never let an answer contradict the body.
12. **Related categories.** Internal links to sibling category pages.
13. **Fallback CTA.** For buyers none of the list fits: a link to the full
    directory with the real total count.
14. **Footer.** Updated date, reviewer count, category and region navigation,
    affiliate disclosure.

Interactive layers that sit alongside rather than in the flow: a jump-to-provider
anchor list, region and company-size filters, a sort control (editorial rank,
highest rated, lowest price, name), a result counter, and a sticky top-pick
summary. All of them operate on the same shared record. If filtering can empty
the list, write the empty state; do not leave a blank region.

## Provider review page

1. **Breadcrumb** and **H1** (`<Provider> Review <Year>`).
2. **Quick verdict.** A short paragraph naming who the provider is for and what
   the trade-off is. Lead with the judgement, not the company history.
3. **Company facts.** Founded, headquarters, founders, offices, ownership
   changes. Every fact sourced; ownership changes matter to buyers and go stale.
4. **Features.** What the platform does, in buyer language.
5. **Pricing.** Published rates where they exist, clearly separated from
   third-party estimates, with the verification date. When pricing is sales-only,
   say so plainly and name it as a friction point if reviewers raise it.
6. **Pros and cons.** Sourced. When drawn from review platforms, name them and
   date the aggregation, and keep the editorial score visually separate from the
   aggregated user rating so the two are never read as one number.
7. **Alternatives.** `Choose <X> instead if <condition>` lines, each linking to
   that provider's review. This is the block that proves the page serves the
   reader rather than the advertiser.
8. **FAQ**, **related providers**, **footer** as above.

## Schema markup

Category pages: `BreadcrumbList`, `FAQPage`, and `ItemList` for the ranking.
Provider pages: `BreadcrumbList`, `FAQPage`, and a review type only when the
markup honestly reflects an editorial review with a stated rubric. Never emit
`AggregateRating` built from figures the site did not collect, and never mark up
a rating that differs from the one rendered on the page.

## Internal linking

Every category page links to each provider it ranks, to its adjacent category,
and to the methodology. Every provider page links back to each category it
ranks in. This is what makes the directory navigable and what keeps a buyer
inside the comparison rather than bouncing to a vendor site on the first click.
