import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { DateData, DayProps } from "./components/DateBar/styles";

// localstorage pattern
// {
//     "events": {
//         "date-year-month-day-etc": [
//             "date-hour-minutes": "EventName",
//             "date-hour-minutes": "EventName",
//         ]
//     }
// }

const oneDay = 24 * 60 * 60 * 1000;

const getWeekDayName = (weekDayNum: number) => {
  let arrWeekDaysName = ["M", "T", "W", "T", "F", "S", "S"];
  return arrWeekDaysName[weekDayNum];
};
const getMonthName = (monthNum: number) => {
  let arrMonthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return arrMonthName[monthNum];
};
const getWeekData = (date: Date): DayProps[] => {
  let weekDaysResult: Date[] = [];
  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const day = date.getDay(); //получить номер дня недели
  weekDays.forEach((dayNumber) => {
    // добавляем все даты по дням недели
    let resultDay = new Date(+date + 8 * 3600 * 1000 + (day - dayNumber) * oneDay);
    weekDaysResult.push(resultDay);
  });

  // сортируем
  weekDaysResult.sort((aDate, bDate) => aDate.getDate() - bDate.getDate());

  console.log(weekDaysResult);
  //   преобразуем массив из дат в название дня недели и числа
  return weekDaysResult.map((weekDay) => {
    return {
      selected: false,
      weekDay: getWeekDayName(weekDay.getDay() + 1),
      weekDayNumber: weekDay.getDay() + 1,
    };
  });
};

type CalendarEvent = {
  date: Date;
  content: string;
};

type AppContextProps = {
  currentScroll: number;
  setCurrentScroll: React.Dispatch<React.SetStateAction<number>>;
  moveScrollableWeekdays: (move: number) => void;

  selectedCell: CalendarEvent | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;

  dateData: DateData;
  setDateData: React.Dispatch<React.SetStateAction<DateData>>;

  updateWeeks: (mainDate: Date) => void;
};

export const AppContext = createContext<AppContextProps>({
  selectedCell: null,
  setSelectedCell: (): void => console.log("Function didnt bundle correct"),

  currentScroll: -33.3,
  setCurrentScroll: (): void => console.log("Function didnt bundle correct"),

  moveScrollableWeekdays: (): void => console.log("Function didnt bundle correct"),

  setDateData: (): void => console.log("Function didnt bundle correct"),
  dateData: {
    dayProps: {
      currentWeek: getWeekData(new Date()),
      nextWeek: getWeekData(new Date(Date.now() - 7 * oneDay)),
      prevWeek: getWeekData(new Date(Date.now() + 7 * oneDay)),
    },
    monthProps: {
      month: getMonthName(new Date().getMonth()),
      year: new Date().getFullYear(),
    },
  },
  updateWeeks: (): void => console.log("Function didnt bundle correct"),
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScroll, setCurrentScroll] = useState<number>(-33.3);
  const [selectedCell, setSelectedCell] = useState<CalendarEvent | null>(null);
  const [dateData, setDateData] = useState<DateData>({
    dayProps: {
      currentWeek: [],
      nextWeek: [],
      prevWeek: [],
    },
    monthProps: {
      month: getMonthName(new Date().getMonth()),
      year: new Date().getFullYear(),
    },
  });

  const updateWeeks = (mainDate: Date) => {
    setDateData((prevState) => {
      return {
        dayProps: {
          currentWeek: getWeekData(new Date(mainDate)),
          nextWeek: getWeekData(new Date(mainDate.getDate() - 7 * oneDay)),
          prevWeek: getWeekData(new Date(mainDate.getDate() + 7 * oneDay)),
        },
        monthProps: {
          month: getMonthName(new Date(mainDate).getMonth()),
          year: new Date(mainDate).getFullYear(),
        },
      };
    });
  };

  const moveScrollableWeekdays = (move: number) => {
    console.log(currentScroll);
    switch (move) {
      case -1: {
        setCurrentScroll((prevScroll) => prevScroll + 33.3);
        // тут меняется неделя
        break;
      }
      case 1: {
        setCurrentScroll((prevScroll) => prevScroll - 33.3);
        // тут меняется неделя
        break;
      }
      default: {
        return;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScroll,
        selectedCell,
        moveScrollableWeekdays,
        setCurrentScroll,
        setSelectedCell,
        dateData,
        setDateData,
        updateWeeks,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
