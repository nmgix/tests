import { BookData } from "./types/BookData";

export const mockData: BookData[] = [
  {
    routes: [
      {
        carrier: "S7",
        route: {
          from: {
            city: "Москва",
            airportCode: "SVO",
            time: new Date("19.05.2022 09:20:00"),
          },
          to: {
            city: "Ростов на Дону",
            airportCode: "ROV",
            time: new Date("19.05.2022 11:05:00"),
          },
        },
        priceInformation: {
          price: 4150,
          currency: "RUB",
        },
        refundable: false,
        otherTime: [
          {
            from: {
              city: "Москва",
              airportCode: "SVO",
              time: new Date("19.05.2022 10:20:00"),
            },
            to: {
              city: "Ростов на Дону",
              airportCode: "ROV",
              time: new Date("19.05.2022 12:05:00"),
            },
          },
          {
            from: {
              city: "Москва",
              airportCode: "SVO",
              time: new Date("19.05.2022 11:20:00"),
            },
            to: {
              city: "Ростов на Дону",
              airportCode: "ROV",
              time: new Date("19.05.2022 13:05:00"),
            },
          },
        ],
      },
    ],
  },
  {
    routes: [
      {
        carrier: "S7",
        route: {
          from: {
            city: "Москва",
            airportCode: "SVO",
            time: new Date("19.05.2022 22:57:00"),
          },
          to: {
            city: "Ростов на Дону",
            airportCode: "ROV",
            time: new Date("19.05.2022 11:05:00"),
          },
        },
        priceInformation: {
          price: 4150,
          currency: "RUB",
        },
        refundable: false,
      },
      {
        carrier: "S7",
        route: {
          from: {
            city: "Ростов на Дону",
            airportCode: "ROV",
            time: new Date("19.05.2022 22:57:00"),
          },
          to: {
            city: "Москва",
            airportCode: "SVO",
            time: new Date("19.05.2022 11:05:00"),
          },
        },
        priceInformation: {
          price: 4150,
          currency: "RUB",
        },
        refundable: false,
      },
    ],
  },
];
