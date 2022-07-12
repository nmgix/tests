import express, { RequestHandler, Request, Response } from "express";
import { User } from "../helper/createDatabaseConnection";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

type RegisterRequest = Request<{}, {}, { name: string; email: string; password: string }>;

const registerUser: RequestHandler = async (req: RegisterRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("User data error");
    } else {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send("User exists");
      } else {
        const user = await User.create(req.body);

        const payload = {
          id: user.id,
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET!.toString(),
          { expiresIn: process.env.JWT_EXPIRES_IN },
          (err, token) => {
            if (err) {
              console.log(err);
              return res.status(400).json("User auth error");
            } else {
              res.cookie("token", token!, { httpOnly: true, maxAge: Number(process.env.JWT_EXPIRES_IN) });
              return res.status(200).json(user);
            }
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Service Error");
  }
};

type AuthorizeRequest = Request<{}, {}, { login: string; password: string }>;

const authorizeUser: RequestHandler = async (req: AuthorizeRequest, res: Response) => {
  try {
    const { login, password } = req.body;

    await User.findOne({
      where: {
        [Op.or]: [
          {
            name: login,
          },
          {
            email: login,
          },
        ],
      },
    }).then(async (user) => {
      if (!user) {
        return res.status(400).send("Wrong credentials");
      } else if (!(await user.validPassword(password))) {
        return res.status(400).send("Wrong credentials");
      } else {
        const payload = {
          id: user.id,
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET!.toString(),
          { expiresIn: process.env.JWT_EXPIRES_IN },
          (err, token) => {
            if (err) {
              console.log(err);
              return res.status(400).json("User auth error");
            } else {
              res.cookie("token", token!, { httpOnly: true, maxAge: Number(process.env.JWT_EXPIRES_IN) });
              return res.status(200).json("Authed");
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Service Error");
  }
};

export const AuthorizationRouter = express.Router();

AuthorizationRouter.post("/register", registerUser);
AuthorizationRouter.post("/authorize", authorizeUser);
