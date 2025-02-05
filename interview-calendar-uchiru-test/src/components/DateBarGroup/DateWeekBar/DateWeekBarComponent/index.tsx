import { formatDate } from "../../../../context/helpers";
import { BarDay, DayProps } from "../DateDayComponent";
import { StyledDaysBar, StyledDaysWrapper } from "./styles";

export type DaysBarProps = {
  week: DayProps[];
  selected: Date;
  // так пропдриллинг обусловлен ререндером каждого числа, но в угоду чистоты кода, можно использовать контекст и вытаскивать setSelectedDay оттуда
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

export const DaysBar: React.FC<DaysBarProps> = ({ week, selected, setSelectedDay }) => {
  return (
    <StyledDaysBar>
      <StyledDaysWrapper>
        {week.map((day) => {
          return (
            <BarDay
              {...day}
              key={day.weekDayNumber}
              selected={formatDate(day.date) === formatDate(selected)}
              setSelectedDay={setSelectedDay}
            />
          );
        })}
      </StyledDaysWrapper>
    </StyledDaysBar>
  );
};
