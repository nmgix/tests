import { all, call, CallEffect, delay, put, PutEffect, select, SelectEffect, takeLatest } from "redux-saga/effects";
import { changePlaying, setWaveformLoadState } from "../reducers/playerControlReducer";
import { RootState } from "../reducers/rootReducer";
import { setCurrentSong, changeCurrentSong, sortSongs, shuffleSongs } from "../reducers/songControlReducer";
import { changeSortAsc } from "../reducers/sortControlReducer";
import { ChangeCurrentSongAction } from "../types/SongControlTypes";

/**
 * Устанавливает необходимую по songID песню как текущую
 */
export function* changeTrack(
  action: ChangeCurrentSongAction
): Generator<PutEffect | SelectEffect | CallEffect, void, ChangeCurrentSongAction> {
  if (action.payload.songId !== undefined) {
    yield put(changeCurrentSong({ songId: action.payload.songId }));
    yield put(changePlaying({ play: true }));
  } else {
    yield put(changePlaying({}));
  }
}

/**
 * Сага для установки задержки в delayMS
 */
export function* setDelayedWaveformState(delayMS: number): Generator<PutEffect | CallEffect | void, void> {
  yield put(setWaveformLoadState({ ready: false }));
  yield delay(delayMS);
  yield put(setWaveformLoadState({ ready: true }));
}

/**
 * Устанавливает нулевую по индексу песню для проигрывания в плеере
 */
export function* setFirstSong(): Generator<CallEffect | SelectEffect | PutEffect, void> {
  const { songControls } = (yield select((state: RootState) => state)) as unknown as RootState;
  yield call(changeTrack, { payload: { songId: songControls.songs[0].id }, type: "" });
}

/**
 * Восставноить sort при shuffle
 */
export function* resetSort(): Generator<PutEffect, void> {
  yield put(changeSortAsc({ sortAsc: null }));
}

/**
 * Сортирует пенси при изменении стейта sortAsc, устанавливает первую песню
 */
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
    takeLatest(shuffleSongs.type, resetSort),
    // takeLatest(shuffleSongs.type, yield put(sortSongs({ sortAsc: sortControls.sortAsc })))

    takeLatest(setCurrentSong.type, setDelayedWaveformState, 3000),
    takeLatest(changeSortAsc.type, setDelayedWaveformState, 3000),
    takeLatest(shuffleSongs.type, setDelayedWaveformState, 3000),
  ]);
}

export default null;
