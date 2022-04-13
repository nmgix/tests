import axios from "axios";
import { Dispatch } from "redux";
import { UserActions } from "../actions/userActions";
import { UserTypes } from "../types/UserTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/user";

export const getUser = (id: string) => async (dispatch: Dispatch<UserActions>) => {
  try {
    const res = await axios.get(`${rootEndpoint}/${id}`, config);
    dispatch({
      type: UserTypes.USER_SUCCESS,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: UserTypes.USER_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export function clearUser(): UserActions {
  return {
    type: UserTypes.USER_CLEAR,
  };
}
