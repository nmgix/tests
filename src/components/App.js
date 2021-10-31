import { useEffect, useState } from "react";

import data from "../utils/users.json";

import Table from "./Table";
import HelpBar from "./HelpBar";

function App() {
  const [users, setUsers] = useState(data.slice(0));
  const usersCount = users.length;
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //текущая страница //максимум 50 на страницу
  const [currentColumn, setCurrentColumn] = useState(null); //по возрастанию //null - нет сортировки, 1,2,3,4,5 - это будут поля, просто вместо текста цифры
  const [ascendingSort, setAscendingSort] = useState(false); //по возрастанию

  const filter = (data) => {
    setCurrentPage(1);
    setUsers(
      data.filter((el) => {
        for (const items in el) {
          if (typeof el[items] === "object") {
            for (const props in el[items]) {
              // console.log(el[items][props]);
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
      })
    );
  };

  useEffect(() => {
    if (searchText != "") {
      filter(data);
    } else {
      setUsers(data);
    }
  }, [searchText]);

  return (
    <div className='App'>
      <HelpBar
        stateData={{ currentPage, currentColumn, ascendingSort, usersCount, searchText }}
        setCurrentPage={setCurrentPage}
        setCurrentColumn={setCurrentColumn}
        setAscendingSort={setAscendingSort}
        setSearchText={setSearchText}
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
