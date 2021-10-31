import React, { useEffect, useState, useCallback } from "react";

const Table = ({ users, stateData: { currentColumn, ascendingSort, currentPage }, setCurrentPage }) => {
  const [chunk, setChunk] = useState([]); //чанк, 50 юзеров, если он очищается - удаляется 50 юзеров и стейта, от которого он зависим

  const formatChunk = useCallback(
    (users) => {
      setChunk(users.slice(0).splice((currentPage - 1) * 50, 50));
    },
    [currentPage]
  );

  useEffect(() => {
    formatChunk(users);
  }, [currentPage, users, formatChunk]);

  useEffect(() => {
    // setChunk(
    if (!currentColumn) {
      return formatChunk(users);
    }
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
            //return el1[props1][currentColumn].localeCompare(el2[props2][currentColumn]);
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
    // );
  }, [currentPage, users, currentColumn, ascendingSort]);

  return (
    <div>
      <ul>{JSON.stringify(chunk)}</ul>
    </div>
  );
};

export default Table;

// for (const items in el1) {
//   if (typeof el1[items] === "object") {
//     if (Object.keys(el1[items]) === currentColumn) {
//       return el1[items][currentColumn].localeCompare(el2[items][currentColumn]);
//     }
//     // for (const props in el[items]) {
//     //   // if (el[items][props]) {
//     //   //   return true;
//     //   // }
//     // }
//   } else {
//     // if (el[items]) {
//     //   return true;
//     // }
//   }
// }
