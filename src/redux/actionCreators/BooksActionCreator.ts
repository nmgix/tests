import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { GoogleBooksAPIResults } from "@appTypes/GoogleBookTypes";
import { PresetCategories, SortBy } from "@appTypes/SearchTypes";
import { BooksActions } from "../actions/booksAction";
import { RootState } from "../reducers";
import { BooksTypes } from "../types/BookTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const searchBooks =
  (
    searchString: string,
    category: keyof typeof PresetCategories,
    sortBy: keyof typeof SortBy,
    fromIndex: number = 0,
    mode: "add" | "change" = "change",
    limit: number = Number(process.env.REACT_APP_MAX_RESULTS!)
  ): ThunkAction<Promise<void>, {}, RootState, BooksActions> =>
  async (dispatch: Dispatch<BooksActions>) => {
    try {
      dispatch({
        type: BooksTypes.GET_BOOKS,
      });

      if (category === "all" && searchString.length === 0) {
        dispatch({
          type: BooksTypes.GET_BOOKS_ERROR,
          payload: "Пустой запрос!",
        });
      } else {
        const res = await axios.get<GoogleBooksAPIResults>(
          `${process.env.REACT_APP_GOOGLE_BOOKS_URL}?q=${searchString.replace(" ", "+")}${
            category !== "all" ? `+subject:${category}` : ""
          }&orderBy=${sortBy}&startIndex=${fromIndex}&maxResults=${limit}&printType=books&key=${
            process.env.REACT_APP_GOOGLE_API
          }`,
          config
        );
        // &filter=full

        if (res.status === 403 || res.status === 400) {
          dispatch({
            type: BooksTypes.GET_BOOKS_ERROR,
            payload: "Книги не найдены! Попробуйте другой запрос!",
          });
        }

        if (mode === "add") {
          dispatch({
            type: BooksTypes.ADD_BOOKS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: BooksTypes.GET_BOOKS_SUCCESS,
            payload: res.data,
          });
        }
      }
    } catch {
      dispatch({
        type: BooksTypes.GET_BOOKS_ERROR,
        payload: "Произошла ошибка",
      });
    }
  };
