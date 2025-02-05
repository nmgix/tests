import { PayloadAction } from "@reduxjs/toolkit";
import { LoginData, RegistrationData } from "../../types/auth";

export type SettingsState = {
  error: boolean;
  authed: boolean;
};

// export type ChangeErrorStateAction = PayloadAction<boolean>;
export type FetchFileAction = PayloadAction<{ attachment: string }>;

export type RegisterUserAction = PayloadAction<RegistrationData>;
export type LoginUserAction = PayloadAction<LoginData>;
export type ChangeAuthAction = PayloadAction<boolean>;
