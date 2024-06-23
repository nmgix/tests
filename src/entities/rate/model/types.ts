export interface Rate {
  name: string;
  price: number;
  isPopular: boolean;
  isDiscount: boolean;
  creationDateTime: string; // date
  lengthInDays: number;
}

export type RateShortened = Omit<Rate, "creationDateTime" | "lengthInDays" | "isPopular" | "isDiscount">;
