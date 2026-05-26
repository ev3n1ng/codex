# LG OLED pricing automation

The GitHub Actions workflow in `.github/workflows/update-pricing.yml` refreshes the LG OLED report pages every morning at 9am Europe/London. It can also be started manually from the Actions tab.

## What it updates

- John Lewis listing pages are fetched directly from johnlewis.com.
- John Lewis product pages are checked for the free wall mount installation service.
- Currys consumer product pages are attempted directly, but Currys can block automated cloud requests.
- If the repository secret `SERPAPI_KEY` is set, the Currys step also uses indexed consumer search snippets as a fallback source for price and offer updates.
- Currys Business is not used.

## Optional Currys search fallback

For stronger Currys updates, add a repository secret named `SERPAPI_KEY` in GitHub:

`Settings -> Secrets and variables -> Actions -> New repository secret`

Without that secret, the workflow still rebuilds the Currys page, but fresh Currys pricing depends on whether Currys allows the GitHub runner to fetch the consumer product pages.
