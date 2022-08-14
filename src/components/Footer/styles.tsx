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
};

export const MemoizedFooter: React.FC<FooterProps> = memo(
  ({ selectedCell, setSelectedDay }) => {
    return (
      <Footer>
        <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
        {selectedCell && selectedCell.scheduled === true ? <Button>Delete</Button> : <></>}
      </Footer>
    );
  },
  (prev, next) => {
    if (!next.selectedCell) {
      return false;
    }
    if (prev.selectedCell !== null && prev.selectedCell.scheduled !== next.selectedCell.scheduled) {
      return false;
    }
    return true;
  }
);
