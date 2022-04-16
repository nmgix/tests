import axios from "axios";
import { AuthActions, AuthTypes } from "../actions/authActions";
import { Dispatch } from "redux";
import { sleep } from "../helpers";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/api/auth";

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common[`x-auth-token`];
  }
};

export const authUser = (login: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
  const body = JSON.stringify({ login, password });
  try {
    const res = await axios.post(rootEndpoint, body, config);

    // хранение в стейте пока что временная мера, на куки сил пока нет
    const userId = res.data;
    setAuthToken(userId);

    dispatch({
      type: AuthTypes.AUTH_SUCCESS,
      payload: userId,
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
