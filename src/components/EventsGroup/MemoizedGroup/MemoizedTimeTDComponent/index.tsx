import { memo } from "react";
import { TimeStyledTD } from "./styles";

export const MemoizedTimeTD: React.FC<{ time: string }> = memo(
  ({ time }) => {
    return (
      <TimeStyledTD>
        <time>{time}</time>
      </TimeStyledTD>
    );
  },
  () => true
);
