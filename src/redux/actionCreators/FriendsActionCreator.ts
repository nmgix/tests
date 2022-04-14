import axios from "axios";
import { Dispatch } from "redux";
import { FriendsActions } from "../actions/userActions";
import { Friend, FriendsTypes } from "../types/FriendsTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/friends";

// @ https://github.com/microsoft/TypeScript/issues/26781

// было желание сделать getFriends универсальным чтобы не использовать editFriend,
// а просто вызывать getFriend(id)
export const getFriends = () => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const res = await axios.get(rootEndpoint, config);
    dispatch({
      type: FriendsTypes.GET_FRIENDS,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const clearFriends = () => async (dispatch: Dispatch<FriendsActions>) => {
  dispatch({
    type: FriendsTypes.CLEAR_FRIENDS,
  });
};

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
