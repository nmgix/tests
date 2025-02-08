import React from "react";
import Skeleton from "react-loading-skeleton";
import { Seminar } from "../../shared/seminar";
import "./card.scss";

export type CardProps = {
  seminar: Seminar;
  loading: boolean;
  _imageTimeout?: number;
};
const imageHeight = 150;

const Image = React.lazy(() => import("./components/image").then(module => ({ default: module.Image })));

export const Card = ({ seminar, loading, _imageTimeout }: CardProps) => {
  return (
    <article className='card'>
      {!loading ? (
        <Image
          externalClassnames='card-image'
          height={imageHeight}
          src={seminar.photo}
          alt={`${seminar.title}. изображение.`}
          fallback={<div>img load UwU</div>}
          _imageTimeout={_imageTimeout}
        />
      ) : (
        <Skeleton containerClassName='card-image' style={{ height: imageHeight }} />
      )}
      <div className='card-header'>
        <h3 className='card-header-title'>{!loading ? seminar.title : <Skeleton />}</h3>
        <div className='card-header-subtitle'>
          <h5 className='card-header-subtitle-date'>{!loading ? seminar.date : <Skeleton />}</h5>
          <h5 className='card-header-subtitle-date'>{!loading ? seminar.time : <Skeleton />}</h5>
        </div>
      </div>
      <p className='card-description'>{!loading ? seminar.description : <Skeleton count={2} />}</p>
    </article>
  );
};

Card.displayName = "Card";
