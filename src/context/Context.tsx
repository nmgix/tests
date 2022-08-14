import React, { useState, useEffect, createContext } from "react";
import { DateData, decideMonth, decideYear, formatDate, getWeekData, oneDay } from "./helpers";
import { locale } from "./settings";

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
  }, [selectedDay]);

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
