export const LEADERBOARD_KEY = "yoshibird.leaderboard.v1";
export const SETTINGS_KEY = "yoshibird.settings.v1";

export function sanitiseName(input) {
  const cleaned = String(input || "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8);
  return cleaned || "PAL";
}

export function normaliseRun(run) {
  return {
    name: sanitiseName(run.name),
    score: Math.max(0, Math.floor(Number(run.score) || 0)),
    distance: Math.max(0, Math.floor(Number(run.distance) || 0)),
    date: run.date || new Date().toISOString(),
    maxSpeed: Math.max(0, Math.round(Number(run.maxSpeed) || 0))
  };
}

export function sortRuns(runs) {
  return [...runs]
    .map(normaliseRun)
    .sort((a, b) => b.score - a.score || b.distance - a.distance || b.maxSpeed - a.maxSpeed)
    .slice(0, 10);
}

export function isLeaderboardWorthy(runs, score, distance) {
  const sorted = sortRuns(runs);
  if (sorted.length < 10) return true;
  const last = sorted[sorted.length - 1];
  return score > last.score || (score === last.score && distance > last.distance);
}

export function createStorageService(storage) {
  const safeStorage = storage || getBrowserStorage() || memoryStorage();
  return {
    getRuns() {
      try {
        const parsed = JSON.parse(safeStorage.getItem(LEADERBOARD_KEY) || "[]");
        return Array.isArray(parsed) ? sortRuns(parsed) : [];
      } catch {
        return [];
      }
    },
    saveRun(run) {
      const runs = sortRuns([...this.getRuns(), normaliseRun(run)]);
      safeStorage.setItem(LEADERBOARD_KEY, JSON.stringify(runs));
      return runs;
    },
    resetRuns() {
      safeStorage.removeItem(LEADERBOARD_KEY);
    },
    getSettings(defaults) {
      try {
        return { ...defaults, ...(JSON.parse(safeStorage.getItem(SETTINGS_KEY) || "{}") || {}) };
      } catch {
        return { ...defaults };
      }
    },
    saveSettings(settings) {
      safeStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  };
}

function getBrowserStorage() {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function memoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    }
  };
}
