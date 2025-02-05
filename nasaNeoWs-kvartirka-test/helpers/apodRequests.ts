import { ApodImage } from "../types/apod";

export async function getApod(): Promise<ApodImage> {
  let apod: ApodImage = await (await fetch(`${process.env.APOD_URL}?api_key=${process.env.API_KEY}`)).json();

  return apod;
}
