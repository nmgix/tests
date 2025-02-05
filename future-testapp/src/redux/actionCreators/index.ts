import * as BookActionCreators from "./BooksActionCreator";
import * as SearchActionCreators from "./SearchAction";

const ActionsTuple = {
  ...BookActionCreators,
  ...SearchActionCreators,
};

export default ActionsTuple;
