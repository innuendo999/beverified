---
title: "What Is a Whitelist? Meaning, Examples and Uses in Compliance"
seoTitle: "What Is a Whitelist? Meaning and Examples | BeVerified"
seoDescription: "A whitelist (now often called an allowlist) is a list of approved items that get through while everything else is blocked. Meaning, examples and banking use."
lede: "A whitelist is a list of things you have approved in advance: email senders, IP addresses, apps, payees or wallet addresses. Anything on it gets through, and anything not on it is blocked or checked first. Many organisations now call it an allowlist."
section: guide
cover_label: "Allowlists explained"
cover_motif: list
published: 2025-06-19
updated: 2026-10-18
author: andrii-klymenko
takeaways:
  - "Whitelisted means pre-approved: the item skips a check or block that everything else has to pass."
  - "Allowlist is the newer name for the same thing; the UK NCSC switched its wording in April 2020."
  - "In banking, whitelisting usually means trusted payees, approved IP addresses for API access, or customers cleared as false positives in sanctions screening."
  - "A whitelist entry in sanctions screening never replaces re-screening when the sanctions list or the customer's data changes."
topics: [Whitelist, Allowlist, Sanctions screening]
provider_slugs: [complyadvantage, castellum-ai, sanction-scanner]
ranking_keys: [aml, crypto]
faq:
  - q: "What does whitelisted mean?"
    a: "Whitelisted means something has been put on an approved list, so it is let through without the block or extra check that applies to everything else. A whitelisted email sender skips the spam filter; a whitelisted IP address can reach a system others cannot."
  - q: "What does whitelisted mean in a bank?"
    a: "It usually means one of three things: a payee you added to your trusted beneficiaries list, an IP address or system the bank lets connect to its API, or a customer the bank's screening team has marked as a confirmed false positive against a sanctions or PEP list. The last one still has to be re-checked when lists change."
  - q: "Is whitelist the same as allowlist?"
    a: "Yes. Allowlist and denylist mean the same as whitelist and blacklist. Groups such as the UK National Cyber Security Centre and the Inclusive Naming Initiative recommend the newer words because they describe the action directly."
  - q: "What is the opposite of a whitelist?"
    a: "A blacklist, now usually called a denylist or blocklist. A whitelist blocks everything except what is listed; a blacklist allows everything except what is listed."
  - q: "Does whitelisting mean a customer no longer needs sanctions screening?"
    a: "No. A whitelist entry only suppresses a known false match. If the sanctions list or the customer's details change, the customer needs to be screened again, and OFAC has penalised banks whose alert suppression rules let real matches through."
sources:
  - title: "Terminology: it's not black and white"
    publisher: "UK National Cyber Security Centre"
    url: "https://www.ncsc.gov.uk/blog-post/terminology-its-not-black-and-white"
    accessed: 2026-10
  - title: "Word List: whitelist (Tier 1)"
    publisher: "Inclusive Naming Initiative"
    url: "https://inclusivenaming.org/word-lists/tier-1/whitelist/"
    accessed: 2026-10
  - title: "SP 800-167, Guide to Application Whitelisting"
    publisher: "NIST"
    url: "https://csrc.nist.gov/pubs/sp/800/167/final"
    accessed: 2026-10
  - title: "Allowlists, denylists, and approved senders"
    publisher: "Google Workspace Admin Help"
    url: "https://knowledge.workspace.google.com/admin/gmail/advanced/allowlists-denylists-and-approved-senders"
    accessed: 2026-10
  - title: "Commission Delegated Regulation (EU) 2018/389 (RTS on strong customer authentication)"
    publisher: "EUR-Lex"
    url: "https://eur-lex.europa.eu/eli/reg_del/2018/389/oj/eng"
    accessed: 2026-10
  - title: "Adding and confirming a new cryptocurrency withdrawal address"
    publisher: "Kraken Support"
    url: "https://support.kraken.com/hc/articles/360000672863-adding-and-confirming-a-new-cryptocurrency-withdrawal-address"
    accessed: 2026-10
  - title: "BSA/AML Examination Manual: Office of Foreign Assets Control"
    publisher: "FFIEC"
    url: "https://bsaaml.ffiec.gov/manual/OfficeOfForeignAssetsControl/01"
    accessed: 2026-10
  - title: "Black and grey lists"
    publisher: "FATF"
    url: "https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html"
    accessed: 2026-10
  - title: "Settlement Agreement between OFAC and Bank of America, N.A. (enforcement release, October 13, 2026)"
    publisher: "U.S. Treasury, OFAC"
    url: "https://ofac.treasury.gov/media/937231/download"
    accessed: 2026-10
---

The idea behind a whitelist is simple: instead of trying to name every bad thing, you name the good ones and refuse the rest. That flips the default. A spam filter normally lets mail in unless it looks suspicious; an email whitelist lets in only the senders you listed. The same logic shows up in IT security, banking apps, crypto wallets and sanctions screening, which is why the word turns up in so many different contexts.

## What does whitelist mean?

A whitelist is a list of approved items. Being whitelisted means being on that list, so you are allowed through without the check or block that applies to everyone else. The item can be almost anything a system can identify:

- an email address or domain
- an IP address or network range
- an application or file
- a website or URL
- a bank payee
- a crypto wallet address
- a person or company that has been cleared in a screening process

NIST's [Guide to Application Whitelisting (SP 800-167)](https://csrc.nist.gov/pubs/sp/800/167/final) gives the classic security definition: a list of software approved for use in an organisation, which whitelisting tools use to control which applications are allowed to run. Everything not on the list is stopped, which is how whitelisting keeps out malware and unlicensed software that nobody has seen before.

As a verb, "to whitelist" something means adding it to the list. "Whitelisting" is the practice as a whole.

## Whitelist or allowlist: why the name changed

Plenty of companies no longer say whitelist. The common replacements are **allowlist** (and **denylist** or **blocklist** for the opposite).

The UK National Cyber Security Centre made the switch publicly on 30 April 2020. In a [blog post titled "Terminology: it's not black and white"](https://www.ncsc.gov.uk/blog-post/terminology-its-not-black-and-white), it said the old terms only make sense if you accept that white means good and black means bad, and that "allow list" and "deny list" are clearer anyway. The [Inclusive Naming Initiative](https://inclusivenaming.org/word-lists/tier-1/whitelist/) puts "whitelist" in its Tier 1 group (replace immediately) and suggests "allowlist" or a plain verb such as "allow".

You will see both words in product settings. Google's admin documentation, for example, is now titled [Allowlists, denylists, and approved senders](https://knowledge.workspace.google.com/admin/gmail/advanced/allowlists-denylists-and-approved-senders). Nothing changes technically. An allowlist works exactly like a whitelist; people still search for "whitelist" far more often, so this guide uses both.

## Common types of whitelists

### Email whitelisting

This is what most people mean when they ask someone to "whitelist our address". Adding a sender to an approved list stops their mail going to spam. In Google Workspace, an admin can set up an IP allowlist (mail from those IP addresses is not put in spam) and an approved senders list (mail from those addresses or domains bypasses spam filters). Google notes that recipients may still see a warning banner on allowlisted mail, so the list softens filtering rather than switching off every safeguard.

### IP whitelisting

Companies often restrict access to admin panels, VPNs or APIs to a fixed set of IP addresses. A request from any other address is refused before it reaches a login screen. Payment and verification APIs frequently offer this as an extra control on top of API keys.

### Application whitelisting

The NIST model: only approved programs can run on a machine. It is common on servers, point-of-sale terminals and other devices that run a small, predictable set of software.

### Website and content whitelisting

Schools, kiosks and some workplaces allow only a short list of sites. Advertisers use a similar idea when they restrict ads to approved publisher domains.

## What does whitelisted mean in a bank?

Banks use the word in at least three ways, and it helps to know which one someone means.

**1. Trusted payees.** When you mark a recipient as trusted in your banking app, you are whitelisting them. In the EU this has a legal basis: [Article 13 of Delegated Regulation (EU) 2018/389](https://eur-lex.europa.eu/eli/reg_del/2018/389/oj/eng), the PSD2 technical standard on strong customer authentication, requires strong authentication when a payer creates or amends a list of trusted beneficiaries. After that, the bank is allowed (not obliged) to skip strong authentication for payments to a payee on the list. So adding someone takes extra effort once, and later payments can be smoother.

**2. Approved systems and IPs.** Banks that expose APIs to fintech partners commonly restrict them to whitelisted IP addresses and certificates. Corporate clients on host-to-host payment channels go through the same thing.

**3. Cleared customers in screening.** This is the compliance meaning. Sanctions and PEP screening tools compare customer names against watchlists, and common names produce a lot of false matches. When an analyst confirms that "John Smith, born 1980, London" is not the sanctioned John Smith, the tool can record that decision so the same alert does not fire every night. Vendors call this a whitelist, good-guy list, exclusion list or false-positive suppression rule.

US bank examiners expect screening to be risk-based. The FFIEC's [BSA/AML manual section on OFAC](https://bsaaml.ffiec.gov/manual/OfficeOfForeignAssetsControl/01) says a high volume of false hits may indicate a need to review the interdiction program, and that existing customers should be checked when the OFAC list changes. A suppression list helps with the first problem; it must not undermine the second.

## Whitelisting in crypto and fintech

Crypto platforms use withdrawal address whitelisting as an anti-theft control. You add and confirm a destination address before you can send funds to it. On Kraken, for example, a new withdrawal address must be [added and confirmed](https://support.kraken.com/hc/articles/360000672863-adding-and-confirming-a-new-cryptocurrency-withdrawal-address) before use; addresses added from an unrecognised device need email confirmation, and after certain password changes withdrawals to new addresses are held for 24 hours. If someone steals your login, they still cannot send coins to their own wallet straight away.

Token sales and smart contracts use allowlists too, limiting who can mint or buy to wallets that passed KYC. For businesses, a partner allowlist often means a vetted set of counterparties that passed KYB checks. Our [KYB provider rankings](/providers/kyb/) and [crypto compliance rankings](/providers/crypto/) cover tools that run those checks.

## The risk: a stale whitelist hides real matches

A whitelist makes the default answer "yes" for whatever is on it. That is the point, and it is also the danger. If the facts change and the list does not, you get a false negative: something that should have been stopped goes through.

Sanctions screening shows this clearly. In October 2026 OFAC settled with Bank of America for $11,662,930 over 475 apparent violations. According to [OFAC's enforcement release](https://ofac.treasury.gov/media/937231/download), the causes included delayed screening filter updates, analysts approving true matches as false positives, and an alert suppression rule; one design flaw ranked exact name and date of birth matches to blocked persons as low or medium priority. OFAC's compliance takeaways included keeping alert rules risk-based, supervised and audited.

Practical habits that keep a screening whitelist safe:

- Tie each entry to specific data (full name, date of birth, ID number), not just a name.
- Record who approved the entry, when and why.
- Re-screen whitelisted customers when a sanctions list updates or when their details change.
- Review the list on a schedule and remove entries that no longer apply.
- Test the suppression rules, the same way you test the matching rules.

Screening vendors handle this differently. [ComplyAdvantage](/providers/complyadvantage/) is a screening data platform used alongside separate ID verification, [Castellum.AI](/providers/castellum-ai/) maintains its own sanctions database, and [Sanction Scanner](/providers/sanction-scanner/) is aimed at mid-market teams. Our [AML software rankings](/providers/aml/) compare how screening tools handle alerts and audit trails.

## Whitelist vs blacklist vs greylist

| | Whitelist (allowlist) | Blacklist (denylist) | Greylist |
|---|---|---|---|
| Default | Block everything not listed | Allow everything not listed | Hold or check first |
| Best for | Small, known sets (admins, payees, servers) | Known bad actors (spam domains, sanctioned parties) | Unknown or borderline items |
| Main risk | Stale entries let bad items through | New threats are missed | Delays and manual work |

In AML, the word greylist also has a separate meaning: the FATF's list of [Jurisdictions under Increased Monitoring](https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html). That is about countries, not individual customers or senders.

Sanctions lists such as OFAC's SDN list are effectively blacklists. If you want to know how those lists are built and searched, read our guides to [OFAC sanctions lists](/publications/ofac-sanctions-lists/) and [how to run OFAC screening step by step](/publications/how-to-conduct-ofac-screening-step-by-step-guide/).
