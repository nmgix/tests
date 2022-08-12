import { useContext } from "react";
import { AppContext } from "../../../../context/Context";
import { Button } from "../../../../styles/shared";
import { StyledBarDayDate, StyledDay, StyledDayWeekDay } from "./styles";

export type DayProps = {
  selected: boolean;
  weekDay: string;
  weekDayNumber: number;
  date: Date;
};

export const BarDay: React.FC<DayProps> = ({ selected, weekDay, weekDayNumber }) => {
  const { setSelectedDay } = useContext(AppContext);

  return (
    <StyledDay>
      <StyledDayWeekDay>{weekDay}</StyledDayWeekDay>
      <Button onClick={() => setSelectedDay(weekDayNumber)}>
        <StyledBarDayDate selected={selected}>{weekDayNumber}</StyledBarDayDate>
      </Button>
    </StyledDay>
  );
};
