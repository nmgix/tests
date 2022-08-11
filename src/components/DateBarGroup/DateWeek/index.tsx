import { BarDay, DayProps } from "./DateDay";
import { StyledDaysBar, StyledDaysWrapper } from "./styles";

export type DaysBarProps = {
  week: DayProps[];
};

export const DaysBar: React.FC<DaysBarProps> = ({ week }) => {
  return (
    <StyledDaysBar>
      <StyledDaysWrapper>
        {week.map((day) => (
          <BarDay {...day} key={day.weekDayNumber} />
        ))}
      </StyledDaysWrapper>
    </StyledDaysBar>
  );
};
