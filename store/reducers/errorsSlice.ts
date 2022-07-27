import { createSlice } from "@reduxjs/toolkit";
import { CreateErrorAction, DeleteErrorAction } from "../types/errorsActions";

export type CustomError = {
  uuid: string;
  content: string;
};

type TodosState = CustomError[];

const initialState: TodosState = [];

const ErrorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    createError(state, action: CreateErrorAction) {
      state.push(action.payload);
    }, //мидлвар на удаление этой туду через какой-то период
    deleteError(state, action: DeleteErrorAction) {
      state = state.filter((error) => error.uuid !== action.payload.uuid);
    },
  },
});

export const errorsAction = ErrorsSlice.actions;
export default ErrorsSlice.reducer;
