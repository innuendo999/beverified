---
title: "How to Use OSINT for Fraud Prevention: A Practical Playbook"
seoTitle: "How to Use OSINT for Fraud Prevention | BeVerified"
seoDescription: "A step-by-step OSINT workflow for fraud, KYC and KYB teams: what to check, how to keep evidence, where the law draws lines, and the 2026 rule changes."
lede: "OSINT (open-source intelligence) means checking what public records, websites and digital traces say about a person or company before you trust them. For fraud and KYC teams it answers three questions: is this entity real, is it what it claims to be, and is it tied to risk it has not disclosed."
section: publications
published: 2025-05-29
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "Start every OSINT check with a written hypothesis so you collect evidence for a decision, not a pile of screenshots."
  - "Since 18 November 2025, UK company directors and people with significant control must verify their identity with Companies House, with a 12-month transition for those already in post."
  - "FinCEN's final beneficial ownership rule, effective 14 August 2026, makes permanent the exemption for US companies, so the BOI database will not answer US ownership questions."
  - "The EU AML Regulation applies from 10 July 2027 and AMLA starts direct supervision during 2028."
  - "Public does not mean free to use: the Dutch regulator fined Clearview AI €30.5 million in 2024 for scraping faces from the web without a legal basis."
topics: [OSINT, Fraud Prevention, KYB, Due Diligence]
providers: [seon]
categories: [kyb, aml, identity-verification]
faq:
  - q: "What is OSINT in fraud prevention?"
    a: "It is the use of publicly available information, such as company registries, court records, news, websites, domain records and social media, to confirm who a customer or counterparty is and to spot signs of fraud or hidden risk."
  - q: "Is OSINT legal?"
    a: "Collecting public information is generally lawful, but data protection law still applies to personal data you gather and keep. Regulators have fined companies for scraping personal data at scale, so agree a lawful basis and retention rules with your privacy team first."
  - q: "What are the steps of an OSINT investigation?"
    a: "Write a hypothesis, collect data from public sources, verify each artifact, map the links between people, companies and assets, and preserve the evidence with dates and source URLs so a reviewer can repeat the work."
  - q: "Can OSINT replace KYC or KYB software?"
    a: "No. Automated tools handle volume, such as registry lookups, screening and device signals. OSINT is the manual layer for cases those tools flag or cannot resolve."
sources:
  - title: "Companies House confirms identity verification rollout from 18 November 2025"
    publisher: "GOV.UK, Companies House"
    url: "https://www.gov.uk/government/news/companies-house-confirms-identity-verification-rollout-from-18-november-2025"
    accessed: 2026-10
  - title: "Beneficial Ownership Information Reporting"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/boi"
    accessed: 2026-10
  - title: "Anti-money laundering: Council adopts package of rules"
    publisher: "Council of the European Union"
    url: "https://www.consilium.europa.eu/en/press/press-releases/2024/05/30/anti-money-laundering-council-adopts-package-of-rules/"
    accessed: 2026-10
  - title: "Regulation (EU) 2024/1624 on the prevention of the use of the financial system for money laundering or terrorist financing"
    publisher: "EUR-Lex"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1624/oj"
    accessed: 2026-10
  - title: "About AMLA"
    publisher: "Anti-Money Laundering Authority"
    url: "https://www.amla.europa.eu/about-amla_en"
    accessed: 2026-10
  - title: "Clearview AI hit with its largest GDPR fine yet as Dutch regulator considers holding execs personally liable"
    publisher: "TechCrunch"
    url: "https://techcrunch.com/2024/09/03/clearview-ai-hit-with-its-largest-gdpr-fine-yet-as-dutch-regulator-considers-holding-execs-personally-liable"
    accessed: 2026-10
  - title: "OpenCorporates: Our purpose"
    publisher: "OpenCorporates"
    url: "https://opencorporates.com/purpose/"
    accessed: 2026-10
  - title: "Maltego"
    publisher: "Maltego"
    url: "https://www.maltego.com/"
    accessed: 2026-10
---

Most fraud does not hide well. A shell importer has a website registered three weeks ago, a director who also runs four other dormant companies, and a "head office" that turns out to be a virtual office. None of that needs special access to find. It needs someone to look, in a structured way, and to write down what they saw. That is what open-source intelligence (OSINT) means in a fraud or compliance team: public information, collected with a method.

This playbook covers the method, the sources we would start with, how OSINT fits next to automated KYC and KYB tools, and the rule changes since our first version of this guide in 2025.

## The three questions OSINT answers

Every OSINT check in onboarding or investigations comes back to three questions.

1. Is the entity real? Does the person or company exist outside the application form? A registered company with filings, a trading history, staff who appear elsewhere, a website with some age.
2. Can it do what it claims? Does the business hold the licence it says it holds, trade in the sector it declares, and have the footprint of a company of its stated size?
3. Is it tied to undisclosed risk? Look for links to sanctioned parties, adverse media, insolvency, prior fraud, or a network of related companies that share directors, addresses or phone numbers.

If you cannot connect a search to one of these questions, it probably does not belong in the file.

## A five-step workflow

### 1. Write the hypothesis first

"This applicant is a front for someone else" or "this supplier's bank details changed because of invoice fraud". A hypothesis tells you what evidence would confirm or rule it out, and stops the investigation sprawling across every social profile you can find.

### 2. Collect from public sources

Start with official records, then widen. A typical order for a business:

| Source type | What it tells you |
|---|---|
| Company registries (for example Companies House in the UK) | Incorporation date, officers, filings, registered address, persons with significant control |
| Aggregated registry data such as [OpenCorporates](https://opencorporates.com/purpose/) | The same entity or officer across several jurisdictions |
| Sanctions and watchlists | Direct matches and, with ownership data, indirect exposure |
| Court records and insolvency notices | Litigation, judgments, disqualifications |
| News and adverse media | Allegations that have not reached a court |
| Domain and website records | Registration age, hosting, reuse of templates or contact details |
| Social and professional networks | Whether staff and executives exist and match the story |

For individuals, the digital footprint of an email address or phone number (how old it is, where it is registered, which services know it) is often more telling than a social profile. Tools such as [SEON](/providers/seon/) automate that kind of email, phone, IP and device enrichment before a user reaches the document step.

### 3. Verify each artifact

Treat every finding as a claim. A LinkedIn profile can be fake. A press release can be self-published. A registry entry shows what someone filed, which is not the same as what is true. Corroborate important facts in a second, independent source, and note which facts rest on a single source.

### 4. Map the links

Fraud usually shows in relationships, not single records. Shared directors, a common registered address, the same phone number on several websites, overlapping incorporation dates. Link-analysis tools such as [Maltego](https://www.maltego.com/) exist for this, but a spreadsheet of entities and shared attributes works for small cases.

### 5. Preserve the evidence

Capture the source URL, the date and time, and a copy of what you saw: a screenshot, a saved PDF or an archived snapshot. Pages change and get deleted. If an analyst's conclusion cannot be checked by a reviewer six months later, it will not survive an audit or a dispute.

## What changed in the rules since 2025

Some of the public data OSINT relies on has changed.

### United Kingdom

Since 18 November 2025, company directors and people with significant control must [verify their identity with Companies House](https://www.gov.uk/government/news/companies-house-confirms-identity-verification-rollout-from-18-november-2025), either through GOV.UK One Login or an authorised corporate service provider. Directors already in post have 12 months, confirming verification at their company's next confirmation statement, and existing PSCs have up to 12 months from that date. Rules for limited partnerships, corporate directors and some other roles come later. Over time this should make UK registry names more reliable, though during the transition an unverified director is not by itself a red flag.

### United States

FinCEN's interim final rule of March 2025 removed beneficial ownership reporting for US companies. According to [FinCEN's BOI page](https://www.fincen.gov/boi), a final rule effective 14 August 2026 made that exemption permanent, and US persons do not have to provide BOI to reporting companies. Practically, the federal BOI database will not answer "who owns this US LLC", so ownership work on US entities still depends on state filings, documents from the customer and open sources.

### European Union

The AML package adopted in May 2024 creates a single rulebook. The [Council said](https://www.consilium.europa.eu/en/press/press-releases/2024/05/30/anti-money-laundering-council-adopts-package-of-rules/) the AML Regulation applies three years after entry into force, and [EUR-Lex lists 10 July 2027](https://eur-lex.europa.eu/eli/reg/2024/1624/oj) as its date. The new [Anti-Money Laundering Authority](https://www.amla.europa.eu/about-amla_en), based in Frankfurt, has existed since 26 June 2024 and plans to start direct supervision during 2028. The regulation also sets tighter due diligence requirements and regulates beneficial ownership.

## Where OSINT fits next to KYC and KYB tools

Automated tools do the volume work: registry pulls, sanctions and PEP screening, document and biometric checks, device signals. OSINT is the layer for what they flag or cannot settle.

- In enhanced due diligence, for high-risk customers, an analyst builds the ownership picture, checks the source-of-wealth story against public records and reads the adverse media properly. Our [KYB provider rankings](/providers/kyb/) cover tools that automate the registry and UBO side.
- With screening alerts, a name hit on a sanctions list is often a false positive. Date of birth, nationality, known addresses and photos from public sources help close or escalate it. Our step-by-step [OFAC screening guide](/publications/how-to-conduct-ofac-screening-step-by-step-guide/) covers that review, and the [AML screening rankings](/providers/aml/) compare the tools.
- In ongoing monitoring, ownership changes, new directors and fresh adverse media after onboarding are common triggers. See our guide to [perpetual KYB](/guide/perpetual-kyb/) for how firms set event-driven reviews.
- In fraud investigations after a loss, OSINT helps link the mule accounts, fake suppliers or synthetic identities to each other. Our review of the [biggest identity theft cases](/publications/identity-theft-cases/) shows how much personal data is already in criminal hands, which is why matching personal details alone proves little.

## A short example: the shell importer

A new business customer applies for a trade finance line. The documents look fine. An analyst runs the five steps:

- Hypothesis: the company is a newly created front.
- Collection: the registry shows incorporation four months ago, with a sole director who holds the same role in six other companies incorporated in the same year. The website domain was registered last month. The trading address is a serviced office.
- Verification: the director's professional profile lists none of the seven companies. A reverse search of the website's contact phone number finds it on two of the other companies' sites.
- Mapping: all seven companies share the same address and accountant, and two have already been struck off.
- Preservation: registry extracts, domain records and screenshots are saved with dates in the case file.

None of these findings proves fraud. Together they justify enhanced due diligence before credit is extended, and the file shows exactly why. (This is an illustrative scenario, not a real case.)

## Governance: what to agree before you start

OSINT on people is processing of personal data. Being public does not make it free to collect and keep. In September 2024 the Dutch data protection authority [fined Clearview AI €30.5 million](https://techcrunch.com/2024/09/03/clearview-ai-hit-with-its-largest-gdpr-fine-yet-as-dutch-regulator-considers-holding-execs-personally-liable) for building a database of faces scraped from the internet without a legal basis, and said using Clearview's services is illegal for Dutch organisations. That is an extreme case, but the principle reaches every face search and people search tool.

Before OSINT becomes routine, agree with your privacy and legal teams:

- the lawful basis and the purposes OSINT may be used for;
- which tools are approved, and which are not (face search tools need particular care);
- no pretexting, fake accounts or logging in to closed groups unless counsel has signed off;
- retention periods for screenshots and case files;
- a review step for any decision that rests mainly on OSINT findings.

Our [methodology](/methodology/) explains how we assess vendors' data sources and screening coverage when we rank them.
