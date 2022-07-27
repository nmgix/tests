import { combineReducers } from "@reduxjs/toolkit";
import errorsSlice from "./errorsSlice";
import todosSlice from "./todosSlice";

export const rootReducer = combineReducers({
  todos: todosSlice,
  errors: errorsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
