import axios from "axios";
import express, { RequestHandler, Request, Response } from "express";
import { Note, UserNote } from "../helper/createDatabaseConnection";
import { auth, UserAttributes } from "../middleware/auth";
import { checkRole } from "../middleware/privilege";
import { NoteAttributes } from "../models/Note";
import { UserNoteAttributes } from "../models/UserNote";

type UserNotesRequest = Request<{ id?: string }, {}, { user: UserAttributes }>;
/**
 * /create эндпоинт.
 * @param {string} id - цель удаления.
 * @param {UserAttributes} user - Объект пользотваеля, полученный с промежуточного по.
 */
const createUser: RequestHandler = async (req: UserNotesRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    var admin: boolean = false;

    if (user !== undefined) {
      if (user && user.level! > 0) {
        admin = true;
      }
    }

    if (admin && !id) {
      return res.status(400).send("Param is not set");
    }

    const currentUser = await axios
      .get<UserAttributes>(
        `http://${process.env.NODE_ENV === "dev" ? "localhost" : process.env.CLIENT_URL}:${
          process.env.CLIENT_PORT
        }/user/${admin && !id ? `?id=${id}` : ""}`
      )
      .then((res) => res.data);
    if (currentUser) {
      // return res.status(400).send("User found");
      await UserNote.findOne({ where: { id: admin && id ? currentUser.id! : user.id! } }).then(async (foundUser) => {
        if (foundUser) {
          return res.status(500).send("User found");
        } else {
          await UserNote.create({ id: admin && id ? id! : user!.id! });
          return res.status(200).send("User created");
        }
      });
    }
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

/**
 * /delete эндпоинт.
 * @param {string} id - цель удаления.
 * @param {UserAttributes} user - Объект пользотваеля, полученный с промежуточного по.
 */
const deleteUser: RequestHandler = async (req: UserNotesRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    var admin: boolean = false;

    if (user !== undefined) {
      if (user && user.level! > 0) {
        admin = true;
      }
    }

    if (admin && !id) {
      return res.status(400).send("Param is not set");
    }

    const currentUser = await axios
      .get<UserAttributes>(
        `http://${process.env.NODE_ENV === "dev" ? "localhost" : process.env.CLIENT_URL}:${
          process.env.CLIENT_PORT
        }/user/${admin && !id ? `?id=${id}` : ""}`
      )
      .then((res) => res.data);
    if (!currentUser) {
      return res.status(400).send("User not found");
    } else {
      await UserNote.findOne({ where: { id: admin && id ? currentUser.id! : user.id! } }).then(async (user) => {
        if (!user) {
          return res.status(400).send("User not found");
        } else {
          await Note.findAll({ where: { userId: admin && id ? currentUser.id! : user.id! } }).then((notes) => {
            if (notes) {
              notes.map(async (note) => {
                await note.destroy();
              });
            }
          });
          await user.destroy();
          return res.status(200).send("User deleted");
        }
      });
    }
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

const getUser: RequestHandler = async (req: UserNotesRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    var admin: boolean = false;

    if (user && user.level! > 0) {
      admin = true;
    }

    await UserNote.findOne({
      where:
        admin && id
          ? {
              id: id,
            }
          : { id: user.id! },
    }).then(async (currentUser) => {
      if (!currentUser) {
        return res.status(400).send("User not found");
      }
      // можно вместо id писать данные пользователя с auth (без пароля)
      type ResponseUser = UserNoteAttributes & { notes: NoteAttributes[] };
      var responseUser: ResponseUser = { id: user.id!, notes: [] };
      await Note.findAll({ where: { userId: currentUser.id! } }).then((notes) => {
        if (notes) {
          responseUser.notes = notes;
        }
        return res.status(200).send(responseUser);
      });
    });
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

export const UsersRouter = express.Router();

UsersRouter.get("/", auth, getUser);
UsersRouter.get("/:id", auth, checkRole(1), getUser);
UsersRouter.post("/:id", auth, createUser);
UsersRouter.delete("/:id", auth, deleteUser);
