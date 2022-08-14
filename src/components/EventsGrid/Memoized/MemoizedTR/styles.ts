import styled from "styled-components";
import { StyledTD } from "../MemoizedTD/styles";

export const StyledTR = styled.tr`
  display: flex;
  justify-content: space-between;

  ${StyledTD} {
    border-right: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
  }

  ${StyledTD}:nth-child(1) {
    border-right: none;
    border-bottom: none;
  }

  ${StyledTD}:last-child {
    border-right: none;
  }
`;
