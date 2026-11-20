---
title: "UK Starts Testing a Machine-Readable DVS Register"
seoTitle: "UK Tests Machine-Readable DVS Register | BeVerified"
seoDescription: "OfDIA has begun testing API checks against the UK digital verification services register, while the code for sharing public data with DVS awaits Parliament."
lede: "The Office for Digital Identities and Attributes started testing machine access to the UK digital verification services (DVS) register on 10 November 2026. A minimum viable product is expected in winter 2026, and the code that would let public authorities share data with registered services still needs Parliament's approval."
section: news
cover_label: "Register checks by API"
cover_motif: network
cover_palette: light
published: 2026-11-19
updated: 2026-11-19
author: andrii-klymenko
takeaways:
  - "OfDIA announced on 10 November 2026 that testing of machine-readable checks against the DVS register has started, in phases, with the first phase expected to last two weeks."
  - "Phase 1 tests transport certificates and client authentication (mutual TLS or private_key_jwt) in a controlled environment, without the live register or real data."
  - "Phase 2 tests the trust resolution chain; later phases cover OpenID Federation, user interfaces and the full onboarding journey, with no dates given."
  - "OfDIA said in July 2026 that a minimum viable product is expected in winter 2026."
  - "The draft code of practice for the section 45 information gateway was laid on 21 October 2026 and needs approval by both Houses; the government aims for the end of the year."
topics: [Digital Identity, UK Regulation, Identity Verification]
provider_slugs: []
ranking_keys: [uk, kyc, age-verification]
about_terms: [uk-diatf, reusable-digital-identity]
mention_orgs:
  - name: "Office for Digital Identities and Attributes"
    url: "https://www.gov.uk/government/organisations/office-for-digital-identities-and-attributes"
  - name: "Department for Digital, Culture, Media and Sport"
    url: "https://www.gov.uk/government/organisations/department-for-digital-culture-media-and-sport"
faq:
  - q: "What is the machine-readable DVS register?"
    a: "It is a planned way to check the UK register of digital verification services by API instead of looking entries up by hand. OfDIA says it will let businesses and public authorities programmatically check the list of registered services."
  - q: "When will the machine-readable DVS register be available?"
    a: "OfDIA said in July 2026 that a minimum viable product is expected in winter 2026. Testing started on 10 November 2026 and runs in phases; only the first two phases have rough timings."
  - q: "Who can take part in the DVS register testing?"
    a: "Registered digital verification service providers. The first phase runs in a controlled environment, so participants do not connect to the live register or use real data."
  - q: "What is the DVS information gateway?"
    a: "It is the power in section 45 of the Data (Use and Access) Act 2025 that lets public authorities share information with registered digital verification services, subject to conditions. It is meant to start when the code of practice is approved and published."
sources:
  - title: "Testing secure and scalable checks against the DVS register (10 November 2026)"
    publisher: "Office for Digital Identities and Attributes, Enabling digital identity blog"
    url: "https://enablingdigitalidentity.blog.gov.uk/2026/11/10/testing-secure-and-scalable-checks-against-the-dvs-register/"
    accessed: 2026-11
  - title: "Secure and scalable checks against the digital verification services register (9 July 2026)"
    publisher: "Office for Digital Identities and Attributes, Enabling digital identity blog"
    url: "https://enablingdigitalidentity.blog.gov.uk/2026/07/09/secure-and-scalable-checks-against-the-digital-verification-services-register/"
    accessed: 2026-11
  - title: "The draft Code of Practice for the information gateway has been laid in Parliament (21 October 2026)"
    publisher: "Office for Digital Identities and Attributes, Enabling digital identity blog"
    url: "https://enablingdigitalidentity.blog.gov.uk/2026/10/21/the-draft-code-of-practice-for-the-information-gateway-has-been-laid-in-parliament/"
    accessed: 2026-11
  - title: "Draft code of practice for public authorities sharing information with digital verification services"
    publisher: "GOV.UK (DCMS and OfDIA)"
    url: "https://www.gov.uk/government/publications/draft-code-of-practice-for-public-authorities-sharing-information-with-digital-verification-services"
    accessed: 2026-11
  - title: "New rules pave the way for businesses to adopt digital proof of age for alcohol sales (15 September 2026)"
    publisher: "GOV.UK (DCMS, Home Office, OfDIA)"
    url: "https://www.gov.uk/government/news/new-rules-pave-the-way-for-businesses-to-adopt-digital-proof-of-age-for-alcohol-sales"
    accessed: 2026-11
  - title: "Commercial arrangements for digital proof of age for alcohol (17 November 2026)"
    publisher: "Office for Digital Identities and Attributes, Enabling digital identity blog"
    url: "https://enablingdigitalidentity.blog.gov.uk/2026/11/17/commercial-arrangements-for-digital-proof-of-age-for-alcohol/"
    accessed: 2026-11
  - title: "Digital verification services register"
    publisher: "GOV.UK"
    url: "https://www.access-dvs-register.service.gov.uk/"
    accessed: 2026-11
---

Checking whether a UK identity provider is certified still means opening the [DVS register](https://www.access-dvs-register.service.gov.uk/) and reading its entry. The Office for Digital Identities and Attributes (OfDIA) wants software to do that check instead, and on 10 November 2026 it [announced](https://enablingdigitalidentity.blog.gov.uk/2026/11/10/testing-secure-and-scalable-checks-against-the-dvs-register/) that testing has started. For firms that pick a provider because it is on the register, as our [UK KYC ranking](/providers/uk/) does, this is the first public look at how automated checks will work.

## What OfDIA is testing

The tests cover technology that will let organisations check information on the register "securely and at scale". OfDIA runs them in phases. The first phase is expected to last two weeks and is about secure connections:

- transport certificates and client authentication, so a service can prove who it is when it connects;
- a choice of two authentication methods: mutual TLS with a client transport certificate, or a digitally signed client assertion (private_key_jwt);
- a controlled environment, so participants test "without connecting to the live DVS register or using real data".

In phase 1, a participating provider can see information about its organisation and its registered services, set up technical assets for a registered service, authenticate that service and make a request to a protected API. Only registered DVS providers can take part.

Phase 2 will test the trust resolution chain and was expected to start two weeks after the announcement. Later phases will cover OpenID Federation, user interfaces and the full onboarding journey. OfDIA gave no dates for those.

## Why the register needs an API

OfDIA set out the reason in a [July 2026 post](https://enablingdigitalidentity.blog.gov.uk/2026/07/09/secure-and-scalable-checks-against-the-digital-verification-services-register/). The current register works for occasional manual lookups, but "we need the register to support faster, more secure checks at a larger scale". The new setup uses public key infrastructure and "will allow businesses and public authorities to programmatically check the list of registered services".

Two uses are named. Before a public authority "like DVLA or the Home Office" can share any data with a digital verification service, it must check that the service is registered. And shops, pubs and supermarkets that accept digital proof of age for alcohol need to check that the services involved are registered. The same post said beta development started in July 2026 and that "a minimum viable product [is] expected to launch in Winter 2026".

## The alcohol rules already lean on the register

Digital proof of age for alcohol sales in England and Wales became legal on 15 September 2026. The [government announcement](https://www.gov.uk/government/news/new-rules-pave-the-way-for-businesses-to-adopt-digital-proof-of-age-for-alcohol-sales) says the change is optional for businesses, and that a business using it must go through a certified digital verification service listed on the statutory register on GOV.UK.

On 17 November 2026 OfDIA [followed up](https://enablingdigitalidentity.blog.gov.uk/2026/11/17/commercial-arrangements-for-digital-proof-of-age-for-alcohol/) on the commercial side. The order requires the responsible person to have an agreement with a registered DVS provider, and the statutory guidance recommends that the agreement makes clear any intermediary DVS must also be certified and registered. Our [age verification ranking](/providers/age-verification/) and the [Ofcom age checks item](/news/ofcom-age-checks-at-16/) cover the online side of age assurance.

## The information gateway still waits for Parliament

The register API is also groundwork for the information gateway. That is the power in section 45 of the Data (Use and Access) Act 2025 that lets public authorities share information with registered digital verification services, subject to conditions. OfDIA says the sharing could cover issuing government credentials into registered private sector wallets, or sharing specific attributes or status checks.

The [draft code of practice](https://www.gov.uk/government/publications/draft-code-of-practice-for-public-authorities-sharing-information-with-digital-verification-services) for public authorities using that power was laid in Parliament on 21 October 2026. Public authorities must have regard to it when they share information under section 45. Both Houses have to approve it before it is published as final, and the [government aims](https://enablingdigitalidentity.blog.gov.uk/2026/10/21/the-draft-code-of-practice-for-the-information-gateway-has-been-laid-in-parliament/) to do that "by the end of the year". Section 45 is meant to start when the code is published. It will not start this year for HMRC, the Welsh Revenue Authority or Revenue Scotland, and OfDIA says a timeline for those will follow "in due course".

## What it means for KYC buyers

Nothing changes in how firms use the register today. The live register is still checked by hand, and the testing is aimed at providers, not at relying parties. What follows from OfDIA's posts:

- If you pick a UK provider for its register entry, keep checking the entry yourself until the machine-readable register is live: the service name, the schemes it covers and the certificate expiry date. Our [UK ranking](/providers/uk/) lists which providers had a service on the register when we last checked.
- Ask your provider whether it is taking part in the register testing and whether it plans to use the information gateway once section 45 starts.
- The trust framework behind the register is explained in our [UK DIATF glossary entry](/glossary/uk-diatf/), and the wider shift to wallets in [reusable digital identity](/glossary/reusable-digital-identity/).

For the EU side of the same trend, see our item on the [EU Digital Identity Wallet deadline](/news/eu-digital-identity-wallet-deadline-december-2026/). How we judge providers is set out in our [methodology](/methodology/).

## What has happened since

As of 19 November 2026, OfDIA had not published phase 2 results, a launch date for the machine-readable register, or confirmation that Parliament had approved the information gateway code. We checked the OfDIA blog and the GOV.UK page for the draft code on that date.
