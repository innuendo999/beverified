# Know Your Agent scoring methodology, KYA 1.0 (2026-11-10)

Status: criteria and weights approved by the owner on 2026-11-10 and published on /methodology/#know-your-agent. No provider has a KYA score yet.

## Owner decisions (2026-11-10)

1. New category "Know Your Agent" (KYA). Order of work: methodology first, then data collection, then scores, then the ranking page.
2. Vouched and Prove appear on the page as "Review coming" (no score, no outbound button) via `tracked.yml` until they have reviews.
3. Menu: Rankings → Identity group, next to Identity Verification, eKYC and Liveness Detection.
4. Weights approved as drafted (owner, 2026-11-10).
5. Standing rule (2026-11-05): a provider gets a separate score in each category it is ranked in, and the category ranking sorts by that score. KYA is the first category built under this rule.

## What the category covers

Know Your Agent is the set of checks a business runs on an AI agent that acts on a customer's behalf: is this session an agent, which agent is it, which verified person or business stands behind it, and what is it allowed to do. It sits on top of KYC and KYB, not instead of them.

In scope: products a business buys to detect, verify, bind, authorise and audit third-party AI agents that reach its site, app or API.

Out of scope (mentioned in the explainer, not ranked):
- Payment network agent programmes (Visa Trusted Agent Protocol, Mastercard Agent Pay) and protocols (AP2, ACP, MCP, A2A, Web Bot Auth). They are standards a KYA product supports, not vendors a compliance buyer signs.
- Workforce identity for a company's own internal agents (Okta, Microsoft Entra Agent ID and similar IAM tools).
- Bot management products with no link to a verified person or business.

## Ranking eligibility

- The KYA product must be launched and sold to customers: generally available, or a beta or pilot open to new customers. Its status is stored with a source and a date.
- A white paper, framework or a launch with a future availability date does not qualify. Such providers are listed under "Also tracked" with their status, and enter the ranking once the product ships.
- The provider has a published BeVerified review (otherwise "Review coming").
- If fewer than 3 providers qualify, the page shows the comparison matrix without rank numbers until the third one qualifies.

## Rules for every criterion

Same as v3.1:
- Sub-score 1 to 5, in steps of 0.5, from the scoring guide below. The same data gives the same sub-score.
- Each sub-score lists the evidence level it rests on (Independent, Vendor-stated, Hands-on).
- No public data for a criterion: "Not publicly disclosed", no sub-score. Its weight is shared out in proportion over the scored criteria, and the page says so.
- KYA score = weighted average, rounded to 0.1. It is stored per category and never replaces the provider's overall score.
- User ratings stay outside the score. Payment, affiliate or sponsored status never enters any criterion.
- A capability counts only when the vendor's own product page, docs or press release states it for the KYA product. A capability of the wider platform (for example AML screening) does not count unless the vendor applies it to agents.

## Criteria and weights

| Criterion | Weight | Buyer question |
|---|---|---|
| Agent detection and recognition | 20% | Can it tell an agent from a person, and name the agent? |
| Human and business binding | 20% | Does every agent lead back to a verified person or company? |
| Delegation and permission control | 20% | Can we limit what an agent does, and stop it? |
| Credentials and interoperability | 10% | Will it work with the protocols agents actually use? |
| Audit and monitoring | 10% | Can we show a regulator or a card network who approved what? |
| Availability, pricing and integration | 10% | Can we buy it now, at what price, and how fast can we go live? |
| Trust and track record | 10% | Can we trust the vendor with identity data? |

### Agent detection and recognition (20%)

One point each, sub-score = points + 1, cap 5:
- detects undeclared agents in web or app sessions from behaviour, device or automation signals;
- verifies declared agents cryptographically (Web Bot Auth / HTTP Message Signatures, Visa TAP, Mastercard Agent Pay) or against an agent registry;
- returns a confidence or trust score with reasons, not only allow or block;
- shares agent reputation across customers or runs a public agent registry.

+0.5 when a detection accuracy figure comes from an independent test (named third party, method published). A vendor's own lab figure stays Vendor-stated and earns nothing.

### Human and business binding (20%)

One point each, sub-score = points + 1, cap 5:
- binds each agent to a verified person;
- binds agents to a verified business through KYB (for business-operated agents);
- steps up to re-verify the person at high-risk actions (payout, account change, over-limit purchase);
- the human check behind the binding has independent evidence: a confirmed iBeta ISO/IEC 30107-3 letter, or a confirmed identity assurance certification (NIST SP 800-63 IAL2 by a third party, UK DIATF, eIDAS). Read from the provider's existing `certifications[]`; nothing is retyped.

### Delegation and permission control (20%)

One point each, sub-score = points + 1, cap 5:
- scoped permissions by action type, set by the business and narrowed by the user;
- value or spend limits and an expiry on each delegation;
- the user or the business can revoke an agent at any time;
- each action is checked against the delegation before it runs, not only at onboarding.

+0.5 when delegation from one agent to another (chaining) is documented with how integrity is kept.

### Credentials and interoperability (10%)

One point each, sub-score = points + 1, cap 5:
- issues a credential in a published format that a relying party can verify, such as a W3C Verifiable Credential or a signed token with a public spec;
- supports at least two named agent protocols (MCP, A2A, AP2, ACP, Visa TAP, Mastercard Agent Pay, Web Bot Auth, OAuth-based delegation);
- supports four or more;
- authored or contributed an open specification adopted by a standards body (DIF, IETF, OpenID Foundation, W3C). Adoption confirmed on the body's own site is Independent.

### Audit and monitoring (10%)

One point each, sub-score = points + 1, cap 5:
- logs every agent action with the principal and the delegation it ran under;
- the log is tamper-evident or cryptographically signed;
- monitors agent behaviour after onboarding and flags anomalies;
- the log can be exported or queried by API for disputes, chargebacks or regulatory reporting.

### Availability, pricing and integration (10%)

| Evidence | Base |
|---|---|
| Generally available | 3 |
| Beta or pilot open to new customers | 2 |
| Announced or framework only | not ranked (see eligibility) |

Then, cap 5: +1 published KYA price or a free tier; +0.5 public developer documentation for the KYA product without login; +0.5 self-serve sandbox, trial, or SDK or middleware for common stacks.

### Trust and track record (10%)

The provider's v3.1 Trust and track record sub-score, used as is (certificates, government trust frameworks, data residency, years operating, incident deductions from `incidents.yml`). Not recalculated for KYA.

## Evidence we expect, and what the score cannot measure

Most KYA evidence today is Vendor-stated: there is no lab test, certification scheme or public benchmark for agent verification yet. The independent signals we can use are standards body adoption, payment network directories and the existing liveness and assurance certificates behind the human check. The page says this plainly next to the scores.

The score cannot measure detection accuracy on your traffic, false blocks of legitimate agents, latency added at checkout, or how a card network treats a dispute that cites the vendor's log. The ranking page carries a "What to test in a proof of concept" block with these points.

The NIST NCCoE concept paper on software and AI agent identity and authorization (5 Feb 2026) and the OpenID Foundation white paper "Identity Management for Agentic AI" (7 Oct 2025) frame the same questions (identification, authentication, authorization, delegation, revocation, audit). Neither is a standard a product can be certified against, and the page will not imply that.

## New data fields

- `kya{}` in the provider record, each item `{status, note, source}` with `status` one of `yes`, `beta`, `planned`, `no`, `not_found`:
  `product_name`, `availability` (+ `availability_date`), `detect_undeclared`, `verify_signed`, `trust_score`, `shared_reputation`, `bind_person`, `bind_business`, `step_up`, `scoped_permissions`, `limits_expiry`, `revocation`, `pre_action_check`, `chaining`, `credential_format`, `protocols[]`, `open_spec`, `audit_log`, `tamper_evident`, `behaviour_monitoring`, `log_export`, `price`, `docs_public`, `self_serve`.
- `category_scores.know-your-agent{ score, breakdown[], methodology: kya-1.0, scored }`, generated by `scripts/rescore.mjs`, never typed by hand. `score` stays the overall v3.1 score.
- `capability_columns` for the category matrix map to the `kya{}` keys.

## How several scores show on a page (proposal, needs owner approval)

- KYA ranking table and cards: the KYA score, labelled "KYA score".
- Review page header: the overall score, unchanged. The "Ranked in" block shows "#N in Know Your Agent, KYA score X" with a link to this methodology section.
- JSON-LD: the review's `reviewRating` stays the overall score (one rating per review). The category `ItemList` carries no rating, as now.
- llms.txt and the homepage keep the overall score.

## Rollout

1. Owner approved the criteria and weights (2026-11-10). Display of several scores per provider still needs owner approval before the ranking page is built.
2. Methodology page: a "Know Your Agent" section with criteria, weights and the date, plus a changelog entry. Published before any score.
3. Collect `kya{}` for the six reviewed candidates (Sumsub, Incode, Persona, Shufti Pro, Socure, Trulioo), sources dated, verification-spec.
4. Script computes KYA scores and writes `reports/rescore-kya-1.0.csv`. Owner reviews; manual overrides only with a written reason.
5. One PR: category data `src/_data/categories/know-your-agent.yml` (URL `/providers/know-your-agent/`), `rankings.yml` entry, Vouched and Prove in `tracked.yml`, menu entry under Rankings → Identity, a glossary term if useful.

## Evidence snapshot, 10 Nov 2026 (for calibration only, not scored)

What each candidate's own pages and launch releases say. "Not stated" means we did not find it, not that the product lacks it.

| Provider | KYA product | Status found | Detection | Binding | Delegation and revocation | Credential and protocols |
|---|---|---|---|---|---|---|
| Sumsub | AI Agent Verification (29 Jan 2026), KYA Module for MCP (19 Oct 2026) | Launched; MCP module starts with Amazon Bedrock AgentCore Gateway | Device intelligence and bot detection | Binds agents to a verified person; liveness on flagged or high-value actions | Rule engine on agent requests; revocation not stated | MCP named; credential format not stated |
| Incode | Agentic Identity (27 Oct 2025, pilots from Q4 2025) | Not stated as GA; design partners named | Behaviour and automation signals, declared agent headers, live-presence check | Verified person (Deepsight, GovFaceMatch); iBeta Level 3 on record | Mandate with scope, amount, duration; instant revocation; checked before each action | PAP, PACT, A2A, MCP, WebMCP, AP2, ACP, Visa TAP, Mastercard, Web Bot Auth, OAuth, W3C credentials; token format not stated |
| Persona | Know Your Agent solution page | Live page; customers named (Lithic, Crossmint) | Agent or human classification | Verified human as trust signal; reverification for high-risk actions | Not stated | Not stated; page did not load for our fetch tool, recheck in a browser |
| Shufti Pro | Know Your Agent (28 Oct 2026) | Live (vendor) | Known agents by name, unknown ones by behavioural biometrics, trust score | Face verification and liveness; iBeta Level 3 on record | Permissions, spend and time limits, expiry, revocation; step-up on high risk | Credential format and protocols not stated |
| Socure | Agent Intelligence (27 Oct 2026) | Detection GA; TrustScore beta; Agent Credential GA planned Q1 2027 | Undeclared agents named, confidence score and reason codes | Binds agents to a verified person or business in Socure's identity graph (credential, Q1 2027) | Chaining and proof of possession in the credential format | W3C Verifiable Credential via SocurePass (Q1 2027) |
| Trulioo | KYA framework and Digital Agent Passport (Aug 2025) | Framework and white paper with PayOS; Worldpay collaboration worded as future | Not stated | Developer KYB, user consent | Ongoing status lookups | Joined Google AP2 (Finovate); token fields not stated |
| Vouched (no review) | KYA suite: Agent Checkpoint (24 Feb 2026), KYA-OS, KnowThat.ai, IdentiClaw | Live; free tier for detection | 1,000+ signals, human / agent / bot classification with confidence | Delegation ties agent to a verified person | Scopes, limits, time bounds, instant revocation, kill switch; Cedar policies | Ed25519-signed W3C VC-JWT; KYA-OS adopted by DIF |
| Prove (no review) | Verified Agent (23 Oct 2025) | Launched; availability dates not stated | Trust registry of agent publishers and relying parties | Prove Identity Graph (phone, national ID, payment credentials) | Session-level authorization limits; co-signed consent log | AP2 at launch |

Early reading for the owner: Trulioo would not qualify under the eligibility rule today (framework, no stated availability), and Socure would qualify on Agent Detection (GA) with its credential scored as `planned`.

## Sources (accessed 10 Nov 2026)

1. Sumsub, "Sumsub's AI Agent Verification Introduces Agent-to-Human Binding", 29 Jan 2026. https://sumsub.com/newsroom/sumsubs-ai-agent-verification-introduces-agent-to-human-binding-to-establish-human-accountability-in-ai/
2. Sumsub, "Sumsub Expands Know Your Agent", 19 Oct 2026. https://sumsub.com/newsroom/sumsub-expands-know-your-agent-putting-businesses-in-control-of-what-ai-agents-can-access
3. Incode, Agentic Identity product page. https://incode.com/products/agentic-identity/
4. Incode, launch press release, 27 Oct 2025. https://secure.businesswire.com/news/home/20251027499877/en/
5. Persona, Know Your Agent solution page. https://withpersona.com/solutions/know-your-agent/
6. Shufti, AI agent verification page. https://shuftipro.com/ai-agent-verification/
7. Shufti, launch press release, 28 Oct 2026. https://shuftipro.com/press-release/shufti-launches-know-your-agent-to-verify-ai-agents/
8. Help Net Security, "Socure links AI agents to verified people and businesses", 27 Oct 2026. https://www.helpnetsecurity.com/2026/10/27/socure-agent-intelligence/
9. Trulioo, "The future of agentic commerce: Know Your Agent (KYA)", 25 Aug 2025. https://www.trulioo.com/blog/trust-and-safety/future-agentic-commerce-know-your-agent-kya
10. Finovate, "Trulioo Joins Google's Agent Payments Protocol (AP2)". https://finovate.com/category/trulioo/
11. Vouched, Know Your Agent page. https://www.vouched.id/know-your-agent
12. Prove, Verified Agent press release, 23 Oct 2025. https://www.businesswire.com/news/home/20251023729694/en
13. NIST NCCoE, concept paper "Accelerating the Adoption of Software and AI Agent Identity and Authorization", 5 Feb 2026. https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd
14. OpenID Foundation, "Identity Management for Agentic AI", 7 Oct 2025. https://openid.net/new-whitepaper-tackles-ai-agent-identity-challenges/
15. IETF, draft-ietf-webbotauth-httpsig-protocol-00. https://datatracker.ietf.org/doc/html/draft-ietf-webbotauth-httpsig-protocol-00
16. Cloudflare, "Securing agentic commerce: helping AI Agents transact with Visa and Mastercard". https://blog.cloudflare.com/secure-agentic-commerce/
