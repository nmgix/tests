import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../actionCreators";
import { AppDispatch } from "../store";

export const useAction = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  return bindActionCreators(actionCreators, dispatch);
};
