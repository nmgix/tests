import { NextFunction, Request, Response } from "express";
import { createUser } from "../services/user";
import { AuthRequest } from "../types/authTypes";
import { httpStatusCodes } from "../types/statusCodes";

/**
 * Контроллер создания пользователя.
 * @param {Request} req после валидации приходит email и password
 * @returns {string} либо JWT-токен, либо ошибку
 */
const registerUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body.email, req.body.password);
    if (typeof user === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Пользователь не создан по причине: " + user);
    } else {
      return res.status(200).json(`Пользователь с почтой '${user.email}' создан`);
    }

    // return res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

/**
 * Контроллер авторизации пользователя.
 * @param {Request} req после валидации приходит email и password
 * @returns {string} либо JWT-токен, либо ошибку
 */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("wow");
    return res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
