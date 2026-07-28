# Font credits

Both fonts are self-hosted here (no external Google Fonts CDN call) so the
game works offline and matches the no-build-step static-site philosophy.
Both are variable fonts covering the whole weight range used in one file.

| File | Font | Designer | License | Source |
|---|---|---|---|---|
| `baloo2-variable.woff2` | Baloo 2 | Ek Type | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Baloo+2 |
| `quicksand-variable.woff2` | Quicksand | Andrew Paglinawan | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Quicksand |

OFL 1.1 full text: https://openfontlicense.org (or scripts.sil.org/OFL).
It permits embedding, self-hosting, and commercial use freely; the only
restriction is that the font itself can't be re-sold on its own under the
same name.

Downloaded 2026-07-29 directly from Google Fonts' `fonts.gstatic.com` CDN
(the same files Google's own `@import` would have served), then vendored
into this repo so no runtime request to Google Fonts is needed.

Used in `styles.css` via local `@font-face` rules: Baloo 2 for headings/
display text (`.logo-word`, panel `h1`s, `.hud-score`, `.storybook-mark`),
Quicksand as the body/UI font (`:root` `font-family`).
