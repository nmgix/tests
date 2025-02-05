import { spawn } from "redux-saga/effects";
import { notificationSaga } from "./notificationSagas";
import { todosSaga } from "./todoSagas";

export function* rootSaga() {
  yield spawn(todosSaga);
  yield spawn(notificationSaga);
}
