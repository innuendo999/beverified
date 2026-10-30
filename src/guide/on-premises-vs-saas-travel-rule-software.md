---
title: 'On-premises vs SaaS Travel Rule Software: What Changes for Data Protection, Audits and Vendor Risk?'
seoTitle: On-Premises vs SaaS Travel Rule Software | BeVerified
seoDescription: How on-premises and SaaS Travel Rule software differ for data protection, audits and vendor risk, and what CASPs should check under GDPR, MiCA and DORA.
lede: Choosing a Travel Rule solution is not just a technical decision. For crypto asset service providers (CASPs), the software's deployment model can influence how sensitive customer information is stored, how quickly compliance records can be retrieved, and how much the business depends on external technology providers.
section: guide
cover_label: On-prem or SaaS
cover_motif: network
cover_palette: light
published: 2026-10-30
updated: 2026-10-30
author: andrii-klymenko
takeaways:
- An on-prem solution can keep sensitive Travel Rule information within the CASP's own infrastructure, while a SaaS arrangement involves external hosting and processing, thereby affecting data control.
- The deployment architecture can support data protection controls, but compliance also depends on lawful processing, access controls, retention, security and accountability.
- Keeping records within the organisation's infrastructure makes retrieval and reporting more direct, whereas a SaaS arrangement introduces dependencies on the provider's processes and availability, affecting an entity’s audit readiness.
- A regulated entity remains responsible for meeting its applicable obligations, even when it relies on an external service provider.
- Hosting arrangements, subcontractors, service availability, contractual audit rights and cross-border data transfers may require additional due diligence and vendor considerations with SaaS providers.
- With on-prem solutions CASPs gain greater control over their environment but must maintain appropriate infrastructure, access management, monitoring and operational processes.
- The ability to seamlessly exchange Travel Rule information is important, but it should not be the only factor in selecting a solution, product architecture should be part of the compliance assessment.
topics:
- Travel Rule
- Travel Rule Software
- GDPR
- DORA
- Vendor Risk
about_terms:
- travel-rule
- crypto-asset-service-provider
- mica
provider_slugs:
- 21analytics
ranking_keys:
- travel-rule
- crypto
internal_links_min: 1
faq:
- q: Does using a SaaS Travel Rule provider create GDPR risks?
  a: A SaaS arrangement introduces additional data protection considerations as the provider and its subcontractors process and store personal data. The CASP should assess the provider's role, the locations of processing, access permissions, retention and deletion arrangements, and the safeguards governing any international transfers. SaaS does not automatically mean non-compliance with the GDPR. Compliance depends on the actual processing arrangement and the controls in place.
- q: How does deployment architecture affect regulatory audits?
  a: With an on-prem solution, records are directly accessible within the CASP's own environment. With SaaS, access may depend partly on the provider's export tools, service availability and contractual arrangements. Either model can support effective audits if the necessary records are complete, retrievable, appropriately retained and supported by adequate procedures.
- q: Does DORA prohibit SaaS Travel Rule software?
  a: DORA does not prohibit SaaS Travel Rule solutions. DORA addresses ICT risk management, operational resilience and ICT third-party risk for entities within its scope. A CASP should assess whether a SaaS arrangement meets its applicable obligations, including relevant third-party risk management, contractual and resilience requirements.
- q: What should a CASP prioritise when choosing a Travel Rule solution?
  a: A CASP should assess the solution's compliance functionality, data flows, security controls, audit capabilities, operational resilience and vendor dependencies. The deployment model should be evaluated as part of this broader assessment rather than as an isolated technical preference.
sources:
- title: Regulation (EU) 2016/679, General Data Protection Regulation (GDPR)
  publisher: EUR-Lex
  url: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
  accessed: 2026-10
- title: Regulation (EU) 2023/1114 on markets in crypto-assets (MiCA)
  publisher: EUR-Lex
  url: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114&pk_keyword=Crypto%20assets&pk_content=Regulation&pk_cid=EURLEX_todaysOJ
  accessed: 2026-10
- title: Regulation (EU) 2022/2554 on digital operational resilience (DORA)
  publisher: EUR-Lex
  url: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554
  accessed: 2026-10
- title: 21 Analytics
  publisher: 21 Analytics
  url: https://www.21analytics.co/
  accessed: 2026-10
- title: TRUST (Travel Rule Universal Solution Technology)
  publisher: Coinbase
  url: https://www.coinbase.com/travelrule
  accessed: 2026-10
---

Software-as-a-Service (SaaS) solutions offer convenience, potentially lower implementation costs and faster deployment. However, when a Travel Rule provider hosts or processes sensitive customer information, the arrangement introduces additional considerations around data access, contractual safeguards, audit readiness and third-party risk.

An on-premises (on-prem), or self-hosted, solution takes a different approach. The software runs within the entity's own infrastructure, allowing the business to retain direct control over the environment in which Travel Rule information is processed and stored.

Neither deployment model removes the need for effective security and governance. The important distinction is how responsibilities, dependencies and data access are distributed between the regulated entity and its technology provider.

This article compares on-prem and SaaS Travel Rule software across three areas: data protection, audits and regulatory oversight, and vendor risk. It also explains what [CASPs](/glossary/crypto-asset-service-provider/) should assess when selecting a solution under frameworks such as the General Data Protection Regulation ([GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)), the Markets in Crypto-Assets Regulation ([MiCA](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114&pk_keyword=Crypto%20assets&pk_content=Regulation&pk_cid=EURLEX_todaysOJ)) and the Digital Operational Resilience Act ([DORA](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2554)).

## Why Travel Rule Software Architecture Is Crucial

The Travel Rule requires relevant information about the originator and beneficiary to accompany covered transfers of funds or crypto-assets, subject to the applicable legal framework.

Operationalising these requirements involves more than transmitting information between counterparties. A [Travel Rule solution](/providers/travel-rule/) also needs to support counterparty discovery, self-hosted wallet verification, compliance workflows and the retention of records.

The information involved is sensitive. Depending on the transaction and applicable requirements, it may include names, account or wallet details, identifying information and other personal data.

The way a Travel Rule solution is deployed determines where this information is processed and stored, which systems it passes through, and which parties may have access to it.

This makes deployment architecture relevant to several compliance questions:

* Where is customer information stored?
* Can the software provider access or process that information?
* Who controls access permissions and retention policies?
* How quickly can transaction records be retrieved for an audit or regulatory request?
* What happens if the provider experiences an outage?
* Does the arrangement introduce cross-border data transfers or additional subcontractors?
* Which contractual and technical controls govern the provider's responsibilities?
* What happens if the provider goes out of business?

These questions apply regardless of the chosen deployment model. However, the answers may differ considerably between an on-prem solution and a SaaS platform.

## On-premises vs SaaS: Understanding the Difference

### What Is On-prem Travel Rule Software?

An on-premises Travel Rule solution is installed and operated within the CASP's own infrastructure.

The organisation maintains control over the environment in which the software runs and where the associated data is stored. Depending on the implementation, this may be the organisation's own servers or infrastructure that it directly manages.

With this model, sensitive customer information can remain within the CASP's environment rather than being stored in an external provider's application infrastructure.

The CASP retains responsibility for operating and securing that environment, including the configuration of access controls, system monitoring, backups and other relevant security measures.

[21 Analytics](https://www.21analytics.co/) provides an example of this approach: its on-premises Travel Rule software runs within the CASP’s own IT environment.

### What Is SaaS Travel Rule Software?

A Software-as-a-Service solution is hosted and operated by a provider, with the customer accessing the software as a service.

Customer information is processed and stored in the provider's cloud environment. The provider may also rely on external infrastructure providers or other subcontractors, for example cloud providers such as AWS or Google Cloud.

SaaS can reduce the customer's initial infrastructure and deployment requirements. It may also allow the provider to manage updates and parts of the operational environment.

However, the CASP must understand which data is processed externally, which parties can access it, where it is located, and what contractual and technical controls apply.

Not every SaaS architecture is identical, just as not every on-prem implementation provides the same level of security. The actual data flows, access arrangements and responsibilities should be assessed rather than inferred from the deployment label alone.

### Comparing the Two Models

{% include "figures/onprem-vs-saas.njk" %}

| Consideration | Self-hosted solution | SaaS solution |
| ----- | ----- | ----- |
| Data storage | Remains within the CASP's infrastructure | Stored in the provider's infrastructure |
| Data access | Controlled through the CASP's environment and permissions | Accessible by the CASP and provider |
| Security management | The CASP manages the deployment environment and its security controls. Provider provides security updates to the solution which must be installed by the CASP. | Mostly with the provider; the CASP remains accountable |
| Data retention | The CASP can manage retention within its own environment, subject to applicable requirements | Retention and deletion depends on provider capabilities and contractual terms |
| Audit evidence | Records are directly accessible within the CASP's systems | Retrieval depends on provider tools, procedures and availability |
| Third-party dependencies | Can reduce reliance on external hosting for Travel Rule data and service availability | Introduces dependencies on the provider and its infrastructure or subcontractors |
| Implementation | Requires deployment and maintenance within the CASP's environment | Offers faster deployment and lower initial infrastructure requirements |
| Operational responsibility | Greater direct control, alongside responsibility for the environment | Some operational tasks are outsourced, but regulatory accountability remains with the CASP |

This comparison describes typical architectural differences. Actual arrangements depend on the specific solution, contractual terms and implementation.

### Network Access and Integration

Deployment decisions also need to account for access to relevant Travel Rule networks. As of October 2026, no SaaS Travel Rule provider offers built-in access to [TRUST](https://www.coinbase.com/travelrule). Eligible CASPs can integrate TRUST directly or use 21 Analytics’ on-premises solution, which includes TRUST connectivity. A CASP choosing SaaS may therefore need a separate integration to exchange information through TRUST.

## Data Protection: Who Controls Sensitive Travel Rule Information?

Data protection is one of the most important considerations when selecting Travel Rule software.

The GDPR establishes requirements governing the processing of personal data, including the principles of data minimisation, purpose limitation, accuracy, storage limitation, integrity, confidentiality and accountability.

A Travel Rule solution should support the organisation's ability to apply these principles throughout the information lifecycle.

### The Implications of SaaS Hosting

When a SaaS provider hosts or processes Travel Rule information, the CASP needs to understand the provider's role in that processing and the associated data flows.

Depending on the arrangement, relevant questions include:

* Where does the provider store personal data?
* Can the provider's personnel or subcontractors access customer information?
* In which locations is the information processed and stored?
* Which sub processors support the service?
* How are access permissions managed and reviewed?
* How are data retention and deletion implemented?
* What happens to the data when the contract ends?
* What safeguards apply if information is transferred internationally?
* What happens to the data if the company goes out of business?

These details help determine the extent of the organisation's reliance on external parties to protect information and meet its data protection obligations.

A SaaS provider may offer strong security controls, but the CASP still needs sufficient information to assess whether the arrangement is appropriate for the sensitivity of the data and the applicable regulatory requirements.

Where a SaaS Travel Rule provider stores sensitive information for multiple CASPs, the concentration of customer and transaction data can make it a more attractive target for cyberattacks. Depending on the architecture and scope of a compromise, a breach could expose information belonging to several CASPs.

On-premises deployments avoid this particular concentration of data at the Travel Rule provider, although each CASP remains responsible for securing its own environment.

### How On-premises Solutions Change Data Control

An on-prem solution can keep Travel Rule information within the CASP's own infrastructure, reducing the need to share that information with an external Travel Rule hosting provider.

This gives the organisation more direct control over the environment in which customer information is stored and processed. It can configure access permissions, manage retention and deletion, and apply security policies according to its internal requirements.

Keeping data within the organisation's infrastructure can also reduce exposure associated with external hosting arrangements and limit certain cross-border data transfer considerations.

However, on-prem does not automatically establish GDPR compliance. The CASP must still have an appropriate legal basis for processing, collect only the information it needs, apply suitable security measures, meet retention requirements and demonstrate accountability.

The relevant advantage is greater direct control over the data environment, not an exemption from data protection obligations.

#### Data Minimisation and Purpose Limitation per the GDPR

The GDPR's data minimisation principle requires personal data to be adequate, relevant and limited to what is necessary for the purpose of processing. Purpose limitation requires information to be collected for specified, explicit and legitimate purposes and handled consistently with those purposes.

Travel Rule software should support a controlled approach to collecting, processing and retaining information.

A CASP should therefore assess whether the solution processes only the information needed for its intended compliance functions and whether additional access, storage or processing is necessary.

Deployment architecture matters because it influences where this processing occurs and which parties are involved. A self-hosted deployment reduces the number of external parties involved in hosting Travel Rule data, while a SaaS deployment requires the organisation to assess the provider's processing arrangements and safeguards.

Neither model removes the need to apply the GDPR's principles throughout the data lifecycle.

## Audits and Regulatory Requests

Travel Rule compliance involves maintaining records that may need to be retrieved for internal reviews, audits, investigations or lawful regulatory requests, depending on the jurisdiction this can be anything from 5 years up to 10 years.

The ability to access these records promptly can affect the efficiency of compliance operations.

### Audit Considerations with SaaS

In a SaaS arrangement, the CASP may rely on the provider's tools, data export functions and operational procedures to retrieve certain information.

The practical implications depend on the service. A provider may offer comprehensive export and audit capabilities, but the CASP should verify that those capabilities meet its needs.

Questions to consider include:

* Can transaction records be exported in a usable format?
* Are the required fields available for the relevant jurisdiction?
* Can records be retrieved within the organisation's required timeframe?
* Are access and processing events recorded where necessary?
* Can the organisation verify the integrity and completeness of exported records?
* Are audit rights and assistance obligations defined in the contract?
* Will the organisation retain access to its records if the service is disrupted or the contract ends?
* What happens to the data if the provider goes out of business?

If records are incomplete, difficult to retrieve or dependent on a provider's internal processes, preparing for an audit may require additional coordination.

This does not mean that SaaS solutions are inherently unauditable. Rather, audit readiness depends on the provider's capabilities, the contract and the organisation's own procedures.

### Audit Considerations with On-prem Software

When Travel Rule records remain within the CASP's infrastructure, the organisation can access them through its own systems and established procedures.

This can make record retrieval, reporting and internal review more direct. It can also reduce dependence on an external provider when preparing evidence for an audit or responding to a lawful request.

The practical distinction is control over access. An on-prem architecture gives organisations more direct access to their own records, while a SaaS architecture may require additional coordination with the provider. The quality of the actual audit process depends on how each system is configured and operated.

## Vendor Risk: What Happens When Compliance Depends on an External Provider?

Vendor risk extends beyond the possibility of a data breach. It also includes operational availability, subcontractor dependencies, contractual limitations and the organisation's ability to maintain compliance if a provider experiences difficulties.

Under frameworks such as MiCA and DORA, regulated entities need to consider the risks associated with outsourcing and their reliance on external service providers. Outsourcing operational activities does not remove the regulated entity's responsibility for meeting its applicable obligations.

### Third-party Hosting and Subcontractors

A SaaS Travel Rule solution may depend on the provider's hosting infrastructure, cloud services and other subcontractors.

Each additional dependency can introduce questions about access, security, availability, incident response and contractual accountability.

A CASP should understand the service's dependency chain and assess whether the provider's arrangements meet its requirements.

Due diligence may include reviewing:

* Security controls and independent assurance reports.
* The provider's incident detection and notification processes.
* Business continuity and disaster recovery arrangements.
* The use of subcontractors and the locations in which data is processed.
* Contractual commitments concerning confidentiality, access, retention and deletion.
* The provider's ability to support audits and regulatory requests.
* Exit arrangements and the return or deletion of customer data.

The extent of due diligence should reflect the nature of the service, the sensitivity of the information and the relevant regulatory requirements.

### Operational Availability and Continuity

A Travel Rule solution is part of the operational process required to assess or process crypto-asset transfers.

If a hosted service becomes unavailable, the CASP is unable to use the relevant functions until the provider restores service or an alternative process is activated.

An on-prem solution can reduce dependence on an external provider's hosting availability for day-to-day operation. However, it does not eliminate operational risk. The CASP remains responsible for the availability, resilience, maintenance and security of its own environment.

The organisation should therefore assess the failure scenarios relevant to each model.

For SaaS, this includes the provider's uptime commitments, incident response, recovery arrangements and service continuity. For self-hosted software, it includes infrastructure resilience, internal technical capacity, backups, patching and recovery procedures.

The goal is not simply to minimise the number of vendors. It is to ensure that the selected architecture supports the organisation's operational resilience requirements.

### Data Access and Provider Dependence

A further consideration is what happens if the organisation changes providers, terminates a contract or needs to migrate its records.

The CASP should establish whether it can retrieve the necessary information in a usable format, how quickly it can do so and what happens to retained copies after termination.

An on-prem deployment reduces dependence on a third-party host for access to Travel Rule records. The organisation should still plan for software maintenance, support and eventual migration.

With SaaS, exit planning should address data portability, access during transition, deletion obligations and the continuity of compliance operations.

These arrangements should be understood before the service is adopted, not only when the organisation is preparing to leave it.

## What the GDPR, MiCA and DORA Mean for the Decision

The GDPR, MiCA and DORA address different aspects of regulatory compliance. They should not be treated as interchangeable, and choosing a particular deployment model does not, by itself, establish compliance with any of them.

### GDPR: Data Protection

The GDPR governs the processing of personal data. Its requirements include data minimisation, purpose limitation, storage limitation, integrity, confidentiality and accountability.

For Travel Rule software, the key considerations include the data being processed, the parties involved, the locations of processing and storage, access controls, retention and deletion.

An on-prem architecture supports direct control over these areas by keeping information within the CASP's infrastructure. A SaaS arrangement requires the organisation to assess the provider's role, safeguards and contractual arrangements.

The appropriate assessment depends on the actual processing activities and applicable legal requirements.

### MiCA: Accountability for Regulated CASPs

MiCA establishes a regulatory framework for crypto-asset markets and crypto-asset service providers within its scope.

When selecting technology that supports compliance operations, a CASP should consider how the arrangement fits within its governance, operational controls and wider regulatory responsibilities.

Where a third-party service is involved, the organisation should understand the division of responsibilities and how it will maintain appropriate oversight.

An on-prem deployment reduces certain external dependencies, but it does not remove the need for governance, operational controls or oversight of the software itself.

### DORA: ICT risk and operational resilience

DORA establishes requirements concerning ICT risk management and digital operational resilience for financial entities within its scope. It also addresses ICT third-party risk management.

For a Travel Rule solution, relevant considerations can include system availability, incident management, continuity arrangements, access to information, contractual provisions and dependencies on external ICT service providers.

A SaaS model requires the CASP to assess the provider's resilience, subcontracting arrangements and contractual commitments as part of its third-party risk management.

An on-prem model reduces reliance on external hosting for the application and its data, but the CASP must manage the relevant ICT risks within its own environment.
