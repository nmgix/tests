import { NextFunction, Request, Response } from "express";
import { createTodo, getTodos } from "../services/todo";
import { UserRequest } from "../types/authTypes";
import { httpStatusCodes } from "../helpers/statusCodes";
import { TodoGetQuery, TodoRequest } from "../types/todoTypes";

/**
 * Контроллер для получения всех заданий пользователя.
 * @param {Request} req после валидации приходит userId
 * @returns {JSON} список заданий (с или без пагинации)
 */
const getAllTodos = async (req: TodoGetQuery, res: Response, next: NextFunction) => {
  try {
    const todos = await getTodos(req.body.userId, req.query.from, req.query.to);
    if (typeof todos === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Получение заданий не удалось по причине: " + todos);
    }

    return res.status(httpStatusCodes.OK).json(todos);
  } catch (error) {
    next(error);
  }
};

/**
 * Контроллер для создания нового задания.
 * @param {Request} req после валидации приходит userId и контент formData
 */
const createNewTodo = async (req: TodoRequest & UserRequest, res: Response, next: NextFunction) => {
  try {
    const todoCreation = await createTodo(
      req.body,
      req.body.userId,
      req.files as { attachments: Express.Multer.File[] } | undefined
    );
    if (typeof todoCreation === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Задание не создано по причине: " + todoCreation);
    }

    return res.status(httpStatusCodes.OK).json("Задание успешно создано");
  } catch (error) {
    next(error);
  }
};

export { getAllTodos, createNewTodo };
