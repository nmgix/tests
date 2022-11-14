import { useState } from "react";
import { SearchPanel } from "../../components/SearchPanel";
import { DestinationSelection } from "../../types/BookData";
import Router from "next/router";

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
      isNaN(Date.parse(destination.timeTo)) ||
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
    <div>
      <SearchPanel
        destination={destination}
        setDestination={setDestination}
        onSearch={onSearch}
        overrideStyles={{ marginTop: "68px" }}
        // composes не работает в scss modules
      />
      ;
    </div>
  );
};

export default AviaSearch;
