# TRP (travel-rule.com): commercial vendor research, 2026-10-19

Scope: who operates the commercial Travel Rule service at https://travel-rule.com/ (brand "TRP"), what it offers, pricing, certifications, red flags. This is not the OpenVASP Travel Rule Protocol, which is covered in `reports/verification/trp.md` and `src/_data/providers/trp.yml`.

Access notes:
- travel-rule.com (apex, incl. /blog) was not opened. It is robots-disallowed for our fetcher, as the editor said. No bypass tried (no Wayback, no cache copies).
- Opened: docs.travel-rule.com, which is fetchable and is the main source below. app.travel-rule.com also opened, but it is a login shell only. trp.travel-rule.com/identity returned a client error.
- Our sandbox `curl` is blocked by the egress proxy for all *.travel-rule.com hosts. Every fetch went through WebFetch.

Source types: **vendor docs** = vendor's own documentation; **registry** = official public register; **search index** = title or snippet in search results only; **third party** = independent site; **competitor/peer** = another Travel Rule vendor or body.

## 1. Who operates travel-rule.com

| Fact | Source | Type |
|---|---|---|
| The API docs name the publisher as **"KYCAID TRP Team"**, contact **support@travel-rule.com**, licence **"Proprietary"** | https://docs.travel-rule.com/openapi | vendor docs (OpenAPI info block) |
| The example `/identity` response uses `"name": "KYCAID TRP"` | https://docs.travel-rule.com/openapi/identity | vendor docs |
| Callbacks guide: "The KYCAID TRP backend retries failed callbacks at: ..." | https://docs.travel-rule.com/pages/callbacks | vendor docs |
| The docs link to travel-rule.com/blog and app.travel-rule.com (the "TRP Dashboard"), so docs and marketing site belong to one property | https://docs.travel-rule.com/ ; https://app.travel-rule.com/ | vendor docs |
| KYCAID LIMITED, UK company no. 11670407, incorporated 9 Nov 2018. Directors: Mykola Mashkovskyi (since 9 Nov 2018) and Ievgen Borysenko (since 21 Sep 2022), both Ukrainian, resident in Ukraine | https://find-and-update.company-information.service.gov.uk/company/11670407/officers | registry (Companies House) |
| KYCAID's privacy policy names Compligate Ltd as the operator of kycaid.com: UK company no. 15376538, incorporated 29 Dec 2023, active, registered office 85 Great Portland Street, London W1W 7LT, SIC 58290 / 62012 / 70229 | https://kycaid.com/privacy-policy/ (from the existing KYCAID record); https://find-and-update.company-information.service.gov.uk/company/15376538 | vendor policy + registry |
| Domain travel-rule.com: created 2025-02-07, last changed 2025-10-24, expires 2028-02-07. Registrar GoDaddy.com, LLC; Cloudflare nameservers; registrar lock statuses set | https://rdap.verisign.com/com/v1/domain/travel-rule.com | registry (Verisign RDAP) |
| Search engines index travel-rule.com with the page title "TRP - Crypto Travel Rule Compliance Solution for VASPs" | WebSearch result for https://travel-rule.com/ | search index |

**Conclusion (inference, not confirmed by the vendor):** travel-rule.com looks like a KYCAID product. The KYCAID team is named as the publisher in three separate places in the docs. But we found no page that links the two the other way. kycaid.com (homepage, pricing page, two Travel Rule blog posts, FATF Travel Rule tag page) does not mention TRP or travel-rule.com. One KYCAID blog post says only "KYCAID offers comprehensive solutions for FATF Travel Rule compliance" (https://kycaid.com/blog/unraveling-fatfs-travel-regulation-an-in-depth-compliance-handbook-2024/, vendor blog, undated).

**Unknown:**
- Which legal entity contracts for TRP: KYCAID Limited, Compligate Ltd, or another company. No terms, imprint or legal name on any page we could open.
- Registrant name and country of the domain: RDAP does not show a registrant (redacted or absent). Whoxy needs a captcha.
- Leadership specific to TRP, launch date, and whether TRP is a separate company.
- Funding. No Crunchbase, PitchBook, CB Insights or LinkedIn company entry found for "TRP" / travel-rule.com. LinkedIn is robots-blocked for our fetcher. The CB Insights hits for "Travel Rule" are TRISA, not this vendor.
- No UK company with "travel rule" in its name showed up on the first page of a Companies House name search (https://find-and-update.company-information.service.gov.uk/search/companies?q=travel+rule). That search is not exhaustive.

## 2. Products (from docs.travel-rule.com only)

| Fact | Source | Type |
|---|---|---|
| "Public TRP API for VASP-to-VASP Travel Rule data exchange." API title "Travel Rule Protocol (TRP) API", **version 3.2.1** | https://docs.travel-rule.com/openapi | vendor docs |
| Production host https://trp.travel-rule.com/ (a localhost:3000 server is also listed) | https://docs.travel-rule.com/openapi | vendor docs |
| Modules: Identity, Auth, Address (Travel Address), Transfer, Compliance (inter-VASP inquiry / resolution / txId / confirmation), Discovery, Satoshi Test, Callbacks | https://docs.travel-rule.com/ | vendor docs |
| Auth: API key issued in the TRP dashboard, exchanged for a JWT valid for about 1 hour | https://docs.travel-rule.com/pages/integration-guide ; https://docs.travel-rule.com/openapi/identity | vendor docs |
| IVMS101 payload for originator and beneficiary, natural and legal persons; ISO-3166-1, ISO-20022 and ISO 24165 (DTI) referenced; FATF R.16 | https://docs.travel-rule.com/pages/about ; https://docs.travel-rule.com/openapi/transfer | vendor docs |
| Two transfer flows: `OPEN_VASP`, which uses a Travel Address (preferred), and `EMAIL`, a fallback where the beneficiary gets an email with a self-attestation form. Email delivery is through Mailjet | https://docs.travel-rule.com/pages/end-to-end-guide ; https://docs.travel-rule.com/openapi/transfer | vendor docs |
| Travel Address is "an opaque, URL-safe encoding of a beneficiary VASP route"; example `ta1qexample...` | https://docs.travel-rule.com/openapi/address | vendor docs |
| **VASP directory:** "Look up other VASPs in the TRP registry by domain, LEI, name, email, or directory ID", up to 100 results | https://docs.travel-rule.com/openapi/discovery | vendor docs |
| **Self-hosted wallets:** the `isSelfHosted` flag; self-attestation form; optional signature challenge; **Satoshi Test** (micro-payment to a TRP deposit address) on `bitcoin`, `ethereum` and `trc20` (USDT TRC-20 by default). Defaults: 3 active sessions per VASP, 20-minute session TTL | https://docs.travel-rule.com/pages/custodial-vs-non-custodial ; https://docs.travel-rule.com/pages/satoshi-test-guide | vendor docs |
| Callbacks signed with HMAC-SHA512 over the base64 body and a customer secret (`x-data-integrity` header). Retries 1m to 24h, 9 attempts, then marked FAILED | https://docs.travel-rule.com/pages/callbacks | vendor docs |
| Docs pages show "Last updated 3 months ago" / "5 months ago". Example health response has build `26.4.0` and timestamp 2026-05-11 | https://docs.travel-rule.com/ ; https://docs.travel-rule.com/openapi/identity | vendor docs |

**Other protocols: not documented.** We checked the docs home, about, end-to-end, integration, custodial vs non-custodial, satoshi test, callbacks, and the identity, address, transfer, compliance and discovery references. None names TRISA, TRUST, GTR, Sygna, VerifyVASP, CODE or Notabene. "OpenVASP" appears only as the flow label `OPEN_VASP`. The homepage claim "Global, Interoperable" (editor's browser view) has no documented interoperability behind it.

**Jurisdictions:** not documented. The docs list no jurisdictions and no thresholds.

**Relation to the OpenVASP Travel Rule Protocol:**
- It borrows heavily from the OpenVASP protocol. It uses the same name ("Travel Rule Protocol (TRP)") and the same version number (3.2.1 is the latest OpenVASP spec version, 29 Jul 2024, per https://docs.21analytics.ch/6.0.0/trp.html, peer vendor docs). It also uses the same terms: Travel Address with a `ta` prefix; inquiry, resolution and confirmation steps; an `/identity` endpoint returning name, LEI and x509.
- Its design is different. It is a hosted, centrally routed service ("TRP routes data between participating VASPs", its own "TRP registry", an EMAIL flow). Auth is API key + JWT and callbacks use a shared-secret HMAC. The OpenVASP spec is peer-to-peer over mutual TLS 1.3 with no central registry (see `reports/verification/trp.md`). The docs say nothing about mTLS.
- The docs about page calls TRP "an open standard" (https://docs.travel-rule.com/pages/about), but the same OpenAPI document is licensed "Proprietary".
- No affiliation found. OpenVASP's TRP page lists 21 Analytics, Blockchain Intelligence Group and ospree as vendors. It does not mention KYCAID or travel-rule.com, and it states no trademark or naming policy for "TRP" (https://www.openvasp.org/trp, standards body). The docs never mention OpenVASP.
- **Unknown:** whether a trp.travel-rule.com endpoint can exchange messages with a standard OpenVASP TRP endpoint, such as 21 Analytics or Notabene. Nothing shows this was tested.

## 3. Pricing and trial

- **Unknown.** The editor saw a "Pricing" nav item and a "Request a proposal" button, but we could not open the page. No figures turned up in search snippets, third-party listings, the docs or kycaid.com/pricing/ (no Travel Rule item there). Free trial or sandbox: unknown. The docs list no sandbox host, only production and localhost.

## 4. Certifications, regulatory status, customers

- **Certifications for TRP: unknown.** Nothing in the docs. Background: KYCAID's privacy policy claims ISO 27001, SOC 2 Type 2 and PCI DSS for KYCAID. An editor correction recorded on 2026-10-19 says SOC 2 Type 2 is not yet held (expected early 2027) (`reports/verification/kycaid.md`). Do not carry any of these over to TRP without the vendor confirming scope.
- **Regulatory status: unknown.** No licence or registration claimed in the docs.
- **Named customers or partners: none found.** The example LEI in the docs, `529900T8BM49AURSDO55`, belongs to **Ubisecure Oy, Finland** (an LEI issuer) per GLEIF (https://api.gleif.org/api/v1/lei-records/529900T8BM49AURSDO55, registry). It is a placeholder, not TRP's or KYCAID's own LEI. KYCAID's own LEI is unknown.
- **Reviews and listings:** none found on G2, Capterra, Product Hunt or Trustpilot for travel-rule.com or a TRP vendor (WebSearch, search index). No press releases, podcasts or conference listings found.

## 5. Red flags and points to raise with the vendor

1. **Name confusion with the OpenVASP protocol.** The vendor brands its proprietary hosted service "Travel Rule Protocol (TRP)", calls it "an open standard" and versions its API 3.2.1, the same number as the OpenVASP spec. Readers and buyers can easily take it for the open protocol, or for an official implementation. No affiliation exists that we can find.
2. **Young domain.** travel-rule.com was created on 7 Feb 2025 (RDAP), about 20 months before this check. Docs activity dates to around May 2026.
3. **No identifiable contracting entity on public pages.** The only operator signal is "KYCAID TRP Team" in the API docs. kycaid.com does not mention TRP. There are no terms, imprint, privacy policy or company number on any page we could open (the apex site was not checked).
4. **Interoperability claim not supported.** The homepage says "Interoperable", but the docs connect to no other network or protocol. The service routes inside its own "TRP registry", plus an email fallback.
5. **Docs inconsistency.** The about page promises "Encrypted, signed callbacks", but the callbacks guide describes signing (HMAC-SHA512) only, with no encryption.
6. **Placeholder LEI** (Ubisecure Oy) in the identity example. This is normal for docs, but it means there is no public LEI for the operator.
7. Not a red flag in itself: we saw no evidence of copied content apart from the protocol vocabulary above.

## What is confirmed vs missing

Confirmed (vendor docs + registries): KYCAID is named as publisher; the API scope (IVMS101, Travel Address, own VASP registry, email self-attestation, Satoshi Test on BTC/ETH/TRC-20, HMAC callbacks); production host; domain creation date; KYCAID Limited and Compligate Ltd registry details; no OpenVASP affiliation listed.

Missing:
- legal entity behind travel-rule.com and its terms
- founding/launch date of TRP and its leadership
- funding
- pricing and trial
- certifications and regulatory status
- customers and partners
- connections to TRISA / TRUST / GTR / Sygna / VerifyVASP / CODE / Notabene / OpenVASP TRP
- jurisdictions
- live status of trp.travel-rule.com

Suggested next step for the editor: ask KYCAID (support@travel-rule.com, or the KYCAID contact who confirmed the 240+ regions) to confirm in writing: the operating entity; pricing; whether TRP talks to OpenVASP TRP endpoints and any other networks; certification scope; and why the product uses the TRP name and the 3.2.1 version number.

## Other site files (not edited)

- `src/_data/providers/trp.yml` has `link.url: https://travel-rule.com`. That domain is this KYCAID-linked commercial service, not the OpenVASP protocol. Change the link to https://www.openvasp.org/trp, or the protocol review will send readers to an unrelated vendor.
