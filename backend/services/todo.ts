import { Schema, Types } from "mongoose";
import Todo, { ITodo } from "../models/Todo";
import User, { IUser } from "../models/User";

/**
 * Получение всех заданий или по пагинации
 * @param {string} user_id id текущего пользователя, приходит с req.body
 * @param {number} from поле пагниации, отвечает за изначальный отступ
 * @param {number} to поле пагниации, отвечает за кол-во элементов для получения, используется в пару с отступом
 * @returns {ITodo[]} массив заданий
 */
const getTodos = async (user_id: string, from?: number, to?: number): Promise<Types.DocumentArray<ITodo> | string> => {
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
      ? await User.findById(user_id, {})
          .populate("todos")
          .slice("todos", options.skip <= 0 ? options.limit : [options.skip, options.limit])
          .populate("todos.attachments")
          .exec()
      : await User.findById(user_id, {}).populate("todos").populate("todos.attachments").exec();
  if (!user) {
    return "Пользователь не найден";
  }
  return user.todos;
};

/**
 * Создание нового задания
 * @param {ITodo} todoData данные задания для сохранения
 * @param {string} user_id id текущего пользователя, приходит с req.body
 * @param {Object} files данные о файлах, которые будут загружены вместе с заданием
 * @returns {ITodo} новое задание
 */
const createTodo = async (
  todoData: ITodo,
  user_id: string,
  files: { attachments: Express.Multer.File[] } | undefined
): Promise<ITodo | string> => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return "Пользователь не найден";
    }

    const newTodo = new Todo({
      ...todoData,
      attachments: files ? files.attachments.map((file) => file.filename) : [],
    });
    user.todos.push(newTodo);

    await user.save();
    return newTodo;
  } catch (error) {
    throw new Error("Ошибка при создании задания: " + error);
  }
};

/**
 * Обновление существующего задания
 * @param {Partial<ITodo> & { _id: Schema.Types.ObjectId }} todo данные задания для обновления
 * @param {string} user_id id текущего пользователя, приходит с req.body
 * @param {Object} files данные о файлах, которые будут загружены вместе с заданием
 * @returns {ITodo} обновленное задание
 */
const updateTodo = async (
  todo: Partial<ITodo> & { _id: Schema.Types.ObjectId },
  user_id: Schema.Types.ObjectId,
  files: { attachments: Express.Multer.File[] } | undefined
) => {
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return "Пользователь не найден";
    }
  } catch (error) {
    throw new Error("Ошибка при обновлении задания: " + error);
  }
};

/**
 * Удаление существующего задания
 * @param {string} todoId id текущего задания, приходит с req.params
 * @param {string} user_id id текущего пользователя, приходит с req.body
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
    await user.todos.pull({ _id: todoId });
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Ошибка при удалении задания: " + error);
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
