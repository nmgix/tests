import React, { useContext, useRef } from "react";
import { useState } from "react";
import { StyledContainer } from "../../styles/shared";
import { BarMonth, DateData, DaysBar, DaysBarProps, MonthProps, StyledDateBar } from "./styles";

const DateBar: React.FC<DateData> = ({ dayProps, monthProps }) => {
  const [currentScroll, setCurrentScroll] = useState<number>(-33.3);

  const moveScrollableWeekdays = (move: number) => {
    console.log(currentScroll);
    switch (move) {
      case -1: {
        setCurrentScroll((prevScroll) => prevScroll + 33.3);
        // тут меняется неделя
        break;
      }
      case 1: {
        setCurrentScroll((prevScroll) => prevScroll - 33.3);
        // тут меняется неделя
        break;
      }
      default: {
        return;
      }
    }
  };

  return (
    <StyledContainer>
      <StyledDateBar>
        <DaysBar {...dayProps} currentScroll={currentScroll} />
        <BarMonth {...monthProps} moveAction={moveScrollableWeekdays} />
      </StyledDateBar>
    </StyledContainer>
  );
};

export default DateBar;
