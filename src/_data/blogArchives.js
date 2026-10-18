// Blog index + section archives. /category/* URLs are the old WordPress archive URLs, kept for SEO.
export default [
  { key: "all", url: "/blog/", tab: "All", crumb: "Blog", h1: "Insights on KYC, AML and identity verification",
    lede: "News, guides and research from the BeVerified review team, linked to the providers and rules they cover.",
    seoTitle: "KYC, AML & Identity Verification Blog | BeVerified",
    seoDescription: "Guides, news and research on KYC, KYB, AML screening and identity verification, linked to the providers and rules they cover." },
  { key: "guide", url: "/category/guide/", tab: "Guides", crumb: "Guides", h1: "KYC and AML guides",
    lede: "Plain explanations of the checks, lists and rules compliance teams work with, refreshed when the rules change.",
    seoTitle: "KYC & AML Guides | BeVerified",
    seoDescription: "Practical guides to KYC, KYB, sanctions screening, transaction monitoring and crypto compliance rules." },
  { key: "publications", url: "/category/publications/", tab: "Research", crumb: "Research", h1: "Research and publications",
    lede: "Longer pieces on sanctions lists, document verification, fraud and automation in compliance.",
    seoTitle: "KYC & AML Research and Publications | BeVerified",
    seoDescription: "In-depth publications on OFAC screening, sanctions lists, NFC passports, OSINT and KYC automation." },
  { key: "news", url: "/category/news/", tab: "News", crumb: "News", h1: "KYC and AML news",
    lede: "Regulatory and market news for compliance teams, with an update on what has happened since.",
    seoTitle: "KYC & AML News | BeVerified",
    seoDescription: "Regulatory and market news on AML, KYC and digital identity, with follow-ups on what changed since each story." },
];
