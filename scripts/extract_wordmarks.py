"""Extract transparent wordmarks from the old banner images in src/assets/img/logos.
Writes candidates to an output folder for review; does not touch the site.
python3 scripts/extract_wordmarks.py <outdir> [slug ...]
"""
import sys, pathlib, collections
from PIL import Image
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src/assets/img/logos"
INK = np.array([20, 20, 26])

TOP_ONLY = {"advance-ai"}  # drop the tagline line under the wordmark

def extract(path, out):
    im = Image.open(path).convert("RGBA"); a = np.asarray(im).astype(float)
    rgb = a[..., :3]; h, w = rgb.shape[:2]
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    bg = np.median(border, axis=0)
    spread = np.median(np.abs(border - bg).sum(1))
    if spread > 40: return "background not uniform"
    dist = np.sqrt(((rgb - bg) ** 2).sum(-1))
    alpha = np.clip((dist - 25) / 90, 0, 1)
    if alpha.mean() < 0.003: return "no logo found"
    lumf = lambda c: c[..., 0] * 0.299 + c[..., 1] * 0.587 + c[..., 2] * 0.114
    logo_px = alpha > 0.6
    # recolour when the logo is lighter than its background (white logo on a coloured or dark banner)
    dark_bg = logo_px.any() and lumf(rgb)[logo_px].mean() > lumf(bg[None, :])[0] + 20
    if dark_bg:
        # light logo on dark background: keep colourful parts, turn near-white parts into ink
        lum = rgb.mean(-1); sat = rgb.max(-1) - rgb.min(-1)
        col = np.where(((lum > 170) & (sat < 60))[..., None], INK, rgb)
    else:
        # un-blend from the background colour so anti-aliased edges stay clean
        al = np.maximum(alpha, 1e-3)[..., None]
        col = np.clip((rgb - bg * (1 - al)) / al, 0, 255)
    # bands of rows with content; drop small tagline bands
    rows = alpha.sum(1) > 1.5
    bands, start = [], None
    for y, r in enumerate(list(rows) + [False]):
        if r and start is None: start = y
        if not r and start is not None:
            bands.append([start, y]); start = None
    merged = []
    for b in bands:
        if merged and b[0] - merged[-1][1] < max(4, h * 0.012): merged[-1][1] = b[1]
        else: merged.append(b)
    if not merged: return "no logo found"
    tallest = max(b[1] - b[0] for b in merged)
    keep = [b for b in merged if (b[1] - b[0]) >= 0.35 * tallest]
    if path.stem in TOP_ONLY: keep = keep[:1]
    mask = np.zeros(h, bool)
    for b in keep: mask[b[0]:b[1]] = True
    alpha[~mask] = 0
    ys, xs = np.where(alpha > 0.15)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    outa = np.dstack([col, alpha * 255])[y0:y1, x0:x1]
    img = Image.fromarray(outa.astype("uint8"), "RGBA")
    if img.height > 120: img = img.resize((round(img.width * 120 / img.height), 120), Image.LANCZOS)
    img.save(out, optimize=True)
    return f"ok {img.width}x{img.height} {'recoloured' if dark_bg else 'original colours'}"

outdir = pathlib.Path(sys.argv[1]); outdir.mkdir(parents=True, exist_ok=True)
only = set(sys.argv[2:])
for f in sorted(SRC.iterdir()):
    slug = f.stem
    if only and slug not in only: continue
    if f.suffix == ".svg": continue
    print(f"{slug:18s} {extract(f, outdir / f'{slug}.png')}")
