import { Schema, Types } from "mongoose";
import Todo, { ITodo } from "../models/Todo";
import User from "../models/User";

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
      attachments: files ? files.attachments.map((file) => file.filename) : [],
    });
    user.todos.push(newTodo);

    await user.save();
    return newTodo;
  } catch (error) {
    throw new Error("Ошибка при создании задания: " + error);
  }
};

export { getTodos, createTodo };
