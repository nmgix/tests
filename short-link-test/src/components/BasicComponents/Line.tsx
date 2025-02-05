import styled from "styled-components";
type LineProps = {
  vertical?: boolean;
};

export const Line = styled.div<LineProps>`
  ${({ vertical }) => {
    return vertical
      ? {
          width: "2px",
          borderLeft: "1px solid black",
        }
      : {
          width: "100%",
          height: "2px",
          borderBottom: "1px solid black",
        };
  }}
  opacity: 0.3;
`;
