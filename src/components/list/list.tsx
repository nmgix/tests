import { Children, JSX, useEffect, useState } from "react";
import { CardProps } from "../card";
import "./list.scss";

export type ListProps<ChildProps = CardProps> = {
  items: ChildProps[] | undefined;
  preloadSekeletonAmount: number;
  timeout: number;
  ListItemComponent: (props: ChildProps) => JSX.Element;
  LoadingListItemComponent: (props: ChildProps) => JSX.Element;
};

export const List = ({ items, ListItemComponent, LoadingListItemComponent, preloadSekeletonAmount = 5, timeout = 3000 }: ListProps) => {
  const itemsLengthOverZero = items ? items.length > 0 : false;
  const [itemsLoaded, setItemsLoaded] = useState(false);

  const [_items, setItems] = useState(items); // обновлять список их карточек внутри
  useEffect(() => {
    setItems(items);
  }, [items]); // если извне обновляется список
  useEffect(() => {
    if (items === undefined) {
      setTimeout(() => {
        setItemsLoaded(false);
        setItems([]);
      }, timeout);
    } else {
      setItemsLoaded(true);
    }
  }, [items]); // чтобы если items === undefined больше 3сек, то ставить setItemsLoaded = false

  return (
    <div className='list'>
      {/* (элементы загрузились) && (элементы !== undefined) && (длина массива > 0) */}
      {itemsLoaded &&
        _items !== undefined &&
        itemsLengthOverZero &&
        _items.map(s => (
          <ListItemComponent
            key={s.seminar?.id}
            onDelete={dId => {
              setItems(prev => prev?.filter(s => s.seminar?.id !== dId));
              if (s.onDelete) s.onDelete(dId);
            }}
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
