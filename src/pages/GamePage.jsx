// src/pages/GamePage.jsx
import { useState } from "react";
import styled from "styled-components";
import { gameModes } from "../data/gameModes";
import { useGameStore } from "../store/gameStore";
import { useSpeechPlayback } from "../hooks/useSpeechPlayback";
import { GameSession } from "../components/game/GameSession";

import { TopHUD } from "../components/game/TopHUD";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useGameSession } from "../hooks/useGameSession";

import { ProgressResultModal } from "../components/game/ProgressResultModal";

import { BackgroundDecor } from "../components/game/BackgroundDecor";
import { MIN_ACCURACY_TO_PASS } from "../config/gameConfig";

export function GamePage() {
  const { modeId } = useParams();
  const navigate = useNavigate();

  const mode = gameModes[modeId];

  const { coins, dailyStreak } = useGameStore();

  const { isPlaying, replayAudio, playUI } = useSpeechPlayback();

  const {
    currentQuestion,

    selected,
    status,

    sessionComplete,

    showConfetti,
    showPoints,
    shakeCard,

    questionIndex,

    score,
    streak,
    combo,

    accuracy,

    sessionSpeed,

    handleAnswer,
    handleRetry,
    prompt,
  } = useGameSession({
    mode,
    replayAudio,
    playUI,
  });
  const progress = Math.min(
    ((questionIndex + 1) / mode.sessionLength) * 100,
    100,
  );

  const handleExit = () => {
    navigate("/levels");
  };

  const handleContinue = () => {
    navigate("/levels");
  };

  if (!currentQuestion) return null;

  return (
    <Screen background={mode.theme.background}>
      <BackgroundDecor />
      {sessionComplete && (
        <ProgressResultModal
          requiredAccuracy={MIN_ACCURACY_TO_PASS}
          score={score}
          accuracy={accuracy}
          onRetry={handleRetry}
          onContinue={handleContinue}
          onExit={handleExit}
        />
      )}

      <TopHUD
        score={score}
        streak={streak}
        progress={progress}
        coins={coins}
        dailyStreak={dailyStreak}
      />
      <GameSession
        currentQuestion={currentQuestion}
        combo={combo}
        selected={selected}
        status={status}
        streak={streak}
        shakeCard={shakeCard}
        showPoints={showPoints}
        showConfetti={showConfetti}
        isPlaying={isPlaying}
        sessionSpeed={sessionSpeed}
        replayAudio={replayAudio}
        handleAnswer={handleAnswer}
        prompt={prompt}
      />
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;
  padding: 24px;

  background: ${({ background }) => background};
`;
