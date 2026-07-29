# Font credits

Both fonts are self-hosted here (no external Google Fonts CDN call) so the
game works offline and matches the no-build-step static-site philosophy.

| File | Font | Designer | License | Source |
|---|---|---|---|---|
| `luckiestguy.woff2` | Luckiest Guy | Astigmatic | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Luckiest+Guy |
| `rubik-variable.woff2` | Rubik | Multiple Designers (Google Fonts) | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Rubik |

OFL 1.1 full text: https://openfontlicense.org (or scripts.sil.org/OFL).
It permits embedding, self-hosting, and commercial use freely.

Downloaded 2026-07-30 directly from Google Fonts' `fonts.gstatic.com` CDN,
then vendored into this repo so no runtime request to Google Fonts is made.

Used in `styles.css` via local `@font-face` rules: Luckiest Guy is the loud,
single-weight display face (logo lockup, screen titles, HUD score) — used
sparingly, at large sizes only. Rubik is the body/UI face for everything
else (buttons, labels, table content).
