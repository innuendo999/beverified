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
  - "Identity abuse is already large: FinCEN found that about 1.6 million suspicious activity reports filed in 2021, 42% of the total, involved identity, covering about $212 billion."
  - "A synthetic identity mixes real and invented data, such as a real Social Security number with a made-up name, so there is often no victim to report it. A deepfake fakes the face, voice or document used in a check."
  - "Liveness detection tested under ISO/IEC 30107-3 covers fakes shown to the camera. Deepfake video injected through a virtual camera or emulator bypasses the camera and needs separate injection attack detection, for which CEN/TS 18099:2024 gives guidance."
  - "FinCEN's alert FIN-2024-Alert004 lists deepfake red flags and asks for the key term FIN-2024-DEEPFAKEFRAUD in related suspicious activity reports. NIST SP 800-63A-4 requires identity providers to check submitted media for manipulation and to block virtual cameras and emulators."
  - "When you test a vendor, ask for separate evidence for presentation attacks, injected video, altered documents and synthetic data, because one lab letter rarely covers all four."
topics: [Synthetic Identity Fraud, Deepfakes, Liveness Detection, Identity Verification]
about_terms: [synthetic-identity-fraud, deepfake-identity-fraud, liveness-detection, injection-attack-detection]
mention_orgs:
  - name: "Financial Crimes Enforcement Network (FinCEN)"
    url: "https://www.fincen.gov/"
  - name: "National Institute of Standards and Technology (NIST)"
    url: "https://www.nist.gov/"
  - name: "European Banking Authority (EBA)"
    url: "https://www.eba.europa.eu/"
  - name: "Federal Reserve System"
    url: "https://www.federalreserve.gov/"
  - name: "Europol"
    url: "https://www.europol.europa.eu/"
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
  - title: "FinCEN Issues Analysis on Identity-Related Suspicious Activity (9 January 2024)"
    publisher: "Financial Crimes Enforcement Network"
    url: "https://www.fincen.gov/news/news-releases/fincen-issues-analysis-identity-related-suspicious-activity"
    accessed: 2026-10
  - title: "8 arrested over running Hong Kong scam ring, opening bank accounts with deepfakes"
    publisher: "South China Morning Post"
    url: "https://scmp.com/news/hong-kong/law-and-crime/article/3307159/hong-kong-police-arrest-8-over-deepfake-scams-bypassing-bank-security-checks"
    accessed: 2026-10
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

{%- set pad = allProviders | capabilityStats("liveness_pad") -%}
{%- set nfc = allProviders | capabilityStats("nfc") %}
Onboarding fraud used to mean a stolen passport and a photo held up to a webcam. Two newer techniques now sit beside it. A [synthetic identity](/glossary/synthetic-identity-fraud/) is a person who does not exist, assembled from real and invented data. A [deepfake](/glossary/deepfake-identity-fraud/) is AI-made or AI-altered media: a face, a video, a voice or an ID document. Fraudsters often combine them, and they defeat different checks.

The scale is large even before AI. FinCEN's [analysis of identity-related suspicious activity](https://www.fincen.gov/news/news-releases/fincen-issues-analysis-identity-related-suspicious-activity), published in January 2024, found that about 1.6 million reports filed in 2021, 42% of all reports that year, involved identity, covering about $212 billion in suspicious activity. "Circumvention of verification standards" was one of the five most reported typologies.

This guide is for compliance and product teams choosing or reviewing an identity verification provider. It explains how each attack reaches a KYC check, which control is built to stop it, and what to ask a vendor. It describes what regulators and standards say; it is not legal advice.

## What synthetic identity fraud and deepfake fraud are

Synthetic identity fraud attacks the data. The Federal Reserve's [mitigation toolkit](https://fedpaymentsimprovement.org/wp-content/uploads/how-is-a-synthetic-identity-created.pdf) describes three ways to build an identity: fabrication (entirely invented data), manipulation (small changes to a real person's data) and compilation (real and fake data combined, such as a real Social Security number with a new name). The face behind it can be real, so a liveness check may pass because a live person is in front of the camera.

Deepfake fraud attacks the evidence. FinCEN's [alert FIN-2024-Alert004](https://www.fincen.gov/sites/default/files/shared/FinCEN-Alert-DeepFakes-Alert508FINAL.pdf) of 13 November 2024 reports more suspicious activity reports from 2023 onward that describe suspected deepfake media, including altered or generated identity documents used to get around verification. It also reports AI-generated images being paired with stolen or fake personal data to create synthetic identities, which is why the two topics belong together.

A case from Hong Kong shows the pattern. In April 2025, police said a ring had replaced the photos on lost Hong Kong identity cards with deepfakes that blended the fraudsters' faces with the cardholders', then uploaded their own selfies to open bank accounts online. According to the [South China Morning Post](https://scmp.com/news/hong-kong/law-and-crime/article/3307159/hong-kong-police-arrest-8-over-deepfake-scams-bypassing-bank-security-checks), eight people were arrested, and 30 of 44 applications made with at least 21 lost cards succeeded. The face match had nothing to catch: the selfie and the card photo showed the same person. The weak points were the document and the data behind it.

## Which KYC control stops which attack

{% include "figures/sdf-attack-map.njk" %}

| Attack (what is faked) | Control built for it | Standard or rule |
|---|---|---|
| Printed photo, screen replay or mask shown to the camera (the live face) | [Liveness detection](/glossary/liveness-detection/) (presentation attack detection) | ISO/IEC 30107-3 test method; EBA guidelines para 41(c) for unattended remote onboarding |
| Deepfake or replayed video fed in through a virtual camera, emulator or tampered app (the camera feed) | [Injection attack detection](/glossary/injection-attack-detection/) | CEN/TS 18099:2024; NIST SP 800-63A-4 section 3.14 |
| Altered or AI-generated ID document (the document image) | Document checks plus, where the document has a chip, [NFC chip verification](/glossary/nfc-chip-verification/) | ICAO Doc 9303 (passive and active authentication) |
| Deepfake in a live video call with an agent (the person on the call) | Agent training and media analysis in [video identification](/glossary/video-identification/) | NIST SP 800-63A-4 section 3.14 |
| Synthetic identity built from real and invented data (the identity data) | [Database verification](/glossary/database-verification/) against independent sources, cross-application signals, SSA eCBSV in the US | Non-documentary verification under 31 CFR 1020.220 |

Three things follow. A liveness result says little about injected video, because [ISO/IEC 30107-3](https://www.iso.org/standard/79520.html) only covers attacks at the capture device during presentation. A chip read proves more than a photo of a document, but [ICAO Doc 9303 Part 11](https://www.icao.int/Security/FAL/TRIP/PublishingImages/Pages/Publications/Doc%209303%207th%20Part11.pdf) says passive authentication alone "does not prevent exact copying" of the chip content or chip substitution; active or chip authentication closes that gap where the document supports it. And none of the biometric controls tells you whether the data belongs to a real, consistent identity.

How common are these controls among the providers we review? Of the {{ pad.total }} with an ISO/IEC 30107-3 liveness result on record, we opened the lab's letter or certificate for {{ pad.confirmed }}; the other {{ pad.vendor_stated }} are vendor-stated only. {{ nfc.yes }} providers include NFC chip reading in the core product and {{ nfc.add_on }} sell it as an add-on (data checked {{ pad.checked | displayDate }}). Our records do not yet track injection attack detection, so ask for it directly.

## Why synthetic identity fraud is hard to detect

The Fed's 2019 paper [Synthetic Identity Fraud in the U.S. Payment System](https://fedpaymentsimprovement.org/wp-content/uploads/frs-synthetic-identity-payments-fraud-white-paper-july-2019.pdf) gives the main reasons. With ordinary identity theft, the real person usually notices and complains. A synthetic identity has no such person, and some lenders book the eventual loss as a credit loss rather than fraud. The paper also notes that the Social Security Administration began assigning numbers at random on 25 June 2011, so checks based on where a number was issued no longer work for newer numbers.

{% include "figures/sdf-lifecycle.njk" %}

The damage arrives late. The identity builds a credit history, sometimes as an authorized user on someone else's good account, pays on time while its limits grow, then draws everything and stops paying. Onboarding checks only see the first stage, so ongoing monitoring of the account matters as much.

In the US, approved financial institutions can use the SSA's [eCBSV service](https://www.ssa.gov/dataexchange/eCBSV/), with the customer's written consent, to check whether a name, date of birth and Social Security number match SSA records. It returns a match result, not an identity verdict, and works best alongside other sources.

## What FinCEN, NIST and the EBA expect

| Body | Document | What it says |
|---|---|---|
| FinCEN (US) | Alert FIN-2024-Alert004, November 2024 | Red flags for deepfake media; use the key term "FIN-2024-DEEPFAKEFRAUD" in related suspicious activity reports |
| NIST (US) | [SP 800-63A-4](https://pages.nist.gov/800-63-4/sp800-63a.html), section 3.14, July 2025 | Identity providers SHALL use technical controls against injected media (for example, detecting a virtual camera, emulator or jailbroken device), analyze submitted media for manipulation, and document tested attack types and false negative rates |
| EBA (EU) | [Remote onboarding guidelines](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2022/EBA-GL-2022-15%20GL%20on%20remote%20customer%20onboarding/1043884/Guidelines%20on%20the%20use%20of%20Remote%20Customer%20Onboarding%20Solutions.pdf), applied since 2 October 2023 | Unattended remote verification should include liveness detection (para 41(c)); randomness in the process helps against synthetic identities (para 43) |
| Europol | [Facing reality?](https://www.europol.europa.eu/cms/sites/default/files/documents/Europol_Innovation_Lab_Facing_Reality_Law_Enforcement_And_The_Challenge_Of_Deepfakes.pdf) (Innovation Lab) | Deepfakes can help criminals fool "know your customer" mechanisms; describes face morphing of two faces into one passport photo |

FinCEN's red flags are worth turning into review rules:

- a customer photo that looks altered or does not fit the customer's stated age;
- identity documents that do not agree with each other;
- a third-party webcam plugin during a live check;
- requests to switch communication method mid-check because of "glitches";
- device or location data that does not fit the documents.

NIST SP 800-63 is written for US federal agencies, and NIST says other organisations may consider it. Its section 3.14 is still the most specific public text on what injection and deepfake controls should do.

## How to check a KYC provider's defences against deepfakes

One headline result rarely covers every attack, so ask for evidence attack by attack.

1. Who tested your liveness check under ISO/IEC 30107-3, at what level, on which product version, and can we see the letter? Levels 1 to 3 are [iBeta's own test levels](https://www.ibeta.com/iso-30107-3-presentation-attack-detection-confirmation-letters/), and iBeta says a pass is not a product certification.
2. Was injection attack detection tested on its own, by whom and against which test plan? CEN/TS 18099:2024, published in December 2024 according to the [Finnish Standards Association](https://store.sfs.fi/en/cents-18099-2024), explains how to plan that evaluation. Does it cover desktop web, mobile web and the native SDKs?
3. Which checks run on the document image, do you read the chip where there is one, and do you check active or chip authentication when the document supports it?
4. Which independent data sources do you check in our countries, do you flag phone numbers, devices, emails or addresses shared across applications, and in the US do you offer eCBSV?
5. Will you run a pilot on our historical applications, including known fraud cases, and report false rejections as well as catches?

The last question usually tells you the most. Our [liveness detection ranking](/providers/liveness-detection/) and [identity verification ranking](/providers/identity-verification/) compare the providers we review, and the glossary pages for [liveness detection](/glossary/liveness-detection/) and [NFC chip verification](/glossary/nfc-chip-verification/) list which of them offer each check. For more real cases, see our article on [identity theft cases](/publications/identity-theft-cases/).
