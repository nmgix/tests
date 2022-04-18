import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAlignJustify, faIdCardClip, faXmark } from "@fortawesome/free-solid-svg-icons";

import Carousel from "react-bootstrap/Carousel";

import "./_homePage.scss";
import { localeFriend } from "../../redux/types/FriendsTypes";

export const HomePage: React.FC<{
  /*id: string*/
}> = (/*{ id }*/) => {
  const user = useTypedSelector((state) => state.user);
  const { getUser } = useAction();

  useEffect(() => {
    if (!user.state) {
      getUser();
    }
  }, []);

  const [index, setIndex] = useState<number>(0);
  const handleCarouselSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

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
      // const resultFriends = user.state.friends.filter((friend) => {
      //   return Object.keys(friend).map(
      //     (key) => String(friend[key as keyof localeFriend]).toLocaleLowerCase() === filterString.toLocaleLowerCase()
      //   );
      // });
      const resultFriends = user.state.friends.filter((friend) => {
        console.log(
          friend.customNick!.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()),
          String(friend.id!).toLocaleLowerCase().includes(filterString.toLocaleLowerCase()),
          String(friend.number!).toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
        );

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

  // const renderFriends = (friendArr: localeFriend[], elementWrapper: JSX.Element) => {

  // }

  const RenderFriendsCarousel: React.FC<{ friendsArr: localeFriend[] }> = ({ friendsArr }) => {
    return (
      <Carousel
        activeIndex={index}
        onSelect={handleCarouselSelect}
        controls={false}
        interval={null}
        id='carouselExampleCaptions'>
        {friendsArr.map((friend) => {
          return (
            <Carousel.Item key={friend.id}>
              <div className='card w-50 mt-5 mx-auto'>
                <svg
                  className='bd-placeholder-img card-img-top'
                  width='100%'
                  height='180'
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                  preserveAspectRatio='xMidYMid slice'
                  focusable='false'>
                  <rect width='100%' height='100%' fill='#868e96'></rect>
                </svg>
                <div className='card-body d-flex justify-content-around'>
                  <h3 className='card-title'>
                    {friend.customNick}
                    <p className='fw-light '>id: {friend.customNick}</p>
                  </h3>
                  <div className='d-flex flex-column'>
                    <h4>+{friend.number}</h4>
                    <button className='btn btn-primary' style={{ fontSize: "0.7rem" }}>
                      Открыть профиль
                    </button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  };

  const RenderFriendsList: React.FC<{ friendsArr: localeFriend[] }> = ({ friendsArr }) => {
    return (
      <>
        {friendsArr.map((friend) => {
          return (
            <li className='list-group-item d-flex justify-content-between' key={friend.id}>
              <div className='d-flex w-75 friend-info '>
                <span>{friend.customNick}</span>
                <span>{friend.number}</span>
              </div>
              <button className='btn btn-primary' style={{ fontSize: "0.7rem" }}>
                Открыть профиль
              </button>
            </li>
          );
        })}
      </>
    );
  };

  return user.state ? (
    <div className='homePage w-100 d-flex justify-content-center'>
      <div className='card w-75 mt-5'>
        {user.state.imgUrl ? (
          <img src={user.state.imgUrl} className='card-img-top' alt='user-img' />
        ) : (
          <svg
            className='bd-placeholder-img card-img-top'
            width='100%'
            height='180'
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            preserveAspectRatio='xMidYMid slice'
            focusable='false'>
            <rect width='100%' height='100%' fill='#868e96'></rect>
          </svg>
        )}
        <div className='card-body'>
          <h3 className='card-title'>
            {user.state.nick}
            <p className='fw-light '>id: {user.state.id}</p>
          </h3>
          {/* <p className='card-text'>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p> */}
          {/* <a href='#' className='btn btn-primary'>
            Go somewhere
          </a> */}
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
              <>
                <ul className='list-group'>
                  <RenderFriendsList friendsArr={filteredFriends.length > 0 ? filteredFriends : user.state.friends} />
                </ul>
              </>
            ) : (
              <RenderFriendsCarousel friendsArr={filteredFriends.length > 0 ? filteredFriends : user.state.friends} />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
