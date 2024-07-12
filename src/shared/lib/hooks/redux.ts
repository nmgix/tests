import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActionCreators, RootState, store } from "src/app/store";

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
