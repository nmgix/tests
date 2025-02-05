import axios from "axios";
import { AuthActions, AuthTypes } from "../actions/authActions";
import { Dispatch } from "redux";
import { sleep } from "../helpers";
import { FriendsTypes } from "../types/FriendsTypes";
import { UserTypes } from "../types/UserTypes";
import { UserActions } from "../actions/userActions";
import { useAction } from "../helpers/useAction";
import { AppDispatch } from "../store";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { getUser } from "./UserActionCreator";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/api/auth";

// @ https://stackoverflow.com/questions/52977666/correct-typescript-type-for-thunk-dispatch

export const authUser =
  (login: string, password: string): ThunkAction<Promise<void>, {}, RootState, UserActions> =>
  async (dispatch) => {
    const body = JSON.stringify({ login, password });

    try {
      const res = await axios.post(rootEndpoint, body, config);
      if (res.status === 200) {
        dispatch(getUser());
      }
    } catch (e) {
      // await sleep(2000);
      dispatch({
        type: UserTypes.USER_ERROR,
        payload: "Возникла ошибка при обработке запроса",
      });
    }
  };

export const logoutUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    await axios.post(`${rootEndpoint}/logout`, {}, config);
    dispatch({
      type: UserTypes.USER_CLEAR,
    });
  } catch {
    dispatch({
      type: UserTypes.USER_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};
