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

export { authValidation };
