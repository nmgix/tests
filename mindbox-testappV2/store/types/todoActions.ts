import { TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";
import { Action, PayloadAction } from "@reduxjs/toolkit";

// @ https://github.com/Microsoft/TypeScript/issues/25760
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SetTodosAction = PayloadAction<TodoElementProps[]>;
export type CreateTodoAction = PayloadAction<TodoElementProps>;
export type UpdateTodoAction = PayloadAction<WithOptional<TodoElementProps, "completed" | "description" | "title">>;

export enum FilterOptions {
  "Equal",
  "NotEqual",
  "More",
  "Less",
}

type FilterKey = keyof TodoElementProps;
export type FilterTodoAction = PayloadAction<{
  toRealTodos: boolean;
  key: FilterKey;
  value: TodoElementProps[FilterKey];
  comparer: keyof typeof FilterOptions;
} | null>;
export type ChangeFilterAction = PayloadAction<number | null>;
export type DeleteTodos = PayloadAction<{ all: boolean }>;
