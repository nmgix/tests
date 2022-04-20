import { FriendsActions, UserActions } from "../actions/userActions";
import { FriendsTypes } from "../types/FriendsTypes";
import { UserState, UserTypes } from "../types/UserTypes";

const initialState: UserState = {
  state: null,
  loading: true,
  error: null,
};

export const userReducer = (userState: UserState = initialState, action: FriendsActions | UserActions): UserState => {
  switch (action.type) {
    case FriendsTypes.FRIENDS_ERROR: {
      return { ...userState, state: null, error: action.payload };
    }
    case FriendsTypes.FETCH_FRIEND_DATA: {
      if (userState.state === null) {
        return userState;
      }
      if (action.payload === undefined) {
        return userState;
      } else {
        var friends = userState.state.friends.map((friend) => {
          if (friend.id === action.payload!.id) {
            friend.mainData = action.payload;
          }
          return friend;
        });

        return { ...userState, state: { ...userState.state, friends: friends }, error: null };
      }
    }
    case FriendsTypes.ADD_FRIEND:
    case FriendsTypes.REMOVE_FRIEND: {
      if (userState.state === null) {
        return userState;
      }
      return {
        ...userState,
        state: { ...userState.state, friends: action.payload! },
        error: null,
      };
    }
    case FriendsTypes.EDIT_FRIEND: {
      if (userState.state === null) {
        return userState;
      }
      return {
        ...userState,
        state: {
          ...userState.state,
          friends: userState.state.friends.map((friend) => {
            if (friend.id === action.payload!.id) {
              return Object.assign(friend, action.payload);
            } else {
              return friend;
            }
          }),
        },
        error: null,
      };
    }
    case UserTypes.USER_LOADING: {
      return { ...userState, loading: true, error: null };
    }
    case UserTypes.USER_SUCCESS: {
      return { ...userState, state: { ...action.payload! }, loading: false, error: null };
    }
    case UserTypes.USER_ERROR: {
      return { ...userState, state: null, loading: false, error: action.payload };
    }
    case UserTypes.USER_CLEAR: {
      return { ...userState, state: null, loading: false, error: null };
    }
    default: {
      return userState;
    }
  }
};
