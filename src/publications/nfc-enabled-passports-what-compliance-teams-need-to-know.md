---
title: "NFC Passports: What Compliance Teams Need to Know"
seoTitle: "NFC Passports Explained for KYC Teams | BeVerified"
seoDescription: "What an NFC ePassport chip holds, how ICAO 9303 passive, active and chip authentication work, what PACE does, and which IDV providers read the chip."
lede: "An NFC passport (ePassport) carries a contactless chip holding a digitally signed copy of the data page and the holder's photo. Reading that chip and checking the signature against the issuing state's certificates is the strongest remote check a document can give you."
section: publications
published: 2025-06-09
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "ICAO Doc 9303 (eighth edition, 2021) is the standard for ePassports; Part 11 covers the chip's security mechanisms and Part 12 its public key infrastructure."
  - "Passive authentication is required by the standard and proves the chip data was signed by the issuer and not changed; on its own it does not detect a cloned chip."
  - "Active authentication or chip authentication proves the chip is genuine, but issuers may choose whether to implement them, so not every passport supports them."
  - "PACE replaces Basic Access Control as the stronger way to open the chip; where a chip supports both, Doc 9303 says PACE shall be used."
  - "The ICAO Public Key Directory had 110 participants as of June 2026 and moved to a new system in March 2026."
topics: [NFC Passport, ePassport, Document Verification, ICAO 9303]
provider_slugs: [regula, sumsub, onfido, idenfy]
ranking_keys: [identity-verification, e-kyc, liveness-detection]
faq:
  - q: "What is an NFC passport?"
    a: "It is a passport with a contactless chip, also called an ePassport or eMRTD. The chip stores the data page details and the facial image, signed by the issuing country, and a phone or reader with NFC can read it once it has the access key from the printed MRZ or CAN."
  - q: "What is the difference between passive and active authentication?"
    a: "Passive authentication checks the issuer's digital signature over the chip data, so it proves the data is genuine and unchanged. Active authentication has the chip sign a fresh challenge with a private key it cannot export, which proves the chip itself is not a copy."
  - q: "Can any phone read an NFC passport?"
    a: "Only a device with NFC hardware, and the verification app has to be granted NFC access. Vendor SDKs such as Sumsub's offer NFC only in their native mobile SDKs, not in a desktop browser flow."
  - q: "Does an NFC chip check stop deepfakes?"
    a: "No. The chip proves the document is genuine. It does not prove that the person holding the phone is the document holder, so a face match against the chip photo plus a liveness check is still needed."
  - q: "What is ICAO 9303?"
    a: "ICAO Doc 9303 is the International Civil Aviation Organization's specification for machine readable travel documents. The current eighth edition (2021) has 13 parts, covering everything from the MRZ layout to the chip's data structure and security protocols."
sources:
  - title: "Doc 9303 Machine Readable Travel Documents, Eighth Edition 2021, Part 1: Introduction"
    publisher: "ICAO"
    url: "https://www.icao.int:443/publications/Documents/9303_p1_cons_en.pdf"
    accessed: 2026-10
  - title: "Doc 9303 Machine Readable Travel Documents, Seventh Edition 2015, Part 11: Security Mechanisms for MRTDs"
    publisher: "ICAO"
    url: "https://www.icao.int/Security/FAL/TRIP/PublishingImages/Pages/Publications/Doc%209303%207th%20Part11.pdf"
    accessed: 2026-10
  - title: "Machine Readable Travel Documents, Part 11, Security Mechanisms for MRTDs (Doc 9303-11), Amendment no. 1 dated 14/6/24"
    publisher: "ICAO Store"
    url: "https://s-store.icao.int/en/machine-readable-travel-documents-part-11-security-mechanisms-for-mrtds-doc-9303-11-amendment-no-1-dated-14-6-24"
    accessed: 2026-10
  - title: "ICAO PKD: Frequently asked questions"
    publisher: "ICAO"
    url: "https://www.icao.int/icao-pkd/frequently-asked-questions"
    accessed: 2026-10
  - title: "ICAO Developments in ICAO Public Key Directory (PKD), 61st DGCA Conference, IP 05/02"
    publisher: "ICAO"
    url: "https://www.icao.int/sites/default/files/APAC/Meetings/2026/2026%20DGCA61/Agenda%20Item05-Aviation%20Security%20and%20Facilitation/61-IP-05-02-ICAO-DEVELOPMENTS-IN-ICAO-PUBLIC-KEY-DIRECTORY-PKD.pdf"
    accessed: 2026-10
  - title: "Security Mechanisms for Electronic Documents"
    publisher: "Regula"
    url: "https://docs.regulaforensics.com/develop/doc-reader-sdk/overview/security-mechanisms-for-electronic-documents/"
    accessed: 2026-10
  - title: "Document Reader SDK: RFID chip processing (mobile)"
    publisher: "Regula"
    url: "https://docs.regulaforensics.com/develop/doc-reader-sdk/mobile/getting-started/rfid/"
    accessed: 2026-10
  - title: "NFC-based ID verification"
    publisher: "Sumsub"
    url: "https://docs.sumsub.com/docs/nfc-based-id-verification"
    accessed: 2026-10
  - title: "NFC for Document report"
    publisher: "Entrust (Onfido)"
    url: "https://documentation.identity.entrust.com/guide/document-report-nfc"
    accessed: 2026-10
---

Most remote document checks look at a picture of a passport. A camera image can be edited, printed, replayed or generated, and every image-based check is a contest between the fraudster's tools and the vendor's model. An NFC read is different in kind. The chip inside an ePassport holds data the issuing country signed with its own key, and a verifier can check that signature mathematically. If you run onboarding, this is worth understanding properly before you decide whether to switch it on.

## What an NFC passport actually is

An NFC passport, also called an ePassport or eMRTD (electronic machine readable travel document), has a contactless chip embedded in the cover or data page. The chip follows ICAO Doc 9303, the International Civil Aviation Organization's specification for travel documents. The [current eighth edition, published in 2021](https://www.icao.int:443/publications/Documents/9303_p1_cons_en.pdf), runs to 13 parts. Three of them matter most for a compliance or product team:

| Part | Title | Why you care |
|---|---|---|
| Part 10 | Logical Data Structure (LDS) for Storage of Biometrics and Other Data in the Contactless IC | Where the data groups (MRZ data, facial image, optional extras) live on the chip |
| Part 11 | Security Mechanisms for MRTDs | How the chip is opened and how its data and the chip itself are authenticated |
| Part 12 | Public Key Infrastructure for MRTDs | The certificate chain that lets you trust an issuer's signature |

In practice the chip stores the same personal details printed in the machine readable zone (MRZ), the holder's facial image, and a Document Security Object (SOD) that carries the issuer's signature over all of it. Some documents hold fingerprints too, but those sit behind extra access controls meant for border authorities, and a commercial KYC flow does not read them.

## How a reader opens the chip: BAC and PACE

The chip will not hand over its data to any phone that taps it. The reader first has to prove it has seen the document.

Under [Basic Access Control (BAC)](https://www.icao.int/Security/FAL/TRIP/PublishingImages/Pages/Publications/Doc%209303%207th%20Part11.pdf), the access key is derived from three MRZ fields: document number, date of birth and date of expiry, with their check digits. This is why every NFC flow starts by scanning the data page. The app reads the MRZ optically and uses it to unlock the chip. Regula's documentation describes the same order: the [access key is obtained during the optical processing](https://docs.regulaforensics.com/develop/doc-reader-sdk/mobile/getting-started/rfid/) step before chip reading starts.

PACE (Password Authenticated Connection Establishment) is the newer protocol. Doc 9303 Part 11 says PACE gives better protection against eavesdropping than BAC and produces strong session keys regardless of how weak the password is. A PACE chip must accept the MRZ as the password and may also accept a CAN (Card Access Number), a short number printed on the document. Where a chip supports both protocols, the standard says PACE shall be used. It also flags that BAC may become deprecated, and since 1 January 2018 chips have been allowed to implement PACE only. For you, that means your SDK must support PACE, or some newer documents will simply refuse to open.

Neither protocol proves anything about authenticity. They only protect the channel. Regula's own summary puts it plainly: [BAC only checks that the terminal has physical access to the document](https://docs.regulaforensics.com/develop/doc-reader-sdk/overview/security-mechanisms-for-electronic-documents/).

## Passive, active and chip authentication

This is the part that gives NFC its value, and the part buyers most often get wrong.

### Passive authentication

Passive authentication (PA) checks the issuer's digital signature on the SOD and confirms that the data groups on the chip match the hashes it contains. Doc 9303 treats this as the basic security feature and marks it REQUIRED. A PA pass tells you the data and photo on the chip were written by the issuing state and have not been altered since.

To verify the signature you need a chain of trust. According to the [ICAO PKD FAQ](https://www.icao.int/icao-pkd/frequently-asked-questions), the chip's signature is checked with the Document Signer Certificate (DSC), the DSC is validated against the issuing country's Country Signing CA (CSCA) certificate, and none of those certificates may appear on a current revocation list (CRL). If your vendor skips the CSCA step and only checks that the signature is internally consistent, a forger with their own keys could pass.

What PA does not do: the standard says it does not prevent exact copying of the chip's content or chip substitution. A cloned chip carries a perfectly valid signature.

### Active authentication

Active authentication (AA) closes that gap. The reader sends a random challenge and the chip signs it with a private key stored in secure memory that cannot be read out. A copy of the data cannot produce that signature, so a pass proves the chip is the original. Doc 9303 marks AA as optional: an issuer may choose to implement it. So a missing AA result can mean the document does not support it, not that it failed.

### Chip authentication

Chip authentication (CA) is the other route to the same goal. It is a Diffie-Hellman key agreement that authenticates the chip and sets up fresh, stronger session keys. Part 11 lists it as optional and notes that PA must also run so the chip's public key itself can be trusted. Regula calls CA [an alternative to AA because it confirms chip authenticity](https://docs.regulaforensics.com/develop/doc-reader-sdk/overview/security-mechanisms-for-electronic-documents/). Terminal Authentication and Extended Access Control sit on top of this for the fingerprint data groups and are not part of a normal KYC read.

A sensible decision rule for onboarding: require PA with a full CSCA chain on every chip read, and treat AA or CA as an extra signal when the document supports it.

## Where the trust anchors come from

The certificates live in the [ICAO Public Key Directory (PKD)](https://www.icao.int/icao-pkd/frequently-asked-questions), which distributes Document Signer Certificates, CRLs, master lists of CSCA certificates and barcode signer certificates for visible digital seals. ICAO says the PKD contents can be downloaded for free. Participants deposit their CSCA certificates with ICAO in a key import ceremony.

Coverage is not universal. An ICAO paper for the 61st DGCA Conference in September 2026 put [PKD participation at 110 as of June 2026](https://www.icao.int/sites/default/files/APAC/Meetings/2026/2026%20DGCA61/Agenda%20Item05-Aviation%20Security%20and%20Facilitation/61-IP-05-02-ICAO-DEVELOPMENTS-IN-ICAO-PUBLIC-KEY-DIRECTORY-PKD.pdf). The same paper says a new PKD system launched in March 2026, replacing one that had run for the previous ten years, and that the PKD now also carries data for digital travel credentials and eVisas. If a country is not in the PKD, your vendor needs another trusted route to its CSCA (bilateral exchange or a national master list), or passive authentication for that country cannot complete. Ask vendors which countries they can fully chain, not just which documents they can read.

On the standard itself: the ICAO store lists [Amendment No. 1 to Part 11 dated 14 June 2024](https://s-store.icao.int/en/machine-readable-travel-documents-part-11-security-mechanisms-for-mrtds-doc-9303-11-amendment-no-1-dated-14-6-24), so check that your vendor tracks amendments and not only the base edition.

## Which providers we review read the chip

We only list what the vendor's own documentation states. Absence from this table means we did not find it documented, not that the feature does not exist.

| Provider | What the documentation says | Our review |
|---|---|---|
| Regula | Document Reader SDK reads the RFID chip through the device's NFC module and performs passive and active authentication; the license must cover RFID reading | [Regula review](/providers/regula/) |
| Sumsub | NFC verification is available only in the MobileSDK (iOS, Android and native plugins); NFC can be set to disabled, optional or required, and must be enabled by Sumsub | [Sumsub review](/providers/sumsub/) |
| Onfido (Entrust) | NFC for Document report runs passive authentication for data integrity and active authentication to detect cloned chips; enabled by default from iOS SDK 29.1.0 and Android SDK 18.1.0 | [Onfido review](/providers/onfido/) |
| iDenfy | Our review records NFC-based document verification as a feature | [iDenfy review](/providers/idenfy/) |

Two details stand out from the docs. Sumsub's [optional mode falls back](https://docs.sumsub.com/docs/nfc-based-id-verification) to the standard document check if the applicant skips the chip, so "NFC supported" does not mean every approved user had a chip read. And [Entrust's NFC report](https://documentation.identity.entrust.com/guide/document-report-nfc) returns a `consider` result that turns the overall verification to suspected, which you need to handle in your decision logic rather than treat as a hard fail.

For a wider comparison of document and biometric vendors, see our [identity verification rankings](/providers/identity-verification/) and the [eKYC provider list](/providers/e-kyc/).

## Building it into an onboarding flow

A few things we would check before going live:

1. NFC is mobile only. It needs a phone with NFC hardware and an app permission. Desktop users need a different path, and so do users whose phone lacks NFC.
2. Decide what fallback means. If you run NFC as optional, record whether the chip was read and route non-NFC approvals to a stricter risk tier or extra checks.
3. Store results rather than the chip dump. For audit you usually need the PA, AA or CA outcomes, the certificate used and the timestamp. Keeping the full chip image and photo is a data protection decision your DPO should make.
4. Pair it with liveness. The chip proves the document and says nothing about who is holding the phone. Match the selfie against the chip photo and run [liveness detection](/providers/liveness-detection/) on the selfie.
5. Test on real phones and real documents before launch, and write clear on-screen guidance for where to hold the passport.

If you are weighing NFC as part of a wider onboarding redesign, our piece on [KYC automation for banks](/publications/kyc-automation-for-banks/) covers where document checks sit in the workflow, and our [OSINT for fraud prevention](/publications/how-to-use-osint-for-fraud-prevention/) guide covers the checks that catch synthetic identities a genuine document cannot.

## Where NFC falls short

A chip read does not catch a genuine passport used by the wrong person, a real document bought from its owner, or a stolen passport that has not yet been reported. It also does nothing for documents without a chip, which still make up a share of what most global platforms see. NFC moves document forgery from hard to impractical. It does not replace face matching, liveness or screening, and it should be scored that way in your risk model. Our [methodology](/methodology/) explains how we weigh document authentication against the other checks when we rank vendors.
