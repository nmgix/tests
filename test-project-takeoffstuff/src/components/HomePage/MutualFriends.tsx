import { localeFriend } from "../../redux/types/FriendsTypes";

export const MutualFriends: React.FC<{
  userFriends: localeFriend[];
  friendFriends: localeFriend[];
  disabled: boolean;
  handleModalOpen: (id: string) => void;
}> = ({ userFriends, friendFriends, disabled, handleModalOpen }) => {
  const mutual = userFriends
    .map((userFriend) => {
      return friendFriends.filter((friendsFriend) => friendsFriend.id === userFriend.id && userFriend.id);
    })
    // @ https://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript
    .flat(2);

  return mutual.length <= 0 ? (
    <></>
  ) : (
    <div className='mutualFriends'>
      <h4>Общие друзья</h4>
      <ul>
        {mutual.map((mutualFriend) => {
          return (
            <li key={mutualFriend.id}>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => {
                  if (!disabled) {
                    handleModalOpen(mutualFriend.id!);
                  }
                }}
                style={{ fontSize: "0.8rem" }}
                disabled={disabled}>
                {mutualFriend.customNick}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
