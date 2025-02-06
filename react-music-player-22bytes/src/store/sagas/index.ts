import { all, fork, spawn } from "redux-saga/effects";
import { playerControlSaga } from "./songControlsSagas";

export function* rootSaga() {
  yield spawn(playerControlSaga);
}
