import { FlightData } from "./FlightData";

export type BookData = {
  route: FlightData[];
};

export type DestinationSelection = {
  cityFrom: string;
  cityTo: string;
  timeFrom: string;
  timeTo: string;
};
