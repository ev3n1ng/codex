import { GAME_CONFIG } from "./config.js";

export function getDifficulty(score = 0, elapsedSeconds = 0) {
  const d = GAME_CONFIG.difficulty;
  const o = GAME_CONFIG.obstacles;
  const scoreSpeed = Math.max(0, score) * d.scoreSpeedStep;
  const timeSpeed = Math.max(0, elapsedSeconds) * d.timeSpeedStep;
  const speed = clamp(d.initialSpeed + scoreSpeed + timeSpeed, d.initialSpeed, d.maxSpeed);
  const smooth = 1 - Math.exp(-Math.max(0, score) / 38);
  const gap = clamp(o.gapStart - smooth * (o.gapStart - o.gapMin), o.gapMin, o.gapMax);
  const spacing = clamp(o.initialSpacing - smooth * 42 + Math.sin(score * 0.31) * 12, o.minSpacing, o.initialSpacing);
  const variation = clamp(72 + score * 1.5, 72, 158);
  const movingChance = score < o.movingScore ? 0 : clamp((score - o.movingScore) / 120, 0.08, 0.32);
  const energy = clamp((speed - d.initialSpeed) / (d.maxSpeed - d.initialSpeed), 0, 1);
  const milestone = d.milestones.reduce((active, item) => (score >= item.score ? item : active), null);

  return { speed, gap, spacing, variation, movingChance, energy, milestone };
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
