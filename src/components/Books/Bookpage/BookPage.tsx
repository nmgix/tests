import axios from "axios";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../../redux/helpers/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { useAction } from "../../../redux/helpers/useAction";
import { useEffect, useState } from "react";
import { GoogleBook } from "../../../types/GoogleBookTypes";
import { Loader } from "../../Loader/Loader";

/**
 * Страница книги.
 * @returns {React.FC} Functional Component.
 */
export const BookPage: React.FC<{}> = () => {
  const params = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  // const { getBook } = useAction();
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
        getBook(params.bookId!).then((data) => setBook(data));
      } catch (e) {
        navigate("/");
      }
    }
  }, []);

  return (
    <div className='book-page'>
      <button onClick={() => navigate("/")}>Back to all books</button>
      {book ? <div className='book-page-content'>BookPage of {book.volumeInfo.title}</div> : <Loader />}
    </div>
  );
};
