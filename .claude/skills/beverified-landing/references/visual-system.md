# Visual system

This file does not define a palette or a type scale. BeVerified already has
one, and inventing a second is how a site drifts. What follows is how to find
the real tokens and what this content type demands on top of them.

## Extracting the tokens

Before styling anything new, read the existing system out of the repository in
this order, and stop at the first that exists:

1. Design token files: `tokens.json`, `theme.ts`, `tailwind.config.*`, or the
   `@theme` / `:root` custom property block in the global stylesheet.
2. An existing provider card or comparison table component. This is the highest
   value source, because it encodes decisions already made about density,
   radius, and rating rendering.
3. Computed styles from a live page, as a last resort, recorded as explicit
   tokens rather than copied as one-off values.

Add a new token only when no existing one fits, and name it for its role rather
than its appearance. `better-colors` owns naming and palette structure;
`better-typography` owns the scale.

## What this content type demands

**Tabular figures everywhere numbers align.** Ratings, prices, and rank numbers
sit in columns and in repeated cards, so proportional digits make them visibly
ragged. Set `font-variant-numeric: tabular-nums` on the table, the rating, and
the price. `better-typography` owns the rest of the type behaviour.

**Star ratings need a text equivalent.** A row of star glyphs or SVGs is
decorative; the claim is the number. Render the numeric value in text next to
it, hide the decorative stars from assistive technology, and give the whole
rating an accessible name that includes the scale, so it reads as a value out of
five rather than a count of shapes. `better-accessibility` owns the mechanics.

**Badges must survive grayscale.** Rank badges, `Editor's Choice`, `Most
Popular`, and above all `Sponsored` cannot rely on hue alone: colour-blind
readers, printed pages, and screenshots all flatten it. Each needs text plus one
non-colour signal, a border or a shape. Contrast is `better-colors`.

**Pros and cons need a non-colour distinction too.** Green and red ticks and
crosses are the default and the default fails. Keep the headings, keep distinct
glyph shapes, and let colour be the third signal rather than the only one.

**Card density is a scanning problem.** A ranked card carries a badge, a name,
a rating, a positioning line, two meta fields, six list items, a price, and two
buttons. That is a lot of elements competing at one level, so the hierarchy has
to be explicit: name and rating dominant, positioning line secondary, pros and
cons tertiary, meta quietest. Group with space rather than internal separators;
`better-layout` owns the ratios.

**Two calls to action per card, ranked.** The outbound visit and the internal
review link are not equals. Give one primary treatment and the other secondary,
consistently across every card, and never make the affiliate link the only
obvious action: a page where the internal review is hard to find reads as a
funnel rather than a comparison.

**The comparison table has to survive narrow viewports.** It carries six columns
of mixed content. Decide deliberately between horizontal scroll with a sticky
first column and a stacked card rendering, apply the same choice everywhere, and
keep the header association intact either way.

## Motion

Restraint. Filters and sorting change the list under the reader, so any
transition there is functional rather than decorative: it exists to show that
the set changed, and it should be short and interruptible. Rank cards do not
need entrance animations; a ranking that animates in reads as promotional.
`better-ui` owns the recipes and `better-accessibility` owns the reduced-motion
requirement.
