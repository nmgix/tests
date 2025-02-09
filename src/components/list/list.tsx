import { Children, JSX, useEffect, useRef, useState } from "react";
import { CardProps } from "../card";
import "./list.scss";
import { toast } from "react-toastify";

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

  return (
    <div className='list'>
      {/* (элементы загрузились) && (элементы !== undefined) && (длина массива > 0) */}
      {itemsLoaded &&
        _items !== undefined &&
        itemsLengthOverZero &&
        _items.map(s => (
          // всё равно перемешал :/
          <ListItemComponent
            key={s.seminar?.id}
            onDelete={dId => {
              setItems(prev => prev?.filter(s => s.seminar?.id !== dId));
              if (s.onDelete) s.onDelete(dId);
              toast(`Семинар #${s.seminar!.id} удален`, { type: "info" });
              const resetTimeout = setTimeout(() => {
                toast(`Семинар #${s.seminar!.id} не удален`, { type: "error" });
                setItems(prev => (prev ? [...prev, s] : [s]));
              }, 3000);
              // тут промис на удаление и если не удалится за 3000мс то таймаут resetTimeout сработает
            }}
            onEdit={s.onEdit}
            seminar={s.seminar}
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
