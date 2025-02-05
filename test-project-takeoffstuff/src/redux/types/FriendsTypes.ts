export enum FriendsTypes {
  FRIENDS_ERROR = "FRIENDS_ERROR",

  FETCH_FRIEND_DATA = "FETCH_FRIEND_DATA",

  ADD_FRIEND = "ADD_FREIND",
  REMOVE_FRIEND = "REMOVE_FRIEND",
  EDIT_FRIEND = "EDIT_FRIEND",
}

type defaultLocalFriend = {
  id: string | null;
  customNick: string | null;
  number: string | null;
};

export type Friend = {
  id: string | null;
  nick: string | null;
  mail: string | null;
  friends: defaultLocalFriend[];
  imgUrl?: string | null;
};

export type localeFriend = {
  id: string | null;
  customNick: string | null;
  number: string | null;
  mainData?: Friend;
};

export type FriendsListState = localeFriend[];
