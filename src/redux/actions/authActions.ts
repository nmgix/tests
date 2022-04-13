import { Action } from ".";
import { AuthUserData } from "../types/AuthTypes";

export enum AuthTypes {
  //   AUTH_REQUEST = "AUTH_REQUEST",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_ERROR = "AUTH_ERROR",
  AUTH_RESET = "AUTH_RESET",
}

// type AuthRequest = Action<typeof AuthTypes.AUTH_REQUEST, void>;
type AuthSuccess = Action<typeof AuthTypes.AUTH_SUCCESS, AuthUserData>;
type AuthError = Action<typeof AuthTypes.AUTH_ERROR, string>;
type AuthReset = Action<typeof AuthTypes.AUTH_RESET, void>;

export type AuthActions = /*AuthRequest*/ AuthSuccess | AuthError | AuthReset;
