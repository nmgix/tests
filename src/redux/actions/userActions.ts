import { Action } from ".";
import { Friend, FriendsListState, FriendsTypes, localeFriend } from "../types/FriendsTypes";
import { UserData, UserTypes } from "../types/UserTypes";

type UserLoading = Action<typeof UserTypes.USER_LOADING, void>;
type UserSuccess = Action<typeof UserTypes.USER_SUCCESS, UserData>;
type UserError = Action<typeof UserTypes.USER_ERROR, string>;
type UserReset = Action<typeof UserTypes.USER_CLEAR, void>;

type FriendsError = Action<typeof FriendsTypes.FRIENDS_ERROR, string>;
type FetchFriendData = Action<typeof FriendsTypes.FETCH_FRIEND_DATA, Friend>;
type AddFriend = Action<typeof FriendsTypes.ADD_FRIEND, localeFriend>;
type RemoveFriend = Action<typeof FriendsTypes.REMOVE_FRIEND, string>;
type EditFriend = Action<typeof FriendsTypes.EDIT_FRIEND, localeFriend>;

export type UserActions = UserLoading | UserSuccess | UserError | UserReset;
export type FriendsActions = (FriendsError | FetchFriendData) | (AddFriend | RemoveFriend | EditFriend);
