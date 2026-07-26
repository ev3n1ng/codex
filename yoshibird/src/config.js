export const VIRTUAL_WIDTH = 960;
export const VIRTUAL_HEIGHT = 540;

export const GAME_CONFIG = Object.freeze({
  world: {
    width: VIRTUAL_WIDTH,
    height: VIRTUAL_HEIGHT,
    ceiling: 16,
    groundHeight: 74,
    metresPerPixel: 0.055
  },
  physics: {
    gravity: 1660,
    flapVelocity: -520,
    terminalVelocity: 780,
    riseRotation: -0.34,
    fallRotation: 0.82,
    rotationLerp: 10,
    fixedStep: 1 / 120
  },
  player: {
    x: 214,
    radiusX: 28,
    radiusY: 23,
    collisionPadding: 7
  },
  obstacles: {
    width: 92,
    initialSpacing: 306,
    minSpacing: 244,
    gapStart: 174,
    gapMin: 124,
    gapMax: 196,
    minCenter: 124,
    maxCenter: 392,
    maxCenterDelta: 76,
    movingScore: 48,
    movingAmplitude: 28,
    poolLimit: 12
  },
  difficulty: {
    initialSpeed: 186,
    maxSpeed: 334,
    scoreSpeedStep: 4.5,
    timeSpeedStep: 0.18,
    energeticSpeed: 292,
    milestones: [
      { score: 10, label: "Breezy burrows" },
      { score: 25, label: "Hilltop hustle" },
      { score: 50, label: "Dancing towers" },
      { score: 100, label: "Evening glide" }
    ]
  },
  particles: {
    max: 90
  },
  audio: {
    musicVolume: 0.34,
    sfxVolume: 0.55
  }
});
