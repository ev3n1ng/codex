#!/bin/zsh
set -euo pipefail

REPO="/Users/bob/Documents/Codex/current-github-codex"
NODE="/opt/homebrew/bin/node"
GIT="/usr/bin/git"
LOG_DIR="/Users/bob/Documents/Codex/lgpricechecker-automation/logs"
LOCK_DIR="/tmp/albertoscott-lgpricechecker.lock"
TODAY="$(date +%Y-%m-%d)"
LOG_FILE="${LOG_DIR}/${TODAY}-lgpricechecker.log"

mkdir -p "$LOG_DIR"
exec >> "$LOG_FILE" 2>&1

echo "[$(date -Is)] LG price checker local automation starting"

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "[$(date -Is)] Another LG price checker run is already active. Exiting."
  exit 0
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null || true' EXIT

cd "$REPO"

"$GIT" fetch origin

if [ -n "$("$GIT" status --porcelain)" ]; then
  echo "[$(date -Is)] Repo has uncommitted changes. Refusing to run."
  "$GIT" status --short
  exit 10
fi

divergence="$("$GIT" rev-list --left-right --count origin/main...HEAD)"
behind="$(printf "%s" "$divergence" | awk '{print $1}')"
ahead="$(printf "%s" "$divergence" | awk '{print $2}')"

if [ "$behind" != "0" ] || [ "$ahead" != "0" ]; then
  echo "[$(date -Is)] Repo is not aligned with origin/main. Behind=${behind}, ahead=${ahead}. Refusing to run."
  exit 11
fi

echo "[$(date -Is)] Refreshing prices from official direct product URLs"
LG_PRICECHECK_DELAY_MIN_MS="${LG_PRICECHECK_DELAY_MIN_MS:-9000}" \
LG_PRICECHECK_DELAY_MAX_MS="${LG_PRICECHECK_DELAY_MAX_MS:-15000}" \
LG_PRICECHECK_TIMEOUT_MS="${LG_PRICECHECK_TIMEOUT_MS:-25000}" \
LG_PRICECHECK_MAX_FETCH_FAILURE_RATE="${LG_PRICECHECK_MAX_FETCH_FAILURE_RATE:-0.25}" \
LG_PRICECHECK_MAX_BLANK_PRICE_INCREASE="${LG_PRICECHECK_MAX_BLANK_PRICE_INCREASE:-12}" \
"$NODE" scripts/lgpricechecker/update-prices.js

echo "[$(date -Is)] Generating static LG price checker pages"
"$NODE" scripts/lgpricechecker/generate-site.js

echo "[$(date -Is)] Validating generated pages"
"$NODE" - <<'NODE'
const fs = require("fs");
const checks = [
  ["LGpricechecker/index.html", 0],
  ["LGpricechecker/currys/index.html", 125],
  ["LGpricechecker/john-lewis/index.html", 95],
];
for (const [file, minModels] of checks) {
  const html = fs.readFileSync(file, "utf8");
  const modelCount = (html.match(/<h3 class="model">/g) || []).length;
  const priceCount = (html.match(/class="price"/g) || []).length;
  const chips = [...html.matchAll(/<span class="(?:offer|finance)[^"]*">([^<]+)<\/span>/g)].map((match) => match[1]);
  if (modelCount < minModels) throw new Error(`${file} model count dropped to ${modelCount}`);
  if (minModels > 0 && priceCount < minModels) throw new Error(`${file} price count dropped to ${priceCount}`);
  if (/Model TBC/.test(html)) throw new Error(`${file} contains Model TBC`);
  if (chips.some((chip) => chip.length > 180)) throw new Error(`${file} contains overlong offer chip`);
  if (chips.some((chip) => /Burberry|Calvin Klein|previous image|Image gallery|How to request|Available credit to spend|Product description|Joseph Joseph|View product des|Shop all LG/i.test(chip))) {
    throw new Error(`${file} contains noisy retailer page text`);
  }
}
NODE

"$GIT" add LGpricechecker data/lgpricechecker

if "$GIT" diff --cached --quiet; then
  echo "[$(date -Is)] No LG price checker changes to commit."
  exit 0
fi

"$GIT" commit -m "Update LG price checker prices ${TODAY}"
"$GIT" push origin HEAD:main

find "$LOG_DIR" -type f -name "*-lgpricechecker.log" -mtime +30 -delete
echo "[$(date -Is)] LG price checker local automation complete"
