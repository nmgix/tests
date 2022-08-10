import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../Context";
import { StyledContainer } from "../../styles/shared";
import { BarMonth, DateData, DaysBar, DaysBarProps, MonthProps, StyledDateBar } from "./styles";

const DateBar: React.FC<{}> = () => {
  const {
    moveScrollableWeekdays,
    currentScroll,
    selectedCell,
    setCurrentScroll,
    setSelectedCell,
    dateData,
    setDateData,
    updateWeeks,
  } = useContext(AppContext);

  useEffect(() => {
    // updateWeeks(new Date());
  }, []);

  return (
    <StyledContainer>
      <StyledDateBar>
        <DaysBar {...dateData.dayProps} currentScroll={currentScroll} />
        <BarMonth {...dateData.monthProps} moveAction={moveScrollableWeekdays} />
      </StyledDateBar>
    </StyledContainer>
  );
};

export default DateBar;
