import express from "express";
import { getTodos } from "../controllers/todoController";
import { auth } from "../middlewares/validationJWT";

const TodoRouter = express.Router();
TodoRouter.get("/", auth, getTodos);

export { TodoRouter };
