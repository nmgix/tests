import express from "express";
import {
  getAllTodos,
  createNewTodo,
  deleteExistingTodo,
  updateExistingTodo,
  getExactTodo,
} from "../controllers/todoController";
import { todoCreateValidation, todoDeleteValidaton, todoUpdateValidation } from "../helpers/vaildation";
import { validationErrorGuard } from "../middlewares/validationErrorGuard";
import { auth } from "../middlewares/validationJWT";

const TodoRouter = express.Router();
TodoRouter.get("/", auth, getAllTodos);
TodoRouter.get("/:todoId", auth, getExactTodo);
TodoRouter.post("/", auth, todoCreateValidation, validationErrorGuard, createNewTodo);
TodoRouter.patch("/", auth, todoUpdateValidation, validationErrorGuard, updateExistingTodo);
TodoRouter.delete("/:todoId?", auth, todoDeleteValidaton, validationErrorGuard, deleteExistingTodo);

export { TodoRouter };
