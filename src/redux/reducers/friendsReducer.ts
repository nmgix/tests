import { DefaultState } from ".";
import { AuthActions, AuthTypes } from "../actions/authActions";
import { FriendsActions, FriendsTypes } from "../actions/friendsActions";

export type FriendsListState = Friend[];

export type Friend = {
  id: string | null;
  nick: string | null;
  mail: string | null;
};

interface FriendsState extends DefaultState {
  state: FriendsListState;
}

const initialState: FriendsState = {
  state: [],
};

export const FriendsReducer = (friendsState: FriendsState = initialState, action: FriendsActions) => {
  switch (action.type) {
    case FriendsTypes.GET_FRIENDS: {
      return { ...friendsState, state: action.payload, error: null };
    }
    case FriendsTypes.FRIENDS_ERROR: {
      return { ...friendsState, state: [], error: action.payload };
    }
    case FriendsTypes.CLEAR_FRIENDS: {
      return { ...friendsState, state: [], error: null };
    }

    case FriendsTypes.ADD_FRIEND: {
      return { ...friendsState, state: [...friendsState.state], error: null };
    }
    case FriendsTypes.REMOVE_FRIEND: {
      return { ...friendsState, state: friendsState.state.filter((value) => value.id !== action.payload), error: null };
    }
    case FriendsTypes.EDIT_FRIEND: {
      return {
        ...friendsState,
        state: friendsState.state.map((friend) => {
          if (friend.id === action.payload!.id) {
            return (friend = action.payload!);
          } else {
            return friend;
          }
        }),
        error: null,
      };
    }
    default: {
      return friendsState;
    }
  }
};
