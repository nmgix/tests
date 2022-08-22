import { useCallback } from "react";
import { Asteroid } from "../types/asteroid";

export function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export function formateDate(d: Date) {
  let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  return date;
}

export function addSubstractDays(d: Date, days: number) {
  let date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
}

export function closestDate(asteroid: Asteroid): Date {
  let currentDate = new Date().valueOf();
  let asteroidDates = asteroid.close_approach_data.map((data) => new Date(data.close_approach_date).valueOf());

  var closestDate = asteroidDates.reduce(function (prev, curr) {
    return Math.abs(curr - currentDate) < Math.abs(prev - currentDate) ? curr : prev;
  });

  return new Date(closestDate);
}
