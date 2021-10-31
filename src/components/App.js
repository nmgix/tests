import { useEffect, useState } from "react";

import data from "../utils/users.json";

import Table from "./Table";
import HelpBar from "./HelpBar";

function App() {
  const [users, setUsers] = useState(data);
  const usersCount = users.length;
  const [currentPage, setCurrentPage] = useState(1); //текущая страница //максимум 50 на страницу
  const [currentColumn, setCurrentColumn] = useState(null); //по возрастанию //null - нет сортировки, 1,2,3,4,5 - это будут поля, просто вместо текста цифры
  const [ascendingSort, setAscendingSort] = useState(false); //по возрастанию

  useEffect(() => {
    console.log(
      `
    currentPage = ${currentPage}
    currentColumn = ${currentColumn}
    ascendingSort = ${ascendingSort}
    `
    );
  }, [currentPage, currentColumn, ascendingSort]);

  return (
    <div className='App'>
      <HelpBar
        stateData={{ currentPage, currentColumn, ascendingSort, usersCount }}
        setCurrentPage={setCurrentPage}
        setCurrentColumn={setCurrentColumn}
        setAscendingSort={setAscendingSort}
      />
      <Table users={users} />
    </div>
  );
}

export default App;
