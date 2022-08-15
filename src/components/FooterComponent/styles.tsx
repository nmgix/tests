import { memo } from "react";
import styled from "styled-components";
import { CalendarEvent } from "../../context/Context";
import { Button } from "../../styles/shared";

const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  height: 100%;
  width: 100%;

  button {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

type FooterProps = {
  selectedCell: CalendarEvent | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  deleteScheduled: (event: CalendarEvent) => void;
};

export const MemoizedFooter: React.FC<FooterProps> = memo(
  ({ selectedCell, setSelectedDay, deleteScheduled }) => {
    return (
      <Footer>
        <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
        {selectedCell && selectedCell.scheduled === true ? (
          <Button onClick={() => deleteScheduled(selectedCell)}>Delete</Button>
        ) : (
          <></>
        )}
      </Footer>
    );
  },
  (prev, next) => {
    if (!next.selectedCell) {
      return false;
    }

    if (prev.selectedCell === null && next.selectedCell.scheduled === true) {
      return false;
    } else if (prev.selectedCell !== null && prev.selectedCell.scheduled !== next.selectedCell.scheduled) {
      return false;
    }

    return true;
  }
);
