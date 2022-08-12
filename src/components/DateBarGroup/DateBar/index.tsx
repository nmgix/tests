import React, { useContext } from "react";
import { AppContext } from "../../../context/Context";
import { StyledContainer } from "../../../styles/shared";
import { StyledDateBar } from "./styles";
import { BarMonth } from "../DateMonthBar";
import { DaysBar } from "../DateWeekBar";

const DateBar: React.FC<{}> = () => {
  const { dateData, setActiveWeek, selectedDay, setSelectedDay } = useContext(AppContext);

  const moveAction = (move: number) => {
    setActiveWeek((prev) => prev + move);
  };

  return (
    <StyledContainer darkenBackground>
      <StyledDateBar>
        <DaysBar week={dateData.dayProps.week} selected={selectedDay} setSelectedDay={setSelectedDay} />
        <BarMonth {...dateData.monthProps} moveAction={moveAction} />
      </StyledDateBar>
    </StyledContainer>
  );
};

export default DateBar;
