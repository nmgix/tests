import express from "express";
import { getAllTodos, createNewTodo } from "../controllers/todoController";
import { todoValidation } from "../helpers/vaildation";
import { validationErrorGuard } from "../middlewares/validationErrorGuard";
import { auth } from "../middlewares/validationJWT";

const TodoRouter = express.Router();
TodoRouter.get("/", auth, getAllTodos);
TodoRouter.post("/", auth, todoValidation, validationErrorGuard, createNewTodo);
// todoValidation, validationErrorGuard

export { TodoRouter };
