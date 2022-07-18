// import { PayloadAction } from "@reduxjs/toolkit";
// import { put, PutEffect, all, takeLatest } from "redux-saga/effects";
// import { changeCurrentTime, changePlaying, changeVolume } from "../reducers/controlsReducer";
// import { ControlsTypes } from "../types/ControlTypes";

import { all, put, PutEffect, select, SelectEffect, takeLatest } from "redux-saga/effects";
import { changeCurrentTime, changePlaying } from "../reducers/playerControlReducer";
import { rootReducer, RootState } from "../reducers/rootReducer";
import { changeCurrentSong, sortSongs } from "../reducers/songControlReducer";
import { changeSortAsc } from "../reducers/sortControlReducer";
import { ChangeCurrentSongAction, SongState } from "../types/SongControlTypes";
import { ChangeSortAction } from "../types/SortControlTypes";
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

// export const songState = (store: SongState) => store;

export function* changeTrack(
  action: ChangeCurrentSongAction
): Generator<PutEffect | SelectEffect, void, ChangeCurrentSongAction> {
  if (action.payload.songId !== undefined) {
    yield put(changePlaying({ play: true }));
    yield put(changeCurrentTime({ currentTime: 0 }));
  } else {
    yield put(changePlaying({}));
  }
}

export function* changeSort(): Generator<PutEffect | SelectEffect, void, ChangeSortAction> {
  // на момент выполнения саги из-за того что редьюсер синхронный, стейт УЖЕ обновлен
  const { sortControls } = (yield select((state: RootState) => state)) as unknown as RootState;

  yield put(sortSongs({ sortAsc: sortControls.sortAsc }));
}

export function* playerControlSaga() {
  yield all([takeLatest(changeCurrentSong.type, changeTrack), takeLatest(changeSortAsc.type, changeSort)]);
}

export default null;
