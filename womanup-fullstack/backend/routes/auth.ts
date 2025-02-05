import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { validationErrorGuard } from "../middlewares/validationErrorGuard";
import { authValidation } from "../helpers/vaildation";
import { auth } from "../middlewares/validationJWT";

const AuthRouter = express.Router();
AuthRouter.post("/register", authValidation, validationErrorGuard, registerUser);
AuthRouter.post("/login", authValidation, validationErrorGuard, loginUser);
AuthRouter.get("/logout", auth, logoutUser);
AuthRouter.get("/validate", auth, (req, res) => {
  return res.status(200).json("Пользователь авторизован");
});

export { AuthRouter };
