import React, { memo, useState } from "react";
import styled from "styled-components";
import { CalendarEvent } from "../../../context/Context";

export type GridButtonProps = {
  selected: boolean;
  scheduled: boolean;
};

export type MemoizedTDProps = GridButtonProps & {
  eventId: number;
  date: Date;
  setSelectedCell: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
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
export const StyledTD = styled.td`
  padding: 0.2rem;
  flex: 1;

  height: 55px;
`;
export const TimeStyledTD = styled(StyledTD)`
  position: relative;
  time {
    position: absolute;
    opacity: 0.35;
    transform: translate(0%, calc(-50% - 0.2rem));
  }
`;
export const MemoizedTD: React.FC<MemoizedTDProps> = memo(
  (props) => {
    return (
      <StyledTD>
        <GridButton {...props} onClick={() => props.setSelectedCell({ date: props.date, id: props.eventId })} />
      </StyledTD>
    );
  },
  (prev, next) => prev.scheduled === next.scheduled && prev.selected === next.selected
);
//
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
//
export const StyledTable = styled.table`
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
