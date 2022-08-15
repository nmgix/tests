import { useContext } from "react";
import { AppContext } from "../../../context/Context";
import { MemoizedTR } from "../MemoizedGroup/MemoizedTRComponent";
import { GridWrapper, StyledTableGrid } from "./styles";

const Grid: React.FC = () => {
  const { selectedCell, setSelectedCell, cellsState } = useContext(AppContext);

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
