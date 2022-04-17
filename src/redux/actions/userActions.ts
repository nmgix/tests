import { Action } from ".";
import { Friend, FriendsListState, FriendsTypes } from "../types/FriendsTypes";
import { UserData, UserTypes } from "../types/UserTypes";

type UserLoading = Action<typeof UserTypes.USER_LOADING, void>;
type UserSuccess = Action<typeof UserTypes.USER_SUCCESS, UserData>;
type UserError = Action<typeof UserTypes.USER_ERROR, string>;
type UserReset = Action<typeof UserTypes.USER_CLEAR, void>;

type GetFriends = Action<typeof FriendsTypes.GET_FRIENDS, FriendsListState>;
type FriendsError = Action<typeof FriendsTypes.FRIENDS_ERROR, string>;
type ClearFriends = Action<typeof FriendsTypes.CLEAR_FRIENDS, void>;
type AddFriend = Action<typeof FriendsTypes.ADD_FRIEND, Friend>;
type RemoveFriend = Action<typeof FriendsTypes.REMOVE_FRIEND, string>;
type EditFriend = Action<typeof FriendsTypes.EDIT_FRIEND, Friend>;

export type UserActions = UserLoading | UserSuccess | UserError | UserReset;
export type FriendsActions = (GetFriends | FriendsError | ClearFriends) | (AddFriend | RemoveFriend | EditFriend);
