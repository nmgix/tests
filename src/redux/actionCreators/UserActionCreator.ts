import axios from "axios";
import { Dispatch } from "redux";
import { UserActions } from "../actions/userActions";
import { useTypedSelector } from "../helpers/useTypedSelector";
import { UserTypes } from "../types/UserTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/api/user";

//пока что функция не универсальной будет
export const getUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    const res = await axios.get(rootEndpoint, config);
    console.log(res);
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

export const clearUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    //тут будет удаление куки

    return {
      type: UserTypes.USER_CLEAR,
    };
  } catch (error) {
    dispatch({
      type: UserTypes.USER_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};
