import express, { RequestHandler, Request, Response } from "express";
import { User } from "../helper/createDatabaseConnection";
import { Op } from "sequelize";
import { auth } from "../middleware/auth";
import { UserAttributes } from "../models/User";
import { checkRole } from "../middleware/privilege";
import { authorizeUser } from "./authorization";
import axios from "axios";

type UserGetRequest = Request<{}, {}, { userId: string }, { id?: string }>;

/**
 * /getUser эндпоинт.
 * @param {string} userId - универсальный атрибут, если администратор, есть возможность посмотреть другого пользователя, иначе только себя.
 * @param {string} id - атрибут администратора, чтобы испльзовать `spy/:id`.
 */
const getUser: RequestHandler = async (req: UserGetRequest, res: Response) => {
  try {
    const { id } = req.query;
    const { userId } = req.body;

    var admin: boolean = false;

    if (userId !== undefined) {
      const currentUser = await User.findOne({ where: { id: userId } });
      if (currentUser && currentUser.level! > 0) {
        admin = true;
      }
    }

    if (admin && !id) {
      return res.status(400).send("Param is not set");
    }

    await User.findOne({
      where:
        admin && id
          ? {
              [Op.or]: [
                {
                  id: id,
                },
                {
                  name: id,
                },
                {
                  email: id,
                },
              ],
            }
          : { id: userId },
      attributes: { exclude: ["password"] },
    }).then(async (user) => {
      if (!user) {
        return res.status(400).send("User not found");
      } else {
        return res.status(200).send(user);
      }
    });
  } catch (error) {
    res.status(500).send("Service Error");
  }
};

type UsersGetRequest = Request<{}, {}, { userId: string }>;
/**
 * /getUsers эндпоинт.
 * Получать всех пользователей.
 */
const getUsers: RequestHandler = async (req: UsersGetRequest, res: Response) => {
  const { userId } = req.body;

  try {
    if (userId !== undefined) {
      const currentUser = await User.findOne({ where: { id: userId } });
      if (currentUser && currentUser.level! < 1) {
        return res.status(400).send("Access denied");
      }
    }

    await User.findAll({ attributes: { exclude: ["password"] } }).then(async (users) => {
      if (!users) {
        return res.status(400).send("Users not found");
      } else {
        return res.status(200).send(users);
      }
    });
  } catch (error) {
    res.status(500).send("Service Error");
  }
};

type UserUpdateRequest = Request<{}, {}, { userId: string; payload: Partial<UserAttributes> }, { id?: string }>;

/**
 * /updateUser эндпоинт.
 * @param {string} userId - атрибут пользователя для обновления, универсальный для администратора.
 * @param {Partial<UserAttributes>} payload - поля для обновления.
 */
const updateUser: RequestHandler = async (req: UserUpdateRequest, res: Response) => {
  try {
    const { id } = req.query;
    const { userId, payload } = req.body;

    var admin: boolean = false;

    if (userId !== undefined) {
      const currentUser = await User.findOne({ where: { id: userId } });
      if (currentUser && currentUser.level! > 0) {
        admin = true;
      }
    }

    if (admin && !id) {
      return res.status(400).send("Param is not set");
    }

    if (!payload) {
      return res.sendStatus(304);
    } else {
      await User.findOne({
        where: admin && id ? { id: id } : { id: userId },
        attributes: { exclude: ["password"] },
      }).then(async (user) => {
        if (!user) {
          return res.status(400).send("User not found");
        } else {
          const updatedUser = await user.update(payload);
          return res.status(200).send(updatedUser);
        }
      });
    }
  } catch (error) {
    return res.status(500).send("Service Error");
  }
};

type UserDeleteRequest = Request<{}, {}, { userId: string }, { id?: string }>;
/**
 * /delete эндпоинт.
 * @param {string} userId - атрибут для авторизации пользователя.
 * @param {string} id - атрибут администратора, чтобы испльзовать `spy/:id`.
 */
const deleteUser: RequestHandler = async (req: UserDeleteRequest, res: Response) => {
  try {
    const { id } = req.query;
    const { userId } = req.body;

    var admin: boolean = false;

    if (userId !== undefined) {
      const currentUser = await User.findOne({ where: { id: userId } });
      if (currentUser && currentUser.level! > 0) {
        admin = true;
      }
    }

    if (admin && !id) {
      return res.status(400).send("Param is not set");
    }

    await User.findOne({
      where:
        admin && id
          ? {
              [Op.or]: [
                {
                  id: id,
                },
                {
                  name: id,
                },
                {
                  email: id,
                },
              ],
            }
          : { id: userId },
      attributes: { exclude: ["password"] },
    }).then(async (user) => {
      if (!user) {
        return res.status(400).send("User not found");
      } else {
        try {
          await axios.delete(
            `http://${process.env.NODE_ENV === "dev" ? "localhost" : process.env.NOTES_URL}:${process.env.NOTES_PORT}/${
              user.id
            }`
          );
        } catch (error) {}
        await user.destroy();
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    res.status(500).send("Service Error");
  }
};

export const ManipulationRouter = express.Router();

ManipulationRouter.get("/all/", auth, checkRole(1), getUsers); //admin read all
ManipulationRouter.post("/spy/", auth, checkRole(1), authorizeUser);

ManipulationRouter.get("/", auth, getUser);
ManipulationRouter.get("/:id", auth, getUser); //user read

ManipulationRouter.put("/", auth, updateUser); //user update
ManipulationRouter.delete("/", auth, deleteUser); //user delete
