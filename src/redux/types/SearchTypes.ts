import { GoogleBook, GoogleBooksAPIResults } from "../../types/GoogleBookTypes";

export enum PresetCategories {
  all,
  art,
  biography,
  computers,
  history,
  medical,
  poetry,
}
export enum SortBy {
  relevance,
  newest,
}
export type SearchDataProps = {
  searchString: string;
  category: keyof typeof PresetCategories;
  sortBy: keyof typeof SortBy;
};

export enum SearchTypes {
  CHANGE_SEARCH_PROPS = "CHANGE_SEARCH_PROPS",
  SEARCH_ERROR = "GET_BOOKS_ERROR",
}

export type SearchState = {
  state: SearchDataProps;
  error?: string | null;
};
