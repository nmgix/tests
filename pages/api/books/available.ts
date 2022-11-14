import { NextApiRequest, NextApiResponse } from "next";
import randomTime from "../../../helpers/randomTime";
import { mockData } from "../../../mockdata";
import { AirportCodes } from "../../../types/airportCodes";
import { BookData, DestinationSelection } from "../../../types/BookData";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: DestinationSelection;
}

export default function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { cityFrom, cityTo, timeFrom, timeTo } = req.body;

  if (
    req.method !== "POST" ||
    req.body === undefined ||
    typeof cityFrom !== "string" ||
    typeof cityTo !== "string" ||
    isNaN(Date.parse(timeFrom)) ||
    isNaN(Date.parse(timeTo))
  ) {
    res.status(400);
  } else {
    let foundBooks: BookData[] = [];
    mockData.forEach((book) => {
      const { route } = book.routes[0];
      if (
        cityFrom === route.from.city &&
        cityTo === route.to.city &&
        timeFrom === route.from.time.toLocaleDateString("ru-RU").split(".").reverse().join("-") &&
        timeFrom === route.to.time.toLocaleDateString("ru-RU").split(".").reverse().join("-")
      ) {
        foundBooks.push(book);
      }
    });

    let mockBook: BookData = {
      routes: [
        {
          route: {
            from: {
              city: cityFrom,
              time: new Date(timeFrom + " " + randomTime(0, 12)),
              airportCode: cityFrom in AirportCodes ? AirportCodes[cityFrom as keyof typeof AirportCodes] : "UNK",
            },
            to: {
              city: cityTo,
              time: new Date(timeTo + " " + randomTime(12, 24)),
              airportCode: cityFrom in AirportCodes ? AirportCodes[cityFrom as keyof typeof AirportCodes] : "UNK",
            },
          },
          carrier: "S7",
          priceInformation: {
            currency: "RUB",
            price: 4150,
          },
          refundable: false,
        },
      ],
    };

    res.status(200).json({ availableBooks: [...foundBooks, mockBook] });
  }
}
