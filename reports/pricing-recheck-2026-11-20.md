# Pricing re-check, 20 November 2026

Every official pricing page cited in a provider record was opened again before calculator PR 3 (pricing pages in the watcher). Figures were compared with `pricing.items` and `budget{}`.

## Calculator providers (budget{} figures): all unchanged, `budget.checked` set to 2026-11-20

| Provider | Page | Result |
|---|---|---|
| ComplyCube | complycube.com/en/pricing | Starter $99 / Core $299 credited against checks; document $1.05 / $0.75, liveness $0.35 / $0.20, AML $0.50 / $0.35, extensive $1.05 / $0.85, monitoring $0.03 a month on Core. Unchanged |
| Didit | didit.me/pricing | Full KYC $0.33 and every module price unchanged; Free $10 credit, Growth $99 ($115 credit, 4% off), Scale $299 ($350 credit, 10% off), no minimums. Unchanged |
| iDenfy | idenfy.com/identity-verification-price, docs, /savings | Basic $1.35 / $135, Premium $1.30 / $325, enterprise from $0.55, trial 14 days or 10 checks; approved-only +$0.50, 24/7 review $0.35 to $0.55. Unchanged |
| KYCAID | kycaid.com/pricing | All per-check prices, €100 monitoring add-on, €50 credit, enterprise from 10,000 a month, VAT excluded. Unchanged |
| Shufti Pro | shuftipro.com/pricing | Free Forever 10 a month, Essentials from $1.50 up to 20,000, Enterprise custom. Unchanged |
| Socure | socure.com/pricing | DocV $0.80, + Watchlist $0.90, bundles $1.00 and $1.30, $1,000 monthly credit. Unchanged |
| Sumsub | sumsub.com/pricing | Basic $1.35 / $149, Compliance $1.85 / $299, 14-day trial with 50 checks, successful checks only. Unchanged |
| Veriff | veriff.com/pricing, /plans/self-serve | Essential $0.80 / $49, Plus $1.39 / $99, Premium $1.89 / $209; add-ons +$0.64, +$0.09, +$0.30, +$0.30; Enterprise above 5,000 a month; 15-day trial, 50 live checks. Unchanged |
| Zyphe | zyphe.com/pricing | Every price unchanged ($0.30 ID and liveness, $0.20 AML, $0.05 monitoring a year, agents). Unchanged |

## Other published prices

| Provider | Result |
|---|---|
| AU10TIX | $500 monthly minimum on Basic and Enhanced KYC, no per-check price. Unchanged |
| Blockpass | All four plans, KYC, AML, wallet, crypto AML and KYB prices unchanged. Page also lists proof of address and Advanced KYC Bot prices (not in the record; not needed) |
| ComplyAdvantage | From $99 a month, entity tiers 100 to 2,000, enterprise POA, ComplyLaunch. Unchanged |
| CryptoSwift | Essentials €600 / €750, Professional €1,200 / €1,500, credits and credit costs. Unchanged |
| Enigma | Plans, credit price, rate card, bundles, trial end. Unchanged |
| GBG (Loqate) | 8.8p to 5.0p a lookup, excluding VAT. Unchanged |
| KYC360 | Screening credit packages unchanged. **Academy changed**: from £3,000 a year for 100 learners (was £3,500 for 25 users). Record updated |
| NameScan | $2.00 (100 scans), $1.40 (1,000), Emerald from $1.40, Sapphire from $1.70; no contract or minimum. Unchanged (figures on namescan.io; the pricing page uses a script selector) |
| Notabene | SafeTransact-Rise free, $10,000 a month sending, paid plan by demo. Unchanged |
| Persona | Essential from $250 a month, 12-month term; pay per successful verification. Unchanged |
| Sanction Scanner / Complead | €990 a month for 100 entities, two months free yearly. Unchanged |
| SEON | Starter $699 a month, 2,500 checks, 10 users, 50 rules. Unchanged |
| Vespia | Starter €99, KYB from €35, 7-day trial. Unchanged |
| WIDTH | Growth $1,499 a year, Pro $2,499 a year, $0.50 full KYC until 31 Dec 2026. Unchanged |
| LedgerBrain | x402 catalog $0.10 a report unchanged. **Plan prices not re-checked**: ledgerbrain.io renders by script, and the built-in browser blocks the site. Not in the Pricing Index table (index_exclude) |
| TRP | **Not re-checked**: travel-rule.com refused the fetcher again (robots.txt unreachable). Row keeps the October 2026 check |

## Providers without published prices

Pricing pages re-opened for 21analytics, ADVANCE.AI, AML Watcher, Castellum.AI, KYC Hub, MemberCheck, Ospree, Signicat, SmartSearch and Trulioo: still no prices. Veridas returned a client error.

- **Complead**: complead.ai now offers a 7-day free trial, no credit card. Free trial item updated. `pricing.model.trial` stays false (it describes the Sanction Scanner page). No score change.
- **SmartSearch**: tiers renamed Basic, Standard and Enhanced (were Starter, Growth and Enterprise Compliance); ongoing monitoring no longer tied to a tier. Tiers, items and FAQ updated. No score change.

## Open question for the owner

Didit's Scale plan ($299 a month with $350 of credit and 10% off) is cheaper than pay-as-you-go from roughly 900 full checks a month, but the calculator counts only the list price, as decided on 17 Nov (subscription credit not counted). Keep, or model Growth and Scale as plans?

`last_verified` not changed on any record: this was a pricing re-check, not a full fact re-check.
