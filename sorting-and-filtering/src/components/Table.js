import React, { useEffect, useState, useCallback } from "react";

const Table = ({ users, stateData: { currentColumn, ascendingSort, currentPage, searchText }, setCurrentPage }) => {
  const [chunk, setChunk] = useState([]); //чанк, 50 юзеров, если он очищается - удаляется 50 юзеров и стейта, от которого он зависим

  const formatSortedChunk = (chunk) => {
    var result = chunk.slice(0).sort((el1, el2) => {
      if (ascendingSort) {
        //по возрастанию
        try {
          return el1[currentColumn].localeCompare(el2[currentColumn]);
        } catch (e) {
          try {
            for (const props1 in el1) {
              if (typeof el1[props1] === "object") {
                for (const props2 in el2) {
                  if (typeof el2[props2] === "object") {
                    return el1[props1][currentColumn].localeCompare(el2[props2][currentColumn]);
                  }
                }
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        //по убыванию
        try {
          return el2[currentColumn].localeCompare(el1[currentColumn]);
        } catch (e) {
          try {
            for (const props1 in el1) {
              if (typeof el1[props1] === "object") {
                for (const props2 in el2) {
                  if (typeof el2[props2] === "object") {
                    return el2[props2][currentColumn].localeCompare(el1[props1][currentColumn]);
                  }
                }
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
    setChunk(result);
  };

  const formatChunk = useCallback(
    (users) => {
      setChunk(users.slice(0).splice((currentPage - 1) * 50, 50));
      if (currentColumn) {
        formatSortedChunk(users.slice(0).splice((currentPage - 1) * 50, 50));
      }
    },
    [currentPage, ascendingSort]
  );

  useEffect(() => {
    formatChunk(users);
  }, [currentPage, users, formatChunk, searchText, ascendingSort, currentColumn]);

  return (
    <div>
      <ul>{JSON.stringify(chunk)}</ul>
    </div>
  );
};

export default Table;
