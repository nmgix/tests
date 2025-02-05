import React, { useState, useEffect, createContext, useCallback } from "react";
import {
  DateData,
  decideMonth,
  decideYear,
  formatDate,
  formatHours,
  getWeekData,
  oneDay,
  saveEventsLocalStorage,
} from "./helpers";
import { locale } from "./settings";

export type RawDayData = { [time: string]: CalendarEvent[] };
export type RawCalendarData = { [date: string]: RawDayData };

export type CalendarEvent = {
  id: number;
  date: Date;
  scheduled: boolean;
};
type AppContextProps = {
  selectedCell: CalendarEvent | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;

  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;

  dateData: DateData;

  activeWeek: number;
  setActiveWeek: React.Dispatch<React.SetStateAction<number>>;

  cellsState: RawDayData;
  createEvent: () => void;
  deleteScheduled: (event: CalendarEvent) => void;
};

export const AppContext = createContext<AppContextProps>({
  selectedCell: null,
  setSelectedCell: (): void => console.log("Function didnt bundle correct"),

  selectedDay: new Date(),
  setSelectedDay: (): void => console.log("Function didnt bundle correct"),

  dateData: {
    dayProps: {
      week: [],
    },
    monthProps: {
      month: new Date().toLocaleDateString(locale, { month: "long" }),
      year: new Date().getFullYear(),
    },
  },

  activeWeek: 0,
  setActiveWeek: (): void => console.log("Function didnt bundle correct"),

  cellsState: {},
  createEvent: (): void => console.log("Function didnt bundle correct"),
  deleteScheduled: (): void => console.log("Function didnt bundle correct"),
});
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedCell, setSelectedCell] = useState<CalendarEvent | null>(null);
  const [cellsState, setCellsState] = useState<RawDayData>({});

  const [dateData, setDateData] = useState<DateData>(() => {
    let weekData = getWeekData(new Date());

    return {
      dayProps: {
        week: weekData,
      },
      monthProps: {
        month: decideMonth(weekData),
        year: decideYear(weekData),
      },
    };
  });
  const updateWeeks = (mainDate: Date) => {
    let weekData = getWeekData(mainDate);

    let newData = {
      dayProps: {
        week: weekData,
      },
      monthProps: {
        month: decideMonth(weekData),
        year: decideYear(weekData),
      },
    };
    setDateData(newData);
  };

  const getFreeCell = (date: Date): CalendarEvent | null => {
    // нужна будет для выставления ивентов с localStorage и создания нового ивента
    let dateRowKey = Object.keys(cellsState).find((key) => formatHours(key) === date.getHours());
    if (!dateRowKey) {
      return null;
    }
    let dateRow = cellsState[dateRowKey];
    let closestEvent = dateRow.reduce(function (prev, curr) {
      return Math.abs(curr.date.valueOf() - date.valueOf()) < Math.abs(prev.date.valueOf() - date.valueOf())
        ? curr
        : prev;
    });

    if (!closestEvent.scheduled) {
      return closestEvent;
    } else {
      let closestEventIndex = dateRow.indexOf(closestEvent);

      let nextCell = dateRow.at(closestEventIndex + 1);
      let previousCell = dateRow.at(closestEventIndex - 1);

      // если справа и слева есть клетка
      if (nextCell && previousCell) {
        let differenceWithRight =
          nextCell.date.getMinutes() * 60 +
          nextCell.date.getSeconds() -
          (closestEvent.date.getMinutes() * 60 + closestEvent.date.getSeconds());
        let differenceWithLeft =
          closestEvent.date.getMinutes() * 60 +
          closestEvent.date.getSeconds() -
          (previousCell.date.getMinutes() * 60 + previousCell.date.getSeconds());

        if (differenceWithRight > differenceWithLeft) {
          if (nextCell.scheduled === false) {
            return nextCell;
          } else {
            return null;
          }
        } else {
          if (previousCell!.scheduled === false) {
            return nextCell;
          } else {
            return null;
          }
        }
        // если справа есть клетка
      } else if (nextCell) {
        if (nextCell.scheduled === false) {
          return nextCell;
        } else {
          return null;
        }
        // если слева есть клетка
      } else if (previousCell) {
        if (previousCell.scheduled === false) {
          return previousCell;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };

  const getDates = useCallback(() => {
    let rows = 7;

    let resultData: RawDayData = {};
    for (let i = 0; i < 25; i++) {
      let localDate = `${i < 10 ? `0${i}` : i}:00`;
      resultData[localDate] = Array.from(Array(7).keys()).map((key) => ({
        date: new Date(new Date(selectedDay).setHours(i, (60 / rows) * key, 0)),
        id: key,
        scheduled: false,
      }));
    }

    let localStorageData = localStorage.getItem("events");

    if (localStorageData) {
      let rawEventsData: RawCalendarData = JSON.parse(localStorageData);
      let monthDataKeys = Object.keys(rawEventsData).filter((key) => {
        let formatedMonth = Number(key.split("/")[1]);
        return new Date(selectedDay).getMonth() + 1 === formatedMonth;
      });
      if (monthDataKeys.length === 0) {
        return resultData;
      }
      let dayDataKey = monthDataKeys.find((key) => {
        let formatedDay = Number(key.split("/")[0]);
        return new Date(selectedDay).getDate() === formatedDay;
      });
      if (dayDataKey === undefined) {
        return resultData;
      }
      let dayData = rawEventsData[dayDataKey];

      Object.keys(dayData).forEach((key) => {
        let gridDataDay = Object.keys(resultData).find((gridKey) => {
          return formatHours(key) === formatHours(gridKey);
        });
        let gridData = resultData[gridDataDay!];

        let eventsArray = dayData[key];
        eventsArray.forEach((event) => {
          // преобразовывание даты в нормальный вид
          event.date = new Date(event.date);

          let gridCellIndex = gridData.indexOf(gridData.find((cell) => cell.id === event.id)!);
          gridData[gridCellIndex] = event;
        });
      });
    }

    return resultData;
  }, [selectedDay]);

  const deleteScheduled = (event: CalendarEvent) => {
    setCellsState((prev) => {
      let resultData: RawDayData = structuredClone(prev);

      let dateRowKey = Object.keys(resultData).find((key) => formatHours(key) === event.date.getHours());
      if (!dateRowKey) {
        return resultData;
      }

      let dateRow = resultData[dateRowKey];
      let exactCell = dateRow.find((rowEvent) => rowEvent.id === event.id);
      if (!exactCell) {
        return resultData;
      }
      exactCell.scheduled = false;
      setSelectedCell(null);

      return resultData;
    });
  };
  const createEvent = () => {
    let currentDate = new Date();
    let formatedMonthYear = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    let formatedHours = currentDate.toTimeString().split(" ")[0];
    let eventDate = prompt("Enter event time: \n YYYY-MM-DD HH:mm:ss", `${formatedMonthYear} ${formatedHours}`);
    if (!eventDate) {
      return;
    }

    let date = new Date(eventDate);
    if (date instanceof Date && !isNaN(date.getTime())) {
      let newEvent = getFreeCell(date);
      if (!newEvent) {
        return alert("Cant process planning on set date, please choose another");
      }

      setCellsState((prev) => {
        let resultData: RawDayData = structuredClone(prev);

        let dateRowKey = Object.keys(resultData).find((key) => formatHours(key) === newEvent!.date.getHours());
        if (!dateRowKey) {
          return resultData;
        }

        let dateRow = resultData[dateRowKey];
        let exactCell = dateRow.find((rowEvent) => rowEvent.id === newEvent!.id);
        if (!exactCell) {
          alert("Cant process planning on set date, please choose another");
          return resultData;
        }
        exactCell.scheduled = true;

        return resultData;
      });
      setSelectedCell({ date: newEvent.date, id: newEvent.id, scheduled: true });
    } else {
      return alert("Date provided is not valid type");
    }
  };

  // переключение на другую неделю
  useEffect(() => {
    let days = 7;
    let date = new Date();
    let dtms = date.valueOf();
    let newDate = new Date(dtms + (activeWeek === 0 ? 1 : oneDay * activeWeek * days));
    updateWeeks(newDate);
  }, [activeWeek]);

  useEffect(() => {
    // если переключение идёт через футер на сегодняшнюю дату
    if (formatDate(selectedDay) === formatDate(new Date())) {
      setActiveWeek(0);
    }

    // удаление селекта при смене дня
    setSelectedCell(null);
    setCellsState(getDates());
  }, [selectedDay, getDates]);

  useEffect(() => {
    if (Object.keys(cellsState).length > 0) {
      saveEventsLocalStorage(selectedDay, cellsState);
    }
  }, [cellsState, selectedDay]);

  return (
    <AppContext.Provider
      value={{
        selectedCell,
        setSelectedCell,

        selectedDay,
        setSelectedDay,

        dateData,

        activeWeek,
        setActiveWeek,

        cellsState,
        createEvent,
        deleteScheduled,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
