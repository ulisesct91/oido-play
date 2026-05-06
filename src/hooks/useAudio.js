import { speechEngine } from "../audio/speechEngine";

import { audioManager } from "../audio/audioManager";

export function useAudio() {
  const playVoice = (text) => {
    speechEngine.speak(text);
  };

  const playUI = (name) => {
    audioManager.play(name);
  };

  return {
    playVoice,
    playUI,
  };
}
