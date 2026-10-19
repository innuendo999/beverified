# TRP (travel-rule.com): vendor review, 2026-10-19

Record: `src/_data/providers/trp.yml` (rewritten). Validator: `node scripts/checks/provider.mjs trp` reports 2 issues, both expected: `name` (TRP (Travel Rule Protocol) to TRP) and `score` (3.9 to 3.7) differ from the protocol draft at HEAD. No other issues.

## Correction

The earlier draft on this slug reviewed the open Travel Rule Protocol (OpenVASP Association) by mistake. `link.url` https://travel-rule.com belongs to a commercial vendor branded "TRP", so the record now reviews that vendor. The open protocol is mentioned once, as a naming note: same name and version number (3.2.1), different thing (free peer-to-peer spec over mutual TLS vs proprietary hosted hub with API keys).

## What the review is based on

- travel-rule.com homepage and /pricing: browser screenshots supplied by the editor on 2026-10-19 (our fetcher is robots-blocked). Vendor-stated. Pricing: €2,000 one-time initial deposit used as operating balance; €0.02 per self-hosted message; €0.05 per database screening; included API credentials, onboarding, 24/7 support, compliance guidance; ex VAT; minimum monthly commitment applies. Homepage: 348+ VASPs, 29 jurisdictions, 29+ member VASPs, €2,000 first-year unlimited plan for the first 100 clients, MiCA/FinCEN/FCA/BaFin "and over 40 other regulators". Footer: "© 2026 TRP", Jurisdiction Germany, "Verified entity, Last verified: 25.05.2026" badge (issuer not shown).
- docs.travel-rule.com and Verisign RDAP, via `reports/verification/trp-vendor-research.md`: publisher "KYCAID TRP Team", licence "Proprietary"; central API with IVMS101, Travel Addresses, TRP registry, email self-attestation fallback, Satoshi Test on BTC/ETH/TRC-20, HMAC-signed callbacks; no other networks; no sandbox; domain created 2025-02-07.
- Disclosure added (what_is paragraph and first FAQ): docs name the KYCAID TRP Team; KYCAID has a paid link arrangement with BeVerified; same rubric applies. `link.type` stays `none`.

## Open items

- Contracting legal entity, address, company number (none visible; Germany jurisdiction does not match the UK KYCAID companies).
- Protocol message price (not legible in the screenshot; not stated).
- Minimum monthly commitment amount.
- Whether the €2,000 first-year offer and the €2,000 deposit are the same payment.
- Interoperability with TRISA, TRUST, GTR, Sygna or standard OpenVASP TRP endpoints (none documented).
- Who issues the "Verified entity" badge.
- Certifications and their scope (none stated; KYCAID's claims not carried over).
- Whether the KYCAID paid link arrangement covers TRP.
- Vendor counts (348+ VASPs, 29 jurisdictions, 40+ regulators) unverified and partly inconsistent.

## Score

3.7 (Good). Compliance & certifications 3.3 (25%), Coverage 3.5 (20%), Pricing transparency 4.4 (20%), Integration & API depth 4.0 (15%), Support 3.5 (10%), Track record 3.2 (10%) = 3.675.

Against 21 Analytics (4.0): TRP is clearly ahead on pricing transparency, but behind on compliance (no entity, no certifications), coverage (own registry only, no TRUST), integration (no sandbox, no changelog) and track record (about 20 months, no named company).

## Ranking card (`src/_data/rankings.yml`, `travel-rule`, not edited)

The current `slug: trp` entry still describes the open protocol (name, award "Best Open Protocol", tagline, pros, cons, "Free (open protocol)"). Replace with:

```yaml
  - slug: trp
    name: TRP
    award: Best Published Travel Rule Pricing
    tagline: Hosted Travel Rule API with published per-message pricing, its own VASP registry and an email fallback for self-hosted wallets.
    coverage: Global (vendor-stated)
    size: Small to mid-sized VASPs
    pros:
    - Published pricing, from a €2,000 deposit that becomes your message balance
    - Public API docs covering IVMS101, Travel Addresses, a VASP registry and signed callbacks
    - Self-hosted wallet checks by email self-attestation or Satoshi Test on BTC, ETH and TRON
    cons:
    - No legal entity named and no certifications stated; docs name only the KYCAID TRP Team
    - Called interoperable, but no connection to TRISA, TRUST, GTR or Sygna is documented
    - Launched in 2025, shares its name with the open OpenVASP protocol, minimum commitment not disclosed
    legacy_price_shown: €2,000 deposit + per message
    legacy_rating_shown: null
    segments: []
```

Award: "Best Published Travel Rule Pricing" is accurate (only reviewed Travel Rule entry with prices on its own page; 21 Analytics publishes none).

Position: 2nd, after 21 Analytics (4.0) and before the unreviewed Notabene, Sygna Bridge and VerifyVASP. Same slot as now, so no move, only the card content.

## Other site copy to recheck (not edited)

- Only `rankings.yml` references `slug: trp`; no other source links to `/providers/trp/`. Mentions of TRP as a protocol supported by 21 Analytics, Sumsub or Notabene mean the open protocol and must not be linked to this review in future.
- `src/_data/categories/travel-rule.yml` quick answer: check it does not describe a TRP review as the open protocol once the card is swapped.

## Score flag

None beyond the rewrite itself: score moves from 3.9 (protocol draft) to 3.7 (vendor).
