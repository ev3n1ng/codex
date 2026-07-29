import { GAME_CONFIG, VIRTUAL_HEIGHT, VIRTUAL_WIDTH } from "./config.js";
import { collidesWithObstacle, hitsWorldBounds } from "./collision.js";
import { getDifficulty, clamp } from "./difficulty.js";
import { nextObstacle, updateObstacleMotion } from "./obstacles.js";
import { AudioManager } from "./audio.js";
import { createStorageService, isLeaderboardWorthy, sanitiseName } from "./leaderboard.js";

// "Sticker-toy" palette — kept in exact lockstep with the CSS custom
// properties in styles.css so the canvas game and the DOM menus read as
// one designed product. Every shape drawn with this palette follows the
// same rule as the DOM: flat fill + ink outline + a solid, unblurred,
// offset shadow (never a gradient, blur, or texture).
const PALETTE = {
  ink: "#16162c",
  sky: "#4fc3e8",
  green: "#2ecc71",
  greenDeep: "#1f9c56",
  yellow: "#ffd23f",
  coral: "#ff6262",
  cream: "#fff8ea"
};

const DEFAULT_SETTINGS = {
  musicVolume: GAME_CONFIG.audio.musicVolume,
  sfxVolume: GAME_CONFIG.audio.sfxVolume,
  mute: false,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  highContrast: false,
  screenShake: true,
  particles: true
};

class YoshiBirdGame {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.storage = createStorageService();
    this.settings = this.storage.getSettings(DEFAULT_SETTINGS);
    this.audio = new AudioManager(this.settings);
    this.state = "loading";
    this.scale = 1;
    this.pixelRatio = 1;
    this.lastFrame = 0;
    this.accumulator = 0;
    this.elapsed = 0;
    this.distance = 0;
    this.score = 0;
    this.maxSpeed = 0;
    this.milestoneText = "";
    this.milestoneTimer = 0;
    this.cameraShake = 0;
    this.lastGamepadPressed = false;
    this.pendingRun = null;
    this.runSubmitted = false;
    this.player = this.createPlayer();
    this.obstacles = [];
    this.particles = [];
    this.ui = this.bindUi();
    this.attachEvents();
    this.resize();
    this.setState("loading");
    setTimeout(() => this.setState("title"), 420);
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  createPlayer() {
    return {
      x: GAME_CONFIG.player.x,
      y: VIRTUAL_HEIGHT * 0.48,
      vy: 0,
      rotation: 0,
      wing: 0,
      blink: 0,
      flapPulse: 0,
      hurt: 0
    };
  }

  bindUi() {
    const $ = (id) => document.getElementById(id);
    return {
      root: $("game-root"),
      screens: [...document.querySelectorAll("[data-screen]")],
      score: $("hud-score"),
      distance: $("hud-distance"),
      speed: $("hud-speed"),
      best: [...document.querySelectorAll("[data-best-score]")],
      titleBest: $("title-best"),
      finalScore: $("final-score"),
      finalBest: $("final-best"),
      finalDistance: $("final-distance"),
      finalSpeed: $("final-speed"),
      finalRank: $("final-rank"),
      finalCelebration: $("final-celebration"),
      namePanel: $("name-panel"),
      nameInput: $("name-input"),
      leaderboardBody: $("leaderboard-body"),
      resetConfirm: $("reset-confirm"),
      settingsPanel: $("settings-panel"),
      musicVolume: $("music-volume"),
      sfxVolume: $("sfx-volume"),
      mute: $("mute-toggle"),
      reducedMotion: $("reduced-motion-toggle"),
      highContrast: $("contrast-toggle"),
      screenShake: $("shake-toggle"),
      particles: $("particles-toggle")
    };
  }

  attachEvents() {
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === "playing") this.setState("paused");
    });
    window.addEventListener("blur", () => {
      if (this.state === "playing") this.setState("paused");
    });
    ["pointerdown", "touchstart"].forEach((eventName) => {
      this.ui.root.addEventListener(eventName, (event) => {
        if (!["ready", "playing"].includes(this.state) || event.target.closest("button, input, label, table")) return;
        event.preventDefault();
        this.primaryAction();
      }, { passive: false });
    });
    document.addEventListener("keydown", (event) => {
      if (["Space", "ArrowUp", "Enter"].includes(event.code)) {
        event.preventDefault();
        this.primaryAction();
      }
      if (event.code === "Escape" && this.state === "playing") this.setState("paused");
    });
    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        this.afterUserAudio("button");
        this.handleAction(button.dataset.action);
      });
    });
    document.querySelectorAll("[data-setting]").forEach((input) => {
      input.addEventListener("input", () => this.updateSettingsFromUi());
      input.addEventListener("change", () => this.updateSettingsFromUi());
    });
    this.ui.nameInput.addEventListener("input", () => {
      this.ui.nameInput.value = sanitiseName(this.ui.nameInput.value);
    });
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
    this.canvas.width = Math.max(1, Math.floor(rect.width * this.pixelRatio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * this.pixelRatio));
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
    this.ctx.setTransform(this.canvas.width / VIRTUAL_WIDTH, 0, 0, this.canvas.height / VIRTUAL_HEIGHT, 0, 0);
  }

  setState(state) {
    this.state = state;
    this.ui.root.dataset.state = state;
    this.ui.screens.forEach((screen) => {
      screen.hidden = screen.dataset.screen !== state;
    });
    this.updateStaticUi();
    if (state === "title" || state === "ready") this.audio.playMusic("menu");
    if (state === "playing") this.audio.playMusic("gameplay");
    if (state === "paused") this.audio.playSfx("pause");
  }

  updateStaticUi() {
    const best = this.storage.getRuns()[0]?.score || 0;
    this.ui.best.forEach((item) => {
      item.textContent = String(best);
    });
    this.syncSettingsUi();
    this.renderLeaderboard();
  }

  syncSettingsUi() {
    this.ui.musicVolume.value = this.settings.musicVolume;
    this.ui.sfxVolume.value = this.settings.sfxVolume;
    this.ui.mute.checked = this.settings.mute;
    this.ui.reducedMotion.checked = this.settings.reducedMotion;
    this.ui.highContrast.checked = this.settings.highContrast;
    this.ui.screenShake.checked = this.settings.screenShake;
    this.ui.particles.checked = this.settings.particles;
    this.ui.root.classList.toggle("high-contrast", this.settings.highContrast);
  }

  updateSettingsFromUi() {
    this.settings = {
      musicVolume: Number(this.ui.musicVolume.value),
      sfxVolume: Number(this.ui.sfxVolume.value),
      mute: this.ui.mute.checked,
      reducedMotion: this.ui.reducedMotion.checked,
      highContrast: this.ui.highContrast.checked,
      screenShake: this.ui.screenShake.checked,
      particles: this.ui.particles.checked
    };
    this.storage.saveSettings(this.settings);
    this.audio.setSettings(this.settings);
    this.syncSettingsUi();
  }

  handleAction(action) {
    const actions = {
      play: () => this.readyRun(),
      restart: () => this.readyRun(),
      resume: () => this.setState("playing"),
      pause: () => this.state === "playing" && this.setState("paused"),
      menu: () => this.setState("title"),
      leaderboard: () => this.setState("leaderboard"),
      settings: () => this.setState("settings"),
      back: () => this.setState("title"),
      submitScore: () => this.submitScore(),
      resetScores: () => this.confirmReset(),
      cancelReset: () => {
        this.ui.resetConfirm.hidden = true;
      },
      confirmReset: () => {
        this.storage.resetRuns();
        this.ui.resetConfirm.hidden = true;
        this.renderLeaderboard();
        this.updateStaticUi();
      }
    };
    actions[action]?.();
  }

  primaryAction() {
    this.afterUserAudio();
    if (this.state === "title" || this.state === "gameover") {
      this.readyRun();
      return;
    }
    if (this.state === "ready") {
      this.startRun();
      this.flap();
      return;
    }
    if (this.state === "playing") this.flap();
  }

  afterUserAudio(sfxName) {
    this.audio.unlock().then(() => {
      if (sfxName) this.audio.playSfx(sfxName);
      if (this.state === "ready" || this.state === "title") this.audio.playMusic("menu");
      if (this.state === "playing") this.audio.playMusic("gameplay");
    }).catch(() => {});
  }

  readyRun() {
    this.resetRun();
    this.setState("ready");
  }

  startRun() {
    this.setState("playing");
  }

  resetRun() {
    this.player = this.createPlayer();
    this.obstacles = [];
    this.particles = [];
    this.elapsed = 0;
    this.distance = 0;
    this.score = 0;
    this.maxSpeed = 0;
    this.accumulator = 0;
    this.milestoneText = "";
    this.milestoneTimer = 0;
    this.pendingRun = null;
    this.runSubmitted = false;
    let previous = null;
    for (let i = 0; i < 4; i += 1) {
      previous = nextObstacle(previous, 0, 0, Math.random, VIRTUAL_WIDTH + 180);
      this.obstacles.push(previous);
    }
  }

  flap() {
    this.player.vy = GAME_CONFIG.physics.flapVelocity;
    this.player.flapPulse = 1;
    this.audio.playSfx("flap");
    if (this.settings.particles) {
      for (let i = 0; i < 7; i += 1) {
        this.addParticle(this.player.x - 22, this.player.y + 12, "#fff4a9", -120 - Math.random() * 90, (Math.random() - 0.5) * 100, 0.38);
      }
    }
  }

  step(dt) {
    this.pollGamepad();
    if (this.state !== "playing") {
      this.animateIdle(dt);
      return;
    }
    this.elapsed += dt;
    const difficulty = getDifficulty(this.score, this.elapsed);
    this.maxSpeed = Math.max(this.maxSpeed, difficulty.speed);
    this.distance += difficulty.speed * dt * GAME_CONFIG.world.metresPerPixel;
    this.player.vy = clamp(this.player.vy + GAME_CONFIG.physics.gravity * dt, -420, GAME_CONFIG.physics.terminalVelocity);
    this.player.y += this.player.vy * dt;
    const targetRotation = this.player.vy < 0 ? GAME_CONFIG.physics.riseRotation : clamp(this.player.vy / GAME_CONFIG.physics.terminalVelocity, 0, 1) * GAME_CONFIG.physics.fallRotation;
    this.player.rotation += (targetRotation - this.player.rotation) * Math.min(1, GAME_CONFIG.physics.rotationLerp * dt);
    this.player.wing += dt * (this.player.flapPulse > 0 ? 28 : 12);
    this.player.flapPulse = Math.max(0, this.player.flapPulse - dt * 5);

    for (const obstacle of this.obstacles) {
      obstacle.x -= difficulty.speed * dt;
      updateObstacleMotion(obstacle, this.elapsed);
      if (!obstacle.scored && obstacle.x + obstacle.width < this.player.x) {
        obstacle.scored = true;
        this.score += 1;
        this.audio.playSfx("score");
        this.scoreBurst(obstacle.x + obstacle.width, obstacle.center);
        this.checkMilestone();
      }
      if (collidesWithObstacle(this.player, obstacle, GAME_CONFIG)) this.endRun("obstacle");
    }
    if (hitsWorldBounds(this.player, GAME_CONFIG)) this.endRun("bounds");

    this.obstacles = this.obstacles.filter((obstacle) => obstacle.x > -obstacle.width - 40);
    while (this.obstacles.length < 5) {
      this.obstacles.push(nextObstacle(this.obstacles[this.obstacles.length - 1], this.score, this.elapsed));
    }
    this.milestoneTimer = Math.max(0, this.milestoneTimer - dt);
    this.updateParticles(dt);
  }

  animateIdle(dt) {
    this.player.wing += dt * 7;
    this.player.blink += dt;
    this.player.y += Math.sin(performance.now() / 480) * 0.025;
    this.updateParticles(dt);
  }

  pollGamepad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = [...pads].find(Boolean);
    const pressed = Boolean(pad && (pad.buttons[0]?.pressed || pad.buttons[12]?.pressed));
    if (pressed && !this.lastGamepadPressed) this.primaryAction();
    this.lastGamepadPressed = pressed;
  }

  endRun() {
    if (this.state !== "playing") return;
    this.player.hurt = 1;
    this.cameraShake = this.settings.screenShake ? 14 : 0;
    this.audio.playSfx("collision");
    const runs = this.storage.getRuns();
    const run = {
      name: "PAL",
      score: this.score,
      distance: this.distance,
      maxSpeed: this.maxSpeed,
      date: new Date().toISOString()
    };
    this.pendingRun = run;
    const worthy = isLeaderboardWorthy(runs, run.score, run.distance);
    this.ui.finalScore.textContent = String(run.score);
    this.ui.finalBest.textContent = String(Math.max(run.score, runs[0]?.score || 0));
    this.ui.finalDistance.textContent = `${Math.floor(run.distance)} m`;
    this.ui.finalSpeed.textContent = `${Math.round(run.maxSpeed)} px/s`;
    this.ui.finalRank.textContent = rankForScore(run.score);
    this.ui.finalCelebration.hidden = !worthy;
    this.ui.namePanel.hidden = !worthy;
    this.ui.nameInput.value = "";
    if (!worthy) this.submitScore(true);
    else this.audio.playSfx("highScore");
    this.setState("gameover");
  }

  submitScore(skipName = false) {
    if (!this.pendingRun || this.runSubmitted) return;
    const name = skipName ? "PAL" : sanitiseName(this.ui.nameInput.value);
    this.storage.saveRun({ ...this.pendingRun, name });
    this.runSubmitted = true;
    this.ui.namePanel.hidden = true;
    this.renderLeaderboard();
    this.updateStaticUi();
  }

  confirmReset() {
    this.ui.resetConfirm.hidden = false;
  }

  checkMilestone() {
    const milestone = getDifficulty(this.score, this.elapsed).milestone;
    if (milestone && milestone.score === this.score) {
      this.milestoneText = milestone.label;
      this.milestoneTimer = 2.2;
    }
  }

  scoreBurst(x, y) {
    if (!this.settings.particles) return;
    for (let i = 0; i < 14; i += 1) {
      this.addParticle(x, y, ["#ffdf70", "#f680a8", "#7bd3c4"][i % 3], (Math.random() - 0.5) * 220, (Math.random() - 0.5) * 170, 0.7);
    }
  }

  addParticle(x, y, color, vx, vy, life) {
    if (this.particles.length >= GAME_CONFIG.particles.max) this.particles.shift();
    this.particles.push({ x, y, color, vx, vy, life, maxLife: life, size: 3 + Math.random() * 5 });
  }

  updateParticles(dt) {
    this.particles.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 180 * dt;
      p.life -= dt;
    });
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  renderLeaderboard() {
    const runs = this.storage.getRuns();
    this.ui.leaderboardBody.innerHTML = runs.length
      ? runs.map((run, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(run.name)}</td>
          <td>${run.score}</td>
          <td>${run.distance} m</td>
          <td>${run.maxSpeed}</td>
          <td>${new Date(run.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</td>
        </tr>
      `).join("")
      : `<tr><td colspan="6">No saved flights yet. Runs are stored on this device.</td></tr>`;
  }

  loop(timestamp) {
    const rawDt = Math.min(0.05, (timestamp - this.lastFrame || 16.67) / 1000);
    this.lastFrame = timestamp;
    this.accumulator += rawDt;
    while (this.accumulator >= GAME_CONFIG.physics.fixedStep) {
      this.step(GAME_CONFIG.physics.fixedStep);
      this.accumulator -= GAME_CONFIG.physics.fixedStep;
    }
    this.draw(rawDt);
    this.raf = requestAnimationFrame(this.loop);
  }

  draw(dt) {
    const ctx = this.ctx;
    const difficulty = getDifficulty(this.score, this.elapsed);
    const shake = this.cameraShake;
    this.cameraShake = Math.max(0, this.cameraShake - dt * 32);
    ctx.save();
    ctx.setTransform(this.canvas.width / VIRTUAL_WIDTH, 0, 0, this.canvas.height / VIRTUAL_HEIGHT, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
    this.drawBackground(ctx, difficulty);
    this.drawObstacles(ctx);
    this.drawParticles(ctx);
    this.drawPlayer(ctx);
    this.drawForeground(ctx, difficulty);
    if (this.milestoneTimer > 0) this.drawMilestone(ctx);
    ctx.restore();
    this.ui.score.textContent = String(this.score);
    this.ui.distance.textContent = `${Math.floor(this.distance)} m`;
    this.ui.speed.textContent = `${Math.round(difficulty.speed)}`;
  }

  // --- Background: flat sky, a handful of sticker-style clouds. Flat fill
  // + ink outline + a hard offset shadow, same rule as every DOM panel.
  drawBackground(ctx, difficulty) {
    ctx.fillStyle = PALETTE.sky;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    const t = this.elapsed * difficulty.speed;
    this.cloudLayer(ctx, t * 0.22);
  }

  cloudLayer(ctx, offset) {
    const period = 260;
    const count = Math.ceil(VIRTUAL_WIDTH / period) + 2;
    const span = period * count;
    const shadow = 6;
    ctx.save();
    for (let i = -1; i < count; i += 1) {
      const rnd = seeded(i * 733 + 5);
      const y = 90 + rnd() * 150;
      const scale = 0.75 + rnd() * 0.5;
      const x = ((i * period - offset) % span + span) % span - period;
      ctx.save();
      ctx.translate(x + shadow, y + shadow);
      ctx.scale(scale, scale);
      ctx.fillStyle = PALETTE.ink;
      cloudPath(ctx);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = PALETTE.cream;
      ctx.strokeStyle = PALETTE.ink;
      ctx.lineWidth = 4 / scale;
      cloudPath(ctx);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  // --- Obstacles: a single flat pipe style (mid-green body, darker-green
  // flanged cap, crisp dark outline). No per-obstacle skins, no gradients.
  drawObstacles(ctx) {
    for (const obstacle of this.obstacles) {
      const topH = obstacle.center - obstacle.gap / 2;
      const bottomY = obstacle.center + obstacle.gap / 2;
      this.drawObstaclePart(ctx, obstacle, 0, topH, true);
      this.drawObstaclePart(ctx, obstacle, bottomY, VIRTUAL_HEIGHT - GAME_CONFIG.world.groundHeight - bottomY, false);
    }
  }

  drawObstaclePart(ctx, obstacle, y, h, top) {
    if (h <= 0) return;
    const x = obstacle.x;
    const w = obstacle.width;
    const highContrast = this.settings.highContrast;
    const body = highContrast ? "#2a2a44" : PALETTE.green;
    const cap = highContrast ? "#000000" : PALETTE.greenDeep;
    const capH = 32;
    const capOverhang = 9;
    const shadow = 7;
    const capY = top ? y + h - capH : y;

    ctx.fillStyle = PALETTE.ink;
    ctx.fillRect(x + shadow, y + shadow, w, h);
    ctx.fillRect(x - capOverhang + shadow, capY + shadow, w + capOverhang * 2, capH);

    ctx.fillStyle = body;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = cap;
    ctx.fillRect(x - capOverhang, capY, w + capOverhang * 2, capH);

    ctx.strokeStyle = PALETTE.ink;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
    ctx.strokeRect(x - capOverhang, capY, w + capOverhang * 2, capH);
  }

  // --- Player: same sticker-toy rule as everything else — flat fill, ink
  // outline, one hard offset shadow behind the whole silhouette. Kept the
  // green "Yoshi" identity (the name and every menu screen are built
  // around it); the coral beak pulls the same accent colour used for
  // celebration/danger elsewhere into the character instead of inventing
  // a one-off hue.
  drawPlayer(ctx) {
    const p = this.player;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    const squash = 1 + p.flapPulse * 0.08;
    ctx.scale(1 + p.flapPulse * 0.06, 1 / squash);
    const bodyRadii = [30, 24, 25, 23, 27, 21];

    ctx.fillStyle = PALETTE.ink;
    blob(ctx, 6, 6, bodyRadii, 1);
    ctx.fill();

    ctx.fillStyle = p.hurt ? "#8fe0ac" : PALETTE.green;
    ctx.strokeStyle = PALETTE.ink;
    ctx.lineWidth = 4;
    blob(ctx, 0, 0, bodyRadii, 1);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = PALETTE.cream;
    ctx.beginPath();
    ctx.ellipse(15, -1, 22, 16, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = PALETTE.ink;
    const blink = Math.sin(p.blink * 0.9) > 0.985 ? 1 : 0;
    if (blink) {
      ctx.strokeStyle = PALETTE.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(24, -12);
      ctx.lineTo(32, -12);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(28, -12, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = PALETTE.coral;
    ctx.strokeStyle = PALETTE.ink;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(36, -7);
    ctx.quadraticCurveTo(52, -2, 36, 7);
    ctx.quadraticCurveTo(45, -2, 36, -7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const wingLift = Math.sin(p.wing) * 10 - p.flapPulse * 12;
    ctx.fillStyle = PALETTE.yellow;
    ctx.strokeStyle = PALETTE.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(-10, 1 + wingLift, 19, 10, -0.65, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = PALETTE.greenDeep;
    ctx.beginPath();
    ctx.ellipse(-26, 2, 12, 8, -0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawParticles(ctx) {
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // --- Ground: flat two-tone green, split by a thick ink line. Same flat
  // fill + ink language as everything else, no gradient/texture.
  drawForeground(ctx) {
    const groundY = VIRTUAL_HEIGHT - GAME_CONFIG.world.groundHeight;
    const splitH = 40;
    ctx.fillStyle = PALETTE.green;
    ctx.fillRect(0, groundY, VIRTUAL_WIDTH, splitH);
    ctx.fillStyle = PALETTE.greenDeep;
    ctx.fillRect(0, groundY + splitH, VIRTUAL_WIDTH, GAME_CONFIG.world.groundHeight - splitH);
    ctx.fillStyle = PALETTE.ink;
    ctx.fillRect(0, groundY, VIRTUAL_WIDTH, 5);
    ctx.fillRect(0, groundY + splitH, VIRTUAL_WIDTH, 4);
  }

  drawMilestone(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.milestoneTimer);
    const w = 280;
    const h = 50;
    const x = VIRTUAL_WIDTH / 2 - w / 2;
    const y = 82;
    const shadow = 5;
    ctx.fillStyle = PALETTE.ink;
    roundRect(ctx, x + shadow, y + shadow, w, h, 16);
    ctx.fill();
    ctx.fillStyle = PALETTE.cream;
    roundRect(ctx, x, y, w, h, 16);
    ctx.fill();
    ctx.strokeStyle = PALETTE.ink;
    ctx.lineWidth = 3;
    roundRect(ctx, x, y, w, h, 16);
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = "800 22px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.milestoneText, VIRTUAL_WIDTH / 2, y + h / 2 + 1);
    ctx.restore();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.audio.stopMusic();
  }
}

function rankForScore(score) {
  if (score >= 200) return "Skybound wanderer";
  if (score >= 100) return "Moonlit legend";
  if (score >= 50) return "Hilltop ace";
  if (score >= 25) return "Cloud skipper";
  if (score >= 10) return "Garden glider";
  return "Fresh hatchling";
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function blob(ctx, x, y, radii, scale = 1) {
  ctx.beginPath();
  for (let i = 0; i <= radii.length; i += 1) {
    const angle = (i / radii.length) * Math.PI * 2;
    const radius = radii[i % radii.length] * scale;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius * 0.72;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function cloudPath(ctx) {
  ctx.beginPath();
  ctx.moveTo(-34, 10);
  ctx.bezierCurveTo(-40, -6, -22, -20, -8, -14);
  ctx.bezierCurveTo(-4, -28, 20, -28, 24, -12);
  ctx.bezierCurveTo(40, -14, 46, 4, 34, 12);
  ctx.bezierCurveTo(38, 22, 24, 30, 10, 24);
  ctx.bezierCurveTo(0, 32, -22, 30, -26, 18);
  ctx.bezierCurveTo(-34, 20, -38, 14, -34, 10);
  ctx.closePath();
}

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

window.yoshiBirdGame = new YoshiBirdGame();
