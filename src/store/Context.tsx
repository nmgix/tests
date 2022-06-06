import React, { createContext, useEffect, useReducer } from "react";
import { CartItem } from "../components/Cart/Cart";
import { loadState, saveState } from "./ActionCreators";
import Reducer from "./Reducer";

export type DefaultState = {
  items: CartItem[];
  balance: number;
  error: string | null;
};

const initialState: DefaultState = {
  items: [],
  balance: 10000,
  error: null,
};

export const Context = createContext<{ state: DefaultState; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    loadState(dispatch);
  }, []);
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </Context.Provider>
  );
};
