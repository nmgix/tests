import axios from "axios";
import express, { RequestHandler, Request, Response } from "express";
import { auth, UserAttributes } from "../middleware/auth";

type UserNotesRequest = Request<{ id?: string }, {}, { user: UserAttributes }>;
/**
 * /create эндпоинт.
 * @param {string} id - цель удаления.
 * @param {UserAttributes} user - Объект пользотваеля, полученный с промежуточного по.
 */
const createUser: RequestHandler = async (req: UserNotesRequest, res: Response) => {};

/**
 * /delete эндпоинт.
 * @param {string} id - цель удаления.
 * @param {UserAttributes} user - Объект пользотваеля, полученный с промежуточного по.
 */
const deleteUser: RequestHandler = async (req: UserNotesRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const currentUser = await axios
      .get<UserAttributes>(
        `http://${process.env.NODE_ENV === "dev" ? "localhost" : process.env.CLIENT_URL}:${
          process.env.CLIENT_PORT
        }/user/${id !== undefined ? id : ""}`
      )
      .then((res) => res.data);
    if (!currentUser) {
      return res.status(400).send("User not found");
    } else {
      console.log(currentUser);
      return res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Service Error");
  }
};

export const UsersRouter = express.Router();

UsersRouter.post("/", createUser);
UsersRouter.delete("/:id", auth, deleteUser);
