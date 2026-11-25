W=[.30,.15,.10,.10,.10,.10,.05]  # c1..c7, c8 pricing .10 separate
P={ # points c1..c7, pricing sub c8
'21 Analytics':([3.0,2,3,1,3.5,3*4/3.5,2],2),
'Notabene':([1.25,2.5,3.5,2,2,4,1.5],3),
'CryptoSwift':([3.75,3,2.5,3,1.5,2,2],4),
'VerifyVASP':([2.0,3.5,2,1,3,1.5,0.5],2),
'TRP':([1.0,1,2,0,0,1,0],4),
'Blockpass':([1.5,2,1,0,0,0,2.5],3),
'Ospree':([4.0,2.5,1,1,0.5,1.5,1.5],2),
'WIDTH':([2.0,3,2.5,2,3.5,0.5,1.5],2),
'CODE':([3.0,3,1.5,1,2.5,1.5,0.5],2),
'LedgerBrain':([0,2,0,1,0,0.5,0.5],2)}
# B: effective named reachable participants (own list + confirmed x1, vendor-stated x0.5)
N={'21 Analytics':98,'Ospree':122+253*0.5,'CryptoSwift':253+122,'CODE':260,'VerifyVASP':39,'WIDTH':39*0.5}
def score(pts,c8,bonus=0,cal=False):
    p=pts[:]; p[0]=min(4,p[0]+bonus)
    mx=[4,4,4,4,4,4,4]
    if cal:
        best=[max(P[k][0][i] for k in P) for i in range(7)]
        mx=[max(3,min(4,b)) for b in best]
    subs=[1+4*min(p[i],mx[i])/mx[i] for i in range(7)]
    return sum(s*w for s,w in zip(subs,W))+c8*.10, subs
rows=[]
for k,(pts,c8) in P.items():
    a,subs=score(pts,c8); b,_=score(pts,c8,min(1,N.get(k,0)/300)); ac,_=score(pts,c8,cal=True); bc,_=score(pts,c8,min(1,N.get(k,0)/300),cal=True)
    rows.append((k,a,b,ac,bc,subs+[c8]))
for r in sorted(rows,key=lambda r:-r[2]):
    print(f"{r[0]:13s} A={r[1]:.2f} B={r[2]:.2f} A+cal={r[3]:.2f} B+cal={r[4]:.2f} | "+" ".join(f"{x:.2f}" for x in r[5]))
best=[max(P[k][0][i] for k in P) for i in range(7)]; print('best per criterion',best)
