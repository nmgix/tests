import { combineReducers } from "redux";
import { AuthReducer } from "./authReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({ auth: AuthReducer, user: userReducer });

export type RootState = ReturnType<typeof rootReducer>;
