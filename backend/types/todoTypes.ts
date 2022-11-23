import { Request, Response } from "express";
import { Schema } from "mongoose";
import { ITodo } from "../models/Todo";

type TodoCreateRequest = Request<{}, {}, ITodo>;
type TodoGetQuery = Request<{}, {}, {}, { from?: number; to?: number }>;
type TodoDeleteQuery = Request<{ todoId: string }>;

export { TodoCreateRequest, TodoGetQuery, TodoDeleteQuery };
