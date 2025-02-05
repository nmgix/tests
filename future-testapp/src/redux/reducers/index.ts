import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer";
import { searchReducer } from "./searchReducer";

export const rootReducer = combineReducers({ books: booksReducer, search: searchReducer });
export type RootState = ReturnType<typeof rootReducer>;
