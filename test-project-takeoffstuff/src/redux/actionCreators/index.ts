import * as AuthActionCreators from "./AuthActionCreator";
import * as UserActionCreators from "./UserActionCreator";
import * as FriendsActionCreators from "./FriendsActionCreator";

export default {
  ...AuthActionCreators,
  ...UserActionCreators,
  ...FriendsActionCreators,
};
