---
title: "Synthetic Identity and Deepfake Fraud in KYC: Attacks and the Controls That Stop Them"
seoTitle: "Synthetic Identity and Deepfake Fraud in KYC | BeVerified"
seoDescription: "How synthetic identities and deepfakes get through KYC checks, which control stops each attack, what FinCEN, NIST and the EBA expect, and how to test a vendor."
lede: "Synthetic identities and deepfakes attack different parts of onboarding. A synthetic identity fakes the person's data; a deepfake fakes the face or the document. No single check covers both, so this guide maps each attack to the control and the standard that deals with it."
section: guide
cover_label: "Fake faces, fake people"
cover_motif: face
cover_palette: dark
published: 2026-10-29
updated: 2026-10-29
author: andrii-klymenko
takeaways:
  - "A synthetic identity mixes real and invented data, such as a real Social Security number with a made-up name, so there is often no victim to report it. A deepfake fakes the face, voice or document used in a check."
  - "Liveness detection tested under ISO/IEC 30107-3 covers fakes shown to the camera. Deepfake video injected through a virtual camera or emulator bypasses the camera and needs separate injection attack detection, for which CEN/TS 18099:2024 gives guidance."
  - "FinCEN's alert FIN-2024-Alert004 lists deepfake red flags and asks for the key term FIN-2024-DEEPFAKEFRAUD in related suspicious activity reports. NIST SP 800-63A-4 requires identity providers to check submitted media for manipulation and to block virtual cameras and emulators."
  - "When you test a vendor, ask for separate evidence for presentation attacks, injected video, altered documents and synthetic data, because one lab letter rarely covers all four."
topics: [Synthetic Identity Fraud, Deepfakes, Liveness Detection, Identity Verification]
ranking_keys: [liveness-detection, identity-verification]
faq:
  - q: "What is the difference between synthetic identity fraud and deepfake fraud?"
    a: "Synthetic identity fraud invents a person from real and fake data, for example a real Social Security number with a new name. Deepfake fraud uses AI-made or AI-altered images, video, audio or documents to get through a check. Criminals combine them: FinCEN reports AI-generated images being paired with stolen or fake personal data to build synthetic identities."
  - q: "Can liveness detection stop deepfakes?"
    a: "It can catch a deepfake played on a screen in front of the camera. A deepfake injected straight into the video stream through a virtual camera or emulator never passes the camera, so it needs injection attack detection as well."
  - q: "Does an iBeta Level 2 liveness result mean a product stops deepfakes?"
    a: "No. iBeta's levels are its own test levels for presentation attack detection under ISO/IEC 30107-3, and iBeta says a pass is not a certification. That standard covers attacks at the capture device only, so injected deepfakes are outside its scope."
  - q: "How do you detect a synthetic identity at onboarding?"
    a: "Check the identity data against independent sources rather than only the documents the applicant supplies, look for phone numbers, devices, emails or addresses shared across many applications, and in the US consider SSA's eCBSV service, which confirms whether a name, date of birth and Social Security number match SSA records."
sources:
  - title: "Synthetic Identity Fraud in the U.S. Payment System (July 2019)"
    publisher: "Federal Reserve Banks"
    url: "https://fedpaymentsimprovement.org/wp-content/uploads/frs-synthetic-identity-payments-fraud-white-paper-july-2019.pdf"
    accessed: 2026-10
  - title: "How Is a Synthetic Identity Created?"
    publisher: "Federal Reserve, FedPayments Improvement"
    url: "https://fedpaymentsimprovement.org/wp-content/uploads/how-is-a-synthetic-identity-created.pdf"
    accessed: 2026-10
  - title: "FinCEN Alert on Fraud Schemes Involving Deepfake Media Targeting Financial Institutions (FIN-2024-Alert004)"
    publisher: "Financial Crimes Enforcement Network"
    url: "https://www.fincen.gov/sites/default/files/shared/FinCEN-Alert-DeepFakes-Alert508FINAL.pdf"
    accessed: 2026-10
  - title: "NIST SP 800-63A-4, Digital Identity Guidelines: Identity Proofing and Enrollment"
    publisher: "National Institute of Standards and Technology"
    url: "https://pages.nist.gov/800-63-4/sp800-63a.html"
    accessed: 2026-10
  - title: "Guidelines on the use of remote customer onboarding solutions (EBA/GL/2022/15)"
    publisher: "European Banking Authority"
    url: "https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf"
    accessed: 2026-10
  - title: "CEN/TS 18099:2024 Biometric data injection attack detection"
    publisher: "Finnish Standards Association SFS"
    url: "https://store.sfs.fi/en/cents-18099-2024"
    accessed: 2026-10
  - title: "ISO/IEC 30107-3:2023 Biometric presentation attack detection, Part 3: Testing and reporting"
    publisher: "ISO"
    url: "https://www.iso.org/standard/79520.html"
    accessed: 2026-10
  - title: "ISO 30107-3 presentation attack detection confirmation letters"
    publisher: "iBeta Quality Assurance"
    url: "https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/"
    accessed: 2026-10
  - title: "Doc 9303 Machine Readable Travel Documents, Part 11: Security Mechanisms for MRTDs"
    publisher: "International Civil Aviation Organization"
    url: "https://www.icao.int/Security/FAL/TRIP/PublishingImages/Pages/Publications/Doc%209303%207th%20Part11.pdf"
    accessed: 2026-10
  - title: "31 CFR 1020.220: Customer identification program requirements for banks"
    publisher: "Electronic Code of Federal Regulations"
    url: "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.220"
    accessed: 2026-10
  - title: "Electronic Consent Based Social Security Number Verification (eCBSV)"
    publisher: "Social Security Administration"
    url: "https://www.ssa.gov/dataexchange/eCBSV/"
    accessed: 2026-10
  - title: "Facing reality? Law enforcement and the challenge of deepfakes"
    publisher: "Europol Innovation Lab"
    url: "https://www.europol.europa.eu/cms/sites/default/files/documents/Europol_Innovation_Lab_Facing_Reality_Law_Enforcement_And_The_Challenge_Of_Deepfakes.pdf"
    accessed: 2026-10
---

Onboarding fraud used to mean a stolen passport and a photo held up to a webcam. Two newer techniques now sit alongside it. A [synthetic identity](/glossary/synthetic-identity-fraud/) is a person who does not exist, assembled from real and invented data. A [deepfake](/glossary/deepfake-identity-fraud/) is AI-made or AI-altered media: a face, a video, a voice or an ID document. They are often used together, and they defeat different checks.

This guide is for compliance and product teams choosing or reviewing an identity verification provider. It explains how each attack reaches a KYC check, which control is built to stop it, and what to ask a vendor. It describes what regulators and standards say; it is not legal advice.

## Two different problems

A synthetic identity attacks the data. The Federal Reserve describes three ways to build one in its [mitigation toolkit](https://fedpaymentsimprovement.org/wp-content/uploads/how-is-a-synthetic-identity-created.pdf): fabrication (entirely invented data), manipulation (small changes to a real person's data) and compilation (real and fake data combined, such as a real Social Security number with a new name). The face behind it can be real. A document check may pass if the fraudster has a genuine-looking document in that name, and a liveness check may pass because a live person is in front of the camera.

A deepfake attacks the evidence. FinCEN's [alert FIN-2024-Alert004](https://www.fincen.gov/sites/default/files/shared/FinCEN-Alert-DeepFakes-Alert508FINAL.pdf) of 13 November 2024 says that from 2023 it saw more suspicious activity reports describing suspected deepfake media, including altered or generated identity documents used to get around verification. It also reports criminals combining AI-generated images with stolen or fake personal data to create synthetic identities. That combination is why the two belong in one guide.

## Which control stops which attack

| Attack (what is faked) | Control built for it | Standard or rule |
|---|---|---|
| Printed photo, screen replay or mask shown to the camera (the live face) | [Liveness detection](/glossary/liveness-detection/) (presentation attack detection) | ISO/IEC 30107-3 test method; EBA guidelines para 41(c) for unattended remote onboarding |
| Deepfake or replayed video fed in through a virtual camera, emulator or tampered app (the camera feed) | [Injection attack detection](/glossary/injection-attack-detection/) | CEN/TS 18099:2024; NIST SP 800-63A-4 section 3.14 |
| Altered or AI-generated ID document (the document image) | Document checks plus, where the document has a chip, [NFC chip verification](/glossary/nfc-chip-verification/) | ICAO Doc 9303 (passive and active authentication) |
| Deepfake in a live video call with an agent (the person on the call) | Agent training and media analysis in [video identification](/glossary/video-identification/) | NIST SP 800-63A-4 section 3.14 |
| Synthetic identity built from real and invented data (the identity data) | [Database verification](/glossary/database-verification/) against independent sources, cross-application signals, SSA eCBSV in the US | Non-documentary verification under 31 CFR 1020.220 |

Three points follow from the table. First, a liveness result says little about injected video: [ISO/IEC 30107-3](https://www.iso.org/standard/79520.html) only considers attacks at the capture device during presentation, so injection is out of its scope. Second, a chip read proves more than a photo of a document, but [ICAO Doc 9303 Part 11](https://www.icao.int/Security/FAL/TRIP/PublishingImages/Pages/Publications/Doc%209303%207th%20Part11.pdf) says passive authentication alone "does not prevent exact copying" of the chip content or chip substitution; active or chip authentication closes that gap where the document supports it. Third, none of the biometric controls tells you whether the person's data belongs to a real, consistent identity. That needs data checks.

## Why synthetic identities slip through

The Fed's 2019 paper [Synthetic Identity Fraud in the U.S. Payment System](https://fedpaymentsimprovement.org/wp-content/uploads/frs-synthetic-identity-payments-fraud-white-paper-july-2019.pdf) gives the main reasons. With ordinary identity theft, the real person usually notices and complains. A synthetic identity has no such person, and some lenders book the eventual loss as a credit loss rather than fraud. The paper also notes that the Social Security Administration began assigning numbers at random on 25 June 2011, so checks based on where a number was issued no longer work for newer numbers.

The typical pattern is slow. The identity builds a credit history, sometimes by being added as an authorized user on someone else's good account, pays on time while its limits grow, then uses all available credit and stops paying. This is the "bust-out". Because the damage comes months later, onboarding checks are only one layer; ongoing monitoring of the account matters too.

In the US, approved financial institutions can use the SSA's [eCBSV service](https://www.ssa.gov/dataexchange/eCBSV/), with the customer's written consent, to check whether a name, date of birth and Social Security number match SSA records. It returns a match result, not an identity verdict, so it works best combined with other sources.

## What regulators and standards expect

### FinCEN

The deepfake alert lists red flags, among them a photo that shows signs of alteration or does not fit the customer's stated age, identity documents that do not agree with each other, a third-party webcam plugin during a live check, attempts to change communication method during a live check because of "glitches", and device or location data that does not fit the documents. FinCEN asks institutions to use the key term "FIN-2024-DEEPFAKEFRAUD" in related suspicious activity reports.

### NIST

[SP 800-63A-4](https://pages.nist.gov/800-63-4/sp800-63a.html), final since July 2025, has a section on digital injection prevention and forged media detection (section 3.14). Credential service providers SHALL implement technical controls such as detecting a virtual camera, device emulator or jailbroken device, SHALL analyze submitted media for signs of manipulation, and SHALL test their detection and document the attack types tested and the false negative rates for relying parties. Agents in attended remote sessions SHALL be trained to spot manipulated media. The guidelines are written for US federal agencies; NIST says other organisations may consider them.

### EBA

The European Banking Authority's [guidelines on remote customer onboarding](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf), applied since 2 October 2023, say unattended remote verification should include liveness detection (paragraph 41(c)) and that randomness in the process helps against risks such as synthetic identities (paragraph 43).

### Europol

Europol's Innovation Lab report [Facing reality?](https://www.europol.europa.eu/cms/sites/default/files/documents/Europol_Innovation_Lab_Facing_Reality_Law_Enforcement_And_The_Challenge_Of_Deepfakes.pdf) lists fooling "know your customer" mechanisms among the crimes deepfakes can enable, and describes face morphing, where two faces are blended into one passport photo.

## How to test a vendor

Ask for evidence for each attack separately. One headline result rarely covers all of them.

- For presentation attacks, ask for the lab's confirmation letter for ISO/IEC 30107-3 testing, the level and the product version. Levels 1 to 3 are [iBeta's own test levels](https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/), and iBeta says a pass is not a certification of the product.
- For injected video, ask whether injection attack detection was tested on its own, by whom and against which test plan. CEN/TS 18099:2024, published in December 2024 according to the [Finnish Standards Association](https://store.sfs.fi/en/cents-18099-2024), explains how to plan such an evaluation. Check that it covers every channel you will use: desktop web, mobile web and native SDKs.
- For documents, ask which checks run on the image, whether the chip is read where available, and whether active or chip authentication is checked when the document supports it.
- For synthetic data, ask which independent sources are checked in your countries, whether the product flags phone numbers, devices, emails or addresses shared across applications, and in the US whether eCBSV is offered.
- Finally, a pilot on your historical applications, with known fraud cases, tells you more than any marketing figure. Ask for false rejection rates as well as catch rates, since a check that blocks real customers has its own cost.

Our [liveness detection ranking](/providers/liveness-detection/) and [identity verification ranking](/providers/identity-verification/) compare the providers we review. The glossary pages for [liveness detection](/glossary/liveness-detection/) and [NFC chip verification](/glossary/nfc-chip-verification/) list which reviewed providers offer each check, generated from our review data. For real cases of identity fraud, see our article on [identity theft cases](/publications/identity-theft-cases/).
