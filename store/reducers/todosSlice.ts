import { TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";
import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeFilterAction,
  CreateTodoAction,
  DeleteCompletedAction,
  FilterOptions,
  FilterTodoAction,
  GetTodosAction,
  SetTodosAction,
  UpdateTodoAction,
} from "../types/todoActions";
import { v4 as uuid } from "uuid";

type TodosState = {
  todos: TodoElementProps[];
  filteredTodos: TodoElementProps[];
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
  filteredTodos: [],
  currentFilter: null,
};

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action: SetTodosAction) {
      state.todos = action.payload.todos;
      state.filteredTodos = action.payload.todos;
    }, // будет вызов мидлвара для обновления filteredTodos, если toRealTodos == true, то вызывать фильтр, иначе return;
    getLocalStorageTodos(state, action: GetTodosAction) {
      let todos = localStorage.getItem("todos");
      state.todos = todos ? JSON.parse(todos) : [];
    }, // ещё мидлвар на обновление данных при любом экшене с этим редьюсером в redux-saga
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

      state.filteredTodos = updatedTodos; //потом удалится либо setTodos будет без toRealTodos
      state.todos = state.todos.map((currentTodo) => {
        let updatedTodo = updatedTodos.find((updated) => updated.uuid === currentTodo.uuid);
        if (updatedTodo) {
          currentTodo = updatedTodo;
        }
        return currentTodo;
      });
      // вообще будет вызов мидлвара чтобы под фильтр текущие todos подогнать, но пока что плевать на фильтры
    },
    // будет мидлвар с вызовом filter (не filterTodos, filter будет принимать currentFilter и через switch case делать вызов filterTodos,
    //  эта же мидла будет нужна для прослушки changeFilter)

    deleteCompletedTodos(state, action: DeleteCompletedAction) {},
    // будет мидлвар который вызывает filterTodos с настройками toRealTodos: true, key: 'completed', value: false, comparer: 'Equal'
    // этим мидлваром будет мидлвар из верхнего описания
    filterTodos(state, action: FilterTodoAction) {
      function filter<T, P extends keyof T>(
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
      if (!action.payload) {
        state.filteredTodos = state.todos;
      } else {
        state[action.payload.toRealTodos ? "todos" : "filteredTodos"] = state.todos.filter((todo) =>
          filter(todo, action.payload!.key, action.payload!.value, action.payload!.comparer)
        );
      }
    },
    changeFilter(state, action: ChangeFilterAction) {
      state.currentFilter = action.payload.filter;
    },
    // handleFilter(state, action: ChangeFilterAction) {
    //   switch(action.payload.filter) {
    //     case null: {
    //       filterTodos(null);
    //     }
    //     case 1: {
    //       filterTodos({ toRealTodos: false, key: "completed", value: false, comparer: "Equal" });
    //     }
    //     case 2: {
    //       filterTodos({ toRealTodos: false, key: "completed", value: false, comparer: "NotEqual" });
    //     }
    //     default: {
    //       filterTodos(null)
    //     }
    //   }
    // }
  },
});

export const todosActions = TodosSlice.actions;
export default TodosSlice.reducer;
