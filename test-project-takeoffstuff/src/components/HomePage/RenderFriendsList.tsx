import { localeFriend } from "../../redux/types/FriendsTypes";

export const RenderFriendsList: React.FC<{ friendsArr: localeFriend[]; handleModalOpen: (id: string) => void }> = ({
  friendsArr,
  handleModalOpen,
}) => {
  return (
    <>
      {friendsArr.map((friend) => {
        return (
          <li className='list-group-item d-flex justify-content-between flex-wrap' key={friend.id}>
            <div className='d-flex w-75 friend-info flex-wrap'>
              <span>{friend.customNick}</span>
              <span>{friend.number}</span>
            </div>
            <button
              className='btn btn-primary'
              style={{ fontSize: "0.7rem" }}
              onClick={() => handleModalOpen(friend.id!)}>
              Открыть профиль
            </button>
          </li>
        );
      })}
    </>
  );
};
