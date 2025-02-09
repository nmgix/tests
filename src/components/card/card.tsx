import React, { useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { Seminar } from "../../shared/seminar";
import "./card.scss";

export type CardProps = {
  loading?: boolean;
  onDelete?: (id: number) => void;
  seminar?: Seminar;
  _imageTimeout?: number;
};
const imageHeight = 150;

const Image = React.lazy(() => import("./components/image").then(module => ({ default: module.Image })));

export const Card = ({ seminar, loading = false, _imageTimeout, onDelete }: CardProps) => {
  const seminarData = seminar !== undefined;
  const componentLoaded = !loading && seminarData;

  const deleteCard = useCallback(seminar && onDelete ? () => onDelete(seminar.id) : () => null, [seminar, onDelete]);
  return (
    <article className='card'>
      {componentLoaded ? (
        <Image
          externalClassnames='card-image'
          height={imageHeight}
          src={seminar.photo}
          alt={`${seminar.title}. изображение.`}
          fallback={<Skeleton containerClassName='card-image' style={{ height: imageHeight }} />}
          _imageTimeout={_imageTimeout}
        />
      ) : (
        <Skeleton containerClassName='card-image' style={{ height: imageHeight }} />
      )}
      <div className='card-header'>
        <h3 className='card-header-title'>{componentLoaded ? seminar.title : <Skeleton />}</h3>
        <div className='card-header-subtitle'>
          <h5 className='card-header-subtitle-date'>{componentLoaded ? seminar.date : <Skeleton />}</h5>
          <h5 className='card-header-subtitle-date'>{componentLoaded ? seminar.time : <Skeleton />}</h5>
        </div>
      </div>
      <p className='card-description'>{componentLoaded ? seminar.description : <Skeleton count={2} />}</p>
      <div className='card-controls'>{seminarData && deleteCard !== null && <button onClick={deleteCard}>Удалить семинар</button>}</div>
    </article>
  );
};

Card.displayName = "Card";
