import { todoSaga } from "./todoSaga";
import { spawn } from "redux-saga/effects";
import { popupSaga } from "./popupSaga";
import { settingsSaga } from "./settingsSaga";

export function* rootSaga() {
  yield spawn(todoSaga);
  yield spawn(popupSaga);
  yield spawn(settingsSaga);
}
