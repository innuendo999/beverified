"""Write src/_data/logoTiles.json: how the header menu frames each provider logo.

For every provider record with logo.src, read the image once and store the tile
background (the logo's own corner colour, white when transparent) and the fit:
"cover" when the image is already a 16:9 tile, otherwise "contain" so nothing is cut.
Run again after adding or replacing a logo: python3 scripts/menu-logo-tiles.py
"""
import json, pathlib, yaml
from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent
out = {}
for f in sorted((root / "src/_data/providers").glob("*.yml")):
    rec = yaml.safe_load(f.read_text())
    src = (rec.get("logo") or {}).get("src")
    if not src or src.endswith(".svg"):
        continue
    path = root / "src" / src.lstrip("/")
    if not path.exists():
        continue
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    r, g, b, a = im.getpixel((2, 2))
    bg = "#FFFFFF" if a < 200 else "#%02X%02X%02X" % (r, g, b)
    ratio = w / h
    out[f.stem] = {"bg": bg, "fit": "cover" if a >= 200 and 1.6 <= ratio <= 1.85 else "contain"}
(root / "src/_data/logoTiles.json").write_text(json.dumps(out, indent=2) + "\n")
print(len(out), "logos")
