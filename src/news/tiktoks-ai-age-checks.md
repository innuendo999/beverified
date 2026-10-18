---
title: "TikTok's AI Age Checks: Flags, Lockouts and What Came Next"
seoTitle: "TikTok AI Age Checks: What Happened Next | BeVerified"
seoDescription: "In November 2025 US TikTok users reported AI age flags. Since then: an EU rollout, Australia's under-16 ban, a $400M US settlement and an Ofcom probe."
lede: "In November 2025 US users reported that TikTok was flagging suspected under-13 accounts and restricting features until they proved their age. Since then TikTok has rolled out age detection in Europe, settled a US children's privacy case for $400 million and come under a formal Ofcom investigation over its age assurance."
section: news
published: 2025-11-04
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "TikTok said on 16 January 2026 it would roll out under-13 detection across the EEA, Switzerland and the UK, with flagged accounts sent to human moderators."
  - "Appeals can use facial age estimation from Yoti, credit card authorisation or government-approved ID, according to TikTok."
  - "Australia's under-16 social media minimum age took effect on 10 December 2025 and covers TikTok."
  - "TikTok and ByteDance agreed in August 2026 to pay $400 million to settle the US Justice Department's COPPA case."
  - "Ofcom opened a formal investigation into TikTok's age assurance under the Online Safety Act on 16 July 2026."
topics: [Age Assurance, TikTok, Online Safety, Facial Age Estimation]
provider_slugs: [verifymy]
ranking_keys: [age-verification, liveness-detection, identity-verification]
faq:
  - q: "How does TikTok check your age?"
    a: "Users enter a date of birth at sign-up. TikTok also uses a model that predicts from profile information, videos and on-platform behaviour whether an account may belong to someone under 13, and sends flagged accounts to human moderators."
  - q: "How do I prove my age on TikTok if I was flagged?"
    a: "TikTok's January 2026 announcement lists three appeal options: facial age estimation provided by Yoti, credit card authorisation, or government-approved identification."
  - q: "Is age estimation the same as age verification?"
    a: "No. Estimation predicts an age range from a face or behaviour. Verification confirms a date of birth against a document or trusted record. Ofcom's guidance does not list age inference from behaviour as a method capable of being highly effective."
sources:
  - title: "TikTok reportedly testing AI age checks in the US: All you need to know about the feature"
    publisher: "Soapcentral"
    url: "https://bravo-www.soapcentral.com/entertainment/tiktok-reportedly-testing-ai-age-checks-us-all-need-know-feature"
    accessed: 2026-10
  - title: "Updates to how we enforce age-appropriate experiences"
    publisher: "TikTok Newsroom"
    url: "https://newsroom.tiktok.com/updates-to-how-we-enforce-age-appropriate-experiences?lang=en"
    accessed: 2026-10
  - title: "New social media minimum age rules"
    publisher: "Australian Government, Department of Infrastructure"
    url: "https://www.infrastructure.gov.au/department/media/news/new-social-media-minimum-age-rules"
    accessed: 2026-10
  - title: "4.7 million accounts deactivated, removed or restricted"
    publisher: "Prime Minister of Australia"
    url: "https://anthonyalbanese.com.au/media-centre/4-7-million-accounts-deactivated-removed-or-restricted"
    accessed: 2026-10
  - title: "TikTok, ByteDance reach $400 million settlement with US Justice Dept"
    publisher: "KTVU (Fox)"
    url: "https://www.ktvu.com/news/tiktok-bytedance-reach-400-million-settlement-us-justice-dept.amp"
    accessed: 2026-10
  - title: "Investigation into TikTok's compliance with duties to protect children from encountering harmful content under section 12"
    publisher: "Ofcom"
    url: "https://www.ofcom.org.uk/online-safety/protecting-children/investigation-into-tiktoks-compliance-with-duties-to-protect-children-from-encountering-harmful-content-under-section-12"
    accessed: 2026-10
  - title: "Age checks helping make online experiences safer for UK children, but job not done"
    publisher: "Ofcom"
    url: "https://www.ofcom.org.uk/online-safety/protecting-children/age-checks-helping-make-online-experiences-safer-for-uk-children-but-job-not-done-and-tech-industry-must-act-to-strengthen-protections"
    accessed: 2026-10
  - title: "Commission urges fast rollout of age verification app"
    publisher: "European Commission"
    url: "https://commission.europa.eu/news-and-media/news/commission-urges-fast-rollout-age-verification-app-2026-04-29_en"
    accessed: 2026-10
---

Around the start of November 2025, US TikTok users began posting that the app had decided they were under 13. [Reports based on posts on X](https://bravo-www.soapcentral.com/entertainment/tiktok-reportedly-testing-ai-age-checks-us-all-need-know-feature) described accounts losing posting, LIVE and TikTok Shop access until the holder submitted an ID or a credit card plus a selfie. Some of those flagged were adults; one creator said his account was nearly deleted at 28. TikTok had not made a statement about a US rollout when we first covered the story on 4 November 2025.

## What we reported at the time

The flags appeared to come from a model that estimated age from activity and profile details rather than from the birthdate entered at sign-up. TikTok had piloted this kind of detection in Europe, so a quiet US test was plausible, but it was not confirmed. We did not know the false positive rate, how long a wrongly flagged adult would wait for access, or whether the checks were a test or a rollout.

Our view then, and now: the distinction between age estimation, age verification and age assurance matters. Estimation guesses an age range. Verification checks a date of birth against a document or a trusted record. Age assurance is the umbrella for both. A system that estimates first and asks for verification only on a flag is cheap at scale, but every false positive lands on a real user who now has to hand over an ID image to get their account back. For creators who earn through LIVE or Shop, that is lost income while the appeal runs.

## Why it matters for platforms

Platforms facing age rules usually combine three layers: a self-declared birthdate, a background signal (behavioural inference or facial estimation) and a fallback that proves age on demand. The weak point is the hand-off between layers. If the fallback is slow, or only offers an ID upload, the friction falls on the people the model got wrong.

Vendors in this space differ mainly in the fallback options they give. [VerifyMy](/providers/verifymy/), for example, offers email-based age estimation alongside document, credit card, mobile number and facial age estimation checks, which gives users a choice that does not require an ID document. For document-based fallbacks, providers in our [identity verification rankings](/providers/identity-verification/) handle the ID and selfie step, and [liveness detection](/providers/liveness-detection/) is what stops a photo of someone older being used.

## What has happened since

The story moved from user reports to regulation within a year. Status as of 18 October 2026:

### TikTok expanded detection in Europe

On 16 January 2026 TikTok [announced](https://newsroom.tiktok.com/updates-to-how-we-enforce-age-appropriate-experiences?lang=en) that "in the coming weeks" it would roll out enhanced technology across the EEA, Switzerland and the UK to help moderators find under-13 accounts. The model predicts from profile information, videos and behaviour, and a specialist moderator decides whether to ban. TikTok said a European pilot over the previous year led to the removal of thousands of additional underage accounts, and that it removes around 6 million underage accounts globally each month. Appeals can use facial age estimation provided by Yoti, credit card authorisation or government-approved ID. The announcement did not mention the US.

### Australia's under-16 rule took effect

Australia's social media minimum age obligation [came into force on 10 December 2025](https://www.infrastructure.gov.au/department/media/news/new-social-media-minimum-age-rules) and covers TikTok, Snapchat, X and YouTube among others. On 16 January 2026 the government said eSafety's [preliminary analysis](https://anthonyalbanese.com.au/media-centre/4-7-million-accounts-deactivated-removed-or-restricted) found more than 4.7 million under-16 accounts deactivated, removed or restricted across platforms. It did not give a TikTok figure.

### The US case settled

In August 2026 TikTok and ByteDance agreed to [pay $400 million](https://www.ktvu.com/news/tiktok-bytedance-reach-400-million-settlement-us-justice-dept.amp) to settle the Justice Department's 2024 lawsuit under the Children's Online Privacy Protection Act: $300 million up front and $100 million once a court vacates the 2019 Musical.ly consent decree. The DOJ had alleged that TikTok let children create accounts and kept their data without telling parents. These remain allegations; no court found TikTok liable. The reports we found do not describe age verification terms in the settlement.

### Ofcom opened an investigation

On 16 July 2026 [Ofcom opened a formal investigation](https://www.ofcom.org.uk/online-safety/protecting-children/investigation-into-tiktoks-compliance-with-duties-to-protect-children-from-encountering-harmful-content-under-section-12) into whether TikTok meets its Online Safety Act duties to protect children, focusing on whether its age assurance is "highly effective". In its [age assurance report](https://www.ofcom.org.uk/online-safety/protecting-children/age-checks-helping-make-online-experiences-safer-for-uk-children-but-job-not-done-and-tech-industry-must-act-to-strengthen-protections) Ofcom said it has serious doubts about some age inference models and that its guidance does not list age inference as a method capable of being highly effective. The case page said an update would come in October 2026; none was posted when we checked on 18 October. Fines can reach £18 million or 10% of qualifying worldwide revenue, whichever is greater.

### The EU is building its own tool

On 29 April 2026 the European Commission [urged member states](https://commission.europa.eu/news-and-media/news/commission-urges-fast-rollout-age-verification-app-2026-04-29_en) to speed up rollout of the EU age verification app, aiming to make it available to citizens by the end of 2026.

### Still unanswered

The original question, whether US users were wrongly flagged, has no public answer. TikTok has published no US false positive rate, and we found no official statement on a US rollout of behavioural age detection. For a related story on government-issued credentials and age, see our coverage of the [UK digital ID proposal](/news/uk-digital-id-proposal-suggests-that-ids-would-be-issued-to-teenagers/).
