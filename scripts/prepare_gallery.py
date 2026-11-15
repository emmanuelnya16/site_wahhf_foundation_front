"""
Prépare les photos de la galerie WAHHF pour le web.

- Recadre chaque photo : bandes noires, bandeau incrusté « First Open Day & Boot Camp »,
  interface de story, panneau publicitaire (voir CROPS).
- Exporte trois largeurs en WebP (480, 800 et la largeur d'origine) dans src/assets/gallery/.
- Écrit src/data/galleryManifest.json (largeur/hauteur de chaque photo, pour réserver le ratio).

Les sources (captures TikTok, ~1 000 × 720 px) sont dans E:/site_wahhf/Wahhf.
Quand les fichiers originaux du photographe arriveront : les déposer dans ce dossier
sous le même nom, mettre leur entrée de CROPS à None (plus de bandeau à couper), relancer.

Vidéos (option --videos, ffmpeg requis) : courts extraits H.264 (lisibles partout, « faststart »),
bandes noires coupées, + une image d'aperçu WebP par extrait.

Usage (depuis la racine du projet) :
    python scripts/prepare_gallery.py [dossier_sources] [--videos]
"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
SRC = Path(ARGS[0]) if ARGS else ROOT.parent / 'Wahhf'
WITH_VIDEOS = '--videos' in sys.argv
OUT = ROOT / 'src' / 'assets' / 'gallery'
MANIFEST = ROOT / 'src' / 'data' / 'galleryManifest.json'
WIDTHS = (480, 800)
QUALITY = 80

# Bandeau incrusté : il commence ~630 px sous le haut de la zone photo (720 px utiles).
BAND = 628

# slug -> (fichier source, boîte de recadrage (gauche, haut, droite, bas) en pixels, ou None)
CROPS = {
    # Rencontres de la communauté
    'communaute-masque': ('SmartSelect_20261113-232331_TikTok.jpg', (0, 0, 1021, 1208)),       # story : interface coupée
    'communaute-rencontre': ('SmartSelect_20261113-232342_TikTok.jpg', (0, 7, 1051, 817)),     # bande noire du bas
    # First Open Day & Boot Camp — Yaoundé, 25 avril 2026
    'open-day-interview': ('SmartSelect_20261113-232830_TikTok.jpg', (0, 11, 1044, 11 + BAND)),
    'open-day-rassemblement': ('SmartSelect_20261113-232839_TikTok.jpg', (0, 232, 1024, 23 + BAND)),  # sans le panneau de paris
    'open-day-marche': ('SmartSelect_20261113-232848_TikTok.jpg', (0, 61, 986, 61 + BAND)),
    'open-day-jeunes': ('SmartSelect_20261113-232901_TikTok.jpg', (0, 4, 1050, 4 + BAND)),
    'open-day-marche-slogan': ('SmartSelect_20261113-232913_TikTok.jpg', (0, 15, 1020, 15 + BAND)),
    'open-day-visioconference': ('SmartSelect_20261113-232929_TikTok.jpg', (0, 7, 1027, 7 + BAND)),
    'open-day-prise-de-parole': ('SmartSelect_20261113-232945_TikTok.jpg', (0, 0, 1030, 1282)),
    'open-day-accompagnement': ('SmartSelect_20261113-232959_TikTok.jpg', (0, 16, 1030, 16 + BAND)),
    'open-day-trophee': ('SmartSelect_20261113-233010_TikTok.jpg', (0, 32, 1040, 32 + BAND)),
    'open-day-groupe': ('SmartSelect_20261113-233019_TikTok.jpg', (0, 41, 1025, 41 + BAND)),
    'open-day-slogan': ('SmartSelect_20261113-233102_TikTok.jpg', (0, 65, 1001, 65 + BAND)),
    'open-day-accueil': ('SmartSelect_20261113-233116_TikTok.jpg', (0, 17, 953, 17 + BAND)),
    'open-day-chorale': ('SmartSelect_20261113-233126_TikTok.jpg', (0, 40, 1039, 40 + BAND)),
}

# Non retenues : 232352 (boîte de whisky, déchets) et 232406 (déchets au sol).

# slug -> (fichier source, début (s), durée (s), recadrage ffmpeg w:h:x:y, garder le son, image d'aperçu à (s) dans l'extrait)
# Son coupé sur les plans de terrain : le montage d'origine peut contenir une musique ajoutée (droits inconnus).
VIDEOS = {
    'video-chorale': ('VideoEditor_20261113_113259.mp4', 44, 18, '572:324:2:4', True, 6),      # source HEVC -> H.264
    'video-car': ('VideoEditor_20261113_113405.mp4', 40, 15, '576:310:0:0', False, 4),
    'video-bananeraie': ('VideoEditor_20261113_113543.mp4', 1, 12, '572:306:2:0', False, 10),
    'video-pepiniere': ('VideoEditor_20261113_113643.mp4', 14, 17, '576:296:0:0', False, 2),
}


def videos(manifest):
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        sys.exit('ffmpeg introuvable : installez-le (scoop install ffmpeg) ou lancez sans --videos.')
    for slug, (name, start, dur, crop, keep_audio, poster_at) in VIDEOS.items():
        out = OUT / f'{slug}.mp4'
        audio = ['-c:a', 'aac', '-b:a', '96k', '-ac', '2'] if keep_audio else ['-an']
        subprocess.run([ffmpeg, '-v', 'error', '-y', '-ss', str(start), '-t', str(dur), '-i', str(SRC / name),
                        '-vf', f'crop={crop},format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23',
                        '-profile:v', 'high', '-movflags', '+faststart', *audio, str(out)], check=True)
        with tempfile.TemporaryDirectory() as tmp:
            png = Path(tmp) / 'poster.png'
            subprocess.run([ffmpeg, '-v', 'error', '-y', '-ss', str(poster_at), '-i', str(out), '-frames:v', '1', str(png)], check=True)
            with Image.open(png) as im:
                w, h = im.size
                im.convert('RGB').save(OUT / f'{slug}-poster.webp', 'WEBP', quality=QUALITY, method=6)
        manifest[slug] = {'w': w, 'h': h, 'duration': dur}
        print(f'{slug:28s} {w}x{h}  {dur} s  {out.stat().st_size / 1024:.0f} kB  son: {"oui" if keep_audio else "non"}')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for slug, (name, box) in CROPS.items():
        with Image.open(SRC / name) as im:
            im = ImageOps.exif_transpose(im).convert('RGB')
            if box:
                im = im.crop(box)
            w, h = im.size
            for target in WIDTHS:
                if target < w:
                    small = im.resize((target, round(h * target / w)), Image.LANCZOS)
                    small.save(OUT / f'{slug}-{target}.webp', 'WEBP', quality=QUALITY, method=6)
            im.save(OUT / f'{slug}-full.webp', 'WEBP', quality=QUALITY, method=6)
            manifest[slug] = {'w': w, 'h': h}
            print(f'{slug:28s} {w}x{h}')
    if WITH_VIDEOS:
        videos(manifest)
    elif MANIFEST.exists():
        # Sans --videos, on garde les entrées vidéo déjà présentes dans le manifeste
        previous = json.loads(MANIFEST.read_text(encoding='utf-8'))
        manifest.update({k: v for k, v in previous.items() if k in VIDEOS})
    MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    total = sum(p.stat().st_size for p in OUT.iterdir() if p.suffix in ('.webp', '.mp4'))
    n_videos = sum(1 for k in manifest if k in VIDEOS)
    print(f'{len(manifest) - n_videos} photos, {n_videos} vidéos, {total / 1024:.0f} kB au total -> {OUT}')


if __name__ == '__main__':
    main()
