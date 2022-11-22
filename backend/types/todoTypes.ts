import { Request, Response } from "express";
import { Schema } from "mongoose";
import { ITodo } from "../models/Todo";

type TodoRequest = Request<{}, {}, ITodo>;
type TodoGetQuery = Request<{}, {}, { userId: Schema.Types.ObjectId }, { from?: number; to?: number }>;

export { TodoRequest, TodoGetQuery };
