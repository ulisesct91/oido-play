// src/pages/LevelSelectPage.jsx

import styled from "styled-components";
import { motion } from "framer-motion";
import { levels } from "../data/levels";
import { useNavigate } from "react-router-dom";

export function LevelSelectPage() {
  const navigate = useNavigate();

  return (
    <Screen>
      <Container>
        <Header>
          <Title>Elige tu nivel</Title>
          <Coins>⭐ 120</Coins>
        </Header>

        <ProgressSection>
          <ProgressLabel>Progreso general</ProgressLabel>

          <ProgressBar>
            <ProgressFill />
          </ProgressBar>

          <ProgressText>35% completado</ProgressText>
        </ProgressSection>

        <LevelsGrid>
          {levels.map((level, index) => (
            <LevelCard
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => {
                if (!level.locked) {
                  navigate(`/game/${level.id}`);
                }
              }}
              locked={level.locked}
            >
              <LevelIcon bg={level.color}>{level.icon}</LevelIcon>

              <LevelContent>
                <LevelTitle>{level.title}</LevelTitle>

                <LevelProgress>
                  {level.completed}/{level.total}
                </LevelProgress>
              </LevelContent>

              <RightSide>{level.locked ? "🔒" : "➡️"}</RightSide>
            </LevelCard>
          ))}
        </LevelsGrid>
      </Container>
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(180deg, #f8f7ff, #ede8ff);
`;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  color: #191442;
`;

const Coins = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  background: white;
  font-weight: 800;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
`;

const ProgressSection = styled.div`
  margin-top: 28px;
  padding: 24px;
  border-radius: 28px;
  background: white;
  box-shadow: 0 10px 30px rgba(80, 65, 150, 0.08);
`;

const ProgressLabel = styled.div`
  font-weight: 700;
`;

const ProgressBar = styled.div`
  height: 18px;
  margin-top: 14px;
  border-radius: 999px;
  overflow: hidden;
  background: #ece7ff;
`;

const ProgressFill = styled.div`
  width: 35%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #7b61ff, #5c45f5);
`;

const ProgressText = styled.div`
  margin-top: 10px;
  color: #6e6893;
  font-weight: 700;
`;

const LevelsGrid = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const LevelCard = styled(motion.button)`
  width: 100%;
  padding: 18px;
  border: 0;
  border-radius: 28px;
  background: ${({ locked }) => (locked ? "#f1eefc" : "white")};
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(80, 65, 150, 0.08);

  opacity: ${({ locked }) => (locked ? 0.7 : 1)};

  &:active {
    transform: scale(0.98);
  }
`;

const LevelIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  font-size: 32px;
  background: ${({ bg }) => bg};
`;

const LevelContent = styled.div`
  flex: 1;
  text-align: left;
`;

const LevelTitle = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const LevelProgress = styled.div`
  margin-top: 6px;
  color: #6e6893;
  font-weight: 700;
`;

const RightSide = styled.div`
  font-size: 24px;
`;
