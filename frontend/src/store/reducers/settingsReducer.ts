import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeAuthAction,
  // ChangeErrorStateAction,
  FetchFileAction,
  LoginUserAction,
  RegisterUserAction,
  SettingsState,
} from "../types/settingsState";

const initialState: SettingsState = {
  error: false,
  authed: false,
};

export const settingsControllerSlice = createSlice({
  name: "settingsControl",
  initialState,
  reducers: {
    fetchExistingFile(state, action: FetchFileAction) {},
    initLogin(state, action: LoginUserAction) {},
    initRegistration(state, action: RegisterUserAction) {},
    changeAuth(state, action: ChangeAuthAction) {
      return {
        ...state,
        authed: action.payload,
      };
    },
  },
});

export const { fetchExistingFile, initLogin, initRegistration, changeAuth } = settingsControllerSlice.actions;

export default settingsControllerSlice.reducer;
