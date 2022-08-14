import React from "react";
import styled from "styled-components";
import { StyledTD } from "../MemoizedGroup/MemoizedTDComponent/styles";
import { StyledTR } from "../MemoizedGroup/MemoizedTRComponent/styles";

export type GridButtonProps = {
  selected: boolean;
  scheduled: boolean;
};

//
export const GridButton = styled.button<GridButtonProps>`
  background-color: ${(props) => (props.selected ? "#b3b7ff" : props.scheduled ? "#ebecff" : "transparent")};

  cursor: pointer;

  width: 100%;
  height: 100%;

  border: none;

  &:hover {
    background-color: #7980ff;
  }
`;
export const GridWrapper = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  padding-left: 0.75rem;
`;

//
const StyledTable = styled.table`
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;

  ${StyledTR}:nth-last-child(2) {
    ${StyledTD} {
      border-bottom: none;
    }
  }

  ${StyledTR}:last-child {
    ${StyledTD} {
      border-right: none;
      border-bottom: none;
      height: 0px;
    }
  }
`;

export const StyledTableGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledTable>
      <tbody>{children}</tbody>
    </StyledTable>
  );
};
