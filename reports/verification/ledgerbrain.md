# LedgerBrain: pre-review check 2026-11-18 (review not built)

Scheduled task: full Travel Rule review of LedgerBrain (https://ledgerbrain.io/), slug `ledgerbrain`. Suggested by 21 Analytics, a partner ranked in Travel Rule; the suggestion has no influence on any review or score.

**Result: stopped before writing a record.** Every public source we could open describes LedgerBrain as wallet and transaction risk screening (KYT, KYA "Know Your Address", KYE) and as a compliance control layer for AI agents. None describes a Travel Rule messaging product: no protocol, network, IVMS101 exchange, counterparty VASP directory or self-hosted wallet proof. A Travel Rule review and a place in the `travel-rule` ranking would rest on no evidence, so neither was created. No record, ranking, `tracked.yml` or category change in this PR.

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
