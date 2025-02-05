import { StyledMonthYearBar, StyledMonthYear } from "./styles";
import { Button } from "../../../styles/shared";
import { memo } from "react";

export type MonthProps = {
  month: string;
  year: number;
  moveAction: (move: number) => void;
};

export const BarMonth: React.FC<MonthProps> = memo(
  ({ month, year, moveAction }) => {
    return (
      <StyledMonthYearBar>
        <Button onClick={() => moveAction(-1)}>&lt;</Button>
        <StyledMonthYear>
          {month} {year}
        </StyledMonthYear>
        <Button onClick={() => moveAction(1)}>&gt;</Button>
      </StyledMonthYearBar>
    );
  },
  (prev, next) => prev.month === next.month
);
