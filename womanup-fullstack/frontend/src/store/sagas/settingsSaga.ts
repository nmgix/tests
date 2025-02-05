import { all, put, takeLatest } from "redux-saga/effects";
import { FetchFileAction, LoginUserAction } from "../types/settingsState";
import { changeAuth, fetchExistingFile, initLogin, initRegistration } from "../reducers/settingsReducer";
import { authErrorHandler } from "../helpers/authErrorHandler";
import { fetchFile } from "../../helpers/functions/todos";
import { AxiosResponse } from "axios";
import { loginUser } from "../../helpers/functions/auth";

function* fetchFileSaga(action: FetchFileAction): Generator<any, any, any> {
  yield authErrorHandler(fetchFile, action.payload.attachment);
}

function* loginUserSaga(action: LoginUserAction): Generator<any, any, AxiosResponse> {
  const loginResponse = yield authErrorHandler(loginUser, action.payload);
  if (loginResponse.status === 200) {
    yield put(changeAuth(true));
  }
}

function* registerUserSaga(action: LoginUserAction): Generator<any, any, AxiosResponse> {
  const registerResponse = yield authErrorHandler(registerUserSaga, action.payload);
  if (registerResponse.status === 200) {
    yield put(changeAuth(true));
  }
}

export function* settingsSaga() {
  yield all([
    takeLatest(fetchExistingFile.type, fetchFileSaga),
    takeLatest(initLogin.type, loginUserSaga),
    takeLatest(initRegistration.type, registerUserSaga),
  ]);
}
