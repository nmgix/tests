import { Request, Response } from "express";
import { Schema } from "mongoose";
import { ITodo } from "../models/Todo";

type TodoUpdateBody = Partial<ITodo> & { onDelete: string[] };

type TodoCreateRequest = Request<{}, {}, ITodo>;
type TodoGetQuery = Request<{}, {}, {}, { from?: number; to?: number }>;
type TodoUpdateRequest = Request<{}, {}, TodoUpdateBody>;
type TodoQuery = Request<{ todoId: string }>;

export { TodoCreateRequest, TodoGetQuery, TodoUpdateRequest, TodoUpdateBody, TodoQuery };
