// import { PayloadAction } from "@reduxjs/toolkit";
// import { put, PutEffect, all, takeLatest } from "redux-saga/effects";
// import { changeCurrentTime, changePlaying, changeVolume } from "../reducers/controlsReducer";
// import { ControlsTypes } from "../types/ControlTypes";

// function* controllerPlay(
//   action: PayloadAction<ControllerPlayAction>
// ): Generator<PutEffect<PayloadAction<ControllerPlayAction>>, void, ControllerPlayAction> {
//   yield put(changePlaying({ playerActive: action.payload.playerActive }));
// }

// function* controllerVolume(
//   action: PayloadAction<VolumeAction>
// ): Generator<PutEffect<PayloadAction<VolumeAction>>, void, VolumeAction> {
//   yield put(changeVolume({ volume: action.payload.volume }));
// }

// function* controllerCurrentTime(
//   action: PayloadAction<CurrentTimeAction>
// ): Generator<PutEffect<PayloadAction<CurrentTimeAction>>, void, CurrentTimeAction> {
//   yield put(changeCurrentTime({ currentTime: action.payload.currentTime }));
// }

// export function* playerControlSaga() {
//   yield all([
//     takeLatest(changePlaying.type, controllerPlay),
//     takeLatest(changeVolume.type, controllerVolume),
//     takeLatest(changeCurrentTime.type, controllerCurrentTime),
//   ]);
// }

export default null;
