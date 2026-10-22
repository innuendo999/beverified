# VerifyVASP: new review 2026-10-21

New record `src/_data/providers/verifyvasp.yml`. It covers VerifyVASP and Sygna (Sygna Bridge, Gate, Hub), which VerifyVASP announced it had bought on 29 Apr 2026. Score 3.8 (Good), weighted from the six rubric criteria in `score_breakdown`. `link.type: none`. Categories: `travel-rule` only. Logo fields are null because there is no logo file in `src/assets/img/logos` and the fetch proxy blocks downloads from verifyvasp.com.

Also changed: the `VerifyVASP` entry in `src/_data/tracked.yml` is removed, so the `/providers/` directory does not list VerifyVASP twice (once reviewed, once unreviewed).

| Criterion | Weight | Score |
|---|---|---|
| Compliance & certifications | 25 | 3.9 |
| Coverage | 20 | 4.1 |
| Pricing transparency | 20 | 3.4 |
| Integration & API depth | 15 | 3.6 |
| Support responsiveness | 10 | 3.4 |
| Track record | 10 | 4.1 |
| **Weighted** | | **3.765, rounds to 3.8** |

How it compares:
- Against 21 Analytics (4.1): VerifyVASP is lower on compliance (SOC 2 is vendor-stated with no auditor named, against a confirmed ISO/IEC 27001 certificate), pricing (no tiers and no third-party figure, against 21 Analytics' tiers plus a G2/Capterra price) and integration (its own docs are not public). It is close on coverage: a bigger Asia-Pacific network, but no TRUST or TRP.
- Against TRP (3.7): VerifyVASP is ahead on compliance (named entity, SOC 2 claim with dates, GLEIF), coverage and track record, and behind on pricing (TRP publishes prices) and integration (TRP's OpenAPI docs are public).

## Checked (pages opened)

- VerifyVASP: homepage (1), who we are (2), FAQ (3), alliance (4, the member list renders by script), TravelRule API (5), VerifyWallet (6), terms (7, first 100,000 characters), privacy policy (8), docs root (9), SOC 2 renewal post (10), USD 500B post (11), acquisition post (13), Bonanza Factory post (14), news index page 1.
- Releases and filings: acquisition release on PR Newswire (12) and the AAP copy, Oct 2024 release (15), VerifyVASP's EBA consultation response (16), GLEIF press release (17).
- Company and funding: The Block (18), Fintech News Singapore (19), Byline Network (20), Antara (May 2023, not cited), Blockmedia (36).
- Interoperability: Notabene protocol analysis (21), CODE docs (22), Chakwon (23), TRISA and Sygna post (30), Sumsub Travel Rule FAQ (32), Coinbase TRUST page (33).
- Sygna: about (24), Bridge (25), Alliance (26), FAQ (27), Developer Center (28), terms (29), ISO coverage in Global Security Mag (31).
- Third party: G2 (34), Coincub (35).
- Not opened or blocked: docs.verifyvasp.com subpages and llms.txt (robots-blocked for our fetcher, not indexed by search); ACRA/BizFile and seedtable.com (blocked); Sygna SLA pages; the IFTA award release; Capterra and SourceForge (no listing found).
- Searched for regulatory actions, breaches, litigation, later funding and pricing: none found.

## Claims

| Claim | Status | Evidence |
|---|---|---|
| Network size | Vendor-stated, inconsistent | 150+ VASPs (homepage headline, alliance meta), 130+ (about meta, alliance metadata), 110+ (structured data on several pages), "over 110 institutions across over 20+ contries" (travel-rule body). 30+ jurisdictions on most pages (1, 2, 4, 5). Member names not readable. The record gives the range. |
| Processed volume | Vendor-stated | USD 500B+ (11, Apr 2026); USD 300B+ "since 2022" in structured data; USD 200B and 10 million verifications (15, Oct 2024). |
| SOC 2 Type II | Vendor-stated | Post of 26 Jun 2026: platform assessed 1 Feb 2025 to 31 Jan 2026, security, availability and processing integrity, fourth year running, report on request (10). No auditor named, report not seen. |
| ISO/IEC 27001 | VerifyVASP: not found. Sygna: vendor-stated | VerifyVASP's homepage shows an ISO logo with no detail; not listed. Sygna Bridge was certified by SGS Taiwan in Apr 2021 (31), and Sygna says all its products were certified in Jun 2022 (Sygna blog). We saw no certificate or current validity. |
| Legal entity | Vendor-stated | VerifyVASP Pte. Ltd., Singapore law (7, 8); 1 Harbourfront Avenue #13-03 (8); company number 201921674H only in VerifyVASP's EBA response (16). Registry not opened. |
| Owner | Independent plus vendor | Release: subsidiary of Upbit Global Pte. Ltd. (12, 13). Byline: Upbit Global (formerly Upbit APAC) also owns Upbit Singapore, Indonesia and Thailand, and Upbit says it has no equity link to Dunamu (20). Notabene's claim that Upbit set up VerifyVASP as a JV with Chainalysis is not used. |
| Founded | Independent | 2019 (18, G2 seller profile); live since 2021 per Notabene (21). |
| Funding | Independent | USD 5M Series A at USD 100M valuation, 8 Sep 2022, FTX Ventures lead with Peak Capital and "Bcharu" (18, 19). |
| Sygna acquisition | Vendor-stated | Announced 29 Apr 2026 (dateline 30 Apr), terms not disclosed; Sygna members "continue to operate without disruption" and will be "progressively onboarded onto the Verified Network" (12, 13). Sygna Bridge is not named in the release. The Sygna site and docs are still live, 39 members are listed (26, modified 10 Jul 2026), and we found no migration date. |
| Interoperability | Partly independent | CODE: "integrated with solutions such as Verify VASP, GTR, and Sygna" (22). Partial VerifyVASP and CODE link from 25 Apr 2022 (23). Sygna and TRISA "full interoperability", 22 Feb 2022 (30, vendor). Sumsub connects to Sygna Bridge, not VerifyVASP (32). TRUST lists only 21 Analytics (33). Notabene is "looking to add support" pending a security review and says there is "no way of sending transactions to non-members" (21). No TRP or GTR link found for VerifyVASP. 21 Analytics confirmed no direct connection; unannounced bridges are not recorded. |
| Architecture | Conflicting | Vendor: peer to peer, end to end encrypted, no central storage, regional nodes (3, 5). EBA response: central servers in the cloud, data in enclave servers that members manage (16). Notabene: closed, centralized (21). Coincub: privacy "Low (Centralized)" (35). Data stored in Singapore and/or Korea (8). The record shows both views. |
| Self-hosted wallets | Vendor-stated | VerifyWallet: ECDSA or Ed25519 signature with a nonce, plus micro-transactions; MetaMask, Ledger, Trezor, Phantom named; no chain list (6). |
| Pricing | Vendor terms only | No prices. Terms: base subscription fee plus API usage fee, quarterly, 30-day invoices, 1.5% a month late charge (7). Coincub: VerifyVASP pay as you go, Sygna Bridge sign-up plus annual fee (35). G2: no pricing (34). Notabene's "membership is free" conflicts with the terms and is not used. |
| User ratings | User | G2 4.5 from 1 review (34). |
| Superlatives | Not used | "Global standard", "unmatched scale, depth, and geographic reach" (12); "largest active interoperability connection in the world" (16); Upbit testimonial calling it the only provider with an independent audit (1). |

## Key facts

| Item | Finding |
|---|---|
| Legal entity | VerifyVASP Pte. Ltd., Singapore; no. 201921674H (vendor document) |
| HQ | 1 Harbourfront Avenue, #13-03, Singapore 098632 (privacy policy); offices in Tokyo and Paris per the Oct 2024 release |
| Owner | Upbit Global Pte. Ltd.; no equity link to Dunamu, per Upbit |
| Leadership | Shih Yun Chia CEO, James Lim CTO, Nor Azman Hamid General Counsel, Amanda Wick Head of Americas |
| Founded | 2019 |
| Funding | USD 5M Series A, Sep 2022, FTX Ventures lead |
| Products | TravelRule API, VerifyName, VerifyWallet, LEI issuing as GLEIF Validation Agent (since May 2023); Sygna Bridge, Gate, Hub |
| Network | 110+ to 150+ VASPs, 30+ jurisdictions (vendor); Sygna 39 listed |
| Interop | CODE (independent); TRISA and Sumsub through Sygna; no TRUST, TRP or GTR |
| Certifications | SOC 2 Type II vendor-stated; Sygna ISO/IEC 27001 vendor-stated (2021, 2022) |
| Pricing | Not published; subscription plus usage, billed quarterly |
| Docs | VerifyVASP: overview only in public. Sygna: public developer centre, REST, Java/JS/Python SDKs, Robot VASP |
| Ratings | G2 4.5 (1) |
| Regulatory, breaches, litigation | None found |

## Suggested ranking card (`travel-rule`)

Position: **2**, between 21 Analytics (4.1) and TRP (3.7). Replace the current unreviewed VerifyVASP entry at position 5 (which has `slug: null` and `legacy_rating_shown: 4.5`) with this card and move it up:

```yaml
  - slug: verifyvasp
    name: VerifyVASP
    award: Best APAC Coverage
    tagline: Members-only Travel Rule network from Singapore, strong among Asia-Pacific exchanges, that now also owns Sygna Bridge.
    coverage: Global (vendor-stated), strongest in South Korea, Singapore and Japan
    size: Mid-market to Enterprise
    pros:
    - Large Asia-Pacific exchange network, with a live CODE connection documented by CODE
    - Owns Sygna Bridge since April 2026, adding its Japanese members and public API docs
    - Self-hosted wallet checks by signature challenge, plus a name-match check for first-party transfers
    cons:
    - No prices published; the terms describe only a subscription plus usage fee
    - SOC 2 Type II is vendor-stated with no auditor named; no current ISO/IEC 27001 certificate found
    - Network size differs by page (110+ to 150+ VASPs) and there is no TRUST, TRP or GTR link
    legacy_price_shown: On request
    legacy_rating_shown: null
    segments: []
```

The award "Best APAC Coverage" is already on this entry and still fits. "Strongest in South Korea, Singapore and Japan" is an editorial reading of the member and partner evidence (Upbit, Bybit, CODE, Sygna's Japanese members), not a measured figure. If you want it plainer, use `Global (vendor-stated), strong in Asia-Pacific`. `size` is an editorial judgement because the members are mostly exchanges; set it to `null` if you prefer.

Problems in the current card:
- Pro "Deep APAC exchange network": fine in substance but unsourced; replace as above.
- Pro "Fast counterparty lookup": only a vendor latency claim (about 0.2 seconds); drop it.
- Pro "Responsive regional support": no source (no SLA, one G2 review); drop it.
- Con "Smaller global brand recognition": not measurable; replace.
- `legacy_price_shown: Custom pricing` should be `On request`, the same wording as 21 Analytics.
- `legacy_rating_shown: 4.5` conflicts with the reviewed score of 3.8.

## Recommendation: the Sygna Bridge card

**Remove the separate unreviewed Sygna Bridge entry from `travel-rule`.** Sygna Inc. now belongs to VerifyVASP. VerifyVASP says Sygna members will move to its network, so a second card would rank one owner twice and show the 4.6 legacy rating (Sygna Bridge) above the reviewed 3.8 (VerifyVASP). Its current copy is also unsourced ("Proven at high transfer volumes", "Best for High-Volume Exchanges"). The VerifyVASP card and review already cover Sygna Bridge: it is listed in `alternate_names`, in the tagline, in a pro, in what_is and in an FAQ.

Keep Sygna Bridge as a product line rather than a card: anyone searching for "Sygna Bridge" lands on the VerifyVASP review through its alternate name and FAQ. If you want a visible pointer, add one line to `categories/travel-rule.yml` (for example in the protocols explainer: "Sygna Bridge is now part of VerifyVASP"). If the migration slips or Sygna is later sold or run as a separate brand with its own pricing, review it separately then.

Follow-on edits for you (not made):
- `rankings.yml` `travel-rule`: the list goes from five to four entries (21 Analytics, VerifyVASP, TRP, Notabene). Reviewed entries go before unreviewed ones, so Notabene drops to 4th.
- `categories/travel-rule.yml`: `quick_answer` ("VerifyVASP has the strongest APAC coverage; neither has a full BeVerified review yet") and `seo.description` (which lists Sygna Bridge) need updating, and "5 providers compared" in the quick answer and `legacy_stats` becomes 4.
- `21analytics.yml`: `alternatives[1]` and `choose_instead[2]` for VerifyVASP have `slug: null`; set them to `slug: verifyvasp` so they link to the review. Its FAQ "strongest in Asia-Pacific" is fine as a comparative description but could become "strong in Asia-Pacific".
- `categories/crypto.yml` explainer calls VerifyVASP a protocol next to TRP, OpenVASP and Shyft; that is acceptable, with no change needed.

## Open items: ask VerifyVASP

- The SOC 2 Type II report (auditor, opinion, system description, exceptions) and bridge letters.
- What the ISO logo on the homepage refers to, and whether Sygna's ISO/IEC 27001 certificate is current (body, number, scope, validity).
- One member count with a date, and a member list we can check.
- Price list or example quote: base subscription, usage fee per message, minimums, and whether Sygna customers pay differently.
- Sygna migration: timeline, whether Sygna Bridge is retired, and whether Sygna's TRISA and Sumsub links will carry over.
- Which other networks VerifyVASP members can reach today (TRP, GTR, TRISA, Notabene) and whether non-members can be reached by any route.
- Architecture: what runs centrally and what runs in member-managed enclaves; hosting locations.
- Public API docs and the sandbox: URL, access conditions, changelog.
- Support hours and SLA.
- Since when Upbit Global has been the parent, and the current shareholders.
- Registry: confirm UEN 201921674H in ACRA (we did not open it).

## Score flag

None. This is a new score (3.8). The old card's 4.5 for VerifyVASP and 4.6 for Sygna Bridge were never reviewed scores.

## Checks run 2026-10-21

`npm run build` ok; `node scripts/checks/provider.mjs verifyvasp` 0 issues; `npm run check:strict` 0 content issues, 0 broken links; `npm run check:html` 111 pages, 0 issues.

## Follow-up 2026-10-22

Fact pass on all 23 `verification_notes`. Notes merged to 13. `last_verified` and `updated` set to 2026-10-22. Validator: 0 issues.

### Changed

- `facts` Legal entity: "VerifyVASP Pte. Ltd., Singapore (company number 201921674H, per VerifyVASP)", source 16 (EBA response), evidence vendor → "VerifyVASP Pte. Ltd., Singapore (UEN 201921674H, registered 5 July 2019, live)", source 37 (ACRA open data via acrawatch.sg, new), evidence independent. The registered address matches the privacy policy, and the 2019 registration matches the founding year.
- `facts` Certifications: "Sygna stated ISO/IEC 27001 in 2021 and 2022" → "Sygna's homepage says all Sygna products are ISO/IEC 27001 certified (claims first made in 2021 and 2022)" (38, new: Sygna homepage, modified 7 Aug 2026). Still no certificate seen.
- `certifications[1]` (Sygna ISO/IEC 27001): `what` now adds that the Sygna homepage still makes the claim; source 31 → 38. Status stays `vendor_stated`.
- FAQ "Is VerifyVASP SOC 2 or ISO 27001 certified?": adds "and its homepage still says so" after the Sygna 2021/2022 claims (38).
- New sources appended: 37 ACRA company record (acrawatch.sg), 38 Sygna homepage.

### Confirmed, no change

These all still match the record: the SOC 2 post (26 Jun 2026; auditor still not named) and the fee clauses in the terms (base monthly subscription plus API usage fee, charged quarterly, 30 days, 1.5% a month). So do the privacy policy (Singapore and/or Korea, Harbourfront address) and the FAQ (no PII in central infrastructure, enclave encryption, region-specific nodes, sandbox testing). The VerifyWallet methods and named wallets, VerifyName's 91.7% rate, the about page leadership, G2 (4.5 from 1 review) and CODE's integration list are unchanged. Notabene's view (closed, centralized; no sending to non-members; support pending a security review) and the acquisition release (Upbit Global parent, no terms) are unchanged too. The Sygna site, developer centre and 39-member alliance list are still online, with no mention of VerifyVASP or the migration. The network-size range (110+, 130+, 150+) is still inconsistent across pages.

### Removed / unverifiable

- Nothing removed from rendered fields.
- Still unconfirmed (in notes): SOC 2 auditor and report; what the homepage ISO logo refers to; any current Sygna certificate; when Upbit Global became the parent and who holds its shares; the Sygna migration date and whether Sygna's TRISA and Sumsub links carry over; one consistent member count; VerifyVASP API docs, sandbox and SLA; prices. BizFile+ was not opened directly (only ACRA open-data mirrors).

### Ranking cards

`travel-rule` (`slug: verifyvasp`): no text is wrong. The tagline, coverage, pros, cons and `legacy_price_shown: On request` still match the record.

### Score flag

None. 3.8 unchanged.
