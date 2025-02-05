import { PutEffect, all, takeEvery, select, SelectEffect, put } from "redux-saga/effects";
import { RootState } from "../reducers";
import { createNotificationTemplate, notificationsAction } from "../reducers/notificationsSlice";
import { todosActions } from "../reducers/todosSlice";

function* updateLocalStorage(): Generator<SelectEffect | void, void, void> {
  const { todos } = (yield select((state: RootState) => state)) as unknown as RootState;
  yield localStorage.setItem("todos", JSON.stringify(todos === null ? [] : todos));
}

function* notificationOnTodoCreate(): Generator<PutEffect, void, void> {
  yield put(notificationsAction.createNotification(createNotificationTemplate("Задание создано", "success", 5000)));
}

function* notificationOnTodoDelete(): Generator<PutEffect, void, void> {
  yield put(notificationsAction.createNotification(createNotificationTemplate("Задания удалены", "informative", 5000)));
}

export function* todosSaga() {
  yield all([
    takeEvery(
      [todosActions.createTodo, todosActions.setTodos, todosActions.deleteTodos, todosActions.updateTodo],
      updateLocalStorage
    ),
    takeEvery(todosActions.createTodo, notificationOnTodoCreate),
    takeEvery(todosActions.deleteTodos, notificationOnTodoDelete),
  ]);
}
