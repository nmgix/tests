import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

/**
 * Создание нового пользователя.
 * @param {string} password Незашифрованный пароль
 * @returns {Promise<IUser | string>} Промис либо в созданым пользователем, либо с ошибкой
 */
const createUser = async (email: string, password: string): Promise<IUser | string> => {
  try {
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return "Пользователь существует";
    }

    const salt = await bcrypt.genSalt();
    const user = new User({
      email,
      password: await bcrypt.hash(password, salt),
    });

    return await user.save();
  } catch (error) {
    throw new Error("Ошибка при создании пользователя: " + error);
  }
};

export { createUser };
