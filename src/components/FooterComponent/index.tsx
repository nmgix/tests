import { useContext } from "react";
import { AppContext, CalendarEvent, RawDayData } from "../../context/Context";
import { formatHours } from "../../context/helpers";
import { StyledContainer, StyledPaddingContainer } from "../../styles/shared";
import { MemoizedFooter } from "./styles";

const Footer = () => {
  const { selectedCell, setSelectedCell, setSelectedDay, setCellsState } = useContext(AppContext);

  const deleteScheduled = (event: CalendarEvent) => {
    setCellsState((prev) => {
      let resultData: RawDayData = structuredClone(prev);

      let dateRowKey = Object.keys(resultData).find((key) => formatHours(key) === event.date.getHours());
      if (!dateRowKey) {
        return resultData;
      }

      let dateRow = resultData[dateRowKey];

      console.log(dateRow);

      dateRow.forEach((rowEvent) => {
        if (rowEvent.id === event.id) {
          // здесь может быть любая логика по очистке ячейки
          rowEvent.scheduled = false;
          setSelectedCell(null);
        }
        return rowEvent;
      });

      return resultData;
    });
  };

  return (
    <StyledContainer invertedBorder darkenBackground>
      <StyledPaddingContainer>
        <MemoizedFooter selectedCell={selectedCell} setSelectedDay={setSelectedDay} deleteScheduled={deleteScheduled} />
      </StyledPaddingContainer>
    </StyledContainer>
  );
};

export default Footer;
