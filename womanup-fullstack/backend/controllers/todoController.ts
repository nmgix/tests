import { NextFunction, Request, Response } from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../services/todo";
import { UserRequest } from "../types/authTypes";
import { httpStatusCodes } from "../helpers/statusCodes";
import { TodoGetQuery, TodoCreateRequest, TodoQuery, TodoUpdateRequest } from "../types/todoTypes";

/**
 * Контроллер для получения всех заданий пользователя.
 * @param {TodoGetQuery & UserRequest} req после валидации приходит userId
 * @returns {JSON} список заданий (с или без пагинации)
 */
const getAllTodos = async (req: TodoGetQuery & UserRequest, res: Response, next: NextFunction) => {
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

const getExactTodo = async (req: TodoQuery & UserRequest, res: Response, next: NextFunction) => {
  try {
    const todo = await getTodo(req.body.userId, req.params.todoId);
    if (typeof todo === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Получение задания не удалось по причине: " + todo);
    }
    return res.status(httpStatusCodes.OK).json(todo);
  } catch (error) {
    next(error);
  }
};

/**
 * Контроллер для создания нового задания.
 * @param {TodoCreateRequest & UserRequest} req после валидации приходит userId и контент formData
 */
const createNewTodo = async (req: TodoCreateRequest & UserRequest, res: Response, next: NextFunction) => {
  try {
    const todoCreation = await createTodo(
      req.body,
      req.body.userId,
      req.files as { attachments: Express.Multer.File[] } | undefined
    );
    if (typeof todoCreation === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Задание не создано по причине: " + todoCreation);
    }

    return res.status(httpStatusCodes.OK).json(todoCreation);
  } catch (error) {
    next(error);
  }
};

const updateExistingTodo = async (req: TodoUpdateRequest & UserRequest, res: Response, next: NextFunction) => {
  try {
    const updatedTodo = await updateTodo(
      req.body,
      req.body.userId,
      req.files as { attachments: Express.Multer.File[] } | undefined
    );
    if (typeof updatedTodo === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Задание не обновлено по причине: " + updatedTodo);
    }

    return res.status(httpStatusCodes.OK).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteExistingTodo = async (req: TodoQuery & UserRequest, res: Response, next: NextFunction) => {
  try {
    const todoDelete = await deleteTodo(req.params.todoId, req.body.userId);
    if (typeof todoDelete === "string") {
      return res.status(httpStatusCodes.BAD_REQUEST).json("Задание не удалено по причине: " + todoDelete);
    }
    return res.status(httpStatusCodes.OK).json("Задание успешно удалено");
  } catch (error) {
    next(error);
  }
};

export { getAllTodos, getExactTodo, createNewTodo, updateExistingTodo, deleteExistingTodo };
