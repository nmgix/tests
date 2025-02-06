import { combineReducers } from "redux";
import playerControlsReducer from "./playerControlReducer";
import songControlReducer from "./songControlReducer";
import sortControlReducer from "./sortControlReducer";

export const rootReducer = combineReducers({
  playerControls: playerControlsReducer,
  sortControls: sortControlReducer,
  songControls: songControlReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
