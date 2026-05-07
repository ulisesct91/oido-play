import styled from "styled-components";

import { AnimatePresence } from "framer-motion";

import { CelebrationFX } from "./CelebrationFX";

import { QuestionCard } from "./QuestionCard";

export function GameSession({
  currentQuestion,

  combo,
  selected,
  status,

  streak,

  shakeCard,
  showPoints,
  showConfetti,

  isPlaying,
  sessionSpeed,

  replayAudio,
  handleAnswer,
}) {
  if (!currentQuestion) {
    return null;
  }

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
  min-height: calc(100vh - 140px);

  display: grid;

  place-items: center;

  padding-top: 32px;
`;
