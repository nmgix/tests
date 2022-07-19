import {
  all,
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect,
  takeLatest,
} from "redux-saga/effects";
import { changeCurrentTime, changePlaying } from "../reducers/playerControlReducer";
import { RootState } from "../reducers/rootReducer";
import { setCurrentSong, changeCurrentSong, sortSongs, shuffleSongs } from "../reducers/songControlReducer";
import { changeSortAsc } from "../reducers/sortControlReducer";
import { ChangeCurrentSongAction } from "../types/SongControlTypes";
import { ChangeSortAction } from "../types/SortControlTypes";

export function* changeTrack(
  action: ChangeCurrentSongAction
): Generator<PutEffect | SelectEffect, void, ChangeCurrentSongAction> {
  if (action.payload.songId !== undefined) {
    yield put(changeCurrentSong({ songId: action.payload.songId }));
    yield put(changeCurrentTime({ currentTime: 0 }));
    yield put(changePlaying({ play: true }));
  } else {
    yield put(changePlaying({}));
  }
}

export function* setFirstSong(): Generator<CallEffect | SelectEffect, void> {
  const { songControls } = (yield select((state: RootState) => state)) as unknown as RootState;
  yield call(changeTrack, { payload: { songId: songControls.songs[0].id }, type: changeCurrentSong.type });
}

export function* changeSort(): Generator<PutEffect | SelectEffect | CallEffect, void> {
  const { sortControls } = (yield select((state: RootState) => state)) as unknown as RootState;
  yield put(sortSongs({ sortAsc: sortControls.sortAsc }));
  yield call(setFirstSong);
}

export function* playerControlSaga() {
  yield all([
    takeLatest(setCurrentSong.type, changeTrack),
    takeLatest(changeSortAsc.type, changeSort),
    takeLatest(shuffleSongs.type, setFirstSong),
  ]);
}

export default null;
