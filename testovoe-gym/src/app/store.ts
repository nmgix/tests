import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { discountReducer, discountSliceActions } from "src/entities/discount";
import { rateReducer, rateSliceActions } from "src/entities/rate/model/slice";
import { fetchRates } from "src/entities/rate/model/thunk";

export const rootReducer = combineReducers({
  discount: discountReducer,
  rate: rateReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const ActionCreators = {
  ...discountSliceActions,
  ...rateSliceActions,

  fetchRates
};

export const store = configureStore({ reducer: rootReducer });
export type StoreType = typeof store;
