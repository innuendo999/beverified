---
title: "UK Lifts the DAML Exemption Threshold From £1,000 to £3,000"
seoTitle: "UK Raises DAML Threshold to £3,000 | BeVerified"
seoDescription: "From 31 July 2025, UK firms can operate accounts and pay away funds under £3,000 without a DAML request. What changed, what did not, and the status in 2026."
lede: "Since 31 July 2025, UK banks, e-money and payment firms can process suspect transactions below £3,000 without asking the NCA for a defence against money laundering. The old limit was £1,000, and the duty to report suspicion has not changed."
section: news
published: 2025-07-22
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "SI 2025/877 raised both POCA section 339A thresholds from £1,000 to £3,000, in force from 31 July 2025."
  - "The operating account exemption covers deposit-taking bodies, e-money institutions and payment institutions; the exit and pay away exemption covers the whole AML regulated sector."
  - "Above £3,000 a DAML request to the UK Financial Intelligence Unit is still needed, and the section 330 duty to report suspicion is unaffected."
  - "In 2024 about 23,000 DAMLs were filed for amounts between £1,000 and £3,000, and 182 of them were refused."
topics: [DAML, Suspicious Activity Reports, UK AML]
provider_slugs: []
ranking_keys: [aml/banks, aml]
faq:
  - q: "What is the DAML threshold in the UK?"
    a: "£3,000 since 31 July 2025, for both the operating account exemption and the exit and pay away exemption in section 339A of the Proceeds of Crime Act 2002. It was £1,000 before that."
  - q: "Do firms still have to file a SAR for amounts under £3,000?"
    a: "Yes, where the section 330 reporting duty applies. The threshold only removes the need to ask for consent (a DAML) before dealing with the funds; it does not remove the duty to report suspicion."
  - q: "Who can use the £3,000 operating account exemption?"
    a: "Deposit-taking bodies, electronic money institutions and payment institutions, for transactions on an existing account. The exit and pay away exemption is open to any business in the AML regulated sector ending a customer relationship."
  - q: "Can the threshold change again?"
    a: "Yes. The Secretary of State can change it by order under section 339A(7). The Home Office said it would review the exit and pay away exemption in 2026."
sources:
  - title: "The Proceeds of Crime (Money Laundering) (Threshold Amount) (Amendment) Order 2025 (SI 2025/877)"
    publisher: "legislation.gov.uk"
    url: "https://www.legislation.gov.uk/uksi/2025/877/made"
    accessed: 2026-10
  - title: "Explanatory Memorandum to SI 2025/877"
    publisher: "Home Office, legislation.gov.uk"
    url: "https://www.legislation.gov.uk/uksi/2025/877/pdfs/uksiem_20250877_en_001.pdf"
    accessed: 2026-10
  - title: "Proceeds of Crime Act 2002, section 339A"
    publisher: "legislation.gov.uk"
    url: "https://www.legislation.gov.uk/ukpga/2002/29/section/339A"
    accessed: 2026-10
  - title: "Guidance on money laundering reporting obligations in relation to the DAML exemption provisions"
    publisher: "Home Office, GOV.UK"
    url: "https://www.gov.uk/government/publications/money-laundering-reporting-obligations/guidance-on-money-laundering-reporting-obligations-in-relation-to-the-daml-exemption-provisions-introduced-by-the-economic-crime-and-corporate-transpa"
    accessed: 2026-10
---

In July 2025 the UK government tripled the amount a firm can move or return without first asking for a defence against money laundering (DAML). The [Proceeds of Crime (Money Laundering) (Threshold Amount) (Amendment) Order 2025](https://www.legislation.gov.uk/uksi/2025/877/made) was made on 10 July 2025, signed by Home Office minister Dan Jarvis, and came into force on 31 July 2025.

## Why the Home Office raised it

A DAML is a request to the UK Financial Intelligence Unit (UKFIU) at the NCA for consent to do something with property the firm suspects is criminal. Small requests eat time on both sides and rarely lead anywhere.

The [explanatory memorandum](https://www.legislation.gov.uk/uksi/2025/877/pdfs/uksiem_20250877_en_001.pdf) gives the numbers. Between January and December 2024, firms submitted about 23,000 DAMLs for transactions between £1,000 and £3,000. Only 182 were refused, and those refusals kept £209,565 of assets from moving, around 0.1% of all assets denied through DAMLs that year. (Our original July 2025 story said 0.1% of requests were refused; the 0.1% figure is the share of denied assets, not of requests.)

A targeted consultation with high-volume reporters found all of them supported a threshold of at least £3,000, and the UKFIU backed that level. One respondent flagged the obvious risk: criminals splitting payments to stay under the line. The memorandum's answer is that firms can monitor for structuring, which puts the weight back on [transaction monitoring](/guide/transaction-monitoring-a-complete-guide/).

## How the £3,000 line works

The Order changes two numbers in [section 339A of the Proceeds of Crime Act 2002](https://www.legislation.gov.uk/ukpga/2002/29/section/339A):

| Exemption | Who can use it | Old threshold | From 31 July 2025 |
|---|---|---|---|
| Operating an account, s.339A(2) | Deposit-taking bodies, e-money institutions, payment institutions | £1,000 | £3,000 |
| Exit and pay away, s.339A(6A) | Any business in the AML regulated sector | £1,000 | £3,000 |

The operating account exemption dates from 2005, when it started at £250. A 2022 order lifted it to £1,000. The exit and pay away exemption arrived with the Economic Crime and Corporate Transparency Act 2023, also at £1,000.

Under the [Home Office guidance](https://www.gov.uk/government/publications/money-laundering-reporting-obligations/guidance-on-money-laundering-reporting-obligations-in-relation-to-the-daml-exemption-provisions-introduced-by-the-economic-crime-and-corporate-transpa), the exit exemption only applies once the firm has completed customer due diligence under the Money Laundering Regulations 2017. It also cannot be combined with the mixed property exemption in the same transaction.

## What stays the same

- Above £3,000, firms still need a DAML and either consent or deemed consent before they act.
- The separate section 330 duty to report knowledge or suspicion of money laundering is unaffected. A sub-threshold payment can still need a SAR.
- Sanctions screening and customer due diligence obligations are untouched by the Order.

For banks, the practical change is in workflow: fewer consent requests sitting in a queue, more reliance on internal rules to spot split payments and decide when a SAR is still due. Teams comparing monitoring and case management tools can start with our [AML software for banks](/providers/aml/banks/) ranking or the wider [AML ranking](/providers/aml/), or browse by country on our [regions hub](/regions/).

## What to check internally

1. Update DAML procedures and system thresholds from £1,000 to £3,000 for both exemptions.
2. Add or tune rules for structuring just below £3,000.
3. Make sure staff know that the exemption covers the consent request, not the suspicion report.

## What has happened since

As of 18 October 2026, the threshold is still £3,000. Legislation.gov.uk shows section 339A up to date with all changes in force on or before 15 October 2026, with the 31 July 2025 Order as the last amendment applied to it. The Home Office updated its DAML exemption guidance on 31 July 2025 to reflect the new amount.

The explanatory memorandum said the exit and pay away exemption would be reviewed in 2026 and that the UKFIU's SARs Annual Report would carry high-level DAML volume data. We did not find a published outcome of that review when we checked in October 2026. For a broader look at UK financial crime policy, see our piece on [the UK's financial crime crisis and digital verification](/news/the-uks-financial-crime-crisis-why-fintech-is-key-to-the-future-of-digital-verification/).
