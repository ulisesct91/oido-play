// src/pages/GamePage.jsx
import { useState } from "react";
import styled from "styled-components";
import { gameModes } from "../data/gameModes";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { useSpeechPlayback } from "../hooks/useSpeechPlayback";

import { TopHUD } from "../components/game/TopHUD";
import { QuestionCard } from "../components/game/QuestionCard";
import { CelebrationFX } from "../components/game/CelebrationFX";
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
    <Screen>
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

      <GameContainer>
        <CelebrationFX active={showConfetti} />
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            combo={combo}
            selected={selected}
            status={status}
            onReplay={() => replayAudio(currentQuestion.sound)}
            onAnswer={handleAnswer}
            streak={streak}
            shake={shakeCard}
            showPoints={showPoints}
            isPlaying={isPlaying}
            sessionSpeed={sessionSpeed}
          />
        </AnimatePresence>
      </GameContainer>
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;
  padding: 24px;

  background: linear-gradient(180deg, #f8f7fc 0%, #f3f0ff 100%);
`;

const GameContainer = styled.div`
  min-height: calc(100vh - 140px);

  display: grid;
  place-items: center;
  padding-top: 32px;
`;
