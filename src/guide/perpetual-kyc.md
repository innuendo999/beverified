---
title: "Perpetual KYC (pKYC): What It Is and How It Works in 2026"
seoTitle: "What Is Perpetual KYC (pKYC)? How It Works | BeVerified"
seoDescription: "Perpetual KYC updates customer risk when something changes instead of on a fixed review date. What pKYC means, what EU, US and UK rules require, and how to run it."
lede: "Perpetual KYC (pKYC) keeps customer due diligence current by reacting to events, such as a sanctions designation, an ownership change or unusual activity, instead of waiting for the next scheduled review. Regulators still expect periodic updates, so in practice pKYC sits on top of the review calendar rather than replacing it."
section: guide
published: 2025-05-12
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "Perpetual KYC means re-assessing a customer when a trigger fires (new data, changed behaviour, a screening hit) rather than only at a fixed interval."
  - "From 10 July 2027 the EU AML Regulation caps the gap between customer information updates at 1 year for higher-risk customers and 5 years for all others, and also requires reviews when relevant circumstances change."
  - "In the US, banks must keep customer information updated on a risk basis; a FinCEN order of 13 February 2026 ended the need to re-verify beneficial owners at every new account opening for existing legal entity customers."
  - "A pKYC program needs a list of triggers, a risk model that reacts to them, clear rules on what is automated and what goes to an analyst, and an audit trail for each decision."
topics: [Perpetual KYC, Ongoing Monitoring, Customer Due Diligence, EU AML Package]
providers: [kyc360, napier, castellum-ai, complyadvantage]
categories: [aml, aml/banks]
faq:
  - q: "What is perpetual KYC?"
    a: "Perpetual KYC (pKYC) is an approach to ongoing customer due diligence in which a customer's profile and risk rating are updated whenever relevant new information arrives, instead of only during scheduled periodic reviews."
  - q: "What is perpetual validation?"
    a: "Perpetual validation is an informal term some teams use for the same idea: re-checking customer data each time something changes rather than on a calendar. Regulations do not use it; the legal terms are ongoing monitoring and ongoing customer due diligence."
  - q: "Does perpetual KYC replace periodic reviews?"
    a: "Not in the EU. The AML Regulation (EU) 2024/1624 requires event-driven reviews and also sets maximum update intervals of 1 year for higher-risk customers and 5 years for others. pKYC can make the scheduled review lighter, but the outer limit still applies."
  - q: "Is perpetual KYC legally required?"
    a: "No law requires the label. FATF Recommendation 10, the EU AML Regulation, US rule 31 CFR 1020.210 and the UK Money Laundering Regulations 2017 all require ongoing monitoring and keeping customer information up to date. pKYC is one way to meet those duties."
sources:
  - title: "The FATF Recommendations (updated October 2025)"
    publisher: "Financial Action Task Force"
    url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf"
    accessed: 2026-10
  - title: "Regulation (EU) 2024/1624 on the prevention of the use of the financial system for money laundering or terrorist financing"
    publisher: "EUR-Lex, Official Journal of the European Union"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng"
    accessed: 2026-10
  - title: "AMLR Article 26: Ongoing monitoring of the business relationship (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/"
    accessed: 2026-10
  - title: "AMLR Article 90: Entry into force and application (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/"
    accessed: 2026-10
  - title: "Final Report: Draft RTS under Article 28(1) of Regulation (EU) 2024/1624"
    publisher: "Anti-Money Laundering Authority (AMLA)"
    url: "https://www.amla.europa.eu/document/download/e15ab2e5-4074-4de8-bb9d-613dd8b7fdd1_en?filename=Final%20Report%20-%20draft%20RTS%2028%281%29%20AMLR.pdf"
    accessed: 2026-10
  - title: "About AMLA"
    publisher: "Anti-Money Laundering Authority (AMLA)"
    url: "https://www.amla.europa.eu/about-amla_en"
    accessed: 2026-10
  - title: "31 CFR 1020.210: Anti-money laundering program requirements for banks"
    publisher: "eCFR, U.S. Government"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.210"
    accessed: 2026-10
  - title: "Order Granting Exceptive Relief from Certain Customer Due Diligence Rule Requirements (FIN-2026-R001)"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf"
    accessed: 2026-10
  - title: "Anti-Money Laundering and Countering the Financing of Terrorism Programs (proposed rule)"
    publisher: "Federal Register, FinCEN"
    url: "https://www.federalregister.gov/documents/2026/04/10/2026-07033/anti-money-laundering-and-countering-the-financing-of-terrorism-programs"
    accessed: 2026-10
  - title: "The Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017, regulation 28"
    publisher: "legislation.gov.uk"
    url: "https://www.legislation.gov.uk/uksi/2017/692/regulation/28"
    accessed: 2026-10
---

Most banks still run KYC on a timer. A high-risk customer gets a file review every year, a low-risk one every few years, and in between the file sits untouched even if the customer's owner changes, a director turns up on a sanctions list or the account starts moving money in a way nobody expected. Perpetual KYC is the attempt to close that gap. This guide explains what the term means, what the rules in the EU, US and UK actually ask for in 2026, and how a pKYC program is put together.

## What perpetual KYC means

Perpetual KYC (pKYC) is ongoing customer due diligence driven by events. Instead of refreshing a customer's profile only when a review date comes up, the bank watches a set of data sources and re-assesses the customer when one of them reports something relevant. A trigger might be a new sanctions designation, a change in beneficial ownership at a company registry, a negative news story, an expired identity document or a jump in transaction volume.

When a trigger fires, one of three things happens. The system updates the record automatically (a new registered address, say), it asks the customer for information, or it sends the case to an analyst because the risk rating may need to change. Most of the design work in pKYC goes into deciding which triggers matter and which of those three paths each one takes.

You will also see the phrase "perpetual validation". It is not a legal term. People use it loosely for the same idea of re-checking data whenever it changes. The rules themselves talk about ongoing monitoring and ongoing due diligence.

## What the rules require in 2026

No regulator mandates "pKYC" by name. What they require is ongoing monitoring and up-to-date customer information, and event-driven review is one way to deliver that.

### FATF

[Recommendation 10](https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf) (text updated October 2025) lists ongoing due diligence on the business relationship as a core CDD measure: scrutinising transactions throughout the relationship to make sure they fit what the institution knows about the customer, their business and risk profile, including source of funds where necessary.

### European Union

The [AML Regulation (EU) 2024/1624](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng) applies from 10 July 2027 ([Article 90](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/)). Its [Article 26](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/) is the closest thing in law to a pKYC rule. It requires ongoing monitoring of the relationship and its transactions, and it sets hard outer limits on how stale a file can get: customer information must be updated at intervals that reflect risk and never longer than 1 year for higher-risk customers under enhanced due diligence, or 5 years for everyone else. It also requires a review when relevant circumstances change, and regular checks against targeted financial sanctions, with an extra check by credit and financial institutions whenever a new designation is made. AMLA was given until 10 July 2026 to issue guidelines on this article.

The interaction matters. Under the AMLR, event-driven review does not let you drop the calendar. pKYC handles the changes, and the 1-year and 5-year limits act as a backstop for customers where nothing has triggered a review.

AMLA, which is based in Frankfurt and plans to start direct supervision of around 40 entities [during 2028](https://www.amla.europa.eu/about-amla_en), published its [final draft technical standards on CDD](https://www.amla.europa.eu/document/download/e15ab2e5-4074-4de8-bb9d-613dd8b7fdd1_en?filename=Final%20Report%20-%20draft%20RTS%2028%281%29%20AMLR.pdf) on 30 September 2026. Two points are relevant here. For relationships that already exist, the 1-year and 5-year periods start counting only from the Regulation's entry into application. And sanctions screening has to run regularly at a frequency matched to the firm's exposure, and again whenever a customer's due diligence data changes. The draft still needs adoption by the European Commission.

### United States

Bank AML programs must include risk-based procedures for ongoing customer due diligence, including ongoing monitoring to identify and report suspicious transactions and, on a risk basis, to maintain and update customer information, beneficial owners of legal entity customers included ([31 CFR 1020.210(a)(2)(v)](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.210)). On 13 February 2026 FinCEN issued an [order granting exceptive relief](https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf) from part of the CDD rule. Covered institutions now have to identify and verify a legal entity customer's beneficial owners when it first opens an account, when they learn facts that call the earlier information into question, and as needed under their risk-based ongoing due diligence. Re-collecting the same data at every new account is no longer required. That is close to how pKYC works anyway: refresh when there is a reason. In April 2026 FinCEN also [proposed a rewrite of AML/CFT program rules](https://www.federalregister.gov/documents/2026/04/10/2026-07033/anti-money-laundering-and-countering-the-financing-of-terrorism-programs) built around effective, risk-based programs; as of October 2026 it is a proposal.

### United Kingdom

[Regulation 28(11)](https://www.legislation.gov.uk/uksi/2017/692/regulation/28) of the Money Laundering Regulations 2017 requires ongoing monitoring, including scrutiny of transactions and keeping CDD documents and information up to date. The UK rules do not set fixed review intervals, so firms set their own by risk.

## The data a pKYC program watches

A pKYC setup is only as good as the feeds it listens to. The usual sources fall into four groups.

- **Internal activity.** Transaction volumes, counterparties, countries and products, compared with what the customer said at onboarding. A dormant account that suddenly receives large inbound payments is a classic trigger. This is where pKYC overlaps with [transaction monitoring](/guide/transaction-monitoring-a-complete-guide/).
- **Screening data.** Sanctions lists, PEP databases and adverse media, re-run against the whole customer base when lists change rather than once a year.
- **Registry and ownership data.** For business customers: new directors, changed shareholders, a company struck off or moved into insolvency. Our guide to [perpetual KYB](/guide/perpetual-kyb/) covers this side in detail.
- **Customer-supplied changes.** New address, new employer, expired passport, a request for a higher-risk product.

Each feed brings noise. Adverse media in particular produces many weak matches. Teams that run pKYC well track how many alerts from each source lead to a real change in the customer's risk, and they cut or retune sources that rarely do.

## How event-driven risk scoring works

Under the hood, pKYC links triggers to the customer risk model. Each trigger type carries a weight or a rule. A confirmed sanctions match might force an immediate freeze and escalation. A minor registry update might change the record with no human involved. Between those extremes sit rules such as "if the risk score rises past a set threshold and the customer has made large transfers in the last 30 days, open a review". The thresholds come from the institution's own risk assessment; there is no industry standard number.

Two habits keep this defensible. Every automated decision should be logged with the input data and the rule that fired, so an examiner can follow it later. And the model should be tested and recalibrated on a schedule, because a trigger set built two years ago will drift as products and customer mix change.

## Building a pKYC program step by step

1. **List your triggers.** Start from your business-wide risk assessment and write down which events would change your view of a customer. Map each one to a data source you can actually get.
2. **Decide the path for each trigger.** Automatic update, outreach to the customer or analyst review. Be conservative at first and loosen once you see the data.
3. **Keep the calendar as a backstop.** In the EU this is the law from July 2027. Elsewhere it is still sensible, because some customers never generate a trigger.
4. **Clean the data first.** Duplicate customer records and missing identifiers produce false matches and missed ones. Entity resolution work tends to pay off before any new feed does.
5. **Set governance.** Name an owner for the trigger list, document why each threshold exists and validate the model periodically.
6. **Measure.** Track overdue reviews, time from trigger to decision, the share of triggers that lead to a risk change and analyst hours per review. Compare against your pre-pKYC baseline.

Build versus buy usually comes down to whether you already have good data plumbing. Large banks often build the orchestration and buy the data. Smaller firms more often buy a platform that bundles screening, monitoring and case management.

## pKYC tools we review

Several providers in our rankings support ongoing or perpetual monitoring, according to their records.

- [KYC360](/providers/kyc360/) (formerly RiskScreen, acquired by Experian in October 2025) offers perpetual monitoring across the customer lifecycle on Dow Jones screening data.
- [Napier](/providers/napier/) has a Perpetual Client Risk Assessment module that re-scores customer risk continuously, alongside transaction monitoring and screening.
- [Castellum.AI](/providers/castellum-ai/) lists pKYC support on top of sanctions, PEP and adverse-media data it refreshes every 5 minutes.
- [ComplyAdvantage](/providers/complyadvantage/) combines sanctions, PEP and adverse-media screening with real-time transaction monitoring, but does not verify identity documents.

For a wider comparison, see our [AML software ranking](/providers/aml/) and the [AML software for banks](/providers/aml/banks/) list. How we score providers is set out in our [methodology](/methodology/).
