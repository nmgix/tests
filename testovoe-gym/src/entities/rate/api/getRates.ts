import { apiInstance } from "src/shared/api/client";
import { Rate } from "../model";

const rates_url = import.meta.env.VITE_RATE_URL;

export async function getRates(): Promise<Rate[]> {
  return apiInstance.get(rates_url);
}
