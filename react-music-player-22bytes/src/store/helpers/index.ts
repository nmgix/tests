import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { select, SelectEffect } from "redux-saga/effects";
import { RootState } from "../reducers/rootReducer";
import { AppDispatch } from "../store";

export interface Action {
  type: string;
  payload?: any;
}

// export const useAppDispatch: () => AppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
