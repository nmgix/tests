import { MonthProps } from "../components/DateBarGroup/DateMonthBarComponent";
import { DaysBarProps } from "../components/DateBarGroup/DateWeekBar/DateWeekBarComponent";
import { DayProps } from "../components/DateBarGroup/DateWeekBar/DateDayComponent";
import { locale } from "./settings";
import { RawDayData } from "./Context";

export const oneDay = 24 * 60 * 60 * 1000;

export type DateData = {
  dayProps: Omit<DaysBarProps, "selected" | "setSelectedDay">;
  monthProps: Omit<MonthProps, "moveAction">;
};

// считает всю неделю, сохраняет всё в массив Date, далее преобразуя в массив DayProps
export const getWeekData = (date: Date): DayProps[] => {
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = date.getDate() - date.getDay() + i;
    let day = new Date(date.setDate(first));
    week.push(day);
  }

  return week.map((weekDay) => {
    return {
      selected: false,
      weekDay: weekDay.toLocaleDateString(locale, { weekday: "narrow" }),
      weekDayNumber: weekDay.getDate(),
      date: weekDay,
      setSelectedDay: () => {
        console.log("Function didn't load");
      },
    };
  });
};

// определяет в какой части какой месяц в приоритете и показывает в приложении месяц с большим приоритетом (4 дня июня > 3 дня июля)
type MixedDateData = {
  month1: DayProps[];
  month2: DayProps[];
};
export const countWeekData = (dates: DayProps[]): MixedDateData => {
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
export const decideMonth = (dates: DayProps[]) => {
  const { month1, month2 } = countWeekData(dates);

  return (month1.length > month2.length ? month1[0] : month2[0]).date.toLocaleDateString(locale, {
    month: "long",
  }) as any;
};
export const decideYear = (dates: DayProps[]) => {
  const { month1, month2 } = countWeekData(dates);

  return (month1.length > month2.length ? month1[0] : month2[0]).date.getFullYear() as any;
};

// форматировать дату до типа day/month(/year)
export const formatDate = (date: Date, includeYear = false) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return includeYear ? day + "/" + (month < 10 ? `0${month}` : month) + "/" + year : day + "/" + month;
};

// форматировать время от "08:00" до 8
export let formatHours = (date: string) => {
  let formateDate = date.split(":")[0];
  if (Number(formateDate) < 10) {
    formateDate.replace("0", "");
  }
  return Number(formateDate);
};

// типы с измененным date типом
type LocalStorageRawCalendarData = {
  [time: string]: LocalStorageRawDayData;
};
type LocalStorageRawDayData = {
  [time: string]: LocalStorageCalandarEvent[];
};
type LocalStorageCalandarEvent = {
  id: number;
  date: number;
  scheduled: boolean;
};
export const saveEventsLocalStorage = (date: Date, dayData: RawDayData) => {
  let localStorageData = localStorage.getItem("events");

  let data: LocalStorageRawCalendarData = {};

  if (localStorageData) {
    data = JSON.parse(localStorageData);
  }

  let formatedDate = formatDate(date, true);

  let resultData: LocalStorageRawDayData = {};

  Object.keys(dayData).forEach((key) => {
    let dateArray: LocalStorageCalandarEvent[] = [];

    dayData[key].forEach((day) => {
      let event: LocalStorageCalandarEvent = {
        date: day.date.valueOf(),
        id: day.id,
        scheduled: day.scheduled,
      };
      if (event.scheduled === true) {
        dateArray.push(event);
      }
    });

    if (dateArray.length > 0) {
      resultData[key] = dateArray;
    }
  });

  data[formatedDate] = resultData;

  localStorage.setItem("events", JSON.stringify(data));
};
