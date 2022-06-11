import React, { ReactFragment, useEffect, useState } from "react";
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

    /**
     * функция для рендера правильной схемы отображения чисел при различных условиях
     * @param {number} currentPagesLimit - Четное число ограничивающее максимальное количество кнопок страниц в пагинации
     * @returns
     */
    const RenderTemplate: React.FC<{
      pages: number[];
      currentPage: number;
      setCurrentPage: React.Dispatch<any>;
      currentPagesLimit: number;
    }> = ({ pages, currentPage, setCurrentPage, currentPagesLimit }) => {
      var resultElement = <></>;

      // если количество страниц меньше или равно лимиту пагинации до включения стрелок
      if (pages.length <= currentPagesLimit + 1) {
        resultElement = (
          <>
            {pages.map((page) => (
              <li key={page}>
                <button onClick={() => setPage(page)}>{page}</button>
              </li>
            ))}
          </>
        );
        // если количество страниц больше лимита, но текущая страница не дошла до границы
      } else if (pages.length > currentPagesLimit + 1 && currentPage < currentPagesLimit) {
        resultElement = (
          <>
            {pages.slice(0, currentPagesLimit).map((page) => (
              <li key={page}>
                <button onClick={() => setPage(page)}>{page}</button>
              </li>
            ))}
            <li>
              <button onClick={() => setCurrentPage(currentPagesLimit + 1)}>{`->`}</button>
            </li>
          </>
        );
        // если текущая страница находится в лимите последних страниц (например последние 10 страниц)
      } else if (currentPage > pages.length - currentPagesLimit - 1) {
        resultElement = (
          <>
            <li>
              <button onClick={() => setCurrentPage(pages.length - currentPagesLimit - 1)}>{`<-`}</button>
            </li>
            {pages.slice(pages.length, -currentPagesLimit).map((page) => (
              <li key={page}>
                <button onClick={() => setPage(page)}>{page}</button>
              </li>
            ))}
          </>
        );
        // если текущая страница находится в середине пагинации
      } else {
        resultElement = (
          <>
            <li>
              <button onClick={() => setCurrentPage(currentPage - currentPagesLimit / 2 - 1)}>{`<-`}</button>
            </li>

            {pages.slice(currentPage - currentPagesLimit / 2, currentPage + currentPagesLimit / 2).map((page) => (
              <li key={page}>
                <button onClick={() => setPage(page)}>{page}</button>
              </li>
            ))}
            <li>
              <button onClick={() => setCurrentPage(currentPage + currentPagesLimit / 2 + 1)}>{`->`}</button>
            </li>
          </>
        );
      }

      return resultElement;
    };

    return (
      <ul className='pagination'>
        <RenderTemplate currentPage={currentPage} currentPagesLimit={limit} setCurrentPage={setPage} pages={pages} />
      </ul>
    );
  };

export default Pagnation;
