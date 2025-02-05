import styled from "styled-components";
import { Device } from "../../helpers/media";
import { StyledHeader } from "./Header";

export const StyledPage = styled.div`
  position: relative;

  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device("768px")} {
    height: auto;
    width: 100%;
    display: inline-flex;
  }

  ${StyledHeader} {
    position: absolute;

    top: 0;
    left: 0;
  }
`;
