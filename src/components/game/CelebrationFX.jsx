// src/components/game/CelebrationFX.jsx

import ConfettiExplosion from "react-confetti-explosion";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

export function CelebrationFX({ active }) {
  return (
    <Wrapper>
      <AnimatePresence>
        {active && (
          <ConfettiExplosion
            force={0.6}
            duration={2200}
            particleCount={50}
            width={1200}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  pointer-events: none;
`;
