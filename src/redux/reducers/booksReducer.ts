import { BooksActions } from "../actions/booksAction";
import { BooksListState, BooksTypes } from "../types/BookTypes";

const initialState: BooksListState = {
  state: {
    kind: "",
    totalItems: 0,
    items: [],
  },
  loading: true,
  error: null,
};

export const booksReducer = (bookState: BooksListState = initialState, action: BooksActions): BooksListState => {
  switch (action.type) {
    case BooksTypes.GET_BOOKS: {
      return { state: bookState.state, loading: true, error: null };
    }
    case BooksTypes.GET_BOOKS_SUCCESS: {
      return { state: action.payload!, loading: false, error: null };
    }
    case BooksTypes.ADD_BOOKS: {
      return {
        ...bookState,
        state: {
          items: [...bookState.state.items, ...action.payload!.items],
          totalItems: action.payload!.totalItems,
          kind: action.payload!.kind,
        },
        loading: false,
        error: null,
      };
    }
    case BooksTypes.GET_BOOKS_ERROR: {
      return { state: { kind: "", totalItems: 0, items: [] }, loading: false, error: action.payload };
    }
    case BooksTypes.CLEAR_BOOKS: {
      return { state: { kind: "", totalItems: 0, items: [] }, loading: false, error: null };
    }

    default: {
      return bookState;
    }
  }
};
