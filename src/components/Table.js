import React, { useEffect, useState } from "react";

const Table = ({ users, stateData, setCurrentPage }) => {
  const [chunk, setChunk] = useState([]); //чанк, 50 юзеров, если он очищается - удаляется 50 юзеров и стейта, от которого он зависим

  useEffect(() => {
    setChunk(users.slice(0).splice((stateData.currentPage - 1) * 50, 50));
  }, [stateData.currentPage, users]);

  return (
    <div>
      <ul>{JSON.stringify(chunk)}</ul>
    </div>
  );
};

export default Table;
