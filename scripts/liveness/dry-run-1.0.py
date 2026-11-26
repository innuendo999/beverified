# Liveness 1.0 dry run (docs/scoring-liveness.md, steps version of 2026-11-25).
# Reads provider records for integration, residency, certifications, pricing model and capability notes;
# researched facts (lab letters, IAD, retention, passive, 1:N) are in the dicts below with their source in
# reports/liveness-1.0-dry-run.md. Not wired to the build.
import yaml, glob, datetime, re, sys
TODAY = datetime.date(2026, 11, 25)
W = dict(pad=20, iad=20, users=15, comp=15, data=10, integ=10, price=10)
# PAD: (level, date of tested version, BPCER public)
PAD = {'facetec':(3,'2025-10-27',True),'shufti-pro':(3,'2026-04-24',True),'sumsub':(3,'2026-09-17',False),'yoti':(3,'2026-01-23',False),
 'incode':(3,'2026-02-16',True),'jumio':(2,'2025-09-11',False),'regula':(2,'2025-12-10',False),'didit':(2,'2026-11-09',False),
 'veriff':(2,'2024-08-29',False),'persona':(2,'2023-11-16',False),'veridas':(2,'2024-04-11',False),'paravision':(2,'2023-12-28',False),
 'iproov':(2,'2020-10-01',False),'onfido':(2,'2022-06-08',False),'advance-ai':(2,'2024-09-16',False),'idnow':(1,None,False)}
# IAD step: 5 / 4.5 / 4 lab letter; 3 announced; 2.5 documented controls; 1.5 nothing
IAD = {'facetec':5,'advance-ai':4,'iproov':3,'veridas':3,'incode':3,'yoti':2.5,'shufti-pro':2.5,'veriff':2.5,'persona':2.5,
 'regula':2.5,'jumio':2.5,'sumsub':2.5,'didit':2.5,'onfido':2.5,'paravision':2.5,'idenfy':2.5,'complycube':2.5,'socure':2.5,'signzy':2.5}
PASSIVE = set('shufti-pro yoti veriff incode veridas regula didit paravision iproov advance-ai idenfy trulioo width'.split())
WCAG = {'iproov','onfido'}
RETENTION = set('sumsub veriff persona shufti-pro incode onfido didit idenfy facetec'.split())
CONSENT = {'incode','sumsub'}
ONE_N = set('didit regula veridas onfido paravision facetec'.split())
OWN_PRICE = {'kycaid':5,'didit':5}
def pad(s):
    if s not in PAD: return 1.5
    lvl,dt,bp = PAD[s]; d = datetime.date.fromisoformat(dt) if dt else None
    if d and (TODAY-d).days > 36*30.44: lvl -= 1
    sub = {3:4.5,2:4,1:3,0:1.5}[max(lvl,0)]
    if d and (TODAY-d).days <= 24*30.44: sub += 0.5
    if not bp: sub -= 0.5
    return max(1.5, min(5, sub))
def score(d):
    s=d['slug']; c=d.get('capabilities') or {}; i=d.get('integration') or {}
    st=lambda k:(c.get(k) or {}).get('status'); it=lambda k:(i.get(k) or {}).get('status')
    certs=d.get('certifications') or []
    users = 2 + (1 if s in PASSIVE else 0) + (0.5 if it('sdk_web')=='yes' else 0) + (0.5 if st('manual_review') in ('yes','add_on') else 0) + (0.5 if s in WCAG else 0)
    comp = 1.5
    if any('FIDO Face' in x['name'] and x['status']=='confirmed' for x in certs): comp += 2
    if any(x['status']=='confirmed' and re.search(r'DIATF|DVS|ETSI TS 119 461|Kantara|eIDAS',x['name']+' '+str(x.get('what',''))) for x in certs): comp += 1
    sec=[x for x in certs if re.search(r'27001|SOC 2',x['name']) and not re.search(r'27001:2013',x['name'])]  # 2013 edition invalid after 31 Oct 2025 (IAF MD 26)
    comp += 1 if any(x['status']=='confirmed' for x in sec) else (0.5 if sec else 0)
    dep=st('deployment')
    data = 1.5 + (1.5 if s in RETENTION else 0) + (1 if st('data_residency') in ('yes','partial') or dep in ('on_prem','cloud_and_on_prem') else 0) \
        + (0.5 if dep in ('on_prem','cloud_and_on_prem') else 0) + (0.5 if s in CONSENT else 0)
    sdks=sum(it(k)=='yes' for k in ('sdk_web','sdk_ios','sdk_android'))
    integ = 1 + (1 if it('docs_public')=='yes' else 0) + (1 if sdks==3 else 0.5 if sdks==2 else 0) \
        + (1 if it('sandbox')=='yes' else 0.5 if it('sandbox')=='partial' else 0) + (0.5 if st('reverification')=='yes' else 0) + (0.5 if s in ONE_N else 0)
    m=((d.get('pricing') or {}).get('model') or {}).get('published')
    price = OWN_PRICE.get(s, {'core':4,'partial':3}.get(m,2))
    sub=dict(pad=pad(s), iad=IAD.get(s,1.5), users=min(5,users), comp=min(5,comp), data=min(5,data), integ=min(5,integ), price=price)
    tot=sum(sub[k]*W[k] for k in W)/sum(W.values())
    return tot, sub
rank=yaml.safe_load(open('src/_data/rankings.yml'))['liveness-detection']['providers']
cur={e['slug']:n+1 for n,e in enumerate(rank)}
rows=[]
for f in sorted(glob.glob('src/_data/providers/*.yml')):
    d=yaml.safe_load(open(f))
    if d.get('status')!='published' or ((d.get('capabilities') or {}).get('liveness') or {}).get('status')!='yes': continue
    t,sub=score(d); rows.append((t,d['slug'],d.get('score'),sub))
rows.sort(key=lambda r:-r[0])
print('| # | Provider | Liveness 1.0 | Now (v3.1) | Rank now | PAD | IAD | Users | Compliance | Data | Integration | Price |')
print('|---|---|---|---|---|---|---|---|---|---|---|---|')
for n,(t,s,old,sub) in enumerate(rows,1):
    print(f"| {n} | {s} | {round(t+1e-9,1)} ({t:.2f}) | {old} | {cur.get(s,'-')} | "+' | '.join(str(sub[k]) for k in W)+' |')
