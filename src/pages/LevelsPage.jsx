// src/pages/LevelsPage.jsx

import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { gameModes } from "../data/gameModes";

import { useGameStore } from "../store/gameStore";

export function LevelsPage() {
  const navigate = useNavigate();

  const { unlockedModes } = useGameStore();

  const levels = Object.values(gameModes);

  return (
    <Screen>
      <Header>
        <Title>Entrena tu oído</Title>

        <Subtitle>Escucha y elige correctamente 💙</Subtitle>
      </Header>

      <LevelsGrid>
        {levels.map((level, index) => {
          const isUnlocked = unlockedModes.includes(level.id);

          return (
            <LevelCard
              key={level.id}
              whileTap={
                isUnlocked
                  ? {
                      scale: 0.98,
                    }
                  : {}
              }
              locked={!isUnlocked}
              onClick={() => {
                if (!isUnlocked) return;

                navigate(`/game/${level.id}`);
              }}
            >
              <TopRow>
                <LevelEmoji>
                  {isUnlocked ? (index === 0 ? "🎧" : "🎵") : "🔒"}
                </LevelEmoji>

                <StatusBadge locked={!isUnlocked}>
                  {isUnlocked ? "Disponible" : "Bloqueado"}
                </StatusBadge>
              </TopRow>

              <LevelTitle>{level.title}</LevelTitle>

              <LevelInfo>{level.questions.length} ejercicios</LevelInfo>

              <PlayButton locked={!isUnlocked}>
                {isUnlocked ? "Jugar" : "Bloqueado"}
              </PlayButton>
            </LevelCard>
          );
        })}
      </LevelsGrid>
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;

  padding: 32px 24px;

  background: linear-gradient(180deg, #f8f7fc, #f3f0ff);
`;

const Header = styled.div`
  max-width: 520px;

  margin: auto;

  text-align: center;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;

  color: #2c2552;
`;

const Subtitle = styled.div`
  margin-top: 12px;

  font-size: 18px;
  font-weight: 500;

  color: #6b648f;

  line-height: 1.5;
`;

const LevelsGrid = styled.div`
  display: grid;
  gap: 20px;

  max-width: 520px;

  margin: 36px auto 0;
`;

const LevelCard = styled(motion.button)`
  padding: 28px;

  border: 0;
  border-radius: 30px;

  background: ${({ locked }) =>
    locked ? "rgba(240,240,248,0.7)" : "rgba(255,255,255,0.78)"};

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.5);

  text-align: left;

  cursor: ${({ locked }) => (locked ? "not-allowed" : "pointer")};

  opacity: ${({ locked }) => (locked ? 0.72 : 1)};

  box-shadow: 0 10px 30px rgba(31, 38, 135, 0.08);

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: ${({ locked }) => (locked ? "none" : "translateY(-2px)")};

    box-shadow: ${({ locked }) =>
      locked
        ? "0 10px 30px rgba(31,38,135,0.08)"
        : "0 16px 40px rgba(31,38,135,0.12)"};
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LevelEmoji = styled.div`
  font-size: 34px;
`;

const StatusBadge = styled.div`
  padding: 8px 12px;

  border-radius: 999px;

  background: ${({ locked }) =>
    locked ? "rgba(160,160,180,0.12)" : "rgba(123,97,255,0.1)"};

  color: ${({ locked }) => (locked ? "#8a87a3" : "#5c45f5")};

  font-size: 13px;
  font-weight: 700;
`;

const LevelTitle = styled.div`
  margin-top: 18px;

  font-size: 26px;
  font-weight: 800;

  color: #2c2552;

  letter-spacing: -0.5px;
`;

const LevelInfo = styled.div`
  margin-top: 8px;

  font-size: 16px;
  font-weight: 500;

  color: #6b648f;
`;

const PlayButton = styled.div`
  width: fit-content;

  margin-top: 24px;

  padding: 12px 18px;

  border-radius: 999px;

  background: ${({ locked }) =>
    locked
      ? "#d8d5ea"
      : `
          linear-gradient(
            180deg,
            #7b61ff,
            #5c45f5
          )
        `};

  color: ${({ locked }) => (locked ? "#7e7a99" : "white")};

  font-size: 15px;
  font-weight: 700;
`;
