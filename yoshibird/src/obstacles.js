import { GAME_CONFIG } from "./config.js";
import { clamp, getDifficulty } from "./difficulty.js";

export function createSeededRandom(seed = Date.now()) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function nextObstacle(previous, score, elapsedSeconds, random = Math.random, startX = GAME_CONFIG.world.width + 80) {
  const config = GAME_CONFIG.obstacles;
  const difficulty = getDifficulty(score, elapsedSeconds);
  const centerRange = difficulty.variation;
  const baseCenter = previous ? previous.center : GAME_CONFIG.world.height * 0.49;
  const drift = (random() * 2 - 1) * centerRange;
  const center = clamp(
    baseCenter + clamp(drift, -config.maxCenterDelta, config.maxCenterDelta),
    config.minCenter,
    config.maxCenter
  );
  const moving = random() < difficulty.movingChance;
  const variantRoll = random();
  const variant = variantRoll < 0.34 ? "storybook-tower" : variantRoll < 0.67 ? "flower-trunk" : "pastel-rock";
  const spacing = previous ? difficulty.spacing + (random() * 26 - 13) : 0;
  const x = previous ? previous.x + spacing : startX;

  return {
    id: `${Math.round(x)}-${score}-${Math.round(center)}`,
    x,
    width: config.width,
    center,
    baseCenter: center,
    gap: difficulty.gap,
    scored: false,
    moving,
    movePhase: random() * Math.PI * 2,
    moveSpeed: 0.75 + random() * 0.45,
    moveAmplitude: moving ? config.movingAmplitude * (0.65 + random() * 0.45) : 0,
    variant
  };
}

export function updateObstacleMotion(obstacle, elapsedSeconds) {
  if (!obstacle.moving) return obstacle.center;
  const center = obstacle.baseCenter + Math.sin(elapsedSeconds * obstacle.moveSpeed + obstacle.movePhase) * obstacle.moveAmplitude;
  obstacle.center = clamp(center, GAME_CONFIG.obstacles.minCenter, GAME_CONFIG.obstacles.maxCenter);
  return obstacle.center;
}

export function simulateObstacleStream(count, seed = 42) {
  const random = createSeededRandom(seed);
  const obstacles = [];
  let previous = null;
  for (let i = 0; i < count; i += 1) {
    const obstacle = nextObstacle(previous, i, i * 1.8, random);
    obstacles.push(obstacle);
    previous = obstacle;
  }
  return obstacles;
}
