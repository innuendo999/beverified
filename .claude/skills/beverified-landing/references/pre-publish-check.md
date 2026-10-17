# Pre-publish check

Run before any page ships. The first three sections are blocking: a failure
there is not a polish issue, it is a page making a claim it cannot support.

## Blocking

**Internal artifacts.** Search the built output, not the source, for editorial
notes, `TODO`, `TBD`, `pending verification`, `confirm before publish`,
placeholder prices, and lorem. A note that lives in a content field will be
rendered by a static build exactly like body copy. This check is worth
automating as a build-failing grep, because it is the one that embarrasses the
site publicly and the one nobody catches by reading their own draft.

**Provenance.** Every number on the page traces to a tier in
`claims-and-disclosure.md`. Walk the page and point at each figure: rating,
price, provider count, country count, percentage, founding year. Any that cannot
be sourced is removed, not softened.

**Disclosure.** An affiliate disclosure appears above or inside the first block
containing an affiliate link, at body size. Sponsored placements carry a label
on the card itself. No page contradicts the methodology page about whether
placement is sold.

## Consistency

- Each provider's rating matches everywhere it appears: homepage, category
  table, ranked card, review page.
- Prices match between the table and the cards.
- A CTA promising "Top 10" leads to a page with ten entries, or the CTA is
  relabelled.
- Stated counts match reality: providers compared, providers reviewed, countries
  covered.
- FAQ answers do not contradict body copy.
- `Last verified` reflects a real re-check, and nothing on the page is older
  than two quarters without one.
- Structured data matches what is rendered, with no rating in schema that
  differs from the visible one.

## Content quality

- Quick answer names a pick and a reason within the first screen.
- Byline names a real reviewer with their credential.
- Pros and cons are symmetric in count, and every con names a real limitation.
- Each card's positioning line distinguishes the provider from the one above it.
- The alternatives block on a provider page sends readers elsewhere where honest.
- Regulatory standards are cited by identifier and genuinely apply.

## Interface

- Comparison table has a caption, marked header cells, and tabular figures.
- Star ratings expose their numeric value as text and to assistive technology.
- Badges and pros/cons markers survive grayscale.
- Filter and sort controls have a written empty state.
- Heading order is sequential; each ranked card is reachable by keyboard in rank
  order.
- The table's narrow-viewport behaviour is deliberate and consistent sitewide.

For anything failing in this last section, hand off to the owning skill:
`better-layout`, `better-typography`, `better-colors`, `better-accessibility`,
`better-ui`, or `better-writing`.
