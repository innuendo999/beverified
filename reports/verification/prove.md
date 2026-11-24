# Prove: new review, 2026-11-24

New record `src/_data/providers/prove.yml` (was "Review coming" in `tracked.yml` and on the Know Your Agent ranking). Desk research on prove.com, the developer portal and launch releases, checked 24 Nov 2026.

## Score

v3.1, identity family (`node scripts/rescore.mjs prove`): **2.4 (Fair)**.

| Criterion | Weight | Sub-score | Why |
|---|---|---|---|
| Fraud defense | 25 | 1.5 | no liveness product today |
| Pricing and total cost | 20 | 2 | no published price |
| Coverage | 15 | 3.5 | 200+ countries and regions (vendor), no document checks |
| Platform breadth | 15 | 3 | identity verification, KYB (add-on), PEP and sanctions, reusable ID |
| Integration | 15 | 3 | web, iOS and Android SDKs, free sandbox; docs mostly behind portal login |
| Trust | 10 | 2 | no certificate found, operating since 2008 |

Score flag for the owner: the v3.1 identity rubric gives no credit for phone possession or identity-graph checks, which are Prove's core. That is the rubric as approved; the review says plainly what Prove does and does not do.

## Rankings

- **Identity Verification (IDV 1.0):** not scored. With no liveness and no document checks it would sit far below #10 (top 10 only).
- **Know Your Agent:** `kya{}` collected; KYA 1.0 would give **2.4** (90% of weight scored). **Not eligible today** in this PR: `kya.availability = announced`. The Oct 2025 release says "launch", but the Agentic Suite page words most items as "designed to", calls Agent Wallet exploratory, asks buyers to contact sales about availability and names no customer. **Owner decision 2026-11-24: not ranked for now.** If the owner treats it as GA, set `availability.status: ga` and run `node scripts/rescore-kya.mjs --write prove`; its KYA score would be 2.5, which places it 4th, above Persona (2.3) and Socure (2.1).
- The "Review coming" Prove card was removed from the KYA ranking; the explainer now says why Prove is not ranked, and the quick answer says 6 providers compared (5 scored).

## Facts used (vendor-stated unless noted)

- Founded 2008 as Payfone; renamed Prove July 2020 with a $100M investment and the Early Warning mobile authentication acquisition; acquired Portabl Jan 2025.
- Products: Pre-Fill, Prove Identity (PEP and sanctions screening), Account Opening, Unified Authentication, Verified User, Pre-Fill for Business (entity and EIN/TIN checks), Human Assurance, Agentic Suite / Verified Agent.
- SDKs for web, iOS and Android; free developer portal and sandbox with a company email (Sept 2024 blog).
- Biometrics (liveness, document verification) announced 2 June 2026 as in development with design partners, GA planned later in 2026; no product page or lab letter found on 24 Nov 2026. `capabilities.liveness = no` with that note.
- No pricing published.

## Removed / not used

- Third-party security profile listing SOC 2, ISO 27001, PCI, FedRAMP (no sources).
- CB Insights funding total ($261.3M) and Series I.
- Conflicting customer counts (1,500+ in Oct 2025, 2,500+ in a June 2026 footer): homepage 2,000+ used.

## Still open

- Logo and wordmark: added from the owner's images on 2026-11-24.
- KYA: re-check availability at the next review.
- Re-check biometrics at the next review: a launched liveness product with a lab letter would move Fraud defense.
