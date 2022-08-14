import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, CalendarEvent } from "../../../context/Context";

export type RawDayData = { [time: string]: CalendarEvent[] };

// type RawCalendarData = { [date: string]: RawDayData };

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

    return resultData;
  }, [selectedDay]);

  const [cellsState, setCellsState] = useState<RawDayData>(() => getDates());

  useEffect(() => {
    setCellsState(getDates());
  }, [selectedDay, getDates]);

  return cellsState;
}
