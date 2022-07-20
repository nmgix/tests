import { createSlice } from "@reduxjs/toolkit";
import { ChangeSortAction, SortControlState } from "../types/SortControlTypes";

const initialState: SortControlState = {
  sortAsc: null,
};

const sortControlSlice = createSlice({
  name: "sortControls",
  initialState,
  reducers: {
    changeSortAsc(state, action: ChangeSortAction) {
      if (action.payload.sortAsc !== undefined) {
        return { ...state, sortAsc: action.payload.sortAsc };
      } else {
        switch (state.sortAsc) {
          case true: {
            return { ...state, sortAsc: false };
          }
          case false: {
            return { ...state, sortAsc: null };
          }
          case null: {
            return { ...state, sortAsc: true };
          }
        }
      }
    },
  },
});

export const { changeSortAsc } = sortControlSlice.actions;

export default sortControlSlice.reducer;
