import { Asteroid, AsteroidWeek } from "../types/asteroid";

export async function getAsteroid(id: string): Promise<Asteroid | null> {
  let asteroid: Asteroid;

  try {
    let res = await fetch(`${process.env.ASTEROID_URL}/${id}?api_key=${process.env.API_KEY}`);
    asteroid = await res.json();
  } catch (e) {
    return null;
  }

  return asteroid;
}

export async function getAsteroids(): Promise<AsteroidWeek | null> {
  let asteroids: AsteroidWeek;

  try {
    let res = await fetch(`${process.env.ASTEROIDS_URL}/feed?api_key=${process.env.API_KEY}`);
    asteroids = await res.json();
  } catch (error) {
    return null;
  }

  return asteroids;
}
