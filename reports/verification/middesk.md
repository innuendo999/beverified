# Middesk: new review, 2026-11-24

New record `src/_data/providers/middesk.yml` (was "Review coming" in `tracked.yml`). Desk research on Middesk's own site and docs, checked 24 Nov 2026.

## Score

v3.1, KYB guide (`node scripts/rescore.mjs middesk`): **3.1 (Good)**.

| Criterion | Weight | Sub-score | Why |
|---|---|---|---|
| Fraud defense (KYB guide) | 25 | 4 | registry, owners and officers, documents, monitoring all yes; no independent registry evidence |
| Pricing and total cost | 20 | 2 | no published price |
| Coverage | 15 | 2 | US plus 30 countries (31 < 100) |
| Platform breadth (KYB modules) | 15 | 5 | 5 of 5 |
| Integration | 15 | 2 | public docs only; sandbox, no-code and support partial; no SDK |
| Trust | 10 | 3 | SOC 2 Type II vendor-stated, operating since 2019 |

## Ranking: tie for #10 in KYB, owner decision

Middesk's unrounded score (3.050) is exactly equal to Trulioo's (3.050), the current #10 in the KYB list. **Owner decision 2026-11-24: Middesk takes #10 on the tie-break (KYB guide sub-score: Middesk 4, Trulioo 2 on fraud defense); Trulioo leaves the KYB list.** Options that were offered:

1. Trulioo stays #10, Middesk is reviewed but not ranked (current state of this PR).
2. Middesk takes #10 on a tie-break (for example the KYB guide sub-score: Middesk 4, Trulioo 2 on fraud defense), Trulioo leaves the KYB list.
3. KYB list grows to 11 (only if KYB is not "top 10 only").

## Facts used (vendor-stated unless noted)

- US: Secretary of State search in all 50 states and DC on every verification (docs, registration page).
- International: 30 countries across Canada, Europe and APAC, phase one, Verify plan, access through sales (release + docs; API change in the docs changelog 10 Aug 2026). Homepage teaser mentions 65+ countries; not confirmed anywhere else, not used.
- Owners and officers: aggregate list from multiple sources; no BOI or register source named.
- Sanctions: 8 OFAC lists by default, daily pull; enhanced screening adds PEP and 5,704 sources.
- Monitoring: webhooks for registration, watchlist, bankruptcy and TIN events; no frequency stated.
- Documents: articles of incorporation, good standing certificates, UCC1 from government sources.
- Merchant checks: web presence analysis; NAICS, SIC and MCC classification.
- KYC on people through Socure (separate modules: document verification, Sigma Device, decision).
- SOC 2 Type II: annual audit, report in trust center (not opened): vendor_stated.
- Pricing: none published; Vendr range $2 to $5 per verification at 1,000 to 5,000 a month, labelled third-party.
- Company: founded 2019 (own llms.txt, YC; Crunchbase says 2018), HQ San Francisco and New York, $4M seed 2019, $57M Series B 2022, 600+ customers and 135 staff (about page).

## Removed / not used

- Vendor performance figures (7M businesses a year, 92% of records updated in under 10 days, Rho case study numbers).
- Third-party funding totals ($77M, Series A $16M).
- G2 and TrustRadius ratings (G2 not readable; TrustRadius snippet without a count).

## Still open

- Logo and wordmark: added from the owner's images on 2026-11-24.
