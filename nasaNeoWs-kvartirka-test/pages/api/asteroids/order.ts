import { NextApiRequest, NextApiResponse } from "next";
import { getAsteroid } from "../../../helpers/asteroid";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400).json("No order provided");
  }

  let orderRequest: { order: string[] } = JSON.parse(req.body);
  let { order } = orderRequest;
  if (!order || order.length === 0) {
    return res.status(400).json("No order provided");
  }

  if (order && order.length > 0 && typeof order[0] === "string") {
    const requests = order.map((id) => getAsteroid(id));
    try {
      const result = await Promise.all(requests);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(400).json("Error occured");
    }
  } else {
    return res.status(400).json("Wrong order");
  }
};

export default handler;
