import { AuthActions, AuthTypes } from "../actions/authActions";
import { AuthState } from "../types/AuthTypes";

const initialState: AuthState = {
  state: {
    id: null,
  },
};

export const AuthReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS: {
      return { ...state, state: { ...state.state, id: action.payload! }, error: null };
    }
    case AuthTypes.AUTH_ERROR: {
      return {
        ...state,
        state: {
          id: null,
        },
        error: action.payload,
      };
    }
    case AuthTypes.AUTH_RESET: {
      return {
        ...state,
        state: {
          id: null,
        },
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
