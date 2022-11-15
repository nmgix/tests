import { useState } from "react";
import { SearchPanel } from "../../components/SearchPanel";
import { DestinationSelection } from "../../types/BookData";
import Router from "next/router";
import classNames from "classnames";
import styles from "../../styles/pages/aviaSearch.module.scss";

const AviaSearch: React.FC<{}> = () => {
  const [destination, setDestination] = useState<DestinationSelection>({
    cityFrom: "",
    cityTo: "",
    timeFrom: new Date().toLocaleDateString("ru-RU").split(".").reverse().join("-"),
    timeTo: "",
  });

  const onSearch = () => {
    if (
      isNaN(Date.parse(destination.timeFrom)) ||
      (destination.timeTo.length > 0 && isNaN(Date.parse(destination.timeTo))) ||
      typeof destination.cityFrom !== "string" ||
      typeof destination.cityTo !== "string"
    ) {
      alert("Введены некорректные данные");
      return;
    } else {
      Router.push({
        pathname: "/avia/info",
        query: destination,
      });
    }
  };

  return (
    <div className={classNames(styles.aviaSearch)}>
      <SearchPanel destination={destination} setDestination={setDestination} onSearch={onSearch} />;
    </div>
  );
};

export default AviaSearch;
