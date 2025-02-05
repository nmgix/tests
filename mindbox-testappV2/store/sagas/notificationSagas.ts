import { CallEffect, delay, put, PutEffect, all, takeLatest, takeEvery } from "redux-saga/effects";
import { notificationsAction } from "../reducers/notificationsSlice";
import { CreateNotifocationAction, DeleteNotifocationAction } from "../types/notificationsActions";

function* deleteNotification(
  action: CreateNotifocationAction
): Generator<PutEffect | CallEffect, void, DeleteNotifocationAction> {
  yield delay(action.payload.timeout);
  yield put(notificationsAction.deleteNotification({ uuid: action.payload.uuid }));
}

export function* notificationSaga() {
  yield all([takeEvery(notificationsAction.createNotification, deleteNotification)]);
}
