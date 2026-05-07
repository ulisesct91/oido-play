// src/components/game/OptionButton.jsx

import styled from "styled-components";
import { motion } from "framer-motion";

export function OptionButton({
  children,
  onClick,
  correct,
  wrong,
  showCorrectAnswer,
}) {
  return (
    <Button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      correct={correct}
      wrong={wrong}
      showCorrectAnswer={showCorrectAnswer}
    >
      {children}
    </Button>
  );
}

const Button = styled(motion.button)`
  height: 64px;
  border: 0;
  border-radius: 22px;

  font-size: 22px;
  font-weight: 700;

  cursor: pointer;

  background: ${({ correct, wrong, showCorrectAnswer }) => {
    if (correct) {
      return `
        linear-gradient(
          180deg,
          #7dffb3,
          #50c878
        )
      `;
    }

    if (showCorrectAnswer) {
      return `
        linear-gradient(
          180deg,
          #7dffb3,
          #50c878
        )
      `;
    }

    if (wrong) {
      return `
        linear-gradient(
          180deg,
          #ff9f9f,
          #ff6b6b
        )
      `;
    }

    return `
      linear-gradient(
        180deg,
        #ffffff,
        #f3efff
      )
    `;
  }};
  border: 1px solid rgba(255, 255, 255, 0.5);

  backdrop-filter: blur(12px);

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  color: #2c2552;

  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;
