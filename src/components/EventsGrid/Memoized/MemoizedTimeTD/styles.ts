import styled from "styled-components";
import { StyledTD } from "../MemoizedTD/styles";

export const TimeStyledTD = styled(StyledTD)`
  position: relative;
  time {
    position: absolute;
    opacity: 0.35;
    transform: translate(0%, calc(-50% - 0.2rem));
  }
`;
