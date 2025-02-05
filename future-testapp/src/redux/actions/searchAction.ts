import { Action } from "../helpers";
import { ValueOf } from "../helpers";
import { SearchDataProps, SearchTypes } from "../types/SearchTypes";

type ChangeSearchProps = Action<
  typeof SearchTypes.CHANGE_SEARCH_PROPS,
  { field: keyof SearchDataProps; value: ValueOf<SearchDataProps> }
>;
type SearchError = Action<typeof SearchTypes.SEARCH_ERROR, string>;

export type SearchActions = ChangeSearchProps | SearchError;
