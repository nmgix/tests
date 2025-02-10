import React, { useCallback, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Seminar } from "../../shared/seminar";
import "./card.scss";
import { Modal } from "../modal";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../confirm-dialog/confirm-dialog";

export type CardProps = {
  loading?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (seminar: Partial<Seminar>, prevSeminar: Seminar) => void;
  seminar?: Seminar;
  _imageTimeout?: number;
};
const imageHeight = 150;

const Image = React.lazy(() => import("./components/image").then(module => ({ default: module.Image })));

export const Card = ({ seminar, loading = false, _imageTimeout, onDelete, onEdit }: CardProps) => {
  const seminarData = seminar !== undefined;
  const componentLoaded = !loading && seminarData;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const onModelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!seminar) return toast("Семинар е найден", { type: "error" });
    const updateObject: Partial<Seminar> = {};
    Object.keys(seminar!).forEach(k => {
      // @ts-ignore
      let currentValue = e.currentTarget.elements[k].value;
      // проверка ни о чём, честно говоря
      if (String(currentValue) !== String(seminar![k as keyof Seminar])) {
        // console.log({ v: currentValue, sV: seminar![k as keyof Seminar] });
        updateObject[k as keyof Seminar] = currentValue;
      }
    });
    if (onEdit) {
      if (Object.keys(updateObject).length > 0) {
        onEdit(updateObject, seminar!);
        toast("Семинар изменён", { type: "success" });
      } else {
        toast("Данные не изменены", { type: "warning" });
      }
    } else {
      // если onEdit нет, но кнопка изменить почему-то появилась из-за невнимательности при render conditioning
      toast("Данные не могут быть изменены", { type: "error" });
    }
    setEditModalOpen(false);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
          <button id='delete' className='default-button' onClick={() => setDeleteModalOpen(true)}>
            Удалить семинар
          </button>
        )}
        {seminarData && onEdit !== null && (
          <button id='edit' className='default-button' onClick={() => setEditModalOpen(true)}>
            Редактировать семинар
          </button>
        )}
      </div>
      {editModalOpen && (
        <Modal
          ariaLabel={`card edit, id: ${seminar!.id}`}
          onClose={() => setEditModalOpen(false)}
          show={editModalOpen}
          externalClassnames={"card-modal"}>
          <h3 className='header'>Редактирование семинара &#171;{seminar!.title}&#187;</h3>
          <form className='edit-form' onSubmit={onModelSubmit}>
            <div className='inputs'>
              {Object.keys(seminar!).map(k => (
                <div className='input-wrapper' key={k}>
                  <label htmlFor={k}>{k}</label>
                  <input id={k} name={k} placeholder={k} defaultValue={seminar![k as keyof Seminar]} />
                </div>
              ))}
            </div>
            <button className='default-button' id='edit' type='submit'>
              Изменить семинар
            </button>
          </form>
        </Modal>
      )}
      {deleteModalOpen && (
        <ConfirmDialog
          externalClassnames={"card-delete-modal"}
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={deleteCard}
          setOpen={setDeleteModalOpen}
        />
      )}
    </article>
  );
};

Card.displayName = "Card";
