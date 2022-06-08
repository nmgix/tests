import "./_showcase.scss";
import axios from "axios";
import { Sortbar } from "./Sortbar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Context";
import { AddItem } from "../../store/ActionCreators";

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
  const { dispatch } = useContext(Context);

  const GetBooks = async () => {
    const res = await axios.get("http://45.8.249.57/bookstore-api/books");

    return setBooks(res.data);
  };

  useEffect(() => {
    GetBooks();
  }, []);
  useEffect(() => {
    setSortedBooks(books);
  }, [books]);

  const getId = (imageUrl: string): string => {
    // eslint-disable-next-line
    const regExp = /[^\/]+$/g;

    var findResult = imageUrl.search(regExp);
    var result = imageUrl.slice(findResult);

    return result.replace('.webp"', "");
  };

  return (
    <div className='showcase'>
      <Sortbar
        books={books}
        sortedBooks={sortedBooks}
        setSortedBooks={setSortedBooks}
        setCurrentCategory={setCurrentCategory}
        asc={asc}
        setAsc={setAsc}
        currentCaterogy={currentCategory}
      />
      <div className='book-list'>
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book, i) => (
            <div className='book' key={i}>
              <img src={book.coverUrl} alt='' draggable={false} />
              <div className='book-info'>
                <h3>{book.name}</h3>
                <div className='book-priceinfo'>
                  <span>
                    <h3>{book.price}</h3> руб.
                  </span>
                  <button
                    className='button-main button-x'
                    onClick={() =>
                      AddItem(dispatch, {
                        id: getId(book.coverUrl),
                        count: 1,
                        price: book.price,
                        title: book.name,
                      })
                    }>
                    В корзину
                  </button>
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
