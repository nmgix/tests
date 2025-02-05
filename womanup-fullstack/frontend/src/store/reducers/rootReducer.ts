import { combineReducers } from "redux";
import popupReducer from "./popupReducer";
import settingsReducer from "./settingsReducer";
import todoReducer from "./todoReducer";

export const rootReducer = combineReducers({
  todoControl: todoReducer,
  popupControl: popupReducer,
  settingsControl: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
