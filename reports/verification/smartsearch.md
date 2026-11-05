# SmartSearch: fact re-check 2026-10-18

## Changed

- Ownership: "majority stake held by Triple PE (Fund I)" → Triple Private Equity majority stake since March 2024; founders kept a minority stake (source 3). Fund name not confirmed.
- Founded 2011 and founders Martin Cheek and John Dobson confirmed (source 3). Legal entity SmartCredit Limited, incorporated 2005, Ilkley (source 6).
- HQ: Ilkley, West Yorkshire confirmed via Companies House and press release footer (sources 2, 6).
- CEO Phil Cotter confirmed (source 2).
- Clients: "7,000+ clients, 60,000+ users" → "7,000+ regulated businesses" (source 1); users figure removed.
- Added: Credas Technologies acquisition, agreed Oct 2025, completed Jan 2026 (sources 4, 5).
- Certifications added: UK DIATF register entries for SmartDoc Advanced with Facial Recognition and Fraud Check (SmartCredit Limited, 4 Mar 2026 to 4 Mar 2029) and Credas Connect (10 Sep 2025 to 10 Sep 2028), both confirmed on the GOV.UK register (sources 7, 8).
- Features: "24-hour integration" replaced with SmartDoc facial-recognition check and KYB checks; daily Dow Jones WatchList updates and nightly monitoring added (source 1).
- Pro "Fast reported integration timeline (24 hours)" → DIATF-certified SmartDoc plus Credas Connect.
- Cons reworded: international checks do exist (200+ countries for KYC per homepage); SmartDoc offers facial recognition.
- Pricing: confirmed not published (source 1).
- User review legacy note and "frequently cited" label removed; no rating page found.

## Removed / unverifiable

- 60,000+ users.
- 24-hour integration timeline (verdict, features, pros, praise theme).
- "Triple PE Fund I".
- NameScan alternative `best_for: "—"` set to null (dash check).

## Ranking cards

- SmartSearch has no entry in `src/_data/rankings.yml` (no `slug: smartsearch`).

## Score flag

- None. The Credas acquisition adds capability; no product retired.

## Follow-up 2026-10-22

### Changed

- Pricing: "Pricing is not published; SmartSearch quotes on request" with one "Quote / Custom" plan → three published tiers without prices: Starter Compliance, Growth Compliance, Enterprise Compliance, each with price "Not publicly disclosed" and the page's "Commonly used solutions" (source 9). Summary now says pricing is modular and quoted on request. Published-pricing item now cites the pricing page (source 1 → 9).
- Pricing item added: ongoing monitoring is listed among commonly used solutions for the Enterprise Compliance tier (source 9). The page does not say tiers are cumulative or exclusive, so the record says "listed under", not "Enterprise only".
- Feature "Ongoing monitoring, with KYC checks re-run every night." → adds that the pricing page lists ongoing sanctions, PEP and adverse media monitoring under Enterprise Compliance (sources 1, 9).
- FAQ "How much does SmartSearch cost?" → names the three unpriced tiers and that monitoring sits under Enterprise Compliance (source 9).
- Legal entity: ICO data protection register entry Z1108931 lists Smart Credit Limited (Ilkley) with the trading name SmartSearch (new source 11). Added to the what_is sentence on the registered company; resolves the "no trading-name page opened" note.
- User ratings: [] → G2 5.0 from 1 review, checked 2026-10 (new source 12). Capterra UK shows 0 reviews; not added.
- Praise themes reworded from "reviewers highlight" / "users value" to plain product statements, since only one public review exists.
- New source 13 (help-centre FAQ) cited in notes for the older 6,500 clients / 60,000 users figure.

### Removed / unverifiable

- Kept unresolved: founding year 2011 vs company incorporation 2005; "Triple PE Fund I" name (Investec deal page did not load); transaction screening has only a homepage line.
- Not used: Capterra UK "from US$500 per user" starting price (vendor publishes no prices); help-centre FAQ "60,000 users" (sits beside an older client count).

### Ranking cards

- `aml` entry (slug: smartsearch): no text is wrong. Optional, for precision: con "No published pricing" → "No published prices; tiers are listed without prices". `legacy_price_shown: Not published` is still accurate.
- Correction to the 2026-10-18 section: SmartSearch does have an entry in `src/_data/rankings.yml` (category `aml`).

### Score flag

- None.

## v3.1 fields 2026-11-05

Added (key: status, source):
- pricing.model: published none, minimum null (unknown), trial false (demo only); source 9
- capabilities.kyb_registry: yes (Companies House), 17 (new); kyb_ubo: yes, 17; kyb_entity_screening: yes, 17; kyb_documents: yes, 17; kyb_monitoring: yes (ongoing UBO monitoring), 1
- capabilities.ongoing_monitoring: yes (nightly re-screening), 14 (new)
- capabilities.list_updates: yes (Dow Jones Watchlist updated daily), 14
- capabilities.pep_tiers: yes (relatives and close associates), 14
- capabilities.fuzzy_matching: partial (fuzzy matching stated, thresholds not), 14
- capabilities.audit_trail: yes, 14
- capabilities.risk_scoring: yes (customisable risk assessment, rule based workflows), 15 (new)
- integration.no_code: yes (SMS link for client document checks), 16 (new)
- integration.support_hours: yes (phone, weekday office hours), 1
- track_record.ownership: changed_disclosed (Triple Private Equity majority stake, 2024), 3; incidents: none found. The Credas acquisition (completed per BIIA, source 5) is a purchase by SmartSearch, not a change of its owner.

Not disclosed: alert_explanation, batch_screening (a "120 clients onboarded in bulk" caption only), data_residency, docs_public (integrations page links no public API reference), sdk_web, sdk_ios, sdk_android, sandbox.

Rescore: 4.4 -> 4.3 (scored weight 80%; pricing n/d). Score flag: none.
