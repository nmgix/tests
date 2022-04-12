import { Action } from ".";
import { Friend, FriendsListState } from "../reducers/friendsReducer";

export enum FriendsTypes {
  GET_FRIENDS = "GET_FRIENDS",
  FRIENDS_ERROR = "FRIENDS_ERROR",
  CLEAR_FRIENDS = "CLEAR_FRIENDS",

  ADD_FRIEND = "ADD_FREIND",
  REMOVE_FRIEND = "REMOVE_FRIEND",
  EDIT_FRIEND = "EDIT_FRIEND",
}

type GetFriends = Action<typeof FriendsTypes.GET_FRIENDS, FriendsListState>;
type FriendsError = Action<typeof FriendsTypes.FRIENDS_ERROR, string>;
type ClearFriends = Action<typeof FriendsTypes.CLEAR_FRIENDS, void>;

type AddFriend = Action<typeof FriendsTypes.ADD_FRIEND, Friend>;
type RemoveFriend = Action<typeof FriendsTypes.REMOVE_FRIEND, string>;
type EditFriend = Action<typeof FriendsTypes.EDIT_FRIEND, Friend>;

export type FriendsActions = (GetFriends | FriendsError | ClearFriends) | (AddFriend | RemoveFriend | EditFriend);
