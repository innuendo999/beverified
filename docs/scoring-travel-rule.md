# Travel Rule scoring methodology, Travel Rule 1.0 (proposal, 2026-11-25)

Status: **proposal, not approved.** Nothing on the site changes until the owner approves the buyer profile, the criteria and the weights. No provider has a Travel Rule 1.0 score yet.

Applies to the ranking `/providers/travel-rule/` (rankings.yml key `travel-rule`, 11 providers on 2026-11-25). Replaces the shared rubric v3.0 for this ranking only. The H1 and title stay as they are.

Background: the owner decided on 2026-11-04 to build a separate Travel Rule methodology with more weight on network and protocol coverage, and announced it to 21 Analytics, which is #1 in the ranking and buys sponsored placements. The process therefore has to be visibly vendor-neutral (see "Neutrality safeguards").

## 1. Buyer profile (ICP)

**Primary buyer:** a licensed or registered crypto-asset service provider that sends and receives crypto transfers for customers and must exchange originator and beneficiary data with the counterparty: centralised exchanges, brokers, custodians and wallet providers, OTC desks, crypto payment firms and stablecoin issuers.

- **Where:** EU and EEA (Transfer of Funds Regulation 2023/1113 and EBA Travel Rule Guidelines, no threshold for CASP-to-CASP transfers), UK, Switzerland, US (FinCEN Travel Rule at USD 3,000; stablecoin issuers under the GENIUS Act rules), and APAC markets with their own networks (South Korea, Singapore, Japan, Hong Kong).
- **Who decides:** the MLRO or head of compliance, with the CTO or engineering lead for integration and the DPO or CISO for data protection and vendor risk.
- **Size:** from a newly licensed CASP with a few thousand transfers a month to a large exchange with millions. Size changes the deployment and price questions, not the core job.
- **Secondary buyers:** banks with crypto custody, and payment firms adding stablecoin rails. Same jobs, stricter vendor risk review.

Situations that change the right choice but are not "better" or "worse" go into the fit check, not the score: hosted or self-hosted, the region where data must stay, which networks the buyer's main counterparties use, monthly volume.

## 2. Jobs to be done and pains

| Job | What goes wrong today | Source |
|---|---|---|
| **J1. Exchange Travel Rule data with every counterparty I transact with, both ways** | Counterparties sit on different networks and protocols; a transfer to a counterparty you cannot reach becomes a manual email, a delayed credit or a returned deposit | ADAN, CryptoUK and GDF report (Jul 2025) on interoperability; Notabene State of the Travel Rule 2025 (vendor research): 19.8% of VASPs return deposits that arrive without Travel Rule data |
| **J2. Know who is on the other side of an address** | Telling a self-hosted address from a VASP address, and finding which VASP, is error-prone; a wrong classification is itself a breach | EBA consultation responses; FATF targeted updates on VASP identification |
| **J3. Prove that a self-hosted wallet belongs to my customer** (EU: above EUR 1,000) | Verification adds friction; methods differ in how much proof they give and how much they annoy customers | EBA/GL/2024/11; ADAN, CryptoUK and GDF report |
| **J4. Decide whether I may send personal data to this counterparty** | Counterparty due diligence is slow and repetitive; some counterparties sit in jurisdictions where the rule is not yet in force (sunrise issue) | ADAN, CryptoUK and GDF report; VerifyVASP (vendor) argues the real bottleneck is counterparty due diligence, not interoperability |
| **J5. Handle incomplete or missing data and prove what I did** | The EBA expects detection of missing information and a documented decision (execute, reject, return or suspend) | EBA/GL/2024/11 |
| **J6. Keep customer data safe while it travels** | Personal data passes through intermediaries; GDPR, and DORA for EU CASPs, require knowing who holds it and where | GDPR; DORA Art. 28 and 30 |
| **J7. Go live fast and keep transfers moving** | Integration work, test environments, and support when a transfer is stuck | buyer profile |
| **J8. Know what it will cost** | Most vendors quote only after a sales call; cost per message or per month decides the choice for small CASPs | buyer profile |

FATF context: in its July 2026 update, 83% of surveyed jurisdictions had Travel Rule legislation, while almost half had not yet taken any Travel Rule supervisory or enforcement action. Enforcement is starting, so a tool that only looks compliant on paper is the risk.

## 3. What a buyer should weigh, and what we can score

| Question a buyer asks | Can public evidence answer it? | Where it goes |
|---|---|---|
| Can I reach my counterparties? | Partly: which connections are live and whether the other side confirms them | Criterion 1 |
| How big is each network? | No: vendor counts are self-declared and not comparable | Not scored, not compared |
| Is a network vendor-run, member-governed or an open protocol? | Yes, but it is a design choice, not a quality | Shown as a label, not scored |
| Will it tell me who is behind an address and help me vet them? | Partly: discovery, due diligence data, sunrise handling | Criterion 2 |
| How do my customers prove a self-hosted wallet? | Yes: methods named in docs | Criterion 3 |
| What happens when data is missing? | Partly: documented workflows | Criterion 4 |
| Who can read my customers' data in transit and at rest? | Partly: encryption design, data location, deployment | Criterion 5 |
| How fast can we integrate, and who helps when a transfer is stuck? | Partly: docs, sandbox terms, published support terms | Criterion 6 |
| Can I trust the vendor's security? | Partly: confirmed certificates, incidents | Criterion 7 |
| What will it cost? | Partly: published prices or a stated price basis | Criterion 8 |
| Hosted or self-hosted? Data region? Which networks matter to me? | Yes, but the answer depends on the buyer | Fit check (exists on reviews), no points |
| Does it work at my volume, and how fast are messages delivered? | No public evidence | "What to test in a pilot" |

## 4. Criteria and weights (proposed)

| # | Criterion | Weight | v3.0 equivalent |
|---|---|---|---|
| 1 | Counterparty reach | 30% | part of Coverage (20%) |
| 2 | Counterparty identification and due diligence | 15% | new |
| 3 | Self-hosted wallet verification | 10% | part of Coverage |
| 4 | Missing data handling and audit trail | 10% | part of Compliance |
| 5 | Data protection in transit and at rest | 10% | part of Compliance |
| 6 | Integration and support | 10% | Integration (15%) + Support (10%) |
| 7 | Vendor security assurance | 5% | part of Compliance (25%) |
| 8 | Pricing transparency | 10% | Pricing transparency (20%) |

Sub-scores 1 to 5 in steps of 0.5, sub-score = 1 + points, cap 5. A feature with no public evidence earns no points and its weight does not move. Values are read from the provider record (`networks[]`, `facts[]`, `certifications[]`, `pricing`, `incidents.yml`) and a new `travel_rule{}` block; nothing is retyped. Each evidence item counts in one criterion only.

### 4.1 Counterparty reach (30%)

Each network or protocol the provider connects to is counted once, by its status:

| Status | Points | Example |
|---|---|---|
| Live and confirmed by the other side (the network operator's or the other vendor's own page lists the connection) | 1 | TRUST's page listing its interoperability partner |
| Live, stated by the provider only | 0.5 | a protocol the vendor says it implements, with docs |
| Bridge through a third party's software | 0.5 | TRISA through a TRP bridge |
| Works only through the customer's own membership, or inbound only | 0.25 | |
| The provider's own network | 1 if it publishes a participant list or count with a date; 0.5 otherwise | |
| Old major protocol version only, "on request", claimed, planned, pending, historical | 0 | TRP 1.0 endpoint while the current major version is 3 |
| Fallback for counterparties with no tool (secure email or web form) | +0.5, once | |

Points = sum, capped at 4 (sub-score 5).

Rules:
- A protocol counts only in its current major version (TRP: 3.x on 2026-11-25), or a version the protocol's own documentation says is compatible with it. Versions are checked against the protocol's own repository or site.
- "On request", "coming soon" and "in testing" count 0 until the connection is documented as available.
- Network size is never scored or compared: participant counts are self-declared and not comparable (21 Analytics made the same point, see section 6).
- The type of network (open protocol, member-governed network, vendor-run network) is shown as a label next to each connection, never scored. Membership due diligence done by a network counts under criterion 2, by the same rule for every network.
- OpenVASP is not a protocol (rule of 2026-11-19): a vendor listing "OpenVASP" gets nothing for it; TRP counts.

### 4.2 Counterparty identification and due diligence (15%)

| Evidence | Points |
|---|---|
| Counterparty discovery: identifies whether an address belongs to a VASP and which one (directory lookup, address attribution or both) | +1 |
| VASP due diligence data offered to the customer: licence or registration status, questionnaire, sanctions check of the counterparty | +1 |
| Membership due diligence done by the network itself (members must pass AML, security or privacy checks before joining), documented by the network | +1 |
| Sunrise handling: documented way to deal with counterparties in jurisdictions where the rule is not yet in force (store data, send with warning, or manual route) | +0.5 |
| Directory freshness stated: how often counterparty records are updated | +0.5 |

### 4.3 Self-hosted wallet verification (10%)

| Evidence | Points |
|---|---|
| Each ownership proof method offered, from the EBA list or equivalent: signed message, micro-transaction (Satoshi test), AOPP or another automated wallet protocol, screenshot or video | +0.75 each, up to 3 |
| At least one method works without manual review by the CASP | +0.5 |
| Self-hosted address detection (tells the CASP that an address is self-hosted) | +0.5 |

The number of wallets a vendor says it supports is not scored.

### 4.4 Missing data handling and audit trail (10%)

| Evidence | Points |
|---|---|
| Detects missing or incomplete originator or beneficiary data before the transfer is credited | +1 |
| Configurable decisions on missing data: execute, reject, return or suspend (EBA/GL/2024/11) | +1 |
| IVMS101 data model | +1 |
| Audit log and export of every message and decision | +1 |

### 4.5 Data protection in transit and at rest (10%)

| Evidence | Points |
|---|---|
| Personal data is not readable by the vendor in transit: end-to-end encryption between the two VASPs, or a design where the data never passes through the vendor | +1.5 |
| The customer can choose where data is stored (region), or the data stays on the customer's own infrastructure | +1 |
| Retention and deletion controls documented | +0.5 |
| Data processing terms (DPA) or a GDPR statement published | +0.5 |

Hosting choice itself is not scored. The first two rows reward the outcome (who can read the data, where it sits), which hosted and self-hosted products can both reach.

### 4.6 Integration and support (10%)

| Evidence | Points |
|---|---|
| Public API documentation without login | +1 |
| Test environment: self-serve sandbox +1; sandbox on request +0.5 | +1 |
| Supported blockchains or assets listed | +0.5 |
| Published response time for critical incidents | +1 (24 hours or faster); +0.5 (slower) |
| Published uptime SLA, for hosted products only; for self-hosted products this row is left out and the criterion is scored on the other rows | +0.5 |

### 4.7 Vendor security assurance (5%)

| Evidence | Points |
|---|---|
| ISO/IEC 27001 or SOC 2 Type II confirmed (certificate number and body, or report seen) | +2 |
| Vendor-stated only | +0.5 |

Deductions: regulatory action, disclosed breach or incident in the last 24 months, -1 each, from `incidents.yml`.

### 4.8 Pricing transparency (10%)

Same rule as rubric v3.1: published per-message or monthly prices 5; published prices with a minimum or annual plan 4; some modules priced 3; third-party price only, dated 2; nothing anywhere: "Not publicly disclosed" (weight shared out). The owner asked whether this should be 10% or 15%; see section 7.

## 5. What the score cannot measure

Public evidence cannot show how many of your counterparties a tool really reaches, how fast messages are delivered, how often transfers get stuck, or how the vendor behaves in an incident. The ranking page says so and keeps a "What to test in a pilot" block:
- list your top 20 counterparties by volume and ask the vendor to show a live, current-version connection to each;
- send test messages to one counterparty on each network you need, including a different vendor's customer;
- test one self-hosted wallet proof end to end with a real wallet;
- ask for the data flow: who can read personal data at each hop, and where it is stored.

## 6. Feedback from vendors and how it was used

All vendor input is treated as data to check, never as a rule. Private material (price lists, unpublished papers, planned features) is not used.

| From | Point | Decision |
|---|---|---|
| 21 Analytics (Lucas Betschart) | Network coverage matters most, but networks are not equal: vendor-controlled networks differ from permissioned, non-commercial ones with independent due diligence (such as TRUST) | Reach keeps the largest weight. Network type is shown as a label, not scored, because scoring governance type is a value judgment that would favour one network (and its sole interoperability partner, our sponsor). Independent membership due diligence counts under criterion 2 for any network that documents it |
| 21 Analytics | A network comparison page would mostly repeat self-declared, unverifiable claims and do more harm than good | Agreed: no network size comparison, no network comparison page |
| 21 Analytics | TRP 1.0 endpoints cannot talk to current TRP; "on request" can be claimed for any missing feature | Adopted as general rules in 4.1: current major version only, "on request" counts 0. Notabene's record already shows TRP as outdated (since 2026-11-11) |
| 21 Analytics | Our review called "no access to a deployment" vendor-stated in one place and stated it as fact in another | Fixed in PR #230. For the rubric: criterion 5 rewards "vendor cannot read the data" whether reached by encryption or by self-hosting |
| 21 Analytics | Why support scores 3.8 against Notabene's 4.1 | Published terms differ (Notabene: 24/7 critical cover, 30 minutes; 21 Analytics: 24/5, 3 business days on Essentials, 24 hours on Enterprise). In 1.0 support is one row in criterion 6; uptime SLA counts for hosted products only |
| 21 Analytics | B2B vendors do not publish prices; private price list sent | Private list not used. Pricing weight is the owner's decision (section 7) |
| 21 Analytics | OpenVASP is not a protocol | Already a site rule (2026-11-19), applied in 4.1 |
| 21 Analytics | Unpublished paper on Travel Rule networks | Not used until public |
| VerifyVASP (public blog) | The bottleneck is counterparty due diligence, not interoperability | Supports giving criterion 2 its own weight (15%) |
| Notabene (public consultation response, survey) | Self-hosted wallet rules and interoperability are the main pains | Reflected in J1 and J3 |

## 7. Decisions for the owner

1. **Buyer profile** as in section 1.
2. **Weights** as in section 4. Reach rises from 20% to 30% and pricing falls from 20% to 10%. Both changes help a provider with strong confirmed connections and no public prices (today 21 Analytics). The reasons are independent of any vendor (owner decision of 2026-11-04; FATF and EBA material on interoperability; pricing at 10% is in line with the other rubrics), and the before and after for all 11 providers will be published with the scores. Alternative: pricing at 15%, reach at 25%.
3. **Network type** shown as a label, not scored (section 6).
4. **Disclosure**: the owner has done separate work for a ranked Travel Rule provider (travel-rule.com). Whether to state this on the methodology page or the ranking is the owner's decision; Claude did not use any material from that work.

## 8. Neutrality safeguards

- Criteria and weights are published with a date on `/methodology/` before any provider is scored.
- All 11 providers are scored at once with the same evidence protocol: product pages, documentation, the vendor's own brochures, network operators' and other vendors' pages for confirmations, protocol repositories for versions. Pages behind a login or a form do not count.
- The before and after for every provider is published in the changelog.
- Payment, affiliate, paid-link or sponsored status never enters any criterion; sponsored placements stay labelled as they are.
- Vendors may correct facts with a public source through the corrections process; they cannot change a weight.

## 9. New data fields

`travel_rule{}` per record, each item `{value, url, checked}`: `discovery` (directory, attribution, both, no), `vasp_dd` (yes, partial, no), `network_dd` (per network, documented by the network), `sunrise`, `directory_freshness`, `shw_methods[]`, `shw_automated`, `shw_detection`, `missing_data_detect`, `missing_data_actions`, `ivms101`, `audit_export`, `e2e_or_no_transit`, `data_location_choice`, `retention_controls`, `dpa_public`, `chains_listed`, `critical_response_hours`, `uptime_sla`. Network entries in `networks[]` gain `confirmed_by` (url of the other side's page) and `version` where a protocol is versioned, plus `type` (open protocol, member network, vendor network) for the label. Scorer `scripts/rescore-travel-rule.mjs`, report `reports/rescore-travel-rule-1.0.csv`, `--write` adds `category_scores.travel-rule`.

## 10. Rollout

1. This file, approved by the owner.
2. Methodology section `/methodology/#travel-rule`, `site.json v3.rubricTravelRule`, changelog. Published before any score.
3. Evidence for all 11 providers, dry run, before and after report for the owner.
4. One PR: ranking re-ordered by the Travel Rule score, cards, quick answer and FAQ rewritten from the records (humanizer, invisible-characters, pre-publish check).

## Sources (accessed 25 Nov 2026)

1. EBA, Travel Rule Guidelines (EBA/GL/2024/11), 4 Jul 2024. https://www.eba.europa.eu/sites/default/files/2024-07/6de6e9b9-0ed9-49cd-985d-c0834b5b4356/Travel%20Rule%20Guidelines.pdf
2. FATF, Seventh Targeted Update on VAs/VASPs, 16 Jul 2026. https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-updated-virtualassets-vasps-2026.html
3. Regulation Tomorrow summary of the 2026 update. https://www.regulationtomorrow.com/2026/07/fatf-publishes-targeted-update-on-implementation-of-the-fatf-standards-on-virtual-assets-and-virtual-asset-service-providers/
4. ADAN, CryptoUK and GDF, CASP Travel Rule application: key challenges, Jul 2025. https://www.adan.eu/wp-content/uploads/2025/07/28.7.25_Travel-rule.pdf
5. Notabene, State of Crypto Travel Rule 2025 (vendor research). https://notabene.id/post/state-of-crypto-travel-rule-2025report
6. VerifyVASP, highlights from the EBA Travel Rule Guidelines (vendor blog). https://medium.com/verifyvasp/verifyvasp-highlights-from-ebas-travel-rule-guidelines-b6c592847b55
7. EBA, DORA register of information. https://www.eba.europa.eu/node/16835
8. 21 Analytics correspondence with the owner (Oct to Nov 2026), used only as listed in section 6.
