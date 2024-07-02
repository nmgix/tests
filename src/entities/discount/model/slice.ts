import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiscountState } from "./types";

const initialState: IDiscountState = {
  discountActive: true,
  lastChanceActive: false
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    switchDiscountState: store => {
      return { ...store, discountActive: !store.discountActive };
    },
    changeLastChanceState: (store, action: PayloadAction<{ active?: boolean }>) => {
      return {
        ...store,
        lastChanceActive: action.payload.active ?? store.lastChanceActive
      };
    }
  }
});

export const discountSliceActions = discountSlice.actions;
export const discountReducer = discountSlice.reducer;
