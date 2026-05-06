import { audioManager } from "../audio/audioManager";

export function useAudio() {
  const playVoice = (soundName) => {
    audioManager.play(`voice-${soundName}`);
  };

  const playUI = (name) => {
    audioManager.play(name);
  };

  return {
    playVoice,
    playUI,
  };
}
