import React, { Suspense } from "react";
import { Seminar } from "../../shared/seminar";
import "./card.scss";

export type CardProps = {
  seminar: Seminar;
};

const Image = React.lazy(() => import("./components/image").then(module => ({ default: module.Image })));

export const Card = ({ seminar }: CardProps) => {
  return (
    <article className='card'>
      <Suspense fallback={<div>img load UwU</div>}>
        <Image externalClassnames='card-image' src={seminar.photo} alt={`${seminar.title}. изображение.`} />
      </Suspense>
      <div className='card-header'>
        <h3 className='card-header-title'>{seminar.title}</h3>
        <div className='card-header-subtitle'>
          <h5 className='card-header-subtitle-date'>{seminar.date}</h5>
          <h5 className='card-header-subtitle-date'>{seminar.time}</h5>
        </div>
      </div>
      <p className='card-description'>{seminar.description}</p>
    </article>
  );
};

Card.displayName = "Card";
