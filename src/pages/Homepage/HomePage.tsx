import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faAlignJustify, faIdCardClip, faXmark } from "@fortawesome/free-solid-svg-icons";

import Carousel from "react-bootstrap/Carousel";

import "./_homePage.scss";
import { localeFriend } from "../../redux/types/FriendsTypes";
import { Button, Modal } from "react-bootstrap";
import { UserModal } from "../../components/HomePage/Modal/UserModal";
import { RenderFriendsCarousel } from "../../components/HomePage/RenderFriendsCarousel";
import { RenderFriendsList } from "../../components/HomePage/RenderFriendsList";
import { ImageSvg } from "../../components/ImageSvg";

export const HomePage: React.FC<{}> = () => {
  const user = useTypedSelector((state) => state.user);
  const { getUser, logoutUser } = useAction();
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

  return user.state ? (
    <div className='homePage w-100 d-flex justify-content-center position-relative'>
      {showModal !== null && (
        <UserModal userId={showModal} handleModalClose={handleModalClose} handleModalOpen={handleModalOpen} />
      )}
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
            <div className='w-100 d-flex justify-content-between'>
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
                    <button
                      className='btn btn-outline-secondary bg-white border-start-0 border rounded ms-n3'
                      type='button'
                      onClick={() => setFilteredFriends([])}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  )}
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
            {listDisplay ? (
              <ul className='list-group'>
                <RenderFriendsList
                  friendsArr={filteredFriends.length > 0 ? filteredFriends : user.state.friends}
                  handleModalOpen={handleModalOpen}
                />
              </ul>
            ) : (
              <RenderFriendsCarousel
                friendsArr={filteredFriends.length > 0 ? filteredFriends : user.state.friends}
                index={index}
                setIndex={setIndex}
                handleModalOpen={handleModalOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
