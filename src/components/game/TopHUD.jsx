// src/components/game/TopHUD.jsx

import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

export function TopHUD({ score, streak, progress }) {
  return (
    <Wrapper>
      <TopRow>
        <StatCard>⭐ {score}</StatCard>

        <StatCard>🔥 {streak}</StatCard>
      </TopRow>

      <ProgressBar progress={progress} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 460px;
  margin: auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatCard = styled.div`
  padding: 14px 18px;
  border-radius: 22px;

  background: white;

  font-weight: 900;

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
`;
