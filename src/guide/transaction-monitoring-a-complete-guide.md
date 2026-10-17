---
title: "Transaction Monitoring: A Complete Guide for 2026"
seoTitle: "Transaction Monitoring: A Complete Guide for 2026 | BeVerified"
seoDescription: "What transaction monitoring is, how AML monitoring systems work, rule-based vs machine-learning detection, synthetic testing and the US, EU and UK rules in 2026."
lede: "Transaction monitoring is the ongoing review of customer transactions to spot activity that does not fit what a firm knows about the customer and may need reporting as suspicious. It is a core AML duty in every major framework, and in 2026 regulators are focusing on whether monitoring is effective, not just whether alerts are generated."
section: guide
published: 2025-04-04
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "Transaction monitoring compares each customer's activity with their expected profile and raises alerts for review; confirmed suspicions are reported to the financial intelligence unit."
  - "US banks must file a SAR within 30 calendar days of initial detection, extendable by up to 30 more days to identify a suspect but never beyond 60 days."
  - "Under the EU AML Regulation, applying from 10 July 2027, firms must report suspicions to the FIU promptly and answer FIU information requests within 5 working days."
  - "FinCEN's October 2025 SAR FAQs say separate continuing activity reviews are not required and transactions near the $10,000 CTR threshold do not by themselves require a SAR."
  - "Most programs combine rules with behavioural or machine-learning models, and should test coverage so every product and payment type actually reaches the monitoring engine."
topics: [Transaction Monitoring, AML, Suspicious Activity Reports, Banking]
provider_slugs: [nice-actimize, feedzai, hawkai, unit21, napier]
ranking_keys: [aml, aml/banks]
faq:
  - q: "What is transaction monitoring?"
    a: "Transaction monitoring is the process of reviewing customer transactions, in real time or in batches, to detect activity that is unusual for that customer and may indicate money laundering, terrorist financing, fraud or sanctions evasion."
  - q: "What is a transaction monitoring system?"
    a: "Software that ingests transaction and customer data, applies rules and models to detect unusual patterns, generates alerts, and supports analysts in investigating them and filing reports."
  - q: "What is synthetic transaction monitoring?"
    a: "In AML, it usually means feeding test transactions with known patterns into the monitoring system to check that rules fire and that every transaction type is covered. In IT operations the same term means scripted test transactions that check a service is up and responding."
  - q: "How long does a US bank have to file a SAR?"
    a: "No later than 30 calendar days after initial detection of facts that may form the basis for a SAR. If no suspect has been identified, the bank may take up to 30 more days to identify one, but never more than 60 days in total."
  - q: "Is rule-based or machine-learning monitoring better?"
    a: "Neither alone. Rules are transparent and easy to explain to examiners; models catch patterns rules miss and can cut false positives. Most programs use both and validate each before relying on it."
sources:
  - title: "The FATF Recommendations (updated October 2025)"
    publisher: "Financial Action Task Force"
    url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf"
    accessed: 2026-10
  - title: "31 CFR 1020.320: Reports by banks of suspicious transactions"
    publisher: "eCFR, U.S. Government"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-C/section-1020.320"
    accessed: 2026-10
  - title: "31 CFR 1020.210: Anti-money laundering program requirements for banks"
    publisher: "eCFR, U.S. Government"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.210"
    accessed: 2026-10
  - title: "Frequently Asked Questions Regarding Suspicious Activity Reporting (October 2025)"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/system/files/2025-10/SAR-FAQs-October-2025.pdf"
    accessed: 2026-10
  - title: "Anti-Money Laundering and Countering the Financing of Terrorism Programs (proposed rule)"
    publisher: "Federal Register, FinCEN"
    url: "https://www.federalregister.gov/documents/2026/04/10/2026-07033/anti-money-laundering-and-countering-the-financing-of-terrorism-programs"
    accessed: 2026-10
  - title: "AMLR Article 26: Ongoing monitoring of the business relationship (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/"
    accessed: 2026-10
  - title: "AMLR Article 69: Reporting of suspicions (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-69/"
    accessed: 2026-10
  - title: "AMLR Article 90: Entry into force and application (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/"
    accessed: 2026-10
  - title: "About AMLA"
    publisher: "Anti-Money Laundering Authority (AMLA)"
    url: "https://www.amla.europa.eu/about-amla_en"
    accessed: 2026-10
  - title: "The Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017, regulation 28"
    publisher: "legislation.gov.uk"
    url: "https://www.legislation.gov.uk/uksi/2017/692/regulation/28"
    accessed: 2026-10
  - title: "The Wolfsberg Group publishes its second Statement on Effective Monitoring for Suspicious Activity"
    publisher: "The Wolfsberg Group"
    url: "https://wolfsberg-group.org/news/the-wolfsberg-group-publishes-its-second-statement-on-effective-monitoring-for-suspicious-activity"
    accessed: 2026-10
---

Every bank, payment firm and crypto exchange that handles customer money has to watch what that money does. Onboarding checks tell you who the customer is on day one; transaction monitoring tells you whether their activity still makes sense on day 400. This guide covers what transaction monitoring is, how monitoring systems work, the main detection approaches, how to test them, and the rules in the US, EU and UK as of October 2026.

## What transaction monitoring is

Transaction monitoring is the ongoing review of customer transactions against what the institution knows about the customer. [FATF Recommendation 10](https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf) describes it as scrutiny of transactions throughout the relationship to make sure they are consistent with the institution's knowledge of the customer, their business and risk profile, including the source of funds where necessary.

In practice, monitoring tries to answer a few plain questions about each customer:

- Is this activity normal for this customer and for customers like them?
- Does the money go to or come from places or parties that raise risk?
- Are amounts, frequency or timing designed to avoid reporting thresholds?
- Does the pattern match a known typology, such as funnel accounts or rapid movement through new accounts?

When the answer looks wrong, the system raises an alert. An analyst investigates and, if the suspicion holds, the firm files a report with its financial intelligence unit (a suspicious activity report, or SAR, in the US; a suspicious transaction report in many other countries).

## Who needs transaction monitoring

Any firm under AML rules that has an ongoing relationship with customers. That includes banks, credit unions, payment and e-money institutions, money transmitters, broker-dealers, crypto-asset service providers and, in many countries, insurers, casinos and some non-financial businesses. The depth expected scales with risk: a global bank processing cross-border wires faces different expectations from a small lender with domestic customers.

## How the monitoring process works

**1. Data collection.** The system ingests transactions from every product and channel, plus customer data such as risk rating, expected activity and occupation or business type. Coverage gaps here are one of the most common failures. In July 2025 the Hong Kong Monetary Authority [fined three banks](/news/hkma-fines-three-hong-kong-banks-hk16-2m-for-aml-monitoring-gaps/) after finding, among other failures, that some transaction types never reached the monitoring system.

**2. Detection.** Rules and models run over the data, in real time or in batches, to flag unusual activity.

**3. Alerting and triage.** Alerts are scored and queued. Good triage puts the highest-risk alerts in front of analysts first and closes obvious false positives with a recorded reason.

**4. Investigation and case management.** Analysts review the customer's history, counterparties and other alerts, then decide whether the activity is suspicious. The decision and reasoning go into the case record.

**5. Reporting.** In the US, a bank must file a SAR [no later than 30 calendar days](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-C/section-1020.320) after initial detection; if no suspect has been identified, it may take up to 30 more days, but never more than 60 in total. The reporting duty generally applies to transactions of at least $5,000. In the EU, under [Article 69 of the AML Regulation](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-69/), firms must report suspicions to the FIU promptly, regardless of amount, and answer FIU requests for information within 5 working days (shorter in urgent cases).

**6. Feedback.** Outcomes feed back into the customer's risk rating and into rule tuning. A customer with repeated alerts may need a due diligence review, which is where monitoring connects to [perpetual KYC](/guide/perpetual-kyc/).

## Types of transaction monitoring

**Rule-based monitoring.** Fixed scenarios with thresholds, such as cash deposits above a set amount in a set period or transfers to high-risk countries. Rules are transparent and easy to explain, but they generate many false positives and criminals learn to stay just under them.

**Behavioural and statistical monitoring.** Compares a customer's activity with their own history and with peer groups. A sudden change, such as a dormant account receiving large inbound payments, stands out even if no fixed threshold is crossed.

**Machine-learning monitoring.** Models trained on past alerts and outcomes score transactions or customers by risk. They can find patterns rules miss and reduce false positives, but they need validation, monitoring for drift and explanations an examiner can follow.

**Network monitoring.** Looks at relationships between accounts, customers and counterparties to spot rings, mule networks and layered flows that look normal one account at a time.

**Real-time versus batch.** Real-time monitoring scores a payment before or as it settles, which matters for instant payments and fraud. Batch monitoring runs over a day or a month of activity and suits slower AML typologies. Many firms run both.

Most programs layer these. The Wolfsberg Group's statements on effective monitoring, the first in July 2024 and a second in [August 2025](https://wolfsberg-group.org/news/the-wolfsberg-group-publishes-its-second-statement-on-effective-monitoring-for-suspicious-activity), encourage institutions to move beyond traditional transaction monitoring toward effective outcomes, and set out a framework for adopting AI and machine learning built on validation, balancing model risk against financial crime risk, and explainability.

## What is synthetic transaction monitoring?

The term has two meanings, and it is worth knowing which one people mean.

In AML, it usually refers to testing the monitoring system with synthetic transactions: made-up activity with known patterns, pushed through the pipeline to confirm that rules fire, alerts reach the queue and every transaction type is covered. It is the most direct way to catch the kind of data coverage gap the HKMA found, and it is useful after any core system change or product launch.

In IT operations, synthetic monitoring means scripted test transactions that check whether an application or payment service is up and responding. It is about availability, not financial crime, but banks use both.

## Transaction monitoring rules in 2026

### United States

The Bank Secrecy Act requires banks to run AML programs that include ongoing monitoring to identify and report suspicious transactions ([31 CFR 1020.210](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.210)). On 9 October 2025 FinCEN and the banking agencies issued [SAR FAQs](https://www.fincen.gov/system/files/2025-10/SAR-FAQs-October-2025.pdf) that trimmed some long-standing habits: separate post-SAR continuing activity reviews are not required, transactions near the $10,000 currency transaction report threshold do not by themselves require a SAR without a reason to suspect structuring, and there is no requirement to document a decision not to file. On 10 April 2026 FinCEN [proposed new AML/CFT program rules](https://www.federalregister.gov/documents/2026/04/10/2026-07033/anti-money-laundering-and-countering-the-financing-of-terrorism-programs) centred on effective, risk-based and reasonably designed programs. As of October 2026 that is still a proposal.

### European Union

The [AML Regulation (EU) 2024/1624](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/) applies from 10 July 2027 and replaces national rules built on earlier directives. [Article 26](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/) requires ongoing monitoring of the business relationship, including transactions, to make sure they match what the firm knows about the customer and to detect transactions that need closer assessment. The new EU supervisor, AMLA, plans to begin [direct supervision during 2028](https://www.amla.europa.eu/about-amla_en) of about 40 entities selected in 2027.

### United Kingdom

[Regulation 28(11)](https://www.legislation.gov.uk/uksi/2017/692/regulation/28) of the Money Laundering Regulations 2017 requires ongoing monitoring, including scrutiny of transactions to make sure they are consistent with the firm's knowledge of the customer, its business and risk profile.

## Choosing a transaction monitoring system

When comparing systems, test them on your own data where you can. The questions that matter most: can it ingest every product and rail you run, does it support both rules and models, can analysts see why an alert fired, how does case management and regulatory filing work, and what does tuning cost after go-live.

Providers we review take different approaches. [NICE Actimize](/providers/nice-actimize/) runs Suspicious Activity Monitoring within a broad financial crime suite with long experience at large banks. [Feedzai](/providers/feedzai/) focuses on real-time machine-learning fraud and transaction scoring at Tier-1 volumes. [Hawk AI](/providers/hawkai/) combines rules with behavioural AI and explainable decisions. [Unit21](/providers/unit21/) pairs monitoring with AI agents that investigate alerts and pre-fill SAR and CTR filings. [Napier](/providers/napier/) offers real-time monitoring with 100+ built-in typologies and a sandbox for testing rules before go-live.

Compare them in our [AML software for banks ranking](/providers/aml/banks/) or the wider [AML software ranking](/providers/aml/). Our [methodology](/methodology/) explains how we score each provider.
