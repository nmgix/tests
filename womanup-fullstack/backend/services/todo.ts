import { Schema, Types } from "mongoose";
import Todo, { ITodo } from "../models/Todo";
import User, { IUser } from "../models/User";
import fs from "fs";
import { TodoUpdateBody } from "../types/todoTypes";

/**
 * Получение всех заданий или по пагинации
 * @param {Schema.Types.ObjectId} user_id id текущего пользователя, приходит с req.body
 * @param {number} from поле пагниации, отвечает за изначальный отступ
 * @param {number} to поле пагниации, отвечает за кол-во элементов для получения, используется в пару с отступом
 * @returns {ITodo[]} массив заданий
 */
const getTodos = async (
  user_id: Schema.Types.ObjectId,
  from?: number,
  to?: number
): Promise<Types.DocumentArray<ITodo> | string> => {
  const options: {
    skip?: number;
    limit?: number;
  } = {};
  if (from) {
    options.skip = Number(from);
  }
  if (from && to) {
    options.limit = Number(to);
  }

  const user =
    options.skip !== undefined && options.limit !== undefined
      ? await User.findById(user_id)
          .slice("todos", options.skip <= 0 ? options.limit : [options.skip, options.limit])
          .exec()
      : await User.findById(user_id).exec();
  if (!user) {
    return "Пользователь не найден";
  }

  return user.todos;
};

const getTodo = async (user_id: Schema.Types.ObjectId, todo_id: string) => {
  const user = await User.findById(user_id);
  if (!user) {
    return "Пользователь не найден";
  }
  const todo = user.todos.id(todo_id);
  if (!todo) {
    return "Задание не найдено";
  }
  return todo;
};

/**
 * Создание нового задания
 * @param {ITodo} todoData данные задания для сохранения
 * @param {Schema.Types.ObjectId} user_id id текущего пользователя, приходит с req.body
 * @param {Object} files данные о файлах, которые будут загружены вместе с заданием
 * @returns {ITodo} новое задание
 */
const createTodo = async (
  todoData: ITodo,
  user_id: Schema.Types.ObjectId,
  files: { attachments: Express.Multer.File[] } | undefined
): Promise<ITodo | string> => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return "Пользователь не найден";
    }

    const newTodo = new Todo({
      ...todoData,
      attachments: files?.attachments ? files.attachments.map((file) => file.filename) : [],
    });
    await user.todos.push(newTodo);
    await user.save();
    return newTodo;
  } catch (error) {
    throw new Error("Ошибка при создании задания: " + error);
  }
};

/**
 * Обновление существующего задания
 * @param {Partial<ITodo>} todo данные задания для обновления
 * @param {string} user_id id текущего пользователя, приходит с req.body
 * @param {Object} files данные о файлах, которые будут загружены вместе с заданием
 * @returns {ITodo} обновленное задание
 */
const updateTodo = async (
  todo: TodoUpdateBody,
  user_id: Schema.Types.ObjectId,
  files: { attachments: Express.Multer.File[] } | undefined
) => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return "Пользователь не найден";
    }
    const currentTodo = user.todos.id(todo._id);
    if (!currentTodo) {
      return "Задание не найдено";
    }

    // удаление файлов которых по названию (название на клиенте остаётся тем-же что и на бекенде)
    if (todo.attachments) {
      currentTodo.attachments.map(async (currentAttachment) => {
        if (todo.attachments!.indexOf(currentAttachment) < 0) {
          currentTodo.attachments = currentTodo.attachments.filter(
            (attachment) => attachment !== currentAttachment
          ) as Types.DocumentArray<string>;
          await fs.unlink(`upload/${currentAttachment}`, (err) => {});
        }
      });
    }

    if (todo.title) {
      currentTodo.title = todo.title;
    }
    if (todo.description) {
      currentTodo.description = todo.description;
    }
    if (todo.completed !== undefined) {
      currentTodo.completed = todo.completed;
    }
    if (todo.activeUntil && !isNaN(new Date(todo.activeUntil).valueOf())) {
      currentTodo.activeUntil = todo.activeUntil;
    }
    if (files?.attachments && files.attachments.length > 0) {
      currentTodo.attachments = [
        ...currentTodo.attachments,
        ...files.attachments.map((file) => file.filename),
      ] as Types.DocumentArray<string>;
    }

    await user.save();
    return true;
  } catch (error) {
    throw new Error("Ошибка при обновлении задания: " + error);
  }
};

/**
 * Удаление существующего задания
 * @param {string} todoId id текущего задания, приходит с req.params
 * @param {Schema.Types.ObjectId} user_id id текущего пользователя, приходит с req.body
 * @returns {IUser} пользователя
 */
const deleteTodo = async (todoId: string, user_id: Schema.Types.ObjectId) => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return "Пользователь не найден";
    }
    if (todoId === undefined || todoId.length <= 0) {
      return "Id задания не указан";
    }
    const todo = user.todos.id(todoId);
    if (!todo) {
      return "Задание не найдено";
    } else {
      if (todo.attachments.length > 0) {
        todo.attachments.forEach(async (attachment) => {
          await fs.unlink(`upload/${attachment}`, (err) => {});
        });
      }

      await user.todos.pull({ _id: todoId });
    }
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Ошибка при удалении задания: " + error);
  }
};

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
