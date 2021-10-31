import React, { useEffect, useState } from "react";

const Table = ({ users, stateData, setCurrentPage }) => {
  var localUsers = users.slice(0);
  const [chunk, setChunk] = useState(users);

  const filter = (chunk) => {};

  useEffect(() => {
    console.log(stateData.currentPage - 1, stateData.currentPage);
    setChunk(localUsers.splice((stateData.currentPage - 1) * 50, 50));
  }, [stateData.currentPage]);

  useEffect(() => {
    if (stateData.searchText !== "") {
      filter(chunk);
    }
  }, [stateData.searchText]);

  return (
    <div>
      <ul>{JSON.stringify(chunk)}</ul>
    </div>
  );
};

export default Table;
