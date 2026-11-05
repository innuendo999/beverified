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

### Update 2026-11-05: owner exports (Bing AI to 3 Nov, GSC last 28 days to 3 Nov, GSC Generative AI features)

**Correction.** The web-search check above does not reflect Google. GSC shows Google positions for the same queries: "veriff alternatives" 2.0, "cheapest kyc provider" 14.0, "kyc pricing" 21.5, "best aml software" 39.3, "sumsub alternatives" 26.2, "kyb providers" 21.0. Read section 2 as "not in the web-search tool's index", not "absent".

**Bing AI citations (5 Aug to 3 Nov 2026).** Avg per day: 966 (5 Aug to 3 Sep), 1,122 (4 Sep to 3 Oct), 940 (4 Oct to 3 Nov; 3 Nov is a partial day, 337). Last 8 full days avg 1,117 a day. Cited pages per day reached 33 to 36, the highest in the series. Bing classic search: about 100 impressions and 1 click a day.

**Google Search, last 28 days (7 Oct to 3 Nov) vs 28 days to 15 Oct.** Clicks 392 vs 106, impressions 86,210 vs 43,008, avg position 15.4 vs 16.2. Impressions rose from about 1,700 to 6,000 to 10,000 a day from 28 Oct. 3 Nov alone: 202 clicks (CTR 1.94%), not attributable from this export (queries are anonymised); check GSC with a date filter of 3 Nov.

**Google Generative AI features (AI Overviews / AI Mode), last 28 days.** 23,801 impressions on 158 pages, from about 400 a day to 2,600 to 3,600 a day from 28 Oct. Top pages: /providers/identity-verification/ 2,007, /providers/incode/ 1,316, /providers/kyb/ 1,251, /providers/veriff/ 1,228, /providers/liveness-detection/ 906.

**Glossary (live 29 Oct).** 62 term pages already in Search, 92 clicks, CTR 1 to 4%, the highest on the site.

**Low-hanging fruit (top 10 position, high impressions, near-zero clicks).**

| Query | Impr. | Pos. | Clicks |
|---|---|---|---|
| zyphe alternatives | 1,225 | 4.4 | 1 |
| whitelist meaning (+ whitelisted, whitelisting) | 1,337 | 5.5 to 7.3 | 0 |
| sumsub pricing | 274 | 5.2 | 0 |
| veriff alternatives | 268 | 2.0 | 0 |
| beverified.org alternatives | 256 | 5.1 | 0 |
| aiprise alternatives | 183 | 2.5 | 0 |
| veriff pricing | 140 | 6.4 | 0 |
| onfido pricing | 121 | 3.5 | 0 |

Pages with top 10 positions and CTR under 0.1%: /providers/veriff/ (pos 6.8, 3,247 impr), /providers/incode/ (5.4, 3,138), /providers/aiprise/ (6.5, 1,920).

**Gaps (impressions, position 20+).** /providers/aml/ 7,783 impr at 44.6 ("aml software" 51, "best aml software" 39, "aml compliance software" 66); "kyc providers" 21, "kyc vendors" 24, "kyc aml providers" 24, "identity verification providers" 27, "kyb software" 46, "ekyc solution" 21; "sumsub alternatives" 26; United Kingdom 8,271 impr at avg 27.6; /providers/age-verification/ at 24.5. Comparison queries with no page: "persona vs onfido vs sumsub", "simplified.id vs complyadvantage".
