// src/audio/audioManager.js

import { Howl } from "howler";

class AudioManager {
  sounds = {};

  load(key, src, options = {}) {
    if (this.sounds[key]) {
      return;
    }

    this.sounds[key] = new Howl({
      src: [src],
      preload: true,
      html5: false,
      ...options,
    });
  }

  play(key) {
    const sound = this.sounds[key];

    if (!sound) return;

    sound.stop();
    sound.play();
  }

  stop(key) {
    const sound = this.sounds[key];

    if (!sound) return;

    sound.stop();
  }

  setVolume(key, volume) {
    const sound = this.sounds[key];

    if (!sound) return;

    sound.volume(volume);
  }
}

export const audioManager = new AudioManager();
