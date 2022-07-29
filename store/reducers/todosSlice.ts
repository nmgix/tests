import { TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";
import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeFilterAction,
  CreateTodoAction,
  FilterOptions,
  SetTodosAction,
  UpdateTodoAction,
} from "../types/todoActions";
import { v4 as uuid } from "uuid";

type TodosState = {
  todos: TodoElementProps[];
  currentFilter: number | null;
};

const initialState: TodosState = {
  todos: [
    {
      uuid: uuid(),
      completed: false,
      description: "Какое-то описание",
      title: "Заголовок заметки 1",
    },
    {
      uuid: uuid(),
      completed: false,
      description:
        "Какое-то описание. Какое-то описание. Какое-то описание. Какое-то описание. Какое-то описание. Какое-то описание.",
      title: "Заголовок заметки 2",
    },
    {
      uuid: uuid(),
      completed: false,
      description: "Какое-то описание",
      title: "Заголовок заметки 3",
    },
    {
      uuid: uuid(),
      completed: false,
      description: "Какое-то описание",
      title: "Заголовок заметки 4",
    },
    {
      uuid: uuid(),
      completed: false,
      description: "Какое-то описание",
      title: "Заголовок заметки 5",
    },
  ],
  currentFilter: null,
};

export function filter<T, P extends keyof T>(
  compareValue: T,
  param: P,
  value: T[P],
  filterOption: keyof typeof FilterOptions
) {
  switch (filterOption) {
    case "Equal": {
      return compareValue[param] === value;
    }
    case "NotEqual": {
      return compareValue[param] !== value;
    }
    case "More": {
      return compareValue[param] > value;
    }
    case "Less": {
      return compareValue[param] < value;
    }
    default: {
      return;
    }
  }
}

export function handleFilter(todo: TodoElementProps, currentFilter: number | null) {
  switch (currentFilter) {
    case 1: {
      return filter(todo, "completed", true, "Equal");
    }
    case 2: {
      return filter(todo, "completed", true, "NotEqual");
    }
    case null:
    default: {
      return todo;
    }
  }
}

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action: SetTodosAction) {
      state.todos = action.payload;
    },
    createTodo(state, action: CreateTodoAction) {
      state.todos.push(action.payload);
    },
    updateTodo(state, action: UpdateTodoAction) {
      let updatedTodos = state.todos.map((todo) => {
        if (todo.uuid === action.payload.uuid) {
          let updatedTodo = { ...todo, ...action.payload };

          todo = updatedTodo;
        }
        return todo;
      });

      state.todos = state.todos.map((currentTodo) => {
        let updatedTodo = updatedTodos.find((updated) => updated.uuid === currentTodo.uuid);
        if (updatedTodo) {
          currentTodo = updatedTodo;
        }
        return currentTodo;
      });
    },

    deleteCompletedTodos(state) {
      state.todos = state.todos.filter((todo) => todo.completed === false);
    },

    changeFilter(state, action: ChangeFilterAction) {
      state.currentFilter = action.payload;
    },
  },
});

export const todosActions = TodosSlice.actions;
export default TodosSlice.reducer;
