# complead: new review 2026-10-23

New record `src/_data/providers/complead.yml` at `/providers/complead/`. It reviews complead as the whole AML and fraud platform. Sanction Scanner keeps its own review at `/providers/sanction-scanner/` as complead's screening product. Proposed score 4.0 (Good), weighted from the six rubric criteria in `score_breakdown`; the owner confirms. `link.type: null`, `legacy_rel: nofollow sponsored` (as other AML records). Logo: owner-supplied wordmark `/assets/img/wordmarks/complead.png`; `alternate_names: []` per owner (template renders `alternate_names[0]` as "now <name>").

## Sources opened (23 Oct 2026)

- complead.ai: homepage (1), rebrand post by Fatih Coşkun dated 21 Sep 2026 (2), company (3), platform / Fusion (4), product pages for client screening (5), adverse media (6), transaction monitoring (7), KYB and UBO (8), customer risk assessment and KYC (9), fraud (10), payment screening (11), Agentic AML-Risk Ops (12), Nova AI (13), integrations (14), Trust Center (15, plus the owner's screenshot), data protection (16), terms updated 22 Sep 2026 (19), contact (20), careers (21), blog index, Deloitte post (35), Chartis post (36), Hepsiburada post (38). complead.ai/pricing does not load.
- Certificates: ISO/IEC 27001:2022 PDF (17) and ISO 9001:2015 PDF (18).
- sanctionscanner.com: pricing (22), homepage (23); developer.sanctionscanner.com API general info (24).
- Companies House: SANCTION SCANNER LTD 12804192 overview (25), PSC (26), officers (27); company search for "complead" (no results) and "sanction scanner". Filing history did not load.
- Ratings: G2 product and seller pages (28), Capterra (29). Gartner Peer Insights "complead fusion platform" did not load.
- Press and third party: Foreks 13 Oct 2026 (30), Paradergi 1 Oct 2026 (31), Dünya 19 Oct 2026 (32), Mastercard Lighthouse Türkiye release 2024 (33), CB Insights (34), Chartis RiskTech100 2027 ranking page (37), Deloitte Technology Fast 50 Türkiye page.
- Direct downloads from complead.ai and Companies House are blocked by the egress proxy; all pages and both PDFs were read through the web fetcher.

## Facts

| Fact | Value | Evidence |
|---|---|---|
| Rebrand, not acquisition | Founder's post: Sanction Scanner "continues under complead", "No disruption, no migration, no contract change" | Vendor (2); press agrees (31, 32); owner confirmed |
| Rebrand date | September 2026 (post dated 21 Sep; Deloitte post says "On 28 September 2026 we changed our name") | Vendor (2, 35) |
| Name styling | lowercase "complead" on its own site; G2 and press write "Complead" | Vendor (1) |
| Founded | 2019 (founder bio on 2, also 38 and CB Insights); 2020 on company and careers pages, G2, Dünya | Vendor, conflicting |
| HQ | London ("made London our headquarters", 2020); offices London, New York, Istanbul | Vendor (2, 20) |
| Legal entity (site terms) | complead Inc., a Delaware corporation, Wilmington registered agent | Vendor (19); Delaware register not checked |
| UK company | SANCTION SCANNER LTD, 12804192, active, incorporated 11 Aug 2020, 27 Old Gloucester Street, London; no previous names; no company named complead at Companies House | Independent (25) |
| Director | Fatih Coskun, only officer, appointed 11 Aug 2020 | Independent (27) |
| Ownership | Fatih Coskun, 75% or more of shares and votes | Independent (26) |
| Funding | Founder: no outside investment, shares held by founders and employees (Dünya). CB Insights still lists TT Ventures and Mastercard Lighthouse Türkiye (accelerator) | Vendor via press (32); third party (34); Mastercard release shows acceleration only (33) |
| Clients | 800+ companies in 80+ countries | Vendor (3) |
| Screening data | 3,000+ lists, 220+ countries, 15-minute refresh | Vendor (5); other pages say 3,500+ |
| KYB | 160+ countries checked | Vendor (8) |
| Adverse media | 30+ languages | Vendor (6) |
| IDV | Not offered; "handled by your IDV provider"; 7 IDV integrations listed | Vendor (9, 14) |
| Hosting | Microsoft Azure; EU, UK or Türkiye region | Vendor (16, 15) |
| Deloitte Fast 50 Türkiye | 2022, 2023, 2024, 2026 | Press (30) and vendor (35); Deloitte page did not list 2026 yet |

## Pricing

- complead publishes no platform pricing (no pricing page; homepage only offers demos and sandbox keys).
- Sanction Scanner (complead's screening product) publishes Starter: €990, 100 entities per month, monthly or annual billing, two months free on annual, overage at unlisted "standard rates". Enterprise: custom, unlimited entities, adds transaction monitoring, customer risk assessment, SSO, enterprise API. No free trial mentioned. No third-party price found.
- `capabilities.published_pricing: partial` (only the screening Starter plan).

## Certifications

| Name | Status | Detail |
|---|---|---|
| ISO/IEC 27001:2022 | confirmed (PDF opened) | D36249W, holder SANCTION SCANNER LTD, scope computer programming activities, issued 02.07.2026, valid to 01.07.2027. Certification body not named in the PDF text |
| ISO 9001:2015 | confirmed (PDF opened) | D36248W, same holder, scope and dates |
| SOC 2 Type II | vendor_stated | Trust Center: report under NDA, no date; not seen |

## Unresolved

- Founding year 2019 vs 2020 on complead's own pages (kept 2019 to match the Sanction Scanner record).
- Careers page calls the UK entity "complead Ltd"; Companies House shows only SANCTION SCANNER LTD with no name change. complead Inc. (Delaware) and the New York entity not checked in a US register.
- Companies House overview still shows the confirmation statement due 24 Aug 2026 (last dated 10 Aug 2025), without an "overdue" label; filing history did not load. Re-check.
- ISO certification body not named; no register entry found.
- SOC 2 Type II report not seen.
- Gartner Peer Insights page not readable; complead shows 5.0 on its homepage and 4.8 on its company page. complead's company page shows G2 4.7, homepage 4.8; G2 itself shows 4.8 from 70.
- Chartis RiskTech100 2027 "Disruptor" claim: vendor-stated only; Chartis ranking page is paywalled. Not used in the rendered copy.
- No complead-branded public API reference; the public docs are Sanction Scanner's screening API only.
- Brand colour not read (no CSS reachable); logo is the owner's wordmark.
- Trust Center details beyond what the fetcher returned come from the owner's screenshot.

## Score (proposal)

| Criterion | Weight | Sub-score | Weighted |
|---|---|---|---|
| Compliance & certifications | 25 | 4.2 | 1.050 |
| Coverage | 20 | 4.3 | 0.860 |
| Pricing transparency | 20 | 3.4 | 0.680 |
| Integration & API depth | 15 | 3.9 | 0.585 |
| Support responsiveness | 10 | 4.2 | 0.420 |
| Track record | 10 | 4.0 | 0.400 |
| Total | 100 | | 3.995, shown 4.0 (Good) |

Calibration:
- Compliance 4.2: above IDMERIT (3.8, badges only), Zyphe (3.4, nothing certified) and RelyComply (3.4), because two ISO certificates were opened. It is not higher because the issuing body is not named and SOC 2 is NDA-only.
- Coverage 4.3: just above Zyphe and RelyComply (4.2), because it covers screening, adverse media, TM, payment screening, fraud and KYB. It is held back by the lack of IDV and inconsistent counts.
- Pricing 3.4: between RelyComply (3.0, nothing published) and IDMERIT (3.5). Only the screening plan is priced, not the platform it is reviewed as.
- Integration 3.9: below Zyphe (4.4, full public reference, SDKs, sandbox docs) and close to TRP (4.0). The integrations page is broad, but the public docs cover only screening.
- Support 4.2: above IDMERIT (3.8), based on Capterra customer service 4.9 from 27 reviews and phone lines. There are no published hours or SLA.
- Track record 4.0: above Zyphe (3.6) and IDMERIT (3.5). It has an active UK company since 2020, is founder-owned, has four Fast 50 listings and no actions found. It loses a little for the weeks-old rebrand and entity and founding-year inconsistencies.

Note for the owner: the Sanction Scanner record is 4.3 (legacy score, no breakdown). The platform scores lower mainly on pricing transparency and API documentation, which are weaker for the platform than for the screening product.

## How this page differs from the Sanction Scanner review

- Subject: complead the company and Fusion platform (screening, adverse media, TM, payment screening, fraud, KYB, risk scoring, case management, AI agents). The Sanction Scanner page covers sanctions, PEP and adverse media screening.
- Pricing: this page says the platform is quoted and shows the screening plan only as the one published entry point. The Sanction Scanner page leads with Starter and Enterprise.
- Facts: adds the complead Inc. Delaware entity, the Companies House UK company and PSC, founder ownership and funding, Azure hosting.
- Capabilities: transaction monitoring is `yes` here (platform product), `add_on` on Sanction Scanner (Enterprise plan).
- Alternatives: Hawk AI and Unit21 (platform rivals) plus ComplyAdvantage. `choose_instead` sends screening-only buyers to Sanction Scanner.
- FAQ includes "Is complead the same as Sanction Scanner?" and the AI agent question.

## Ranking cards

- No `slug: complead` entries in `src/_data/rankings.yml` (not edited). Suggest adding complead to the `aml` ranking when the owner confirms the score.

## Notes for other records (not edited)

- `sanction-scanner.yml` user_ratings shows G2 69 reviews; the same G2 listing (now "Complead (formerly Sanction Scanner)") shows 70 on 23 Oct 2026.
- `sanction-scanner.yml` capabilities.deployment note says "Hosting regions EU, UK and Türkiye"; the data protection page (16) also names Microsoft Azure.
