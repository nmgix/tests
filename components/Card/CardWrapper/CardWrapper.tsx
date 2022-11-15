import classNames from "classnames";
import { BookData } from "../../../types/BookData";
import FlightContent from "../FlightContent/FlightContent";
import styles from "./CardWrapper.module.scss";

const CardWrapper: React.FC<{ book: BookData }> = ({ book }) => {
  const { routes } = book;

  return (
    <div className={classNames(styles.cardWrapper)}>
      <ul className={classNames(styles.cardWrapperContent)}>
        {routes.map((route, i) => (
          <li key={i}>
            <FlightContent {...route} />
            {routes.length > 1 && i !== 0 ? <div className={classNames(styles.separator)} /> : <></>}
          </li>
        ))}
      </ul>
      <h3 className={classNames(styles.cardWrapperPrice)}>
        {routes.reduce((acc, curr) => acc + curr.priceInformation.price, 0)}{" "}
        {routes[0].priceInformation.currency === "RUB" ? "₽" : "$"}
      </h3>
    </div>
  );
};

export default CardWrapper;
