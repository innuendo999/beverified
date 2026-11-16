# News pipeline (AML and KYC news)

Set up 2026-11-16. Three steps, and only the first one is automatic end to end:

1. **Collect (GitHub Action "News candidates", daily 04:17 UTC).** `scripts/news/collect.mjs` reads the sources and rules in `scripts/news/sources.yml`, sorts every item into a route and writes `news/candidates.json`, `news/skipped.json`, `news/seen.json` and `news/latest.md` to the `news-candidates` branch. That branch never deploys. The run summary in Actions shows `latest.md`.
2. **Draft (scheduled Claude task).** Picks one open candidate, opens the primary source, writes the article to `docs/article-spec.md`, runs humanizer, invisible-characters and the beverified-landing pre-publish check, and opens a PR. It never merges.
3. **Publish (owner).** The owner reviews and merges the PR; the normal deploy runs.

Nothing in this pipeline publishes on its own. Google treats unreviewed generated news as scaled content abuse, and our rule is that no fact ships without a primary source someone opened.

## Owner decisions (2026-11-16)

- A fine gets its own news item only from **USD 5M**. Smaller fines go to the monthly digest. EUR, GBP and CHF amounts are compared at face value; other currencies are flagged `check_amount`.
- **No funding rounds**, unless the round changes who owns the provider.
- Focus **US, UK, EU**. Other regions appear only through FATF; a story from elsewhere goes to the digest.
- **EBA, MAS and Ofcom are skipped**: our tools could not read their sites.

## FATF

The FATF site answers the Action with HTTP 403 (checked 2026-11-16), so its listing source is off (`enabled: false`). We do not spoof a browser to get past bot protection. FATF items are found through Google News (`gnews-fatf`): plenary outcomes, lists and guidance go to `news`, mutual evaluations and typologies to `digest`. The drafting task opens the FATF page itself as the primary source.

## Routes

| Route | What happens |
|---|---|
| `news` | Candidate for a news article (`src/news/<slug>.md`). |
| `incident` | Incident, lawsuit or regulatory action at a provider in our records. Goes to `src/_data/incidents.yml` under the incident tracker rules (primary source, allegations labelled, vendor response), not to the blog by default. |
| `record-check` | Possible change to a provider record (ownership, certification, price). The task proposes the record change in a PR with sources; `last_verified` changes only after a real re-check. Ownership news can be both `news` and `record-check` (`also`). |
| `research-check` | Threat research (deepfakes, injection attacks). Kept only if a lab, regulator or academic paper is behind it, never vendor marketing. |
| `digest` | Smaller fines, routine sanctions designations, stories outside US/UK/EU. Collected for a monthly roundup. |
| `skip` | Funding, vendor marketing, no matching topic, older than 7 days, already a source on the site. Listed in `skipped.json` with the rule. |

Tier 2 sources (Biometric Update, Google News search for our providers, Google News search for fatf-gafi.org) are for discovery only: `needs_primary_source: true`. The article is written from the regulator, court or company announcement, or the candidate is dropped.

## Candidate status

The drafting task closes a candidate by setting `status` on its entry in `news/candidates.json` on the `news-candidates` branch:
`drafted` (with `pr`), `dropped` (with `reason`, e.g. no primary source), `digest` (moved to the roundup), `merged-with` (same story as another candidate id). The collector keeps open candidates and forgets everything after 90 days.

## Drafting task rules

- One article per run at most. Pick the first open `news` candidate by priority and date; if none, an `incident` or `record-check` candidate, as a PR against data, not an article.
- Open the primary source. If it does not confirm the story, set `status: dropped` with the reason and stop.
- Check the site first: if an article already covers the story, update its `## What has happened since` section instead of writing a new one.
- Front matter, body, internal links, cover and sources per `docs/article-spec.md`; `node scripts/checks/articles.mjs --file <file>` must pass; `npm run covers` for the cover.
- Copy: humanizer (meaning unchanged), invisible-characters, beverified-landing pre-publish check. No em or en dashes.
- Branch `news/<slug>`, PR to `main`, never merge.

## Changing sources or rules

Edit `scripts/news/sources.yml`. Test offline with fixtures:

```
node scripts/news/collect.mjs --state /tmp/news-state --fixtures <dir> --now 2026-11-16T06:00:00Z
```

`<dir>` holds `<source-id>.xml` or `.html` files (`gnews-providers-<batch>.xml` for Google News batches). Rules are tried top to bottom; the first match wins, so put narrow rules (funding, provider events, sanctions, enforcement) above broad ones (regulation).
