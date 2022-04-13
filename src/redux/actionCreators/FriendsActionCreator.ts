import axios from "axios";
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
// а просто вызывать getFriends(id)
export async function getFriends(): Promise<FriendsActions> {
  try {
    const res = await axios.get(`/friends`, config);
    return {
      type: FriendsTypes.GET_FRIENDS,
      payload: res.data,
    };
  } catch {
    return {
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    };
  }
}

export function clearFriends(): FriendsActions {
  return {
    type: FriendsTypes.CLEAR_FRIENDS,
  };
}

export async function addFriend(friend: Friend): Promise<FriendsActions> {
  const body = JSON.stringify(friend);

  try {
    const res = await axios.post(`${rootEndpoint}/add`, body, config);
    return {
      type: FriendsTypes.ADD_FRIEND,
      payload: res.data,
      // почему res.data, а не просто friend в payload,
      // на сервере объекту друга может добавляться что-то, например ссылка на его аватарку или ещё что-то
    };
  } catch {
    return {
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    };
  }
}

export async function removeFriend(id: number): Promise<FriendsActions> {
  try {
    const res = await axios.delete(`${rootEndpoint}/remove/${id}`, config);
    return {
      type: FriendsTypes.ADD_FRIEND,
      payload: res.data,
      // почему res.data, а не просто friend в payload,
      // на сервере объекту друга может добавляться что-то, например ссылка на его аватарку или ещё что-то
    };
  } catch {
    return {
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    };
  }
}
