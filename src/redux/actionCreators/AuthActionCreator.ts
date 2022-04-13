import axios from "axios";
import { AuthActions, AuthTypes } from "../actions/authActions";
import { Dispatch } from "redux";
import { sleep } from "../helpers";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/auth";

export const authUser = (login: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
  const body = JSON.stringify({ login, password });
  try {
    const res = await axios.post(rootEndpoint, body, config);
    dispatch({
      type: AuthTypes.AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    await sleep(2000);
    dispatch({
      type: AuthTypes.AUTH_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const logoutUser = () => async (dispatch: Dispatch<AuthActions>) => {
  try {
    await axios.post(`${rootEndpoint}/logout`, config);
    dispatch({
      type: AuthTypes.AUTH_RESET,
    });
  } catch {
    dispatch({
      type: AuthTypes.AUTH_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};
