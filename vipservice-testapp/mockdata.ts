import { BookData } from "./types/BookData";

export const mockData: BookData[] = [
  {
    uuid: "c96ab0c9-32fd-4096-9c4f-edac9d97a0e6",
    routes: [
      {
        carrier: "S7 Airlines",
        route: {
          uuid: "b4bcd176-e4ed-4901-8745-79a666e88135",
          from: {
            city: "Москва",
            airportCode: "SVO",
            time: new Date("2022-05-19 09:20:00"),
          },
          to: {
            city: "Ростов на Дону",
            airportCode: "ROV",
            time: new Date("2022-05-19 11:05:00"),
          },
        },
        priceInformation: {
          price: 4150,
          currency: "RUB",
        },
        refundable: false,
        otherTime: [
          {
            uuid: "216dcee2-73a7-4ec7-886a-f9e07bbf7f7c",
            from: {
              city: "Москва",
              airportCode: "SVO",
              time: new Date("2022-05-19 10:20:00"),
            },
            to: {
              city: "Ростов на Дону",
              airportCode: "ROV",
              time: new Date("2022-05-19 12:05:00"),
            },
          },
          {
            uuid: "545953c1-85c5-4a98-970c-e1ae0cf56c23",
            from: {
              city: "Москва",
              airportCode: "SVO",
              time: new Date("2022-05-19 11:20:00"),
            },
            to: {
              city: "Ростов на Дону",
              airportCode: "ROV",
              time: new Date("2022-05-19 13:05:00"),
            },
          },
        ],
      },
    ],
  },
  {
    uuid: "1d2efd46-2ad0-4e33-a4e1-7b28a70067eb",
    routes: [
      {
        carrier: "S7 Airlines",
        route: {
          uuid: "1996c086-53e3-409d-8077-bfadd8c5353e",
          from: {
            city: "Москва",
            airportCode: "SVO",
            time: new Date("2022-05-19 22:57:00"),
          },
          to: {
            city: "Ростов на Дону",
            airportCode: "ROV",
            time: new Date("2022-05-19 11:05:00"),
          },
        },
        priceInformation: {
          price: 4650,
          currency: "RUB",
        },
        refundable: false,
      },
      {
        carrier: "S7 Airlines",
        route: {
          uuid: "82a8426e-7aab-47dd-a4fa-8a6c30c4cc25",
          from: {
            city: "Ростов на Дону",
            airportCode: "ROV",
            time: new Date("2022-05-19 22:57:00"),
          },
          to: {
            city: "Москва",
            airportCode: "SVO",
            time: new Date("2022-05-19 11:05:00"),
          },
        },
        priceInformation: {
          price: 4650,
          currency: "RUB",
        },
        refundable: false,
      },
    ],
  },
];
