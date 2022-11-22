import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { validationErrorGuard } from "../middlewares/validationErrorGuard";
import { authValidation } from "../helpers/vaildation";

const AuthRouter = express.Router();
AuthRouter.post("/register", authValidation, validationErrorGuard, registerUser);
AuthRouter.post("/login", authValidation, validationErrorGuard, loginUser);

export { AuthRouter };
