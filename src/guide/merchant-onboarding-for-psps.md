---
title: "Merchant Onboarding for PSPs: KYB, MATCH and Website Checks"
seoTitle: "Merchant Onboarding for PSPs: KYB and MATCH Checks | BeVerified"
seoDescription: "What card schemes and AML rules ask a PSP to check before a merchant goes live, and which KYB vendors document website, MCC and MATCH checks."
lede: "A PSP onboarding a merchant has to verify the business and its owners, check Mastercard MATCH and Visa VMSS, confirm the merchant category code and review the website. Standard KYB covers the first part, and none of the providers in our KYB ranking documents a MATCH or VMSS check."
section: guide
cover_label: "Onboarding merchants"
cover_motif: bank
updated: 2026-11-23
author: andrii-klymenko
takeaways:
  - "Mastercard acquirers must use MATCH Pro, and Visa's payment facilitator guide says payment facilitators must query VMSS for each prospective seller."
  - "Mastercard tells acquirers to check that a merchant's category code matches what it sells and to review merchant websites periodically after onboarding."
  - "Visa's acquirer monitoring program (VAMP) measures fraud and disputes per acquirer from June 2025, and the excessive merchant threshold dropped to 150 basis points in the US, EU, Canada and Asia Pacific on 1 April 2026."
  - "Among the providers in our KYB ranking, Persona is the only one whose own documentation describes both a website check and MCC classification, as of 23 November 2026."
topics: [Merchant Onboarding, Business Verification, Payments, Card Schemes]
provider_slugs: [persona, idenfy, enigma, signicat, gbg, trulioo]
ranking_keys: [kyb, aml]
about_terms: [know-your-business, ultimate-beneficial-owner]
mention_orgs:
  - name: "Financial Crimes Enforcement Network"
    url: "https://www.fincen.gov/"
  - name: "Financial Conduct Authority"
    url: "https://www.fca.org.uk/"
faq:
  - q: "Is KYB enough for merchant onboarding?"
    a: "No. KYB verifies the company and its owners, but card scheme rules also ask the acquirer or payment facilitator to check terminated-merchant lists (Mastercard MATCH, Visa VMSS), confirm the merchant category code and review the merchant's website. Most KYB vendors we checked document only the KYB part."
  - q: "What is the MATCH list?"
    a: "MATCH Pro is Mastercard's database of merchants that an acquirer terminated for defined reasons. Mastercard says it is mandatory for its acquirers, and an inquiry shows whether another acquirer terminated the merchant in the past five years."
  - q: "Do payment facilitators have to screen sub-merchants?"
    a: "Yes, under Visa's guide for payment facilitators. It says payment facilitators must query VMSS for each prospective seller, underwrite and authenticate it in line with AML and KYC laws, and monitor sellers and their websites after onboarding. The acquirer stays responsible for the payment facilitator and its sponsored merchants."
  - q: "How often should a PSP re-check its merchants?"
    a: "Card schemes ask for continuous monitoring of sellers and periodic website reviews. Under the EU AML Regulation, from 10 July 2027, customer information must be updated at least every year for higher-risk customers and every five years for all others."
sources:
  - title: "MATCH Pro documentation"
    publisher: "Mastercard Developers"
    url: "https://developer.mastercard.com/match/documentation/"
    accessed: 2026-11
  - title: "MATCH Pro use cases"
    publisher: "Mastercard Developers"
    url: "https://developer.mastercard.com/match/documentation/use-cases/"
    accessed: 2026-11
  - title: "Visa Merchant Screening Service: how to"
    publisher: "Visa Developer"
    url: "https://developer.visa.com/capabilities/visa-merchant-screening-service/docs-how-to"
    accessed: 2026-11
  - title: "Payment Facilitator and Marketplace Risk Guide (April 2021)"
    publisher: "Visa"
    url: "https://usa.visa.com/content/dam/VCOM/regional/na/us/partner-with-us/documents/visa-payment-facilitator-and-marketplace-risk-guide.pdf"
    accessed: 2026-11
  - title: "Stopping scam sites: a practical guide for issuers and acquirers"
    publisher: "Mastercard"
    url: "https://www.mastercard.com/content/dam/mccom/shared/news-and-trends/insights/2025/scam-websites/Best%20Practices_November%202025.pdf"
    accessed: 2026-11
  - title: "Visa Acquirer Monitoring Program fact sheet"
    publisher: "Visa"
    url: "https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf"
    accessed: 2026-11
  - title: "31 CFR 1010.230, Beneficial ownership requirements for legal entity customers"
    publisher: "eCFR"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-B/section-1010.230"
    accessed: 2026-11
  - title: "FinCEN Order FIN-2026-R001, exceptive relief from beneficial ownership verification at each new account (13 February 2026)"
    publisher: "FinCEN"
    url: "https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf"
    accessed: 2026-11
  - title: "Regulation (EU) 2024/1624 on the prevention of the use of the financial system for money laundering or terrorist financing"
    publisher: "EUR-Lex, Official Journal of the European Union"
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401624"
    accessed: 2026-11
  - title: "Money laundering and terrorist financing"
    publisher: "Financial Conduct Authority"
    url: "https://www.fca.org.uk/firms/money-laundering"
    accessed: 2026-11
---
{%- set kyb = [] -%}
{%- for e in rankings.kyb.providers -%}{%- if e.slug and allProviders[e.slug] -%}{%- set _x = kyb.push({ slug: e.slug, p: allProviders[e.slug] }) -%}{%- endif -%}{%- endfor -%}
{%- set kybSorted = kyb | sort(false, false, "p.name") -%}
{%- set stLabel = { "yes": "Yes", "add_on": "Add-on or partner", "no": "No", "not_disclosed": "Not found" } -%}
{%- set matchList = [] -%}{%- set webList = [] -%}
{%- for r in kyb -%}{%- set c = r.p.capabilities or {} -%}
{%- if c.kyb_match_vmss and c.kyb_match_vmss.status in ["yes", "add_on"] -%}{%- set _m = matchList.push(r.slug) -%}{%- endif -%}
{%- if c.kyb_website_check and c.kyb_website_check.status in ["yes", "add_on"] -%}{%- set _w = webList.push(r.slug) -%}{%- endif -%}
{%- endfor %}
A payment service provider that signs up a merchant takes on that merchant's fraud, disputes and compliance risk, and so does the acquirer behind it. Checking that the company exists and who owns it is only part of the job. Card scheme rules add checks that ordinary KYB tools were not built for, and since Visa started measuring fraud and disputes per acquirer, a weak onboarding decision now shows up in the acquirer's numbers.

Below: what the card schemes and AML rules ask for, and what the providers in our [KYB ranking](/providers/kyb/) document in public against that list. It explains rules and is not legal advice.

## What card schemes and regulators ask for at onboarding

Most of these checks come from card scheme rules, not from AML law. Acquirers carry them, and payment facilitators run them for their sub-merchants.

| Check | Who asks for it | What it means in practice |
|---|---|---|
| Terminated merchant lists | Mastercard, Visa | Search Mastercard MATCH and Visa VMSS before signing |
| Merchant category code | Mastercard, Visa | The MCC must match what the merchant actually sells |
| Website review | Visa, Mastercard | Screen the site at onboarding and keep reviewing it |
| Business and owner verification | AML law (US, EU, UK) | Verify the company, its beneficial owners and a controlling person |
| Ongoing monitoring | Visa, AML law | Watch activity and refresh customer information on a schedule |

### Terminated merchant lists

[Mastercard's MATCH Pro documentation](https://developer.mastercard.com/match/documentation/) calls it a mandatory system for Mastercard acquirers, and its [use cases page](https://developer.mastercard.com/match/documentation/use-cases/) explains that an inquiry shows whether another acquirer terminated the merchant in the past five years. Visa runs the same kind of list: its [VMSS documentation](https://developer.visa.com/capabilities/visa-merchant-screening-service/docs-how-to) describes one database of terminated merchants, sponsored merchants and third-party agents, and requires acquirers to list a termination one business day after it happens. Visa's [guide for payment facilitators](https://usa.visa.com/content/dam/VCOM/regional/na/us/partner-with-us/documents/visa-payment-facilitator-and-marketplace-risk-guide.pdf) says payment facilitators must query VMSS for each prospective seller, and that a VMSS result should not be the only reason to decline one.

### Category code and website

In its [guide to stopping scam sites](https://www.mastercard.com/content/dam/mccom/shared/news-and-trends/insights/2025/scam-websites/Best%20Practices_November%202025.pdf), Mastercard tells acquirers to check that the merchant's category code matches the goods or services it sells, and to review newer merchant websites and apps after onboarding. Visa's payment facilitator guide asks for ongoing monitoring of sellers' e-commerce sites for illegal activity, transaction laundering and deceptive marketing. A screening vendor can do the work, but the guide keeps accountability with the payment facilitator and the acquirer.

### Business and owners

This is the part AML law covers, and the part a [KYB provider](/glossary/know-your-business/) sells:

- United States: the [beneficial ownership rule](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-B/section-1010.230) at 31 CFR 1010.230 asks covered financial institutions to identify and verify each person who owns 25 percent or more of a legal entity customer, plus one person who controls it. A [FinCEN order of 13 February 2026](https://www.fincen.gov/system/files/2026-02/FinCEN-Order-CCDExceptiveRelief.pdf) lets them do this when the customer first opens an account, when facts call the earlier information into question, and as their risk-based procedures require, instead of at every new account.
- European Union: the [EU AML Regulation](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401624) applies from 10 July 2027. Credit and financial institutions are obliged entities, a [beneficial owner](/glossary/ultimate-beneficial-owner/) is anyone with 25 percent or more of the shares, voting rights or other ownership interest, and Article 26 caps the time between updates of customer information at one year for higher-risk customers and five years for all others.
- United Kingdom: the [FCA](https://www.fca.org.uk/firms/money-laundering) lists payment institutions and e-money institutions among the firms that normally fall under the Money Laundering Regulations, which require a risk assessment, controls and customer due diligence.

## VAMP: why one bad merchant now hurts the acquirer

Visa's [acquirer monitoring program](https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf) (VAMP) replaced Visa's separate fraud and dispute monitoring programs with one global program, outside Brazil, Chile and India for now. It covers acquirers, their registered agents and merchants. New thresholds took effect on 1 June 2025, and the advisory period ended on 30 September 2025.

The VAMP ratio counts fraud reports (TC40) and disputes (TC15) and divides them by settled card-not-present transactions. An acquirer is above standard at 50 basis points and excessive at 70, once it has at least 1,500 fraud reports and disputes in a month (in the US, EU, Canada and Asia Pacific). A single merchant counts as excessive at 220 basis points, a threshold Visa lowered to 150 basis points in those same regions on 1 April 2026.

Visa's payment facilitator guide already said the acquirer is responsible for the acts of its payment facilitators and their sponsored merchants. VAMP now measures it month by month. A merchant that would never have passed a terminated-list search or a website review is cheapest to stop at onboarding, before its disputes reach the acquirer's ratio.

## What ranked KYB providers document for PSPs

We checked the public documentation of the {{ kyb | length }} providers in our KYB ranking on 23 November 2026, looking for the checks above that go beyond standard KYB. Everything in the table is vendor-stated. "Not found" means we found nothing in public documentation, not that the feature does not exist. Providers are listed A to Z, because this is not a ranking.

<table>
<caption>Merchant onboarding checks documented by the {{ kyb | length }} providers in our KYB ranking, checked 23 November 2026</caption>
<thead><tr><th scope="col">Provider</th><th scope="col">Company registries</th><th scope="col">Website check</th><th scope="col">Industry or MCC classification</th><th scope="col">MATCH or VMSS</th></tr></thead>
<tbody>
{%- for r in kybSorted %}{%- set c = r.p.capabilities or {} %}
<tr><th scope="row"><a href="/providers/{{ r.slug }}/">{{ r.p.name }}</a></th>
{%- for k in ["kyb_registry", "kyb_website_check", "kyb_industry_class", "kyb_match_vmss"] %}{%- set v = c[k] %}
<td>{%- if v %}{%- set src = (r.p.sources or [])[v.source - 1] if v.source else null %}{% if src %}<a href="{{ src.url }}" rel="nofollow noopener">{{ stLabel[v.status] or v.status }}</a>{% else %}{{ stLabel[v.status] or v.status }}{% endif %}{% if v.note and v.status != "not_disclosed" %}<br><small>{{ v.note }}</small>{% elif v.status == "not_disclosed" and v.note != "not found in public docs" %}<br><small>{{ v.note }}</small>{% endif %}{%- else %}Not checked{%- endif %}</td>
{%- endfor %}</tr>
{%- endfor %}
</tbody>
</table>

{% if matchList.length == 0 %}None of the {{ kyb | length }} providers documents a MATCH or VMSS check.{% else %}{{ matchList.length }} of the {{ kyb | length }} providers document a MATCH or VMSS check.{% endif %} That fits how the schemes describe the lists: Mastercard describes MATCH Pro as a system for its acquirers and their authorised users, and Visa's VMSS is a tool for Visa acquirers. In practice the search usually stays with the acquirer, the payment facilitator or a specialist merchant-risk vendor.

{{ webList.length }} of the {{ kyb | length }} document some form of website check. [Persona](/providers/persona/) describes a website verification with 14 checks and a separate report that classifies a business by NAICS or MCC from its website. [iDenfy](/providers/idenfy/) has a website audit in its KYB product and lets clients block activity codes at onboarding, though it does not name MCC. [Signicat](/providers/signicat/) adds website and digital footprint analysis through its partner TrueBiz. [Enigma](/providers/enigma/), which covers US businesses only, flags high-risk activity from keywords in names and website addresses but says it does not read site content; it is also the only one in the list selling US card revenue data (processing volume, ticket size) for underwriting.

The rest document standard KYB: company registries, beneficial owners, screening and monitoring. [GBG](/providers/gbg/) and [Trulioo](/providers/trulioo/) both market that to payment companies. If your KYB vendor is one of them, plan for the terminated-list search, the MCC check and website monitoring to come from somewhere else.

Vendors that document one of these checks and are marked "Not found" can send a link to the public page to support@beverified.org. We update the record and the table; payment never changes an entry.

## Questions to ask a KYB vendor before you sign

1. Do you search Mastercard MATCH or Visa VMSS, or do we keep doing that through our acquirer? If you search them, under whose access?
2. Do you scan the merchant's website, and which checks run (domain age, content, policies, prohibited products)?
3. Do you return an MCC, or only a NAICS or registry code we have to map ourselves?
4. Which registries do you cover live in our merchants' countries, and which come from cached data?
5. After onboarding, what do you monitor (ownership changes, sanctions, website changes), and how do alerts reach our case management?
6. What does a full merchant check cost, and what counts as a billable check when a company is not found?

Our [methodology](/methodology/) explains how we score KYB providers, and the guide to [perpetual KYB](/guide/perpetual-kyb/) covers ongoing business monitoring in more depth. For sanctions and adverse media screening on the owners, see our [AML ranking](/providers/aml/).
