import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useAction } from "@store/helpers/useAction";
import { useTypedSelector } from "@store/helpers/useTypedSelector";
import { GoogleBook } from "@appTypes/GoogleBookTypes";
import { Loader } from "@components/Loader/Loader";
import "./_bookShelf.scss";

/**
 * Элемент книга для отрисовки в компоненте BookShelf.
 *
 * @param id - id книги в реестре Google Books API, необходим для перехода на страницу этой книги.
 * @param volumeInfo - информация о книге, ссылки на изображение обложки.
 *
 * @returns {React.FC} Функциональный компонент.
 */
const BookShelfBook: React.FC<GoogleBook> = React.memo(
  ({ id, volumeInfo }) => {
    return (
      <Link className='book-shelf-book' to={`/book/${id}`} replace={false}>
        <div className='book-cover'>
          {volumeInfo.imageLinks ? (
            <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} draggable={false} />
          ) : (
            <div className='book-cover-missing'></div>
          )}
        </div>
        {volumeInfo.categories ? <span className='book-category'>{volumeInfo.categories.join(", ")}</span> : <></>}
        <h3 className='book-title'>
          {volumeInfo.title.length > 50 ? `${volumeInfo.title.slice(0, 50)}...` : volumeInfo.title}
        </h3>
        <span className='book-author'>
          {volumeInfo.authors ? volumeInfo.authors[0] : volumeInfo.publisher ? volumeInfo.publisher : <></>}
        </span>
      </Link>
    );
  },
  (prev, next) => prev.id === next.id
);

/**
 * Витрина книг, необходима для отрисовки книг по фильтру.
 *
 * @returns {React.FC} Функциональный компонент.
 */
export const BookShelf: React.FC<{}> = () => {
  const { searchBooks } = useAction();

  const { books, search } = useTypedSelector((state) => state);

  useLayoutEffect(() => {
    if (books.state.items.length === 0) {
      searchBooks(search.state.searchString, search.state.category, search.state.sortBy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='book-shelf'>
      {books.error ? (
        <h4 className='book-shelf-error'>{books.error}</h4>
      ) : (
        <>
          {books.loading && books.state.items.length === 0 ? (
            <Loader />
          ) : (
            <>
              <h3>Found {books.state.totalItems} results</h3>
              <div className='book-shelf-shelves'>
                {books.state.items.map((book, i) => {
                  return <BookShelfBook {...book} key={book.etag} />;
                })}
              </div>
              {books.loading ? (
                <Loader />
              ) : books.state.totalItems > books.state.items.length && books.state.items.length % 30 === 0 ? (
                <button
                  className='book-shelf-load-more'
                  onClick={() =>
                    searchBooks(
                      search.state.searchString,
                      search.state.category,
                      search.state.sortBy,
                      books.state.items.length + 1,
                      "add"
                    )
                  }>
                  Load more
                </button>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
