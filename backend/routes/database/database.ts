import express, { RequestHandler, Request, Response } from "express";
import { IDeleteCargoReq, IGetCargoLimitedReq, IPostCargoReq } from "./cargodb.types";
import { deleteCargoOne, getCargo, setNewCargo } from "./database.queries";

/**
 * Обработчик запросов на базу данных для получения текущих грузов
 * @param {number} req.query.limit - Параметр, отвечающий за лимит элементов на странице (пагинация)
 * @param {number} req.query.page - Текущая страница (пагинация)
 */
const databaseGetLimited: RequestHandler = async (req: IGetCargoLimitedReq, res: Response) => {
  const { limit, page } = req.query;

  try {
    if (!page || !limit) {
      return res.status(400).send("Query is not set");
    }
    var size = page * limit;
    var cargo = await getCargo(size - limit, limit);
    res.status(200).json(cargo);
  } catch (error) {
    console.log("database error, ", error);
    res.status(500).send("Database error occured");
  }
};

const databaseInsert: RequestHandler = async (req: IPostCargoReq, res: Response) => {
  const { cargo } = req.body;

  try {
    if (!cargo) {
      return res.status(400).send("Body is not set");
    }
    await setNewCargo(cargo).then(() => res.sendStatus(200));
  } catch (error) {
    console.log("database error, ", error);
    res.status(500).send("Database error occured");
  }
};

const databaseDeleteOne: RequestHandler = async (req: IDeleteCargoReq, res: Response) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).send("Query is not set");
    }
    await deleteCargoOne(id).then(() => res.sendStatus(200));
  } catch (error) {
    console.log("database error, ", error);
    res.status(500).send("Database error occured");
  }
};

const router = express.Router();

router.get("/cargo", databaseGetLimited);
router.post("/cargo", databaseInsert);
router.delete("/cargo", databaseDeleteOne);

export default router;
