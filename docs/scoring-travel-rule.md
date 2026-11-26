# Travel Rule scoring methodology, Travel Rule 1.0 (2026-11-25)

Status: **approved by the owner on 2026-11-25**: buyer profile, criteria and weights as below, pricing at 10%, network type shown as a label without points. Revised the same day after a critique the owner approved (open-protocol confirmation, own-network list, IVMS101 as eligibility, country rules, incident deduction on the total, wallet proof weighting, eligibility and score scale, self-hosted scaling in 4.6, pricing always scored). Shared draft: Google Doc "BeVerified Travel Rule Methodology 1.0 (draft for comment, v2)", comments to support@beverified.org by 2 Dec 2026. No provider has a Travel Rule 1.0 score yet; the methodology section is published before any score.

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

## 4. Eligibility, criteria, weights and score

**Eligibility.** A published BeVerified review, and a generally available product that sends and receives Travel Rule messages using the IVMS101 data standard. A provider that fails is left out, not scored low. (IVMS101 moved here from a scored row: every candidate has it, so as points it would only add the same score to all.)

| # | Criterion | Weight |
|---|---|---|
| 1 | Counterparty reach | 30% |
| 2 | Counterparty identification and due diligence | 15% |
| 3 | Self-hosted wallet verification | 10% |
| 4 | Country rules, missing data and audit trail | 10% |
| 5 | Data protection in transit and at rest | 10% |
| 6 | Integration and support | 10% |
| 7 | Vendor security assurance | 5% |
| 8 | Pricing transparency | 10% |

Sub-score = 1 + points, in steps of 0.5, cap 5. A feature with no public evidence earns no points, and no weight moves, for every criterion including pricing. Each evidence item counts in one criterion only.

**Travel Rule score** = weighted average of the eight sub-scores, rounded to 0.1, minus 0.3 for each regulatory action, disclosed breach or security incident in the last 24 months (`incidents.yml`, `counted: false` excluded), floor 1. Grades: Excellent 4.5+, Great 4.0 to 4.4, Very Good 3.5 to 3.9, Good 3.0 to 3.4, Fair below 3.0. Stored in `category_scores.travel-rule`.

### 4.1 Counterparty reach (30%)

| Connection | Points |
|---|---|
| Live and confirmed by the other side | 1 |
| Live, stated only by the provider | 0.5 |
| Bridge built on someone else's software | 0.5 |
| Works only through the customer's own membership, or inbound only | 0.25 |
| Provider's own network with a published list of participants by name | 1 |
| Provider's own network without such a list | 0.5 |
| Old major version only, "on request", planned, pending, historical | 0 |
| Reach for counterparties without a tool (secure email or web form) | 0.5, once |

Points summed, cap 4. "Confirmed by the other side" = the network operator lists the connection; or the protocol lists the provider as an implementer; or another implementer of the protocol has published a working connection with the provider. This lets connections to open protocols (no operator) be confirmed as well as connections to operated networks. A protocol counts only in its current major version or a version its own documentation calls compatible, checked against its repository or site. "On request" and "coming soon" score 0 until documented as available. OpenVASP is not counted as a protocol; TRP is. Network size is never scored; network type is a label only.

### 4.2 Counterparty identification and due diligence (15%)

| Evidence | Points |
|---|---|
| Tells whether an address belongs to a VASP and which one (directory, attribution or both) | 1 |
| Due diligence data on the counterparty: licence status, questionnaire or sanctions check | 1 |
| Live connection (0.5 points or more in 4.1) to a network that checks members before they join, documented by the network | 1 |
| Documented handling of counterparties where the rule is not yet in force | 0.5 |
| Stated update frequency of counterparty records | 0.5 |

### 4.3 Self-hosted wallet verification (10%)

| Evidence | Points |
|---|---|
| Each method that can be checked cryptographically or on-chain: signed message, micro-transaction, AOPP or another wallet protocol | 1 each |
| Screenshot or video | 0.5 |
| Proof methods together, at most | 3 |
| Flags an address as self-hosted | 0.5 |
| Stores the proof with the transfer record | 0.5 |

### 4.4 Country rules, missing data and audit trail (10%)

| Evidence | Points |
|---|---|
| Applies each country's thresholds and data requirements automatically | 1 |
| Detects missing or incomplete data before the transfer is credited | 1 |
| Configurable decision on missing data: execute, reject, return or suspend | 1 |
| Log of every message and decision, with export | 1 |

### 4.5 Data protection in transit and at rest (10%)

| Evidence | Points |
|---|---|
| Vendor cannot read personal data in transit (end-to-end encryption, or data never passes through the vendor) | 1.5 |
| Customer chooses the storage region, or data stays on the customer's infrastructure | 1 |
| Retention and deletion settings documented | 0.5 |
| Data processing terms or GDPR statement published | 0.5 |

A self-hosted product earns the first two rows by design; a hosted product can earn them with end-to-end encryption and a region choice. The spec and the public text say this openly.

### 4.6 Integration and support (10%)

| Evidence | Points |
|---|---|
| API documentation without login | 1 |
| Self-serve sandbox 1; on request 0.5 | 1 |
| Published list of supported blockchains or assets | 0.5 |
| Published critical-incident response time: 24 hours or faster 1; slower 0.5 | 1 |
| Published uptime commitment, hosted products only | 0.5 |

Self-hosted products: the uptime row is left out and the other points are scaled by 4 / 3.5, so both can reach the same maximum.

### 4.7 Vendor security assurance (5%)

| Evidence | Points |
|---|---|
| ISO/IEC 27001 or SOC 2 Type II confirmed (certificate number and issuing body, or report) | 2 |
| A second one, also confirmed | 1 |
| Public security page describing encryption and access controls | 1 |
| Vendor-stated certificate we could not confirm | 0.5 |

Incidents are deducted from the total score (above), not only here, so they carry real weight.

### 4.8 Pricing transparency (10%)

Published per message or per month 5; with a minimum spend or annual plan 4; some modules priced 3; price only on request, or only a dated third-party price 2. Always scored: if the criterion dropped out when nothing is published, a vendor hiding its prices would beat one whose price leaked to a marketplace. (Differs from v3.1, where "nothing anywhere" shared the weight out.)

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

## 7. Owner decisions (2026-11-25)

1. **Buyer profile** as in section 1.
2. **Weights** as in section 4. Reach rises from 20% to 30% and pricing falls from 20% to 10%. Both changes help a provider with strong confirmed connections and no public prices (today 21 Analytics). The reasons are independent of any vendor (owner decision of 2026-11-04; FATF and EBA material on interoperability; pricing at 10% is in line with the other rubrics), and the before and after for all 11 providers will be published with the scores. Owner chose pricing at 10% over the alternative of 15% with reach at 25%.
3. **Network type** shown as a label, not scored (section 6). Approved.

## 8. Neutrality safeguards

- Criteria and weights are published with a date on `/methodology/` before any provider is scored.
- All 11 providers are scored at once with the same evidence protocol: product pages, documentation, the vendor's own brochures, network operators' and other vendors' pages for confirmations, protocol repositories for versions. Pages behind a login or a form do not count.
- The before and after for every provider is published in the changelog.
- Payment, affiliate, paid-link or sponsored status never enters any criterion; sponsored placements stay labelled as they are.
- Vendors may correct facts with a public source through the corrections process; they cannot change a weight.

## 9. New data fields

`travel_rule{}` per record, each item `{value, url, checked}`: `discovery` (directory, attribution, both, no), `vasp_dd` (yes, partial, no), `network_dd` (per network, documented by the network), `sunrise`, `directory_freshness`, `shw_methods[]`, `shw_automated`, `shw_detection`, `country_rules`, `missing_data_detect`, `missing_data_actions`, `ivms101` (eligibility), `audit_export`, `shw_proof_stored`, `security_page`, `e2e_or_no_transit`, `data_location_choice`, `retention_controls`, `dpa_public`, `chains_listed`, `critical_response_hours`, `uptime_sla`. Network entries in `networks[]` gain `confirmed_by` (url of the other side's page) and `version` where a protocol is versioned, plus `type` (open protocol, member network, vendor network) for the label. Scorer `scripts/rescore-travel-rule.mjs`, report `reports/rescore-travel-rule-1.0.csv`, `--write` adds `category_scores.travel-rule`.

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
