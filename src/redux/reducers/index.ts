import { combineReducers } from "redux";
import { AuthReducer } from "./authReducer";
import { FriendsReducer } from "./friendsReducer";

export interface DefaultState {
  state:
    | (string | number | boolean | null)
    | (string[] | number[] | boolean[])
    | { [x: string]: string | number | boolean | null }
    | { [x: string]: string | number | boolean | null }[];
  error?: (string | number | boolean) | (string[] | number[]);
}

export const rootReducer = combineReducers({ auth: AuthReducer, friends: FriendsReducer });
