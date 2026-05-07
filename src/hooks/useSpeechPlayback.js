import { useState } from "react";

import { AUDIO_VISUALIZER_DURATION } from "../config/gameConfig";

import { useAudio } from "./useAudio";

export function useSpeechPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);

  const { playVoice, playUI } = useAudio();

  const replayAudio = (sound) => {
    setIsPlaying(true);

    playVoice(sound);

    setTimeout(() => {
      setIsPlaying(false);
    }, AUDIO_VISUALIZER_DURATION);
  };

  return {
    isPlaying,

    replayAudio,

    playUI,
  };
}
