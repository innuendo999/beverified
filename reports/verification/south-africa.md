# South Africa ranking page: verification report

Page: `/providers/south-africa/` (`src/_data/categories/south-africa.yml`, `south-africa:` in `src/_data/rankings.yml`)
Checked: 2026-10-21. All URLs accessed 2026-10-21.

Inclusion rule: reviewed providers only (record in `src/_data/providers/`), with a source showing a South Africa capability (SA ID documents, Home Affairs register check, FIC sanctions list, CIPC KYB, SA office or customers, local hosting). Order = record `score`, highest first. Scores, logos and links render from the provider records; `legacy_price_shown` copied from existing ranking cards, which match the record pricing.

## Ranked providers

### 1. Sumsub (record score 4.8), Editor's Choice
- **Non-doc SA ID check**: Sumsub docs list "South Africa SAID Verification" (`zaf_gov_id_docfree`), data source Government, input SA ID number + selfie, outputs include name, DOB, citizenship, deceased/minor flags, selfie match, coverage 97%; plus a "SAID Archive Verification" at 89%. Vendor-stated. https://docs.sumsub.com/docs/supported-countries-for-non-doc-identity-verification (page last modified 2026-10-08)
- **Launch**: Sumsub press release, 6 Dec 2023, non-doc verification in South Africa, Nigeria, Kenya and Ghana. Vendor-stated. https://sumsub.com/newsroom/sumsub-launches-non-doc-verification-in-africa-to-help-businesses-onboard-350m-users/
- **SA page**: names FICA and POPIA, says applicant data is stored "locally within your chosen region"; no SA office or named SA customers. Vendor-stated. https://sumsub.com/za/kyc-compliance
- Card con "non-document checks only in the custom plan" matches the record's pricing summary.
- **Open**: the SA page says "as little as $1.42 per verification", while the record and card say $1.35 (Basic plan). Not used; record value kept. The SA page also still cites Guidance Note 7, which Revised GN 7A replaced in Sep 2025 (not on the card).

### 2. Incode (record score 4.7), Best for Home Affairs Database Checks
- **DHA check**: Incode developer reference "South Africa" (System of Record): "connects to the National Population Register maintained by the DHA"; documents: Identification Card, Driver's License, Passport; verification type "Data and Face (Face Optional)"; endpoint `government-validation?countryCode=ZAF`; status live, v1.1, no date. Vendor-stated. https://developer.incode.com/general-reference/system-of-record-south-africa.md
- Liveness pro (iBeta Level 3) and cons come from the record.
- No SA customers or office found.

### 3. Shufti Pro (record score 4.6), Best for CIPC Business Checks
- Shufti South Africa page (modified 2026-09-29), all vendor-stated: "Shufti supports 12 South African document types" (Smart ID, green ID book, passport, driver's licence, residence permits); cross-referencing against the DHA; "Real-time screening against FIC sanctions lists"; "Automated verification of CIPC-registered companies, SARS tax identifiers, director and shareholding records"; deployment in "AWS Africa (Cape Town) region". Footer offices: none in South Africa. https://shuftipro.com/supported-countries/south-africa/
- Not independently tested. Price copied from existing card (`Free (10/mo); from $1.50/verification`), which matches the record.

### 4. Castellum.AI (record score 4.5), Best for FIC Sanctions Screening
- Castellum.AI knowledge base, section "List Coverage > Sanctions", article "South Africa FIC" describing the FIC Targeted Financial Sanctions list (first published 18 Aug 2021, marked updated, no date). Vendor-stated; placement under List Coverage is read as coverage. https://support.castellum.ai/hc/en-us/articles/4405293866900-South-Africa-FIC
- Castellum.AI South Africa sanctions guide confirms the TFS list is maintained by the FIC and that SA implements UN sanctions; it does not itself state product coverage. https://www.castellum.ai/global-sanctions-index/mena-africa/south-africa-sanctions-guide
- No SA ID verification, so the card says a second vendor is needed. Price: record says not published, card shows `Custom pricing` (same wording as other no-price cards).

### 5. RelyComply (record score 4.4), Best South African-Built Platform
- Offices: Johannesburg (Sandton) and Cape Town (Newlands), plus London; "remote first". Vendor-stated. https://relycomply.com/contact-us/
- Clients named in testimonials: Standard Bank, SnapScan; homepage article on CDD "at South African firms" under FICA. Vendor-stated. https://relycomply.com/
- goAML reporting module (UNODC tool). Vendor-stated. https://relycomply.com/goaml-regulatory-reporting/ . FIC uses goAML for registration and reporting (independent): https://www.accountingacademy.co.za/news/read/fic-upgrades-to-goaml-platform (3 Sep 2025)
- Cyber incident notice 16 Sep 2026, reported to the Information Regulator (ref SC20263150); "forensic investigation is ongoing", no later update. https://relycomply.com/relycomply-cyber-incident-what-happened-and-what-you-can-do/
- No DHA, CIPC or FIC list detail on its IDV page (https://relycomply.com/kyc-idv-user-verification/), so the card does not claim one.

## Candidates rejected

| Provider (score) | Why excluded |
|---|---|
| Trulioo (4.5) | Only evidence: legacy GlobalGateway v1 docs list "South Africa / ID" and "South Africa / Passport" as supported national ID types (https://developer.trulioo.com/reference/national-ids-supported-types-2, modified 2025-09-15), and a 2019 FICA blog post with no product detail. Field support is not proof of a register check. Borderline; add if Trulioo confirms an SA data source. |
| Signzy (4.4) | Has a "South Africa National ID" API that matches name, DOB and 13-digit ID against "national identity databases" (https://docs.signzy.com/us-apis/south-africa-national-id, no date). Real, but the record positions Signzy as India-focused (regions India, US, Middle East), so an SA card would sit against the record. Candidate for a later update. |
| GBG (4.5) | GBG GO "South Africa National ID" population registry check is marked "Coming soon!" (https://docs.go.gbgplc.com/docs/go-v1/digital-id-portal/supported-digital-ids/south-africa-national-id.md). Not live. |
| KYCAID (4.6) | Pricing page lists government number checks for 7 countries (UA, BR, MX, PE, KZ, IN, TR); South Africa not listed (https://kycaid.com/pricing/, https://kycaid.com/non-doc/). |
| Veriff (4.6) | No SA-specific page, document list or database check found; Capterra ZA listing has no SA detail. |
| Persona (4.6) | Database coverage only in the in-dashboard coverage map; no public SA evidence. |
| ComplyAdvantage (4.6) | No public page found stating FIC TFS list coverage or SA presence. |
| Onfido, Jumio, iDenfy, ComplyCube, SEON, Signicat, Regula | No South Africa-specific source found in this pass. Generic global document coverage was not counted. |
| Smile ID, LexisNexis, Facephi, Youverify, Didit, VerifyNow | Not reviewed by BeVerified (no provider record). Smile ID and Didit have detailed SA DHA documentation and are worth a review. |

## Regulatory facts used (page copy)

| Fact | Source |
|---|---|
| FIC Act is Act 38 of 2001; Schedule 1 amendments added CASPs | Baker McKenzie, Nov 2025: https://www.bakermckenzie.com/en/insight/publications/alerts/2025/11/south-africa-and-morocco-fatf-grey-list-exit-lessons |
| FIC Amendment Act 2017 signed 26 Apr 2017; provisions from 13 Jun and 2 Oct 2017; risk-based approach and full CDD | SAnews (government): https://www.sanews.gov.za/node/35248 |
| FSCA declared crypto assets a financial product, 19 Oct 2022 (General Notice 1350 of 2022) | Cliffe Dekker Hofmeyr, 20 Oct 2022: https://www.cliffedekkerhofmeyr.com/news/publications/2022/Practice/Finance/finance-and-banking-alert-20-october-2022-fsca-declares-crypto-assets-as-a-financial-product-.html |
| CASPs accountable institutions from 19 Dec 2022, item 22 of Schedule 1; FIC guidance PCC 57 | Afriwise: https://www.afriwise.com/blog/the-financial-intelligence-centre-publishes-final-guidance-for-crypto-asset-services-providers ; Webber Wentzel (Schedules effective 19 Dec 2022, Gazette 47596): link below |
| General Laws (AML/CTF) Amendment Act 22 of 2022: signed 22 Dec 2022; amends Companies Act, FIC Act, FSR Act, Nonprofit Organisations Act, Trust Property Control Act; commencement 31 Dec 2022 and 1 Apr 2023 (some TPCA sections later) | Webber Wentzel: https://www.webberwentzel.com/News/Pages/commencement-of-the-general-laws-anti-money-laundering-and-combating-terrorism-financing-amendment-act.aspx ; act number: https://lawlibrary.org.za/akn/za/act/2022/22 |
| FATF increased monitoring Feb 2023; removed 24 Oct 2025 | FATF statement, 24 Oct 2025: https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-october-2025.html |
| Revised Guidance Note 7A published 1 Sep 2025, replaces GN 7 (2017) and GN 7A (13 Feb 2025) | Moonstone: https://www.moonstone.co.za/fic-publishes-revised-guidance-note-7a/ ; Accounting Weekly |
| Prudential Authority within SARB, est. 1 Apr 2018; FSCA est. 1 Apr 2018 | SARB: https://www.resbank.co.za/PrudentialAuthority ; Mondaq: https://mondaq.com/southafrica/financial-services/688890/twin-peaks-regulators-established-and-the-commencement-of-certain-sections-of-the-fsr-act-2017 |
| FIC uses goAML for registration and reporting | Accounting Academy, 3 Sep 2025 (above) |
| TFS list: ongoing screening, freeze without delay; other lists risk-based | GoLegal: https://www.golegal.co.za/targeted-financial-sanctions/ ; SA implements UN sanctions: Castellum.AI guide (above) |
| POPIA Act 4 of 2013, enforced by the Information Regulator | Information Regulator: https://inforegulator.org.za/ |
| POPIA most provisions in force 1 Jul 2020, compliance by 1 Jul 2021 | DLA Piper: https://www.dlapiperafrica.com/en/south-africa/insights/2020/popia-effective-on-1-july-2020-are-you-ready.html |
| POPIA s26 lists biometric information as special personal information (exceptions in s27) | https://popia.co.za/section-26-prohibition-on-processing-of-special-personal-information/ |
| Smart ID card introduced 2013, replaces green barcoded ID book; 13-digit ID number | Wikipedia (citing IRB Canada): https://en.wikipedia.org/wiki/South_African_identity_card |
| Companies Act beneficial ownership changes from 1 Apr 2023; CIPC BO register, 5% threshold | Webber Wentzel (above); Baker McKenzie (above); Fasken, May 2023: https://www.fasken.com/en/knowledge/2023/05/cipc-reporting-requirements-update-who-is-the-beneficial-owner |

## Open questions / flags

- `quick_answer` contains Sumsub's score (4.8) as text, as requested. It is a hand copy of `providers/sumsub.yml` → `score`; update it if the score changes (or render it from the record in the template).
- Sumsub SA page price ($1.42) differs from the record ($1.35). Worth a Sumsub pricing re-check.
- RelyComply incident: forensic review ongoing; re-check the notice before release.
- Shufti, Incode and Sumsub SA claims are vendor-stated; none independently tested.
- Trulioo and Castellum.AI tie at 4.5; Trulioo excluded, so no tie-break was needed.
- The FIC website (fic.gov.za) did not load from this environment; FIC facts come from law-firm and trade sources.
