import express from "express";
import { getAllTodos, createNewTodo, deleteExistingTodo, updateExistingTodo } from "../controllers/todoController";
import { todoCreateValidation, todoDeleteValidaton } from "../helpers/vaildation";
import { validationErrorGuard } from "../middlewares/validationErrorGuard";
import { auth } from "../middlewares/validationJWT";

const TodoRouter = express.Router();
TodoRouter.get("/", auth, getAllTodos);
TodoRouter.post("/", auth, todoCreateValidation, validationErrorGuard, createNewTodo);
TodoRouter.patch("/", auth, updateExistingTodo);
TodoRouter.delete("/:todoId?", auth, todoDeleteValidaton, validationErrorGuard, deleteExistingTodo);

export { TodoRouter };
