import styled from "styled-components";
import { StyledHeader } from "./Header";

export const StyledPage = styled.div`
  position: relative;

  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  ${StyledHeader} {
    position: absolute;

    top: 0;
    left: 0;
  }
`;
