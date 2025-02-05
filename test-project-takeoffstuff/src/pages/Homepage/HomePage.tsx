import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faAlignJustify, faIdCardClip, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./_homePage.scss";
import { Friend, localeFriend } from "../../redux/types/FriendsTypes";
import { Button } from "react-bootstrap";
import { UserModal } from "../../components/HomePage/Modal/UserModal";
import { RenderFriendsCarousel } from "../../components/HomePage/RenderFriendsCarousel";
import { RenderFriendsList } from "../../components/HomePage/RenderFriendsList";
import { ImageSvg } from "../../components/ImageSvg";
import { PopupInstanceProps, PopupWrapper } from "../../components/HomePage/PopupModal/PopupWrapper";
import { searchFriends } from "../../redux/actionCreators/FriendsActionCreator";

export const HomePage: React.FC<{}> = () => {
  const user = useTypedSelector((state) => state.user);
  const { getUser, logoutUser, addFriend } = useAction();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.state) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (user.error) {
      navigate("/", { replace: true });
    }
  }, [user.error]);

  const [index, setIndex] = useState<number>(0);

  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const handleFriendsDisplay = (setToList: boolean) => {
    if (user.state && user.state.friends) {
      if (user.state.friends.length < 10) {
        setListDisplay(setToList);
      } else {
        setListDisplay(false);
      }
    }
  };

  const [formData, setFromData] = useState<string>("");
  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    // отдельная фунция т.к. в будущем может расшириться стейт и понадобится что-то типа [e.currentTarget.name]: e.currentTarget.value
    setFromData(e.currentTarget.value);

    if (e.currentTarget.value.length === 0) {
      setFilteredFriends([]);
    }
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterFriends(formData);
  };

  const [filteredFriends, setFilteredFriends] = useState<localeFriend[]>([]);
  const filterFriends = (filterString: string) => {
    if (filterString.length <= 0) {
      return;
    }
    if (user.state && user.state.friends) {
      const resultFriends = user.state.friends.filter((friend) => {
        return (
          friend.customNick!.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ||
          String(friend.id!).toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ||
          String(friend.number!).toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
        );
      });

      setFilteredFriends(resultFriends);
    } else {
      setFilteredFriends([]);
    }
  };

  const [showModal, setShowModal] = useState<string | null>(null);
  const handleModalClose = () => {
    return setShowModal(null);
  };
  const handleModalOpen = (id: string) => {
    return setShowModal(id);
  };
  useEffect(() => {
    var friend = user.state?.friends.find((friend) => friend.id === showModal);
    if (!friend) {
      setShowModal(null);
    }
  }, [user.state?.friends]);

  const [activePopups, setActivePopups] = useState<PopupInstanceProps[]>([]);
  const addPopup = (id: string, jsx: JSX.Element | React.FC, modalHandler: () => void) => {
    setActivePopups([...activePopups, { id: id, jsx: jsx, modalHandler: modalHandler }]);
  };
  const removePopup = (id: string) => {
    setActivePopups(
      activePopups.filter((popupInstance) => {
        return popupInstance.id !== id;
      })
    );
  };
  const closePopupHandler = () => {
    removePopup("userSearch");
  };
  const suicidePopup = (nick: string) => {
    addFriend(nick);
    closePopupHandler();
  };

  const SearchUserPopupJSX: React.FC<{}> = () => {
    const [foundUsers, setFoundUsers] = useState<Friend[] | null>([]);
    const [userSearch, setUserSearch] = useState<string>("");
    const onSearchStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserSearch(e.currentTarget.value);
    };
    const onFriendSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      searchFriends(userSearch).then((data) => setFoundUsers(data));
    };
    const clearSearch = () => {
      setUserSearch("");
      setFoundUsers([]);
    };

    return (
      <>
        <h5 className='text-center'>Введите никнейм пользователя</h5>
        <div className='d-flex justify-content-between w-75 mx-auto flex-column'>
          <form className='d-flex justify-content-between w-100 searchForm' onSubmit={onFriendSearchSubmit}>
            <input
              className='form-control border-end-0 border rounded'
              type='text'
              placeholder='Никнейм (можно не полностью)'
              value={userSearch}
              id='example-search-input'
              onChange={onSearchStateChange}
            />
            <span className='input-group-append'>
              <button className='btn btn-outline-secondary bg-white border-start-0 border rounded ms-n3' type='submit'>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </span>
            {foundUsers !== null && foundUsers.length > 0 && (
              <Button variant='outline-danger' onClick={() => clearSearch()}>
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            )}
          </form>
          {foundUsers !== null ? (
            <ul className='d-flex flex-column foundUsers'>
              {foundUsers.map((foundUser) => {
                return (
                  <li key={foundUser.id} className='d-flex justify-content-between w-100'>
                    <div className='d-flex flex-column'>
                      <span>
                        <b>{foundUser.nick}</b>
                      </span>
                      <span>{foundUser.mail}</span>
                    </div>
                    <Button variant='success' onClick={() => suicidePopup(foundUser.nick!)}>
                      Добавить в друзья
                    </Button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h6 className='text-center' style={{ marginTop: "0.5rem", marginBottom: "0rem" }}>
              Пользователи не найдены, попробуйте другой никнейм
            </h6>
          )}
        </div>
      </>
    );
  };
  const SearchUserPopup = () => {
    return addPopup("userSearch", <SearchUserPopupJSX />, closePopupHandler);
  };

  return user.state ? (
    <div className='homePage w-100 d-flex justify-content-center position-relative'>
      {showModal !== null && (
        <UserModal userId={showModal} handleModalClose={handleModalClose} handleModalOpen={handleModalOpen} />
      )}
      <PopupWrapper popups={activePopups} />

      <div className='card w-75 mt-5'>
        <ImageSvg
          image={user.state.imgUrl}
          imageExtClassname='card-img-top'
          imageAlt='user-img'
          svgExtClassname='bd-placeholder-img card-img-top'
        />
        <div className='card-body'>
          <div className='w-100 d-flex justify-content-between'>
            <h3 className='card-title'>
              {user.state.nick}
              <p className='fw-light '>id: {user.state.id}</p>
            </h3>
            <button type='button' className='btn btn-danger h-50' onClick={logoutUser}>
              Выйти <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>
          <div className='friendsDisplay'>
            {user.state.friends.length <= 0 ? (
              <div className='d-flex flex-column align-items-center noFriends'>
                <span className='text-center noFriendsTitle'>Друзей пока что нет, не пора ли их завести?</span>
                <Button variant='success' className='w-20' onClick={() => SearchUserPopup()}>
                  <span style={{ marginRight: "0.5rem" }}>Завести друзей</span>{" "}
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </div>
            ) : (
              <div className='w-100 d-flex justify-content-between controls-wrapper'>
                <div className='input-group w-50 search-field'>
                  <form className='d-flex' onSubmit={onFormSubmit}>
                    <input
                      className='form-control border-end-0 border rounded'
                      type='text'
                      placeholder='search'
                      value={formData}
                      id='example-search-input'
                      onChange={changeFormData}
                      style={{ marginRight: "0.7rem" }}
                    />
                    <span className='input-group-append'>
                      <button
                        className='btn btn-outline-secondary bg-white border-start-0 border rounded ms-n3'
                        type='submit'>
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </span>
                    {filteredFriends.length > 0 && (
                      <Button variant='outline-danger' onClick={() => setFilteredFriends([])}>
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    )}
                    <Button variant='success' onClick={() => SearchUserPopup()}>
                      <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                  </form>
                </div>
                <div className='w-25 d-flex justify-content-end controls'>
                  <button className='btn btn-primary' onClick={() => handleFriendsDisplay(false)}>
                    <FontAwesomeIcon icon={faIdCardClip} />
                  </button>
                  <button className='btn btn-primary' onClick={() => handleFriendsDisplay(true)}>
                    <FontAwesomeIcon icon={faAlignJustify} />
                  </button>
                </div>
              </div>
            )}
            {user.state.friends.length > 0 ? (
              listDisplay && user.state.friends.length > 0 ? (
                <ul className='list-group'>
                  <RenderFriendsList
                    friendsArr={filteredFriends.length > 0 ? filteredFriends : user.state.friends}
                    handleModalOpen={handleModalOpen}
                  />
                </ul>
              ) : (
                <RenderFriendsCarousel
                  friendsArr={filteredFriends.length > 0 ? filteredFriends : user.state.friends}
                  handleModalOpen={handleModalOpen}
                />
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
