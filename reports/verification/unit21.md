# Unit21: fact re-check 2026-10-18

## Changed

- CEO: con "Recent CEO transition (2025)" → CEO change in April 2026; founding engineer Tyler Allen is CEO and co-founder Trisha Kothari moved to chair of the board (source 2).
- Customers: "200+ institutions incl. Chime, Green Dot, Sallie Mae" → 200+ customers incl. Chime, Green Dot, Crypto.com (source 2); Sallie Mae and Intuit kept from homepage logos (source 1).
- Founded 2018 confirmed (source 2); San Francisco HQ from the Series C release (source 3).
- Funding: "$92M+ raised (Series A to C)" → $45M Series C (2022, led by Tiger Global), total not disclosed (source 3).
- AI features: "AI Suite runs the full lifecycle end to end, drafting regulator-ready narratives" → Detection Agent and Investigation Agent that review alerts and pre-populate SAR, STR, CTR, 314(a) and goAML filings (source 1).
- "Data-agnostic, any payment rail" → RTP, FedNow, ACH, cards and crypto (source 1).
- Pro "reported false-positive reduction of up to 93%" → attributed to one Nexo case study (source 1).
- Certifications added: SOC 2 Type I and Type II via Armanino, vendor-stated (source 4).
- User rating added: G2 4.6 from 31 reviews (source 5). Legacy note and "frequently cited" removed.
- Pricing: "modular subscription by capability" reduced to "not published, quoted on request" (pricing page did not load).

## Removed / unverifiable

- 90+ countries.
- $92M+ total funding.
- Clarence Chio as named co-founder.
- "Modular subscription by capability" pricing structure.

## Ranking cards

- Unit21 has no entry in `src/_data/rankings.yml` (no `slug: unit21`).

## Score flag

- None. Leadership change only (CEO to Tyler Allen, April 2026); product continues.

## Follow-up 2026-10-22

### Changed

- Customers: "200+, incl. Chime, Green Dot, Crypto.com" (FinTech Futures, source 2) → "180+ in 90+ countries, incl. Chime, Green Dot, Sallie Mae, Intuit" (Unit21 boilerplate in the 12 Oct 2026 Business Wire release, source 8). The Jul and Sep 2026 releases still said 200+; the latest vendor statement is used. Same change in seo.description, what_is, pros[1] and the "Who uses Unit21?" FAQ.
- 90+ countries: removed in the first pass as not found; now confirmed by source 8 and restored in what_is, the Customers fact and the FAQ.
- Co-founder: Clarence Chio restored as co-founder in what_is; Unit21's own Series B release names Trisha Kothari and Clarence Chio as co-founders (source 7, new).
- HQ fact: source 3 (2023 dateline) → source 8 (Oct 2026 release, San Francisco dateline).
- User review themes: replaced with themes visible on G2 today (source 5): praise for no-code customization and support; criticism of the learning curve for rule setup and the interface, and of case data and export issues. "Investigation automation", "Platform unification" and "Pricing transparency" were not visible as user themes and were removed.
- G2 rating re-checked: 4.6 from 31 reviews, unchanged.
- New sources: 7 (Unit21 Series B release, Jul 2021), 8 (Unit21 and Corelation release, Business Wire, Oct 2026).
- last_verified and updated → 2026-10-22.

### Removed / unverifiable

- Resolved notes removed: CEO change (vendor releases from Jul to Oct 2026 quote Tyler Allen as CEO), Clarence Chio, 90+ countries, Nexo 93% (homepage and /customers attribute it to Nexo).
- Funding total: Series A $13M (2020) and Series B $34M (2021) confirmed in source 7; with the $45M Series C disclosed rounds sum to $92M. Earlier funding not disclosed, so the fact still says total not disclosed (note kept).
- Pricing page still returns an error; pricing stays "quote on request" (note kept).
- New notes: customer count discrepancy (180+ vs 200+); SOC 2 still vendor-stated; capability identity_verification may be "no" rather than "add_on" (bring your own KYC/KYB data partner, no partner module named); Capterra has 0 reviews.

### Ranking cards

- `aml/banks` and `aml`, pros[1]: "Used by 200+ customers including Chime, Green Dot, and Sallie Mae" → "Used by 180+ customers, per Unit21, including Chime, Green Dot, and Sallie Mae".

### Score flag

- None.
