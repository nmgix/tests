import { PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../types/ITodo";

export type TodoState = {
  todos: ITodo[];
  currentTodo: ITodo | null;
};

export type AddTodosSagaAction = PayloadAction<{ from: number; to: number }>;
export type AddTodosReducerAction = PayloadAction<ITodo[]>;

export type CreateOrUpdateTodoAction = PayloadAction<FormData>;

export type FetchTodoSagaAction = PayloadAction<{ todoId: string }>;
export type FetchTodoReducerAction = PayloadAction<ITodo>;
