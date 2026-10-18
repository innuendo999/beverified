// BeVerified — single source of truth for homepage V2 + component sheet.
// Every score, price, count and date rendered on the homepage reads from here.
(function () {
  const R = (n) => 'Review Page - ' + n + ' (Desktop).dc.html';
  const RM = (n) => 'Review Page - ' + n + '.dc.html';
  const C = (n) => 'Category Page - ' + n + ' (Desktop).dc.html';
  const CM = (n) => 'Category Page - ' + n + '.dc.html';
  const ALL = ['UK', 'EU', 'US', 'UAE', 'Singapore', 'India', 'Brazil', 'Mexico', 'Nigeria', 'Canada'];

  // uc: idv | aml | kyb | crypto ; tier: budget | mid | enterprise ; vol: s (<1k/mo) m (1k–10k) l (10k+)
  const providers = [
    { id: 'sumsub', name: 'Sumsub', page: 'Sumsub', score: 4.8, uc: ['idv', 'aml', 'kyb', 'crypto'], regions: ALL, tier: 'mid', vol: ['s', 'm', 'l'],
      price: '$1.35 / check', priceNote: '$149/mo minimum', verified: 'Jul 2026', bestFor: 'All-in-one KYC + AML',
      reason: 'IDV, AML screening and transaction monitoring on one platform.' },
    { id: 'complyadvantage', name: 'ComplyAdvantage', page: 'ComplyAdvantage', score: 4.7, uc: ['aml'], regions: ['UK', 'EU', 'US', 'UAE', 'Singapore', 'India', 'Canada'], tier: 'mid', vol: ['s', 'm', 'l'],
      price: '$99.99 / mo', priceNote: '100 entities', verified: 'Jul 2026', bestFor: 'AML screening & monitoring',
      reason: 'Real-time sanctions, PEP and adverse-media data with ongoing monitoring.' },
    { id: 'incode', name: 'Incode', page: 'Incode', score: 4.7, uc: ['idv'], regions: ['US', 'Mexico', 'Brazil', 'EU', 'UK'], tier: 'enterprise', vol: ['m', 'l'],
      price: 'Not published', priceNote: 'Sales quote', verified: 'Jul 2026', bestFor: 'Biometric onboarding at scale',
      reason: 'Face-first identity flows licensed for high-volume enterprises.' },
    { id: 'feedzai', name: 'Feedzai', page: 'Feedzai', score: 4.6, uc: ['aml'], regions: ['US', 'EU', 'UK', 'Brazil', 'Mexico', 'Canada'], tier: 'enterprise', vol: ['l'],
      price: 'Not published', priceNote: 'Sales quote', verified: 'Jul 2026', bestFor: 'Bank fraud + AML',
      reason: 'Explainable machine-learning models built for examiner review.' },
    { id: 'kycaid', name: 'KYCAID', page: 'KYCAID', score: 4.6, uc: ['idv', 'aml', 'kyb', 'crypto'], regions: ALL, tier: 'budget', vol: ['s', 'm'],
      price: '$99 / mo', priceNote: '500 verifications', verified: 'Jul 2026', bestFor: 'Configurable workflows',
      reason: 'No-code KYC/AML workflow builder with a human review fallback.' },
    { id: 'onfido', name: 'Onfido by Entrust', page: 'Onfido', score: 4.6, uc: ['idv'], regions: ['UK', 'EU', 'US', 'Canada', 'Singapore', 'UAE', 'India'], tier: 'enterprise', vol: ['m', 'l'],
      price: 'Not published', priceNote: 'Sales quote', verified: 'Jul 2026', bestFor: 'Document + biometric IDV',
      reason: 'Document and selfie checks with strong liveness detection.' },
    { id: 'regula', name: 'Regula', page: 'Regula', score: 4.6, uc: ['idv'], regions: ALL, tier: 'enterprise', vol: ['m', 'l'],
      price: 'Not published', priceNote: 'Sales quote', verified: 'Jul 2026', bestFor: 'Document forensics',
      reason: 'Document-reader SDK backed by a forensic template library.' },
    { id: 'shufti', name: 'Shufti Pro', page: 'Shufti Pro', score: 4.6, uc: ['idv', 'aml', 'kyb', 'crypto'], regions: ALL, tier: 'mid', vol: ['s', 'm', 'l'],
      price: 'Not published', priceNote: 'Sales quote', verified: 'Jul 2026', bestFor: 'Broad single-vendor coverage',
      reason: 'Identity verification, AML screening and business checks in one configurable onboarding platform for regulated teams.' },
    { id: 'unit21', name: 'Unit21', page: 'Unit21', score: 4.6, uc: ['aml', 'crypto'], regions: ['US', 'Canada', 'UK'], tier: 'enterprise', vol: ['m', 'l'],
      price: 'Not published', priceNote: 'Per capability', verified: 'Jul 2026', bestFor: 'Transaction monitoring',
      reason: 'No-code rules and case management for fraud and AML teams.' },
    { id: 'veridas', name: 'Veridas', page: 'Veridas', score: 4.6, uc: ['idv'], regions: ['EU', 'Mexico', 'Brazil', 'UK'], tier: 'enterprise', vol: ['m', 'l'],
      price: 'Not published', priceNote: 'Per module', verified: 'Jul 2026', bestFor: 'Voice + face biometrics',
      reason: 'In-house biometric engines for face and voice verification.' },
    { id: 'veriff', name: 'Veriff', page: 'Veriff', score: 4.6, uc: ['idv', 'crypto'], regions: ALL, tier: 'budget', vol: ['s', 'm', 'l'],
      price: '$49 / mo', priceNote: 'Essential plan', verified: 'Jul 2026', bestFor: 'Self-serve IDV',
      reason: 'Published self-serve tiers with fast, selfie-first verification.' },
    { id: 'jumio', name: 'Jumio', page: 'Jumio', score: 4.5, uc: ['idv', 'aml'], regions: ['US', 'UK', 'EU', 'Canada', 'Singapore', 'UAE', 'India', 'Brazil', 'Mexico'], tier: 'enterprise', vol: ['m', 'l'],
      price: 'Not published', priceNote: 'Sales quote', verified: 'Jul 2026', bestFor: 'Enterprise IDV',
      reason: 'Mature fraud models and wide regional data-centre coverage.' },
    { id: 'seon', name: 'SEON', page: 'SEON', score: 4.5, uc: ['aml', 'crypto'], regions: ['UK', 'EU', 'US', 'Brazil', 'Mexico', 'India', 'Singapore'], tier: 'mid', vol: ['s', 'm'],
      price: '$699 / mo', priceNote: 'Starter plan', verified: 'Jul 2026', bestFor: 'Fraud signals + AML',
      reason: 'Digital-footprint fraud scoring with AML screening attached.' },
    { id: 'trulioo', name: 'Trulioo', page: 'Trulioo', score: 4.5, uc: ['idv', 'kyb'], regions: ALL, tier: 'mid', vol: ['m', 'l'],
      price: 'Not published', priceNote: '≈$99/mo · third-party estimate', verified: 'Jul 2026', bestFor: 'Global registry reach',
      reason: 'One network for person and business verification worldwide.' },
    { id: 'idmerit', name: 'IDMERIT', page: 'IDMERIT', score: 4.3, uc: ['idv'], regions: ['US', 'India', 'Mexico', 'Brazil', 'Canada'], tier: 'budget', vol: ['s', 'm'],
      price: '$0.10 / user / mo', priceNote: 'Basic plan', verified: 'Jul 2026', bestFor: 'Low-cost data checks',
      reason: 'Data-source identity checks at one of the lowest entry prices.' },
  ].map((p) => ({ ...p, href: R(p.page), mHref: RM(p.page) }));

  // All 46 reviewed providers (one review page each).
  const reviewed = ['Advance.AI', 'AiPrise', 'AMLRanger', 'AU10TIX', 'Castellum.AI', 'ComplyAdvantage', 'ComplyCube', 'Feedzai', 'Fourthline', 'FullCircl',
    'GBG', 'Hawk AI', 'HorusCheck', 'iDenfy', 'IDMERIT', 'IDnow', 'Incode', 'Jumio', 'KYC Hub', 'KYC360', 'KYCAID', 'MemberCheck', 'NameScan', 'Napier',
    'NICE Actimize', 'Onfido', 'Persona', 'Quantexa', 'Regula', 'RelyComply', 'Sanction Scanner', 'Sardine', 'SEON', 'Shufti Pro', 'Signicat', 'Signzy',
    'SmartSearch', 'Strise', 'Sumsub', 'Trulioo', 'Unit21', 'Veridas', 'Veriff', 'Verified', 'VerifyMy', 'Vespia']
    .map((n) => ({ name: n, href: R(n), mHref: RM(n) }));

  const useCases = [
    { id: 'aml', name: 'AML', def: 'Screening against sanctions, PEP and adverse-media lists, plus ongoing transaction monitoring.', top3: ['Sumsub', 'ComplyAdvantage', 'Trulioo'], count: 10, page: 'Best AML Software Providers' },
    { id: 'kyb', name: 'KYB', def: 'Verifying a business, its registry record and its ultimate beneficial owners.', top3: ['KYCAID', 'Veriff', 'Trulioo'], count: 7, page: 'Best KYB Solution Providers' },
    { id: 'idv', name: 'eKYC / Identity Verification', def: 'Remote checks that a person is who they claim, from document plus selfie.', top3: ['KYCAID', 'Veriff', 'Onfido'], count: 4, page: 'Top Identity Verification Companies' },
    { id: 'live', name: 'Liveness Detection', def: 'Proving a real, present person is on camera, not a photo, mask or deepfake.', top3: ['iProov', 'FaceTec', 'Onfido'], count: 4, page: 'Liveness Detection Providers' },
    { id: 'crypto', name: 'Crypto KYC', def: 'Onboarding checks for exchanges and wallets, often paired with wallet screening.', top3: ['KYCAID', 'Sumsub', 'ComplyAdvantage'], count: 5, page: 'Top Crypto KYC Providers' },
    { id: 'travel', name: 'Travel Rule', def: 'Exchanging originator and beneficiary data between VASPs under FATF R.16.', top3: ['Notabene', 'Sygna Bridge', 'VerifyVASP'], count: 4, page: 'Crypto Travel Rule Providers' },
    { id: 'banks', name: 'AML for Banks', def: 'Monitoring and case management built for Tier-1 volume and examiner review.', top3: ['ComplyAdvantage', 'NICE Actimize', 'Feedzai'], count: 4, page: 'AML for Banks' },
    { id: 'budget', name: 'Budget KYC', def: 'Providers with published per-check or monthly pricing and low minimums.', top3: ['KYCAID', 'Ondato', 'Sumsub'], count: 4, page: 'Cheap KYC Providers' },
  ].map((u) => ({ ...u, href: C(u.page), mHref: CM(u.page) }));

  // Map-like index: x/y are % positions on an equirectangular grid (lon/lat), not a drawn map.
  const regions = [
    { id: 'uk', name: 'United Kingdom', short: 'UK', reg: 'FCA', x: 49.6, y: 21, page: null },
    { id: 'eu', name: 'European Union', short: 'EU', reg: 'AMLA', x: 53, y: 24, page: null },
    { id: 'us', name: 'United States', short: 'US', reg: 'FinCEN', x: 23, y: 31, page: null },
    { id: 'uae', name: 'UAE', short: 'UAE', reg: 'CBUAE', x: 65.5, y: 36.5, page: null },
    { id: 'sg', name: 'Singapore', short: 'Singapore', reg: 'MAS', x: 78.8, y: 49.2, page: null },
    { id: 'in', name: 'India', short: 'India', reg: 'RBI', x: 71, y: 38, page: 'KYC Providers in India', top: ['KYCAID', 'Signzy', 'Onfido'], count: 4 },
    { id: 'br', name: 'Brazil', short: 'Brazil', reg: 'BACEN', x: 36, y: 63, page: 'KYC Providers in Brazil', top: ['KYCAID', 'Sumsub', 'idwall'], count: 4 },
    { id: 'mx', name: 'Mexico', short: 'Mexico', reg: 'CNBV', x: 22, y: 39, page: 'KYC Providers in Mexico', top: ['KYCAID', 'Sumsub', 'Veriff'], count: 4 },
    { id: 'ng', name: 'Nigeria', short: 'Nigeria', reg: 'CBN', x: 52, y: 45, page: null },
    { id: 'ca', name: 'Canada', short: 'Canada', reg: 'FINTRAC', x: 22, y: 22, page: 'KYC Providers in Canada', top: ['KYCAID', 'Veriff', 'Onfido'], count: 4 },
    { id: 'pe', name: 'Peru', short: 'Peru', reg: 'SBS', x: 29, y: 56, page: 'KYC Providers in Peru', top: ['KYCAID', 'Sumsub', 'Veriff'], count: 4 },
  ].map((r) => ({ ...r, href: r.page ? C(r.page) : 'Reviews Directory - BeVerified (Desktop).dc.html', mHref: r.page ? CM(r.page) : 'Reviews Directory - BeVerified.dc.html' }));

  const rubric = [
    { name: 'Compliance & certifications', weight: 25 },
    { name: 'Coverage', weight: 20 },
    { name: 'Pricing transparency', weight: 20 },
    { name: 'Integration & API depth', weight: 15 },
    { name: 'Support responsiveness', weight: 10 },
    { name: 'Track record', weight: 10 },
  ];

  const sponsors = [
    { id: 'veriff', variant: 'high', positioning: 'Self-serve identity verification with published monthly plans.' },
    { id: 'idmerit', variant: 'low', positioning: 'Low-cost identity data checks for US and emerging markets.' },
    { id: 'seon', variant: 'mid', positioning: 'Fraud signals and AML screening from one API.' },
  ];

  const reviewer = { name: 'Andrii Klymenko', credential: '', role: 'Author & editor, BeVerified', photo: 'authors/andrii-klymenko.png', href: '#author-andrii-klymenko', linkedin: 'https://www.linkedin.com/in/klymenkoandrii/' };

  const meta = {
    lastVerified: 'Jul 24, 2026',
    lastVerifiedShort: 'Jul 2026',
    countriesCovered: '40+',
    methodologyVersion: 'v2.3',
    recheck: 'Every 90 days',
    disclosure: 'We may earn a commission from some links. Payment never changes scores or ranking order.',
    placementLine: 'Placements are labelled and never affect scores.',
  };

  const byId = Object.fromEntries(providers.map((p) => [p.id, p]));
  const sorted = providers.slice().sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  meta.providersReviewed = reviewed.length;
  meta.regionGuides = regions.filter((r) => r.page).length;

  // V3: editor-approved scores only. Order = score, ties keep this order.
  const logos = { sumsub: 'logos/sumsub.png', complyadvantage: 'logos/complyadvantage.png', onfido: 'logos/onfido.png', kycaid: 'logos/kycaid.png', feedzai: 'logos/feedzai.png', trulioo: 'logos/trulioo.png', jumio: 'logos/jumio.png', seon: 'logos/seon.png' };
  const editorialTop = ['sumsub', 'complyadvantage', 'onfido', 'kycaid', 'feedzai', 'trulioo', 'jumio', 'seon'].map((id) => ({ ...byId[id], logo: logos[id] }));
  const tagNames = { idv: 'IDV', aml: 'AML', kyb: 'KYB', crypto: 'Crypto' };
  // Quick picks (hero). Labels follow the category pages: Crypto KYC #1 = KYCAID; AML ranking 'Best Budget Option' = Trulioo.
  const quickPicks = [
    { label: 'Best overall', id: 'sumsub' },
    { label: 'Best for crypto', id: 'kycaid' },
    { label: 'Best budget option', id: 'trulioo' },
  ].map((q) => ({ ...q, ...byId[q.id], logo: logos[q.id] }));

  window.BV = { providers, sorted, byId, reviewed, useCases, regions, rubric, sponsors, reviewer, meta, logos, editorialTop, tagNames, quickPicks };
  window.dispatchEvent(new Event('bv-data-ready'));
})();
