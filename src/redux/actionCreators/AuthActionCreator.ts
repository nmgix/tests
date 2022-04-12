import axios from "axios";
import { AuthActions, AuthTypes } from "../actions/authActions";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// @ https://github.com/microsoft/TypeScript/issues/26781

export async function authUser(login: string, password: string): Promise<AuthActions> {
  const body = JSON.stringify({ login, password });

  try {
    const res = await axios.post(`/auth`, body, config);
    //обычно должны возвращаться токены, поэтому то и пост, но в тз не указано про это, поэтому будет возвращаться сразу  весь мок пользователь
    return {
      type: AuthTypes.AUTH_SUCCESS,
      payload: res.data,
    };
  } catch {
    return {
      type: AuthTypes.AUTH_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    };
  }
}

export async function logoutUser(): Promise<AuthActions> {
  try {
    await axios.post(`/logout`, config);
    return {
      type: AuthTypes.AUTH_RESET,
    };
  } catch {
    return {
      type: AuthTypes.AUTH_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    };
  }
}
