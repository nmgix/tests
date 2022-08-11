import React, { useContext } from "react";
import { AppContext } from "../../../context/Context";
import { StyledContainer } from "../../../styles/shared";
import { BarMonth } from "../DateMonthBar";
import { DaysBar } from "../DateWeek";
import { StyledDateBar } from "./styles";

const DateBar: React.FC<{}> = () => {
  const { dateData, setActiveWeek } = useContext(AppContext);

  const moveAction = (move: number) => {
    setActiveWeek((prev) => prev + move);
  };

  return (
    <StyledContainer>
      <StyledDateBar>
        <DaysBar {...dateData.dayProps} />
        <BarMonth {...dateData.monthProps} moveAction={moveAction} />
      </StyledDateBar>
    </StyledContainer>
  );
};

export default DateBar;
