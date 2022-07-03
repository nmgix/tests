import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import { bookStore } from "../../../store/books.store";

/**
 * Страница книги.
 * @returns {React.FC} Functional Component.
 */

export const BookPage = observer(() => {
  const params = useParams<{ bookId: string }>();
  console.log(params)
  console.log(bookStore.books)
  console.log(bookStore.books.find(book => book.id === params.bookId))

  return <div>BookPage</div>;
});
