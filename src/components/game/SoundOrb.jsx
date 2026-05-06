import styled from "styled-components";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

export function SoundOrb({ onClick }) {
  return (
    <Wrapper>
      <Wave
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0, 0.25],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
        }}
      />

      <WaveTwo
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.18, 0, 0.18],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
        }}
      />

      <OrbButton
        whileTap={{
          scale: 0.96,
        }}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        onClick={onClick}
      >
        <Volume2 size={34} strokeWidth={2.5} />
      </OrbButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  width: 220px;
  height: 220px;

  margin: auto;
`;

const Wave = styled(motion.div)`
  position: absolute;
  inset: 0;

  border-radius: 999px;

  background: rgba(123, 97, 255, 0.18);
`;

const WaveTwo = styled(motion.div)`
  position: absolute;
  inset: 0;

  border-radius: 999px;

  background: rgba(123, 97, 255, 0.12);
`;

const OrbButton = styled(motion.button)`
  position: absolute;
  inset: 22px;

  border: 0;
  border-radius: 999px;

  background: linear-gradient(180deg, #7b61ff, #5c45f5);

  color: white;

  display: grid;
  place-items: center;

  cursor: pointer;

  box-shadow: 0 20px 50px rgba(92, 69, 245, 0.28);
`;
