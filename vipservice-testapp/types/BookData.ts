import { FlightData } from "./FlightData";

export type BookData = {
  uuid: string;
  routes: FlightData[];
};

export type DestinationSelection = {
  cityFrom: string;
  cityTo: string;
  timeFrom: string;
  timeTo: string;
};
