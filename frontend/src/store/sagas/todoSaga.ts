import { AddTodosSagaAction, CreateOrUpdateTodoAction, FetchTodoSagaAction } from "../types/todoState";
import { all, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { getTodos, updateTodo, createTodo, getTodo } from "../../helpers/functions/todos";
import {
  addToTodolist,
  fetchCurrentTodo,
  initAddToTodoList,
  initCreateTodo,
  initFetchTodo,
  initUpdateTodo,
} from "../reducers/todoReducer";
import { authErrorHandler } from "../helpers/authErrorHandler";
import { AxiosResponse } from "axios";
import { initAddNewPopup } from "../reducers/popupReducer";

function* getTodosSaga(action: AddTodosSagaAction): Generator<any, void, SagaReturnType<typeof getTodos>> {
  const todosResponse = yield authErrorHandler(getTodos, action.payload.from, action.payload.to);
  if (todosResponse) {
    yield put(addToTodolist(todosResponse));
  }
}

function* updateTodoSaga(action: CreateOrUpdateTodoAction): Generator<any, any, AxiosResponse> {
  const updateResponse = yield authErrorHandler(updateTodo, action.payload);
  if (updateResponse.status === 200) {
    yield put(initAddNewPopup({ message: "Задание обновлено" }));
  } else {
    yield put(initAddNewPopup({ message: "Задание не обновлено" }));
  }
}

function* createTodoSaga(action: CreateOrUpdateTodoAction): Generator<any, any, AxiosResponse> {
  const createResponse = yield authErrorHandler(createTodo, action.payload);
  if (createResponse.status === 200) {
    yield put(initAddNewPopup({ message: "Задание создано" }));
  } else {
    yield put(initAddNewPopup({ message: "Задание не создано" }));
  }
}

function* fetchTodoSaga(action: FetchTodoSagaAction): Generator<any, any, AxiosResponse> {
  const fetchTodoResponse = yield authErrorHandler(getTodo, action.payload);
  yield put(fetchCurrentTodo(fetchTodoResponse.data));
}

export function* todoSaga() {
  yield all([
    takeLatest(initAddToTodoList.type, getTodosSaga),
    takeLatest(initUpdateTodo.type, updateTodoSaga),
    takeLatest(initCreateTodo.type, createTodoSaga),
    takeLatest(initFetchTodo.type, fetchTodoSaga),
  ]);
}
