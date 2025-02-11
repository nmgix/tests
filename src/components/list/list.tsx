import { Children, JSX, useEffect, useRef, useState } from "react";
import { CardProps } from "../card";
import "./list.scss";
import { toast } from "react-toastify";
import { axiosInstance } from "@/shared/axios";
import { Api } from "@/shared/api-messages";

export type ListProps<ChildProps = CardProps> = {
  items: ChildProps[] | undefined;
  preloadSekeletonAmount: number;
  timeout: number;
  ListItemComponent: (props: ChildProps) => JSX.Element;
  LoadingListItemComponent: (props: ChildProps) => JSX.Element;
};

export const List = ({ items, ListItemComponent, LoadingListItemComponent, preloadSekeletonAmount = 5, timeout = 3000 }: ListProps) => {
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [_items, setItems] = useState(items); // обновлять список их карточек внутри
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setItems(items);
  }, [items]); // если извне обновляется список
  useEffect(() => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = null;

    if (items === undefined) {
      timeoutRef.current = setTimeout(() => {
        setItemsLoaded(false);
        setItems([]);
      }, timeout);
    } else {
      setItemsLoaded(true);
    }

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, [items]); // чтобы если items === undefined больше 3сек, то ставить setItemsLoaded = false

  const itemsLengthOverZero = _items ? _items.length > 0 : false;

  // const onDelete = async (deleteId: number, card: CardProps) => {
  //   setItems(prev => prev?.filter(s => s.seminar?.id !== deleteId)); // убрать карточку из списка
  //   if (card.onDelete) card.onDelete(deleteId); // выыполнить cb карточки если такой есть
  //   toast(`Семинар #${card.seminar!.id} удален`, { type: "info" }); // уведомить
  //   const resetTimeout = setTimeout(() => { // вернуть карточку в конец списка через 3сек если не удалилась на backend
  //     toast(`Семинар #${card.seminar!.id} не удален`, { type: "error" });
  //     setItems(prev => (prev ? [...prev, card] : [card]));
  //   }, 3000);
  //   // тут промис на удаление и если не удалится за 3000мс то таймаут resetTimeout сработает
  //   // await axiosInstance.delete(`${Api.Seminars}/${card.seminar?.id}`).then(() => clearTimeout(resetTimeout));
  // };

  return (
    <div className='list'>
      {/* (элементы загрузились) && (элементы !== undefined) && (длина массива > 0) */}
      {itemsLoaded &&
        _items !== undefined &&
        itemsLengthOverZero &&
        _items.map(card => (
          // всё равно перемешал :/
          <ListItemComponent
            key={card.seminar?.id}
            onDelete={dId => onDelete(dId, card)}
            onEdit={card.onEdit}
            seminar={card.seminar}
            loading={false}
          />
        ))}
      {/* (элементы не загрузились) && (элементы == undefined) */}
      {!itemsLoaded &&
        !_items &&
        Children.map(Array(preloadSekeletonAmount).fill(null), (_, i) => <LoadingListItemComponent loading={false} key={i} />)}
      {/* (элементы загрузились) && (длина массива == 0), если черезе props.timeout items останутся undefined, то _items присвоится пустой массив и выставится itemsLoaded == false */}
      {_items !== undefined && !itemsLengthOverZero && <span className='list-nothing-to-show'>нечего показывать</span>}
    </div>
  );
};
List.displayName = "List";
