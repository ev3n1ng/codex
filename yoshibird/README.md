# Yoshi Bird

Yoshi Bird is a self-contained static browser game served from `/yoshibird/`.

## Local Run

From the repository root:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/yoshibird/`.

## Build And Test

This repository is deployed as static files, so there is no app build step for this route. Syntax and logic checks:

```bash
node --test yoshibird/tests/*.test.mjs
node --check yoshibird/src/game.js
```

## Route

The production route is `https://albertoscott.co.uk/yoshibird/`. `vercel.json` rewrites `/yoshibird/:path*` to `/yoshibird/index.html` so a direct refresh keeps working.

## Balancing

Core tuning values live in `yoshibird/src/config.js`, including gravity, flap velocity, speed progression, obstacle gaps, spacing, collision padding, difficulty milestones, audio levels, and particle limits.

## Assets

Visuals are original procedural Canvas and CSS artwork, in a single
"sticker-toy" design system applied identically to the canvas game and the
DOM menus: flat saturated colour fills, a uniform thick ink outline, and a
solid (unblurred) offset "peeled sticker" shadow — no gradients, no blur, no
texture, anywhere. See the palette/rule comments at the top of
`yoshibird/styles.css` and the `PALETTE` constant in `yoshibird/src/game.js`
(kept in lockstep with the CSS custom properties).

Typography is self-hosted (Luckiest Guy for display/titles, Rubik for body/UI,
both OFL-licensed) in `yoshibird/assets/fonts/` — see
`yoshibird/assets/fonts/CREDITS.md` for source/license detail. No external
font CDN call at runtime.

Audio placeholders are tiny original generated WAV files in `yoshibird/audio/`:

- `menu-theme-placeholder.wav`
- `gameplay-theme-placeholder.wav`
- `flap-placeholder.wav`
- `score-placeholder.wav`
- `collision-placeholder.wav`
- `game-over-placeholder.wav`
- `new-high-score-placeholder.wav`
- `button-selection-placeholder.wav`
- `pause-resume-placeholder.wav`

Replace them with original or properly licensed files using the same names, or update `yoshibird/src/audio.js`. The audio manager catches missing files and falls back to simple Web Audio tones, so the game remains playable without music files.

## Local Leaderboard

Scores are stored in `localStorage` under `yoshibird.leaderboard.v1`. Each saved run contains a sanitised display name, score, distance, date, and maximum speed. Only the best ten local runs are retained.

The score service is isolated in `yoshibird/src/leaderboard.js`. A future secure online leaderboard can replace or wrap that service with authenticated server-side validation and anti-abuse checks, without changing the game loop or UI state machine. Do not add a public unauthenticated score endpoint.
