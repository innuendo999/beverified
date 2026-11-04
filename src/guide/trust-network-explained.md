---
title: 'The TRUST Network Explained: Who Runs It, Who Can Join and How VASPs Connect Through an Interoperability Partner'
seoTitle: 'The TRUST Travel Rule Network Explained | BeVerified'
seoDescription: 'What the TRUST Travel Rule network is, who runs it, who can join, what it costs and how VASPs connect directly, through an interoperability partner or TRUSThub.'
lede: 'TRUST is a members-only Travel Rule network that a coalition of crypto exchanges set up in 2022, with Coinbase playing a leading role in operating it. Members pass an independent due diligence review, then send encrypted originator and beneficiary data straight to each other.'
section: guide
cover_label: 'Inside the TRUST network'
cover_motif: network
cover_palette: violet
published: 2026-11-03
updated: 2026-11-04
author: andrii-klymenko
takeaways:
  - 'TRUST is a not-for-profit Travel Rule network built by VASPs; Coinbase plays a leading role in operating it, and member VASPs review and vote on key decisions.'
  - 'Membership is international: TRUST launched in the United States in 2022 and now has members in Canada, Singapore, the UK, the EU and other markets.'
  - 'Applicants go through an independent review of their AML controls, data protection and cybersecurity before they can join, and membership does not replace a VASP''s own counterparty due diligence.'
  - 'A member can build its own TRUST integration or use 21 Travel Rule, the software from 21 Analytics, which TRUST names as its interoperability partner; Coinbase says VASPs outside the network can reach members through TRUSThub.'
  - 'Members split the operating costs evenly, smaller VASPs can join through a free membership option, and affiliates of a member pay no additional membership fees.'
topics: [Travel Rule, TRUST, Travel Rule Interoperability, Counterparty Due Diligence]
about_terms: [travel-rule, travel-rule-interoperability, virtual-asset-service-provider]
provider_slugs: [21analytics]
ranking_keys: [travel-rule, crypto]
internal_links_min: 1
mention_orgs:
  - name: "Financial Action Task Force"
    url: "https://www.fatf-gafi.org/"
faq:
  - q: 'Who runs the TRUST Travel Rule network?'
    a: 'TRUST was set up by a coalition of crypto exchanges led by Coinbase and runs as a not-for-profit industry network. Coinbase says it plays a leading role in operating the network, while key decisions are reviewed and voted on by member VASPs. Members sign one shared legal agreement.'
  - q: 'Can non-US VASPs join TRUST?'
    a: 'Yes. TRUST started in the United States in February 2022, went live in Canada and Singapore the same year, and now has members in the UK, the EU and other markets. Every applicant, wherever it is based, has to pass TRUST''s due diligence review first.'
  - q: 'Can a VASP that is not a TRUST member exchange data with TRUST members?'
    a: 'Yes, through TRUSThub. Coinbase says TRUSThub lets TRUST members send Travel Rule data to, and receive it from, VASPs that are not members, whatever system those VASPs use. Direct exchange inside the network itself is reserved for members.'
  - q: 'How much does TRUST membership cost?'
    a: 'TRUST does not publish a price list. Coinbase says TRUST splits its operating costs evenly among members, expects membership fees to fall as more VASPs join, offers a free membership option for smaller VASPs and lets affiliates of a member join without additional membership fees. Notabene, which runs a competing Travel Rule network, says applicants also pay an upfront due diligence fee that depends on the company; Coinbase''s page does not address due diligence fees, so ask TRUST before you apply.'
  - q: 'Does TRUST work with self-hosted wallets?'
    a: 'No. TRUST exchanges data between VASPs, so it does not carry messages to or from self-hosted wallets. Transfers to a customer''s own wallet need a separate ownership check, such as a signed message or a Satoshi test.'
sources:
  - title: 'Travel Rule Universal Solution Technology (TRUST)'
    publisher: 'Coinbase'
    url: 'https://www.coinbase.com/travelrule'
    accessed: 2026-11
  - title: 'Expanding TRUST: a privacy-first network for global crypto compliance'
    publisher: 'Coinbase'
    url: 'https://www.coinbase.com/blog/expanding-trust-a-privacy-first-network-for-global-crypto-compliance'
    accessed: 2026-11
  - title: 'Coalition of US crypto firms unveils travel rule compliance platform, TRUST'
    publisher: 'The Block'
    url: 'https://www.theblock.co/post/134408/coalition-of-us-crypto-firms-unveils-travel-rule-compliance-platform-trust'
    accessed: 2026-11
  - title: 'TRUST expands its global footprint and is now live internationally'
    publisher: 'Circle'
    url: 'https://www.circle.com/blog/trust-expands-its-global-footprint-and-is-now-live-internationally'
    accessed: 2026-11
  - title: 'Analysis of TRUST, Travel Rule Universal Solution Technology'
    publisher: 'Notabene'
    url: 'https://notabene.id/travel-rule-messaging-protocols/ustrwg'
    accessed: 2026-11
  - title: 'The Travel Rule Universal Solution Technology explained: your guide to TRUST'
    publisher: '21 Analytics'
    url: 'https://21analytics.co/coinbase-trust'
    accessed: 2026-11
  - title: 'How to perform Travel Rule VASP due diligence like Capgemini'
    publisher: '21 Analytics'
    url: 'https://www.21analytics.co/blog/travel-rule-vasp-due-diligence-capgemini/'
    accessed: 2026-11
  - title: 'Built-in access to the TRUST network'
    publisher: '21 Analytics'
    url: 'https://www.21analytics.co/trust/'
    accessed: 2026-11
  - title: 'Q3 2026 Kaiko Exchange Ranking released'
    publisher: 'Kaiko'
    url: 'https://www.kaiko.com/news/q3-2026-kaiko-exchange-ranking-released'
    accessed: 2026-11
---

TRUST (Travel Rule Universal Solution Technology) is one of the main networks crypto businesses use to exchange the information the FATF [Travel Rule](/glossary/travel-rule/) requires. It connects virtual asset service providers ([VASPs](/glossary/virtual-asset-service-provider/)) and banks through encrypted, peer-to-peer messages, so members can meet their obligations without passing customer data through a central database.

TRUST [launched in the United States in February 2022](https://www.theblock.co/post/134408/coalition-of-us-crypto-firms-unveils-travel-rule-compliance-platform-trust) and has grown well beyond it. In May 2026 Coinbase said the network [connects hundreds of VASPs across dozens of countries](https://www.coinbase.com/blog/expanding-trust-a-privacy-first-network-for-global-crypto-compliance), including major exchanges, banks and custodians. [21 Analytics](https://21analytics.co/coinbase-trust) puts the figure at more than 200 members in 38 countries.

This guide covers how TRUST works, who runs it, how a business becomes a member, and what changes when a VASP connects through an interoperability partner instead of building its own integration.

## What is the TRUST network?

[TRUST](https://www.coinbase.com/travelrule) is a Travel Rule network developed by a coalition of crypto businesses to exchange the data the FATF Travel Rule requires, securely and only between vetted members.

The Travel Rule requires information about the originator and beneficiary of a covered virtual asset transfer to accompany the transaction. To meet it, a VASP needs a reliable way to identify the counterparty behind a destination address and to send it the required data.

TRUST handles both. A lookup identifies which member controls the destination address, and the receiving VASP has to prove it controls that address before any customer data is sent. The data itself then goes directly from the originating VASP to the beneficiary VASP over an encrypted channel.

{% include "figures/trust-transfer.njk" %}

## Who runs the TRUST network?

TRUST came out of the crypto industry itself. A coalition of VASPs set it up to support Travel Rule compliance without exposing customer information more than necessary.

Coinbase led the coalition, and its [TRUST page](https://www.coinbase.com/travelrule) says it plays a leading role in operating the network. [Notabene](https://notabene.id/travel-rule-messaging-protocols/ustrwg), which runs a competing Travel Rule network, notes that TRUST runs on Coinbase infrastructure. TRUST is not, however, a product that Coinbase controls alone: according to the same page, key decisions are reviewed and voted on by member VASPs. At launch, members also described having an equal stake and voice in decisions. Members sign one central legal agreement that governs their participation, so they do not need a separate bilateral contract with every counterparty.

TRUST is a permissioned, not-for-profit network with its own membership, governance and operational requirements.

## Which VASPs are part of TRUST?

TRUST has grown from a US coalition into an international network. Its members include major exchanges, banks and other digital asset businesses, for example:

- Coinbase
- Kraken
- Gemini
- BNY
- Fidelity Digital Assets
- Crypto.com
- PayPal
- Revolut
- Robinhood

These are examples, not a full membership list. The network keeps growing, so check the current members on [Coinbase's TRUST page](https://www.coinbase.com/travelrule) (21 Analytics also offers a downloadable list on its [TRUST guide](https://21analytics.co/coinbase-trust)) before you assume a particular counterparty participates. The three exchanges at the top of [Kaiko's Q3 2026 Exchange Ranking](https://www.kaiko.com/news/q3-2026-kaiko-exchange-ranking-released), Crypto.com, Coinbase and Kraken, are all TRUST members, and 21 Analytics says 8 of the top 10 in that ranking are.

TRUST went live in [Canada and Singapore](https://www.circle.com/blog/trust-expands-its-global-footprint-and-is-now-live-internationally) a few months after its US launch. Its membership now also includes businesses based in the United Kingdom and the European Union, and Coinbase lists markets such as Switzerland, the UAE, Japan, Hong Kong, India, Brazil and Australia among those it covers.

## Who can join TRUST?

TRUST is meant for VASPs that need to exchange Travel Rule information and can meet the network's participation requirements.

Access is not automatic. Applicants go through an onboarding process that checks whether their practices meet TRUST's security, privacy and compliance standards. Coinbase's [TRUST page](https://www.coinbase.com/travelrule) names Exiger as a partner that helps applicants meet those requirements. The review itself is done by an independent third party: Capgemini's counterparty due diligence lead for TRUST [told 21 Analytics](https://www.21analytics.co/blog/travel-rule-vasp-due-diligence-capgemini/) that Capgemini reviews every prospective member before admission and existing members on an ongoing basis. The review covers areas such as:

- anti-money laundering (AML) controls;
- data protection practices;
- cybersecurity measures.

Successful applicants then integrate TRUST into their payment infrastructure so they can exchange encrypted Travel Rule information with other members. VASPs that would rather not build and maintain their own TRUST integration can reach the network through [21 Travel Rule](https://www.21analytics.co/trust/), the Travel Rule software from [21 Analytics](/providers/21analytics/). Coinbase's TRUST page names 21 Analytics as the network's interoperability partner, and TRUST's May 2026 announcement says the partnership makes it faster and easier for VASPs using 21 Analytics to join TRUST. A firm using it still has to pass TRUST's due diligence first.

### Does TRUST membership replace counterparty due diligence?

No. TRUST's onboarding requirements add a layer of assurance, but membership does not remove every counterparty due diligence obligation.

VASPs remain responsible for assessing their counterparties under the laws, regulations and internal risk policies that apply to them. The checks required depend on the business, its jurisdiction and the nature of the relationship.

Membership can make this work lighter, because every participant has met the same defined requirements. It does not remove the need for each VASP to understand and manage its own compliance risk.

## What is an interoperability partner?

An interoperability partner helps a VASP communicate with counterparties that use different Travel Rule systems or networks.

The Travel Rule ecosystem is not built on one universal technology. Providers and networks implement the exchange of information in different ways (see [Travel Rule interoperability](/glossary/travel-rule-interoperability/)). An interoperability partner bridges the gap by bringing connections to several systems into a single compliance workflow.

A VASP using 21 Travel Rule, for example, reaches TRUST through the software's built-in integration, so it does not need to build a separate TRUST connection. The aim is to make counterparty communication part of the existing Travel Rule process rather than another system that staff have to manage on its own.

That is not the only way to reach TRUST members. Coinbase also runs [TRUSThub](https://www.coinbase.com/travelrule), which its TRUST page says lets any VASP, whether or not it is a member, share Travel Rule information with other VASPs regardless of the system they use. In its myths-and-facts section, Coinbase adds that TRUSThub lets members send Travel Rule data to, and receive it from, VASPs outside TRUST, and that members can use TRUST through the 21 Analytics partnership to connect to other protocols.

{% include "figures/trust-routes.njk" %}

If you are comparing vendors for the rest of your counterparty list, our ranking of [Travel Rule providers](/providers/travel-rule/) shows which networks and protocols each one connects to.

## What does TRUST cost?

Coinbase describes TRUST as a not-for-profit tool created and maintained by a coalition of VASPs. It does not publish a price list.

According to [Coinbase](https://www.coinbase.com/travelrule), TRUST splits its operating costs evenly among members, so membership fees are expected to fall as more VASPs join. Smaller VASPs can join through a free membership option, and once a VASP is a member, its affiliates can join without paying additional membership fees. Notabene says applicants also pay an upfront due diligence fee that varies with the complexity of the company. Coinbase's page talks only about membership fees and does not address due diligence fees, so ask TRUST directly about every fee before you apply.

## Does TRUST store customer data centrally?

No. TRUST is designed to avoid a central store of sensitive customer information. Coinbase says customer data moves directly between members over end-to-end encrypted channels and that TRUST never stores it centrally.

The network also checks that the receiving VASP controls the destination address before any customer data is shared. Together these limit two risks: a single database that attackers could target, and customer data sent to the wrong recipient.

## Which blockchains and digital assets does TRUST support?

Coinbase says TRUST supports all blockchains, either on its own or together with TRUSThub, whatever assets customers want to send or receive.

That matches how the Travel Rule works: the obligation depends on the regulatory framework and the transfer, not on whether an asset appears on a short list of supported tokens.

TRUST does cover only transfers between VASPs. Transfers to or from a customer's own wallet fall outside it, and many jurisdictions expect a separate ownership check for those. Our guide to [verifying self-hosted wallets under the TFR](/guide/self-hosted-wallet-verification-tfr/) explains the options.
