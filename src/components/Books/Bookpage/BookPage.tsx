import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../../redux/helpers/useTypedSelector";

/**
 * Страница книги.
 * @returns {React.FC} Functional Component.
 */

export const BookPage = () => {
  const params = useParams<{ bookId: string }>();
  console.log(params);
  const { state, error } = useTypedSelector((state) => state.books);

  return <div>BookPage</div>;
};
