# Nigeria ranking: NIN and BVN evidence check, 17 Nov 2026

Rule (owner, 2026-11-17): a provider is scored in `/providers/nigeria/` only if its own documentation or website describes a NIN or BVN check against a government database. Nigeria has no public register of certified verification services (unlike the UK DVS register), so all evidence below is vendor-stated. Plain support for Nigerian documents is not enough.

Unreviewed Nigerian vendors with documented NIN/BVN checks are listed without a score as "Review coming" (owner, 2026-11-17).

## Qualify (reviewed providers)

| Provider | Evidence | Source (checked 17 Nov 2026) |
|---|---|---|
| Shufti Pro | NIN verification "against NIMC records"; BVN described as the primary eIDV mechanism; CAC registry checks; screening against CBN watchlists and NFIU lists. Nigerian data residency: South Africa cloud regions or on-premise | https://shuftipro.com/supported-countries/nigeria/ |
| Sumsub | Non-doc products `nga_gov_nin` (government source, 96% coverage), `nga_gov_nin_slip`, `nga_gov_nin_phone`, `nga_gov_bvn` (government source, 92%), each with selfie match. Non-doc sits in the custom plan (record) | https://docs.sumsub.com/docs/supported-countries-for-non-doc-identity-verification |
| KYCAID | `POST /services/ng/nin` queries "the official national database" with an 11-digit NIN and returns registered details. NIMC not named as the source; no BVN | https://docs.kycaid.com/non-doc/nigeria |
| AiPrise | One-click KYC with BVN + selfie and NIN + selfie; government checks for BVN, NIN and voter ID number. NIMC/NIBSS not named | https://docs.aiprise.com/docs/one-click-kyc-coverage, https://docs.aiprise.com/docs/gov-checks |
| Signzy | Nigeria NIN Verification API checks NIN and personal details "against the official database managed by the National Identity Management Commission (NIMC)". No separate BVN API documented (the page has leftover BVN references) | https://docs.signzy.com/us-apis/nigeria-nin-verification |

## Do not qualify (reviewed providers)

| Provider | Finding |
|---|---|
| GBG | GBG GO docs list a Nigerian NIN digital ID, status "Coming soon!" (https://docs.go.gbgplc.com/docs/go-v1/digital-id-portal/supported-digital-ids/nigerian-nin.md) |
| Incode | eKYC reference lists NG MONO BVN and NG MONO NIN, but the developer hub page says documentation for these sources is forthcoming (https://devhub.omnihub.incode.com/general-reference/ekyc-reference-nigeria.md). Recheck when published |
| Trulioo | Only a December 2019 launch release for Nigeria found; no current page describing NIN/BVN checks |
| Veriff, Persona, ComplyCube, iDenfy, Onfido | No documented NIN or BVN database check found |

## Review coming (not reviewed, no score)

| Vendor | Evidence |
|---|---|
| Smile ID | Checks against 9 Nigerian government ID databases, up to 132M+ ID records; up to 5 ID numbers incl. NIN, BVN, phone, voter's ID (https://usesmileid.com/countries/nigeria, now redirects to smile.id) |
| Youverify | States direct NIBSS (BVN) and NIMC (NIN) integrations; 100+ African government ID types with liveness (https://youverify.co/en/blogs/youverify-vs-sumsub-african-banks) |
| Dojah | Government lookups for NIN, BVN, phone, driver's licence, voter ID; BVN/NIN with selfie; dashboard lookups; African countries only (https://docs.dojah.io/overview/identity-hub/government-lookup.md, https://docs.dojah.io/api-reference/individual-verification/nigeria/bvn-nin-selfie.md) |

Pricing pages for Dojah and Youverify were not checked (fetch not completed in this session).

## Regulatory facts used on the page

- CBN circular PSM/DIR/PUB/CIR/001/053, 1 Dec 2023: no new Tier 1 accounts/wallets without BVN or NIN; onboarding starts by electronically retrieving BVN/NIN data from NIBSS/NIMC; Tier 2 and 3 need both; funded accounts without them on Post No Debit or Credit from 1 Mar 2024 (circular text via regalert.today; TheCable, BusinessDay reports).
- CBN Baseline Standards for Automated AML Solutions, circular BSD/DIR/PUB/LAB/019/002, issued 10 Mar 2026: roadmaps within 3 months; full compliance 10 Sep 2027 (deposit money banks), 10 Mar 2028 (other financial institutions) (regalert.today circular text; Templars, DLA Piper Africa).
- FATF: Nigeria under increased monitoring from Feb 2023, removed 24 Oct 2025 (FATF increased monitoring Oct 2025 page; State House press release 24 Oct 2025).
- Money Laundering (Prevention and Prohibition) Act 2022 repealed the 2011 Act; SCUML (within the EFCC) supervises DNFBPs (PwC Nigeria, July 2022; Mondaq).
- Nigeria Data Protection Act 2023, Nigeria Data Protection Commission.
