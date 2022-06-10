import express, { RequestHandler, Request, Response } from "express";
import { CargoItem, IGetCargoLimitedReq } from "../../helpers/cargodb_data";
import { execute } from "../../helpers/sqlconnection";

const cargoInfo: CargoItem[] = [
  {
    name: "a",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 1,
  },
  {
    name: "b",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 2,
  },
  {
    name: "c",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 3,
  },
  {
    name: "d",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 4,
  },
  {
    name: "e",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 5,
  },
  {
    name: "f",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 6,
  },
  {
    name: "g",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 7,
  },
  {
    name: "h",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 8,
  },
  {
    name: "i",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 9,
  },
  {
    name: "j",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 10,
  },
  {
    name: "k",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 11,
  },
  {
    name: "l",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 12,
  },
  {
    name: "m",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 13,
  },
  {
    name: "n",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 14,
  },
  {
    name: "o",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 15,
  },
  {
    name: "p",
    count: 1,
    date: new Date(),
    distance: 10,
    id: 16,
  },
];

const databaseQueryLimited: RequestHandler = async (req: IGetCargoLimitedReq, res: Response) => {
  const { limit, page } = req.query;

  try {
    if (!page || !limit) {
      return res.status(400).send("Query is not set");
    }
    var size = page * limit;
    res.status(200).json(cargoInfo.slice(size - limit, size));
  } catch (error) {
    console.log("database error, ", error);
    res.status(500).send("Database error occured");
  }
};

const router = express.Router();

router.get("/cargo", databaseQueryLimited);

export default router;
