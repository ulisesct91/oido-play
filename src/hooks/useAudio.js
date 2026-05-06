// src/hooks/useAudio.js

import { Howl } from "howler";

export function useAudio() {
  const playVoice = (soundName) => {
    const sound = new Howl({
      src: [`/src/assets/audio/vowels/${soundName}.ogg`],
    });

    sound.play();
  };

  const playUI = (name) => {
    const sound = new Howl({
      src: [`/src/assets/audio/ui/${name}.ogg`],
      volume: 0.5,
    });

    sound.play();
  };

  return {
    playVoice,
    playUI,
  };
}
