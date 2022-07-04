import { Action } from "../helpers";
import { GoogleBook, GoogleBooksAPIResults } from "../../types/GoogleBookTypes";
import { ValueOf } from "../helpers";
import { BooksTypes } from "../types/BookTypes";
import { SearchDataProps, SearchTypes } from "../types/SearchTypes";

// { [name: keyof SearchDataProps]: SearchDataProps[name]
type ChangeSearchProps = Action<
  typeof SearchTypes.CHANGE_SEARCH_PROPS,
  { field: keyof SearchDataProps; value: ValueOf<SearchDataProps> }
>;
type SearchError = Action<typeof SearchTypes.SEARCH_ERROR, string>;

export type SearchActions = ChangeSearchProps | SearchError;
