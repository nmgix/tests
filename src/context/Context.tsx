import React, { useState, useEffect, createContext } from "react";
import { DateData, decideMonth, decideYear, getWeekData, oneDay } from "./helpers";
import { locale } from "./settings";

// localstorage pattern
// {
//     "events": {
//         "date-year-month-day-etc": [
//             "date-hour-minutes": "EventName",
//             "date-hour-minutes": "EventName",
//         ]
//     }
// }

type CalendarEvent = {
  date: Date;
  content: string;
};
type AppContextProps = {
  selectedCell: CalendarEvent | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;

  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;

  dateData: DateData;

  activeWeek: number;
  setActiveWeek: React.Dispatch<React.SetStateAction<number>>;
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
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedCell, setSelectedCell] = useState<CalendarEvent | null>(null);
  const [dateData, setDateData] = useState<DateData>(() => {
    return {
      dayProps: {
        week: getWeekData(new Date()),
      },
      monthProps: {
        month: decideMonth(getWeekData(new Date())),
        year: decideYear(getWeekData(new Date())),
      },
    };
  });

  const updateWeeks = (mainDate: Date) => {
    let newData = {
      dayProps: {
        week: getWeekData(mainDate),
      },
      monthProps: {
        month: decideMonth(getWeekData(mainDate)),
        year: decideYear(getWeekData(mainDate)),
      },
    };

    setDateData(newData);
  };

  useEffect(() => {
    let days = 7;
    let date = new Date();
    let dtms = date.valueOf();
    let newdate = new Date(dtms + (activeWeek === 0 ? 1 : oneDay * activeWeek * days));

    updateWeeks(newdate);
  }, [activeWeek]);

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
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
