import React, { useCallback, useEffect, useState } from "react";
import "./pagination.scss";

const Pagnation: React.FC<{
  totalColumns: number;
  currentPage: number;
  limit: number;
  paginationPagesLimit: number;
  setPage: React.Dispatch<any>;
}> = ({ limit, currentPage, paginationPagesLimit, setPage, totalColumns }) => {
  const [pages, setPages] = useState<number[]>([]);
  const calculatePages = useCallback((): number[] => {
    var result: number[] = [];
    for (var i = 1; i <= totalColumns / limit + 1; i++) {
      result.push(i);
    }
    return result;
  }, [limit, totalColumns]);
  useEffect(() => {
    setPages(calculatePages());
  }, [totalColumns, calculatePages]);

  const toInteger = (num: number) => {
    return num % 2 === 0 ? num : num - 1;
  };
  const [currentRenderPages, setCurrentRenderPages] = useState<number[]>([]);
  useEffect(() => {
    var leftPages = pages.slice(0, pages.indexOf(currentPage));
    var rightPages = pages.slice(pages.indexOf(currentPage), pages.length - 1);
    var halfLimit = toInteger(paginationPagesLimit) / 2;
    var tempArr: number[] = pages.filter(
      (page) =>
        page === currentPage ||
        (pages.indexOf(page) < pages.indexOf(currentPage) + halfLimit + 1 &&
          pages.indexOf(page) > pages.indexOf(currentPage) - halfLimit - 1)
    );

    if (leftPages.length < halfLimit) {
      for (var i = 1; i < halfLimit - leftPages.length + 1; i++) {
        tempArr.push(pages[pages.indexOf(currentPage) + toInteger(paginationPagesLimit) - halfLimit + i]);
      }
    }
    if (rightPages.length < halfLimit) {
      for (var j = 1; j < halfLimit - rightPages.length + 1; j++) {
        tempArr.unshift(pages[pages.indexOf(currentPage) - toInteger(paginationPagesLimit) + halfLimit - j]);
      }
    }
    if (pages.indexOf(tempArr[0]) !== 0) {
      tempArr.shift();
    }
    if (pages.indexOf(tempArr[tempArr.length - 1]) !== pages.indexOf(pages[pages.length - 1])) {
      tempArr.pop();
    }

    setCurrentRenderPages(tempArr);
  }, [pages, currentPage, paginationPagesLimit]);

  return (
    <ul className='pagination'>
      {pages.indexOf(currentRenderPages[0]) !== 0 ? (
        <li>
          <button onClick={() => setPage(currentRenderPages[0] - 1)}>{"<-"}</button>
        </li>
      ) : (
        <></>
      )}
      {currentRenderPages.map((page) => (
        <li key={page}>
          <button
            onClick={() => (page === currentPage ? null : setPage(page))}
            className={page === currentPage ? "active" : ""}>
            {page}
          </button>
        </li>
      ))}
      {pages.indexOf(currentRenderPages[currentRenderPages.length - 1]) !== pages.indexOf(pages[pages.length - 1]) ? (
        <li>
          <button onClick={() => setPage(currentRenderPages[currentRenderPages.length - 1] + 1)}>{"->"}</button>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Pagnation;
