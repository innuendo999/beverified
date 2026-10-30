# GBG: fact re-check 2026-10-18

## Changed

- Index: "FTSE 250" → left the FTSE 250 effective 21 Sep 2026 (source 4); still listed on the LSE main market (since Oct 2025, source 8). Updated in verdict, pros, facts, FAQ.
- Revenue: "£282.7M in 2025" (that was FY25) → £285.0m for FY26, year to 31 Mar 2026 (source 2).
- Data network: "280+ sources, 190 countries, 4.4B+ people" → 110+ GBG Go modules across 195+ countries (source 5); identity data sourced in 50 countries (source 10).
- Trust Network: "400+ businesses across 80+ countries" → "powered by 1,000+ brands" (source 5).
- GBG Go: "80+ modules" → 110+ modules (source 5).
- Founding/HQ: 1989 and Chester confirmed via Companies House (GB Group plc 02415211, incorporated 21 Aug 1989, Chester Business Park, source 3).
- Employees: "roughly 1,100" → "more than 1,100 across 15 countries" (source 1).
- Acquisitions: added PCA Predict (2017, Loqate origin), IDology (2019), Acuant (2021) with years (source 8).
- Feature "Synthetic-identity detection" → fraud signals for application fraud, identity takeover and mule activity (GBG Trust module).
- Certifications added: UK DIATF register (3 GB Group PLC services, certified 14 Sep 2026, confirmed, source 7); ISO/IEC 27001:2022, SOC 2 Type 2, PCI DSS v4.0.1, Cyber Essentials Plus, FedRAMP Moderate (vendor-stated, source 6).
- Pricing: confirmed not published (source 5).
- User ratings: G2 (GBG Go) 4.0 from 1 review (source 9). Counts and legacy note removed from themes.

## Removed / unverifiable

- "280+ data sources", "190 countries", "4.4B+ people".
- Cloudcheck acquisition (not confirmed).
- "FTSE 250 constituent" (no longer true).

## Ranking cards

- GBG has no entry in `src/_data/rankings.yml` (no `slug: gbg`).
- Other records refer to GBG as "Public Data Network" / "publicly traded data-network provider", which is still correct.

## Score flag

- None under the spec criteria. Context for the editor: FTSE 250 exit in Sep 2026, a £73.1m impairment in FY26 and a weak trading update; the "stability" pro is weaker but the company and products continue.

## Follow-up 2026-10-22

### Changed
- FTSE 250 exit: source BusinessCloud (4) → LSEG/FTSE Russell September 2026 review, GB Group listed as a FTSE 250 deletion effective 21 Sep 2026 (11). Fact "Status" now cites 11.
- UK DIATF: "three services (IDscan Enterprise, Identify, oZone FYQ2) ... until September 2029" → five services (GBG Go, ID3global, Identify, IDscan Enterprise, oZone FYQ2), certified 14 Sep 2026, expiring 27 Sep 2029 (13). Updated in certifications and FAQ.
- FedRAMP Moderate: vendor_stated (Trust Centre, 6) → confirmed on FedRAMP Marketplace for Acuant, Inc. "Connect, Ozone, & Facial Recognition System (COFRS)", JAB, since 24 Nov 2021 (14). Name now "FedRAMP Moderate (Acuant COFRS)".
- Cloudcheck: previously removed as unconfirmed → confirmed, GBG acquired Verifi Identity Services (Cloudcheck), New Zealand, Feb 2022 (12). Added to the acquisitions FAQ.
- Pricing: "not published" → identity and fraud products still quoted (5); Loqate address products publish pay-as-you-go packs from £50, Address Verify 8.8p (£50 pack) to 5.0p (£1,000 pack) per lookup, excl. VAT (15). Updated summary, plans, items, FAQ, con 2 ("No published pricing" → "No published pricing for identity and fraud products") and the pricing review theme.
- Re-confirmed unchanged: GBG Go 110+ modules, 195+ countries, 1,000+ brands (5); 1,100+ staff in 15 countries (1); identity data in 50 countries (10); FY26 revenue £285.0m, CEO Dev Dhiman (2); G2 GBG Go 4.0 from 1 review (9).
- 2026 corporate changes: none found beyond the FTSE 250 exit (no bid, disposal or CEO change). Last acquisition found: DataTools (Australia), Oct 2025, not added.

### Removed / unverifiable
- Notes on the replaced 2026-10-18 figures, the founding year (Companies House and Wikipedia both give 1989) and FY26 revenue: resolved, removed.
- Still vendor_stated: ISO/IEC 27001:2022, SOC 2 Type 2, PCI DSS v4.0.1, Cyber Essentials Plus.
- Gartner Peer Insights shows no GBG reviews; Capterra's "GBG Digital Risk Management Intelligence Platform" listing (1 review) does not clearly match GBG Go and was not used.

### Ranking cards
- GBG has no entry in `src/_data/rankings.yml` (no `slug: gbg`). Nothing to correct.

### Score flag
- None.

## Follow-up 2026-10-30 (AML screening capabilities)

- identity_verification: yes. https://www.gbg.com/en/verify-identity/document-verification/ (source 20)
- sanctions_pep: yes. https://www.gbg.com/en/assess-risk/peps-and-sanctions/ (source 19)
- adverse_media: yes. https://www.gbg.com/en/assess-risk/peps-and-sanctions/ (source 19)
- transaction_monitoring: yes. https://www.gbg.com/en/products/transaction-fraud-and-aml/ (source 21; GBG Predator, a separate fraud and AML transaction monitoring product)
- No existing values changed (the four keys were empty). capabilities.checked stays 2026-10.
