import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/rootReducer";
import { popupControllerSlice } from "../reducers/popupReducer";
import { todoControllerSlice } from "../reducers/todoReducer";
import { settingsControllerSlice } from "../reducers/settingsReducer";

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

const ActionCreators = {
  ...popupControllerSlice.actions,
  ...todoControllerSlice.actions,
  ...settingsControllerSlice.actions,
};

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
