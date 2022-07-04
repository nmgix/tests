import { Action } from ".";
import { GoogleBook, GoogleBooksAPIResults } from "../../types/GoogleBookTypes";
import { BooksTypes } from "../types/BookTypes";

type GetBooksSuccess = Action<typeof BooksTypes.GET_BOOKS_SUCCESS, GoogleBooksAPIResults>;
type AddBooks = Action<typeof BooksTypes.ADD_BOOKS, GoogleBooksAPIResults>;
type GetBooksError = Action<typeof BooksTypes.GET_BOOKS_ERROR, string>;
type ClearBooks = Action<typeof BooksTypes.CLEAR_BOOKS, void>;

export type BooksActions = GetBooksSuccess | AddBooks | GetBooksError | ClearBooks;
