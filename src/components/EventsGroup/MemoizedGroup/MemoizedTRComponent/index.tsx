import { CalendarEvent } from "../../../../context/Context";
import { memo } from "react";
import { StyledTR } from "./styles";
import { MemoizedTimeTD } from "../MemoizedTimeTDComponent";
import { StyledTD } from "../MemoizedTDComponent/styles";
import { MemoizedTD } from "../MemoizedTDComponent";

type MemoizedTRProps = {
  rowId: number;
  date: string;

  eventList: CalendarEvent[];
  selectedCell: CalendarEvent | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
};

export const MemoizedTR: React.FC<MemoizedTRProps> = memo(
  ({ date, eventList, rowId, selectedCell, setSelectedCell }) => {
    return (
      <StyledTR>
        <MemoizedTimeTD time={date} />
        {eventList.map((event, eventIdx) => {
          return rowId === 24 ? (
            <StyledTD key={eventIdx}></StyledTD>
          ) : (
            <MemoizedTD
              scheduled={false}
              selectedCell={selectedCell}
              eventId={event.id}
              date={event.date}
              key={eventIdx}
              setSelectedCell={setSelectedCell}
            />
          );
        })}
      </StyledTR>
    );
  },
  (prev, next) => {
    if (!next.selectedCell) {
      return false;
    }
    let rowDate = prev.date.split(":")[0];
    rowDate.replace("0", "");
    let nextSelectedCellDate = next.selectedCell.date.getHours();

    if (
      prev.selectedCell !== null &&
      Number(rowDate) === prev.selectedCell.date.getHours() &&
      nextSelectedCellDate !== Number(rowDate)
    ) {
      return false;
    }
    if (Number(rowDate) === nextSelectedCellDate) {
      // если начало даты выбрайнно ячейки (например 9 утра) сошлось с датой ряда (9 утра), то перерендер
      return false;
    }

    return true;
  }
);
