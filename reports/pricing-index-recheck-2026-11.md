# KYC Pricing Index: official price re-check, 2 Nov 2026

Every provider record with a published (official) price figure was re-opened on the vendor's pricing page on 2 Nov 2026. Items confirmed on the page were re-dated `verified: '2026-11'` (and the source `accessed: '2026-11'`); `last_verified` was not moved, because only pricing was re-checked.

| Provider | Page(s) checked | Result |
|---|---|---|
| AU10TIX | au10tix.com/pricing/ | Unchanged ($500 monthly minimum on Basic and Enhanced KYC; per-check price not shown) |
| ComplyAdvantage | complyadvantage.com/pricing/ | Unchanged (Starter from $99 a month, entity tiers, Enterprise POA) |
| ComplyCube | complycube.com/en/pricing/ | Unchanged |
| CryptoSwift | cryptoswift.eu/pricing/ | Unchanged |
| Enigma | enigma.com/pricing, /pricing/rate-card, /solutions/onboarding-and-kyb | Unchanged |
| iDenfy | identity-verification-price, billing docs, /savings/ | **Changed**: AML add-on (+$0.40) no longer shown; item removed. See reports/verification/idenfy.md |
| KYC360 | kyc360.com/ad-hoc-screening, /academy/pricing | Unchanged (kyc360.com platform "quote on request" item not re-checked) |
| KYCAID | kycaid.com/pricing/, kycaid.com | **Changed**: bundles and the fixed €100 monthly fee are gone; new per-check list, no monthly minimum. See reports/verification/kycaid.md |
| NameScan | namescan.io, namescan.io/pricing | Unchanged (pricing page selector did not render figures; homepage figures match) |
| Persona | withpersona.com/pricing | Unchanged |
| Sanction Scanner | sanctionscanner.com/pricing | Unchanged (€990, 100 entities; page does not label the billing period next to the figure) |
| SEON | seon.io/pricing/ | Unchanged |
| Shufti Pro | shuftipro.com/pricing/ | Unchanged |
| Sumsub | sumsub.com/pricing/ | Unchanged. Basic and Compliance items split into per-verification and monthly-minimum items so the index can show them in separate columns (same figures) |
| TRP | travel-rule.com/pricing | **Not re-checked**: the site disallows our fetcher (robots). Record keeps the Oct 2026 check; the index shows "Oct 2026" for TRP |
| Veriff | veriff.com/pricing, /plans/self-serve | Unchanged. Plan items split into per-verification and monthly-minimum items (same figures) |
| Vespia | vespia.io, veriff.com/plans/self-serve | Unchanged (site says "Veriff is acquiring Vespia") |
| Zyphe | zyphe.com/pricing | Unchanged (KYB product page item not re-checked) |

Count from the data on 2 Nov 2026 (`src/_data/pricingIndex.js`): 55 published reviews; 18 with official prices in the index; 8 with third-party figures only (21 Analytics, AML Watcher, AiPrise, IDMERIT, Jumio, Onfido, Trulioo, Veridas); 2 with official figures left out by `pricing.index_exclude` (GBG: Loqate address lookups only; Complead: same plan as Sanction Scanner); 27 with no figure. The brief's 25 Oct count (17 + 5) predates CryptoSwift (added 30 Oct) and the third-party figures added for 21 Analytics, AiPrise and Veridas.
