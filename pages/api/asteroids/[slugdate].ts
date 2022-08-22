import { NextApiRequest, NextApiResponse } from "next";
import { getNasaAsteroids } from "../../../helpers/asteroid";
import { isValidDate } from "../../../helpers/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slugdate } = req.query as { slugdate: string };

  try {
    let date = new Date(slugdate);
    if (isValidDate(date)) {
      let nasAsteroidsData = await getNasaAsteroids(date, Number(process.env.DAYS_PER_REQUEST));

      return res.status(200).send({ asteroids: nasAsteroidsData!.asteroidWeek, date: nasAsteroidsData!.date });
    } else {
      return res.status(400).json("Invalid date");
    }
  } catch (e) {
    return res.status(400).json("Error occured");
  }
};
