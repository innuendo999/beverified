---
title: "Verifying Self-Hosted Wallets Under the TFR: AOPP, Signed Messages, the Satoshi Test and Visual Proofs"
seoTitle: "Self-Hosted Wallet Verification Under the EU TFR | BeVerified"
seoDescription: "How CASPs prove a customer controls a self-hosted wallet under the EU Transfer of Funds Regulation: AOPP, signed messages, the Satoshi Test and screenshots compared."
lede: "When a crypto-asset service provider sends crypto to, or receives it from, a self-hosted wallet, there is no second institution to vouch for the address. This guide explains how CASPs can get evidence that their customer controls it, and where each method falls short."
section: guide
published: 2026-10-27
updated: 2026-10-27
author: 21analytics
partner:
  name: 21 Analytics
  note: "This article was written by 21 Analytics, which developed AOPP and sells Travel Rule software that we review. We checked the regulatory references and the Malta case against the primary sources and edited for style. Partner articles do not change our scores or rankings."
takeaways:
  - "For transfers of more than EUR 1,000 to or from a self-hosted address, the EU TFR requires CASPs to take adequate measures to assess whether their customer owns or controls that address (Articles 14(5) and 16(2))."
  - "The EBA's Travel Rule guidelines list signed messages and test transactions such as the Satoshi Test among the methods that can provide that evidence; a customer's declaration alone is not enough."
  - "In April 2026 Malta's financial services arbiter ordered a platform that relied on a tick-box declaration to repay 40% of a scam victim's EUR 30,000 loss."
  - "AOPP and manual message signing give cryptographic evidence without an on-chain transfer; the Satoshi Test relies on a small transaction; screenshots and videos are easy to collect but can be manipulated."
  - "Wallet verification shows control of an address. It does not verify the customer's identity or remove transaction risk on its own."
topics: [Travel Rule, Self-Hosted Wallets, EU TFR, AOPP, Crypto Compliance]
provider_slugs: [21analytics]
ranking_keys: [travel-rule, crypto]
faq:
  - q: "Does the EU TFR require proof of ownership for every self-hosted wallet transfer?"
    a: "No. The ownership or control assessment applies to transfers of more than EUR 1,000 to or from a self-hosted address, under Articles 14(5) and 16(2). The TFR's information requirements for self-hosted transfers apply regardless of amount, so check the Regulation and your supervisor's guidance for each transfer type."
  - q: "Does wallet verification reveal the customer's private key?"
    a: "No. A properly built message-signing process produces a signature without exposing the private key. Customers should never be asked for their seed phrase or private key during wallet verification."
  - q: "Is AOPP the same as manual message signing?"
    a: "Both rely on a cryptographic signature. AOPP automates the signing request and sends the proof back to the CASP, while manual signing asks the customer to sign a message themselves and submit the result."
  - q: "Is the Satoshi Test free?"
    a: "Not necessarily. The customer usually pays the network fee for the test transaction, and the cost depends on the blockchain and how busy it is."
  - q: "Are screenshots enough to prove wallet ownership?"
    a: "A screenshot shows that a wallet app displays an address, but it does not prove control of the private key. Images and videos can be edited, so visual proofs need manual review and give weaker evidence than cryptographic methods."
sources:
  - title: "Regulation (EU) 2023/1113 on information accompanying transfers of funds and certain crypto-assets (Transfer of Funds Regulation)"
    publisher: "EUR-Lex"
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1113"
    accessed: 2026-10
  - title: "Guidelines on information requirements in relation to transfers of funds and certain crypto-assets transfers (Travel Rule guidelines)"
    publisher: "European Banking Authority"
    url: "https://www.eba.europa.eu/sites/default/files/2024-07/6de6e9b9-0ed9-49cd-985d-c0834b5b4356/Travel%20Rule%20Guidelines.pdf"
    accessed: 2026-10
  - title: "Guidelines on the use of remote customer onboarding solutions (EBA/GL/2022/15)"
    publisher: "European Banking Authority"
    url: "https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf"
    accessed: 2026-10
  - title: "ASF 062/2025, KJ v Foris DAX MT Limited, decision of 17 April 2026"
    publisher: "Office of the Arbiter for Financial Services, Malta"
    url: "https://financialarbiter.org.mt/sites/default/files/oafs/decisions/2706/ASF%20062-2025%20-%20KJ%20vs%20Foris%20DAX%20MT%20Limited.pdf"
    accessed: 2026-10
  - title: "Self-hosted wallet verification"
    publisher: "21 Analytics"
    url: "https://www.21analytics.co/travel-rule/?tag=self-hosted+wallet#self-hosted-wallet-verification"
    accessed: 2026-10
  - title: "Why AOPP leads in self-hosted wallet verification"
    publisher: "21 Analytics"
    url: "https://www.21analytics.co/blog/aopp-leads-self-hosted-wallet-verification/"
    accessed: 2026-10
---

A transfer between two regulated crypto-asset service providers (CASPs) has an institution at each end that can exchange customer information. A transfer to or from a self-hosted wallet does not. When a customer asks a CASP to send funds to their own wallet, or deposits from one, the CASP may need to establish who actually controls that address.

The practical question is how to get reliable evidence of control without adding needless cost, delay or security risk. Four methods are in common use: the Address Ownership Proof Protocol (AOPP), manual message signing, the Satoshi Test, and visual proofs such as screenshots or videos. They differ in technical requirements, in how strong the evidence is, and in what they ask of the customer.

## What does the EU Transfer of Funds Regulation require?

The [Transfer of Funds Regulation (TFR), Regulation (EU) 2023/1113](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1113), sets out the information that must accompany transfers of funds and certain crypto-assets. It has applied since 30 December 2024. CASPs must collect and handle specified information about the originator and the beneficiary of covered transfers, including transfers involving addresses that no other regulated provider holds.

For a transfer to a self-hosted address, Article 14(5) requires the originator's CASP to obtain and hold the originator and beneficiary information and to make sure the transfer can be individually identified. Article 16(2) does the same for the beneficiary's CASP when a transfer comes from a self-hosted address.

Both articles add a second duty for larger amounts. Where the transfer exceeds EUR 1,000, the CASP must take adequate measures to assess whether the self-hosted address is owned or controlled by its own customer. The EUR 1,000 figure applies to that ownership assessment only. It is not a general exemption from the TFR's information requirements for smaller transfers.

### What counts as reliable verification?

The European Banking Authority (EBA) explains in its [Travel Rule guidelines](https://www.eba.europa.eu/sites/default/files/2024-07/6de6e9b9-0ed9-49cd-985d-c0834b5b4356/Travel%20Rule%20Guidelines.pdf) what a reliable method looks like. Where ownership or control must be assessed, the CASP needs evidence that establishes control of the address rather than relying only on what the customer says. The methods the guidelines describe include:

- verification procedures with or without direct human supervision, of the kind set out in the EBA's [guidelines on remote customer onboarding](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf);
- asking the customer to send a predefined amount from the self-hosted address to an account the CASP controls, for example a Satoshi Test;
- asking the customer to digitally sign a specific message with the private key linked to the address, for example through AOPP;
- other approaches that give a reliable and secure assessment, provided the CASP is satisfied it has established who owns or controls the address.

## A real case: the risk of a tick box

Malta's Office of the Arbiter for Financial Services showed what is at stake in [ASF 062/2025, KJ v Foris DAX MT Limited](https://financialarbiter.org.mt/sites/default/files/oafs/decisions/2706/ASF%20062-2025%20-%20KJ%20vs%20Foris%20DAX%20MT%20Limited.pdf), decided on 17 April 2026.

The complainant lost EUR 30,000 to a scam after sending funds in January 2025 to a self-hosted wallet the scammer controlled. He argued that the platform had not met its obligations under the TFR. According to the decision, the platform's ownership check consisted of a tick box confirming that the customer owned the destination address, with no technical verification behind it. The complainant said he knew little about external wallets and ticked the box because the scammer told him to.

The Arbiter found that for transfers above EUR 1,000 to a self-hosted wallet, a self-declaration on its own was not enough, and ordered the platform to pay EUR 12,000, which is 40% of the loss, plus interest. The rest of the loss stayed with the complainant because of his own contributory negligence.

## What is self-hosted wallet verification?

In a self-hosted wallet the user holds the private keys, rather than a custodian holding them. Self-hosted wallet verification is the process of getting evidence that the customer controls a particular address on that wallet. What the evidence looks like depends on the method.

### Method 1: Address Ownership Proof Protocol (AOPP)

The [Address Ownership Proof Protocol](https://www.21analytics.co/travel-rule/?tag=self-hosted+wallet#self-hosted-wallet-verification) automates the collection of cryptographic proof that a customer controls a self-hosted address. 21 Analytics developed it together with the Swiss hardware wallet maker BitBox, with the aim of making verification easier for customers and reducing manual work for compliance teams.

Instead of asking the customer to compose and sign a message by hand, AOPP walks them through a signing step inside their wallet and sends the proof back automatically. "AOPP could solve the cumbersome proof of ownership issue," Delphine Forma, Policy Lead at Solidus Labs, told Cointelegraph, as [quoted by 21 Analytics](https://www.21analytics.co/blog/aopp-leads-self-hosted-wallet-verification/).

#### How AOPP works

The customer starts a withdrawal in the exchange's app, which generates a unique proof request. The customer opens their wallet through that request and approves the signing. The wallet produces a signature showing control of the address, and the AOPP workflow returns it to the CASP. Nobody on the compliance team has to review a screenshot or match a test transaction to the request.

The signature does not reveal the private key. It shows that the wallet can produce a valid signature for that address.

### Method 2: Manual message signing

Here the customer signs a message with the private key linked to the address. The signature shows that the customer can use the key, without any on-chain transfer.

#### How manual signing works

The CASP gives the customer a message to sign. The customer opens a compatible wallet, picks the address and signs. They then send the signature to the CASP, which checks it against the address and the message. A valid signature is cryptographic evidence that the signer controls the private key for that address. The catch is that not every wallet supports message signing, and some customers find the steps hard to follow.

### Method 3: The Satoshi Test

The Satoshi Test uses a small transaction. The customer sends an agreed amount from the address being verified within a set period, and the CASP checks the blockchain for it. The evidence is an observable transaction rather than a screenshot or a submitted signature.

#### How the Satoshi Test works

The CASP sets up the test: a fresh deposit address, a random low amount agreed with the customer, and a time window for the transfer. The customer sends that amount from the wallet address in question and tells the CASP. The CASP watches the blockchain and checks whether the transaction matches the request. If it does, and the other checks pass, the CASP can treat it as evidence that the customer controls the address. The customer usually pays the network fee, and waiting for confirmation adds delay.

### Method 4: Visual proofs

With a visual proof, the customer sends a screenshot or video of their wallet app showing the address. A member of the compliance team compares the address on screen with the one in the transfer.

#### How visual proofs work

The customer records the wallet screen showing the address they want to use and submits it. The compliance team checks that the displayed address matches. If the evidence looks consistent and meets the CASP's procedures, the address may be approved, subject to any other checks. The method is familiar to customers, but images and videos can be edited, and every submission needs a person to review it.

## Which method to choose

Collecting customer information is not the same as establishing control of a wallet address, and the difference matters most when a transfer involves a self-hosted wallet. The Foris DAX case shows what can happen when a CASP relies on a declaration: a customer can confirm ownership of an address without understanding what they are confirming, or without controlling the wallet at all.

Cryptographic methods, AOPP and manual signing, give stronger technical evidence than a declaration. The Satoshi Test gives transaction-based evidence at the cost of a fee and some waiting. Visual proofs are the easiest to collect and the easiest to fake. Many CASPs support more than one method so that customers with different wallets can all complete a check, as long as each method fits the regulation and the CASP's risk assessment.

If you are comparing tools that handle these checks, our [Travel Rule software ranking](/providers/travel-rule/) compares providers on protocol support and self-hosted wallet proofs, and our [review of 21 Analytics](/providers/21analytics/) covers which proofs its product supports. For the wider EU rules that apply to CASPs, see our [MiCA regulation guide](/guide/mica-regulation-guide/) and the [crypto KYC ranking](/providers/crypto/).
