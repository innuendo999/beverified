# Fraud 1.0 data pass, 27 Nov 2026

Ten candidate records (docs/scoring-fraud.md) were read against the vendor's own pages only: product pages, datasheets and brochures on the vendor's domain. Pages behind a login or form were not used. Each key carries `checked: '2026-11-27'` and a source added to the record. Batch: `scripts/fraud-data/batch-1.json`.

Rules applied:
- `yes`: the vendor's page describes a product, model or feature for it.
- `partial`: mentioned in passing or only part of it (for example real-time "detection" with no decision, behavioural signals but not biometrics, a sandbox but no backtesting). Earns nothing.
- `not_disclosed`: nothing found on the pages checked. Earns nothing.
- Customers' own data or models: `yes` when the customer can train on its own outcomes, import models or feed its own data sources into rules or models; vendor in-house models alone are not enough.
- Pricing: for the fraud product, not the vendor's other products (ComplyAdvantage publishes screening prices; its fraud product is quoted).

Open points for the owner:
- Hawk's fraud page is served at hawk.ai/de/node/360 (English content); hawk.ai/solutions/fraud returned an error.
- NICE Actimize, Quantexa and ComplyAdvantage name no bank customer on the pages checked; their other pages may.
- All ten pass eligibility, so the first ranking lists all ten. NICE Actimize keeps its pending-sale status (no ownership point).

Scores: `reports/rescore-fraud-1.0.csv` (`node scripts/rescore-fraud.mjs`). No `category_scores` written yet.
