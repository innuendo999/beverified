---
title: "AI for KYC and AML: What AI Agents Do and Where People Still Decide"
seoTitle: "AI for KYC and AML: AI Agents Explained | BeVerified"
seoDescription: "What AI agents do in KYC and AML, which decisions the EU AMLR keeps with people, what vendors claim and publish, and how to test an agent yourself."
lede: "In KYC and AML, AI agents mostly do the first pass of review work: they clear obvious false alerts, gather evidence and draft case notes and reports for an analyst. EU law already requires meaningful human intervention before an automated decision to onboard, refuse or exit a customer, so the useful question for a buyer is which steps an agent may close on its own."
section: guide
cover_label: "Agents in compliance"
cover_motif: flow
cover_palette: dark
published: 2026-11-20
updated: 2026-11-20
author: andrii-klymenko
takeaways:
  - "Article 76(5) of the EU AML Regulation, which applies from 10 July 2027, requires meaningful human intervention before an automated or AI-driven decision to take on, refuse or keep a customer, to carry out or refuse an occasional transaction, or to change the level of due diligence."
  - "Clearing a false screening match or closing a monitoring alert is not on that list, so an agent can do it under the firm's own policy; reports of suspicion go to the FIU through the compliance officer under Article 69."
  - "Of nine vendors whose agent pages we checked on 20 November 2026, seven quote performance figures and none publishes the method behind them or an independent test."
  - "ComplyAdvantage is the only one of these vendors that puts an agent in a public plan, as the Agentic version of its Starter plan from $99 a month; the others do not publish a price for their agents."
  - "The reliable test is a blind back-test on alerts your team has already closed, judged first on the true positives the agent would have missed."
topics: [AI in Compliance, AI Agents, AML Investigations, Alert Triage, Know Your Agent]
provider_slugs: [complyadvantage, unit21, castellum-ai, aiprise, feedzai, sardine]
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
agent_ladder:
  title: "Who closes what under the EU AML Regulation"
  note: "Our reading of Articles 69 and 76(5) AMLR, which apply from 10 July 2027. Not legal advice."
  caption: "Source: Regulation (EU) 2024/1624, Articles 69 and 76. Article 76(5) also limits automated decisions to data collected under the due diligence chapter."
  rungs:
    - title: "The agent can close it"
      desc: "Under your own policy, with the reason recorded and a sample re-checked by people."
      items:
        - { decision: "Clear a screening match that does not fit the customer's identifiers", basis: "Not in Art. 76(5)(b)" }
        - { decision: "Close a monitoring alert as not suspicious", basis: "Not in Art. 76(5)(b)" }
        - { decision: "Escalate an alert or recommend a risk rating", basis: "A recommendation, not a decision" }
        - { decision: "Draft a suspicious activity report", basis: "Drafting is not filing" }
    - title: "A person decides, the agent can prepare"
      desc: "Meaningful human intervention is required, and the customer can ask for an explanation and challenge the decision."
      items:
        - { decision: "Take on a new customer", basis: "Art. 76(5)(b)" }
        - { decision: "Refuse a customer or end a relationship", basis: "Art. 76(5)(b) and (c)" }
        - { decision: "Carry out or refuse an occasional transaction", basis: "Art. 76(5)(b)" }
        - { decision: "Move a customer to enhanced or simplified due diligence", basis: "Art. 76(5)(b)" }
    - title: "The compliance officer sends it"
      desc: "Reports of suspicion go to the financial intelligence unit through the compliance officer."
      items:
        - { decision: "Send a suspicious activity report to the FIU", basis: "Art. 69(6)" }
agent_claims:
  title: "What vendors claim about their AI agents"
  note: "Seven of nine quote a figure. None publishes the method or an independent test. Checked on vendor pages on 20 November 2026."
  caption: "Figures are the vendors' own. Most count work removed; only Hawk AI's says anything about true positives, the number that matters for compliance."
  rows:
    - { provider: "ComplyAdvantage", slug: complyadvantage, claim: "Agentic workflows resolve up to 85% of routine alerts autonomously", method: { state: "no", text: "Not published" }, test: { state: "no", text: "None" } }
    - { provider: "Castellum.AI", slug: castellum-ai, claim: "83% of L1 and L2 alerts resolved instantly; 94% fewer false positives in screening", method: { state: "no", text: "Not published" }, test: { state: "no", text: "None" } }
    - { provider: "AiPrise", slug: aiprise, claim: "AML Agent: 95% fewer false positives", method: { state: "no", text: "Not published" }, test: { state: "no", text: "None" } }
    - { provider: "Hawk AI", slug: hawkai, claim: "In one customer test: every confirmed true positive escalated, 98% of known false positives cleared", method: { state: "partial", text: "One sentence, no report" }, test: { state: "no", text: "None" } }
    - { provider: "Feedzai", slug: feedzai, claim: "Alerts closed 20% quicker; rule analysis 13 times faster", method: { state: "no", text: "Not published" }, test: { state: "no", text: "None" } }
    - { provider: "Sardine", slug: sardine, claim: "Risk teams two to five times more efficient", method: { state: "no", text: "Not published" }, test: { state: "no", text: "None" } }
    - { provider: "Strise", slug: strise, claim: "30% fewer false positives reaching analysts", method: { state: "no", text: "Not published" }, test: { state: "no", text: "None" } }
    - { provider: "Unit21", slug: unit21, claim: "No headline figure on the homepage", no_figure: true, method: { state: "na", text: "No figure" }, test: { state: "no", text: "None" } }
    - { provider: "AML Watcher", slug: amlwatcher, claim: "No figure for TruRisk", no_figure: true, method: { state: "na", text: "No figure" }, test: { state: "no", text: "None" } }
faq:
  - q: "What is agentic AI in AML?"
    a: "Agentic AI in AML is software that works an alert or case through several steps on its own: it pulls customer and transaction data, checks screening and adverse media results, decides whether to close or escalate, and records why. A copilot only answers when an analyst asks."
  - q: "Can an AI agent file a SAR?"
    a: "Agents from vendors such as Unit21, Sardine and NICE Actimize draft the narrative or pre-fill the report. The filing stays with the institution, and in the EU the AML Regulation has the compliance officer transmit reports to the financial intelligence unit."
  - q: "Is it allowed to use AI for KYC and AML in the US?"
    a: "Yes. No US rule bans it, and FinCEN's April 2026 program proposal encourages institutions to evaluate machine learning, generative AI and digital identity tools, saying responsible experimentation will not add supervisory or enforcement risk on its own. The proposal is not final yet."
  - q: "How much do AI agents for AML cost?"
    a: "Most vendors quote on request. ComplyAdvantage is the exception among the vendors we checked: its Starter plan starts from $99 a month and comes in an Essentials version and an Agentic version with agentic workflows, without a separate price per version on the page."
  - q: "Do AI agents for AML have independent test results?"
    a: "Not among the nine vendors we checked on 20 November 2026. Several quote figures such as alerts resolved or false positives removed, but none publishes the method or an independent test of its agents."
sources:
  - title: "Regulation (EU) 2024/1624 (AMLR), Article 76: Processing of personal data"
    publisher: "OJ L, 2024/1624, via Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-76/"
    accessed: 2026-11
  - title: "Regulation (EU) 2024/1624 (AMLR), Article 69: Reporting of suspicions"
    publisher: "OJ L, 2024/1624, via Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-69/"
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
  - title: "ISO/IEC 30107-3:2023 Biometric presentation attack detection, Part 3: Testing and reporting"
    publisher: "ISO"
    url: "https://www.iso.org/standard/79520.html"
    accessed: 2026-10
  - title: "CEN/TS 18099:2024 Biometric data injection attack detection"
    publisher: "Finnish Standards Association SFS"
    url: "https://store.sfs.fi/en/cents-18099-2024"
    accessed: 2026-10
  - title: "NIST SP 800-63A-4, Digital Identity Guidelines: Identity Proofing and Enrollment"
    publisher: "National Institute of Standards and Technology"
    url: "https://pages.nist.gov/800-63-4/sp800-63a.html"
    accessed: 2026-10
  - title: "ComplyAdvantage pricing"
    publisher: "ComplyAdvantage"
    url: "https://complyadvantage.com/pricing/"
    accessed: 2026-11
  - title: "Castellum.AI homepage (Arbiter AI agents)"
    publisher: "Castellum.AI"
    url: "https://www.castellum.ai/"
    accessed: 2026-11
  - title: "Castellum.AI pricing"
    publisher: "Castellum.AI"
    url: "https://www.castellum.ai/pricing"
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
  - title: "AML Watcher announces availability of its proprietary databases over MCP server (September 2025)"
    publisher: "AML Watcher"
    url: "https://amlwatcher.com/press-release/aml-watcher-announces-availability-of-its-proprietary-databases-over-mcp-server/"
    accessed: 2026-11
  - title: "AiPrise homepage (AI agents)"
    publisher: "AiPrise"
    url: "https://www.aiprise.com/"
    accessed: 2026-11
  - title: "Agentic AI for fraud and financial crime prevention (Farol)"
    publisher: "Feedzai"
    url: "https://www.feedzai.com/solutions/ai/"
    accessed: 2026-11
  - title: "AML compliance (AI agents)"
    publisher: "Sardine"
    url: "https://www.sardine.ai/aml"
    accessed: 2026-11
  - title: "Screening and alert triage"
    publisher: "Strise"
    url: "https://strise.ai/product/screening-and-alert-triage"
    accessed: 2026-11
  - title: "A Step-by-Step Look at How Agentic AI Increases AML Investigation Productivity (infographic, June 2026)"
    publisher: "NICE Actimize"
    url: "https://resources.niceactimize.com/wp-content/uploads/2026/06/A-Step-by-Step-Look-at-How-Agentic-AI-Increases-AML-Investigation-Productivity_Infographic.pdf"
    accessed: 2026-11
  - title: "Napier AI recognised by Datos Insights for agentic AI-powered transaction monitoring innovation (10 September 2026)"
    publisher: "Napier AI"
    url: "https://www.napier.ai/post/napier-ai-datos-insights-agentic-aml-testing"
    accessed: 2026-11
---

Most compliance vendors now say they sell AI agents. The products behind the word range from a model that ranks name matches to software that works an alert from start to finish and drafts the suspicious activity report. This guide sets out which decisions an agent may take under EU law, what nine vendors say their agents do, what their performance figures are worth, what agents cost and how to test one before you sign.

## What is AI in KYC and AML?

AI in KYC and AML means machine-learning models, generative assistants and AI agents used in identity checks, screening, monitoring and investigations. The rules stay the same; AI changes who or what does each step. A model scores one input, such as a face match or a transaction. A copilot writes text when an analyst asks for it. An agent takes a task, chooses its own next steps, gathers what it needs and either closes the item or hands it to a person, recording why.

## AI in KYC onboarding and KYB

In onboarding, AI has done the checking for years: document authenticity, liveness and face matching are machine-learning models. What matters there is independent testing. Presentation attack detection is tested against [ISO/IEC 30107-3](https://www.iso.org/standard/79520.html), and deepfake video injected through a virtual camera needs separate injection attack detection, for which [CEN/TS 18099:2024](https://store.sfs.fi/en/cents-18099-2024) gives guidance. [NIST SP 800-63A-4](https://pages.nist.gov/800-63-4/sp800-63a.html) expects identity providers to check submitted media for manipulation. Our [Identity Verification ranking](/providers/identity-verification/) and [liveness ranking](/providers/liveness-detection/) score these tests, and the [deepfake fraud guide](/guide/synthetic-identity-and-deepfake-fraud/) maps each attack to its control.

Agents are newer in onboarding and mostly appear in business checks and enhanced due diligence. [AiPrise](https://www.aiprise.com/) describes a Document agent that extracts and validates company documents and shows which field was edited when one was altered, a Website agent that reviews a business's site for risk signals such as prohibited goods and shell-company indicators, and an Athena agent that cross-checks business profile sources and hands the analyst a recommendation with its reasoning. [Sardine](https://www.sardine.ai/aml) describes agents for enhanced due diligence, business verification and link analysis, with analysts approving low-risk businesses and reviewing higher-risk ones. For the wider picture of automated onboarding, see [KYC automation for banks](/publications/kyc-automation-for-banks/).

Under the EU AI Act, standard selfie-to-document matching is not a high-risk use. [Annex III](https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3) excludes biometric verification whose sole purpose is to confirm that a person is who they claim to be. Other models, such as customer risk scoring, are not named and have to be classified on what they do. Annex III obligations apply from [2 December 2027](https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus) under the AI Omnibus published on 24 July 2026.

## What AI agents do in AML

AI agents in AML do the first pass of review work: they triage screening and monitoring alerts, gather evidence, draft case notes and pre-fill reports. How many of those steps an agent may close on its own depends on the vendor and on the limits the institution sets.

| Task | What the agent does | Who closes it |
|---|---|---|
| Screening alert triage | Clears or ranks sanctions, PEP and adverse media matches using date of birth, nationality and other identifiers | Varies: some agents clear mismatches, some only rank them |
| Transaction monitoring alerts | Reviews the alert, the customer and linked activity, then closes or escalates | Varies by vendor and by the institution's settings |
| Investigations | Gathers evidence, surfaces linked entities, writes a case summary and a recommendation | Analyst |
| Regulatory reports | Drafts the SAR narrative and pre-fills report fields from the case | The institution files |
| Rule tuning | Finds rules that create noise and suggests changes | Analyst or model owner |

## AML providers with AI agents

We checked the agent pages of nine vendors on 20 November 2026. Everything in this table is what the vendor states; none of them publishes an independent test of its agents.

| Provider | Agent tasks the vendor describes | Human role the vendor describes |
|---|---|---|
| [ComplyAdvantage](/providers/complyadvantage/) | Agentic workflows for routine alerts | Not described on the pricing page |
| [Unit21](/providers/unit21/) | Detection and Investigation agents: alert review, evidence, case narratives, pre-filled SARs, CTRs, 314(a) and goAML filings | Investigations "executed by AI, human-in-the-loop"; sign-off before filing not stated |
| [Castellum.AI](/providers/castellum-ai/) | Arbiter agents resolve L1 and L2 alerts for onboarding, transaction screening and pKYC | Escalates to analysts; customer sets intervention points |
| [Hawk AI](/providers/hawkai/) | AML Investigative Agent | Autonomy tied to approval levels on a "decision-rights ladder" |
| [Feedzai](/providers/feedzai/) | Farol agent for knowledge, investigations and rule analysis | People stay accountable; AI augments analysts |
| [Sardine](/providers/sardine/) | L1 and L2 alert triage, enhanced due diligence, business verification, link analysis, SAR narrative drafting | Disposition recommendations go to human review |
| [Strise](/providers/strise/) | Clears screening mismatches automatically, scores adverse media, re-screens on list updates | Analyst reviews the evidence and decides on remaining matches |
| [AiPrise](/providers/aiprise/) | AML, Document, Website, Athena and Sherlock agents | Analysts see the hits that need judgment |
| [AML Watcher](/providers/amlwatcher/) | TruRisk ranks screening matches using identifiers beyond the name | Final outcomes stay with compliance teams |

[NICE Actimize](/providers/nice-actimize/) describes the same pattern for large banks: in its [June 2026 infographic](https://resources.niceactimize.com/wp-content/uploads/2026/06/A-Step-by-Step-Look-at-How-Agentic-AI-Increases-AML-Investigation-Productivity_Infographic.pdf) agents pre-fill SAR fields and draft the narrative, and investigators make the final determinations.

The last column is where products really differ. [Strise](https://strise.ai/product/screening-and-alert-triage) records the rationale for every match it clears in the audit trail. [Castellum.AI](https://www.castellum.ai/) lets the customer set intervention points by risk appetite. [Hawk](https://hawk.ai/) ties how much an agent may do to the approval each step needs. [Feedzai](https://www.feedzai.com/solutions/ai/) says people stay accountable while Farol takes on operational work. [Unit21's homepage](https://www.unit21.ai/) does not say whether a person signs off before a filing goes out, while [AML Watcher](https://amlwatcher.com/press-release/aml-watcher-introduces-trurisk-to-accelerate-manual-alert-review/) keeps final outcomes with the compliance team. AML Watcher also [opened its databases to outside agents](https://amlwatcher.com/press-release/aml-watcher-announces-availability-of-its-proprietary-databases-over-mcp-server/) through an MCP server in September 2025, so a firm's own agent can query them directly.

## Can an AI agent approve or reject a customer?

In the EU, not without a person. From 10 July 2027, [Article 76(5) of the AML Regulation](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-76/) lists the decisions that need meaningful human intervention when they come from automated processes or AI systems, and the customer can ask for an explanation and challenge them. Other steps are left to the firm's own policy. Here is how that maps onto agent work:

{% include "figures/agent-ladder.njk" %}

Article 76(5) also limits the data an automated system may use to what was collected under the regulation's due diligence chapter. The regulation does not define what makes intervention meaningful; in our view, a person who only confirms whatever the agent proposes is unlikely to meet it. [Article 69](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-69/) puts the duty to report suspicions on the obliged entity, and its paragraph 6 has the compliance officer transmit reports to the FIU. The AMLR applies from [10 July 2027](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-90/). This is a reading of the text, not legal advice.

## FinCEN, the FCA and FATF on AI in AML

None of them bans AI agents in AML or approves them as a class.

**FinCEN.** On 7 April 2026 FinCEN [proposed](https://www.fincen.gov/news/news-releases/fincen-proposes-rule-fundamentally-reform-financial-institution-programs) a new AML/CFT program rule. The [proposal text](https://public-inspection.federalregister.gov/2026-07033.pdf) encourages institutions to evaluate machine learning, generative AI and digital identity, and says responsible experimentation with innovative technologies will not, on its own, add risk of a significant supervisory or enforcement action. It is not final, and it does not define responsible experimentation for an agent that closes alerts. Our [FinCEN CDD news item](/news/fincen-proposes-cdd-rule-changes/) covers the related due diligence changes.

**FCA.** The FCA has no AI-specific AML rule. In a [speech on 19 October 2026](https://www.fca.org.uk/news/speeches/building-future-finance-age-ai) it asked firms using AI for clear accountability, human oversight and escalation triggers, with senior managers personally accountable for AI systems, and said incident reporting must extend to significant AI failures and near-misses.

**FATF and the Wolfsberg Group.** FATF's [horizon scan on AI and deepfakes](https://www.fatf-gafi.org/en/publications/Fatfgeneral/outcomes-FATF-plenary-october-2025.html), approved in October 2025, warns that criminals exploit generative AI and AI agents. The [Wolfsberg principles](https://wolfsberg-group.org/news/34) of December 2022 set the governance basics: legitimate purpose, proportionate use, design and technical expertise, accountability and oversight, openness and transparency.

## How accurate are AI agents?

We found no independent measurement. The accuracy figures on vendor sites come without a published method, baseline or independent test.

{% include "figures/agent-claims.njk" %}

That is why our [methodology](/methodology/) does not score vendor accuracy claims.

## How to back-test an AI agent on your own alerts

A back-test runs the agent on alerts your team has already closed and compares its decisions with yours. This is the method we recommend:

1. **Pick a closed period.** Use alerts old enough to have final outcomes, including cases that ended in a report.
2. **Build the sample.** Include every alert that was escalated or reported in that period, plus a random sample of alerts closed as false positives, split by alert type (sanctions, PEP, adverse media, each monitoring scenario).
3. **Freeze the setup.** Record the agent's configuration, model version and the limits you gave it. Results only hold for that setup.
4. **Run it blind.** The agent must not see your past decisions or case notes.
5. **Count misses first.** List every escalated or reported alert the agent would have closed, and read each one. Then count escalations, alerts it closed, and agreement with your analysts on the false positives.
6. **Review the reasoning.** Have a senior analyst read a sample of the agent's recorded rationale. A correct outcome with reasoning nobody can follow will not help you in an audit.
7. **Set the pass mark before you run.** Write down how many missed true positives you accept per alert type, so the result is not argued after the fact.
8. **Re-run after changes.** Ask the vendor to tell you about model or prompt changes and repeat the test before they go live.

If you have few labelled cases, synthetic data is an option. [Napier AI](https://www.napier.ai/post/napier-ai-datos-insights-agentic-aml-testing) has an Agentic Test Simulator, in closed beta as of September 2026, that tests monitoring systems against synthetic customers with labelled illicit events. Napier says its early results show potential rather than validated customer outcomes.

## What AI agents cost

Of the vendors in this guide, only ComplyAdvantage puts an agent in a public plan. [Its pricing page](https://complyadvantage.com/pricing/) lists a Starter plan from $99 a month, for 100 to 2,000 monitored entities, in two versions: Essentials, and Agentic, which adds agentic workflows. The page does not show a separate price for each version or each entity tier. Enterprise is priced on application.

[Castellum.AI's pricing page](https://www.castellum.ai/pricing) shows no figures. AML Watcher sells TruRisk as a paid add-on for existing clients without a public price. Unit21, Hawk AI, Feedzai, Sardine, Strise, AiPrise and NICE Actimize quote on request, as recorded in our reviews in October 2026. Ask whether agents are priced per alert, per seat or as a platform module, and whether a pilot on your own alerts is included.

## AI agents for KYC vs Know Your Agent

AI agents for KYC work for the compliance team. [Know Your Agent](/providers/know-your-agent/) is the reverse: the checks a business runs on an AI agent that acts for one of its customers, such as which verified person stands behind it and what it may do. It has its own ranking and rubric. No certification scheme or lab test for agent verification exists yet, so scores there rest mostly on vendor statements.

## Checklist: questions for an AI agent vendor

- Which steps can the agent close without a person, and can we set that per alert type, risk level and customer segment?
- What does it record for each case: inputs, sources checked, reasoning, model version and time?
- Which model does it run on, who hosts it, and does our data leave the region or train anyone's model?
- Will you support a blind back-test on our closed alerts before we sign, and repeat it after model changes?
- What happens to an alert when the agent is unsure or the model is unavailable?
- How does a customer get an explanation and challenge a decision, as AMLR Article 76(5) will require in the EU?

Our [AML ranking](/providers/aml/) compares the platforms behind these agents on screening data, monitoring, coverage and price, and the [transaction monitoring guide](/guide/transaction-monitoring-a-complete-guide/) covers the detection layer the agents sit on.
