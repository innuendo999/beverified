---
title: "Brazil's Anatel Makes Face Checks Mandatory for Mobile Lines"
seoTitle: "Anatel Face Biometrics Rule for Mobile Lines | BeVerified"
seoDescription: "Anatel's standard GT-SEG.2026.11 requires face biometrics with liveness before Brazilian mobile lines are activated from 2027. Deadlines and what it means for KYC."
lede: "Brazil's telecom regulator Anatel published technical standard GT-SEG.2026.11 on 28 October 2026. It requires mobile operators to verify individual subscribers with facial recognition and a liveness check, starting with new prepaid lines by 30 September 2027 and ending with every unverified line facing suspension from January 2029."
section: news
cover_label: "Face check for SIMs"
cover_motif: face
cover_palette: warm
published: 2026-11-13
updated: 2026-11-13
author: andrii-klymenko
takeaways:
  - "Anatel's standard GT-SEG.2026.11 requires facial recognition with proof of life, compared against existing government or private biometric databases, for individual and MEI mobile subscribers."
  - "New prepaid activations must use it by 30 September 2027; new postpaid lines, number portability, SIM swaps and registration changes by 31 December 2027; existing unverified users must re-register by 31 December 2028."
  - "Biometric Update and the law firm Cescon Barrieu both report that liveness must meet ISO/IEC 30107-3 at PAD Level 2 or higher, and that a private reference database only counts if its faces were captured with equivalent liveness."
  - "A CPF data lookup on its own compares no face, so a vendor selling to Brazilian operators needs a face match against a qualifying biometric reference, not only a registry check."
topics: [Liveness Detection, Face Biometrics, Brazil, Telecom KYC, Regulation]
provider_slugs: [sumsub, kycaid]
ranking_keys: [brazil, liveness-detection]
about_terms: [liveness-detection, iso-iec-30107-3, face-matching]
mention_orgs:
  - name: "Agência Nacional de Telecomunicações (Anatel)"
    url: "https://www.gov.br/anatel/"
faq:
  - q: "When does Brazil's facial biometrics rule for mobile lines start?"
    a: "Anatel's deadlines are 30 September 2027 for new prepaid activations and 31 December 2027 for new postpaid lines, portability, SIM swaps and registration changes. Existing users who are not yet validated must re-register by 31 December 2028, and from January 2029 unvalidated lines can be suspended and then cancelled."
  - q: "Who has to comply with Anatel standard GT-SEG.2026.11?"
    a: "Providers of Brazil's personal mobile service (SMP), for subscribers who are individuals or individual microentrepreneurs (MEI). Cescon Barrieu and Mobile Time report that this includes virtual operators (MVNOs) and that other companies are exempt from the biometric check for now, though their records must be kept up to date."
  - q: "What liveness standard does Anatel require?"
    a: "Anatel's announcement says facial recognition with proof of life. Biometric Update and Cescon Barrieu, summarising the standard, report presentation attack detection under ISO/IEC 30107-3 at PAD Level 2 or higher, with an active or passive method."
  - q: "Can operators use a CPF database check instead of a selfie?"
    a: "Not on its own, as the rule is described. Anatel requires a face comparison against an existing biometric base, public or private. A check that only confirms a CPF number against registry data does not compare a face."
sources:
  - title: "Anatel aprova validação biométrica obrigatória para usuários de telefonia móvel"
    publisher: "Anatel"
    url: "https://www.gov.br/anatel/pt-br/assuntos/noticias/anatel-aprova-validacao-biometrica-obrigatoria-para-usuarios-de-telefonia-movel"
    accessed: 2026-11
  - title: "Brazil mandates SIM registration with face biometrics, Level 2 PAD (secondary)"
    publisher: "Biometric Update"
    url: "https://www.biometricupdate.com/202610/brazil-mandates-sim-registration-with-face-biometrics-level-2-pad"
    accessed: 2026-11
  - title: "Unico offers facial biometrics for Brazil's mandatory SIM registration (secondary)"
    publisher: "Biometric Update"
    url: "https://www.biometricupdate.com/202611/unico-offers-facial-biometrics-for-brazils-mandatory-sim-registration"
    accessed: 2026-11
  - title: "ANATEL approves biometric verification requirement for mobile phone users (secondary)"
    publisher: "Cescon Barrieu"
    url: "https://cesconbarrieu.com.br/en/anatel-approves-biometric-verification-requirement-for-mobile-phone-users/"
    accessed: 2026-11
  - title: "Anatel: operadoras devem implementar reconhecimento facial (secondary)"
    publisher: "Mobile Time"
    url: "https://www.mobiletime.com.br/noticias/28/10/2026/anatel-biometria-facial/"
    accessed: 2026-11
---

Anatel announced the rule on 28 October 2026. The standard was written by its anti-fraud subgroup (SGT-Fraudes), approved by consensus in the public safety working group GT-Seg, and issued by the Superintendence of Planning and Regulation. Anatel's stated aim is to make it harder to activate lines with false data or someone else's identity. Biometric Update, citing Anatel data, puts the number of active mobile subscriptions in Brazil above 280 million.

We read [Anatel's announcement](https://www.gov.br/anatel/pt-br/assuntos/noticias/anatel-aprova-validacao-biometrica-obrigatoria-para-usuarios-de-telefonia-movel) directly. We could not open the text of the standard itself on Anatel's document system, so the technical details below that go beyond the announcement are attributed to the reports that summarise it.

## What the standard requires

Anatel's announcement sets out the core of it. Operators must check a subscriber's identity with facial recognition and proof of life, and compare the face against a biometric base that already exists, either a government one or one held by a private supplier. The check has to be offered in shops and on the operator's official website and app. There are fallback procedures for people who cannot complete it, and the process has to follow Brazil's data protection law (LGPD).

Two independent summaries add the technical detail. [Biometric Update](https://www.biometricupdate.com/202610/brazil-mandates-sim-registration-with-face-biometrics-level-2-pad) and [Cescon Barrieu](https://cesconbarrieu.com.br/en/anatel-approves-biometric-verification-requirement-for-mobile-phone-users/) both report that:

- presentation attack detection must follow [ISO/IEC 30107-3](/glossary/iso-iec-30107-3/) at PAD Level 2 or higher, active or passive;
- a private reference database only qualifies if its faces were themselves captured with equivalent liveness;
- the system must catch photos, pre-recorded video, masks, deepfakes and synthetic or AI-generated content.

Biometric Update adds that every method must be "documented and auditable". Cescon Barrieu lists a minimum image quality of 480p with the face filling 50% to 80% of the frame, and a fallback order: document check with face match first, then in-person registration with a copy of the document kept.

Biometric Update also points out that ISO/IEC 30107-3 itself does not define "levels". Level 1, 2 and 3 are test criteria set by accredited labs such as iBeta, so buyers should ask which lab tested a product and at which level.

## Who must comply

The rule applies to providers of the personal mobile service (SMP), for subscribers who are individuals or individual microentrepreneurs (MEI). Cescon Barrieu and [Mobile Time](https://www.mobiletime.com.br/noticias/28/10/2026/anatel-biometria-facial/) both report that virtual operators (MVNOs) are covered and that other companies are exempt from the biometric check for now, though their registrations must be kept current. Cescon Barrieu adds that minors are handled through their legal guardian.

## Deadlines

| Date | What applies | Source |
|---|---|---|
| 30 September 2027 | New prepaid activations | Anatel |
| 31 December 2027 | New postpaid lines, portability, SIM swaps, registration and contract changes | Anatel |
| 1 November 2028 | Operators start warning unverified users | Biometric Update, Mobile Time |
| 31 December 2028 | Re-registration of users not yet validated | Anatel |
| January 2029 | Unvalidated lines subject to suspension, then cancellation | Anatel |
| 1 May 2029 | Cancellation of lines still unvalidated after a 120-day suspension | Biometric Update, Cescon Barrieu |

Cescon Barrieu also lists 1 June 2029 as the date after which individuals and MEIs may not hold an unvalidated line at all.

## Unico and Didit

On 6 November [Biometric Update reported](https://www.biometricupdate.com/202611/unico-offers-facial-biometrics-for-brazils-mandatory-sim-registration) that Unico is offering its face biometrics and liveness to operators for the new rule. According to the report, Unico's liveness came with its purchase of Oz Forensics and passed iBeta Level 1 and Level 2 PAD testing, and its IDCloud service matches faces against biometric records linked to the CPF taxpayer number. Unico says that network covers about 96% of Brazil's economically active population. Biometric Update also notes that Unico had not confirmed whether those existing records meet Anatel's collection requirements, and that Unico has opened IDCloud to smaller businesses through Didit.

We have not reviewed Unico or Didit, so we make no claims about either beyond what the report says.

## What it means for KYC providers covering Brazil

The rule binds mobile operators only. For anyone buying identity verification for Brazil it still works as a checklist, because it spells out what a regulator counts as a sound face check.

### Liveness evidence

A Level 2 PAD result from an accredited lab is now the floor in a large Brazilian rule. Our [liveness detection ranking](/providers/liveness-detection/) only credits lab results we can find on the lab's own site. For example, iBeta lists [Sumsub](/providers/sumsub/) Liveness at Level 1, 2 and 3. The rule also names deepfakes and synthetic content, which is where [deepfake and injection attacks](/guide/synthetic-identity-and-deepfake-fraud/) come in: PAD testing covers what is shown to the camera, not a feed injected around it.

### The reference face

Anatel wants a comparison against an existing biometric base. A CPF data check, such as the one [KYCAID](/providers/kycaid/) lists for Brazil, confirms a number and a name against registry data. It compares no face, so on its own it would not meet the rule as described. A vendor's own stored selfies only count if they were captured with equivalent liveness, which is the question Biometric Update says Unico had not yet answered.

### Fallbacks and audit

The standard expects a fallback route and auditable records. Ask how a provider handles a failed face match, what it stores as evidence and where, and how that fits LGPD.

Our [Brazil ranking](/providers/brazil/) compares the reviewed providers for Brazilian onboarding on public evidence, scored under our [methodology](/methodology/).
