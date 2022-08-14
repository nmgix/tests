import { MonthProps } from "../components/DateBarGroup/DateMonthBar";
import { DaysBarProps } from "../components/DateBarGroup/DateWeekBar";
import { DayProps } from "../components/DateBarGroup/DateWeekBar/DateDay";
import { locale } from "./settings";

export const oneDay = 24 * 60 * 60 * 1000;

export type DateData = {
  dayProps: Omit<DaysBarProps, "selected" | "setSelectedDay">;
  monthProps: Omit<MonthProps, "moveAction">;
};

// считает всю неделю, сохраняет всё в массив Date, далее преобразуя в массив DayProps
export const getWeekData = (date: Date): DayProps[] => {
  let weekDaysResult: Date[] = Array.from(Array(7).keys()).map((i) => {
    const resultDate = new Date(date);
    resultDate.setDate(
      // неделя по-европейским меркам начинается с воскресенья, из-за этого появляются "магические" числа
      resultDate.getDate() - (resultDate.getDay() === 0 ? resultDate.getDay() + i : resultDate.getDay() + 1 + i)
    );
    return resultDate;
  });

  weekDaysResult.sort((aDate, bDate) => aDate.getDate() - bDate.getDate());
  weekDaysResult.sort((aDate, bDate) => aDate.getMonth() - bDate.getMonth());

  return weekDaysResult.map((weekDay) => {
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

export const formatDate = (date: Date, includeYear = false) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  return includeYear ? day + "/" + month + "/" + year : day + "/" + month;
};
