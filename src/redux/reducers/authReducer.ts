import { AuthActions, AuthTypes } from "../actions/authActions";
import { AuthState } from "../types/AuthTypes";

const initialState: AuthState = {
  state: {
    id: null,
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
