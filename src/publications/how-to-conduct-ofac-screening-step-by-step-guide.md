---
title: "How to Conduct OFAC Screening: A Step-by-Step Guide"
seoTitle: "How to Conduct OFAC Screening: Step by Step | BeVerified"
seoDescription: "OFAC screening process, requirements and best practices for 2026: what to screen, when, how to clear alerts, and the 10-business-day reporting and 10-year records rules."
lede: "OFAC screening means checking customers, counterparties and payments against the US Treasury's sanctions lists before you deal with them, then blocking or rejecting anything that truly matches. This guide walks through the process step by step, with the reporting deadlines and record rules in force in October 2026."
section: publications
published: 2025-04-23
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "No regulation prescribes a specific OFAC compliance program, but US examiners expect a risk-based one, and OFAC's framework lists five components: management commitment, risk assessment, internal controls, testing and auditing, and training."
  - "Screen new customers before or shortly after account opening, screen payments before they are executed, and re-screen existing customers whenever OFAC changes its lists."
  - "Blocked property and rejected transactions must be reported to OFAC within 10 business days."
  - "Since March 2025, OFAC records must be kept for at least 10 years, up from five."
  - "OFAC's October 2026 Bank of America settlement shows that delayed list updates and badly ranked alerts lead to penalties even when the bank owns screening software."
topics: [OFAC, Sanctions screening, AML compliance]
provider_slugs: [complyadvantage, castellum-ai, sanction-scanner, namescan]
ranking_keys: [aml, aml/banks, crypto]
faq:
  - q: "What are the OFAC screening requirements?"
    a: "US persons must not deal with blocked parties and must block their property, report blocked property and rejected transactions within 10 business days, and keep records for 10 years. No rule spells out a specific screening program, but examiners and OFAC expect a risk-based one that includes list screening."
  - q: "What is the OFAC screening process?"
    a: "Collect identifying data, screen it against all OFAC lists, review each alert against secondary identifiers, escalate likely matches, then block or reject confirmed matches and report them to OFAC. Document every decision."
  - q: "What are OFAC screening best practices?"
    a: "Screen all OFAC lists, not only the SDN list; apply the 50 Percent Rule using ownership data; update lists promptly and re-screen existing customers; supervise and test alert rules; and keep an audit trail. These match the compliance points OFAC raised in its 2026 Bank of America settlement."
  - q: "How often should you run OFAC screening?"
    a: "At onboarding, before each payment that crosses your screening filter, and again whenever OFAC updates its lists. The FFIEC manual says lower-risk banks may compare their full customer base periodically, such as weekly, monthly or quarterly."
  - q: "Do crypto companies need OFAC screening?"
    a: "Yes. OFAC says sanctions compliance obligations are the same for digital currency and fiat transactions, and it adds wallet addresses to SDN entries."
sources:
  - title: "A Framework for OFAC Compliance Commitments"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/media/16331/download"
    accessed: 2026-10
  - title: "BSA/AML Examination Manual: Office of Foreign Assets Control"
    publisher: "FFIEC"
    url: "https://bsaaml.ffiec.gov/manual/OfficeOfForeignAssetsControl/01"
    accessed: 2026-10
  - title: "31 CFR 501.603 Reports of blocked property"
    publisher: "eCFR"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-V/part-501/subpart-C/section-501.603"
    accessed: 2026-10
  - title: "31 CFR 501.604 Reports on rejected transactions"
    publisher: "eCFR"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-V/part-501/subpart-C/section-501.604"
    accessed: 2026-10
  - title: "31 CFR 501.601 Records and recordkeeping requirements"
    publisher: "eCFR"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-V/part-501/subpart-C/section-501.601"
    accessed: 2026-10
  - title: "US Treasury Extends Recordkeeping Requirement for Economic Sanctions Compliance to 10 Years"
    publisher: "Greenberg Traurig"
    url: "https://www.gtlaw.com/en/insights/2025/4/us-treasury-extends-recordkeeping-requirement-for-economic-sanctions-compliance-to-10-years"
    accessed: 2026-10
  - title: "FAQ 401: 50 Percent Rule and indirect ownership"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/faqs/401"
    accessed: 2026-10
  - title: "Sanctions List Search"
    publisher: "U.S. Treasury, OFAC"
    url: "https://sanctionssearch.ofac.treas.gov/"
    accessed: 2026-10
  - title: "Virtual currency FAQs (560, 562, 594)"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/faqs/topic/1626"
    accessed: 2026-10
  - title: "Settlement Agreement between OFAC and Bank of America, N.A. (enforcement release, October 13, 2026)"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/media/937231/download"
    accessed: 2026-10
  - title: "2025 Enforcement Information"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/civil-penalties-and-enforcement-information/2025-enforcement-information"
    accessed: 2026-10
  - title: "Civil Penalties and Enforcement Information"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/civil-penalties-and-enforcement-information"
    accessed: 2026-10
---

OFAC screening sounds like a single check, but in practice it is a chain: good customer data, a list feed that updates on time, matching rules that catch spelling variants, people who clear alerts properly, and reports that reach OFAC on time. A break anywhere in that chain is how most enforcement cases start. What follows is the process as US examiners and OFAC describe it, with the rule changes since the first version of this guide in 2025.

## What OFAC screening is and who needs it

OFAC, the Office of Foreign Assets Control at the US Treasury, administers US sanctions. Screening means comparing the people and companies you deal with, and the payments you process, against OFAC's sanctions lists: the SDN list and the non-SDN lists such as the SSI list. Our explainer on [SDN vs SSI vs FSE lists](/publications/sdn-vs-ssi-vs-fse-lists/) covers how those lists differ.

OFAC's rules bind US persons and transactions within the United States, which covers far more than banks. OFAC's [Framework for OFAC Compliance Commitments](https://ofac.treasury.gov/media/16331/download) lists the ways non-banks have run into trouble: foreign affiliates of US companies facilitating deals with sanctioned parties, re-exports of US goods, and payments routed through US banks. Recent OFAC penalties hit a logistics company, a consulting firm, a sports academy and a broker, according to OFAC's [2026 enforcement table](https://ofac.treasury.gov/civil-penalties-and-enforcement-information).

Crypto firms are covered too. OFAC's [virtual currency FAQs](https://ofac.treasury.gov/faqs/topic/1626) say compliance obligations are the same for digital currency and fiat transactions, and OFAC adds wallet addresses to SDN entries.

## Is OFAC screening required by law?

Strictly, no regulation tells you exactly how to screen. The FFIEC's [BSA/AML manual](https://bsaaml.ffiec.gov/manual/OfficeOfForeignAssetsControl/01) says an OFAC compliance program is "not required by specific regulation". What is required is the outcome: you must not deal with blocked parties, and you must block or reject and report when you find them. In practice, you cannot meet that duty at scale without screening, and examiners expect a written, risk-based program.

OFAC's framework names five components of that program:

1. Management commitment
2. Risk assessment
3. Internal controls (screening sits here)
4. Testing and auditing
5. Training

## How to conduct OFAC screening, step by step

### Step 1: Assess your sanctions risk

Map where sanctions exposure comes from: customer types, countries you serve, products (cross-border wires, trade finance, crypto), and third parties. The FFIEC manual names international funds transfers, nonresident alien accounts and foreign correspondent accounts as higher-risk areas. Your risk assessment decides how wide and how often you screen.

### Step 2: Collect the right data

Names alone produce too many false hits. Collect full legal name, date of birth, nationality and address for individuals; registered name, registration number, country and ownership for companies. For payments, screen the originator, beneficiary, intermediary banks and any free-text fields. Missing identifiers such as SWIFT BICs and alternative spellings of sanctioned names are both on OFAC's list of root causes of violations.

### Step 3: Screen against every OFAC list

Screen against the SDN list and the non-SDN lists. OFAC's free [Sanctions List Search](https://sanctionssearch.ofac.treas.gov/) tool covers the SDN list together with the FSE, SSI, CAPTA and NS-PLC lists and uses fuzzy matching with an adjustable minimum score. OFAC does not recommend a particular score, and it says the tool does not replace due diligence. It works for occasional lookups; most regulated firms use commercial screening software fed with OFAC's list files.

Then check ownership. Under OFAC's 50 Percent Rule, a company owned 50 percent or more, directly or indirectly, by blocked persons is blocked even if it is not named. [OFAC FAQ 401](https://ofac.treasury.gov/faqs/401) explains how indirect stakes add up. This is where [KYB tools](/providers/kyb/) that map beneficial ownership come in.

### Step 4: Screen at the right moments

The FFIEC manual sets out the expected timing:

- **New customers:** before the account is opened or shortly after, for example in nightly processing. If you screen after opening, block anything other than the initial deposit until the check is done.
- **Transactions:** funds transfers, letters of credit and non-customer transactions should be screened before they are executed.
- **List changes:** existing customers should be checked when OFAC changes its lists. Lower-risk banks may run full-book comparisons periodically, such as weekly, monthly or quarterly.

Customer data changes (a new address, a new owner) should also trigger re-screening.

### Step 5: Review alerts properly

Each alert needs a documented decision. Compare secondary identifiers: date of birth, nationality, address, registration number. Check the programme tag on the SDN entry, because it tells you how a true hit must be handled. If you cannot rule a match out, escalate to your sanctions officer, and hold the transaction while you do.

Watch the volume. The FFIEC manual notes that a high rate of false hits may mean the screening setup needs review. The fix is better data and tuning, not blanket suppression rules (more on that below).

### Step 6: Block or reject, then report

If the match is confirmed, block the property or reject the transaction, depending on the programme. Then report:

- **Blocked property:** report to OFAC within 10 business days of blocking, under [31 CFR 501.603](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-V/part-501/subpart-C/section-501.603). Holders also file an annual report of property blocked as of 30 June, due by 30 September.
- **Rejected transactions:** report within 10 business days of the rejection, under [31 CFR 501.604](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-V/part-501/subpart-C/section-501.604).

Reports are generally filed electronically through OFAC's reporting system.

### Step 7: Keep records for 10 years

This changed in 2025. OFAC's final rule, published on 20 March 2025 and effective 21 March 2025, doubled the record retention period from five to 10 years, matching the longer statute of limitations Congress set in April 2024 ([Greenberg Traurig summary](https://www.gtlaw.com/en/insights/2025/4/us-treasury-extends-recordkeeping-requirement-for-economic-sanctions-compliance-to-10-years)). [31 CFR 501.601](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-V/part-501/subpart-C/section-501.601) now requires transaction records for at least 10 years, and blocked property records for as long as the property is blocked and at least 10 years after it is unblocked. Keep alert decisions and the reasons behind them too.

## What goes wrong: lessons from a 2026 case

On 13 October 2026, OFAC announced a $11,662,930 settlement with Bank of America over 475 apparent violations across the Russia, Belarus, Iran, Burma, Somalia, narcotics and terrorism programmes. The [enforcement release](https://ofac.treasury.gov/media/937231/download) describes failures at almost every step above:

- routing directory errors, delayed filter updates, analysts approving matches as false positives and an alert suppression rule let 403 payments worth about $14.3 million go through 35 blocked banks;
- a design flaw ranked exact name and date of birth matches to blocked persons as low or medium priority;
- vendor and technical problems delayed watchlist updates after new designations;
- human error left a blocked person's business account unrestricted.

OFAC's compliance points from the case: supervise and audit alert rules, keep screening software current and manage technology changes carefully, and remember that relying on a vendor does not move responsibility to the vendor.

For scale, OFAC's [2025 enforcement page](https://ofac.treasury.gov/civil-penalties-and-enforcement-information/2025-enforcement-information) shows 14 penalties and settlements totalling $265,746,819. In 2026 to mid-October there were nine, totalling $295,983,600, most of it a single $275 million settlement with Adani Enterprises.

## Manual vs automated screening

The FFIEC manual allows low-risk, low-volume banks to filter manually. For anyone else, software is the realistic choice. What separates tools:

| What to check | Why it matters |
|---|---|
| All OFAC lists, plus UN, EU and UK if you operate there | SDN-only screening misses non-SDN lists |
| Update speed after OFAC publishes | Delayed updates were a cause in the 2026 case |
| Fuzzy matching with tunable thresholds | Catches transliterations and typos without flooding analysts |
| Ownership data for the 50 Percent Rule | Unnamed subsidiaries are blocked too |
| Audit trail of every alert decision | You need it for examiners and the 10-year record rule |

[ComplyAdvantage](/providers/complyadvantage/) is a screening data platform usually paired with separate identity verification. [Castellum.AI](/providers/castellum-ai/) maintains its own sanctions database. [Sanction Scanner](/providers/sanction-scanner/) and [NameScan](/providers/namescan/) target mid-market and smaller firms. Compare them in our [AML software rankings](/providers/aml/), or see the [rankings for banks](/providers/aml/banks/) if you are a regulated lender. For a plain-language overview of the lists themselves, read our guide to [OFAC sanctions lists](/publications/ofac-sanctions-lists/).
