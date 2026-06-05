# Manual LG OLED Price Check

This site does not use GitHub Actions or any scheduled automation.

The John Lewis and Currys reports use the fixed 41-model LG OLED baseline catalogue. Models without current retailer data stay visible as unavailable.

Manual update commands:

```sh
node refresh_john_lewis_official.js
node refresh_currys_official.js --generate
```

After checking the generated pages, publish manually with git:

```sh
git add .
git commit -m "Refresh LG OLED baseline prices"
git push
```

Do not add a `.github/workflows` price-check workflow unless automatic updates are explicitly requested again.
