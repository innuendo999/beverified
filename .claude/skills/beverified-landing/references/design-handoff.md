# Design and code handoff

The two tools are good at different halves of this work, and the handoff fails
in a predictable way: a layout explored on a canvas gets rebuilt from a
screenshot instead of from the decisions behind it.

## What belongs in Claude Design

Anything where the question is "what should this look like" and the answer is
still open:

- Ranked card composition, which is the hardest layout problem on the site:
  badge, name, rating, positioning line, meta, six list items, price, two
  actions, all competing at one level.
- How the comparison table degrades on a narrow viewport.
- Badge and sponsored-label treatment, including the grayscale check.
- The quick-answer block and the first screen generally, since the whole page
  succeeds or fails there.
- Empty and filtered states, which are usually discovered late and designed
  never.

Explore with realistic content, never lorem: real provider names, real
four-decimal-free ratings, the longest award line you actually use, and a
provider whose positioning line runs long. Ranked cards look fine until a
provider has a fourteen-word differentiator.

## What belongs in Claude Code

Everything structural, data-bound, and checkable:

- The shared provider record and the renderings that read from it. This is the
  fix for the ratings drifting between pages, and it is a code problem, not a
  design one.
- Schema markup, breadcrumbs, internal linking.
- Filters, sorting, jump navigation, and their states.
- Accessibility mechanics: heading order, table header association, accessible
  names for ratings, focus order through the cards.
- The pre-publish check, ideally as a script that fails the build.

## Crossing the boundary

Carry decisions, not pictures. When a card layout leaves the canvas, what moves
into the repository is: which tokens it used, the hierarchy it settled on, the
breakpoint where it changes, and the states it covers. A screenshot loses all
four and the rebuild guesses at each.

Two rules keep the handoff honest:

**Design against the real tokens.** Pull them from the repository first
(see `visual-system.md`) so the canvas is not inventing a palette the codebase
will have to reconcile later.

**Return to the data.** Whatever was explored visually, the built version reads
its content from the shared record. A card that looks right with hand-typed
numbers is the origin of every inconsistency this skill exists to prevent.

## A workable order

1. Confirm the facts first: which providers, which scores, sourced and dated.
   Design and code both depend on real content, and the content is the part
   that takes judgement.
2. Design the ranked card and the first screen against those real values.
3. Build the record and the renderings.
4. Layer filters, sorting, and schema.
5. Run the pre-publish check and fix what it catches.

Step 1 is the one that gets skipped, and skipping it is what produces a
beautiful page carrying a number nobody can source.
