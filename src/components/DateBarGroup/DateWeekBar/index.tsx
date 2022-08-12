import { BarDay, DayProps } from "./DateDay";
import { StyledDaysBar, StyledDaysWrapper } from "./styles";

export type DaysBarProps = {
  week: DayProps[];
  selected: number;
};

export const DaysBar: React.FC<DaysBarProps> = ({ week, selected }) => {
  return (
    <StyledDaysBar>
      <StyledDaysWrapper>
        {week.map((day) => (
          <BarDay {...day} key={day.weekDayNumber} selected={day.weekDayNumber === selected} />
        ))}
      </StyledDaysWrapper>
    </StyledDaysBar>
  );
};
