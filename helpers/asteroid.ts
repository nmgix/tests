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

export async function getAsteroids(startDate: Date): Promise<AsteroidWeek | null> {
  let asteroids: AsteroidWeek;

  let date = formateDate(startDate);

  try {
    let res = await fetch(`${process.env.ASTEROIDS_URL}/feed?start_date=${date}&api_key=${process.env.API_KEY}`);
    asteroids = await res.json();
  } catch (error) {
    return null;
  }

  return asteroids;
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

export async function getMoreAsteroids(d: Date): Promise<Asteroid[] | null> {
  let date = formateDate(d);

  let res = await fetch(`/api/asteroids/${date}`);
  let asteroidWeek: AsteroidWeek = await res.json();
  let formatedWeek = handleWeek(asteroidWeek);

  return formatedWeek;
}
