import React, { useCallback, useEffect, useState } from "react";
import "./pagination.scss";

const Pagination: React.FC<{
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

    // если кол-во страниц слева от текущей страницы меньше чем половина лимита)
    if (leftPages.length < halfLimit) {
      for (var i = 1; i < halfLimit - leftPages.length + 1; i++) {
        var futurePageI = pages[pages.indexOf(currentPage) + toInteger(paginationPagesLimit) - halfLimit + i];
        if (futurePageI !== undefined) {
          tempArr.push(futurePageI);
        }
      }
    }

    // если кол-во страниц справа от текущей страницы меньше чем половина лимита)
    if (rightPages.length < halfLimit) {
      for (var j = 1; j < halfLimit - rightPages.length + 1; j++) {
        var futurePageJ = pages[pages.indexOf(currentPage) - toInteger(paginationPagesLimit) + halfLimit - j];
        if (futurePageJ !== undefined) {
          tempArr.unshift(futurePageJ);
        }
      }
    }

    // сделано чтобы при добавлении страниц слева убиралась одна и туда вставала стрелка назад
    if (pages.indexOf(tempArr[0]) !== 0) {
      tempArr.shift();
    }
    // сделано чтобы при добавлении страниц справа убиралась одна и туда вставала стрелка вперед
    if (pages.indexOf(tempArr[tempArr.length - 1]) !== pages.indexOf(pages[pages.length - 1])) {
      tempArr.pop();
    }

    setCurrentRenderPages(tempArr);
  }, [pages, currentPage, paginationPagesLimit]);

  return (
    <ul className='pagination'>
      {/* если индекс последней страницы в списке текущих страниц равен первому в списке всех страниц */}
      {/* и длина списка текущих страниц равна лимиту пагинации (иначе всего страниц меньше чем лимит пагинации)  */}
      {pages.indexOf(currentRenderPages[0]) !== 0 && currentRenderPages.length === paginationPagesLimit ? (
        <li>
          <button onClick={() => setPage(currentRenderPages[0] - 1)}>{"<-"}</button>
        </li>
      ) : (
        <></>
      )}

      {currentRenderPages.map((page, i) => (
        <li key={i}>
          {/* вот это плохо, лучше i не ставить в ключ */}
          <button
            key={page}
            onClick={() => (page === currentPage ? null : setPage(page))}
            className={page === currentPage ? "active" : ""}>
            {page}
          </button>
        </li>
      ))}

      {/* если индекс последней страницы в списке текущих страниц не равен последнему в списке всех страниц */}
      {/* и длина списка текущих страниц равна лимиту пагинации (иначе всего страниц меньше чем лимит пагинации)  */}
      {pages.indexOf(currentRenderPages[currentRenderPages.length - 1]) !== pages.indexOf(pages[pages.length - 1]) &&
      currentRenderPages.length === paginationPagesLimit ? (
        <li key={currentRenderPages[currentRenderPages.length - 1]}>
          <button onClick={() => setPage(currentRenderPages[currentRenderPages.length - 1] + 1)}>{"->"}</button>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Pagination;
