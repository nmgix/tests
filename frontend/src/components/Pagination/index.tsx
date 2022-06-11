import React, { useEffect, useState } from "react";
import "./pagination.scss";

const Pagnation: React.FC<{ totalColumns: number; currentPage: number; limit: number; setPage: React.Dispatch<any> }> =
  ({ limit, currentPage, setPage, totalColumns }) => {
    const [pages, setPages] = useState<number[]>([]);
    const calculatePages = (): number[] => {
      var result: number[] = [];
      for (var i = 1; i <= totalColumns / limit + 1; i++) {
        result.push(i);
      }
      return result;
    };

    useEffect(() => {
      setPages(calculatePages());
    }, [totalColumns]);

    return (
      <ul className='pagination'>
        {pages.map((page) => (
          <li key={page}>
            <button onClick={() => setPage(page)}>{page}</button>
          </li>
        ))}
      </ul>
    );
  };

export default Pagnation;
