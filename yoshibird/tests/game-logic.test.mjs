import test from "node:test";
import assert from "node:assert/strict";

import { GAME_CONFIG } from "../src/config.js";
import { circleIntersectsRect, collidesWithObstacle, hitsWorldBounds } from "../src/collision.js";
import { getDifficulty } from "../src/difficulty.js";
import { createSeededRandom, nextObstacle, simulateObstacleStream } from "../src/obstacles.js";
import { createStorageService, isLeaderboardWorthy, sanitiseName, sortRuns } from "../src/leaderboard.js";

test("difficulty rises smoothly and stays inside fair limits", () => {
  const early = getDifficulty(0, 0);
  const mid = getDifficulty(50, 90);
  const late = getDifficulty(150, 600);

  assert.equal(early.speed, GAME_CONFIG.difficulty.initialSpeed);
  assert.ok(mid.speed > early.speed);
  assert.ok(late.speed <= GAME_CONFIG.difficulty.maxSpeed);
  assert.ok(late.gap >= GAME_CONFIG.obstacles.gapMin);
  assert.ok(mid.gap < early.gap);
  assert.ok(late.spacing >= GAME_CONFIG.obstacles.minSpacing);
});

test("obstacle generation respects bounds and avoids impossible jumps", () => {
  const stream = simulateObstacleStream(200, 1729);
  for (let i = 0; i < stream.length; i += 1) {
    const obstacle = stream[i];
    assert.ok(obstacle.center >= GAME_CONFIG.obstacles.minCenter);
    assert.ok(obstacle.center <= GAME_CONFIG.obstacles.maxCenter);
    assert.ok(obstacle.gap >= GAME_CONFIG.obstacles.gapMin);
    if (i > 0) {
      assert.ok(Math.abs(obstacle.center - stream[i - 1].center) <= GAME_CONFIG.obstacles.maxCenterDelta + 0.001);
      assert.ok(obstacle.x - stream[i - 1].x >= GAME_CONFIG.obstacles.minSpacing - 14);
    }
  }
});

test("seeded obstacle generation is deterministic", () => {
  const firstRandom = createSeededRandom(55);
  const secondRandom = createSeededRandom(55);
  const a = nextObstacle(null, 12, 22, firstRandom);
  const b = nextObstacle(null, 12, 22, secondRandom);
  assert.deepEqual(a, b);
});

test("collision uses forgiving deterministic shapes", () => {
  const obstacle = {
    x: 250,
    width: 90,
    center: 270,
    gap: 150
  };
  assert.equal(collidesWithObstacle({ x: 210, y: 270 }, obstacle, GAME_CONFIG), false);
  assert.equal(collidesWithObstacle({ x: 270, y: 165 }, obstacle, GAME_CONFIG), true);
  assert.equal(hitsWorldBounds({ x: 210, y: GAME_CONFIG.world.ceiling + 40 }, GAME_CONFIG), false);
  assert.equal(hitsWorldBounds({ x: 210, y: GAME_CONFIG.world.height - 20 }, GAME_CONFIG), true);
  assert.equal(circleIntersectsRect({ x: 5, y: 5, radius: 4 }, { x: 20, y: 20, width: 20, height: 20 }), false);
});

test("leaderboard sorting, storage, and worthy checks are stable", () => {
  const store = createStorageService();
  const runs = [
    { name: "abc<script>", score: 9, distance: 90, maxSpeed: 200 },
    { name: "BO", score: 12, distance: 80, maxSpeed: 190 },
    { name: "CY", score: 12, distance: 100, maxSpeed: 188 }
  ];
  const sorted = sortRuns(runs);
  assert.equal(sorted[0].name, "CY");
  assert.equal(sorted[2].name, "ABCSCRIP");
  store.saveRun(runs[0]);
  store.saveRun(runs[1]);
  store.saveRun(runs[2]);
  assert.equal(store.getRuns()[0].name, "CY");
  assert.equal(store.getRuns().length, 3);
  assert.equal(isLeaderboardWorthy(store.getRuns(), 1, 1), true);
});

test("name sanitisation limits user supplied names", () => {
  assert.equal(sanitiseName(" a-12! bobble "), "A12 BOBB");
  assert.equal(sanitiseName("<img>"), "IMG");
  assert.equal(sanitiseName(""), "PAL");
});
