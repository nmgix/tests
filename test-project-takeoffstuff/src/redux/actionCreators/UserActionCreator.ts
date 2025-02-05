import axios from "axios";
import { Dispatch } from "redux";
import { AuthActions, AuthTypes } from "../actions/authActions";
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
export const getUser = (noDispatch?: boolean) => async (dispatch: Dispatch<UserActions | AuthActions>) => {
  try {
    dispatch({
      type: UserTypes.USER_LOADING,
    });
    const res = await axios.post(rootEndpoint, {}, config);
    dispatch({
      type: UserTypes.USER_SUCCESS,
      payload: res.data,
    });
  } catch {
    if (!noDispatch) {
      dispatch({
        type: UserTypes.USER_ERROR,
        payload: "Возникла ошибка при обработке запроса",
      });
    }
  }
};
