import React, { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import axios from "axios";
import Columns from "./components/Columns";
import Pagnation from "./components/Pagination";

export type CargoItem = {
  date: Date;
  name: string;
  distance: number;
  count: number;
  id?: number;
};

function App() {
  const [columnData, setColumnData] = useState<CargoItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const getData = async (page: number) => {
    const res = await axios.get<CargoItem[]>(`/api/cargo?limit=5&page=${page}`);
    console.log(res);
    setColumnData(res.data);
  };

  useEffect(() => {
    getData(currentPage);
  }, []);

  return (
    <div className='App'>
      {columnData.length > 0 ? (
        <NavigationBar availableColumns={Object.keys(columnData[0]).filter((field) => field != ("id" || "date"))} />
      ) : (
        <></>
      )}
      <Columns />
      <Pagnation />
    </div>
  );
}

export default App;
