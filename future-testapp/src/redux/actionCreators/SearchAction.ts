import { Dispatch } from "redux";
import { SearchDataProps, SearchTypes } from "../types/SearchTypes";
import { SearchActions } from "../actions/searchAction";

export const updateSearch =
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => (dispatch: Dispatch<SearchActions>) => {
    try {
      dispatch({
        type: SearchTypes.CHANGE_SEARCH_PROPS,
        payload: {
          field: e.target.name as keyof SearchDataProps,
          value: e.target.value,
        },
      });
    } catch {
      dispatch({
        type: SearchTypes.SEARCH_ERROR,
        payload: "Произошла ошибка",
      });
    }
  };
