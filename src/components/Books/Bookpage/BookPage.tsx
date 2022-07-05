import axios from "axios";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "@store/helpers/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleBook } from "@appTypes/GoogleBookTypes";
import { Loader } from "@components/Loader/Loader";
import "./_bookPage.scss";

/**
 * Страница книги.
 * Информация о книге подгружается запросом на сервер Google с `bookId`.
 *
 * @param bookId - айди книги в реестре Google Books API, приходит с `url`.
 *
 * @returns {React.FC} Функциональный компонент.
 */
export const BookPage: React.FC<{}> = () => {
  const params = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { state } = useTypedSelector((state) => state.books);
  const [book, setBook] = useState<GoogleBook | null>(null);

  const getBook = async (bookId: string): Promise<GoogleBook> => {
    const res = await axios.get<GoogleBook>(`${process.env.REACT_APP_GOOGLE_BOOKS_URL}/${bookId}`);
    return res.data;
  };

  useEffect(() => {
    var bookInState = state.items.find((item) => item.id === params.bookId);
    if (bookInState) {
      setBook(bookInState);
    } else {
      try {
        getBook(params.bookId!).then((data) => {
          setBook(data);
        });
      } catch (e) {
        navigate("/");
      }
    }
  }, []);

  return (
    <div className='book-page'>
      {book ? (
        <>
          {book.volumeInfo.imageLinks ? (
            <div className='book-page-image book-cover'>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} draggable={false} />
            </div>
          ) : (
            <></>
          )}
          <div className='book-page-information'>
            <div className='book-page-information-header'>
              <span className='book-page-information-header-category'>
                {book.volumeInfo.categories ? (
                  <span className='book-category'>{book.volumeInfo.categories.join(", ")}</span>
                ) : (
                  <></>
                )}
              </span>
              <h2 className='book-page-information-header-title'>{book.volumeInfo.title}</h2>
              <h4 className='book-page-information-header-author'>
                {book.volumeInfo.authors ? (
                  book.volumeInfo.authors.join(", ")
                ) : book.volumeInfo.publisher ? (
                  book.volumeInfo.publisher
                ) : (
                  <></>
                )}
              </h4>
            </div>
            <div className='book-page-information-description'>
              <span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
