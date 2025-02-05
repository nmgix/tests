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
    changeDiscount: (store, action: PayloadAction<{ discount?: boolean; lastChance?: boolean }>) => {
      return {
        discountActive: action.payload.discount ?? store.discountActive,
        lastChanceActive: action.payload.lastChance ?? store.lastChanceActive
      };
    }
  }
});

export const discountSliceActions = discountSlice.actions;
export const discountReducer = discountSlice.reducer;
