import { createSlice } from "@reduxjs/toolkit";
import { IRateState } from "./types";
import { fetchRates } from "./thunk";

const initialState: IRateState = [];

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRates.fulfilled, (_, action) => {
      return action.payload;
    });
  }
});

export const rateSliceActions = rateSlice.actions;
export const rateReducer = rateSlice.reducer;
