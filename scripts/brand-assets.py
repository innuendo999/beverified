#!/usr/bin/env python3
"""Build the downloadable brand files for /brand/ into src/assets/brand/.

Logo = the header mark (three bars, src/_includes/v3/logo.njk) + "BeVerified" in
Geist 600, letter-spacing -0.03em, with the text converted to outlines so the SVG
looks the same without the font. PNGs are rendered with headless Chrome.

Needs: pip install fonttools brotli; google-chrome on PATH.
Run: python3 scripts/brand-assets.py
"""
import pathlib, shutil, subprocess, tempfile

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src/assets/brand"
FONT = ROOT / "src/assets/fonts/Geist-Variable.woff2"
INK, ACCENT, WHITE = "#0B1730", "#1F4FD8", "#FFFFFF"

H = 80  # logo height in SVG units (mark is H x H)
MARK_SCALE = H / 24


def bars(fill):
    return (
        f'<g transform="scale({MARK_SCALE:.4f})">'
        f'<rect x="3" y="12" width="4.5" height="9" rx="1" fill="{fill}"/>'
        f'<rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="{fill}"/>'
        f'<rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="{ACCENT}"/></g>'
    )


def wordmark_path():
    font = instantiateVariableFont(TTFont(FONT), {"wght": 600})
    upm = font["head"].unitsPerEm
    cmap, glyphs, hmtx = font.getBestCmap(), font.getGlyphSet(), font["hmtx"]
    size = 17 * MARK_SCALE * 24 / 20  # header: 17px text next to a 20px mark
    scale, track = size / upm, -0.03 * size
    x0 = H + 8 * MARK_SCALE * 24 / 20
    baseline = H / 2 + font["OS/2"].sCapHeight * scale / 2
    pen, x = SVGPathPen(glyphs), 0.0
    for ch in "BeVerified":
        g = cmap[ord(ch)]
        glyphs[g].draw(TransformPen(pen, (scale, 0, 0, -scale, x0 + x, baseline)))
        x += hmtx[g][0] * scale + track
    return pen.getCommands(), int(x0 + x + 4)


def svg(w, h, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{body}</svg>\n'


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    d, w = wordmark_path()
    files = {
        "beverified-logo.svg": svg(w, H, bars(INK) + f'<path fill="{INK}" d="{d}"/>'),
        "beverified-logo-white.svg": svg(w, H, bars(WHITE) + f'<path fill="{WHITE}" d="{d}"/>'),
        "beverified-mark.svg": svg(H, H, bars(INK)),
        "beverified-mark-white.svg": svg(H, H, bars(WHITE)),
        # square avatar for social profiles: white bars on ink, rounded by the platform
        "beverified-avatar.svg": svg(H, H, f'<rect width="{H}" height="{H}" fill="{INK}"/>'
                                     f'<g transform="translate(14 14) scale(0.65)">{bars(WHITE)}</g>'),
    }
    for name, text in files.items():
        (OUT / name).write_text(text)

    chrome = shutil.which("google-chrome") or shutil.which("chromium")
    renders = [  # (svg, png, css height, viewport w, viewport h)
        ("beverified-logo.svg", "beverified-logo.png", 240, w * 3, 240),
        ("beverified-logo-white.svg", "beverified-logo-white.png", 240, w * 3, 240),
        ("beverified-mark.svg", "beverified-mark-512.png", 512, 512, 512),
        ("beverified-mark-white.svg", "beverified-mark-white-512.png", 512, 512, 512),
        ("beverified-avatar.svg", "beverified-avatar-512.png", 512, 512, 512),
    ]
    with tempfile.TemporaryDirectory() as tmp:
        for src, png, css_h, vw, vh in renders:
            page = pathlib.Path(tmp) / "p.html"
            page.write_text(f"<html><body style='margin:0;background:transparent'>"
                            f"<img src='{(OUT / src).as_uri()}' style='height:{css_h}px;display:block'></body></html>")
            subprocess.run([chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                            "--default-background-color=00000000", f"--window-size={vw},{vh}",
                            f"--screenshot={OUT / png}", page.as_uri()], check=True, capture_output=True)
    print("wrote", ", ".join(list(files) + [r[1] for r in renders]))


if __name__ == "__main__":
    main()
