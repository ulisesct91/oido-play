import styled from "styled-components";

export function SessionProgress({ current, total }) {
  return (
    <Wrapper>
      <Label>
        Pregunta {current} de {total}
      </Label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Label = styled.div`
  font-size: 15px;
  font-weight: 700;

  color: #6b648f;
`;
