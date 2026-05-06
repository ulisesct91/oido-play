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
  height: 86px;
  border: 0;
  border-radius: 28px;

  font-size: 30px;
  font-weight: 900;

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

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  color: #191442;

  transition:
    background 0.2s,
    transform 0.15s;
`;
