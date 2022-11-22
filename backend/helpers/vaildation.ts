import { body } from "express-validator";

const authValidation = [
  body("email", "Email некорректен (минимально 3 символа, максимально 30)")
    .not()
    .isEmpty()
    .isEmail()
    .trim()
    .isLength({ min: 3, max: 30 }),
  body("password", "Формат пароля неверен (минимально 3 символа, максимально 30)")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 30 }),
];

const todoValidation = [
  body("title", "Отсутствует заголовок задания (минимально 5 символов, максимально 100)")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 5, max: 100 }),
  body("description", "(Опционально) Ошибка в описании (минимально 5 символов)")
    .optional()
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 5 }),
  body("completed", "Ошибка в статусе выполнения Todo").notEmpty(),
  body("activeUntil", "Ошибка в дате").notEmpty(),
];

export { authValidation, todoValidation };
