import { BooksActions } from "../actions/booksAction";
import { BooksListState, BooksTypes } from "../types/BookTypes";

const initialState: BooksListState = {
  state: {
    kind: "",
    totalItems: 0,
    items: [],
  },
  error: null,
};

export const booksReducer = (bookState: BooksListState = initialState, action: BooksActions): BooksListState => {
  switch (action.type) {
    case BooksTypes.GET_BOOKS_SUCCESS: {
      return { ...bookState, state: action.payload!, error: null };
    }
    case BooksTypes.ADD_BOOKS: {
      return {
        ...bookState,
        state: {
          items: [...bookState.state.items, ...action.payload!.items],
          totalItems: action.payload!.totalItems,
          kind: action.payload!.kind,
        },
        error: null,
      };
    }
    case BooksTypes.GET_BOOKS_ERROR: {
      return { ...bookState, state: { kind: "", totalItems: 0, items: [] }, error: action.payload };
    }
    case BooksTypes.CLEAR_BOOKS: {
      return { ...bookState, state: { kind: "", totalItems: 0, items: [] }, error: null };
    }

    default: {
      return bookState;
    }
  }
};
