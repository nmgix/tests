import { NextApiRequest, NextApiResponse } from "next";
import { getAsteroids } from "../../../helpers/asteroid";
import { isValidDate } from "../../../helpers/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slugdate } = req.query as { slugdate: string };

  try {
    let date = new Date(slugdate);
    if (isValidDate(date)) {
      let currentDay = date;
      currentDay.setDate(currentDay.getDate() - 7);
      let asteroids = await getAsteroids(currentDay);

      return res.status(200).send(asteroids);
    } else {
      return res.status(400).json("Invalid date");
    }
  } catch (e) {
    return res.status(400).json("Error occured");
  }
};
