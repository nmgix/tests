import React from "react";
import { Link } from "react-router-dom";

type Book = {
    kind: string,
    id: string,
    selfString: string,
    volumeInfo: {
        title: string,
        authors: string[]
    }
}

type BookShelfProps = {
    books: Book[]
}

const BookShelfBook: React.FC<Book> = ({ kind, id, selfString, volumeInfo }) => {
    return <Link className="book-shelf-book" key={id} to={id} replace={false}>
        
    </Link>
}

/**
 * Витрина книг, необходима для отрисовки книг по фильтру.
 * 
 * @returns {React.FC} Functional Component.
 */
export const BookShelf: React.FC<BookShelfProps> = ({ books }) => {
  return <div className="book-shelf">{books.map(book => <BookShelfBook {...book}/>)}</div>;
};
