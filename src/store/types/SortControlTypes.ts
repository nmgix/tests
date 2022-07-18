import { PayloadAction } from "@reduxjs/toolkit";

export type SortControlState = {
  sortAsc: boolean | null;
};

export type ChangeSortAction = PayloadAction<{ sortAsc: boolean | null }>;
