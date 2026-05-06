import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

export function TopHUD({ score, streak, progress }) {
  return (
    <Wrapper>
      <TopRow>
        <Pill>🔥 {streak}</Pill>

        <Pill>⭐ {score}</Pill>
      </TopRow>

      <ProgressWrapper>
        <ProgressBar progress={progress} />
      </ProgressWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 430px;

  margin: auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Pill = styled.div`
  padding: 12px 18px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.7);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.4);

  font-size: 16px;
  font-weight: 700;

  color: #221b4b;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
`;

const ProgressWrapper = styled.div`
  margin-top: 24px;
`;
