import { combineReducers } from "@reduxjs/toolkit";
import notificationsSlice from "./notificationsSlice";
import todosSlice from "./todosSlice";

export const rootReducer = combineReducers({
  todos: todosSlice,
  notifications: notificationsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
