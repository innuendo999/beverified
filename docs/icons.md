# Icon library

One set of icons for every page: reviews of all categories, rankings, hubs, blog, news, incidents.
Source: `src/_lib/icons.js`. Preview: `npm run icons` writes `design/icons.html` (not deployed).
Check: `node scripts/checks/icons.mjs` (in `npm run check` and CI).

## Use

```njk
{% icon "liveness" %}                          {# decorative: aria-hidden #}
{% icon "screening", "AML screening" %}        {# meaningful on its own: role="img" + aria-label #}
{% iconFor "category", "kyb" %}                {# by meaning: rankings key, article section, evidence level #}
{% icon "check", "", 16, "i--16" %}            {# size attribute and extra class #}
```

Sizes: `.i` scales with the text (1.25em); fixed sizes `.i--16`, `.i--20`, `.i--24`, `.i--32`.
`.i-tile` puts an icon in a 40px blue-tint square (category lists, hubs).

Meaning maps (`MAP` in the module):
- `category`: every key in `rankings.yml` (region rankings use `location`). A new ranking fails CI until it gets an icon.
- `section`: article `section` (news, guide, publications, compare) plus incidents and glossary.
- `evidence`: Independent → `lab`, Vendor-stated → `vendor-stated`, User-reported → `star`, Hands-on → `hands-on`.

## Rules

- 24 x 24 grid, about 2px padding, stroke only, round caps and joins. Width comes from CSS (1.75; 1.5 at 32px).
- Colour comes from the text (`currentColor`). Never bake a colour into an icon.
- Green (`--ok`) only around an icon that marks a confirmed check, never as decoration.
- An icon next to a text label is decorative (no label). An icon alone needs a label.
- No emoji, no icon fonts, no third-party icon CDNs (the site makes no third-party requests).
- One idea per icon. Before drawing a new one, check the set: a second icon for the same idea splits meaning.
- Icons support the text; they never replace a word a reader needs, and never stand in for a fact (no "certified" badge without a confirmed certificate in the record).
