import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { addNewPopup, deleteExistingPopup, initAddNewPopup } from "../reducers/popupReducer";
import { AddPopupSagaAction, PopupContent } from "../types/popupState";
import { v4 as uuid } from "uuid";

function* createPopupSaga(action: AddPopupSagaAction): Generator<any, any, any> {
  console.log(action);
  const newPopup: PopupContent = {
    uuid: uuid(),
    message: action.payload.message,
  };

  yield put(addNewPopup(newPopup));
  yield call(delayedPopupDeletionSaga, newPopup.uuid);
}

function* delayedPopupDeletionSaga(uuid: string): Generator<any, any, any> {
  yield delay(5000);
  yield put(deleteExistingPopup({ uuid }));
}

export function* popupSaga() {
  yield all([takeLatest(initAddNewPopup.type, createPopupSaga)]);
}
