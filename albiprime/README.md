# Albi Prime

Static TV demo library prepared for `/albiprime/` on AlbertoScott.co.uk. This route is self-contained; the portfolio homepage is unchanged.

## External video hosting

Video files stay outside the website checkout. `catalogue.json` contains small metadata records and relative thumbnail paths. Set each record's `downloadUrl` to the verified HTTPS sharing link after upload to Google Drive or MEGA. The browser navigates directly to that host; there is no video proxy or high-resolution video streaming through Vercel. Upload state is derived from the link, not a hard-coded count.

All 14 download URLs were exported through Finder and individually matched to their numbered files on 9 October 2026. Cloud drive lists all 14 files. Public signed-out download testing is still pending because browser policy blocks MEGA access; retain noindex until that check is complete. Keep full yt-dlp JSON metadata out of this repository because it contains temporary delivery URLs.

## Quality metadata

`width`, `height`, `fps`, `dynamicRange`, video/audio codecs, bitrate and audio-channel count come from the selected YouTube streams. Files are remuxed without re-encoding. The resolution filter uses encoded width, including cinematic aspect ratios. Encoded 8K is not proof of native capture at 8K. HDR information is distinct from audio-format claims in source titles. TV compatibility remains untested until recorded per actual model.

## Presentation

Compact clip grid with quality filters, search, file specifications and external download links. No promotional hero, slogans, profile control, onboarding or playback-guide sections. Thumbnails come from the source videos; technical badges come from downloaded stream metadata.

## Verification

Serve the repository with a static HTTP server and open `/albiprime/`. Verify desktop and mobile widths, resolution/HDR/frame-rate filters, search, empty state/reset, keyboard dialog dismissal and external source links. No build step is required.
