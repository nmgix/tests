import { DefaultState } from ".";
import { AuthActions, AuthTypes } from "../actions/authActions";

export type AuthUserData = {
  id: string | null;
  nick: string | null;
  imgUrl: string | null;
  mail: string | null;
};

interface AuthState extends DefaultState {
  state: AuthUserData;
}

const initialState: AuthState = {
  state: {
    id: null,
    nick: null,
    imgUrl: null,
    mail: null,
  },
};

export const AuthReducer = (authState: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS: {
      return { ...authState, state: action.payload, error: null };
    }
    case AuthTypes.AUTH_ERROR: {
      return { ...authState, state: null, error: action.payload };
    }
    case AuthTypes.AUTH_RESET: {
      return { ...authState, state: null, error: null };
    }
    default: {
      return authState;
    }
  }
};
