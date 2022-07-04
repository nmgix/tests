import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../../redux/helpers/useTypedSelector";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Страница книги.
 * @returns {React.FC} Functional Component.
 */

export const BookPage: React.FC<{}> = () => {
  const params = useParams<{ bookId: string }>();
  const { state } = useTypedSelector((state) => state.books);

  const book = state.items.find((item) => item.id === params.bookId);
  if (!book) {
    return <Navigate to='/' />;
  } else {
    return <div>BookPage of {book.volumeInfo.title}</div>;
  }
};
