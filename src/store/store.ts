import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { rootReducer } from "./reducers/rootReducer";
import { rootSaga } from "./sagas";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware({ onError: (e) => console.log(e) });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sagaMiddleware).concat(logger),
});

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export default store;
