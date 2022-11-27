import { body, param } from "express-validator";

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

const todoCreateValidation = [
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

const todoUpdateValidation = [
  body("title", "Отсутствует заголовок задания (минимально 5 символов, максимально 100)")
    .optional()
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 5, max: 100 }),
  body("description", "(Опционально) Ошибка в описании (минимально 5 символов)")
    .optional()
    .optional()
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 5 }),
  body("completed", "Ошибка в статусе выполнения Todo").optional().notEmpty(),
  body("activeUntil", "Ошибка в дате").optional().notEmpty(),
];

const todoDeleteValidaton = [param("todoId", "Id задания не указан").isString().isLength({ min: 24, max: 24 })];

export { authValidation, todoUpdateValidation, todoCreateValidation, todoDeleteValidaton };
