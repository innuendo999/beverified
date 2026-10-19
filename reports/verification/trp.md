# TRP (Travel Rule Protocol): first review, 2026-10-19

Record: `src/_data/providers/trp.yml` (new). Validator: `node scripts/checks/provider.mjs trp` reports 0 issues.

## What TRP is (as checked)

- An open, royalty-free specification for VASP-to-VASP Travel Rule messaging (Travel Address, IVMS101 payloads, HTTPS with mutual TLS 1.3, ISO 24165 DTI asset identifiers, extensions). Not a hosted service; nobody operates it.
- Steward: OpenVASP Association, Swiss non-profit members association (launched November 2019, c/o MME Legal AG, Zug). Board: Andrew Davidson (President; also chairs the TRP Working Group), Lucas Betschart (COO, 21 Analytics), Paolo Guarnerio, Thurstan Felstead, Benjamin Bengfort, Carol Van Cleef. Members' General Assembly at least annually. No member list published.
- Origin: TRP Working Group started by Standard Chartered, ING and BitGo; 25 members in Oct 2020, chaired by BC Group / OSL, Fidelity Digital Assets a backer. Combined with OpenVASP, announced 22 Mar 2022.
- Versions: 1.0.0 (19 Aug 2020) to 3.2.1 (29 Jul 2024), from the spec copy in 21 Analytics docs. Current master on GitLab could not be read.
- Implementers: OpenVASP lists 21 Analytics, Blockchain Intelligence Group, ospree. Sumsub and Notabene document TRP support ("Every Notabene customer has a live TRP 1.0 endpoint"). No public list of live VASPs.
- TRISA: interoperable since 2023 (bridge in TRISA's Go package and the MIT-licensed Envoy node). Since 1 Oct 2026 TRISA, its GDS and Envoy are under OpenVASP stewardship; Rotational Labs still operates the infrastructure.
- Cost: specification free. Optional OpenVASP membership CHF 100 (individual) to CHF 10,000 (large non-VASP) a year, 50% reduction linked to TRP; rates frozen until 1 Jan 2027. Implementation, hosting or vendor licence is the VASP's cost.

## Checked

- openvasp.org: homepage, /trp, /about, /trisa-openvasp-faq. /membership and /trp-working-group did not load.
- OpenVASP GitLab project page (description, licence CC BY-SA 4.0, 116 commits, created 6 May 2020). Raw files, API and spec blob blocked by robots.
- TRP spec revision history via docs.21analytics.ch/6.0.0/trp.html; 8.2.0 TRP flow page.
- History: SC Ventures (Oct 2020), CoinDesk (Jun 2020), Crypto Valley Journal and 21 Analytics blog (Mar 2022), 21 Analytics What is TRP and glossary.
- Implementers: Sumsub TRP docs and Travel Rule FAQ, Notabene TRP page and protocols overview, 21 Analytics supporting-trp.
- TRISA: trisa.dev OpenVASP page, TRISA joins OpenVASP release (6 Oct 2026, MENAFN copy of EIN Presswire), Envoy GitHub repo page.

## Not verified

- **travel-rule.com**: could not be opened (robots disallowed, apex and www). No page opened links to it; every official link goes to openvasp.org/trp or the GitLab repo. `link.url` is set to https://travel-rule.com as instructed; confirm who controls the domain, or switch to https://www.openvasp.org/trp.
- Current spec version on GitLab master and the repo's last activity date.
- Any VASP actually live on TRP today. Notabene says most early members left or are not integrating; that is a competitor's view.
- Independent security review of the protocol: none found.
- Envoy release dates (releases page blocked by a permission timeout).

## Score

3.9 (Good). Weighted: Compliance & certifications 3.6 (25%), Coverage 3.7 (20%), Pricing transparency 4.5 (20%), Integration & API depth 3.9 (15%), Support 3.3 (10%), Track record 4.1 (10%) = 3.865.

Rationale vs 21 Analytics (4.0): TRP wins clearly on pricing transparency and is level on track record, but loses on coverage (no adopter list, no directory, no TRUST), support (community only) and compliance (no operator, no audit of the spec). Not applicable certifications are not penalised as such.

## Ranking cards

`src/_data/rankings.yml` → `travel-rule`, entry `name: TRP (Travel Rule Protocol)` (currently `slug: null`, last position). Not edited.

Problems with the current card:
- `pros[1]` "Growing adoption across multiple platforms": not supported. No adopter list exists, the latest visible spec version is from July 2024, and Notabene says most early members have left or are not actively integrating it.
- `pros[2]` "Interoperable by design": only partly true. TRP bridges to TRISA, but has no TRUST connection and no directory.
- `legacy_price_shown: Custom pricing`: wrong. The protocol is royalty-free.
- `legacy_rating_shown: 4.4`: superseded by the review score 3.9 (comes from the provider record once `slug: trp` is set).
- Cons are broadly fair but generic.

Suggested replacement card:

```yaml
  - slug: trp
    name: TRP (Travel Rule Protocol)
    award: Best Open Protocol
    tagline: Royalty-free, open protocol for VASP-to-VASP Travel Rule messaging, stewarded by the non-profit OpenVASP Association and bridged to TRISA.
    coverage: Global, asset-agnostic
    size: VASPs with engineering capacity, or via an implementing vendor
    pros:
    - Free to implement, with a public specification and no central operator
    - Non-profit Swiss steward with published governance and membership fees
    - Bridged to TRISA and supported by 21 Analytics, Sumsub and Notabene
    cons:
    - No public adopter list; Notabene says most early members have left or stopped integrating it
    - You build, host and secure the endpoint yourself, or pay a vendor
    - Community support only, no SLA, and no directory for finding counterparties
    legacy_price_shown: Free (open protocol)
    legacy_rating_shown: null
    segments: []
```

Award "Best Open Protocol": keep. TRISA is also open, but it is not ranked and is now stewarded by the same association.

Position: 2nd, directly after 21 Analytics (4.0) and before the unreviewed Notabene, Sygna Bridge and VerifyVASP entries. Move the TRP entry up from 5th to 2nd.

## Other site copy that conflicts with findings (not edited)

- Notabene card cons in `rankings.yml` and `src/_data/categories/travel-rule.yml` (TAP explainer bullet and FAQ "Can different Travel Rule protocols talk to each other?") say Notabene does not connect to TRP. Notabene's own TRP page says "Every Notabene customer has a live TRP 1.0 endpoint". Recheck those sentences when Notabene is reviewed.
- `categories/travel-rule.yml` quick answer says 21 Analytics is the only reviewed provider; update when the TRP card goes live.

## Score flag

None. New review.
