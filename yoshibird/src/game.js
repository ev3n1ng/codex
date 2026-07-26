import { GAME_CONFIG, VIRTUAL_HEIGHT, VIRTUAL_WIDTH } from "./config.js";
import { collidesWithObstacle, hitsWorldBounds } from "./collision.js";
import { getDifficulty, clamp } from "./difficulty.js";
import { nextObstacle, updateObstacleMotion } from "./obstacles.js";
import { AudioManager } from "./audio.js";
import { createStorageService, isLeaderboardWorthy, sanitiseName } from "./leaderboard.js";

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
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.floor(rect.width * this.pixelRatio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * this.pixelRatio));
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
    this.player.vy = clamp(this.player.vy + GAME_CONFIG.physics.gravity * dt, -720, GAME_CONFIG.physics.terminalVelocity);
    this.player.y += this.player.vy * dt;
    const targetRotation = this.player.vy < 0 ? GAME_CONFIG.physics.riseRotation : clamp(this.player.vy / 720, 0, 1) * GAME_CONFIG.physics.fallRotation;
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

  drawBackground(ctx, difficulty) {
    const evening = clamp((this.score - 55) / 70, 0, 1);
    const gradient = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
    gradient.addColorStop(0, mix("#bfeeff", "#f6c0c7", evening));
    gradient.addColorStop(0.62, mix("#f9f0b7", "#f5d083", evening));
    gradient.addColorStop(1, mix("#a8e5b1", "#81c798", evening));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    this.crayonTexture(ctx, 0.12);
    const t = this.elapsed * difficulty.speed;
    this.cloudLayer(ctx, t * 0.1, 58, 0.8);
    this.hillLayer(ctx, t * 0.18, 420, "#88d09a", "#6abd89");
    this.hillLayer(ctx, t * 0.28, 466, "#58b978", "#379d63");
    this.drawFlowers(ctx, t * 0.54, difficulty.energy);
    if (difficulty.speed > GAME_CONFIG.difficulty.energeticSpeed && !this.settings.reducedMotion) {
      ctx.strokeStyle = "rgba(255,255,255,0.34)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 12; i += 1) {
        const x = (i * 92 - t * 0.7) % (VIRTUAL_WIDTH + 120);
        const y = 50 + ((i * 47) % 340);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 34, y - 4);
        ctx.stroke();
      }
    }
  }

  cloudLayer(ctx, offset, yBase, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    for (let i = -1; i < 7; i += 1) {
      const x = ((i * 190 - offset) % 1330 + 1330) % 1330 - 170;
      const y = yBase + Math.sin(i * 1.7) * 34;
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      blob(ctx, x, y, [36, 24, 44, 28, 30], 0.55);
      ctx.strokeStyle = "rgba(107,130,156,0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }

  hillLayer(ctx, offset, y, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, VIRTUAL_HEIGHT);
    for (let x = -80; x <= VIRTUAL_WIDTH + 80; x += 80) {
      const yy = y + Math.sin((x + offset) / 125) * 24 + Math.cos((x + offset) / 62) * 8;
      ctx.lineTo(x, yy);
    }
    ctx.lineTo(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  drawFlowers(ctx, offset, energy) {
    for (let i = 0; i < 34; i += 1) {
      const x = ((i * 43 - offset) % (VIRTUAL_WIDTH + 80) + VIRTUAL_WIDTH + 80) % (VIRTUAL_WIDTH + 80) - 40;
      const y = VIRTUAL_HEIGHT - 60 + Math.sin(i * 2.1) * 8;
      ctx.strokeStyle = "#327b58";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 11);
      ctx.lineTo(x + Math.sin(this.elapsed * (1 + energy) + i) * 3, y);
      ctx.stroke();
      ctx.fillStyle = ["#ff7ea7", "#fff06d", "#82d5ff"][i % 3];
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  crayonTexture(ctx, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    for (let i = 0; i < 42; i += 1) {
      ctx.beginPath();
      const y = (i * 23 + Math.sin(i) * 11) % VIRTUAL_HEIGHT;
      ctx.moveTo(0, y);
      ctx.lineTo(VIRTUAL_WIDTH, y + Math.sin(i * 4) * 10);
      ctx.stroke();
    }
    ctx.restore();
  }

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
    const palette = highContrast
      ? { fill: "#194b57", edge: "#fff6b8", detail: "#ffe45c" }
      : obstacle.variant === "flower-trunk"
        ? { fill: "#d99270", edge: "#7b4f38", detail: "#ffb1cd" }
        : obstacle.variant === "pastel-rock"
          ? { fill: "#b5badc", edge: "#626aa0", detail: "#e6e9ff" }
          : { fill: "#9fd7b0", edge: "#397c62", detail: "#f7f1a3" };
    roundRect(ctx, x, y - 18, w, h + 36, 28);
    ctx.fillStyle = palette.fill;
    ctx.fill();
    ctx.lineWidth = highContrast ? 6 : 4;
    ctx.strokeStyle = palette.edge;
    ctx.stroke();
    ctx.fillStyle = palette.detail;
    const capY = top ? y + h - 14 : y - 18;
    roundRect(ctx, x - 9, capY, w + 18, 34, 18);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = highContrast ? "#ffffff" : "rgba(255,255,255,0.3)";
    for (let i = 0; i < Math.max(2, h / 90); i += 1) {
      ctx.beginPath();
      ctx.arc(x + 22 + (i % 3) * 22, y + 34 + i * 62, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawPlayer(ctx) {
    const p = this.player;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    const squash = 1 + p.flapPulse * 0.08;
    ctx.scale(1 + p.flapPulse * 0.06, 1 / squash);
    ctx.fillStyle = p.hurt ? "#9bd1bd" : "#72d58a";
    ctx.strokeStyle = "#2e795d";
    ctx.lineWidth = 4;
    blob(ctx, 0, 0, [30, 24, 25, 23, 27, 21], 1);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#9ee7a9";
    ctx.beginPath();
    ctx.ellipse(15, -1, 22, 16, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff8d6";
    ctx.beginPath();
    ctx.ellipse(26, -11, 9, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1f3b46";
    const blink = Math.sin(p.blink * 0.9) > 0.985 ? 1 : 0;
    if (blink) {
      ctx.strokeStyle = "#1f3b46";
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
    ctx.strokeStyle = "#2e795d";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(42, -3);
    ctx.quadraticCurveTo(51, 0, 42, 5);
    ctx.stroke();
    const wingLift = Math.sin(p.wing) * 10 - p.flapPulse * 12;
    ctx.fillStyle = "#f9e881";
    ctx.beginPath();
    ctx.ellipse(-10, 1 + wingLift, 19, 10, -0.65, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#52b875";
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

  drawForeground(ctx) {
    ctx.fillStyle = "#3c9b65";
    ctx.fillRect(0, VIRTUAL_HEIGHT - GAME_CONFIG.world.groundHeight, VIRTUAL_WIDTH, GAME_CONFIG.world.groundHeight);
    ctx.fillStyle = "#62c97b";
    ctx.fillRect(0, VIRTUAL_HEIGHT - GAME_CONFIG.world.groundHeight, VIRTUAL_WIDTH, 16);
    ctx.strokeStyle = "rgba(35,104,72,0.45)";
    ctx.lineWidth = 3;
    for (let x = -20; x < VIRTUAL_WIDTH + 40; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, VIRTUAL_HEIGHT - 62);
      ctx.quadraticCurveTo(x + 8, VIRTUAL_HEIGHT - 78, x + 18, VIRTUAL_HEIGHT - 61);
      ctx.stroke();
    }
  }

  drawMilestone(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.milestoneTimer);
    ctx.fillStyle = "rgba(255,255,255,0.86)";
    roundRect(ctx, VIRTUAL_WIDTH / 2 - 138, 82, 276, 48, 18);
    ctx.fill();
    ctx.fillStyle = "#31515a";
    ctx.font = "700 23px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(this.milestoneText, VIRTUAL_WIDTH / 2, 113);
    ctx.restore();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.audio.stopMusic();
  }
}

function rankForScore(score) {
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

function mix(a, b, amount) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return `rgb(${Math.round(ca.r + (cb.r - ca.r) * amount)}, ${Math.round(ca.g + (cb.g - ca.g) * amount)}, ${Math.round(ca.b + (cb.b - ca.b) * amount)})`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
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
