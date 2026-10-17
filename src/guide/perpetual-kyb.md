---
title: "Perpetual KYB: Continuous Business Verification Explained"
seoTitle: "Perpetual KYB: How Continuous Business Checks Work | BeVerified"
seoDescription: "Perpetual KYB keeps business customer files current by reacting to registry, ownership and sanctions changes. What the rules require in 2026 and what to look for."
lede: "Perpetual KYB is ongoing due diligence on business customers that reacts to changes, such as a new director, a shift in ownership or a sanctions designation, instead of waiting for the next periodic review. It rests on the same legal duty as perpetual KYC: keep customer information current and monitor the relationship."
section: guide
published: 2025-06-16
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "Perpetual KYB watches company registries, beneficial ownership data, screening lists and account activity, and re-assesses a business customer when something relevant changes."
  - "Under the EU AML Regulation, applying from 10 July 2027, legal entities must report beneficial ownership changes to the central register within 28 calendar days, and obliged entities must update customer files at least every 1 year (higher risk) or 5 years (others)."
  - "AMLA's final draft CDD standards (30 September 2026) say central beneficial ownership registers are not enough on their own to verify ownership."
  - "Since August 2026, US companies no longer report beneficial ownership to FinCEN, so US banks rely on their own CDD collection, which a February 2026 FinCEN order lets them refresh on a risk basis."
topics: [Perpetual KYB, Beneficial Ownership, Ongoing Monitoring, Business Verification]
provider_slugs: [fullcircl, strise, kychub, smartsearch, idenfy]
ranking_keys: [kyb, aml]
faq:
  - q: "What is perpetual KYB?"
    a: "Perpetual KYB is continuous due diligence on business customers. Instead of re-checking a company only at a scheduled review, the firm monitors registry, ownership, screening and activity data and reviews the customer when a relevant change appears."
  - q: "Is perpetual KYB legally required?"
    a: "The term is not in any law. Rules such as FATF Recommendation 10, the EU AML Regulation and the UK Money Laundering Regulations 2017 require ongoing monitoring and up-to-date customer information, and perpetual KYB is one way to meet them."
  - q: "What changes should trigger a perpetual KYB review?"
    a: "Common triggers are new or removed directors, a change in shareholders or beneficial owners, a status change such as insolvency or strike-off, a sanctions or PEP match on the company or its people, adverse media, and activity that does not fit the customer's profile."
  - q: "What are the best perpetual KYB solutions?"
    a: "It depends on your markets and stack. Among providers we review, FullCircl, Strise, KYC Hub, SmartSearch and iDenfy list KYB together with ongoing monitoring in their records. Check registry coverage for your countries, how changes are detected and how alerts reach your case management."
sources:
  - title: "AMLR Article 26: Ongoing monitoring of the business relationship (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/"
    accessed: 2026-10
  - title: "AMLR Article 63: Obligations of legal entities (text of OJ L, 2024/1624)"
    publisher: "Springlex"
    url: "https://www.springlex.eu/en/packages/aml/amlr-regulation/article-63/"
    accessed: 2026-10
  - title: "Regulation (EU) 2024/1624 on the prevention of the use of the financial system for money laundering or terrorist financing"
    publisher: "EUR-Lex, Official Journal of the European Union"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng"
    accessed: 2026-10
  - title: "Final Report: Draft RTS under Article 28(1) of Regulation (EU) 2024/1624"
    publisher: "Anti-Money Laundering Authority (AMLA)"
    url: "https://www.amla.europa.eu/document/download/e15ab2e5-4074-4de8-bb9d-613dd8b7fdd1_en?filename=Final%20Report%20-%20draft%20RTS%2028%281%29%20AMLR.pdf"
    accessed: 2026-10
  - title: "Order Granting Exceptive Relief from Certain Customer Due Diligence Rule Requirements (FIN-2026-R001)"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf"
    accessed: 2026-10
  - title: "Treasury press release on the beneficial ownership information final rule"
    publisher: "U.S. Department of the Treasury"
    url: "https://home.treasury.gov/news/press-releases/sb0603"
    accessed: 2026-10
  - title: "Companies House confirms identity verification rollout from 18 November 2025"
    publisher: "GOV.UK, Companies House"
    url: "https://www.gov.uk/government/news/companies-house-confirms-identity-verification-rollout-from-18-november-2025"
    accessed: 2026-10
  - title: "The Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017, regulation 28"
    publisher: "legislation.gov.uk"
    url: "https://www.legislation.gov.uk/uksi/2017/692/regulation/28"
    accessed: 2026-10
---

A company you onboarded two years ago is not the same company today. Directors resign, shares are sold, a holding company moves to a new jurisdiction, a supplier ends up on a sanctions list. If your business customer files only get refreshed at the scheduled review, all of that sits invisible until someone opens the file. Perpetual KYB (pKYB) tries to catch those changes as they happen. It is the business-customer side of [perpetual KYC](/guide/perpetual-kyc/), with a heavier dependence on registry and ownership data.

## What perpetual KYB means

Traditional KYB is a snapshot: at onboarding you pull a registry extract, map the ownership chain, identify the beneficial owners, screen everyone and file the result. Periodic review repeats that snapshot every one, three or five years depending on risk.

The weakness of the snapshot is timing. A company's risk can change the day after the review, and the bank will not find out until the next one unless something else, such as a payment screening hit, happens to catch it. For corporate customers with layered ownership, a change three entities up the chain is particularly easy to miss.

Perpetual KYB keeps a live connection to the underlying sources. When a registry shows a new director or a changed shareholding, when a beneficial owner is newly designated or named in adverse media, or when the account behaves differently from the profile, the customer is re-assessed. Some changes update the file automatically. Others go to an analyst, especially anything that touches ownership or control.

## Why the rules point toward it

No regulator uses the phrase. The duty underneath is old: monitor the relationship and keep due diligence information current. What has changed is how specific the rules have become.

### European Union

The [AML Regulation (EU) 2024/1624](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng) applies from 10 July 2027. [Article 26](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-26/) requires ongoing monitoring and sets maximum update intervals of 1 year for higher-risk customers and 5 years for the rest, plus reviews when relevant circumstances change. On the company side, [Article 63](https://www.springlex.eu/en/packages/aml/amlr-regulation/article-63/) requires legal entities to report changes in beneficial ownership to the central register without undue delay and within 28 calendar days at the latest, and to verify their own beneficial ownership information at least once a year.

That sounds as though the register could do the monitoring for you. AMLA's [final draft CDD standards](https://www.amla.europa.eu/document/download/e15ab2e5-4074-4de8-bb9d-613dd8b7fdd1_en?filename=Final%20Report%20-%20draft%20RTS%2028%281%29%20AMLR.pdf), published on 30 September 2026, say otherwise: central registers are necessary but "not sufficient on their own" to meet verification requirements. Verification has to use a source other than the one used for identification, such as business registers or other listed sources, and recent official extracts from public registers count as reliable and independent. The draft also requires sanctions screening whenever a customer's due diligence data changes. Access to the registers themselves has been uneven; see our story on [member states missing the deadline on public access to beneficial ownership registers](/news/eu-member-states-miss-deadline-on-public-access-to-beneficial-ownership-registers/).

### United States

On 11 August 2026 Treasury [announced a final rule](https://home.treasury.gov/news/press-releases/sb0603) that permanently ends beneficial ownership reporting to FinCEN by US companies and US persons. Only foreign reporting companies still file, and only for foreign individuals. For US banks, that removes any hope of a central US register to check against. Their own CDD collection is what counts.

That collection got more flexible in February 2026. A [FinCEN order](https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf) dated 13 February 2026 means covered institutions identify and verify beneficial owners of a legal entity customer when it first opens an account, when facts call the earlier information into question, and as their risk-based ongoing due diligence requires. It no longer has to happen at every new account. That is an event-driven model in all but name.

### United Kingdom

[Regulation 28(11)](https://www.legislation.gov.uk/uksi/2017/692/regulation/28) of the Money Laundering Regulations 2017 requires ongoing monitoring and keeping CDD information up to date. Registry data has also become more trustworthy: since [18 November 2025](https://www.gov.uk/government/news/companies-house-confirms-identity-verification-rollout-from-18-november-2025) new directors and people with significant control must verify their identity with Companies House under the Economic Crime and Corporate Transparency Act 2023, with a 12-month transition for existing ones. Verified registry entries make a change on the register a more meaningful trigger.

## Inside a perpetual KYB setup

Most setups have the same layers.

1. **Registry feeds.** Direct or aggregated connections to company registers that report changes in officers, shareholders, addresses, filings and status. Coverage varies a lot by country; some registers offer change notifications, others only on-demand extracts.
2. **Ownership resolution.** A graph of the customer's ownership chain that is rebuilt when any entity in it changes, so a share transfer three levels up still reaches the right customer.
3. **Screening.** Sanctions, PEP and adverse media on the company and every relevant person, re-run when lists change and when the ownership graph changes.
4. **Activity monitoring.** Transactions compared with the declared business: sector, countries, expected volumes.
5. **Decision rules and case management.** What updates automatically, what goes to an analyst, and an audit record of each decision.

## Building the workflow

**Map what you have.** List your business customers by risk tier and the data you hold on each. Many banks find their ownership data is older and patchier than they thought, and fixing that comes first.

**Pick sources by country.** Check, for each jurisdiction you serve, whether the registry pushes changes or whether you need to poll. Where neither is possible, schedule the review more often.

**Set triggers and paths.** A change of registered address can update the file. A new beneficial owner, a new director in a high-risk customer or a sanctions match should reach a person. Write those rules down and keep the reasons.

**Keep the backstop.** Under the AMLR the 1-year and 5-year limits still apply to customers where nothing has triggered a review, so the calendar does not go away.

**Pilot, then widen.** Start with one segment, such as high-risk corporates, measure alert volumes and how many lead to a real change, then tune before rolling out.

**Track results.** Useful measures include overdue reviews, time from registry change to decision, share of alerts that change a risk rating and analyst time per review.

## What to look for in perpetual KYB software

If you are comparing tools, these questions separate them quickly:

- Which registries does it cover for your countries, and are those direct connections or third-party data?
- Does it detect changes itself and notify you, or do you have to re-run checks?
- Does it rebuild the full ownership chain when one entity in it changes?
- Are screening and KYB in one place, or will you need to join two vendors?
- How do alerts reach your case management, and is every automated decision logged?
- Can you set different refresh rules per risk tier?

## Providers we review that offer ongoing business monitoring

The list below includes only providers whose records on our site show both KYB and ongoing monitoring. It is not a ranking; for that, see our [KYB software ranking](/providers/kyb/).

| Provider | What our review records |
|---|---|
| [FullCircl](/providers/fullcircl/) | Orchestration of KYB, KYC, AML and IDV on official registry data, with onboarding plus ongoing monitoring; UK and EU focus |
| [Strise](/providers/strise/) | KYB and company data on a knowledge graph, AML screening and ongoing monitoring of existing customers |
| [KYC Hub](/providers/kychub/) | KYC, KYB and AML screening in one platform, with a no-code builder for onboarding, monitoring and escalation workflows |
| [SmartSearch](/providers/smartsearch/) | Individual and business AML/KYC checks for UK regulated firms, with ongoing monitoring |
| [iDenfy](/providers/idenfy/) | KYB and business verification alongside AML screening and ongoing monitoring |

Other KYB providers in our ranking focus on onboarding checks in the records we hold. That does not mean they lack monitoring, only that we have not verified it. Our [methodology](/methodology/) explains how we check provider claims.
