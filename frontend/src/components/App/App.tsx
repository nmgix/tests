import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import axios from "axios";
import Columns from "../Columns";
import Pagnation from "../Pagination";
import "./app.scss";

export type CargoItem = {
  date: Date;
  name: string;
  distance: number;
  count: number;
  id?: number;
};

export type CompareType = {
  text: string;
  option: number;
};

function App() {
  const filterOptions: CompareType[] = [
    {
      text: "Не выбрано",
      option: 0,
    },
    {
      text: "Меньше",
      option: 1,
    },
    {
      text: "Больше",
      option: 2,
    },
    {
      text: "Равно",
      option: 3,
    },
    {
      text: "Содержит",
      option: 4,
    },
  ];
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
        <>
          <NavigationBar
            availableColumns={Object.keys(columnData[0]).filter((field) => field != ("id" || "date"))}
            filterOptions={filterOptions}
          />
          <Columns data={columnData} />
          <Pagnation />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
