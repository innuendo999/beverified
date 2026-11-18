# LedgerBrain: review 2026-11-18 (pre-check, second search, full review)

Scheduled task: full Travel Rule review of LedgerBrain (https://ledgerbrain.io/), slug `ledgerbrain`. Suggested by 21 Analytics, a partner ranked in Travel Rule; the suggestion has no influence on any review or score.

**First pass result (superseded by the full review below): stopped before writing a record.** Every public source we could open describes LedgerBrain as wallet and transaction risk screening (KYT, KYA "Know Your Address", KYE) and as a compliance control layer for AI agents. None describes a Travel Rule messaging product: no protocol, network, IVMS101 exchange, counterparty VASP directory or self-hosted wallet proof. A Travel Rule review and a place in the `travel-rule` ranking would rest on no evidence, so neither was created. No record, ranking, `tracked.yml` or category change in this PR.

Not in `src/_data/providers/` under any slug and not in `src/_data/tracked.yml` (checked 18 Nov 2026).

## What could not be read

- ledgerbrain.io homepage: the fetch tool's permission request for this URL timed out in an unattended run, so the page was not read. `ledgerbrain.io/waitlist` loads but renders by script and shows only "Join the Waitlist".
- kyt.ledgerwatch.io (page title "LedgerBrain - Blockchain Intelligence Platform"): blocked by robots.
- GitHub repo `silversixpence-crypto/ledgerbrain-x402-agent-docs`: same permission timeout; read through its Context7 mirror instead.

The owner should open ledgerbrain.io in a browser before any decision: if it shows a Travel Rule product, this check is incomplete.

## Evidence (pages opened 18 Nov 2026)

| Claim | Status | Source |
|---|---|---|
| LedgerBrain is a Sixpence product | Vendor-stated | careldejager.com press kit and bio PDF (Sept 2026); Product Hunt maker "Sixpence" |
| Company: Silver Sixpence (Pty) Ltd, trading as Sixpence, founded in Pretoria, South Africa, in 2020; Carel de Jager founder and CEO | Vendor-stated (founder's press kit); no CIPC register entry opened | careldejager.com/press-kit/ |
| LedgerBrain "runs compliance checks on AI agents" | Vendor-stated | founder bio PDF |
| LedgerBrain gives each AI agent an identity, a mandate and spending limits, screens transactions against sanctions and risk policy, keeps an audit trail | Vendor-stated | careldejager.com |
| Wallet and transaction risk scores, exposure breakdown, entity labels, fund-flow tracing, downloadable reports, API; KYT/KYA/KYE checks | Vendor-stated | Product Hunt listing ("Launched in 2026") |
| Pay-per-call x402 API at api.ledgercore.io: KYA (address), KYT (transaction), KYE (entity) reports, paid in USDC on Base, no API key | Vendor docs | Context7 mirror of the agent docs (README example 1.00 USDC per KYA/KYT call) |
| Price per call $0.10 USDC (captured 402 responses); member since 12 Jun 2026; 48 settlements all-time | Third party | x402-list.com listing (rendered 18 Nov 2026). Conflicts with the 1.00 USDC README example |
| "KYT & Travel Rule" listed once among analytics on the unified API | Vendor-stated, no product detail | ledgercore.io (LedgerCore page, the data engine under LedgerBrain); sixpence.io shows "Travel Rule: N/A" only as a field in a demo mockup |
| Deployment of the Sixpence/LedgerCore platform: on-prem/VPC or managed cloud | Vendor-stated | sixpence.io, ledgercore.io |
| Customers: Nedbank named as an implementation of LedgerCore; Mazars used Sixpence's Merkle tree tool in 2022 proof-of-reserves reports; Coinbase proof-of-reserves grant (2023) | Vendor-stated, not tied to LedgerBrain | ledgercore.io, press kit |
| Certifications (ISO/IEC 27001, SOC 2) | None claimed | sixpence.io, ledgercore.io |
| User ratings | Product Hunt: 1 upvote, no reviews; no G2 or Capterra listing found | Product Hunt |
| Travel Rule protocols (TRP, TRUST, TRISA, GTR, Sygna, OpenVASP, CODE), self-hosted wallet proofs (AOPP, signed message, Satoshi test, visual proof) | Not found on any page | all of the above; web searches for "LedgerBrain" with "travel rule", TRP, TRISA found nothing |

## Suggestions for the owner (not done)

1. **Know Your Agent (KYA) ranking**: the AI-agent control layer (identity, mandate, spending limits, transaction screening, audit trail) matches KYA 1.0 criteria such as delegation and permission control and audit. It would need a `kya{}` data pass and the eligibility check (GA or open beta; the site shows a waitlist, so it may be pre-launch and not eligible).
2. **Travel Rule**: only if ledgerbrain.io itself, opened in a browser, documents a Travel Rule product with named protocols or networks.
3. **Wallet screening / KYT**: no category (owner, 2026-11-17: Know Your Wallet stays a glossary term).
4. Optionally add LedgerBrain to `tracked.yml` once the category is chosen.

Sources:
- https://careldejager.com/ and https://careldejager.com/press-kit/
- https://careldejager.com/press/Carel_de_Jager_Bio_2026-09.pdf
- https://www.producthunt.com/products/ledgerbrain
- https://context7.com/silversixpence-crypto/ledgerbrain-x402-agent-docs
- https://x402-list.com/services/ledgerbrain-x402-kya-kyt-kye-compliance-api
- https://sixpence.io/
- https://ledgercore.io/
- https://ledgerbrain.io/waitlist

## Second search, 18 Nov 2026 (owner asked to search again)

- `ledgerbrain.io/sitemap.xml` lists 156 URLs: product pages `/compliance`, `/know-your-agent`, `/x402`, `/mcp`, `/agentic-payments`, `/live-prices`, `/partners`, `/about`, legal pages dated 5 Nov 2026 and about 135 `/learn/` articles. No page named for Travel Rule.
- `/compliance` has the page title "KYT, Travel Rule & Entity Due Diligence". It is the only place where LedgerBrain itself names Travel Rule. The page body renders by script and our fetcher saw only the title, so what the Travel Rule part does is unknown. Rendering it in Chromium was refused by this session's network policy (403 on `ledgerbrain.io`), so we did not try another route.
- Public API (`api.ledgercore.io/openapi.json`, version 1.0.0, contact "LedgerLink Team", info@ledgerlink.io) has five paid endpoints: KYT report, KYE report, Know Your Agent (KYA) risk report (grade A to E from wallet, transaction, principal, registry, social and marketplace evidence), KYA marketplace trace, and a precious metals price. The x402 catalog prices each compliance report at $0.10 USDC on Base. No Travel Rule, IVMS101, VASP or originator/beneficiary endpoint.
- `/partners` metadata names Silver Sixpence (Pty) Ltd as the publisher. No partner is named.
- `/know-your-agent` metadata: "agent screening", "agent risk reports". It is a risk report on an agent, not a delegation or permission control product; the KYA 1.0 fit is weaker than the first check suggested.

**Conclusion unchanged:** one page title mentions Travel Rule, with no readable product description, protocol, network or wallet proof. That is not enough for a Travel Rule review or a ranking place. The owner can open `ledgerbrain.io/compliance` in a browser; if it names protocols or networks, a review can go ahead.

## Full review, 18 Nov 2026 (after the owner's screenshots)

The owner sent three full-page screenshots of ledgerbrain.io (landing page, homepage with pricing and FAQ, Travel Rule demo workspace). They show a Travel Rule module, so the review went ahead. New record `src/_data/providers/ledgerbrain.yml`, `link.type: none`, categories `travel-rule` only, logo null (owner to supply).

Score **3.1 (Good)**, Travel Rule rubric v3.0 (`site.json` → `v3.rubricTravel`):

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Compliance & certifications | 25 | 3.4 | ISO/IEC 27001 badge only (no certificate, body or scope), no SOC 2, legal pages exist |
| Coverage | 20 | 2.6 | IVMS-101, directory and due diligence, 14 chains; no named protocol or network, no fallback, no self-hosted wallet proof |
| Pricing transparency | 20 | 3.3 | Screening plans and x402 price published; Travel Rule only in quoted Enterprise |
| Integration & API depth | 15 | 3.2 | Public OpenAPI, MCP, x402; no Travel Rule API docs or sandbox |
| Support responsiveness | 10 | 3.0 | Support levels per plan, no hours or SLA |
| Track record | 10 | 3.0 | Sixpence since 2020; LedgerBrain new in 2026, no Travel Rule customer, no reviews |
| **Weighted** | | **3.11, rounds to 3.1** | |

Ranking: **#9 of 10** in `travel-rule`, after WIDTH (3.4) and above Block Infrastructure (3.0), which moves from #9 to #10. It does not rank above any provider with a higher or equal score.

### What the screenshots show (vendor-stated)

- Hero: "Screen deposits and withdrawals, run counterparty due diligence, and exchange IVMS-101 Travel Rule messages", "built for VASPs and banks", "No sales call required".
- Homepage: Travel Rule card "Screen counterparties. Control message release. Keep the evidence."; release review with institution screening, sanctions and PEP, destination wallet risk, "Release approved", IVMS-101, PDF audit record; counterparty labelled "Verified Envoy node".
- Demo workspace (`/travel-rule`): Inbox, Needs review, Sent, Awaiting response, Completed, Rejected, Expired, Directory, Due diligence, Release reviews; transfers marked "Hosted/direct"; sender and receiver fields (name, customer ID, address, wallet address).
- Supported networks: 14 blockchains (Bitcoin, Ethereum, XRP, Avalanche, Arbitrum, Optimism, Tron, Polygon, BNB Chain, Solana, Cardano, Base, Litecoin, Dogecoin, Bitcoin Cash), not Travel Rule networks.
- Pricing: Basic $115/month (500 credits), Standard $230 (1,250), Compliance $460 (3,000), annual 20% less; Travel Rule listed only under Enterprise (custom pricing).
- Footer: ISO 27001 "Certified" badge, no certificate link.
- FAQ "How does Travel Rule compliance work on the platform?" is collapsed; its answer was not read.

### Ranking card (`travel-rule`)

Added at #9, `award: null` (proposed "Best for Screening-First Teams"), `legacy_price_shown: Enterprise plan, on request`.

### Other changes

- `src/_data/travelRuleFit.yml`: deployment reading for `ledgerbrain` (hosted, no self-hosted option found).
- `src/_data/categories/travel-rule.yml`: SEO description lists LedgerBrain; quick answer count 9 → 10. No capability matrix on the page (`capability_columns: []`).
- `tracked.yml`: LedgerBrain was not listed.

### Score flag

Coverage moves most: if the collapsed FAQ or a sales answer names TRISA (Envoy), TRP or another network, and that network confirms it, Coverage could rise to about 3.3 to 3.5 and the score to about 3.2 to 3.3. A published ISO/IEC 27001 certificate would raise Compliance.
