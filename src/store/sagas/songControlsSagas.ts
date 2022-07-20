import { all, call, CallEffect, delay, put, PutEffect, select, SelectEffect, takeLatest } from "redux-saga/effects";
import { changeCurrentTime, changePlaying, setWaveformLoadState } from "../reducers/playerControlReducer";
import { RootState } from "../reducers/rootReducer";
import { setCurrentSong, changeCurrentSong, sortSongs, shuffleSongs } from "../reducers/songControlReducer";
import { changeSortAsc } from "../reducers/sortControlReducer";
import { WaveformAction } from "../types/PlayerControlTypes";
import { ChangeCurrentSongAction } from "../types/SongControlTypes";

/**
 * Устанавливает необходимую по songID песню как текущую
 */
export function* changeTrack(
  action: ChangeCurrentSongAction
): Generator<PutEffect | SelectEffect | CallEffect, void, ChangeCurrentSongAction> {
  if (action.payload.songId !== undefined) {
    yield put(changeCurrentSong({ songId: action.payload.songId }));
    yield put(changeCurrentTime({ currentTime: 0 }));
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

    // не нашёл как сгруппировать все action в один и поставить им одну сагу на все три, т.е takeLatest(setCurrentSong.type | changeSortAsc.type и пр., setDelayedWaveformState...)
    // увы это вешает по лишнему обработчику на каждое движение, а не не все сразу
    takeLatest(setCurrentSong.type, setDelayedWaveformState, 3000),
    takeLatest(changeSortAsc.type, setDelayedWaveformState, 3000),
    takeLatest(shuffleSongs.type, setDelayedWaveformState, 3000),
  ]);
}

export default null;
