export const VIRTUAL_WIDTH = 540;
export const VIRTUAL_HEIGHT = 960;

export const GAME_CONFIG = Object.freeze({
  world: {
    width: VIRTUAL_WIDTH,
    height: VIRTUAL_HEIGHT,
    ceiling: 16,
    groundHeight: 74,
    metresPerPixel: 0.055
  },
  physics: {
    gravity: 1160,
    flapVelocity: -285,
    terminalVelocity: 620,
    riseRotation: -0.34,
    fallRotation: 0.82,
    rotationLerp: 10,
    fixedStep: 1 / 120
  },
  player: {
    x: 142,
    radiusX: 28,
    radiusY: 23,
    collisionPadding: 7
  },
  obstacles: {
    width: 74,
    initialSpacing: 286,
    minSpacing: 238,
    gapStart: 218,
    gapMin: 168,
    gapMax: 236,
    minCenter: 170,
    maxCenter: 748,
    maxCenterDelta: 122,
    movingScore: 48,
    movingAmplitude: 28,
    poolLimit: 12
  },
  difficulty: {
    initialSpeed: 164,
    maxSpeed: 276,
    scoreSpeedStep: 3.25,
    timeSpeedStep: 0.11,
    energeticSpeed: 238,
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
