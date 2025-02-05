import { createAsyncThunk } from "@reduxjs/toolkit";
import { Rate } from "./types";
import { getRates } from "../api/getRates";

export const fetchRates = createAsyncThunk<Rate[]>("rates/fetch", async (_, { fulfillWithValue, rejectWithValue }) => {
  try {
    const rates = await getRates();
    return fulfillWithValue(rates);
  } catch (error) {
    return rejectWithValue(error);
  }
});
