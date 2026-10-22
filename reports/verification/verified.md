# Verified: fact re-check 2026-10-18

Record: `src/_data/providers/verified.yml`

## Changed

- HQ: "Oslo, Norway" → "Stockholm, Sweden" (Verdane portfolio page, source 3). Offices in Solna, Oslo, Espoo and Bucharest (contact page, source 11).
- Founded: "Not disclosed" → 2012, Sweden (Verified about page, source 2; Verdane, source 4).
- Customers: 5,500+ confirmed on Verified's site (sources 1, 6). Staff: about 90 (source 2).
- Acquisitions dated: Assently and Pliance in spring 2023, GRC WATCH in April 2024; Verdane invested in spring 2023 (sources 2, 4, 5).
- Managed services: now described as "AML Managed Services, available for the Nordic market" with advisers and Verified taking on KYC administration (source 9).
- Pricing: no published prices; structure is setup fee + monthly licence (by number of customers and add-ons) + usage fees for signing and digital identification (source 8).
- Added certification: ISO/IEC 27001:2022, vendor-stated, valid until November 2027 per Verified (source 10).
- Features: PEP and sanctions lists within the EU, continuous monitoring, beneficial owner identification, risk assessment (source 6); Nordic eIDs, passport reader, SMS verification, eIDAS levels (source 7); due diligence and supplier assessment added (source 1).
- Con "Some company details (founding year) are not consistently public" → replaced with "Managed AML service is offered only in the Nordic market" (source 9).
- FAQ: acquisitions answer now has years; added a founding-year question.

## Removed / unverifiable

- "AI-powered contract management": "AI-powered" not found; now "Contract management".
- "Audit documentation consolidation" in managed services: not found; removed.
- User review themes ("frequently cited" all-in-one bundling, managed services, geographic focus, pricing clarity): no review platform profile could be opened; themes removed. `user_reviews.legacy_note` set to null.

## Ranking cards

No entries with `slug: verified` in `src/_data/rankings.yml` (the record's legacy rank claim "#2 in eKYC" is not backed by a ranking card).

## Score flag

None.

## Follow-up 2026-10-22

### Changed

- Rebrand: Verified launched a new brand on 19 to 20 Oct 2026 and verified.eu now redirects (302) to verified.io (sources 12, 19). `link.url` https://www.verified.eu → https://www.verified.io; `entity.same_as` updated the same way. Sources 12 to 21 appended; old verified.eu sources kept in place.
- Clients "5,500+ customers" → "6,500+ Nordic businesses" (source 12).
- Regions "Nordics and EU" → "Nordics (core markets Sweden, Finland, Norway)" (source 13).
- Founded 2012: re-sourced to the new company page (source 13). From: re-sourced to the AML product page (source 14).
- Pricing: summary "setup fee + monthly licence + usage fees" → "Pricing is not published; Verified quotes on request after a demo". The old AML pricing page now redirects to a product page with no pricing; setup, licence and usage items removed (source 14).
- Features: AML screening now "daily against PEP, sanctions and adverse media, risk reassessed on changes" (source 14); beneficial owners from official registers and risk scoring by own policy (source 14); eIDAS "levels of assurance" → simple, advanced and qualified (source 15); "Nordic electronic IDs" → Nordic and Baltic eIDs incl. BankID, MitID, Finnish Trust Network, Freja, Smart-ID (sources 15, 16); "Contract management, due diligence and supplier assessment" → GRC Due Diligence shared profile (source 17); "AML Managed Services" feature → LiveID phone identification (source 16).
- what_is: "5,500+ customers in the Nordics and EU and about 90 staff in Sweden, Norway, Finland and Romania ... Swedish office is in Solna" → "6,500+ Nordic businesses, core markets Sweden, Finland and Norway ... registered address is in Solna", plus the October 2026 rebrand (sources 12, 13, 19, 21).
- Verdict: removed "with a managed AML service for the Nordic market that pairs advisers with the technology".
- Pro "Managed AML service pairs advisers with the technology" → "Daily PEP, sanctions and adverse-media screening of every customer, with automatic risk reassessment" (source 14).
- Cons "Managed AML service is offered only in the Nordic market" → "Few public user reviews; G2 shows none for Verified AML" (source 20); "No published prices; costs combine a setup fee, a monthly licence and usage fees" → "No published prices; Verified quotes after a demo" (source 14).
- FAQ: cost answer updated; platform answer drops contract management; managed-services question replaced with "Which eIDs does Verified support?" (source 16).
- Certification "ISO/IEC 27001:2022" (source 10) → "ISO/IEC 27001", vendor_stated, certified since 2018 per the trust center (source 18).

### Removed / unverifiable

- AML Managed Services: launch post redirects and no current page mentions it.
- Pricing structure (setup, licence, usage fees): no longer published.
- Contract management, staff count (about 90), office list (Solna, Oslo, Espoo, Bucharest): not on the new site.
- ISO 27001 version and validity (2022, until November 2027): source page redirects.
- User ratings: G2 seller profile matches (verified.eu, Stockholm, 2012) but its 2 reviews (5.0) are for Assently E-Sign and Verified AML has 0; not added. No Capterra, Gartner Peer Insights or Trustpilot profile found.

### Ranking cards

- No `slug: verified` entry in `src/_data/rankings.yml`. Nothing to correct.

### Score flag

- Minor, for editor review: one pro (managed AML service) and the published pricing structure no longer hold after the October 2026 rebrand. Prices were never published, so the effect is likely small. Score unchanged.
