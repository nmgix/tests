import classNames from "classnames";
import { Input } from "../Usual/Input";
import styles from "./SearchPanel.module.scss";
import { DestinationSelection } from "../../types/BookData";
import { Button } from "../Usual/Button";
import { CSSProperties } from "react";

export const SearchPanel: React.FC<{
  destination: DestinationSelection;
  setDestination: React.Dispatch<React.SetStateAction<DestinationSelection>>;
  onSearch: (x: any) => any;
  overrideStyles?: CSSProperties;
}> = ({ destination, setDestination, onSearch, overrideStyles }) => {
  const updateDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination({ ...destination, [e.target.name]: e.target.value.slice(0, 20) });
  };

  return (
    <div className={classNames(styles.searchPanel)} style={overrideStyles}>
      <div className={classNames(styles.destinationBlock)}>
        <div className={classNames(styles.inputsWrapper)}>
          <div className={classNames(styles.labelWrapper)}>
            <Input
              label='Откуда'
              placeholder='Город вылета'
              name='cityFrom'
              onChange={updateDestination}
              value={destination.cityFrom}
              textMin={1}
              textMax={20}
            />
          </div>
          <div className={classNames(styles.labelWrapper)}>
            <Input
              label='Куда'
              placeholder='Город прилёта'
              name='cityTo'
              onChange={updateDestination}
              value={destination.cityTo}
              textMin={1}
              textMax={20}
            />
          </div>
        </div>
        <div className={classNames(styles.inputsConnection, styles.inputsWrapper)}>
          <div className={classNames(styles.labelWrapper)}>
            <Input
              type='date'
              label='Туда'
              name='timeFrom'
              onChange={updateDestination}
              value={destination.timeFrom}
              dateMax={destination.timeTo}
            />
          </div>
          <div className={classNames(styles.labelWrapper)}>
            <Input
              type='date'
              label='Обратно'
              name='timeTo'
              onChange={updateDestination}
              value={destination.timeTo}
              dateMin={destination.timeFrom}
            />
          </div>
          <div className={classNames(styles.line)} />
        </div>
      </div>
      <div className={classNames(styles.controlBlock)}>
        <Button onClick={onSearch}>Найти билеты</Button>
      </div>
    </div>
  );
};
