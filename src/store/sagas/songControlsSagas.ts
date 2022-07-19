import { all, put, PutEffect, select, SelectEffect, takeLatest } from "redux-saga/effects";
import { changeCurrentTime, changePlaying } from "../reducers/playerControlReducer";
import { RootState } from "../reducers/rootReducer";
import { changeCurrentSong, sortSongs } from "../reducers/songControlReducer";
import { changeSortAsc } from "../reducers/sortControlReducer";
import { ChangeCurrentSongAction } from "../types/SongControlTypes";
import { ChangeSortAction } from "../types/SortControlTypes";

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
