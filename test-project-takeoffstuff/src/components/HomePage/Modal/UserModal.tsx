import { faUserCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAction } from "../../../redux/helpers/useAction";
import { useTypedSelector } from "../../../redux/helpers/useTypedSelector";
import { localeFriend } from "../../../redux/types/FriendsTypes";
import { ImageSvg } from "../../ImageSvg";
import { MutualFriends } from "../MutualFriends";
import { PopupInstanceProps, PopupWrapper } from "../PopupModal/PopupWrapper";

import "./_modal.scss";

export type Param = { label: string; title: string; value: string | number };

export const UserModal: React.FC<{
  userId: string | null;
  handleModalClose: () => void;
  handleModalOpen: (id: string) => void;
}> = ({ userId, handleModalClose, handleModalOpen }) => {
  const user = useTypedSelector((state) => state.user);
  const { getFriendData, removeFriend } = useAction();
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
  }, [userId, user.state?.friends]);

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (user.error !== null) {
      handleModalClose();
    }
  }, [user.error]);

  const EditableInfo: React.FC<{
    params: Param[];
    userId: string;
    changeEditState: React.Dispatch<React.SetStateAction<boolean>>;
  }> = ({ params, userId, changeEditState }) => {
    const { changeFriendData } = useAction();
    const [data, setData] = useState<Param[]>(JSON.parse(JSON.stringify(params)));
    const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
      var currentObj = data.find((elem) => elem.title === e.currentTarget.name);
      if (!currentObj) {
        return;
      }
      currentObj.value = e.currentTarget.value;
      setData([...data]);
    };

    const checkDifference = (currentData: Param[], defaultData: Param[]): boolean => {
      // currentData.map((currentField =>   ))
      var result = false;
      for (var i = 0; i < currentData.length; i++) {
        const defaultField = defaultData.find((defaultField) => defaultField.title === currentData[i].title);
        if (defaultField?.value !== currentData[i].value) {
          return (result = true);
        } else {
          continue;
        }
      }
      return result;
    };

    const handleDataChange = (data: Param[], userId: string) => {
      changeFriendData(data, userId);
      changeEditState(false);
    };

    return (
      <div className='editZone'>
        <ul>
          {data.map((param) => {
            return (
              <li key={param.title}>
                {param.label}{" "}
                <input
                  className='input-medium form-control form-group'
                  name={param.title}
                  value={param.value}
                  onChange={changeData}
                />
              </li>
            );
          })}
        </ul>

        {checkDifference(data, params) && (
          <div className='formEditParams'>
            <Button variant='success' onClick={() => handleDataChange(data, userId)}>
              <FontAwesomeIcon icon={faUserCheck} />
            </Button>
            <Button variant='danger' onClick={() => setEditMode(!editMode)}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const [activePopups, setActivePopups] = useState<PopupInstanceProps[]>([]);
  const addPopup = (id: string, jsx: JSX.Element | React.FC) => {
    setActivePopups([...activePopups, { id: id, jsx: jsx }]);
  };
  const removePopup = (id: string) => {
    setActivePopups(activePopups.filter((popupInstance) => popupInstance.id !== id));
  };
  const suicidePopup = (id: string) => {
    removePopup(id);
    removeFriend(id);
  };

  const DeleteUserPopupJSX: React.FC<{ id: string }> = ({ id }) => {
    return (
      <>
        <h5 className='text-center'>Уверены что хотите удалить пользователя?</h5>
        <div className='d-flex justify-content-between w-25 mx-auto'>
          <Button variant='danger' onClick={() => suicidePopup(id)}>
            Да
          </Button>
          <Button variant='success' onClick={() => removePopup(id)}>
            Нет
          </Button>
        </div>
      </>
    );
  };
  const DeleteUserPopup = (id: string) => {
    return addPopup(id, <DeleteUserPopupJSX id={id} />);
  };

  return !userId || currentFriend?.mainData === undefined || currentFriend === null ? (
    <></>
  ) : (
    <Modal
      show={userId !== null}
      onHide={handleModalClose}
      backdrop={editMode ? "static" : true}
      keyboard={editMode ? false : true}
      className='userModal'
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
        <PopupWrapper popups={activePopups} />
        <MutualFriends
          userFriends={user.state!.friends}
          friendFriends={currentFriend.mainData.friends}
          disabled={editMode}
          handleModalOpen={handleModalOpen}
        />
        <div className='mainInfo'>
          <div>
            <h4>Ваша информация о пользователе</h4>
            {editMode ? (
              <EditableInfo
                params={[
                  { label: "Имя", title: "customNick", value: currentFriend.customNick! },
                  {
                    label: "Номер телефона",
                    title: "number",
                    value: currentFriend.number!.length > 0 ? currentFriend.number! : "",
                  },
                ]}
                userId={currentFriend.id!}
                changeEditState={setEditMode}
              />
            ) : (
              <ul>
                <li>
                  Имя <b>{currentFriend.customNick}</b>
                </li>
                <li>
                  Номер телефона <b>{currentFriend.number!.length > 0 ? `+${currentFriend.number}` : "отсутствует"}</b>
                </li>
              </ul>
            )}
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
              <li>
                ID Пользователя <b>{currentFriend.mainData.id}</b>
              </li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='warning' onClick={() => setEditMode(!editMode)}>
          Редактировать
        </Button>
        <Button variant='outline-danger' disabled={editMode} onClick={() => DeleteUserPopup(currentFriend.id!)}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
