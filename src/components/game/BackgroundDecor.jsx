// src/components/game/BackgroundDecor.jsx

import styled from "styled-components";
import { motion } from "framer-motion";

export function BackgroundDecor() {
  return (
    <>
      <OrbOne
        animate={{
          y: [0, -20, 0],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <OrbTwo
        animate={{
          y: [0, 20, 0],
          x: [0, -16, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <OrbThree
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />
    </>
  );
}

const Orb = styled(motion.div)`
  position: fixed;
  border-radius: 999px;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
`;

const OrbOne = styled(Orb)`
  width: 320px;
  height: 320px;

  top: -100px;
  left: -100px;

  background: #7b61ff;
`;

const OrbTwo = styled(Orb)`
  width: 260px;
  height: 260px;

  bottom: -80px;
  right: -80px;

  background: #50c878;
`;

const OrbThree = styled(Orb)`
  width: 220px;
  height: 220px;

  top: 40%;
  left: 50%;

  background: #ffe66d;

  transform: translateX(-50%);
`;
