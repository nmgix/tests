import axios from "axios";
import { Dispatch } from "redux";
import { Param } from "../../components/HomePage/Modal/UserModal";
import { FriendsActions } from "../actions/userActions";
import { Friend, FriendsTypes } from "../types/FriendsTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const rootEndpoint = "/api/user";

// export const addFriend = (friend: Friend) => async (dispatch: Dispatch<FriendsActions>) => {
//   const body = JSON.stringify(friend);

//   try {
//     const res = await axios.post(`${rootEndpoint}/add`, body, config);
//     dispatch({
//       type: FriendsTypes.ADD_FRIEND,
//       payload: res.data,
//       // почему res.data, а не просто friend в payload,
//       // на сервере объекту друга может добавляться что-то, например ссылка на его аватарку или ещё что-то
//     });
//   } catch {
//     dispatch({
//       type: FriendsTypes.FRIENDS_ERROR,
//       payload: "Возникла ошибка при обработке запроса",
//     });
//   }
// };

// export const removeFriend = (id: number) => async (dispatch: Dispatch<FriendsActions>) => {
//   try {
//     const res = await axios.delete(`${rootEndpoint}/remove/${id}`, config);
//     dispatch({
//       type: FriendsTypes.ADD_FRIEND,
//       payload: res.data,
//       // почему res.data, а не просто friend в payload,
//       // на сервере объекту друга может добавляться что-то, например ссылка на его аватарку или ещё что-то
//     });
//   } catch {
//     dispatch({
//       type: FriendsTypes.FRIENDS_ERROR,
//       payload: "Возникла ошибка при обработке запроса",
//     });
//   }
// };

export const getFriendData = (id: string) => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const body = JSON.stringify({ id: id });
    const res = await axios.post(rootEndpoint, body, config);

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

export const changeFriendData = (data: Param[], id: string) => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const cookedData = data.map((param) => {
      return { title: param.title, value: param.value };
    });
    const body = JSON.stringify({ id: id, editData: cookedData });

    const res = await axios.put(`${rootEndpoint}/edit`, body, config);

    if (res.status === 501) {
      console.log("1");
    }

    dispatch({
      type: FriendsTypes.EDIT_FRIEND,
      payload: res.data.user,
    });
  } catch (e) {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const addFriend = (nick: string) => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const body = JSON.stringify({ nick: nick });

    const res = await axios.put(`${rootEndpoint}/add`, body, config);
    dispatch({
      type: FriendsTypes.ADD_FRIEND,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const removeFriend = (id: string) => async (dispatch: Dispatch<FriendsActions>) => {
  try {
    const res = await axios.delete(`${rootEndpoint}/delete/${id}`, config);
    dispatch({
      type: FriendsTypes.REMOVE_FRIEND,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: FriendsTypes.FRIENDS_ERROR,
      payload: "Возникла ошибка при обработке запроса",
    });
  }
};

export const searchFriends = async (nick: string) => {
  try {
    const res = await axios.get(`${rootEndpoint}/search/${nick}`, config);
    if (res.data.length <= 0) {
      return null;
    } else {
      return res.data;
    }
  } catch (e) {
    return [];
  }
};
