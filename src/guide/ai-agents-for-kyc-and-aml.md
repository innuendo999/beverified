---
title: "AI for KYC and AML: What AI Agents Do and Where People Still Decide"
seoTitle: "AI for KYC and AML: AI Agents Explained | BeVerified"
seoDescription: "What AI and AI agents do in KYC and AML in 2026, which decisions the EU AMLR keeps with people, what FinCEN and the FCA say, and how to test vendor claims."
lede: "In KYC and AML, AI agents mostly do the first pass of review work: they clear obvious false alerts, gather evidence and draft case notes for an analyst. EU law already requires meaningful human intervention before an automated decision to onboard, refuse or exit a customer, so the useful question for a buyer is which steps an agent may close on its own."
section: guide
cover_label: "Agents in compliance"
cover_motif: flow
cover_palette: dark
published: 2026-11-20
updated: 2026-11-20
author: andrii-klymenko
takeaways:
  - "Three kinds of AI show up in KYC and AML: machine-learning models that score and match, generative assistants that summarise, and agents that carry out several review steps and record each one."
  - "Article 76(5) of the EU AML Regulation, which applies from 10 July 2027, requires meaningful human intervention before an automated or AI-driven decision to take on, refuse or keep a customer, or to change the level of due diligence."
  - "FinCEN's 7 April 2026 proposal says institutions that responsibly experiment with innovative technologies will not face added supervisory or enforcement risk solely because they use them."
  - "Under the EU AI Act, 1:1 biometric verification whose sole purpose is to confirm a person's identity is not a high-risk use; Annex III obligations apply from 2 December 2027 after the AI Omnibus."
  - "Vendor figures such as 83% or 85% of alerts resolved automatically come without published methods or independent tests, so a back-test on your own closed alerts is the only reliable check."
topics: [AI in Compliance, AI Agents, AML Investigations, Alert Triage, Know Your Agent]
provider_slugs: [unit21, complyadvantage, castellum-ai, hawkai, amlwatcher, aiprise]
ranking_keys: [aml, know-your-agent, identity-verification]
about_terms: [aml-case-management, transaction-monitoring, sanctions-screening, suspicious-activity-report]
mention_orgs:
  - name: "Financial Crimes Enforcement Network (FinCEN)"
    url: "https://www.fincen.gov/"
  - name: "Financial Conduct Authority (FCA)"
    url: "https://www.fca.org.uk/"
  - name: "Financial Action Task Force (FATF)"
    url: "https://www.fatf-gafi.org/"
  - name: "The Wolfsberg Group"
    url: "https://wolfsberg-group.org/"
faq:
  - q: "What is AI for KYC?"
    a: "AI for KYC is the use of machine learning and AI models in customer due diligence: reading and checking identity documents, liveness and face matching, ranking sanctions and PEP name matches, scoring customer risk and summarising case files. The KYC rules stay the same; AI changes how the checks are done."
  - q: "What do AI agents do in AML?"
    a: "AI agents in AML take an alert or case, gather the evidence an analyst would gather, decide whether it looks like a false positive or needs escalation, and draft a case note or a pre-filled report. Vendors differ on which of these steps an agent may close without a person."
  - q: "Can an AI agent approve or reject a customer?"
    a: "In the EU, not on its own. From 10 July 2027 Article 76(5) of the AML Regulation requires meaningful human intervention before an automated or AI-driven decision to enter, refuse or maintain a business relationship, or to change the level of due diligence, and the customer can ask for an explanation and challenge it."
  - q: "Is AI in KYC high-risk under the EU AI Act?"
    a: "It depends on the use. Annex III excludes biometric verification whose sole purpose is to confirm that a person is who they claim to be, so a standard selfie-to-document match is not listed as high-risk. Other models need to be classified one by one. Annex III obligations apply from 2 December 2027."
  - q: "What is the difference between AI agents for KYC and Know Your Agent?"
    a: "AI agents for KYC are tools a compliance team uses to do its own review work. Know Your Agent is the reverse: checks a business runs on an AI agent that acts for a customer, such as which verified person stands behind it and what it may do."
sources:
  - title: "Regulation (EU) 2024/1624 (AMLR), Article 76: Processing of personal data"
    publisher: "OJ L, 2024/1624, via Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-76/"
    accessed: 2026-11
  - title: "Regulation (EU) 2024/1624 (AMLR), Article 90: Entry into force and application"
    publisher: "OJ L, 2024/1624, via Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/"
    accessed: 2026-11
  - title: "AI Act, Annex III: High-risk AI systems referred to in Article 6(2)"
    publisher: "European Commission, AI Act Service Desk"
    url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3"
    accessed: 2026-11
  - title: "The AI Act Implementation Timeline: What Changes Under the AI Omnibus?"
    publisher: "Future of Privacy Forum"
    url: "https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus"
    accessed: 2026-11
  - title: "Anti-Money Laundering and Countering the Financing of Terrorism Programs (notice of proposed rulemaking, public inspection document 2026-07033)"
    publisher: "FinCEN, Federal Register"
    url: "https://public-inspection.federalregister.gov/2026-07033.pdf"
    accessed: 2026-11
  - title: "FinCEN Proposes Rule to Fundamentally Reform Financial Institution Programs Designed to Fight Illicit Finance (7 April 2026)"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/news/news-releases/fincen-proposes-rule-fundamentally-reform-financial-institution-programs"
    accessed: 2026-11
  - title: "Building the future of finance in the age of AI (speech by Jessica Rusu, 19 October 2026)"
    publisher: "Financial Conduct Authority"
    url: "https://www.fca.org.uk/news/speeches/building-future-finance-age-ai"
    accessed: 2026-11
  - title: "Outcomes FATF Plenary, 22 to 24 October 2025"
    publisher: "Financial Action Task Force"
    url: "https://www.fatf-gafi.org/en/publications/Fatfgeneral/outcomes-FATF-plenary-october-2025.html"
    accessed: 2026-11
  - title: "Publication of the Wolfsberg Principles for Using Artificial Intelligence and Machine Learning in Financial Crime Compliance (1 December 2022)"
    publisher: "The Wolfsberg Group"
    url: "https://wolfsberg-group.org/news/34"
    accessed: 2026-11
  - title: "ComplyAdvantage pricing"
    publisher: "ComplyAdvantage"
    url: "https://complyadvantage.com/pricing/"
    accessed: 2026-11
  - title: "Castellum.AI homepage (Arbiter AI agents)"
    publisher: "Castellum.AI"
    url: "https://www.castellum.ai/"
    accessed: 2026-11
  - title: "Unit21 homepage (AI agents for detection and investigation)"
    publisher: "Unit21"
    url: "https://www.unit21.ai/"
    accessed: 2026-11
  - title: "Hawk homepage (AML Investigative Agent)"
    publisher: "Hawk"
    url: "https://hawk.ai/"
    accessed: 2026-11
  - title: "AML Watcher introduces TruRisk to accelerate manual alert review"
    publisher: "AML Watcher"
    url: "https://amlwatcher.com/press-release/aml-watcher-introduces-trurisk-to-accelerate-manual-alert-review/"
    accessed: 2026-11
  - title: "AiPrise homepage (AI agents)"
    publisher: "AiPrise"
    url: "https://www.aiprise.com/"
    accessed: 2026-11
---

Most compliance vendors now say they use AI, and many say they sell AI agents. The words cover very different products, from a model that ranks name matches to software that works an alert from start to finish and pre-fills a suspicious activity report. This guide sorts them out, shows what the providers we review actually describe, and sets out the rules in the EU, the US and the UK that decide how far an agent may go.

## Three kinds of AI in KYC and AML

Vendors often sell three different things under one label.

| Kind | What it does | Typical KYC and AML use |
|---|---|---|
| Machine-learning models | Score, classify or match one input at a time | Document forgery checks, liveness and face match, name-match ranking, transaction anomaly scores, customer risk scores |
| Generative assistants (copilots) | Read and write text when an analyst asks | Summarising a case file, drafting a narrative, explaining why an alert fired |
| AI agents | Carry out several steps towards a goal, choose the next step themselves and record what they did | Taking an alert, pulling customer and transaction data, checking adverse media, deciding to close or escalate, drafting the case note |

The first kind has been in KYC for years. Liveness detection and document checks are machine-learning models, which is why the [Identity Verification ranking](/providers/identity-verification/) and the [liveness ranking](/providers/liveness-detection/) lean on independent lab tests rather than vendor descriptions. Agents are the new part, and the question they raise is a different one: which decisions may the software finish without a person?

## Two meanings of "AI agents" in KYC

The phrase is used in two opposite ways, and buyers mix them up.

**Agents that do compliance work.** A bank or fintech uses an agent to review its own alerts and cases. This is what most of this guide covers.

**Agents that are customers.** An AI agent opens an account, pays a bill or places an order for a person or a business. The business then has to check which agent it is, which verified customer stands behind it and what it may do. That is [Know Your Agent](/providers/know-your-agent/), a separate category with its own rubric. No certification scheme or lab test for agent verification exists yet, so scores in that ranking rest mostly on vendor statements.

The two meet in one place: a compliance agent that reads customer data has to be controlled with the same care as any other system with that access, and some screening vendors now open their data to outside agents. [AML Watcher](/providers/amlwatcher/), for example, exposes its databases to AI agents through an MCP server.

## What AI agents do in AML today

Here is what the providers we review describe on their own sites, checked in November 2026. All of it is vendor-stated: none of these vendors publishes an independent test of its agents.

| Task | What the agent does | Who closes the case | Examples |
|---|---|---|---|
| Screening alert triage | Ranks or clears sanctions and PEP name matches using date of birth, nationality and other identifiers | Varies: some clear low-risk matches, some only rank them | [AML Watcher](/providers/amlwatcher/) (TruRisk), [AiPrise](/providers/aiprise/) (AML Agent), [Castellum.AI](/providers/castellum-ai/) (Arbiter) |
| Transaction monitoring alerts | Reviews the alert, the customer and linked activity, then closes or escalates | Varies by vendor and by the customer's settings | [ComplyAdvantage](/providers/complyadvantage/), [Hawk AI](/providers/hawkai/), [Unit21](/providers/unit21/) |
| Investigation and case notes | Gathers evidence, surfaces linked entities, drafts the case narrative | Analyst | [Unit21](/providers/unit21/), [Hawk AI](/providers/hawkai/), [Sardine](/providers/sardine/) |
| Regulatory filings | Pre-fills SARs, CTRs and similar reports from the case | The institution files | [Unit21](/providers/unit21/), [Sardine](/providers/sardine/) |
| KYB document and website review | Extracts and checks company documents, reviews a business's website for risk signals | Analyst gets a recommendation | [AiPrise](/providers/aiprise/) (Document, Website and Athena agents) |

How far the agent goes differs a lot. AML Watcher says TruRisk ranks matches so that name similarity alone does not drive the outcome, and that [final outcomes remain with compliance teams](https://amlwatcher.com/press-release/aml-watcher-introduces-trurisk-to-accelerate-manual-alert-review/). [Castellum.AI](https://www.castellum.ai/) says its Arbiter agents resolve L1 and L2 alerts and escalate to human analysts when more expertise is needed, with intervention points the customer sets. [Unit21](https://www.unit21.ai/) describes investigations "executed by AI, human-in-the-loop" and filings pre-filled by agents, but its homepage does not say whether a person signs off before a filing goes out. [Hawk](https://hawk.ai/) describes a "decision-rights ladder" that ties how much an agent may do to the level of human approval each step needs.

That is the idea a buyer can use. Whether a vendor has agents matters less than how far up that ladder you let one go, and whether the product lets you set the limit per alert type and risk level.

## What the rules say

None of the rules below bans AI agents in AML or approves them as a class. What exists is a set of rules on automated decisions, on biometrics and on supervisory expectations.

### European Union: the AML Regulation and the AI Act

The [AML Regulation (EU) 2024/1624](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-76/) applies from [10 July 2027](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/). Its Article 76(5) allows obliged entities to take decisions that result from automated processes, profiling or AI systems, on three conditions:

1. the system only processes data obtained under the regulation's customer due diligence chapter;
2. any decision to enter, refuse or maintain a business relationship, to carry out or refuse an occasional transaction, or to increase or decrease the level of due diligence, is subject to meaningful human intervention;
3. the customer can get an explanation of the decision and challenge it, except where it relates to a suspicious transaction report.

Our reading: an agent may prepare and recommend, and it may clear alerts that do not change the relationship or the due diligence level. Onboarding, refusal, exit and moving a customer between simplified, standard and enhanced due diligence need a person who can actually change the outcome. The regulation does not define what makes human intervention meaningful.

The [AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3) adds a second test for the models themselves. Annex III lists remote biometric identification as high-risk but excludes biometric verification whose sole purpose is to confirm that a person is who they claim to be, which is what a standard selfie-to-document match does. Annex III also lists creditworthiness scoring, with an exception for systems used to detect financial fraud. AML risk scoring is not named, so each model has to be classified on what it does. The AI Omnibus published on 24 July 2026 moved Annex III obligations to [2 December 2027](https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus).

### United States: FinCEN's program proposal

On 7 April 2026 FinCEN [proposed](https://www.fincen.gov/news/news-releases/fincen-proposes-rule-fundamentally-reform-financial-institution-programs) a new AML/CFT program rule, with comments closed on 9 June 2026. The [proposal text](https://public-inspection.federalregister.gov/2026-07033.pdf) encourages institutions to evaluate innovative approaches, naming machine learning, generative AI and digital identity among others, and says institutions that responsibly experiment with innovative technologies will not incur additional risk of a significant supervisory or enforcement action solely because they use them. It is still a proposal, and it does not define what responsible experimentation means for an agent that closes alerts. Our [news item on FinCEN's CDD proposal](/news/fincen-proposes-cdd-rule-changes/) covers the related customer due diligence changes.

### United Kingdom: the FCA

The FCA has no AI-specific AML rule. In a [speech on 19 October 2026](https://www.fca.org.uk/news/speeches/building-future-finance-age-ai), its chief data, information and intelligence officer said firms using AI need clear accountability, risk-based controls, human oversight and escalation triggers, with senior managers personally accountable for AI systems. She said existing incident reporting rules must extend to significant AI failures and near-misses, and that agentic systems need continuous, conditional assurance because a system that was safe at launch can behave differently later. The FCA also plans a framework for agentic finance covering agent identity, delegated authority, accountability and execution, and is building AI tools to supervise the 60,000 AML firms due to join its remit in 2028.

### FATF and the industry

FATF approved a [horizon scan on AI and deepfakes](https://www.fatf-gafi.org/en/publications/Fatfgeneral/outcomes-FATF-plenary-october-2025.html) at its October 2025 plenary. It warns that criminals can exploit generative AI and AI agents, for example to produce deepfakes at scale. Our [deepfake fraud guide](/guide/synthetic-identity-and-deepfake-fraud/) covers the identity side of that threat. The [Wolfsberg Group's principles](https://wolfsberg-group.org/news/34) for AI and machine learning in financial crime compliance, published on 1 December 2022, ask for legitimate purpose, proportionate use, design and technical expertise, accountability and oversight, and openness and transparency. They predate agents but answer most of the governance questions agents raise.

## How to read vendor claims

Vendor sites quote large numbers. [ComplyAdvantage](https://complyadvantage.com/pricing/) says its agentic workflows resolve up to 85% of routine alerts autonomously, on the Agentic version of its Starter plan and on Enterprise. Castellum.AI says its agents instantly resolve 83% of L1 and L2 alerts. [AiPrise](https://www.aiprise.com/) says its AML Agent produces 95% fewer false positives. None of these pages says how the figure was measured, against which baseline, on whose data, or what share of true positives the agent missed.

That is why we do not score accuracy claims in our [methodology](/methodology/), and why the useful test is your own. Take a few thousand alerts your team has already closed, with known outcomes, and run them through the agent in a sandbox. Then look at three numbers: how many true positives it would have closed (this matters far more than the false positives it clears), how many it escalated, and whether a reviewer can follow the reasoning it recorded for each one. Hawk reports one such test on its homepage, with a customer's known false positives and true positives, which is the right shape even though it is still the vendor's report.

## Questions to ask before you buy

- Which steps can the agent close without a person, and can we set that per alert type, risk level and customer segment?
- What does the agent record for each case: inputs, sources it checked, its reasoning, the model version and the time?
- Which model does it run on, who hosts it, and does our customer data leave the region or train anyone's model?
- How do you tell us when the model or prompts change, and can we re-run our back-test before a change goes live?
- What happens to an alert when the agent is unsure or the model is unavailable?
- How does a customer get an explanation and challenge a decision, as AMLR Article 76(5) will require in the EU?
- Do you have an independent test of the agent, not only of your detection models? If not, will you support a back-test on our closed alerts?

Our [AML ranking](/providers/aml/) compares the platforms behind these agents on screening data, monitoring, coverage and price. For the wider automation picture, see [KYC automation for banks](/publications/kyc-automation-for-banks/) and our [transaction monitoring guide](/guide/transaction-monitoring-a-complete-guide/).
