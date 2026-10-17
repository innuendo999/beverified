---
title: "The KYC Market Guide for Banks (2026 Edition)"
seoTitle: "KYC Market Guide for Banks 2026 | BeVerified"
seoDescription: "A 2026 guide to the KYC market for banks: the parts of a modern KYC program, unified vs specialist systems, digital identity wallets, AI rules and what to plan for."
lede: "A bank's KYC program now spans identification, due diligence and continuous monitoring, and most banks run it on a mix of specialist vendors rather than one system. The main planning dates for 2026 to 2028 are the EU AML Regulation (July 2027), the EU AI Act's postponed high-risk rules (December 2027) and AMLA's direct supervision (2028)."
section: guide
published: 2025-04-02
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "A modern KYC program has three layers: customer identification, risk-based due diligence (standard and enhanced) and ongoing monitoring."
  - "US banks must collect at least name, date of birth, address and an identification number under their customer identification program, and may verify by documents, non-documentary methods or both."
  - "EU member states must offer European Digital Identity Wallets by the end of 2026, and firms legally required to identify customers will have to accept them for authentication."
  - "The EU AML Regulation applies from 10 July 2027; AMLA plans to select about 40 entities for direct supervision during 2027 and start supervising them during 2028."
topics: [KYC, Banking, Digital Identity, EU AML Package, AI Act]
provider_slugs: [veriff, signicat, trulioo, nice-actimize, kyc360]
ranking_keys: [aml/banks, identity-verification, kyb]
faq:
  - q: "What are the main parts of a KYC program for banks?"
    a: "Customer identification (collecting and verifying identity data), customer due diligence with enhanced due diligence for higher-risk customers, and ongoing monitoring that keeps the customer profile and risk rating current."
  - q: "Should a bank use one KYC platform or several specialist tools?"
    a: "Both models work. A unified platform gives one data model and audit trail; specialist tools are often stronger at individual steps and easier to replace. Many banks run specialists behind an orchestration or lifecycle layer they control."
  - q: "Will the EU Digital Identity Wallet replace KYC checks?"
    a: "No. It gives banks a new verified identity source for onboarding and authentication, but due diligence, risk assessment, screening and monitoring still apply."
  - q: "When does the EU AML Regulation apply?"
    a: "From 10 July 2027, with a later date of 10 July 2029 for professional football clubs and agents."
sources:
  - title: "31 CFR 1020.220: Customer identification program requirements for banks"
    publisher: "eCFR, U.S. Government"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.220"
    accessed: 2026-10
  - title: "The FATF Recommendations (updated October 2025)"
    publisher: "Financial Action Task Force"
    url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf"
    accessed: 2026-10
  - title: "Regulation (EU) 2024/1624 on the prevention of the use of the financial system for money laundering or terrorist financing"
    publisher: "EUR-Lex, Official Journal of the European Union"
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401624"
    accessed: 2026-10
  - title: "AMLR Article 26: Ongoing monitoring of the business relationship (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/"
    accessed: 2026-10
  - title: "AMLR Article 90: Entry into force and application (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/"
    accessed: 2026-10
  - title: "About AMLA"
    publisher: "Anti-Money Laundering Authority (AMLA)"
    url: "https://www.amla.europa.eu/about-amla_en"
    accessed: 2026-10
  - title: "European Digital Identity (EUDI) Regulation"
    publisher: "European Commission"
    url: "https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation"
    accessed: 2026-10
  - title: "The AI Act Implementation Timeline: What Changes Under the AI Omnibus?"
    publisher: "Future of Privacy Forum"
    url: "https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus"
    accessed: 2026-10
  - title: "The Wolfsberg Group publishes its second Statement on Effective Monitoring for Suspicious Activity"
    publisher: "The Wolfsberg Group"
    url: "https://wolfsberg-group.org/news/the-wolfsberg-group-publishes-its-second-statement-on-effective-monitoring-for-suspicious-activity"
    accessed: 2026-10
  - title: "Anti-Money Laundering and Countering the Financing of Terrorism Programs (proposed rule)"
    publisher: "Federal Register, FinCEN"
    url: "https://www.federalregister.gov/documents/2026/04/10/2026-07033/anti-money-laundering-and-countering-the-financing-of-terrorism-programs"
    accessed: 2026-10
  - title: "Order Granting Exceptive Relief from Certain Customer Due Diligence Rule Requirements (FIN-2026-R001)"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf"
    accessed: 2026-10
---

KYC at a bank used to be an onboarding task owned by operations. It is now a running process that touches onboarding, risk, fraud and customer experience, and the market for KYC technology has split into dozens of specialist categories. This guide sets out the parts of a modern KYC program, the choice between unified and specialist systems, where digital identity and AI fit, and the regulatory dates banks should plan around from late 2026.

## The three layers of a modern KYC program

### Customer identification

Identification is the entry point: collect who the customer is and check it. US rules are specific. A bank's customer identification program must collect at least the customer's name, date of birth (for individuals), address and an identification number before opening an account, and verify identity within a reasonable time using [documents, non-documentary methods or both](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.220). Non-documentary methods include comparing the details against credit bureau or public records.

In practice, digital identification for individuals combines a document check, a face match with liveness detection and, in some countries, a national eID login. For business customers it means registry extracts and an ownership chart.

### Customer due diligence and enhanced due diligence

Due diligence answers whether the bank understands the customer well enough to judge the risk: who the beneficial owners are, what the relationship is for, where the money comes from. [FATF Recommendation 10](https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf) sets the baseline that national rules build on. Higher-risk customers, such as those connected to high-risk countries or politically exposed persons, get enhanced due diligence: more evidence, senior approval and closer monitoring. The EU AML Regulation, for example, expects enhanced measures for former PEPs to continue for [at least 12 months](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401624) after they leave office, and until they no longer pose a risk.

Screening runs through this layer. Sanctions, PEP and adverse media checks happen at onboarding and again whenever lists or customer data change.

### Ongoing monitoring and perpetual KYC

The third layer keeps the file current. Traditional programs refresh files on a schedule. [Perpetual KYC](/guide/perpetual-kyc/) refreshes them when something changes: a screening hit, a registry update, unusual transactions. In the EU, [Article 26 of the AML Regulation](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/) requires both: reviews when circumstances change, and an outer limit of 1 year between updates for higher-risk customers and 5 years for others. Transaction monitoring feeds this layer too; our [transaction monitoring guide](/guide/transaction-monitoring-a-complete-guide/) covers that side.

## Unified platforms versus specialist tools

Banks buy KYC technology in roughly two ways.

**Unified platforms** cover onboarding, screening, risk scoring, case management and periodic review in one product. The advantages are one data model, one audit trail and one vendor to manage. The downside is that no single vendor is best at every step, and replacing one module can mean replacing everything.

**Specialist tools** each do one job well: identity verification, eID, screening data, registry data, transaction monitoring. Banks connect them through an orchestration or client lifecycle layer. This gives flexibility and stronger individual components but puts integration work on the bank.

Most large banks end up with a hybrid: a lifecycle or case management platform they control, with specialist data and verification vendors behind it.

### How to choose between them

Four questions usually settle it.

1. **How many markets do you serve?** A bank in one country with a national eID scheme can often get most of what it needs from one or two vendors. A bank onboarding companies across thirty jurisdictions will need several data sources, because no single provider covers every registry and document type well.
2. **How much integration capacity do you have?** Specialist stacks need engineers who can maintain connections, handle vendor API changes and test end to end. Without that team, a unified platform is safer even if some modules are weaker.
3. **How often do you expect to swap components?** Identity verification and fraud detection change quickly. If you want to replace a vendor in two years without a full migration, keep that layer behind your own orchestration.
4. **Who needs to read the file?** Examiners and internal audit want one place to see every check and decision. Whichever model you pick, make sure the case record pulls everything together.

The table below shows how some of the providers we review fit those categories, based on their records.

| Layer | Example providers we review | What their record shows |
|---|---|---|
| Identity verification | [Veriff](/providers/veriff/) | Document and biometric checks across 12,000+ document types, with AI plus human review |
| National eID | [Signicat](/providers/signicat/) | 35+ European eID methods, signing and onboarding in one platform |
| Global data and KYB | [Trulioo](/providers/trulioo/) | GlobalGateway identity and business verification across 195 countries |
| Lifecycle KYC and screening | [KYC360](/providers/kyc360/) | Onboarding, screening and perpetual monitoring; acquired by Experian in October 2025 |
| Enterprise financial crime suite | [NICE Actimize](/providers/nice-actimize/) | KYC/CDD, watchlist screening, transaction monitoring and regulatory reporting |

For full comparisons see our rankings of [identity verification providers](/providers/identity-verification/) and [AML software for banks](/providers/aml/banks/).

## Reusable digital identity and the EU wallet

The 2025 conversation about decentralised identity was mostly about pilots. In the EU it now has a date. Under the European Digital Identity Regulation (EU) 2024/1183, member states must provide [European Digital Identity Wallets by the end of 2026](https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation), and service providers that are legally required to identify their customers must accept the wallet for authentication.

For banks, that means a new verified identity source to plan for in onboarding and login flows. Customers may arrive with identity data that a government has already verified, which could reduce document uploads and drop-off. It does not remove due diligence. The bank still has to assess risk, screen, understand the purpose of the relationship and monitor it.

## AI in KYC risk assessment

Machine learning is now common in KYC: matching names in screening, spotting forged documents, detecting deepfakes, scoring risk and prioritising alerts. The questions regulators and auditors ask are about control, not novelty. Can the bank explain why a model made a decision? Was it validated before use? Is it monitored for drift?

The Wolfsberg Group's [August 2025 statement](https://wolfsberg-group.org/news/the-wolfsberg-group-publishes-its-second-statement-on-effective-monitoring-for-suspicious-activity) on monitoring frames this around three pillars: transition and validation, balancing model risk with financial crime risk, and explainability. In the EU, the AI Act adds legal duties for high-risk systems. The AI Omnibus, published on 24 July 2026, moved the start of those duties for Annex III systems from 2 August 2026 to [2 December 2027](https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus). Banks should classify each model they use rather than assume a KYC model is in or out of scope.

## Implementation considerations for 2026 to 2028

**EU single rulebook.** The AML Regulation [applies from 10 July 2027](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/) and replaces national CDD rules with one directly applicable text. Banks operating in several member states can start harmonising procedures now.

**AMLA supervision.** AMLA, based in Frankfurt, plans to [select about 40 obliged entities](https://www.amla.europa.eu/about-amla_en) for direct supervision during 2027 and start supervising them during 2028. Large cross-border groups should expect a new supervisor reading their KYC files.

**US program reform.** FinCEN [proposed new AML/CFT program rules](https://www.federalregister.gov/documents/2026/04/10/2026-07033/anti-money-laundering-and-countering-the-financing-of-terrorism-programs) on 10 April 2026, built around effective, risk-based programs, with comments closing on 9 June 2026. Separately, a [February 2026 FinCEN order](https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf) made beneficial ownership re-verification for existing legal entity customers risk-based.

**Data and silos.** Most KYC projects stall on data, not software. Duplicate customer records, inconsistent entity names and separate fraud and AML teams working from different files all limit what automation can do. Our publication on [KYC automation for banks](/publications/kyc-automation-for-banks/) sets out an implementation sequence.

**Vendor evidence.** Ask for independent test results, data coverage by country and sample audit logs before signing. Our [methodology](/methodology/) explains what we check when we review a provider.
