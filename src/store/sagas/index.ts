import { all, fork, spawn } from "redux-saga/effects";
import { playerControlSaga } from "./playerControlsSagas";

export function* rootSaga() {
  yield spawn(playerControlSaga);
}
