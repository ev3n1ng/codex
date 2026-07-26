import { GAME_CONFIG } from "./config.js";

const AUDIO_FILES = {
  menu: "audio/menu-theme-placeholder.wav",
  gameplay: "audio/gameplay-theme-placeholder.wav",
  flap: "audio/flap-placeholder.wav",
  score: "audio/score-placeholder.wav",
  collision: "audio/collision-placeholder.wav",
  gameOver: "audio/game-over-placeholder.wav",
  highScore: "audio/new-high-score-placeholder.wav",
  button: "audio/button-selection-placeholder.wav",
  pause: "audio/pause-resume-placeholder.wav"
};

export class AudioManager {
  constructor(settings) {
    this.settings = settings;
    this.ctx = null;
    this.enabled = false;
    this.currentMusic = null;
    this.buffers = new Map();
  }

  async unlock() {
    if (this.enabled || this.settings.mute) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = this.ctx || new AudioContext();
    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.enabled = true;
    this.preload();
  }

  setSettings(settings) {
    this.settings = settings;
    if (settings.mute || settings.musicVolume <= 0) this.stopMusic();
  }

  preload() {
    Object.values(AUDIO_FILES).forEach((url) => this.load(url));
  }

  async load(url) {
    if (!this.ctx || this.buffers.has(url)) return this.buffers.get(url);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("missing audio");
      const buffer = await this.ctx.decodeAudioData(await response.arrayBuffer());
      this.buffers.set(url, buffer);
      return buffer;
    } catch {
      this.buffers.set(url, null);
      return null;
    }
  }

  async playMusic(kind) {
    if (!this.canPlay("music")) return;
    const url = kind === "gameplay" ? AUDIO_FILES.gameplay : AUDIO_FILES.menu;
    if (this.currentMusic?.url === url) return;
    this.stopMusic();
    const buffer = await this.load(url);
    if (buffer) {
      const source = this.ctx.createBufferSource();
      const gain = this.ctx.createGain();
      source.buffer = buffer;
      source.loop = true;
      gain.gain.value = this.settings.musicVolume ?? GAME_CONFIG.audio.musicVolume;
      source.connect(gain).connect(this.ctx.destination);
      source.start();
      this.currentMusic = { source, url };
    } else {
      this.currentMusic = { source: this.createToneLoop(kind), url };
    }
  }

  stopMusic() {
    if (!this.currentMusic) return;
    try {
      this.currentMusic.source.stop();
    } catch {
      clearInterval(this.currentMusic.source.interval);
    }
    this.currentMusic = null;
  }

  playSfx(name) {
    if (!this.canPlay("sfx")) return;
    const url = AUDIO_FILES[name];
    if (!url) return;
    this.load(url).then((buffer) => {
      if (buffer) {
        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        source.buffer = buffer;
        gain.gain.value = this.settings.sfxVolume ?? GAME_CONFIG.audio.sfxVolume;
        source.connect(gain).connect(this.ctx.destination);
        source.start();
      } else {
        this.toneFor(name);
      }
    });
  }

  canPlay(type) {
    if (!this.ctx || !this.enabled || this.settings.mute) return false;
    if (type === "music") return (this.settings.musicVolume ?? 0) > 0;
    return (this.settings.sfxVolume ?? 0) > 0;
  }

  toneFor(name) {
    const tones = {
      flap: [520, 0.055, "triangle"],
      score: [760, 0.09, "sine"],
      collision: [120, 0.18, "sawtooth"],
      gameOver: [180, 0.24, "triangle"],
      highScore: [920, 0.28, "sine"],
      button: [440, 0.05, "sine"],
      pause: [330, 0.08, "triangle"]
    };
    const [frequency, duration, type] = tones[name] || tones.button;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime((this.settings.sfxVolume ?? GAME_CONFIG.audio.sfxVolume) * 0.16, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  createToneLoop(kind) {
    const interval = setInterval(() => {
      if (!this.canPlay("music")) return;
      const base = kind === "gameplay" ? 246 : 196;
      const note = base + [0, 42, 84, 127][Math.floor(Math.random() * 4)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = note;
      gain.gain.setValueAtTime((this.settings.musicVolume ?? GAME_CONFIG.audio.musicVolume) * 0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    }, kind === "gameplay" ? 520 : 780);
    return { interval, stop: () => clearInterval(interval) };
  }
}
