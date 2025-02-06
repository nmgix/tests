import { combineReducers } from "@reduxjs/toolkit";
import canvasReducer from "./canvas.reducer";

export const rootReducer = combineReducers({
  canvas: canvasReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
