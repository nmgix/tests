import { AxiosError } from "axios";
import { call, put } from "redux-saga/effects";
import { initAddNewPopup } from "../reducers/popupReducer";
import { changeAuth } from "../reducers/settingsReducer";

export function* authErrorHandler(fn: any, ...args: any[]): Generator {
  try {
    yield put(changeAuth(true));
    return yield call(fn, ...args);
  } catch (e) {
    const { response } = e as AxiosError;
    if (yield response?.status === 400) {
      yield put(initAddNewPopup({ message: "Пользователь не авторизован" }));
      yield put(changeAuth(false));
    }
  }
}
