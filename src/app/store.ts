import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { discountReducer, discountSliceActions } from "src/entities/discount";

export const rootReducer = combineReducers({
  discount: discountReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const ActionCreators = {
  ...discountSliceActions
};

export const store = configureStore({ reducer: rootReducer });
export type StoreType = typeof store;
