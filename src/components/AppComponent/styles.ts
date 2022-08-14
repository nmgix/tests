import styled from "styled-components";
import { GridWrapper } from "../EventsGroup/GridComponent/styles";

export const AppWrapper = styled.div`
  width: 740px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  & > * {
    flex: 0 1 auto;
  }

  ${GridWrapper} {
    flex: 1 1 auto;
  }
`;
