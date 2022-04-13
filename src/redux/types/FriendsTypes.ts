export enum FriendsTypes {
  GET_FRIENDS = "GET_FRIENDS",
  FRIENDS_ERROR = "FRIENDS_ERROR",
  CLEAR_FRIENDS = "CLEAR_FRIENDS",

  ADD_FRIEND = "ADD_FREIND",
  REMOVE_FRIEND = "REMOVE_FRIEND",
  EDIT_FRIEND = "EDIT_FRIEND",
}

export type Friend = {
  id: string | null;
  nick: string | null;
  mail: string | null;
  imgUrl?: string | null;
};

export type FriendsListState = Friend[];
