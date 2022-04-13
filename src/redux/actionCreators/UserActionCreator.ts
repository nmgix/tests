import axios from "axios";
import { UserActions } from "../actions/userActions";
import { UserTypes } from "../types/UserTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/user";

export async function getUser(id: string): Promise<UserActions> {
  try {
    const res = await axios.get(`${rootEndpoint}/${id}`, config);
    return {
      type: UserTypes.USER_SUCCESS,
      payload: res.data,
    };
  } catch {
    return {
      type: UserTypes.USER_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    };
  }
}

export function clearUser(): UserActions {
  return {
    type: UserTypes.USER_CLEAR,
  };
}
