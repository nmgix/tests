import { Asteroid, AsteroidWeek } from "../types/asteroid";
import { formateDate } from "./date";

export function addOrder(asteroid: Asteroid, defaultState?: boolean) {
  asteroid.ordered = defaultState ? defaultState : false;
  return asteroid;
}

export async function getAsteroid(id: string): Promise<Asteroid | null> {
  let asteroid: Asteroid;

  try {
    let res = await fetch(`${process.env.ASTEROID_URL}/${id}?api_key=${process.env.API_KEY}`);
    asteroid = await res.json();
  } catch (e) {
    return null;
  }

  return addOrder(asteroid);
}

export async function getOrderAsteroids(order: string[]): Promise<Asteroid[] | null> {
  let asteroids: Asteroid[] = [];

  let res = await fetch("/api/asteroids/order", { method: "POST", body: JSON.stringify({ order }) });
  if (res.status === 400) {
    return null;
  }
  asteroids = await res.json();

  asteroids.forEach((as) => (as = addOrder(as, true)));
  return asteroids;
}

export function handleWeek(week: AsteroidWeek): Asteroid[] | null {
  let asteroids: Asteroid[] = [];

  try {
    let sortedDates = Object.keys(week.near_earth_objects).sort(
      (asDates1, asDates2) => new Date(asDates2).valueOf() - new Date(asDates1).valueOf()
    );
    sortedDates.forEach((date) => {
      asteroids.push(...week.near_earth_objects[date].flat(1));
    });
  } catch (e) {
    return null;
  }

  asteroids.forEach((as) => (as = addOrder(as)));

  return asteroids;
}

/**
 * Получение астероидов с бекенда
 * @param startDate - дата с которой идёт отсчёт (отсчёт вперёд, т.е. с 7 июля => 7 июля-14 июля)
 * @returns
 */
export async function getNasaAsteroids(
  endDate: Date,
  days: number
): Promise<{ asteroidWeek: AsteroidWeek; date: Date } | null> {
  let asteroids: AsteroidWeek;

  let eDate = formateDate(endDate);

  let preSDate = new Date(endDate);
  preSDate.setDate(preSDate.getDate() - days);
  let sDate = formateDate(preSDate);

  try {
    let res = await fetch(
      `${process.env.ASTEROIDS_URL}/feed?start_date=${sDate}&end_date=${eDate}&api_key=${process.env.API_KEY}`
    );
    asteroids = await res.json();
  } catch (error) {
    return null;
  }

  return { asteroidWeek: asteroids, date: new Date(sDate) };
}

/**
 * Получение астероидов с фронтенда
 * @param d - дата с которой идёт отсчёт (отсчёт вперёд, т.е. с 7 июля => 7 июля-14 июля)
 * @returns
 */
export async function getAsteroids(d: Date): Promise<{ asteroids: Asteroid[]; date: Date } | null> {
  let res = await fetch(`/api/asteroids/${formateDate(d)}`);
  let asteroidWeek: { asteroids: AsteroidWeek; date: Date } = await res.json();
  let formatedWeek = handleWeek(asteroidWeek.asteroids)!;

  return { asteroids: formatedWeek, date: asteroidWeek.date };
}
