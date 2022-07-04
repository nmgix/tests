import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAction } from "../../../redux/helpers/useAction";
import { useTypedSelector } from "../../../redux/helpers/useTypedSelector";
import { GoogleBook } from "../../../types/GoogleBookTypes";
import { Loader } from "../../Loader/Loader";
import "./_bookShelf.scss";

const BookShelfBook: React.FC<GoogleBook> = React.memo(
  ({ accessInfo, id, kind, layerInfo, volumeInfo }) => {
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
        <span className='book-author'>{volumeInfo.authors ? volumeInfo.authors.join(", ") : volumeInfo.publisher}</span>
      </Link>
    );
  },
  (prev, next) => prev.id === next.id
);

/**
 * Витрина книг, необходима для отрисовки книг по фильтру.
 *
 * @returns {React.FC} Functional Component.
 */
export const BookShelf: React.FC<{}> = () => {
  const { searchBooks } = useAction();

  const { books, search } = useTypedSelector((state) => state);

  useEffect(() => {
    if (books.state.items.length === 0) {
      searchBooks("Terminator", search.state.category, search.state.sortBy);
    }
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
                {books.state.items.map((book) => {
                  return <BookShelfBook {...book} key={book.id} />;
                })}
              </div>
              {books.loading ? (
                <Loader />
              ) : (
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
