import { createSlice } from "@reduxjs/toolkit";
import {
  AddTodosReducerAction,
  AddTodosSagaAction,
  CreateOrUpdateTodoAction,
  FetchTodoReducerAction,
  FetchTodoSagaAction,
  TodoState,
} from "../types/todoState";

const initialState: TodoState = {
  todos: [],
  currentTodo: null,
};

export const todoControllerSlice = createSlice({
  name: "todoControl",
  initialState,
  reducers: {
    // не нашёл решения где можно было бы использовать тип AddTodosSagaAction как action name в takeLatest в todoSaga
    initAddToTodoList(state, action: AddTodosSagaAction) {},
    addToTodolist(state, action: AddTodosReducerAction) {
      let existingTodosIds = new Set(state.todos.map((t) => t._id));
      let mergedTodos = [...state.todos, ...action.payload.filter((t) => !existingTodosIds.has(t._id))];

      return {
        ...state,
        todos: mergedTodos,
      };
    },
    initCreateTodo(state, action: CreateOrUpdateTodoAction) {},
    initUpdateTodo(state, action: CreateOrUpdateTodoAction) {},
    initFetchTodo(state, action: FetchTodoSagaAction) {},
    fetchCurrentTodo(state, action: FetchTodoReducerAction) {
      return {
        ...state,
        currentTodo: action.payload,
      };
    },
  },
});

export const { initAddToTodoList, addToTodolist, initCreateTodo, initUpdateTodo, initFetchTodo, fetchCurrentTodo } =
  todoControllerSlice.actions;

export default todoControllerSlice.reducer;
