import { useEffect, useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context";
import { Button, StyledButton } from "../../styles/shared";
import { backgroundColor, accentColor } from "../../styles/themes";

export type DateData = {
  dayProps: Omit<DaysBarProps, "currentScroll" | "setCurrentScroll">;
  monthProps: Omit<MonthProps, "moveAction">;
};

export const StyledDateBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1rem 1em 7em;
  background-color: #f6f6f6;
  align-items: center;

  @media screen and (max-width: 400px) {
    padding: 1em 1.3rem;
  }

  @media screen and (max-width: 350px) {
    padding: 1em 1rem;
  }
`;
const StyledBar = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledDay = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.3rem;
  width: 10%;
`;
const StyledDayWeekDay = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;

export type DayProps = {
  selected: boolean;
  weekDay: string;
  weekDayNumber: number;
  date: Date;
};

export type DaysBarProps = {
  prevWeek: DayProps[];
  currentWeek: DayProps[];
  nextWeek: DayProps[];
  currentScroll: number;
  setCurrentScroll: React.Dispatch<React.SetStateAction<number>>;
};

const StyledDaysBar = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  overflow-x: hidden;
  position: relative;
`;
const StyledDaysWrapper = styled(StyledBar)`
  justify-content: center;
`;
export const DaysBar: React.FC<DaysBarProps> = ({
  currentWeek,
  nextWeek,
  prevWeek,
  currentScroll,
  setCurrentScroll,
}) => {
  const [renderWeeks, setRenderWeeks] = useState<DayProps[]>([]);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef!.current!.style.transition = "none";
    setCurrentScroll(-33.3);
    setRenderWeeks([...prevWeek, ...currentWeek, ...nextWeek]);
    // @issue 1 хотел чтобы была анимация при передвижении, но она практически не работает, subject to change, но задача уже заняла много времени
    // listRef!.current!.style.transition = "all 0.1s ease-in-out";
  }, [currentWeek, nextWeek, prevWeek]);

  return (
    <StyledDaysBar>
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: "300%",
          transform: `translate(${currentScroll}%, 0)`,
        }}
        ref={listRef}>
        <StyledDaysWrapper>
          {renderWeeks.map((day) => (
            <BarDay {...day} key={day.weekDayNumber} />
          ))}
        </StyledDaysWrapper>
      </div>
    </StyledDaysBar>
  );
};

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
const BarDay: React.FC<DayProps> = ({ selected, weekDay, weekDayNumber }) => {
  const { setSelectedCell } = useContext(AppContext);

  return (
    <StyledDay>
      <StyledDayWeekDay>{weekDay}</StyledDayWeekDay>
      <Button onClick={() => setSelectedCell(null)}>
        <StyledBarDayDate selected={selected}>{weekDayNumber}</StyledBarDayDate>
      </Button>
    </StyledDay>
  );
};

export type MonthProps = {
  month: string;
  year: number;
  moveAction: (move: number) => void;
  // ref: React.RefObject;
};

// subject to change
const StyledMonthYear = styled.span`
  font-size: 1.2rem;
`;
const StyledMonthYearBar = styled(StyledBar)`
  width: calc(100%);
  padding: 0 1.2em;
  margin-bottom: -0.75rem;

  ${StyledButton} {
    font-size: 2.5rem;
    font-weight: 500;
  }
`;
// может быть будет fowardRef
export const BarMonth: React.FC<MonthProps> = ({ month, year, moveAction }) => {
  return (
    <StyledMonthYearBar>
      <Button onClick={() => moveAction(-1)}>&lt;</Button>
      <StyledMonthYear>
        {month} {year}
      </StyledMonthYear>
      <Button onClick={() => moveAction(1)}>&gt;</Button>
    </StyledMonthYearBar>
  );
};
