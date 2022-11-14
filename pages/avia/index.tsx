import { useState } from "react";
import { SearchPanel } from "../../components/SearchPanel";
import { DestinationSelection } from "../../types/BookData";

const AviaSearch: React.FC<{}> = () => {
  const [destination, setDestination] = useState<DestinationSelection>({
    cityFrom: "",
    cityTo: "",
    timeFrom: new Date().toLocaleDateString("ru-RU").split(".").reverse().join("-"),
    timeTo: "",
  });

  const onSearch = () => {};

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
