import { NextFunction, Request, Response } from "express";
import { generateJWT } from "../helpers/generateJWT";
import { authenticateUser, createUser } from "../services/user";
import { AuthRequest } from "../types/authTypes";
import { httpStatusCodes } from "../helpers/statusCodes";

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
  } catch (error) {
    next(error);
  }
};

/**
 * Контроллер авторизации пользователя.
 * @param {Request} req после валидации приходит email и password
 * @returns {string} либо JWT-токен, либо ошибку
 */
const loginUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authenticateUser(req.body.email, req.body.password);
    if (typeof user === "string") {
      res.clearCookie(process.env.JWT_COOKIE_NAME!);
      return res.status(httpStatusCodes.BAD_REQUEST).json("Пользователь не авторизован по причине: " + user);
    } else {
      const jwt = generateJWT(user.id);
      res.cookie(process.env.JWT_COOKIE_NAME!, jwt, { httpOnly: true, maxAge: Number(process.env.JWT_EXPIRATION) });
      return res.status(httpStatusCodes.OK).json(`Авторизован с почтой '${user.email}'`);
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
