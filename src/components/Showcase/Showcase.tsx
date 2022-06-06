import "./_showcase.scss";
import { Sortbar } from "./Sortbar";
import { useState } from "react";

export type Book = {
  name: string;
  authorName: string;
  price: number;
  coverUrl: string;
  categoryId: number;
};

export const Showcase = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<Book[]>(books);
  const [asc, setAsc] = useState<boolean>(false); // сначала самые дорогие (desc)
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  const GetBooks = () => {
    return setBooks([]);
  };

  return (
    <div className='showcase'>
      <Sortbar
        books={sortedBooks}
        setSortedBooks={setSortedBooks}
        setCurrentCategory={setCurrentCategory}
        asc={asc}
        setAsc={setAsc}
      />
      <div className='book-list'>
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book, i) => (
            <div className='book' key={i}>
              <img
                src={book.coverUrl}
                alt={`Обложка книги ${book.name} авторства ${book.authorName}`}
                draggable={false}
              />
              <div className='book-info'>
                <p>{book.name}</p>
                <div className='book-priceinfo'>
                  <span>
                    <h3>{book.price}</h3> руб.
                  </span>
                  <button>В корзину</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className='helper-text'>Нет книг</h1>
        )}
      </div>
    </div>
  );
};
