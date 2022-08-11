import React from "react";
import { useEffect } from "react";
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

const locale = "en-EN"; //'ru-RU'

const oneDay = 24 * 60 * 60 * 1000;

const getWeekData = (date: Date): DayProps[] => {
  let weekDaysResult: Date[] = [];
  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const day = date.getDay();
  weekDays.forEach((dayNumber) => {
    let resultDay = new Date(+date + 8 * 3600 * 1000 + (day - 2 - dayNumber) * oneDay);
    weekDaysResult.push(resultDay);
  });

  weekDaysResult.sort((aDate, bDate) => aDate.getDate() - bDate.getDate());
  weekDaysResult.sort((aDate, bDate) => aDate.getMonth() - bDate.getMonth());

  return weekDaysResult.map((weekDay) => {
    return {
      selected: false,
      weekDay: weekDay.toLocaleDateString(locale, { weekday: "narrow" }),
      weekDayNumber: weekDay.getDate(),
      date: weekDay,
    };
  });
};

// определяет в какой части какой месяц в приоритете и показывает в приложении месяц с большим приоритетом (4 дня июня > 3 дня июля)
type MixedDateData = {
  month1: DayProps[];
  month2: DayProps[];
};
const countWeekData = (dates: DayProps[]): MixedDateData => {
  let targetMonth: DayProps | null = null;
  let month1: DayProps[] = [];
  let month2: DayProps[] = [];

  dates.forEach((currentDate, i) => {
    if (i === 0) {
      targetMonth = currentDate;
      return month1.push(currentDate);
    } else {
      if (currentDate.date.getMonth() === targetMonth?.date.getMonth()) {
        return month1.push(currentDate);
      } else {
        return month2.push(currentDate);
      }
    }
  });
  return {
    month1,
    month2,
  };
};
const decideMonth = (dates: DayProps[]) => {
  const { month1, month2 } = countWeekData(dates);

  return (month1.length > month2.length ? month1[0] : month2[0]).date.toLocaleDateString(locale, {
    month: "long",
  }) as any;
};
const decideYear = (dates: DayProps[]) => {
  const { month1, month2 } = countWeekData(dates);

  return (month1.length > month2.length ? month1[0] : month2[0]).date.getFullYear() as any;
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

  activeWeek: number;
  setActiveWeek: React.Dispatch<React.SetStateAction<number>>;
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
      currentWeek: [],
      nextWeek: [],
      prevWeek: [],
    },
    monthProps: {
      month: new Date().toLocaleDateString(locale, { month: "long" }),
      year: new Date().getFullYear(),
    },
  },
  updateWeeks: (): void => console.log("Function didnt bundle correct"),

  activeWeek: 0,
  setActiveWeek: (): void => console.log("Function didnt bundle correct"),
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [currentScroll, setCurrentScroll] = useState<number>(-33.3);
  const [selectedCell, setSelectedCell] = useState<CalendarEvent | null>(null);
  const [dateData, setDateData] = useState<DateData>(() => {
    return {
      dayProps: {
        prevWeek: getWeekData(new Date(Date.now() - 7 * oneDay)),
        currentWeek: getWeekData(new Date()),
        nextWeek: getWeekData(new Date(Date.now() + 7 * oneDay)),
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
        currentWeek: getWeekData(new Date(mainDate.valueOf())),
        prevWeek: getWeekData(new Date(mainDate.valueOf() - 7 * oneDay)),
        nextWeek: getWeekData(new Date(mainDate.valueOf() + 7 * oneDay)),
      },
      monthProps: {
        month: decideMonth(getWeekData(mainDate)),
        year: decideYear(getWeekData(mainDate)),
      },
    };

    setDateData(newData);
  };

  const moveScrollableWeekdays = (move: number) => {
    console.log(currentScroll);
    switch (move) {
      case -1: {
        // @issue 1 хотел чтобы была анимация при передвижении, но она практически не работает, subject to change, но задача уже заняла много времени
        // setCurrentScroll((prevScroll) => prevScroll + 33.3);
        setActiveWeek((prev) => prev - 1);
        break;
      }
      case 1: {
        // @issue 1 хотел чтобы была анимация при передвижении, но она практически не работает, subject to change, но задача уже заняла много времени
        // setCurrentScroll((prevScroll) => prevScroll - 33.3);
        setActiveWeek((prev) => prev + 1);
        break;
      }
      default: {
        return;
      }
    }
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
        currentScroll,
        selectedCell,
        moveScrollableWeekdays,
        setCurrentScroll,
        setSelectedCell,
        dateData,
        setDateData,
        updateWeeks,
        activeWeek,
        setActiveWeek,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
