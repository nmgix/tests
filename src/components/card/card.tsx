import React, { useCallback, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Seminar } from "../../shared/seminar";
import "./card.scss";
import { Modal } from "../modal";

export type CardProps = {
  loading?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (seminar: Partial<Seminar>) => void;
  seminar?: Seminar;
  _imageTimeout?: number;
};
const imageHeight = 150;

const Image = React.lazy(() => import("./components/image").then(module => ({ default: module.Image })));

export const Card = ({ seminar, loading = false, _imageTimeout, onDelete, onEdit }: CardProps) => {
  const seminarData = seminar !== undefined;
  const componentLoaded = !loading && seminarData;

  const [modalOpen, setModalOpen] = useState(false);
  const onModelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const object: Partial<Seminar> = {};
    // @ts-ignore
    Object.keys(seminar!).forEach(k => (object[k] = e.currentTarget.elements[k].value));
    console.log(object);
    if (onEdit) onEdit(object);
  };

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
        <div className='rowSB'>
          <h3 className='card-header-title'>{componentLoaded ? seminar.title : <Skeleton />}</h3>
          {componentLoaded && <span className='card-header-id'>#{seminar.id}</span>}
        </div>
        <div className='card-header-subtitle rowSB'>
          <h5 className='card-header-subtitle-date'>{componentLoaded ? seminar.date : <Skeleton />}</h5>
          <h5 className='card-header-subtitle-date'>{componentLoaded ? seminar.time : <Skeleton />}</h5>
        </div>
      </div>
      <p className='card-description'>{componentLoaded ? seminar.description : <Skeleton count={2} />}</p>
      <div className='card-controls'>
        {seminarData && deleteCard !== null && (
          <button id='delete' className='card-button' onClick={deleteCard}>
            Удалить семинар
          </button>
        )}
        {seminarData && onEdit !== null && (
          <button id='edit' className='card-button' onClick={() => setModalOpen(true)}>
            Редактировать семинар
          </button>
        )}
      </div>
      {modalOpen && (
        <Modal ariaLabel={`card edit, id: ${seminar!.id}`} onClose={() => setModalOpen(false)} show={modalOpen} externalClassnames={"card-modal"}>
          <h3>Редактирование семинара &#171;{seminar!.title}&#187;</h3>
          <form onSubmit={onModelSubmit}>
            {Object.keys(seminar!).map(k => (
              <div id={k}>
                <label htmlFor={k}>{k}</label>
                <input id={k} name={k} placeholder={k} defaultValue={seminar![k as keyof Seminar]} />
              </div>
            ))}
            <button className='card-button' id='edit' type='submit'>
              Изменить семинар
            </button>
          </form>
        </Modal>
      )}
    </article>
  );
};

Card.displayName = "Card";
