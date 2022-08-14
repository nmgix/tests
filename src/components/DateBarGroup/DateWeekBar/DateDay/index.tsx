import { memo } from "react";
import { Button } from "../../../../styles/shared";
import { StyledBarDayDate, StyledDay, StyledDayWeekDay } from "./styles";

export type DayProps = {
  selected: boolean;
  weekDay: string;
  weekDayNumber: number;
  date: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

export const BarDay: React.FC<DayProps> = memo(
  ({ date, selected, weekDay, weekDayNumber, setSelectedDay }) => {
    return (
      <StyledDay>
        <StyledDayWeekDay>{weekDay}</StyledDayWeekDay>
        <Button
          onClick={() => {
            // чтобы не очищать выделение при нажатии на уже выбранную дату
            if(!selected) {
              setSelectedDay(date)
            }
          }}>
          <StyledBarDayDate selected={selected}>{weekDayNumber}</StyledBarDayDate>
        </Button>
      </StyledDay>
    );
  },
  (prev, next) => prev.selected === next.selected && prev.date === next.date
);
