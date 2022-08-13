import { useContext, useState } from "react";
import { AppContext, CalendarEvent } from "../../../context/Context";
import { formatDate } from "../../../context/helpers";
import { GridWrapper, MemoizedTD, StyledTable, StyledTD, StyledTR, TimeStyledTD } from "./styles";

type RawDayData = { [time: string]: CalendarEvent[] };

type RawCalendarData = { [date: string]: RawDayData };

const Grid = () => {
  const { selectedDay, selectedCell, setSelectedCell } = useContext(AppContext);

  const [cellsState, setCellsState] = useState<RawDayData>(() => {
    let currentDate = formatDate(selectedDay, true);

    // let cachedDayData = localStorage.getItem('events')
    // if(cachedDayData) {
    //   dayData = JSON.parse(cachedDayData)
    //   if(dayData) {}
    // }

    // Здесь заполнение объекта* полями по типу
    // {
    // "09:00": [],
    // "10:00": [],
    // }

    // пример данных из localStorage
    let allDaysData: RawCalendarData = {
      "19/03/2022": {
        "09:00": [
          {
            id: 1,
            date: new Date("09:30:15"),
          },
          {
            id: 2,
            date: new Date("09:40:20"),
          },
        ],
        "10:00": [
          {
            id: 1,
            date: new Date("10:10:00"),
          },
          {
            id: 2,
            date: new Date("10:20:00"),
          },
        ],
      },
      "20/03/2022": {
        "09:00": [
          {
            id: 1,
            date: new Date("09:10:00"),
          },
          {
            id: 2,
            date: new Date("09:30:00"),
          },
        ],
        "10:00": [
          {
            id: 1,
            date: new Date("10:10:00"),
          },
          {
            id: 2,
            date: new Date("10:30:00"),
          },
        ],
      },
    };

    let resultData: RawDayData = {};

    for (let i = 0; i < 25; i++) {
      let localDate = `${i < 10 ? `0${i}` : i}:00`;
      resultData[localDate] = Array.from(Array(7).keys()).map((key) => ({
        date: new Date(selectedDay.setHours(i, 0, 0)),
        id: key,
      }));
    }

    // попытка найти текущую дату в списке всех созданных задач
    let daysDataDayIndex = Object.keys(allDaysData).find((key) => key === currentDate);

    if (daysDataDayIndex) {
      // добавление задач в текущий список всего расписания
      let dayData = allDaysData[daysDataDayIndex];
    }

    return resultData;
  });
  return (
    <GridWrapper>
      <StyledTable>
        {Object.keys(cellsState).map((dateRow, dateRowIdx) => {
          return (
            <StyledTR key={dateRowIdx}>
              <TimeStyledTD>
                <time>{dateRow}</time>
              </TimeStyledTD>

              {cellsState[dateRow].map((event, eventIdx) =>
                dateRowIdx === 24 ? (
                  <StyledTD></StyledTD>
                ) : (
                  <MemoizedTD
                    scheduled={false}
                    selected={
                      // selectedCell
                      //   ? selectedCell.date.toDateString() === new Date(selectedDay.setHours(dateIdx)).toDateString() &&
                      //     selectedCell.id === dateIdx
                      //   : false
                      false
                    }
                    eventId={eventIdx}
                    date={event.date}
                    key={eventIdx}
                    setSelectedCell={setSelectedCell}
                  />
                )
              )}
            </StyledTR>
          );
          // return <div></div>
        })}
      </StyledTable>
    </GridWrapper>
  );
};
export default Grid;

// {/* {Array.from(Array(25).keys()).map((key) => (
//           <StyledTR key={key}>
//             <TimeStyledTD>
//               <time>{key < 10 ? `0${key}` : key}:00</time>
//             </TimeStyledTD>
//             {Array.from(Array(7).keys()).map((idx) =>
//               key === 24 ? (
//                 <StyledTD></StyledTD>
//               ) : (
// <MemoizedTD
//   scheduled={false}
//   selected={
//     selectedCell
//       ? selectedCell.date.toDateString() === new Date(selectedDay.setHours(key)).toDateString() &&
//         selectedCell.id === idx
//       : false
//     // false
//   }
//   eventId={idx}
//   date={/* выставленная дата | */ new Date(selectedDay.setHours(key))}
//   key={idx}
//   setSelectedCell={setSelectedCell}
// />
//               )
//             )}
//           </StyledTR>
//         ))} */}
