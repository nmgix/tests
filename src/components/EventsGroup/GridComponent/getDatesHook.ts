import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, CalendarEvent } from "../../../context/Context";
import { formatHours } from "../../../context/helpers";

export type RawDayData = { [time: string]: CalendarEvent[] };

type RawCalendarData = { [date: string]: RawDayData };

export function useGetDates(): RawDayData {
  const { selectedDay } = useContext(AppContext);

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

    // console.log(
    //   JSON.stringify({
    //     "13/08/2022": {
    //       "09:00": [
    //         {
    //           date: new Date().setHours(9),
    //           id: 0,
    //           scheduled: false,
    //         },
    //         {
    //           date: new Date().setHours(9, 30),
    //           id: 1,
    //           scheduled: false,
    //         },
    //       ],
    //       "10:00": [
    //         {
    //           date: new Date().setHours(10),
    //           id: 0,
    //           scheduled: false,
    //         },
    //         {
    //           date: new Date().setHours(10, 30),
    //           id: 1,
    //           scheduled: false,
    //         },
    //       ],
    //     },
    //     "14/08/2022": {
    //       "09:00": [
    //         {
    //           date: new Date().setHours(9),
    //           id: 0,
    //           scheduled: true,
    //         },
    //         {
    //           date: new Date().setHours(9, 30),
    //           id: 1,
    //           scheduled: false,
    //         },
    //       ],
    //       "10:00": [
    //         {
    //           date: new Date().setHours(10),
    //           id: 0,
    //           scheduled: true,
    //         },
    //         {
    //           date: new Date().setHours(10, 30),
    //           id: 1,
    //           scheduled: true,
    //         },
    //       ],
    //     },
    //   })
    // );

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

      Object.keys(dayData).map((key) => {
        let eventsArray = dayData[key];
        eventsArray.forEach((event) => {
          event.date = new Date(event.date);
        });

        let gridDataDay = Object.keys(resultData).find((gridKey) => {
          return formatHours(key) === formatHours(gridKey);
        });
        let gridData = resultData[gridDataDay!];
        gridData.splice(0, eventsArray.length, ...eventsArray);
        return true;
      });
    }

    return resultData;
  }, [selectedDay]);

  const [cellsState, setCellsState] = useState<RawDayData>(() => getDates());

  useEffect(() => {
    setCellsState(getDates());
  }, [selectedDay, getDates]);

  return cellsState;
}
