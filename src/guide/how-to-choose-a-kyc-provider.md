---
title: "How to Choose a KYC Provider: Questions to Ask Before You Sign"
seoTitle: "How to Choose a KYC Provider: Buyer Checklist | BeVerified"
seoDescription: "How to choose a KYC or identity verification provider: the evidence to ask for on liveness, coverage, price per check, review hours and data, then run a pilot."
lede: "Choose a KYC provider by asking for evidence you can check, not for accuracy claims: a liveness lab letter in the vendor's own name, a price for a full check with the minimums, and the countries and documents you actually need. Then test the shortlist on your own users before you sign."
section: guide
cover_label: "Choosing a KYC vendor"
cover_motif: document
published: 2026-11-18
updated: 2026-11-18
author: andrii-klymenko
takeaways:
  - "Write down your own checks, countries and monthly volume before you look at vendors, so every vendor answers the same questions."
  - "Ask for an iBeta ISO/IEC 30107-3 letter that names the vendor and the product version, and look it up on iBeta's public page yourself."
  - "Compare price per full check (document, liveness and face match together), including any monthly minimum and whether it covers checks."
  - "In the UK, a service that is not certified and on the DVS register cannot reliably be deemed suitable for identity verification under the Money Laundering Regulations, according to government guidance."
  - "Vendor pass rates use different samples, so run a pilot on your own traffic before you sign."
topics: [KYC, Identity Verification, Vendor Selection, Liveness Detection]
provider_slugs: []
ranking_keys: [identity-verification, cheap-kyc, kyc]
about_terms: [know-your-customer, liveness-detection, iso-iec-30107-3, document-verification]
mention_orgs:
  - name: "iBeta Quality Assurance"
    url: "https://www.ibeta.com/"
faq:
  - q: "How do I choose a KYC provider?"
    a: "Start from your own requirements: the checks you need, the countries you serve and your monthly volume. Then ask each vendor for evidence you can verify on liveness, coverage, pricing, review hours and data handling, and run a pilot on your own users before signing."
  - q: "What should I ask a KYC vendor before signing?"
    a: "Ask for the iBeta letter behind any liveness claim, the price of a full check with all minimums, the countries and document types covered, who reviews the cases the system cannot decide and how fast, and where your customers' data is stored."
  - q: "Is an iBeta letter the same as a certification?"
    a: "No. iBeta's own page says a conformance result does not translate to a certification of the vendor product. A letter confirms that a named product version passed a stated ISO/IEC 30107-3 test level."
  - q: "Why run a pilot if the vendor publishes pass rates?"
    a: "Vendors measure pass rates on their own samples, so the figures are not comparable between vendors. A pilot on your own users and devices shows how many good customers get through and how long a check takes for you."
sources:
  - title: "ISO 30107-3 Presentation Attack Detection Confirmation Letters"
    publisher: "iBeta Quality Assurance"
    url: "https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/"
    accessed: 2026-11
  - title: "Using digital identities with the Money Laundering Regulations"
    publisher: "GOV.UK"
    url: "https://www.gov.uk/government/publications/using-digital-identities-with-the-money-laundering-regulations/using-digital-identities-with-the-money-laundering-regulations"
    accessed: 2026-11
---

Most KYC vendors look alike on a features page: documents, selfie, liveness, AML screening, an API. The differences that matter show up in the evidence behind those words and in the contract. This guide is the set of questions we use when we score identity verification providers, rewritten for a buyer who has to pick one. The weights behind our own scores are on the [methodology page](/methodology/#identity-verification).

## Start with your checks, not with a vendor list

Before the first demo, write down four things: the checks you need (document, liveness, face match, database lookups, sanctions and PEP screening), the countries and document types your customers will bring, your monthly volume now and in a year, and who will handle the cases that fail. A fintech onboarding in three EU markets has different needs from a gambling operator in the UK or a marketplace that only needs document verification for sellers.

Send the same list to every vendor. It stops a demo from steering you toward features you don't need, and it gives you answers you can put side by side.

## Fraud defense: ask for evidence, not accuracy claims

Every vendor says it stops spoofs and deepfakes. What you can check is whether an independent lab tested the liveness detection and what it tested.

For presentation attacks (photos, screens, masks) the usual evidence is an [ISO/IEC 30107-3](/glossary/iso-iec-30107-3/) confirmation letter from iBeta. iBeta publishes its letters [on a public page](https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/), with vendor consent, and each entry lists the date, the vendor, the PAD level, the product and the version tested. So ask three things. Does the letter name this vendor, or the company that supplies its face SDK? Does it cover the product and version you will use? Which level is it: Level 1, 2 or 3 differ in the time, expertise and materials the testers were allowed. iBeta's page also says a conformance result does not translate to a certification of the vendor product, so be wary of a sales deck that calls it one.

Presentation attacks are only half the problem. Deepfakes and virtual cameras feed fake video straight into the app, which is what [injection attack detection](/glossary/injection-attack-detection/) is for. Our guide to [synthetic identity and deepfake fraud](/guide/synthetic-identity-and-deepfake-fraud/) maps these attacks to the controls that stop them. Ask whether that defense was tested by an independent lab or is only described by the vendor.

## Coverage: countries, documents and a route without a document

A coverage claim of "200+ countries" says little until you check your own markets. Ask for the list of document types supported in each country you serve, and whether the tool reads the chip of passports and ID cards through NFC as well as the printed page.

Also ask what happens when a customer has no usable document. Some vendors offer database verification or bank and registry checks in some markets. If that route matters to you, get the list of markets where it works.

## Price: compare the cost of a full check

Per-check prices on pricing pages are hard to compare because vendors split the check differently. Ask for one number: the price of a full check, meaning document verification, liveness and face match together, at your monthly volume. Then ask about everything around it:

- Is there a monthly minimum, and does it count toward checks or come on top?
- Is a retry billed as a new check?
- What do AML screening and ongoing monitoring cost after onboarding?
- Is there a contract term or setup fee?

A monthly minimum can change the real price a lot at low volume. Our [Budget KYC ranking](/providers/cheap-kyc/) only includes vendors whose pricing page says the minimum covers checks, and the [KYC Pricing Index](/publications/kyc-pricing-index/) shows which providers publish prices at all.

## Integration and human review

Ask for the API documentation and a sandbox before you sign, not after. Check that there are web, iOS and Android SDKs if you need them, and whether a hosted or no-code flow exists for a quick start.

Then ask who decides the cases the automated check can't. Some vendors include a human review team, some sell it as an add-on, and some leave it to you. Ask for the hours that team works and the turnaround they commit to. A queue that waits until the next working day means lost sign-ups on a Saturday night.

## Compliance fit and data

Ask for security certifications as documents, not logos: the ISO/IEC 27001 certificate or the SOC 2 report itself, with its scope and date. Ask where customer data and biometric templates are stored, whether you can choose the region, and how long the vendor keeps them.

If a regulator has to accept the check, look for a public register that lists the service. In the UK, government guidance on [using digital identities with the Money Laundering Regulations](https://www.gov.uk/government/publications/using-digital-identities-with-the-money-laundering-regulations/using-digital-identities-with-the-money-laundering-regulations) describes certified services on the DVS register as a reliable and independent source of information. It says services that are not certified and not on the register cannot reliably be deemed suitable for identity verification under the Regulations. The same guidance adds that a digital identity check does not cover all of customer due diligence and that the firm stays liable. Our [UK ranking](/providers/uk/) only lists services on that register, under the UK digital identity and attributes trust framework.

Finally, check the vendor's recent history. Our [incident tracker](/incidents/) lists breaches and regulatory actions with the vendor's response.

## Run a pilot before you sign

No public test we know of compares vendors on how many good customers pass, how many are wrongly rejected or how long a check takes. Vendors publish pass rates, but each measures them on its own sample, so the numbers don't compare. Our own [Identity Verification ranking](/providers/identity-verification/) says the same thing about its scores.

So test the shortlist on your traffic. Two or three vendors, the same users and devices, a few hundred real sign-ups each if you can. Measure the share of good customers who complete the check, the share sent to manual review, the time to a decision, and the support you got while setting it up. Ask for pilot pricing in writing, and agree what happens to the test data afterwards.

## A one-page checklist

| Question | A good answer | How to check it |
|---|---|---|
| Who was tested for liveness? | An iBeta letter naming the vendor and the product version you will use | Look up the vendor on iBeta's letters page |
| Is injection attack defense tested? | A named independent lab and test | Ask for the report or letter |
| Which documents and countries? | A list per country, NFC where you need it | Compare with your own markets |
| What does a full check cost? | One price for document, liveness and face match at your volume, minimums stated | Written quote, pricing page |
| Who reviews unclear cases? | A team with published hours and turnaround | Contract or service terms |
| Where is data stored? | A named region you can choose, retention period stated | Data processing agreement |
| Is the service on a register? | A public register entry, where your market has one | The register itself |
| How does it perform for you? | Pilot results on your own users | Your pilot |
