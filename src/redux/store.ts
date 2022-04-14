import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { rootReducer, RootState } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnchancers = composeWithDevTools({
  trace: true,
});

export const store = createStore(rootReducer, undefined, composeEnchancers(applyMiddleware(thunkMiddleware)));

// @ https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppDispatch = typeof store.dispatch;
