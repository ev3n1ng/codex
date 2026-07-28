# Texture credits

All files in this folder are unmodified extracts from Kenney asset packs,
released under **CC0 1.0 Universal** (public domain dedication):
https://creativecommons.org/publicdomain/zero/1.0/

CC0 means these are free to use, including commercially, with no attribution
required. Credit is given anyway because Kenney asks nicely (not because it's
legally required).

| File(s) | Source pack | Pack URL | License file in pack |
|---|---|---|---|
| `cloud1.png`, `cloud2.png`, `cloud3.png`, `grass2.png`, `grass5.png`, `grass6.png` | Background Elements | https://kenney.nl/assets/background-elements | `License.txt` (CC0) |
| `tree_default.png`, `tree_fat.png` | Nature Kit | https://kenney.nl/assets/nature-kit | `License.txt` (CC0) |

Downloaded 2026-07-28. Direct zip URLs used at time of download:
- https://kenney.nl/media/pages/assets/background-elements/b66a1ddec7-1677670395/kenney_background-elements.zip
- https://kenney.nl/media/pages/assets/nature-kit/37ac38a37b-1677698939/kenney_nature-kit.zip

Both packs' own `License.txt` was inspected directly (not just the web page)
before use, confirming: "License (Creative Commons Zero, CC0) ... You may use
these graphics in personal and commercial projects."

Used in `src/game.js` for the parallax cloud layer, background tree silhouettes,
and ground grass tufts, drawn via `HTMLImageElement`/`drawImage` alongside the
existing hand-drawn procedural art.
