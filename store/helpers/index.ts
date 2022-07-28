import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../reducers";
import { errorsAction } from "../reducers/errorsSlice";
import { todosActions } from "../reducers/todosSlice";

const ActionCreators = {
  ...errorsAction,
  ...todosActions,
};

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
