import express, { RequestHandler, Request, Response } from "express";
import { User } from "../helper/createDatabaseConnection";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../middleware/auth";
import { UserAttributes } from "../models/User";
import axios from "axios";

type RegisterRequest = Request<{}, {}, UserAttributes>;

/**
 * /register эндпоинт.
 * @param {UserAttributes} attrbutes - атрибуты для регистрации нового пользователя.
 */
export const registerUser: RequestHandler = async (req: RegisterRequest, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("User data error");
    } else {
      const existingUser = await User.findOne({ where: { email }, attributes: { exclude: ["password"] } });
      if (existingUser) {
        return res.status(400).send("User exists");
      } else {
        const user = await User.create(req.body);

        if (!user) {
          return res.status(400).send("User creating error");
        } else {
          const payload: JWTPayload = {
            id: user.id!,
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET!.toString(),
            { expiresIn: process.env.JWT_EXPIRES_IN },
            async (err, token) => {
              if (err) {
                console.log(err);
                return res.status(400).json("User auth error");
              } else {
                await axios.post(
                  `http://${process.env.NODE_ENV === "dev" ? "localhost" : process.env.MAIL_URL}:${
                    process.env.MAIL_PORT
                  }/congrats`,
                  {
                    to: user.email,
                  }
                );
                res.cookie("token", token!, { httpOnly: true, maxAge: Number(process.env.JWT_EXPIRES_IN) });
                return res.status(200).json(user);
              }
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Service Error");
  }
};

type AuthorizeRequest = Request<{}, {}, { login: string; password: string; userId?: string }, { id?: string }>;

/**
 * /authorize эндпоинт.
 * @param {string} login - атрибут для авторизации пользователя.
 * @param {string} password - атрибут для авторизации пользователя.
 * @param {string} userId - атрибут администратора, чтобы испльзовать `spy/:id`.
 * @param {string} id - атрибут администратора, чтобы испльзовать `spy/:id`.
 */
export const authorizeUser: RequestHandler = async (req: AuthorizeRequest, res: Response) => {
  try {
    const { id } = req.query;
    const { login, password, userId } = req.body;

    var admin: boolean = false;

    if (userId !== undefined) {
      const currentUser = await User.findOne({ where: { id: userId } });
      if (currentUser && currentUser.level! < 1) {
        return res.status(400).send("Access denied");
      } else {
        admin = true;
      }
    }

    await User.findOne({
      where: {
        [Op.or]: [
          {
            name: admin ? id : login,
          },
          {
            email: admin ? id : login,
          },
        ],
      },
    }).then(async (user) => {
      if (!user) {
        return res.status(400).send("Wrong credentials");
      }
      if (userId === undefined) {
        if (!(await user.validPassword(password))) {
          res.clearCookie("token");
          return res.status(400).send("Wrong credentials");
        }
      }

      const payload: JWTPayload = {
        id: user.id!,
      };

      jwt.sign(payload, process.env.JWT_SECRET!.toString(), { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
        if (err) {
          console.log(err);
          res.clearCookie("token");
          return res.status(400).json("User auth error");
        } else {
          res.cookie("token", token!, { httpOnly: true, maxAge: Number(process.env.JWT_EXPIRES_IN) });
          return res.status(200).json("Authed");
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Service Error");
  }
};

export const AuthorizationRouter = express.Router();

AuthorizationRouter.post("/register", registerUser);
AuthorizationRouter.post("/authorize", authorizeUser);
