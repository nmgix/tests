import { SearchActions } from "../actions/searchAction";
import { SearchState, SearchTypes } from "../types/SearchTypes";

const initialState: SearchState = {
  state: {
    category: "all",
    searchString: "",
    sortBy: "relevance",
  },
  error: null,
};

export const searchReducer = (searchState: SearchState = initialState, action: SearchActions): SearchState => {
  switch (action.type) {
    case SearchTypes.CHANGE_SEARCH_PROPS: {
      return {
        state: {
          ...searchState.state,
          [action.payload!.field]: action.payload!.value,
        },
        error: null,
      };
    }
    case SearchTypes.SEARCH_ERROR: {
      return { state: searchState.state, error: action.payload! };
    }

    default: {
      return searchState;
    }
  }
};
