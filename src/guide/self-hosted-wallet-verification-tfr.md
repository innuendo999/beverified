---
title: 'Verifying Self-Hosted Wallets Under the TFR: AOPP, Signed Messages, the Satoshi Test and Visual Proofs'
seoTitle: Self-Hosted Wallet Verification Under the EU TFR | BeVerified
seoDescription: 'How CASPs verify self-hosted wallets under the EU Transfer of Funds Regulation: AOPP, manual message signing, the Satoshi Test and visual proofs compared.'
lede: When a crypto-asset service provider (CASP) transfers digital assets to or from a self-hosted wallet, it may need to establish who controls the wallet address. This can be challenging because, unlike a transfer between two regulated service providers, a self-hosted wallet transfer does not necessarily involve another institution that can exchange customer information.
section: guide
cover_label: "Proof of wallet ownership"
cover_motif: wallet
published: 2026-10-27
updated: 2026-10-27
author: andrii-klymenko
takeaways:
- The EU TFR establishes requirements for information accompanying crypto-asset transfers and includes specific measures for transfers involving self-hosted addresses.
- Wallet verification helps establish that a customer controls a particular address, but does not independently verify the customer's identity or eliminate transaction risk.
- The Malta Office of the Arbiter for Financial Services' ruling in ASF 062/2025 KJ v Foris DAX MT Limited highlights the risks of relying on a customer's checkbox declaration to establish wallet ownership.
- The EBA's Travel Rule guidelines describe technical methods that can provide evidence of wallet control, including cryptographic signatures and test transactions.
- AOPP automates cryptographic wallet ownership verification through a wallet-supported signing process.
- Manual message signing provides cryptographic evidence without requiring an on-chain transaction, but can be difficult for some customers and requires compatible wallet functionality.
- The Satoshi Test uses a small cryptocurrency transaction to provide evidence of control, but may incur network fees and introduce delays.
- Visual proofs are familiar and widely accessible, but screenshots and videos can be manipulated and usually require manual review.
- The right verification method depends on the applicable regulation, wallet compatibility, security requirements, operational costs and customer experience.
topics:
- Travel Rule
- Self-Hosted Wallets
- EU TFR
- AOPP
- Crypto Compliance
provider_slugs:
- 21analytics
ranking_keys:
- travel-rule
- crypto
internal_links_min: 1
faq:
- q: Does the EU TFR require proof of ownership for every self-hosted wallet transfer?
  a: The EU TFR establishes specific information requirements for transfers involving self-hosted addresses. It also requires adequate measures to assess whether a self-hosted address is owned or controlled by the customer in certain circumstances, including qualifying transfers exceeding EUR 1,000. CASPs should consult the Regulation and applicable supervisory guidance to determine the requirements for each transaction.
- q: Does wallet verification reveal the customer's private key?
  a: No. A properly implemented message-signing process produces a cryptographic signature without disclosing the private key itself. Customers should never be asked to disclose their seed phrase or private key as part of a wallet verification process.
- q: Is AOPP the same as manual message signing?
  a: AOPP automates the cryptographic signing and submission process. Manual signing requires the customer to perform the signing steps and submit the resulting proof through the relevant workflow.
- q: Is the Satoshi Test free?
  a: Not necessarily. The customer may incur network fees when sending the verification transaction. Costs depend on the blockchain and prevailing network conditions.
- q: Are screenshots sufficient to prove wallet ownership?
  a: A screenshot can show that a wallet application displays a particular address, but it does not independently prove control of the private key. Images and videos can be manipulated, which is why visual proofs typically require manual review and may provide weaker evidence than cryptographic methods.
- q: Can a CASP use more than one wallet verification method?
  a: Yes. Supporting multiple methods can help accommodate different wallets and customer needs. The methods selected should be appropriate to the applicable regulatory requirements and the CASP's risk assessment.
sources:
- title: Regulation (EU) 2023/1113 on information accompanying transfers of funds and certain crypto-assets
  publisher: EUR-Lex
  url: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1113&qid=1730134560437
  accessed: 2026-10
- title: Guidelines on information requirements in relation to transfers of funds and certain crypto-assets transfers (Travel Rule guidelines)
  publisher: European Banking Authority
  url: https://www.eba.europa.eu/sites/default/files/2024-07/6de6e9b9-0ed9-49cd-985d-c0834b5b4356/Travel%20Rule%20Guidelines.pdf
  accessed: 2026-10
- title: Guidelines on the use of remote customer onboarding solutions (EBA/GL/2022/15)
  publisher: European Banking Authority
  url: https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf
  accessed: 2026-10
- title: ASF 062/2025, KJ v Foris DAX MT Limited, decision of 17 April 2026
  publisher: Office of the Arbiter for Financial Services, Malta
  url: https://financialarbiter.org.mt/sites/default/files/oafs/decisions/2706/ASF%20062-2025%20-%20KJ%20vs%20Foris%20DAX%20MT%20Limited.pdf
  accessed: 2026-10
- title: Self-hosted wallet verification (AOPP)
  publisher: 21 Analytics
  url: https://www.21analytics.co/travel-rule/?tag=self-hosted+wallet#self-hosted-wallet-verification
  accessed: 2026-10
- title: 21 Analytics
  publisher: 21 Analytics
  url: https://www.21analytics.co/
  accessed: 2026-10
- title: BitBox
  publisher: BitBox
  url: https://bitbox.swiss/
  accessed: 2026-10
- title: Delphine Forma
  publisher: LinkedIn
  url: https://www.linkedin.com/in/delphineforma/
  accessed: 2026-10
---

The EU Transfer of Funds Regulation (TFR), Regulation (EU) 2023/1113, establishes information requirements for transfers of funds and certain crypto-assets. It also includes specific requirements for transfers involving self-hosted addresses, including measures to assess whether a customer owns or controls the address in certain circumstances.

For CASPs, the practical question is how to obtain reliable evidence of wallet control without introducing unnecessary costs, delays or security risks.

Four commonly used methods are the Address Ownership Proof Protocol (AOPP), manual message signing, the Satoshi Test and visual proofs such as screenshots or videos. Each method has different technical requirements, security characteristics and implications for the customer experience.

This guide explains how these methods work, compares their advantages and limitations, and explores what CASPs should consider when choosing a self-hosted wallet verification process.

## What Does the EU Transfer of Funds Regulation Require?

The EU [Transfer of Funds Regulation (TFR), Regulation (EU) 2023/1113](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1113&qid=1730134560437), establishes information requirements for transfers of funds and certain crypto-assets. It has applied to crypto-asset transfers since 30 December 2024.

The TFR requires CASPs to collect and handle specified information about the originator and beneficiary of covered transfers. It also addresses transfers involving addresses that are not held by another regulated service provider.

Under Article 14(5), when a crypto-asset transfer is made to a self-hosted address, the originating CASP must obtain and retain the information referred to in Article 14(1) and (2) and ensure that the transfer can be individually identified.

For transfers exceeding EUR 1,000 involving a self-hosted address, Articles 14(5) and 16(2) require CASPs to take adequate measures to assess whether the address is owned or controlled by their customer. The Regulation also addresses cases involving suspected money laundering or terrorist financing.

The EUR 1,000 threshold relates to the specific ownership or control assessment requirement. It should not be interpreted as a general exemption from the EU TFR's information requirements for lower-value crypto-asset transfers.

### What Constitutes Reliable Self-Hosted Wallet Verification?

The European Banking Authority (EBA) has provided further guidance on what constitutes a reliable verification method in its [Travel Rule guidelines](https://www.eba.europa.eu/sites/default/files/2024-07/6de6e9b9-0ed9-49cd-985d-c0834b5b4356/Travel%20Rule%20Guidelines.pdf). Where ownership or control must be assessed, CASPs need to obtain evidence that establishes control of the wallet address, rather than relying solely on a customer's declaration.

Methods that can be used to verify ownership or control include:

* Verification procedures conducted with or without direct human supervision, as described in the EBA's [guidelines on remote customer onboarding](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf).
* Asking the customer to send a predefined amount from the self-hosted address to an account controlled by the CASP, for example through a Satoshi Test.
* Asking the customer to digitally sign a specific message using the private key associated with the wallet address, for example AOPP.
* Alternative approaches that enable a reliable and secure assessment, provided the CASP is satisfied that it has established who owns or controls the address.

## A Real-World Example: The Risks of Checkbox-Based Verification

The importance of reliable self-hosted wallet verification was highlighted in a decision by Malta's Office of the Arbiter for Financial Services in [*ASF 062/2025 KJ v Foris DAX MT Limited*](https://financialarbiter.org.mt/sites/default/files/oafs/decisions/2706/ASF%20062-2025%20-%20KJ%20vs%20Foris%20DAX%20MT%20Limited.pdf).

The case involved a complainant who lost approximately EUR 30,000 after falling victim to a scam. The complainant transferred funds to a self-hosted wallet believed to be controlled by the scammer and argued that the platform had failed to meet its obligations under the EU TFR.

According to the decision, the platform's wallet ownership process required the customer to tick a box confirming control of the destination address. No additional technical verification was performed.

The complainant explained that he had limited knowledge of external wallets and did not fully understand the process. Following the scammer's instructions, he nevertheless confirmed that he controlled the destination address.

The decision resulted in Foris DAX MT Limited being ordered to compensate the complainant for 40% of the losses suffered.

## What Is Self-hosted Wallet Verification?

A self-hosted wallet is a wallet in which the user controls the private keys rather than relying on a third-party custodian to control them.

When a customer requests a transfer between a CASP and a self-hosted wallet, the CASP may need to establish that the customer controls the relevant blockchain address.

Self-hosted wallet verification is the process of obtaining evidence of that control. The evidence can take different forms depending on the verification method used.

The four methods covered in this article are:

1. Address Ownership Proof Protocol (AOPP).
2. Manual signing of a message.
3. The Satoshi Test.
4. Visual proof through screenshots or video clips.

### Method 1: Address Ownership Proof Protocol (AOPP)

The Address Ownership Proof Protocol ([AOPP](https://www.21analytics.co/travel-rule/?tag=self-hosted+wallet#self-hosted-wallet-verification)) automates the process of obtaining cryptographic proof that a customer controls a self-hosted wallet address.

Developed by [21 Analytics](https://www.21analytics.co/) together with the Swiss hardware wallet manufacturer [Bitbox](https://bitbox.swiss/), AOPP is designed to make wallet verification more accessible to customers while reducing manual work for compliance teams.

Rather than asking customers to construct and sign a message manually, AOPP guides them through a wallet-supported signing process and automates the submission of the resulting proof.

*“AOPP could solve the cumbersome proof of ownership issue.”* [Delphine Forma](https://www.linkedin.com/in/delphineforma/), Policy Lead at Solidus Labs, and Crypto Compliance and Legal TG Founder.

#### How Does AOPP Work?

A VASP customer will initiate a withdrawal within their exchange’s software, thereafter a unique proof-request will be generated.

Via this proof-request, the customer opens their wallet and approves the signing operation. The wallet generates a cryptographic signature demonstrating control of the relevant address.

The proof is then returned to the CASP through the AOPP workflow. Because the process is automated, the CASP does not need to rely on a member of the compliance team manually reviewing a screenshot or matching a small test transaction to the customer's request.

The signature does not reveal the customer's private key. Instead, it provides cryptographic evidence that the wallet can produce a valid signature for the relevant address.

### Method 2: Manual Message Signing

Manual message signing is a cryptographic method in which the customer signs a message using the private key associated with the wallet address.

The signature provides evidence that the customer can use the relevant private key without requiring an on-chain transfer.

#### How Does Manual Signing Work?

The CASP provides the customer with a message to sign. The customer opens a compatible wallet, selects the relevant address and signs the message.

The customer then submits the signature to the CASP, which verifies it against the relevant address and message.

If the signature is valid, it provides cryptographic evidence that the signer controls the private key associated with that address.

### Method 3: The Satoshi Test

The Satoshi Test is a wallet verification method based on a small cryptocurrency transaction.

The customer sends an agreed amount of cryptocurrency from the address being verified within a specified period. The CASP then checks the blockchain to confirm that the expected transaction was made.

The method relies on an observable transaction rather than a screenshot or manually submitted signature.

#### How Does the Satoshi Test Work?

The CASP will create a Satoshi Test consisting of a fresh coin deposit address, a random low-value amount of coins previously agreed with the user, and a timeframe (usually between 15min and 48h) for the verification.

The customer sends the agreed amount from the relevant wallet address and the transaction confirmation to their CASP. The CASP monitors the blockchain and checks whether the transaction matches the verification request.

If the expected transaction is detected and the required checks are satisfied, the CASP can use it as evidence that the customer controls the address.

### Method 4: Visual proofs

Visual proof is a wallet verification method in which the customer submits a screenshot or video of their wallet application displaying the relevant address.

The CASP's compliance team reviews the submission and compares the displayed address with the address involved in the transfer.

#### How Do Visual Proofs Work?

The customer captures a screenshot or video of the wallet application showing the address they intend to use.

The customer submits the evidence to the CASP. A member of the compliance team then checks whether the displayed address matches the address supplied for the transaction.

If the evidence appears consistent and satisfies the CASP's procedures, the address may be approved, subject to any other applicable checks.

## Conclusion

Self-hosted wallet verification is an important consideration for CASPs implementing the EU TFR and other [Travel Rule frameworks](/providers/travel-rule/). Collecting customer information is not the same as establishing control of a particular wallet address, and the distinction becomes especially important when a transfer involves a self-hosted wallet.

The Foris DAX MT Limited case demonstrates the potential consequences of relying on a checkbox declaration without additional verification. A customer can confirm ownership of an address without understanding the implications or actually controlling the wallet.

CASPs should therefore select verification methods that provide reliable evidence of control in line with the applicable regulatory requirements. Cryptographic methods, including AOPP and manual message signing, can provide stronger technical evidence than a declaration alone. The Satoshi Test offers transaction-based evidence, while visual proofs may be more accessible but require careful assessment of their limitations.
