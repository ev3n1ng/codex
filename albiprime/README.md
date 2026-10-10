# Albi Prime

Static TV demo library prepared for `/albiprime/` on AlbertoScott.co.uk. This route is self-contained; the portfolio homepage is unchanged.

## External video hosting

Video files stay outside the website checkout. `catalogue.json` contains small metadata records and relative thumbnail paths. Set each record's `downloadUrl` to the verified HTTPS sharing link after upload to Google Drive or MEGA. The browser navigates directly to that host; there is no video proxy or high-resolution video streaming through Vercel. Upload state is derived from the link, not a hard-coded count.

All 26 download URLs were exported through Finder and individually matched to their numbered files: the original 14 on 9 October 2026, and 12 additions on 10 October 2026. MEGA confirmed upload completion for the additions (9,434,649,923 bytes); each downloaded file passed a full packet-read check and the local MEGA copy matched its SHA-256 hash. Public signed-out download testing is still pending because browser policy blocks MEGA access; retain noindex until that check is complete. Keep full yt-dlp JSON metadata out of this repository because it contains temporary delivery URLs.

## Quality metadata

`width`, `height`, `fps`, `dynamicRange`, video/audio codecs, bitrate and audio-channel count come from the selected YouTube streams. Files are remuxed without re-encoding. The resolution filter uses encoded width, including cinematic aspect ratios. Encoded 8K is not proof of native capture at 8K. HDR information is distinct from audio-format claims in source titles. TV compatibility remains untested until recorded per actual model.

## Presentation

Prime Video-style parody ("albi prime"): fixed top nav with tabs and search, a featured hero carousel, horizontal content rows and a detail dialog with a blue Download button. The footer carries a parody disclaimer; keep it. Thumbnails come from the source videos; technical badges come from downloaded stream metadata.

## Managing content (for Codex)

- **Add or edit a clip:** edit `catalogue.json` only. Required: `category` (one of the slugs in `site.json`: `film-trailers`, `branded-content`, `other`, `audio`). Optional: `displayTitle` (clean name shown on the site; falls back to `title`), `synopsis` (one or two sentences shown in the hero and detail dialog), `featured: true` (prioritises the clip in the hero carousel; up to 14 are used). Add the source thumbnail as `assets/<id>.jpg` (prefer 1280x720; retain lower-resolution originals when that is all the source provides). Audio items may omit `width`, `height` and `fps`; they are shown as "Audio" without video specs.
- **Categories:** edit `categories` in `site.json` (`slug`, `label`, `blurb`). Each becomes a nav tab, a home-page row and a page with 8K/4K/HDR/60 fps filter chips. Empty categories keep their tab (with a "check back soon" message) but get no home row.
- **Colours and fonts:** change the tokens at the top of `styles.css` (`--bg`, `--blue`, `--surface`, and so on).
- Do not hard-code clip data in `app.js` or `index.html`.

## Verification

Serve the repository with a static HTTP server and open `/albiprime/`. Verify desktop and mobile widths, the category nav tabs and their 8K/4K/HDR/60 fps filter chips, search, the empty state, hero dots, keyboard dialog dismissal and external source links. No build step is required.
