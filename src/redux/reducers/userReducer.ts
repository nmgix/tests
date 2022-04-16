import { FriendsActions, UserActions } from "../actions/userActions";
import { FriendsTypes } from "../types/FriendsTypes";
import { UserState, UserTypes } from "../types/UserTypes";

const initialState: UserState = {
  state: null,
};

export const userReducer = (userState: UserState = initialState, action: FriendsActions | UserActions): UserState => {
  if (userState.state !== null) {
    switch (action.type) {
      case FriendsTypes.GET_FRIENDS: {
        return { ...userState, state: { ...userState.state, friends: action.payload! }, error: null };
      }
      case FriendsTypes.FRIENDS_ERROR: {
        return { ...userState, state: { ...userState.state, friends: [] }, error: action.payload };
      }
      case FriendsTypes.CLEAR_FRIENDS: {
        return { ...userState, state: { ...userState.state, friends: [] }, error: null };
      }
      case FriendsTypes.ADD_FRIEND: {
        return {
          ...userState,
          state: { ...userState.state, friends: [...userState.state.friends, action.payload!] },
          error: null,
        };
      }
      case FriendsTypes.REMOVE_FRIEND: {
        return {
          ...userState,
          state: {
            ...userState.state,
            friends: userState.state.friends.filter((value) => value.id !== action.payload),
          },
          error: null,
        };
      }
      case FriendsTypes.EDIT_FRIEND: {
        return {
          ...userState,
          state: {
            ...userState.state,
            friends: userState.state.friends.map((friend) => {
              if (friend.id === action.payload!.id) {
                return (friend = action.payload!);
              } else {
                return friend;
              }
            }),
          },
          error: null,
        };
      }
      default: {
        return userState;
      }
    }
  } else {
    switch (action.type) {
      case UserTypes.USER_SUCCESS: {
        return { ...userState, state: { ...action.payload! }, error: null };
      }
      case UserTypes.USER_ERROR: {
        return { ...userState, state: null, error: action.payload };
      }
      case UserTypes.USER_CLEAR: {
        return { ...userState, state: null, error: null };
      }
      default: {
        return userState;
      }
    }
  }
};
