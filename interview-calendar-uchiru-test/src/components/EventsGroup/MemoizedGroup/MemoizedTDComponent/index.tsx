import { CalendarEvent } from "../../../../context/Context";
import { GridButton, GridButtonProps } from "../../GridComponent/styles";
import { memo } from "react";
import { StyledTD } from "./styles";

export type MemoizedTDProps = Omit<GridButtonProps, "selected"> & {
  eventId: number;
  date: Date;
  selectedCell: CalendarEvent | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
};

export const MemoizedTD: React.FC<MemoizedTDProps> = memo(
  (props) => {
    const selected = props.selectedCell
      ? props.selectedCell.date.valueOf() === props.date.valueOf() && props.selectedCell.id === props.eventId
      : false;

    return (
      <StyledTD>
        <GridButton
          {...props}
          onClick={() => props.setSelectedCell({ date: props.date, id: props.eventId, scheduled: props.scheduled })}
          selected={selected}
        />
      </StyledTD>
    );
  },
  (prev, next) => {
    if (!next.selectedCell) {
      return false;
    }

    if (prev.date.valueOf() === next.selectedCell.date.valueOf()) {
      return false;
    } else if (prev.selectedCell !== null && prev.selectedCell.date.valueOf() !== next.selectedCell.date.valueOf()) {
      return false;
    }
    return true;
  }
);
