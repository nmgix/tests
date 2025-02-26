import { Children, useEffect, useRef, useState } from "react";
import { CardProps, Card } from "../card";
import "./list.scss";

export type ListProps = {
  items: CardProps[] | null | undefined;
  preloadSekeletonAmount: number;
  timeout: number;
};

export const CardList = ({ items, preloadSekeletonAmount = 5, timeout = 3000 }: ListProps) => {
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
      {itemsLoaded && !!_items && itemsLengthOverZero && _items.map(card => <Card {...card} key={card.seminar?.id} loading={false} />)}
      {/* (элементы не загрузились) && (элементы == undefined) */}
      {!itemsLoaded && !_items && Children.map(Array(preloadSekeletonAmount).fill(null), (_, i) => <Card seminar={null} loading={false} key={i} />)}
      {/* (элементы загрузились) && (длина массива == 0), если черезе props.timeout items останутся undefined, то _items присвоится пустой массив и выставится itemsLoaded == false */}
      {!!_items && !itemsLengthOverZero && <span className='list-nothing-to-show'>нечего показывать</span>}
    </div>
  );
};
CardList.displayName = "List";
