"""Covers for the four CPP case studies.

Same language as the Guide and Keka covers: a bright saturated ground, the
client wordmark centred with clear space around it, and real components from
the product floating at a slight angle with a real shadow under them. The
components are drawn from the actual screens -- the portal's data product
card, the agent dashboard's bar chart, the ingestion stepper and its error
panel, the domain model's relationship row -- so the cover reads as the
product rather than as decoration.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import math, random, os

W, H = 1700, 670
ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'work')
F = '/System/Library/Fonts/Supplemental/'
def font(name, size):
    return ImageFont.truetype(F + name, size)

BOLD, REG, MED = 'Arial Bold.ttf', 'Arial.ttf', 'Arial Bold.ttf'

INK      = (24, 32, 48)
MUTE     = (128, 138, 156)
LINE     = (228, 232, 240)
BLUE     = (37, 99, 235)
GREEN    = (22, 163, 74)
GREEN_BG = (222, 247, 232)
RED      = (220, 38, 38)
RED_BG   = (254, 235, 235)


# ── ground ───────────────────────────────────────────────────────────────
def ground(a, b, c):
    """Diagonal three-stop gradient, bright end top-right."""
    g = Image.new('RGB', (W, H))
    px = g.load()
    for y in range(H):
        for x in range(0, W, 2):
            t = (x / W * 0.72 + (1 - y / H) * 0.28)
            if t < 0.5:
                k = t / 0.5
                col = tuple(int(a[i] + (b[i] - a[i]) * k) for i in range(3))
            else:
                k = (t - 0.5) / 0.5
                col = tuple(int(b[i] + (c[i] - b[i]) * k) for i in range(3))
            px[x, y] = col
            if x + 1 < W:
                px[x + 1, y] = col
    # a soft bloom behind the wordmark keeps the centre the brightest point
    bloom = Image.new('L', (W, H), 0)
    ImageDraw.Draw(bloom).ellipse((W // 2 - 430, H // 2 - 230, W // 2 + 430, H // 2 + 230), fill=90)
    bloom = bloom.filter(ImageFilter.GaussianBlur(150))
    g = Image.composite(Image.new('RGB', (W, H), (255, 255, 255)), g, bloom.point(lambda v: v))
    return g


def grain(img, amount=7):
    n = Image.effect_noise((W, H), 26).convert('L')
    n = ImageChops.multiply(n, Image.new('L', (W, H), 255))
    return Image.blend(img, Image.merge('RGB', (n, n, n)), amount / 100)


# ── card primitives ──────────────────────────────────────────────────────
S = 3  # supersample for the floating panels


def panel(w, h, r=14):
    """A white card at S× with room in the canvas for its shadow."""
    pad = 60
    im = Image.new('RGBA', ((w + pad * 2) * S, (h + pad * 2) * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    box = (pad * S, pad * S, (pad + w) * S, (pad + h) * S)
    d.rounded_rectangle(box, r * S, fill=(255, 255, 255, 255))
    return im, d, pad


def shadow_of(card, blur=26, alpha=115, dy=16):
    sh = Image.new('RGBA', card.size, (0, 0, 0, 0))
    sh.paste((0, 0, 0, alpha), (0, 0), card.split()[3])
    sh = sh.filter(ImageFilter.GaussianBlur(blur * S))
    return sh, dy


def place(bg, card, cx, cy, angle, scale=1.0):
    """Rotate, shrink to 1×, drop the shadow, paste centred on (cx, cy)."""
    sh, dy = shadow_of(card)
    for layer, off in ((sh, dy), (card, 0)):
        r = layer.rotate(angle, resample=Image.BICUBIC, expand=True)
        r = r.resize((max(1, int(r.width * scale / S)), max(1, int(r.height * scale / S))), Image.LANCZOS)
        bg.alpha_composite(r, (int(cx - r.width / 2), int(cy - r.height / 2 + off)))


def check(d, cx, cy, size, col, w=2):
    """A drawn tick -- Arial has no glyph for one."""
    r = size / 2
    d.line([v * S for v in (cx - r * 0.62, cy + r * 0.05,
                            cx - r * 0.14, cy + r * 0.52,
                            cx + r * 0.66, cy - r * 0.48)],
           fill=col, width=int(w * S), joint='curve')


def txt(d, xy, s, f, fill, anchor='la'):
    d.text([v * S for v in xy], s, font=f, fill=fill, anchor=anchor)


def rr(d, box, r, **kw):
    d.rounded_rectangle([v * S for v in box], r * S, **kw)


def ln(d, box, **kw):
    d.line([v * S for v in box], **kw)


def chip(d, x, y, label, fg, bg, f, ph=9, pw=9, dot=False):
    w = d.textlength(label, font=f) / S
    h = f.size / S + ph
    rr(d, (x, y, x + w + pw * 2 + (12 if dot else 0), y + h), h / 2, fill=bg)
    if dot:
        d.ellipse([v * S for v in (x + pw, y + h / 2 - 3, x + pw + 6, y + h / 2 + 3)], fill=fg)
    txt(d, (x + pw + (12 if dot else 0), y + h / 2), label, f, fg, 'lm')
    return x + w + pw * 2 + (12 if dot else 0)


def skeleton(d, x, y, w, rows, gap=13, h=6, col=(226, 230, 238), last=0.62):
    for i in range(rows):
        ww = w * (last if i == rows - 1 else 1.0)
        rr(d, (x, y + i * gap, x + ww, y + i * gap + h), h / 2, fill=col)


# ── connector lines, as on the Keka cover ────────────────────────────────
def connector(bg, pts, arrow=True, dot=True, col=(255, 255, 255, 150), w=3):
    lay = Image.new('RGBA', (W * 2, H * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    p = [(x * 2, y * 2) for x, y in pts]
    d.line(p, fill=col, width=w * 2, joint='curve')
    if dot:
        d.ellipse((p[0][0] - 9, p[0][1] - 9, p[0][0] + 9, p[0][1] + 9), fill=col)
    if arrow:
        (x1, y1), (x2, y2) = p[-2], p[-1]
        a = math.atan2(y2 - y1, x2 - x1)
        s = 17
        d.polygon([(x2, y2),
                   (x2 - s * math.cos(a - 0.42), y2 - s * math.sin(a - 0.42)),
                   (x2 - s * math.cos(a + 0.42), y2 - s * math.sin(a + 0.42))], fill=col)
    bg.alpha_composite(lay.resize((W, H), Image.LANCZOS))


# ── the wordmark ─────────────────────────────────────────────────────────
def wordmark(bg, width=486):
    m = Image.open(os.path.join(ROOT, 'shared', 'cpp-investments.webp')).convert('RGBA')
    m = m.resize((width, int(m.height * width / m.width)), Image.LANCZOS)
    white = Image.new('RGBA', m.size, (255, 255, 255, 255))
    white.putalpha(m.split()[3])
    x, y = (W - width) // 2, (H - white.height) // 2
    glow = Image.new('RGBA', bg.size, (0, 0, 0, 0))
    glow.paste(white, (x, y))
    bg.alpha_composite(glow.filter(ImageFilter.GaussianBlur(26)).point(
        lambda v: v), (0, 0)) if False else None
    bg.alpha_composite(white, (x, y))


# ══════════════════════════════════════════════════════════════════════════
# 01 · portal — the data product card, the search bar, a quality gauge
# ══════════════════════════════════════════════════════════════════════════
def portal():
    bg = ground((16, 52, 148), (28, 92, 214), (56, 170, 240)).convert('RGBA')

    # search bar with its suggestion chips and the blue Search button
    c, d, p = panel(430, 62)
    f = font(REG, 13 * S); fb = font(BOLD, 12 * S)
    d.ellipse([v * S for v in (p + 18, p + 24, p + 32, p + 38)], outline=MUTE, width=2 * S)
    txt(d, (p + 42, p + 31), 'Search data products', f, MUTE, 'lm')
    rr(d, (p + 300, p + 18, p + 412, p + 44), 6, fill=BLUE)
    txt(d, (p + 356, p + 31), 'Search', fb, (255, 255, 255), 'mm')
    place(bg, c, 300, 128, 6, 0.94)

    # the data product card, the unit the whole portal is built from
    c, d, p = panel(272, 168)
    ft = font(BOLD, 16 * S); fs = font(REG, 11 * S); fc = font(BOLD, 10 * S)
    rr(d, (p, p, p + 272, p + 5), 0, fill=(23, 78, 190))
    txt(d, (p + 20, p + 30), 'Active Risk', ft, INK)
    skeleton(d, p + 20, p + 62, 232, 3)
    ln(d, (p + 20, p + 118, p + 252, p + 118), fill=LINE, width=1 * S)
    chip(d, p + 20, p + 130, 'Ready', GREEN, GREEN_BG, fc, dot=True)
    rr(d, (p + 168, p + 128, p + 252, p + 152), 6, fill=(240, 245, 252))
    txt(d, (p + 210, p + 140), '✦ Data Q&A', fc, BLUE, 'mm')
    place(bg, c, 232, 424, -7, 1.0)

    # the quality score, the reason to trust any of it
    c, d, p = panel(150, 150, r=16)
    box = (p + 26, p + 22, p + 124, p + 120)
    d.arc([v * S for v in box], 0, 360, fill=(235, 239, 246), width=13 * S)
    d.arc([v * S for v in box], -90, 208, fill=(22, 163, 74), width=13 * S)
    txt(d, (p + 75, p + 68), '83', font(BOLD, 30 * S), INK, 'mm')
    txt(d, (p + 75, p + 132), 'QUALITY SCORE', font(BOLD, 9 * S), MUTE, 'mm')
    place(bg, c, 1440, 200, 8, 1.0)

    # a department row from the browse grid
    c, d, p = panel(250, 96)
    fb2 = font(BOLD, 13 * S); fs2 = font(REG, 10 * S)
    for i, (name, n) in enumerate((('Risk', '21'), ('Finance', '14'))):
        y = p + 22 + i * 38
        rr(d, (p + 18, y, p + 34, y + 16), 4, fill=(219, 232, 254))
        txt(d, (p + 44, y + 8), name, fb2, INK, 'lm')
        txt(d, (p + 228, y + 8), n, fs2, MUTE, 'rm')
        if i == 0:
            ln(d, (p + 18, y + 27, p + 232, y + 27), fill=LINE, width=1 * S)
    place(bg, c, 1418, 486, -5, 1.0)

    connector(bg, [(470, 178), (556, 178), (556, 262)])
    connector(bg, [(1268, 470), (1180, 470), (1180, 392)])
    wordmark(bg)
    return grain(bg.convert('RGB'))


# ══════════════════════════════════════════════════════════════════════════
# 02 · agent — questions by department, the donut, a ranked row
# ══════════════════════════════════════════════════════════════════════════
def agent():
    bg = ground((58, 22, 140), (108, 44, 208), (176, 92, 246)).convert('RGBA')

    # the bar chart that told the team who was actually asking
    c, d, p = panel(300, 176)
    ft = font(BOLD, 12 * S); fs = font(REG, 9 * S)
    txt(d, (p + 20, p + 22), 'Questions by Department', ft, INK)
    rows = [('Technology & Ops', 1.00, '93'), ('Finance', 0.42, '30'),
            ('Risk', 0.26, '18'), ('Office of the CIO', 0.09, '4')]
    for i, (name, v, n) in enumerate(rows):
        y = p + 52 + i * 30
        txt(d, (p + 20, y + 8), name, fs, MUTE, 'lm')
        rr(d, (p + 128, y + 1, p + 128 + 118 * v, y + 15), 3, fill=(96, 132, 246))
        txt(d, (p + 256, y + 8), n, font(BOLD, 9 * S), INK, 'lm')
    place(bg, c, 268, 178, 5, 0.96)

    # the split the dashboard opens on
    c, d, p = panel(154, 154, r=16)
    box = (p + 30, p + 26, p + 124, p + 120)
    for start, end, col in ((-90, 40, (124, 92, 246)), (40, 160, (56, 189, 168)),
                            (160, 250, (250, 176, 72)), (250, 270, (236, 108, 148))):
        d.arc([v * S for v in box], start, end, fill=col, width=15 * S)
    txt(d, (p + 77, p + 73), '58%', font(BOLD, 22 * S), INK, 'mm')
    txt(d, (p + 77, p + 134), 'TOP PRODUCT SHARE', font(BOLD, 8 * S), MUTE, 'mm')
    place(bg, c, 300, 470, -8, 1.0)

    # the agent turn itself: a question, and the answer with its source
    c, d, p = panel(286, 150)
    fq = font(REG, 11 * S); fb2 = font(BOLD, 10 * S)
    rr(d, (p + 92, p + 20, p + 266, p + 50), 10, fill=(238, 233, 254))
    txt(d, (p + 179, p + 35), 'Which products drive usage?', fq, (76, 44, 156), 'mm')
    rr(d, (p + 20, p + 62, p + 210, p + 128), 10, fill=(245, 247, 251))
    skeleton(d, p + 32, p + 76, 166, 3, col=(214, 220, 232))
    chip(d, p + 32, p + 106, 'view.risk_lcr', BLUE, (226, 236, 254), font(BOLD, 8 * S), ph=7, pw=7)
    place(bg, c, 1416, 210, 7, 1.0)

    # the ranked table row, rank pill and all
    c, d, p = panel(266, 92)
    fb3 = font(BOLD, 11 * S); fs3 = font(REG, 9 * S)
    txt(d, (p + 20, p + 20), 'RANK   DEPARTMENT', font(BOLD, 8 * S), MUTE)
    ln(d, (p + 18, p + 36, p + 248, p + 36), fill=LINE, width=1 * S)
    for i, (r, name, share) in enumerate(((1, 'Technology & Ops', '64.1%'), (2, 'Finance', '20.7%'))):
        y = p + 48 + i * 24
        d.ellipse([v * S for v in (p + 20, y, p + 34, y + 14)], fill=(238, 240, 246))
        txt(d, (p + 27, y + 7), str(r), font(BOLD, 8 * S), INK, 'mm')
        txt(d, (p + 44, y + 7), name, fs3, INK, 'lm')
        txt(d, (p + 248, y + 7), share, fb3, (96, 132, 246), 'rm')
    place(bg, c, 1396, 486, -6, 1.0)

    connector(bg, [(440, 254), (530, 254), (530, 340)])
    connector(bg, [(1246, 434), (1160, 434), (1160, 356)])
    wordmark(bg)
    return grain(bg.convert('RGB'))


# ══════════════════════════════════════════════════════════════════════════
# 03 · ingestion — the stepper, the form field, the error panel
# ══════════════════════════════════════════════════════════════════════════
def ingestion():
    bg = ground((6, 78, 106), (12, 140, 148), (64, 214, 178)).convert('RGBA')

    # the seven steps that replaced the spreadsheet
    c, d, p = panel(368, 76)
    fb2 = font(BOLD, 10 * S); fs2 = font(REG, 8 * S)
    steps = [('Metadata', True), ('Attributes', True),
             ('Data Flow', False), ('Approval', False)]
    x, pitch = p + 22, 88
    for i, (name, done) in enumerate(steps):
        cy = p + 32
        col = GREEN if done else (206, 212, 222)
        d.ellipse([v * S for v in (x, cy - 9, x + 18, cy + 9)], fill=col)
        if done:
            check(d, x + 9, cy, 11, (255, 255, 255))
        else:
            txt(d, (x + 9, cy), str(i + 1), font(BOLD, 9 * S), (255, 255, 255), 'mm')
        txt(d, (x + 24, cy - 5), name, fb2, INK if done else MUTE, 'lm')
        txt(d, (x + 24, cy + 8), 'done' if done else 'pending', fs2, MUTE, 'lm')
        if i < len(steps) - 1:
            ln(d, (x + 22, cy + 26, x + pitch - 4, cy + 26), fill=LINE, width=1 * S)
        x += pitch
    place(bg, c, 350, 148, 4, 0.92)

    # the form: a view name in, every column and type back out
    c, d, p = panel(280, 156)
    fl = font(BOLD, 9 * S); fv = font(REG, 11 * S)
    txt(d, (p + 20, p + 20), 'DATA PRODUCT NAME *', fl, MUTE)
    rr(d, (p + 20, p + 36, p + 240, p + 62), 6, fill=(255, 255, 255), outline=(196, 204, 216), width=1 * S)
    txt(d, (p + 32, p + 49), 'Recourse Leverage', fv, INK, 'lm')
    txt(d, (p + 20, p + 78), 'UNDERLYING TABLE', fl, MUTE)
    rr(d, (p + 20, p + 94, p + 240, p + 120), 6, fill=(244, 247, 250), outline=(214, 222, 232), width=1 * S)
    txt(d, (p + 32, p + 107), 'risk_trusted_prod.rl_trade', font(REG, 10 * S), (86, 96, 114), 'lm')
    chip(d, p + 20, p + 130, 'Auto-filled  ·  21 columns', GREEN, GREEN_BG, font(BOLD, 8 * S), ph=7, pw=8)
    place(bg, c, 296, 468, -6, 1.0)

    # it fails loudly, before a human is asked to approve it
    c, d, p = panel(292, 132)
    rr(d, (p, p, p + 5, p + 132), 0, fill=RED)
    fb3 = font(BOLD, 12 * S); fs3 = font(REG, 9 * S)
    d.ellipse([v * S for v in (p + 20, p + 22, p + 36, p + 38)], fill=RED_BG)
    txt(d, (p + 28, p + 30), '!', font(BOLD, 11 * S), RED, 'mm')
    txt(d, (p + 46, p + 30), '4 items need attention', fb3, RED, 'lm')
    for i, s in enumerate(('View not found in Glue catalog',
                           'Underlying table 2 unresolved',
                           'Column type mismatch: trade_dt')):
        y = p + 56 + i * 24
        d.ellipse([v * S for v in (p + 24, y + 4, p + 30, y + 10)], fill=(240, 160, 160))
        txt(d, (p + 40, y + 7), s, fs3, (150, 60, 60), 'lm')
    place(bg, c, 1408, 196, 6, 1.0)

    # the approval that only ever sees clean records
    c, d, p = panel(228, 84)
    chip(d, p + 20, p + 20, 'Validated  ·  20 / 21 complete', GREEN, GREEN_BG, font(BOLD, 9 * S), ph=8, pw=9)
    rr(d, (p + 20, p + 52, p + 108, p + 74), 6, fill=BLUE)
    txt(d, (p + 64, p + 63), 'Submit', font(BOLD, 10 * S), (255, 255, 255), 'mm')
    rr(d, (p + 118, p + 52, p + 190, p + 74), 6, outline=(206, 212, 222), width=1 * S)
    txt(d, (p + 154, p + 63), 'Save draft', font(BOLD, 10 * S), MUTE, 'mm')
    place(bg, c, 1416, 476, -5, 1.0)

    connector(bg, [(470, 214), (556, 214), (556, 300)])
    connector(bg, [(1260, 430), (1176, 430), (1176, 352)])
    wordmark(bg)
    return grain(bg.convert('RGB'))


# ══════════════════════════════════════════════════════════════════════════
# 04 · cdm — the relationship row, the filter counts, the all-clear
# ══════════════════════════════════════════════════════════════════════════
def cdm():
    bg = ground((104, 16, 122), (176, 40, 168), (238, 108, 190)).convert('RGBA')

    # the typed link: concept, verb, concept
    c, d, p = panel(330, 104)
    fc = font(BOLD, 8 * S); ft = font(BOLD, 13 * S); fv = font(REG, 10 * S)
    txt(d, (p + 20, p + 22), 'RELATIONSHIP', fc, MUTE)
    y = p + 48
    chip(d, p + 20, y - 6, 'CONCEPT', (146, 64, 190), (243, 232, 250), font(BOLD, 7 * S), ph=6, pw=7)
    txt(d, (p + 20, y + 26), 'Capital Allocation', ft, INK, 'lm')
    ln(d, (p + 148, y + 4, p + 190, y + 4), fill=(176, 184, 200), width=2 * S)
    d.polygon([v * S for v in (p + 190, y + 4, p + 183, y, p + 183, y + 8)], fill=(176, 184, 200))
    txt(d, (p + 169, y - 12), 'defines', fv, (120, 130, 148), 'mm')
    chip(d, p + 200, y - 6, 'CONCEPT', (146, 64, 190), (243, 232, 250), font(BOLD, 7 * S), ph=6, pw=7)
    txt(d, (p + 200, y + 26), 'Capital Usage', ft, INK, 'lm')
    place(bg, c, 296, 166, 5, 0.96)

    # the counts the stewards argued their way to
    c, d, p = panel(224, 148)
    fb2 = font(BOLD, 9 * S); fs2 = font(REG, 10 * S)
    txt(d, (p + 20, p + 20), 'FILTER BY TYPE', fb2, MUTE)
    items = [('All', '58', True), ('Concept → Concept', '56', False),
             ('Concept → Term', '0', False), ('Term → Term', '2', False)]
    for i, (name, n, sel) in enumerate(items):
        y = p + 40 + i * 26
        if sel:
            rr(d, (p + 14, y, p + 210, y + 24), 6, fill=(247, 236, 252))
        txt(d, (p + 24, y + 12), name, fs2, INK if sel else (110, 120, 140), 'lm')
        txt(d, (p + 200, y + 12), n, fb2, (146, 64, 190) if sel else MUTE, 'rm')
    place(bg, c, 268, 458, -7, 1.0)

    # a concept and the terms hanging off it
    c, d, p = panel(250, 138)
    txt(d, (p + 20, p + 22), 'CONCEPT', font(BOLD, 8 * S), MUTE)
    txt(d, (p + 20, p + 40), 'Capital Budget', font(BOLD, 15 * S), INK)
    ln(d, (p + 20, p + 70, p + 230, p + 70), fill=LINE, width=1 * S)
    x = p + 20
    for t in ('Commitment', 'Deployment', 'Variance'):
        x = chip(d, x, p + 84, t, (120, 90, 150), (245, 240, 250), font(BOLD, 9 * S), ph=8, pw=9) + 8
        if x > p + 190:
            x = p + 20
    txt(d, (p + 20, p + 118), '12 terms  ·  4 departments', font(REG, 9 * S), MUTE, 'lm')
    place(bg, c, 1420, 200, 7, 1.0)

    # every link checked before it is published
    c, d, p = panel(268, 62)
    d.ellipse([v * S for v in (p + 20, p + 22, p + 38, p + 40)], fill=GREEN_BG)
    check(d, p + 29, p + 31, 12, GREEN, 2.4)
    txt(d, (p + 48, p + 25), 'All 58 relationships look good', font(BOLD, 11 * S), (22, 120, 60), 'lm')
    txt(d, (p + 48, p + 42), 'No dropdown mismatches found', font(REG, 9 * S), (100, 150, 120), 'lm')
    place(bg, c, 1408, 480, -5, 1.0)

    connector(bg, [(486, 240), (566, 240), (566, 322)])
    connector(bg, [(1254, 428), (1170, 428), (1170, 348)])
    wordmark(bg)
    return grain(bg.convert('RGB'))


if __name__ == '__main__':
    for slug, fn in (('data-product-marketplace', portal),
                     ('ai-agent-usage-dashboard', agent),
                     ('data-ingestion-flow', ingestion),
                     ('ai-keyword-domain-model', cdm)):
        out = os.path.join(ROOT, slug, 'cover.webp')
        fn().save(out, 'WEBP', quality=90, method=6)
        print(f'{slug:28} {os.path.getsize(out) // 1024} KB')
