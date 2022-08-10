import styled from "styled-components";
import { Button, StyledButton } from "../../styles/shared";
import { backgroundColor, accentColor } from "../../styles/themes";

export const StyledDateBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em calc(4em - 0.6rem);
  background-color: #f6f6f6;
  align-items: center;
`;
const StyledBar = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  ${StyledButton} {
    font-size: 2.5rem;
    font-weight: 500;
  }
`;

export type DayProps = {
  selected: boolean;
  weekDay: string;
  weekNumber: number;
};

export const DaysBar: React.FC<{ days: DayProps[] }> = ({ days }) => {
  return (
    <StyledBar>
      {days.map((day) => (
        <BarDay {...day} />
      ))}
    </StyledBar>
  );
};

const StyledDay = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.2rem;
`;
const StyledDayWeekDay = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;

const StyledBarDayDate = styled.div<{ selected: boolean }>`
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? accentColor : "transparent")};
  color: ${(props) => (props.selected ? backgroundColor : "black")};
  padding: 0.3rem;
  font-weight: 500;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
const BarDay: React.FC<DayProps> = ({ selected, weekDay, weekNumber }) => {
  return (
    <StyledDay>
      <StyledDayWeekDay>{weekDay}</StyledDayWeekDay>
      <Button>
        <StyledBarDayDate selected={selected}>{weekNumber}</StyledBarDayDate>
      </Button>
    </StyledDay>
  );
};

export type MonthProps = {
  month: string;
  year: number;
};

// subject to change
const StyledMonthYear = styled.span`
  font-size: 1.2rem;
`;
const StyledMonthYearBar = styled(StyledBar)`
  width: calc(100% - 0.6rem);
  margin-bottom: -0.75rem;
`;
// может быть будет fowardRef
export const BarMonth: React.FC<MonthProps> = ({ month, year }) => {
  return (
    <StyledMonthYearBar>
      <Button>&lt;</Button>
      <StyledMonthYear>
        {month} {year}
      </StyledMonthYear>
      <Button>&gt;</Button>
    </StyledMonthYearBar>
  );
};
