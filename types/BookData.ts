import { FlightData } from "./FlightData";

export type BookData = {
  routes: FlightData[];
};

export type DestinationSelection = {
  cityFrom: string;
  cityTo: string;
  timeFrom: string;
  timeTo: string;
};
