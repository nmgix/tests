import { CalendarEvent } from "../../../../context/Context";
import { GridButton, GridButtonProps } from "../../Grid/styles";
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
      ? props.selectedCell.date === props.date && props.selectedCell.id === props.eventId
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
      // чтобы произошёл перерендер
      return false;
    }

    if (next.selectedCell.date === prev.date && next.selectedCell.id === prev.eventId) {
      // если дата выбранной клетки совпадает и айди тоже, то перерендер
      return false;
      // если выбранная клетка сменилась
    } else if (
      prev.selectedCell !== null && // изначально нет выбранной клетки
      prev.selectedCell.date === prev.date && // прошлая клетка была выделена
      next.selectedCell!.date !== prev.date // текущая клетка не выделена, выделена другая
    ) {
      return false;
    }
    // иначе не перерендер
    return true;
  }
);
