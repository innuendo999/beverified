// BeVerified blog — sample posts + entity declarations. Every related/mentioned block is derived from post.entities.
(function () {
  const R = (n) => 'Review Page - ' + n + ' (Desktop).dc.html';
  const entities = {
    sumsub: { type: 'provider', label: 'Sumsub', href: R('Sumsub'), pid: 'sumsub' },
    onfido: { type: 'provider', label: 'Onfido', href: R('Onfido'), pid: 'onfido' },
    kycaid: { type: 'provider', label: 'KYCAID', href: R('KYCAID'), pid: 'kycaid' },
    jumio: { type: 'provider', label: 'Jumio', href: R('Jumio'), pid: 'jumio' },
    trulioo: { type: 'provider', label: 'Trulioo', href: R('Trulioo'), pid: 'trulioo' },
    seon: { type: 'provider', label: 'SEON', href: R('SEON'), pid: 'seon' },
    complyadvantage: { type: 'provider', label: 'ComplyAdvantage', href: R('ComplyAdvantage'), pid: 'complyadvantage' },
    entrust: { type: 'company', label: 'Entrust', href: '#company-entrust' },
    veriff: { type: 'company', label: 'Veriff', href: R('Veriff') },
    vespia: { type: 'company', label: 'Vespia', href: R('Vespia') },
    experian: { type: 'company', label: 'Experian', href: '#company-experian' },
    kyc: { type: 'term', label: 'KYC', href: '#term-kyc', def: 'Know Your Customer: confirming a customer is who they claim to be before and during the relationship.' },
    kyb: { type: 'term', label: 'KYB', href: '#term-kyb', def: 'Know Your Business: verifying a company, its registry record and its ultimate beneficial owners.' },
    aml: { type: 'term', label: 'AML', href: '#term-aml', def: 'Anti-Money Laundering: screening, monitoring and reporting to stop illicit funds.' },
    liveness: { type: 'term', label: 'Liveness detection', href: '#term-liveness', def: 'Proving a selfie comes from a real, present person — not a photo, mask or deepfake.' },
    perCheck: { type: 'term', label: 'Per-check pricing', href: '#term-per-check', def: 'A price charged for each completed verification, usually with volume tiers or a monthly minimum.' },
    ubo: { type: 'term', label: 'UBO', href: '#term-ubo', def: 'Ultimate beneficial owner: the natural person who ultimately owns or controls a company.' },
    travelRule: { type: 'term', label: 'Travel Rule', href: '#term-travel-rule', def: 'The requirement for VASPs to share originator and beneficiary data with each transfer.' },
    fatf16: { type: 'regulation', label: 'FATF R.16', href: '#reg-fatf-16' },
    iso30107: { type: 'regulation', label: 'ISO/IEC 30107-3', href: '#reg-iso-30107-3' },
    eidas: { type: 'regulation', label: 'eIDAS 2.0', href: '#reg-eidas' },
    gdpr: { type: 'regulation', label: 'GDPR', href: '#reg-gdpr' },
  };
  const posts = [
    { slug: 'kyc-cost-per-check-2026', type: 'Guide', title: 'How much does KYC cost per check in 2026?', excerpt: 'Per-check, monthly and annual models compared, with the published prices we verified and what drives an enterprise quote.', entities: ['perCheck', 'kyc', 'sumsub', 'kycaid', 'onfido', 'jumio', 'trulioo', 'seon'], featured: true },
    { slug: 'entrust-onfido-acquisition', type: 'News', title: 'Entrust completes Onfido acquisition: what it means for KYC buyers', excerpt: 'Contracts, product names and roadmap after the April 2024 deal — and what to ask your account manager.', entities: ['onfido', 'entrust', 'kyc', 'liveness'], cover: true },
    { slug: 'pricing-transparency-research', type: 'Research', title: 'Pricing transparency across the KYC providers we review', excerpt: 'Which providers publish a rate card, which quote only through sales, and how often published prices change.', entities: ['perCheck', 'kyc', 'aml', 'sumsub', 'kycaid'] },
    { slug: 'fatf-travel-rule-explained', type: 'Regulation', title: 'The FATF Travel Rule for VASPs, explained', excerpt: 'Which transfers it covers, the USD/EUR 1,000 threshold and what data must travel with them.', entities: ['fatf16', 'travelRule', 'aml'] },
    { slug: 'read-a-pad-test-letter', type: 'Guide', title: 'How to read a liveness PAD test letter', excerpt: 'What ISO/IEC 30107-3 levels mean, who ran the test and what the letter does not prove.', entities: ['iso30107', 'liveness', 'onfido'] },
    { slug: 'veriff-acquires-vespia', type: 'News', title: 'Veriff acquires Vespia: what changes for KYB buyers', excerpt: 'Existing Vespia customers, roadmap and contracts after the February 2026 deal.', entities: ['veriff', 'vespia', 'kyb', 'ubo'] },
    { slug: 'eidas-2-wallet', type: 'Regulation', title: 'eIDAS 2.0 and the EU Digital Identity Wallet: what KYC teams should prepare for', excerpt: 'How wallet-based identity could change onboarding flows, and what stays the same for AML.', entities: ['eidas', 'kyc', 'gdpr'] },
    { slug: 'experian-kyc360', type: 'News', title: 'Experian completes KYC360 acquisition', excerpt: 'What the October 2025 deal means for KYC360’s CLM and screening customers.', entities: ['experian', 'kyb', 'aml'] },
  ].map((p) => ({ ...p, href: 'Blog Post V3 (Desktop).dc.html', published: 'Mon DD, YYYY', updated: 'Mon DD, YYYY', reading: '0 min read' }));
  const topics = ['kyc', 'aml', 'kyb', 'travelRule', 'liveness', 'onfido', 'sumsub', 'eidas'];
  // Link rule: provider → review page; category → ranking; region → region page; anything else → topic page. No glossary.
  const TOPIC = 'Topic Page V3 (Desktop).dc.html';
  Object.entries(entities).forEach(([id, e]) => {
    if (e.type === 'company' && /^Review Page/.test(e.href)) e.type = 'provider';
    if (e.type === 'term') e.type = 'topic';
    if (e.type !== 'provider') e.href = TOPIC + '#' + id;
    delete e.def;
  });
  const glyph = { provider: '●', company: '■', topic: '#', regulation: '§', category: '▤', region: '◎' };
  const chip = (id) => ({ id, ...entities[id], glyph: glyph[entities[id].type] });
  const related = (slug, n = 3) => {
    const me = posts.find((p) => p.slug === slug);
    return posts.filter((p) => p.slug !== slug)
      .map((p) => ({ p, s: p.entities.filter((e) => me.entities.includes(e)).length }))
      .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, n).map((x) => ({ ...x.p, shared: x.s }));
  };
  window.BVBlog = { entities, posts, topics, glyph, chip, related, types: ['All', 'News', 'Guides', 'Research', 'Regulation'] };
  window.dispatchEvent(new Event('bv-blog-ready'));
})();
