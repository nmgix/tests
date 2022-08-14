import { useContext } from "react";
import { AppContext } from "../../../context/Context";
import { MemoizedTR } from "../Memoized/MemoizedTR";
import { useGetDates } from "./getDatesHook";
import { GridWrapper, StyledTableGrid } from "./styles";

const Grid = () => {
  const { selectedCell, setSelectedCell } = useContext(AppContext);

  const cellsState = useGetDates();

  return (
    <GridWrapper>
      <StyledTableGrid>
        {Object.keys(cellsState).map((dateRow, dateRowIdx) => {
          return (
            <MemoizedTR
              date={dateRow}
              eventList={cellsState[dateRow]}
              rowId={dateRowIdx}
              selectedCell={selectedCell}
              key={dateRowIdx}
              setSelectedCell={setSelectedCell}
            />
          );
        })}
      </StyledTableGrid>
    </GridWrapper>
  );
};
export default Grid;
