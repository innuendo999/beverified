# AI-citation log

Monthly log of how often beverified.org is cited by AI search and which sources answer our buyer queries. Data rows: `reports/ai-citations.csv`. Site content is never changed by this task; gaps are suggestions for the owner.

## 2026-11-05

### 1. Bing Webmaster AI citations

No new export. Latest file on `main`: `data/bing/ai-citations-2026-10-17.csv` (16 Jul to 15 Oct 2026, 92 days). This first run records it as the baseline:

| Metric | Value |
|---|---|
| Total citations | 84,037 |
| Average per day | 913 (min 10, max 1,874) |
| Cited pages per day | 2 to 35 |
| First 30 days, avg per day | 641 |
| Last 30 days, avg per day | 1,043, about 30 cited pages |

Trend: rising. Export requested from the owner (Bing Webmaster Tools > AI performance / citations, last 30 days, with cited pages). No newer Search Console export either (`data/gsc/` last updated 2026-10-22).

### 2. Buyer queries (web search, US index)

Method: one standard web search per query on 2026-11-05. The tool returns a ranked list of result URLs, not a generated AI answer, so "top cited domains" means the top-ranked sources an AI answer would most likely draw on. Treat as a proxy.

| Query | beverified.org | Top domains | Attributes compared that we lack or underplay |
|---|---|---|---|
| best AML software | No | ondato.com, capterra.com, shuftipro.com, tookitaki.com, g2.com | User-review ratings (G2/Capterra), segment lists (banks, accountants, SMB) |
| best KYB providers | No | infobelpro.com, kyckr.com, cybernews.com, gbg.com, dotfile.com, verificationatlas.pages.dev | Registry/data coverage by country, UBO data sources, buyer's-guide checklist |
| best identity verification companies | No | youverify.co, cbinsights.com, fullcircl.com, marketsandmarkets.com, globenewswire.com | Market share / analyst positioning, US focus |
| Sumsub alternatives | No | alternativeto.net, capterra.com, fitgap.com, gartner.com, getapp.com, costbench.com | Dedicated "alternatives" page, side-by-side price and rating per alternative |
| Veriff alternatives | No | getapp, alternativeto.net, seon.io, signzy.com, shuftipro.com, g2.com, gartner.com | Same as above; use-case split (fintech, marketplace, crypto) |
| cheapest KYC provider | No | didit.me, verificationatlas.pages.dev, complycube.com, hyperverge.co, dashdevs.com | Per-check price table on the ranking itself, free tier / minimums, cost calculator |
| age verification providers UK | No | mlex.com, biometricupdate.com, techradar.com, avpassociation.com, sourceforge.net | Ofcom Online Safety Act methods, ICO certification scheme, AVPA membership, UK-only list |
| KYC pricing | No | complycube.com, youverify.co, signzy.com, didit.me, costbench.com, verificationatlas.pages.dev | Pricing-model explainer (per check vs subscription vs outcome), high vs low risk pricing |
| Onfido vs Jumio | No | techjockey.com, trustradius.com, cbinsights.com, didit.me, g2.com, startwithidentity.com | Head-to-head comparison page (we have none) |
| travel rule compliance tools | No | coincub.com, notabene.id, scorechain.com, sumsub.com, fireblocks.io | Protocol interoperability (TRP, TRISA, IVMS101), VASP network size |

Control: a brand query ("beverified.org KYC providers ranking") also did not return beverified.org; only a third-party press release mentioning BeVerified (eznewswire.com, KYCAID). Worth checking indexation of the US results for the domain.

Competitor to watch: `verificationatlas.pages.dev` (static site with "Cite this page" blocks) appears for KYB, cheapest KYC and KYC pricing.

### 3. Content-gap suggestions (owner decides)

1. Comparison pages (planned `comparisons.yml`): start with Onfido vs Jumio, then Sumsub vs Veriff.
2. "Alternatives" landing for Sumsub and Veriff, fed by the existing alternatives data on review pages.
3. Age verification: a UK block on the existing category (Ofcom methods, ICO certification, AVPA), from verified sources only.
4. Cheap KYC and KYC pricing: surface Pricing Index figures and pricing-model explainer on the ranking; consider a cost calculator.
5. Travel rule: add protocol support (TRP, TRISA, IVMS101) as a capability column if provider records can source it.
6. Off-site: listings and mentions on review aggregators (G2, Capterra, Gartner) dominate "alternatives" queries; pursue citations, not imitation.
