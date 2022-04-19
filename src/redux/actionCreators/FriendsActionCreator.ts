import axios from "axios";
import { Dispatch } from "redux";
import { FriendsActions } from "../actions/userActions";
import { Friend, FriendsTypes } from "../types/FriendsTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/api/friends";

export const addFriend = (friend: Friend) => async (dispatch: Dispatch<FriendsActions>) => {
  const body = JSON.stringify(friend);

  try {
    const res = await axios.post(`${rootEndpoint}/add`, body, config);
    dispatch({
      type: FriendsTypes.ADD_FRIEND,
      payload: res.data,
      // почему res.data, а не просто friend в payload,
      // на сервере объекту друга может добавляться что-то, например ссылка на его аватарку или ещё что-то
    });
  } catch {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const removeFriend = (id: number) => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const res = await axios.delete(`${rootEndpoint}/remove/${id}`, config);
    dispatch({
      type: FriendsTypes.ADD_FRIEND,
      payload: res.data,
      // почему res.data, а не просто friend в payload,
      // на сервере объекту друга может добавляться что-то, например ссылка на его аватарку или ещё что-то
    });
  } catch {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const getFriendData = (id: string) => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const body = JSON.stringify({ id: id });
    const res = await axios.post("/api/user", body, config);

    dispatch({
      type: FriendsTypes.FETCH_FRIEND_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};
