import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;
export const ActionCreators = {};

export const store = configureStore({ reducer: rootReducer });
export type StoreType = typeof store;
