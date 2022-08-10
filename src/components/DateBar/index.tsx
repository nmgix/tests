import React, { useContext } from "react";
import { StyledContainer } from "../../styles/shared";
import { BarMonth, DayProps, DaysBar, MonthProps, StyledDateBar } from "./styles";

const DateBar = () => {
  // const { currentMonth, currentDay, currentYear, days } = useContext()

  const mockData: { dayProps: DayProps[]; monthProps: MonthProps } = {
    dayProps: [
      {
        selected: false,
        weekDay: "M",
        weekNumber: 23,
      },
      {
        selected: true,
        weekDay: "T",
        weekNumber: 24,
      },
      {
        selected: false,
        weekDay: "W",
        weekNumber: 25,
      },
      {
        selected: false,
        weekDay: "T",
        weekNumber: 26,
      },
      {
        selected: false,
        weekDay: "F",
        weekNumber: 27,
      },
      {
        selected: false,
        weekDay: "S",
        weekNumber: 28,
      },
      {
        selected: false,
        weekDay: "S",
        weekNumber: 29,
      },
    ],
    monthProps: {
      month: "March",
      year: 2022,
    },
  };

  return (
    <StyledContainer>
      <StyledDateBar>
        {/* вообще весь месяц должен быть, но пока 7 дней */}
        <DaysBar days={mockData.dayProps} />
        <BarMonth {...mockData.monthProps} />
      </StyledDateBar>
    </StyledContainer>
  );
};

export default DateBar;
