import { MonthProps } from "../components/DateBarGroup/DateMonthBar";
import { DaysBarProps } from "../components/DateBarGroup/DateWeek";
import { DayProps } from "../components/DateBarGroup/DateWeek/DateDay";
import { locale } from "./settings";

export const oneDay = 24 * 60 * 60 * 1000;

export type DateData = {
  dayProps: Omit<DaysBarProps, "currentScroll" | "setCurrentScroll">;
  monthProps: Omit<MonthProps, "moveAction">;
};

// считает всю неделю, сохраняет всё в массив Date, далее преобразуя в массив DayProps
export const getWeekData = (date: Date): DayProps[] => {
  let weekDaysResult: Date[] = [];
  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const day = date.getDay();
  weekDays.forEach((dayNumber) => {
    //@issue 2, необходимо избавиться от магических чисел ("2")
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
