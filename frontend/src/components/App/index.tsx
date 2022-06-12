import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import axios from "axios";
import Columns from "../Columns";
import Pagnation from "../Pagination";
import "./app.scss";
import { CargoItem, CompareType, filterOptions } from "../../types";

const settings = {
  rowsPerTable: 10,
  paginationPages: 8,
};

function App() {
  const [columnData, setColumnData] = useState<CargoItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortedArray, setSortedArray] = useState<CargoItem[]>([]);
  const getData = useCallback(async () => {
    const res = await axios.get<CargoItem[]>(`/api/cargo?limit=5&page=${currentPage}`);
    setColumnData(res.data);
    console.log(Object.keys(res.data[0]).filter((field) => field !== "id" && field !== "date"));
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='App'>
      {columnData.length > 0 ? (
        <>
          <NavigationBar
            availableColumns={Object.keys(columnData[0]).filter((field) => field !== "id" && field !== "date")}
            filterOptions={filterOptions}
            array={columnData}
            updateArray={setSortedArray}
          />
          <Columns
            data={sortedArray.length > 0 ? sortedArray : columnData}
            currentPage={currentPage}
            limit={settings.rowsPerTable}
          />
          <Pagnation
            currentPage={currentPage}
            limit={settings.rowsPerTable}
            paginationPagesLimit={settings.paginationPages}
            setPage={setCurrentPage}
            totalColumns={columnData.length}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
