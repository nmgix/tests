import * as BookActionCreators from "./BooksActionCreator";
import * as SearchActionCreators from "./SearchAction";

export default {
  ...BookActionCreators,
  ...SearchActionCreators,
};
