import { Asteroid } from "../types/asteroid";

export async function getAsteroid(id: string): Promise<Asteroid | null> {
  let asteroid: Asteroid;

  try {
    let res = await fetch(`${process.env.API_URL}/${id}?api_key=${process.env.API_KEY}`);
    asteroid = await res.json();
  } catch (e) {
    return null;
  }

  return asteroid;
}

// export async function getAsteroids()
