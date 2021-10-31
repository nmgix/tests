import { useEffect, useState, useCallback } from "react";

import data from "../utils/users.json";

import Table from "./Table";
import HelpBar from "./HelpBar";
import SortingBar from "./SortingBar";

function App() {
  const [users, setUsers] = useState(data.slice(0));
  const usersCount = users.length;
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //текущая страница //максимум 50 на страницу

  const [currentColumn, setCurrentColumn] = useState(null); //по возрастанию //null - нет сортировки
  const [ascendingSort, setAscendingSort] = useState(false); //по возрастанию

  const filter = useCallback(
    (data) => {
      setCurrentPage(1);
      return setUsers(
        data.filter((el) => {
          for (const items in el) {
            if (typeof el[items] === "object") {
              for (const props in el[items]) {
                if (String(el[items][props]).toLowerCase().indexOf(String(searchText).toLowerCase()) !== -1) {
                  return true;
                }
              }
            } else {
              if (String(el[items]).toLowerCase().indexOf(String(searchText).toLowerCase()) !== -1) {
                return true;
              }
            }
          }
          return false;
        })
      );
    },
    [searchText]
  );

  useEffect(() => {
    if (searchText !== "") {
      filter(data);
    } else {
      setUsers(data);
    }
  }, [searchText, filter]);

  return (
    <div className='App'>
      <HelpBar
        stateData={{ currentPage, currentColumn, ascendingSort, usersCount, searchText }}
        setCurrentPage={setCurrentPage}
        setCurrentColumn={setCurrentColumn}
        setAscendingSort={setAscendingSort}
        setSearchText={setSearchText}
      />
      <SortingBar
        setCurrentColumn={setCurrentColumn}
        setAscendingSort={setAscendingSort}
        stateData={{ currentColumn, ascendingSort }}
      />
      <Table
        users={users}
        stateData={{ currentPage, currentColumn, ascendingSort, usersCount, searchText }}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
