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



# ---- Site icons and default og:image (identity palette, 2026-11-20) ----
GROUND, FAINT_BAR, MID_BAR, MUTED = "#F3F6FA", "#DDE3EC", "#C9D2E0", "#8A95AB"


def render(html, png, w, h, transparent=False):
    chrome = shutil.which("google-chrome") or shutil.which("chromium")
    with tempfile.TemporaryDirectory() as tmp:
        page = pathlib.Path(tmp) / "p.html"
        page.write_text(html)
        args = [chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                f"--window-size={w},{h}", f"--screenshot={png}", page.as_uri()]
        if transparent:
            args.insert(-1, "--default-background-color=00000000")
        subprocess.run(args, check=True, capture_output=True)


def site_icons():
    from PIL import Image
    (OUT / "favicon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><style>.i{fill:%s}'
        '@media (prefers-color-scheme:dark){.i{fill:%s}}</style>'
        '<rect x="3" y="15" width="7" height="14" rx="1.5" class="i"/>'
        '<rect x="12.5" y="9" width="7" height="20" rx="1.5" class="i"/>'
        '<rect x="22" y="3" width="7" height="26" rx="1.5" fill="%s"/></svg>\n' % (INK, GROUND, ACCENT))
    tile = (OUT / "beverified-mark.svg").as_uri()
    for name, size in (("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)):
        pad = round(size * 0.14)
        render(f"<html><body style='margin:0;background:{GROUND}'><img src='{tile}' "
               f"style='display:block;width:{size - 2 * pad}px;margin:{pad}px'></body></html>", OUT / name, size, size)
        Image.open(OUT / name).convert("RGB").save(OUT / name)
    ico_src = OUT / "_ico.png"
    render(f"<html><body style='margin:0;background:transparent'><img src='{(OUT / 'favicon.svg').as_uri()}' "
           "style='display:block;width:48px'></body></html>", ico_src, 48, 48, transparent=True)
    im = Image.open(ico_src).convert("RGBA")
    for target in (OUT / "favicon.ico", ROOT / "src/favicon.ico"):
        im.save(target, sizes=[(16, 16), (32, 32), (48, 48)])
    ico_src.unlink()


def og_default():
    font = FONT.as_uri()
    logo = (OUT / "beverified-logo.svg").as_uri()
    html = f"""<html><head><style>
@font-face {{ font-family: Geist; src: url('{font}') format('woff2'); font-weight: 100 900; }}
body {{ margin: 0; width: 1200px; height: 630px; background: {GROUND}; font-family: Geist; position: relative; overflow: hidden; }}
.logo {{ position: absolute; left: 84px; top: 76px; height: 38px; }}
h1 {{ position: absolute; left: 80px; top: 268px; margin: 0; font-size: 76px; line-height: 1.0; letter-spacing: -0.04em; font-weight: 600; color: {INK}; z-index: 1; }}
h1 span {{ color: {MUTED}; }}
.url {{ position: absolute; left: 82px; top: 528px; font-size: 26px; color: #3D4A63; letter-spacing: -0.01em; }}
.bar {{ position: absolute; bottom: 0; width: 74px; border-radius: 10px 10px 0 0; }}
</style></head><body>
<img class="logo" src="{logo}">
<div class="bar" style="left:854px;height:190px;background:{FAINT_BAR}"></div>
<div class="bar" style="left:950px;height:290px;background:{MID_BAR}"></div>
<div class="bar" style="left:1046px;height:400px;background:{ACCENT}"></div>
<h1>Find the right KYC &amp;<br>AML provider.<br><span>Independently reviewed.</span></h1>
<div class="url">beverified.org</div>
</body></html>"""
    render(html, OUT / "og-default.png", 1200, 630)
    from PIL import Image
    Image.open(OUT / "og-default.png").convert("RGB").save(OUT / "og-default.png", optimize=True)


if __name__ == "__main__":
    main()
    site_icons()
    og_default()
