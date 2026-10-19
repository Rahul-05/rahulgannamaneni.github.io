"""Card cover and logo for the mise case study.

Same language as the Guide, Keka and CPP covers: a bright saturated ground,
the wordmark centred with room around it, and real pieces of the product
floating at an angle with a real shadow under them. Every piece in
scripts/mise-parts/ was lifted straight out of the running apps by
mealkit/scripts/capture-parts.mjs, so the cover is the product, not a
drawing of it: the packed kraft box from the 3D scene, a menu card, the
shipping label and Bowlie.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import os

W, H = 1700, 670
HERE = os.path.dirname(__file__)
PARTS = os.path.join(HERE, 'mise-parts')
OUT = os.path.join(HERE, '..', 'public', 'work', 'mise')
os.makedirs(OUT, exist_ok=True)

TOMATO = (240, 83, 47)
DEEP = (214, 58, 30)
BUTTER = (255, 186, 92)
CREAM = (251, 243, 232)


def part(name):
    im = Image.open(os.path.join(PARTS, name + '.png')).convert('RGBA')
    # near-invisible capture fringe would otherwise cast a boxy shadow
    im.putalpha(im.getchannel('A').point(lambda v: 0 if v < 24 else v))
    return im


def soften_edges(im, margin=0.16):
    """Fade an image out toward its edges, so a floor shadow that was cut
    off by the capture dissolves instead of ending in a hard line."""
    w, h = im.size
    m = Image.new('L', (w, h), 0)
    ImageDraw.Draw(m).ellipse((-w * 0.12, -h * 0.05, w * 1.06, h * 1.02), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(min(w, h) * margin))
    im.putalpha(ImageChops.multiply(im.getchannel('A'), m))
    return im


def ground():
    g = Image.new('RGB', (W, H))
    px = g.load()
    for y in range(H):
        for x in range(0, W, 2):
            t = x / W * 0.7 + (1 - y / H) * 0.3
            a, b, k = (DEEP, TOMATO, t / 0.55) if t < 0.55 else (TOMATO, BUTTER, (t - 0.55) / 0.45)
            col = tuple(int(a[i] + (b[i] - a[i]) * min(k, 1)) for i in range(3))
            px[x, y] = col
            if x + 1 < W:
                px[x + 1, y] = col
    # warm bloom behind the wordmark keeps the centre the brightest point
    bloom = Image.new('L', (W, H), 0)
    ImageDraw.Draw(bloom).ellipse((W // 2 - 420, H // 2 - 200, W // 2 + 420, H // 2 + 200), fill=70)
    bloom = bloom.filter(ImageFilter.GaussianBlur(140))
    return Image.composite(Image.new('RGB', (W, H), (255, 214, 170)), g, bloom)


def grain(img, amount=6):
    n = Image.effect_noise((W, H), 26).convert('L')
    return Image.blend(img, Image.merge('RGB', (n, n, n)), amount / 100)


def place(canvas, im, x, y, h, rot=0, shadow=True):
    """Scale to height h, rotate, drop a soft shadow, paste with top-left at x, y."""
    im = im.resize((int(im.width * h / im.height), h), Image.LANCZOS)
    im = im.rotate(rot, resample=Image.BICUBIC, expand=True)
    if shadow:
        # padded so the blur has room to fall off instead of clipping square
        pad = 80
        a = Image.new('L', (im.width + pad * 2, im.height + pad * 2), 0)
        a.paste(im.getchannel('A').point(lambda v: int(v * 0.3)), (pad, pad))
        a = a.filter(ImageFilter.GaussianBlur(28))
        sh = Image.new('RGBA', a.size, (70, 20, 0, 0))
        sh.putalpha(a)
        canvas.alpha_composite(sh, (x + 10 - pad, y + 26 - pad))
    canvas.alpha_composite(im, (x, y))


def recolor(im, rgb):
    """Navy ink to `rgb`, the green pea left alone."""
    px = im.load()
    for yy in range(im.height):
        for xx in range(im.width):
            r, g, b, a = px[xx, yy]
            if a and r < 90 and g < 90:
                px[xx, yy] = (*rgb, a)
    return im


cover = ground().convert('RGBA')

# the packed box, bottom left, running off the edge like a box on a doorstep
box = part('box')
box = soften_edges(box.crop(box.getchannel('A').getbbox()))
place(cover, box, 10, 215, 420, rot=3, shadow=False)

# a menu card, right, tilted the other way
place(cover, part('meal-card'), 1250, 120, 540, rot=-8)

# the shipping label slapped on top right
place(cover, part('label'), 1120, 40, 120, rot=7)

# wordmark, cream, centred
wm = recolor(part('wordmark'), CREAM)
ww = 560
wm = wm.resize((ww, int(wm.height * ww / wm.width)), Image.LANCZOS)
cover.alpha_composite(wm, ((W - ww) // 2, (H - wm.height) // 2 - 30))

# Bowlie, under the wordmark and a little right, looking pleased
bowlie = part('bowlie')
bowlie = bowlie.crop(bowlie.getchannel('A').getbbox())
place(cover, bowlie, 930, 420, 190, rot=-4)

out = grain(cover.convert('RGB'))
out.save(os.path.join(OUT, 'cover.webp'), quality=90)

# logo for the card header: the app icon
icon = part('app-icon')
icon = icon.crop(icon.getchannel('A').getbbox()).resize((160, 160), Image.LANCZOS)
icon.save(os.path.join(OUT, 'logo.webp'), quality=92)
print('wrote', OUT)
