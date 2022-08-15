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
  setCellsState: React.Dispatch<React.SetStateAction<RawDayData>>;
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
  setCellsState: (): void => console.log("Function didnt bundle correct"),
});
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedCell, setSelectedCell] = useState<CalendarEvent | null>(null);
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

  const getDates = useCallback(() => {
    let resultData: RawDayData = {};
    for (let i = 0; i < 25; i++) {
      let localDate = `${i < 10 ? `0${i}` : i}:00`;
      resultData[localDate] = Array.from(Array(7).keys()).map((key) => ({
        date: new Date(new Date(selectedDay).setHours(i, 0, 0)),
        id: key,
        scheduled: false,
      }));
    }

    // console.log("Mockup data for LocalStorage!");
    console.log(
      JSON.stringify({
        "15/08/2022": {
          "09:00": [
            {
              date: new Date().setHours(9),
              id: 0,
              scheduled: true,
            },
            {
              date: new Date().setHours(9, 30),
              id: 1,
              scheduled: false,
            },
          ],
          "10:00": [
            {
              date: new Date().setHours(10),
              id: 0,
              scheduled: true,
            },
            {
              date: new Date().setHours(10, 30),
              id: 1,
              scheduled: true,
            },
          ],
        },
        "16/08/2022": {
          "09:00": [
            {
              date: new Date().setHours(9),
              id: 0,
              scheduled: false,
            },
            {
              date: new Date().setHours(9, 30),
              id: 1,
              scheduled: false,
            },
          ],
          "10:00": [
            {
              date: new Date().setHours(10),
              id: 0,
              scheduled: false,
            },
            {
              date: new Date().setHours(10, 30),
              id: 1,
              scheduled: false,
            },
          ],
        },
      })
    );

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
        let eventsArray = dayData[key];
        eventsArray.forEach((event) => {
          event.date = new Date(event.date);
        });

        let gridDataDay = Object.keys(resultData).find((gridKey) => {
          return formatHours(key) === formatHours(gridKey);
        });
        let gridData = resultData[gridDataDay!];
        gridData.splice(0, eventsArray.length, ...eventsArray);
      });
    }

    return resultData;
  }, [selectedDay]);
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
  const [cellsState, setCellsState] = useState<RawDayData>({});
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
    saveEventsLocalStorage(selectedDay, cellsState);
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
        setCellsState,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
