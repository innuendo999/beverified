# Shufti Pro: fact re-check 2026-10-18

## Changed
- Pricing: "does not publish standard pricing; quotes via sales; 7-day free trial; third-party estimate $0.50 to $1.70 per verification; setup fees on some plans" → published plans: Free Forever ($0, up to 10 verifications/month), Essentials (from $1.50 per verification, up to 20,000), Enterprise (quote). No trial length or setup fee stated (source 1).
- Coverage: "230+ countries and territories" → "240+ countries and territories"; 150+ languages unchanged (source 3).
- Liveness: added iBeta ISO/IEC 30107-3 PAD Level 3 (letter dated 24 April 2026) and Level 1 (31 Oct 2024) as confirmed (sources 5, 6).
- Certifications: "ISO 27001:2022, SOC 2, GDPR" (fact) → ISO 27001:2022, SOC 2 Type II, PCI DSS, Cyber Essentials Plus listed as vendor-stated (source 4); FAQ "holds ISO 27001:2022 and SOC 2" reworded to say they are vendor-stated.
- Offices: "US, Poland, and the UAE" → UK, Sweden, UAE, Singapore, Hong Kong, Pakistan, Cyprus, US (source 2).
- Founded 2017 and London HQ confirmed via Companies House, SHUFTI PRO LIMITED 11039567, incorporated 31 Oct 2017 (source 8).
- Brand: site now trades as "Shufti"; added to alternate_names (sources 2, 3).
- Deployment: "cloud" → "SaaS", plus private cloud and on-premise (source 3).
- Proprietary AI: supported by "Shufti builds and owns its entire technology stack" (source 7).
- Cons rewritten (all three old cons were about unpublished pricing or unverified review themes).
- Sumsub choose_instead and FAQ rewritten, since published pricing no longer separates the two.
- User ratings: G2 4.5 from 155 reviews (source 9).

## Removed / unverifiable
- 10,000+ document types (no current page states a count).
- 7-day free trial, setup fees, $0.50 to $1.70 third-party estimate.
- "API documentation could be more thorough, per user reviews" (con and theme): review themes not visible on G2.
- Deepfake detection wording in features (not checked on a current page; liveness kept with the iBeta letter).

## Ranking cards
- `age-verification` entry at rankings.yml line 1236 (award "Best step-up flows"): tagline, pros and cons match the current age-verification page (facial age estimation, step-up to database or document checks, zero-knowledge proof credential, Ofcom draft codes reference, no email/mobile estimation, no per-country database list). No corrections needed.

## Score flag
- Possible, upward: pricing went from quote-only to published (free tier plus $1.50 per verification), and Level 3 iBeta PAD is now confirmed. Two of the three old cons no longer apply. Editor should review; score not changed.

## Follow-up 2026-10-22

### Changed
- Pricing page re-checked (source 1): Free Forever $0, up to 10 verifications a month; Essentials from $1.50 per verification, up to 20,000; Enterprise on request. No trial, setup fee or minimum stated. Unchanged, except plan contents added: Free "Document verification and facial biometrics"; Essentials "Adds AML screening, KYB, address and age verification"; summary now notes transaction monitoring, VideoIdent and eIDV are listed under Enterprise.
- Founded and HQ facts: source 8 (Companies House search) → source 10 (company page 11039567: active, incorporated 31 Oct 2017, registered office Coppergate House, London E1 7NF).
- Certifications: added iBeta ISO/IEC 30107-3 PAD Level 2, letter dated 10 Apr 2025, confirmed (source 11). FAQ now mentions Levels 1 and 2.
- FAQ: "does not publish the certificates or certification bodies" → "does not name the certification bodies... The one certificate it links, Cyber Essentials Plus, ran from February 2024 to February 2025" (source 13).
- User ratings: added Capterra 4.2 from 45 reviews (source 12). G2 unchanged at 4.5 from 155 (source 9).
- last_verified and updated → 2026-10-22.

### Removed / unverifiable
- Notes closed: 10,000+ document types (homepage now says "any government-issued document type", no count); old trial and third-party estimate (pricing page still states none); offices (About page lists the same eight); brand (About page uses "Shufti" throughout); Sumsub choose_instead and FAQ wording (checked against sumsub.com/pricing on 2026-10-22: Compliance plan includes AML screening and ongoing AML monitoring, 14-day trial with 50 checks).
- Still unresolved: ISO 27001 body, SOC 2 CPA firm and PCI QSA not named (PCI page states v4.0); trust.shuftipro.com (Vanta) returns no content; current Cyber Essentials Plus certificate not found; HQ is the registered office only; homepage G2 4.6 and Trustpilot 4.8 claims (G2 page shows 4.5; Trustpilot not recorded).

### Ranking cards
- `age-verification` (Best step-up flows): matches shuftipro.com/age-verification (estimation, step-up to database or document, zero-knowledge credential, Ofcom draft codes, no email/mobile estimation, no per-country list). No change.
- `south-africa` (Best for CIPC Business Checks): matches shuftipro.com/south-africa (12 document types incl. Smart ID card and green ID book, CIPC company/director/shareholding checks, FIC sanctions lists, AWS Cape Town region, no South African office). Price text matches the pricing page. No change.

### Score flag
- Minor, for the editor: the only certificate Shufti links (Cyber Essentials Plus) expired on 22 Feb 2025. Shufti still lists the scheme; check the IASME register before treating it as lapsed. Score not changed.

## Follow-up 2026-10-30 (AML screening capabilities)

Filled `capabilities` keys from vendor pages opened 2026-10-30. No existing values changed (all four keys were empty). Score, prose, `last_verified` and `updated` untouched.

- `identity_verification`: yes (document and facial biometrics, all plans); source 1, https://shuftipro.com/pricing/
- `sanctions_pep`: add_on (Essentials plan and up); source 1, https://shuftipro.com/pricing/
- `adverse_media`: add_on (part of AML Screening suite); source 21, https://shuftipro.com/aml-screening/
- `transaction_monitoring`: add_on (Enterprise plan); source 1, https://shuftipro.com/pricing/

- Note: Pricing: Free Forever lists document verification and facial biometrics; Essentials adds AML Screening ("Everything in Free Forever, plus Add-ons"); Enterprise adds Transaction Monitoring. The pricing page does not break out PEP or adverse media; the AML Screening page lists sanctions, PEP/RCA and adverse media.
