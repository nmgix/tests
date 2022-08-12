import { useContext } from "react";
import { AppContext } from "../../../context/Context";
import { GridButton, GridWrapper, StyledTable, StyledTD, StyledTR, TimeStyledTD } from "./styles";

const Grid = () => {
  const { setSelectedCell } = useContext(AppContext);

  return (
    <GridWrapper>
      <StyledTable>
        {Array.from(Array(25).keys()).map((key) => (
          <StyledTR>
            <TimeStyledTD>
              <time>{key < 10 ? `0${key}` : key}:00</time>
            </TimeStyledTD>
            {Array.from(Array(7).keys()).map(() =>
              key === 24 ? (
                <StyledTD></StyledTD>
              ) : (
                <StyledTD>
                  <GridButton
                    selected={false}
                    scheduled={false}
                    onClick={() => {
                      /* setSelectedCell() */
                    }}
                  />
                </StyledTD>
              )
            )}
          </StyledTR>
        ))}
      </StyledTable>
    </GridWrapper>
  );
};
export default Grid;
