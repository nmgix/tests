import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/authTypes";
import { httpStatusCodes } from "../types/statusCodes";

/**
 * Контроллер для полкчения всех Todo пользователя.
 * @param {Request} req после валидации приходит email и password
 * @returns {string} либо JWT-токен, либо ошибку
 */
const getTodos = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    console.log("wow");
    return res.status(httpStatusCodes.OK).json();
  } catch (error) {
    next(error);
  }
};

export { getTodos };
