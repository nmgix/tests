import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { localeFriend } from "../../redux/types/FriendsTypes";
import { ImageSvg } from "../ImageSvg";

export const RenderFriendsCarousel: React.FC<{
  friendsArr: localeFriend[];
  handleModalOpen: (id: string) => void;
}> = ({ friendsArr, handleModalOpen }) => {
  const handleCarouselSelect = (selectedIndex: number) => {
    setCurrentIndex(selectedIndex);
  };
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [friendsArr]);

  return (
    <Carousel
      activeIndex={currentIndex}
      onSelect={handleCarouselSelect}
      controls={false}
      interval={null}
      id='carouselExampleCaptions'>
      {friendsArr.map((friend) => {
        return (
          <Carousel.Item key={friend.id}>
            <div className='card w-50 mt-5 mx-auto'>
              <ImageSvg
                image={null}
                imageExtClassname='card-img-top'
                imageAlt='user-img'
                svgExtClassname='bd-placeholder-img card-img-top'
              />
              <div className='card-body d-flex justify-content-around flex-wrap'>
                <h3 className='card-title'>
                  {friend.customNick}
                  <p className='fw-light '>id: {friend.id}</p>
                </h3>
                <div
                  className='d-flex flex-column'
                  style={{ justifyContent: friend.number!.length <= 0 ? "center" : "" }}>
                  {friend.number!.length > 0 && <h4>+{friend.number}</h4>}
                  <button
                    className='btn btn-primary'
                    style={{ fontSize: "0.7rem" }}
                    onClick={() => handleModalOpen(friend.id!)}>
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
