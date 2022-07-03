import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { bookStore } from "../../../store/books.store";
import { searchStore } from "../../../store/search.store";
import { GoogleBook } from "../../../types/GoogleBookTypes";
import "./_bookShelf.scss";

const BookShelfBook: React.FC<GoogleBook> = ({
  accessInfo,
  etag,
  id,
  kind,
  layerInfo,
  saleInfo,
  selfLink,
  volumeInfo,
}) => {
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
};

/**
 * Витрина книг, необходима для отрисовки книг по фильтру.
 *
 * @returns {React.FC} Functional Component.
 */
export const BookShelf: React.FC<{}> = observer(() => {
  useEffect(() => {
    bookStore.searchBooks("A", searchStore.searchState.category, searchStore.searchState.sortBy);
  }, []);

  useEffect(() => {
    console.log(bookStore.books);
  }, [bookStore.books]);

  return (
    <div className='book-shelf'>
      {bookStore.error ? (
        <h4 className='book-shelf-error'>{bookStore.error}</h4>
      ) : (
        <>
          <div className='book-shelf-shelves'>
            {toJS(bookStore.books).map((book) => {
              return <BookShelfBook {...book} key={book.id} />;
            })}
          </div>
          <button
            className='book-shelf-load-more'
            onClick={() =>
              bookStore.searchBooks(
                searchStore.searchState.searchString,
                searchStore.searchState.category,
                searchStore.searchState.sortBy,
                bookStore.books.length,
                "add"
              )
            }>
            Load more
          </button>
        </>
      )}
    </div>
  );
});
