import { GoogleBooksAPIResults } from "../../appTypes/GoogleBookTypes";

export enum BooksTypes {
  GET_BOOKS = "GET_BOOKS",
  GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS",
  ADD_BOOKS = "ADD_BOOKS",
  GET_BOOKS_ERROR = "GET_BOOKS_ERROR",
  CLEAR_BOOKS = "CLEAR_BOOKS",
}

export type BooksListState = {
  state: GoogleBooksAPIResults;
  loading: boolean;
  error?: string | null;
};
