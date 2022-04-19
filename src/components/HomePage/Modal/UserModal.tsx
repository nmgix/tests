import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAction } from "../../../redux/helpers/useAction";
import { useTypedSelector } from "../../../redux/helpers/useTypedSelector";
import { localeFriend } from "../../../redux/types/FriendsTypes";
import { ImageSvg } from "../../ImageSvg";

import "./_modal.scss";

export const UserModal: React.FC<{
  userId: string | null;
  handleModalClose: () => void;
  handleModalOpen: (id: string) => void;
}> = ({ userId, handleModalClose, handleModalOpen }) => {
  const user = useTypedSelector((state) => state.user);
  const { getFriendData } = useAction();
  const [currentFriend, setCurrentFriend] = useState<localeFriend | null>(null);
  useEffect(() => {
    if (userId !== null) {
      if (currentFriend && currentFriend.mainData === undefined) {
        getFriendData(userId);
      }
    }
  }, [currentFriend]);
  useEffect(() => {
    setCurrentFriend(user.state!.friends.find((friend) => friend.id === userId)!);
  }, [userId]);

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (user.error !== null) {
      handleModalClose();
    }
  }, [user.error]);

  const MutualFriends: React.FC<{ userFriends: localeFriend[]; friendFriends: localeFriend[]; disabled: boolean }> = ({
    userFriends,
    friendFriends,
    disabled,
  }) => {
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

  return !userId || currentFriend?.mainData === undefined || currentFriend === null ? (
    <></>
  ) : (
    <Modal
      show={userId !== null}
      onHide={handleModalClose}
      backdrop={editMode ? "static" : true}
      keyboard={editMode ? false : true}
      style={{ border: editMode ? "5px solid #ffc107" : "" }}>
      <Modal.Header className='position-relative'>
        <ImageSvg
          image={null}
          imageExtClassname='card-img-top'
          imageAlt='user-img'
          svgExtClassname='bd-placeholder-img card-img-top position-absolute'
          svgExtStyles={{
            top: "0",
            left: "0",
            height: "100%",
          }}
        />
        <Modal.Title>
          <div className='position-relative d-flex flex-column'>
            <span>{currentFriend.customNick}</span>
            <h6 style={{ opacity: "0.5" }}>{currentFriend.mainData!.nick}</h6>
          </div>
        </Modal.Title>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => {
            handleModalClose();
            setEditMode(false);
          }}
          style={{ cursor: "pointer" }}
        />
      </Modal.Header>
      <Modal.Body>
        <MutualFriends
          userFriends={user.state!.friends}
          friendFriends={currentFriend.mainData.friends}
          disabled={editMode}
        />
        <div className='mainInfo'>
          <div>
            <h4>Ваша информация о пользователе</h4>
            <ul>
              <li>
                Имя <b>{currentFriend.customNick}</b>
              </li>
              <li>
                Номер телефона <b>+{currentFriend.number}</b>
              </li>
            </ul>
          </div>
          <div style={editMode ? { opacity: "0.5" } : {}}>
            <h4>Информация пользователя</h4>
            <ul>
              <li>
                Почта <b>{currentFriend.mainData.mail}</b>
              </li>
              <li>
                Текущий ник <b>{currentFriend.mainData.nick}</b>
              </li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-warning' onClick={() => setEditMode(!editMode)}>
          Редактировать
        </Button>
        <Button variant='outline-danger' disabled={editMode}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
