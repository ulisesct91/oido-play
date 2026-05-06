// src/components/game/SessionCompleteModal.jsx

import styled from "styled-components";
import { motion } from "framer-motion";

export function SessionCompleteModal({ score, accuracy, onRetry }) {
  const getStars = () => {
    if (accuracy >= 90) return "⭐⭐⭐";
    if (accuracy >= 70) return "⭐⭐";
    return "⭐";
  };

  const getMessage = () => {
    if (accuracy >= 90) {
      return "¡Increíble trabajo!";
    }

    if (accuracy >= 70) {
      return "¡Lo hiciste muy bien!";
    }

    return "¡Sigue practicando!";
  };

  return (
    <Overlay>
      <Modal
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        <Emoji>🎉</Emoji>

        <Title>Sesión completada</Title>

        <Stars>{getStars()}</Stars>

        <Score>⭐ {score}</Score>

        <Accuracy>Precisión: {accuracy}%</Accuracy>

        <Message>{getMessage()}</Message>

        <RetryButton
          whileTap={{
            scale: 0.96,
          }}
          onClick={onRetry}
        >
          Jugar otra vez
        </RetryButton>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.35);

  display: grid;
  place-items: center;

  z-index: 100;
`;

const Modal = styled(motion.div)`
  width: 90%;
  max-width: 420px;

  padding: 36px 28px;

  border-radius: 36px;

  background: white;

  text-align: center;

  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
`;

const Emoji = styled.div`
  font-size: 72px;
`;

const Title = styled.h2`
  margin-top: 16px;

  font-size: 34px;

  color: #191442;
`;

const Stars = styled.div`
  margin-top: 18px;

  font-size: 48px;
`;

const Score = styled.div`
  margin-top: 20px;

  font-size: 28px;
  font-weight: 900;
`;

const Accuracy = styled.div`
  margin-top: 12px;

  font-size: 20px;
  font-weight: 700;

  color: #5b5675;
`;

const Message = styled.div`
  margin-top: 18px;

  font-size: 18px;
  font-weight: 700;
`;

const RetryButton = styled(motion.button)`
  width: 100%;

  margin-top: 28px;

  height: 70px;

  border: 0;
  border-radius: 999px;

  background: linear-gradient(180deg, #ffe66d, #ffc93c);

  font-size: 20px;
  font-weight: 900;

  cursor: pointer;
`;
