# NICE Actimize: fact re-check 2026-10-18

## Changed
- Ownership: "backed by publicly traded parent NICE Ltd, adding transparency and stability" → NICE Ltd owns the unit but has run a sale process since Nov 2025; Brookfield reported in exclusive talks at about $2B on 23 Sep 2026, not final (CTech, sources 6, 7, 15). Tagline, SEO description, verdict, what_is, FAQ and pro 3 updated.
- Founded 1999: confirmed (Israel Innovation Authority, source 4). Added: acquired by NICE in 2007 for about $280M (source 5).
- HQ Hoboken, NJ: confirmed from press release dateline (source 2, vendor).
- Regions "Global" → "70+ countries"; added "1,000+ organizations" (sources 1, 2).
- Parent ticker confirmed as Nasdaq: NICE (source 3). "NICE Ltd founded 1986" removed from FAQ (not checked on a page opened).
- CEO Craig Costigan: confirmed (source 8).
- Xceed: "integrated FRAML platform with graph-based ML analytics" → single AI platform for fraud and AML aimed at credit unions and community banks; vendor page does not mention graph analytics (source 12).
- WL-X, X-Sight Entity Risk, STAR, CTR: confirmed and descriptions aligned to vendor pages (sources 9 to 11).
- AML Essentials: confirmed still sold (TF Bank, Nov 2024, source 13); described as cloud AML suite for mid-sized institutions.
- Clients: Aberdeen Group (source 14) and TF Bank (source 13) confirmed.
- Pricing: confirmed not published; summary rewritten, pricing.verified 2026-10.
- Pros: "Entity-centric AI/ML depth trusted by tier-1 banks and regulators" → reworded without the unverified "regulators" claim; con "Custom, enterprise-only pricing" → "No published pricing; quotes only" (AML Essentials targets mid-sized firms).

## Removed / unverifiable
- DNB as a named client (no source found).
- "Trusted by ... government regulators" (no source found).
- User review theme counts ("frequently cited"); no G2 or Gartner page could be opened.
- No certifications were claimed on the old page and none are published; certifications left empty.

## Ranking cards
- `aml/banks` (Best for Legacy Core Integration):
  - Pro "Widest track record integrating with legacy core banking": superlative not supported by any source found. Suggest "Long track record with large banks; over 1,000 organizations use it (vendor)".
  - Pro "Broad rail coverage including SWIFT": not confirmed. WL-X page mentions real-time payment screening and an ISO 20022 parser only. Suggest "Real-time payment screening with an ISO 20022 message parser".
  - Other lines (case management, long implementations, sales-only pricing) are consistent with sources.
  - Consider noting ownership uncertainty (pending sale) in the card copy.

## Score flag
- Possible change of ownership: NICE is selling Actimize and Brookfield is in exclusive talks (Sep 2026). Products are not retired and no deal is signed. The "public-company backing" rationale in the old pros no longer holds as stated. Flag for editorial review; score unchanged.

## Follow-up 2026-10-22

### Changed
- Ownership: no deal announced. NiCE press releases for August to October 2026 contain no Actimize sale or Brookfield announcement (source 20), the Q2 2026 results release does not mention Actimize, and the latest news found is still the 23 Sep 2026 report of exclusive talks (source 6). Verdict, what_is and FAQ now say no deal had been announced as of 22 October 2026; new fact "Sale announcement: None in NiCE press releases as of 22 Oct 2026" (source 20). Tagline and SEO description still accurate; unchanged.
- DNB: earlier pass removed it as unconfirmed → confirmed; DNB Norway selected X-Sight Enterprise (with SAM and Integrated Fraud Management), 2 Jun 2026 (source 21). Added to named clients in what_is. Same release confirms "over 1,000 organizations across more than 70 countries" and the Hoboken dateline.
- Certifications: [] → ISO/IEC 27001 and SOC 2 Type II, vendor_stated, scoped to the Actimize Insights Network product only (source 22).
- User ratings added: G2 4.1 from 25 reviews (listing titled NICE Actimize Xceed, source 23); Capterra 3.8 from 5 reviews (Actimize Platform, source 24).
- Capabilities block agrees with features and FAQ; no capability looks wrong.
- last_verified and updated → 2026-10-22.

### Removed / unverifiable
- Resolved notes removed: DNB client, "no certifications published", "no G2 page could be opened".
- Still open: ownership (pending sale); HQ Hoboken from datelines only (contact page did not open, no registry checked); certification scope limited to one product, no certificate opened.
- Praise/criticize themes kept as general statements; visible Capterra reviews (2016 to 2020) mention a steep learning curve but not deployment effort.

### Ranking cards
- `aml/banks` (Best End-to-End Financial-Crime Suite): no line is wrong. Con "Ownership in flux while NICE explores a sale of the unit" is still accurate. Optional sharper wording: "Ownership in flux: Brookfield reported in exclusive talks to buy the unit (Sep 2026), no deal announced".

### Score flag
- None new. Sale not announced or completed; products unchanged.

## v3.1 fields 2026-11-05

Rescore (not applied): 4.6 -> 3.6, scored weight 80% (pricing not disclosed).

Added:
- pricing.model: published none, minimum true, trial false (source 1)
- capabilities.ongoing_monitoring: partial, ongoing party screening, list change trigger not stated (9)
- capabilities.fuzzy_matching: yes (9); alert_explanation: yes, ActOne AI explanations (17); risk_scoring: yes (10); batch_screening: yes (9)
- integration.support_hours: yes, 24x7 hotline and email (25)
- track_record.ownership: pending_sale (6); incidents: none found since Nov 2024
- New source 25 (Support and maintenance)

Not disclosed: list_updates, pep_tiers, audit_trail, data_residency, docs_public, all SDKs, sandbox, no_code (X-Sight Studio is a DIY analytics environment, not stated as no code).

Score flags:
- Sale still pending: NiCE press releases to 4 Nov 2026 (incl. Q3 2026 results) show no Actimize sale announcement. Brookfield talks remain the latest report.
- Older: the Guardian Analytics (NICE Actimize unit) data breach of late 2022 and the Webster settlement of Oct 2024 fall before the Nov 2024 window; not recorded as incidents.
